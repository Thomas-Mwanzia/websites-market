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
        console.log(`   isPdf parameter: ${isPdf}`);
        console.log(`   URL: ${decodedUrl.substring(0, 60)}...`);

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
                // Use StandardFonts.Helvetica which is built-in to PDF readers (no font file needed)
                const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
                const pages = pdfDoc.getPages();

                pages.forEach((page: PDFPage) => {
                    const { width, height } = page.getSize();

                    const text = 'Websites Arena';
                    const fontSize = 72;
                    const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
                    const textHeight = helveticaFont.heightAtSize(fontSize);

                    const centerX = (width - textWidth) / 2;
                    const centerY = (height - textHeight) / 2;

                    page.drawText(text, {
                        x: centerX,
                        y: centerY,
                        size: fontSize,
                        font: helveticaFont,
                        color: rgb(0.3, 0.3, 0.3),
                        opacity: 0.25,
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
        }

        // Handle image watermarking (default)
        try {
            console.log(`   Processing as IMAGE...`);
            // Get image metadata to determine size
            const image = sharp(Buffer.from(fileBuffer));
            const metadata = await image.metadata();
            const width = metadata.width || 1200;
            const height = metadata.height || 630;
            console.log(`   Image dimensions: ${width}x${height}`);

            // Calculate font size based on image width (10% of width)
            const fontSize = Math.max(Math.round(width * 0.1), 40);

            // Create SVG watermark using system fonts (Arial, sans-serif)
            // This does NOT require a font file to be loaded by Sharp/Canvas
            const watermarkSvg = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5" transform="translate(${width / 2},${height / 2}) rotate(-45)">
        <text x="0" y="0" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="white" stroke="black" stroke-width="${fontSize * 0.02}" font-family="Arial, sans-serif">Websites Arena</text>
    </g>
</svg>
            `);

            // Apply watermark
            const watermarkedImage = await image
                .composite([
                    {
                        input: watermarkSvg,
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
            // Return original as PNG on error
            const fallbackImage = await sharp(Buffer.from(fileBuffer))
                .png()
                .toBuffer();

            const originalFilename = getFilenameFromUrl(decodedUrl);
            const filenameWithoutExt = originalFilename.split('.')[0];
            const filename = `${filenameWithoutExt}.png`;

            return new NextResponse(fallbackImage as unknown as BodyInit, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                    'Content-Length': fallbackImage.length.toString(),
                    'Content-Disposition': `attachment; filename="${filename}"`,
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
