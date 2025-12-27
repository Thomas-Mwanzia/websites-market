/**
 * Generate a watermarked image URL
 * @param originalUrl - The original image URL
 * @returns The watermarked image URL
 */
export function getWatermarkedImageUrl(originalUrl: string): string {
    if (!originalUrl) return originalUrl;
    
    // Encode the URL to pass as a query parameter
    const encodedUrl = encodeURIComponent(originalUrl);
    
    // Return the watermark API endpoint with the original URL
    return `/api/watermark?url=${encodedUrl}`;
}

/**
 * Generate a watermarked PDF URL
 * @param originalUrl - The original PDF URL
 * @returns The watermarked PDF URL (or image URL if not a PDF)
 */
export function getWatermarkedPdfUrl(originalUrl: string): string {
    if (!originalUrl) return originalUrl;
    
    // Encode the URL to pass as a query parameter
    const encodedUrl = encodeURIComponent(originalUrl);
    
    // Check if the URL is actually a PDF
    const isPdfUrl = originalUrl.toLowerCase().includes('.pdf') || 
                     originalUrl.toLowerCase().includes('pdf');
    
    // If it's not a PDF, treat it as an image
    if (!isPdfUrl) {
        console.warn(`⚠️ URL does not appear to be a PDF: ${originalUrl.substring(0, 80)}...`);
        return `/api/watermark?url=${encodedUrl}`;
    }
    
    // Return the watermark API endpoint with the original URL and PDF flag
    return `/api/watermark?url=${encodedUrl}&pdf=true`;
}
