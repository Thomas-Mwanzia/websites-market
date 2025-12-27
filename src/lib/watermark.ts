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
 * @returns The watermarked PDF URL
 */
export function getWatermarkedPdfUrl(originalUrl: string): string {
    if (!originalUrl) return originalUrl;
    
    // Encode the URL to pass as a query parameter
    const encodedUrl = encodeURIComponent(originalUrl);
    
    // Return the watermark API endpoint with the original URL and PDF flag
    return `/api/watermark?url=${encodedUrl}&pdf=true`;
}
