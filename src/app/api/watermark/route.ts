import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, PDFPage, rgb, degrees } from 'pdf-lib';

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

        // Fetch the file from the URL with timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        let response: Response;
        try {
            response = await fetch(decodedUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': '*/*',
                }
            });
            clearTimeout(timeoutId);
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.error('Fetch error:', fetchError);
            return NextResponse.json({ error: 'Failed to fetch file from URL' }, { status: 400 });
        }

        if (!response.ok) {
            console.error(`Failed to fetch file. Status: ${response.status}`);
            return NextResponse.json({ error: 'Failed to fetch file' }, { status: 400 });
        }

        const fileBuffer = await response.arrayBuffer();

        // Handle PDF watermarking
        if (isPdf) {
            try {
                const pdfDoc = await PDFDocument.load(fileBuffer);
                const pages = pdfDoc.getPages();

                pages.forEach((page: PDFPage) => {
                    const { width, height } = page.getSize();

                    // Add watermark text centered on each page with rotation
                    const textWidth = 'Websites Arena'.length * 30; // Approximate width
                    const centerX = (width - textWidth) / 2;
                    const centerY = height / 2;

                    page.drawText('Websites Arena', {
                        x: centerX,
                        y: centerY,
                        size: 72,
                        color: rgb(0.4, 0.4, 0.4),
                        opacity: 0.15,
                        rotate: degrees(-45),
                    });
                });

                const pdfBytes = await pdfDoc.save();
                const originalFilename = getFilenameFromUrl(decodedUrl);
                const filename = originalFilename.endsWith('.pdf') ? originalFilename : `${originalFilename}.pdf`;

                return new NextResponse(Buffer.from(pdfBytes), {
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'Content-Length': pdfBytes.length.toString(),
                        'Content-Disposition': `inline; filename="${filename}"`,
                    },
                });
            } catch (pdfError) {
                console.error('PDF watermark error:', pdfError);
                // If PDF processing fails, return the original PDF
                return new NextResponse(Buffer.from(fileBuffer), {
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                });
            }
        }

        // Handle image watermarking (default)
        try {
            // Get image metadata to determine size
            const metadata = await sharp(Buffer.from(fileBuffer)).metadata();
            const width = metadata.width || 1200;
            const height = metadata.height || 630;

            // Create a simple SVG watermark with proper escaping
            const watermarkSvg = Buffer.from(`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.15" transform="translate(${width / 2},${height / 2}) rotate(-45)">
        <text x="0" y="0" font-size="80" font-weight="bold" text-anchor="middle" fill="rgba(255,255,255,1)" font-family="Arial">Websites Arena</text>
    </g>
</svg>
            `);

            // Apply watermark to image
            const watermarkedImage = await sharp(Buffer.from(fileBuffer))
                .composite([
                    {
                        input: watermarkSvg,
                        blend: 'over',
                    }
                ])
                .png()
                .toBuffer();

            // Get original filename and preserve it
            const originalFilename = getFilenameFromUrl(decodedUrl);
            const filenameWithoutExt = originalFilename.split('.')[0];
            const filename = `${filenameWithoutExt}.png`;

            // Return watermarked image with cache headers
            return new NextResponse(watermarkedImage as unknown as BodyInit, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=31536000, immutable',
                    'Content-Length': watermarkedImage.length.toString(),
                    'Content-Disposition': `attachment; filename="${filename}"`,
                },
            });
        } catch (imgError) {
            console.error('Image watermark error:', imgError);
            // If watermarking fails, return original image as PNG
            const fallbackImage = await sharp(Buffer.from(fileBuffer))
                .png()
                .toBuffer();

            return new NextResponse(fallbackImage as unknown as BodyInit, {
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=31536000, immutable',
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
