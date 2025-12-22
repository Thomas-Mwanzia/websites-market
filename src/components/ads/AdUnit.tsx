'use client'

import { useEffect, useState } from 'react'

type AdFormat = 'vertical' | 'horizontal' | 'rectangle'

interface AdUnitProps {
    type: 'affiliate' | 'adsense'
    slot?: string // Google AdSense Slot ID
    format?: AdFormat
    // Affiliate Props
    affiliateTitle?: string
    affiliateText?: string
    affiliateLink?: string
    affiliateImage?: string
    className?: string
}

export default function AdUnit({
    type,
    slot,
    format = 'rectangle',
    affiliateTitle,
    affiliateText,
    affiliateLink,
    affiliateImage,
    className = ''
}: AdUnitProps) {
    const [adLoaded, setAdLoaded] = useState(type === 'affiliate') // Affiliates always show

    useEffect(() => {
        if (type === 'adsense' && typeof window !== 'undefined') {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});

                // Set a timeout to check if ad loaded
                setTimeout(() => {
                    setAdLoaded(true) // Show container after attempting to load
                }, 100)
            } catch (err) {
                console.error('AdSense error:', err);
                setAdLoaded(false) // Hide if error
            }
        }
    }, [type]);

    // Dimensions based on format - responsive for mobile
    const dimensions = {
        vertical: 'w-full max-w-[300px] min-h-[250px]', // Responsive on mobile
        horizontal: 'w-full h-[90px] md:h-[120px]', // Scales on desktop
        rectangle: 'w-full max-w-[300px] min-h-[250px]',
    }

    // Don't render if AdSense and not loaded (hides empty ad slots)
    if (type === 'adsense' && !adLoaded) {
        return null
    }

    if (type === 'affiliate') {
        return (
            <div className={`bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-6 relative group ${dimensions[format]} ${className}`}>
                <div className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-800 text-[10px] px-2 py-0.5 rounded text-gray-500 uppercase tracking-wider">
                    Sponsored
                </div>

                {affiliateImage ? (
                    <img src={affiliateImage} alt={affiliateTitle} className="w-16 h-16 mb-4 object-contain" />
                ) : (
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-2xl">
                        🚀
                    </div>
                )}

                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {affiliateTitle || 'Start Your Business'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                    {affiliateText || 'Get the best tools for your new website.'}
                </p>

                <a
                    href={affiliateLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors w-full"
                >
                    Learn More
                </a>
            </div>
        )
    }

    // Google AdSense
    return (
        <div className={`overflow-hidden ${dimensions[format]} ${className}`}>
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%', height: '100%' }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
                data-ad-slot={slot || "1234567890"}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </div>
    )
}
