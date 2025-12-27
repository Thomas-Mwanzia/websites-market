'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getWatermarkedImageUrl, getWatermarkedPdfUrl } from '@/lib/watermark';

interface PreviewGalleryProps {
    previewImages?: any[];
    previewFileUrl?: string;
}

export function ProductPreviewGallery({ previewImages, previewFileUrl }: PreviewGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsOpen(true);
    };

    const handlePrevImage = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (selectedImageIndex !== null && previewImages && selectedImageIndex < previewImages.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    // Keyboard navigation effect
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'ArrowLeft') handlePrevImage();
            if (e.key === 'ArrowRight') handleNextImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedImageIndex, previewImages?.length]);

    if (!previewImages?.length && !previewFileUrl) return null;

    return (
        <>
            {/* Preview Gallery Grid */}
            <div className="lg:col-span-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Preview Gallery</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {previewImages?.map((img: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleImageClick(idx)}
                            className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        >
                            <img
                                src={getWatermarkedImageUrl(img.asset?.url || '')}
                                alt={`Preview ${idx + 1}`}
                                className="w-full h-full object-cover blur-[2px] group-hover:blur-0 transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                            </div>
                        </button>
                    ))}
                    {previewFileUrl && (
                        <a
                            href={getWatermarkedPdfUrl(previewFileUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center aspect-[3/4] rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                        >
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 text-center px-1">Preview PDF</span>
                            <span className="text-xs text-gray-400 mt-1">� Open</span>
                        </a>
                    )}
                </div>
                <p className="text-xs text-gray-400 italic mt-3">
                    * Previews are secure (watermarked & limited). Full access granted upon purchase.
                </p>
            </div>

            {/* Image Modal */}
            {isOpen && selectedImageIndex !== null && previewImages && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative max-w-4xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 lg:-top-12 lg:-right-12 text-white hover:text-gray-300 transition-colors z-50 bg-black/50 hover:bg-black/70 p-2 rounded-full"
                        >
                            <X className="w-6 h-6 lg:w-8 lg:h-8" />
                        </button>

                        {/* Main Image */}
                        <div className="relative bg-black rounded-lg overflow-hidden">
                            <img
                                src={getWatermarkedImageUrl(previewImages[selectedImageIndex].asset?.url || '')}
                                alt={`Preview ${selectedImageIndex + 1}`}
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {previewImages.length > 1 && (
                            <>
                                {selectedImageIndex > 0 && (
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 lg:-translate-x-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                )}

                                {selectedImageIndex < previewImages.length - 1 && (
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 lg:translate-x-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </>
                        )}

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {selectedImageIndex + 1} / {previewImages.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
