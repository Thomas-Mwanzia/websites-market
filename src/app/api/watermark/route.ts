import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, PDFPage, rgb, degrees, StandardFonts } from 'pdf-lib';
import path from 'path';
import { promises as fs } from 'fs';

export const runtime = 'nodejs';

// Helper function to extract filename from URL
function getFilenameFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop() || 'file';
        // Remove query parameters if any
        return filename.split('?')[0];
    } catch {
        return 'file';
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const fileUrl = searchParams.get('url');
        const isPdf = searchParams.get('pdf') === 'true';

        if (!fileUrl) {
            return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
        }

        // Decode the URL
        const decodedUrl = decodeURIComponent(fileUrl);
        console.log(`\n📝 Processing file request:`);
        console.log(`   Full request URL: ${request.url}`);
        console.log(`   isPdf parameter: ${isPdf}`);
        console.log(`   searchParams.get('pdf'): "${searchParams.get('pdf')}"`);
        console.log(`   URL: ${decodedUrl.substring(0, 80)}...`);

        // Fetch the file from the URL with timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        let response: Response;
        try {
            console.log(`   Fetching URL: ${decodedUrl}`);
            response = await fetch(decodedUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': '*/*',
                }
            });
            clearTimeout(timeoutId);
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.error('   ❌ Fetch error:', fetchError);
            return NextResponse.json({ error: 'Failed to fetch file from URL' }, { status: 400 });
        }

        if (!response.ok) {
            console.error(`   ❌ Failed to fetch file. Status: ${response.status}`);
            return NextResponse.json({ error: 'Failed to fetch file' }, { status: 400 });
        }

        const fileBuffer = await response.arrayBuffer();
        console.log(`   ✅ File fetched (${fileBuffer.byteLength} bytes)`);

        // Handle PDF watermarking
        if (isPdf) {
            console.log(`   Processing as PDF...`);
            try {
                const pdfDoc = await PDFDocument.load(fileBuffer);
                const pages = pdfDoc.getPages();

                pages.forEach((page: PDFPage) => {
                    const { width, height } = page.getSize();

                    // Define watermark size (20% of page width)
                    const watermarkScale = (width * 0.2) / 24; // Base SVG is 24x24
                    const watermarkWidth = 24 * watermarkScale;
                    const watermarkHeight = 24 * watermarkScale;

                    // Position in Bottom Right corner with padding
                    const x = width - watermarkWidth - 30;
                    const y = 30;

                    // Draw Shield Background
                    page.drawSvgPath('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', {
                        x,
                        y,
                        scale: watermarkScale,
                        color: rgb(1, 1, 1), // White
                        borderColor: rgb(0, 0, 0), // Black
                        borderWidth: 1,
                        opacity: 0.15,
                        rotate: degrees(-45),
                    });

                    // Draw W Path
                    page.drawSvgPath('M5.5 9L7 14L9 9L11 14L12.5 9', {
                        x,
                        y,
                        scale: watermarkScale,
                        borderColor: rgb(0, 0, 0),
                        borderWidth: 1.5,
                        opacity: 0.15,
                        rotate: degrees(-45),
                    });

                    // Draw A Path
                    page.drawSvgPath('M14 14L16 9L18 14M14.5 12.5H17.5', {
                        x,
                        y,
                        scale: watermarkScale,
                        borderColor: rgb(0, 0, 0),
                        borderWidth: 1.5,
                        opacity: 0.15,
                        rotate: degrees(-45),
                    });
                });

                const pdfBytes = await pdfDoc.save();
                const originalFilename = getFilenameFromUrl(decodedUrl);
                const filename = originalFilename.endsWith('.pdf') ? originalFilename : `${originalFilename}.pdf`;

                console.log(`   ✅ PDF watermarked successfully (${pdfBytes.length} bytes)`);
                return new NextResponse(Buffer.from(pdfBytes), {
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'Content-Length': pdfBytes.length.toString(),
                        'Content-Disposition': `inline; filename="${filename}"`,
                    },
                });
            } catch (pdfError) {
                console.error('   ❌ PDF watermark error:', pdfError);
                // Return original on error
                const originalFilename = getFilenameFromUrl(decodedUrl);

                // Determine correct content type based on file extension
                const contentType = originalFilename.endsWith('.pdf') ? 'application/pdf' :
                    originalFilename.endsWith('.png') ? 'image/png' :
                        originalFilename.endsWith('.jpg') || originalFilename.endsWith('.jpeg') ? 'image/jpeg' :
                            originalFilename.endsWith('.webp') ? 'image/webp' : 'application/octet-stream';

                return new NextResponse(Buffer.from(fileBuffer), {
                    headers: {
                        'Content-Type': contentType,
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'Content-Length': fileBuffer.byteLength.toString(),
                        'Content-Disposition': `inline; filename="${originalFilename}"`,
                    },
                });
            }
        }

        // Handle image watermarking (default)
        try {
            console.log(`   Processing as IMAGE...`);

            // Safety check: if the file starts with %PDF, it's a PDF being mishandled
            const fileStart = Buffer.from(fileBuffer).toString('utf8', 0, 4);
            if (fileStart.includes('PDF') || Buffer.from(fileBuffer).toString('utf8', 0, 5) === '%PDF-') {
                console.warn(`   ⚠️ WARNING: Received PDF content but isPdf=false! Returning as application/pdf instead`);
                const originalFilename = getFilenameFromUrl(decodedUrl);
                const filename = originalFilename.endsWith('.pdf') ? originalFilename : `${originalFilename}.pdf`;
                return new NextResponse(Buffer.from(fileBuffer), {
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'Content-Length': fileBuffer.byteLength.toString(),
                        'Content-Disposition': `inline; filename="${filename}"`,
                    },
                });
            }

            // Get image metadata to determine size
            const image = sharp(Buffer.from(fileBuffer));
            const metadata = await image.metadata();
            const width = metadata.width || 1200;
            const height = metadata.height || 630;
            console.log(`   Image dimensions: ${width}x${height}`);

            // Calculate logo size (50% of image width)
            const logoWidth = Math.round(width * 0.5);

            // Define watermark SVG directly to avoid file I/O issues
            const watermarkSvgString = `
<svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g opacity="0.5">
    <!-- Shield Background -->
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- W Path -->
    <path d="M5.5 9L7 14L9 9L11 14L12.5 9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- A Path -->
    <path d="M14 14L16 9L18 14M14.5 12.5H17.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
            const watermarkBuffer = Buffer.from(watermarkSvgString);

            // Resize watermark to the calculated width
            const resizedWatermark = await sharp(watermarkBuffer)
                .resize({ width: logoWidth })
                .toBuffer();

            // Apply watermark
            const watermarkedImage = await image
                .composite([
                    {
                        input: resizedWatermark,
                        gravity: 'center',
                        blend: 'over',
                    }
                ])
                .png()
                .toBuffer();

            // Get original filename and preserve it
            const originalFilename = getFilenameFromUrl(decodedUrl);
            const filenameWithoutExt = originalFilename.split('.')[0];
            const filename = `${filenameWithoutExt}.png`;

            console.log(`   ✅ Image watermarked successfully (${watermarkedImage.length} bytes)`);
            return new NextResponse(watermarkedImage as unknown as BodyInit, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                    'Content-Length': watermarkedImage.length.toString(),
                    'Content-Disposition': `attachment; filename="${filename}"`,
                },
            });
        } catch (imgError) {
            console.error('   ❌ Image watermark error:', imgError);

            // Return original image directly on error (most robust fallback)
            // This ensures that even if Sharp fails completely, the user still sees the image
            const originalFilename = getFilenameFromUrl(decodedUrl);
            // Try to determine content type from filename or default to binary
            const contentType = originalFilename.endsWith('.png') ? 'image/png' :
                originalFilename.endsWith('.jpg') || originalFilename.endsWith('.jpeg') ? 'image/jpeg' :
                    originalFilename.endsWith('.webp') ? 'image/webp' : 'application/octet-stream';

            return new NextResponse(Buffer.from(fileBuffer), {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                    'Content-Length': fileBuffer.byteLength.toString(),
                    'Content-Disposition': `inline; filename="${originalFilename}"`,
                },
            });
        }
    } catch (error) {
        console.error('Watermark error:', error);
        return NextResponse.json(
            { error: 'Failed to process file' },
            { status: 500 }
        );
    }
}
