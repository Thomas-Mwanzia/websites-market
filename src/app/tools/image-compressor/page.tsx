import ImageCompressorClient from './ImageCompressorClient'

export const metadata = {
    title: 'Free Image Compressor - Optimize Images for SEO | Websites Arena',
    description: 'Compress JPG, PNG, and WebP images instantly in your browser. No server uploads, 100% private, and free. Improve your website speed today.',
    openGraph: {
        title: 'Free Image Compressor - Optimize Images for SEO',
        description: 'Compress JPG, PNG, and WebP images instantly in your browser. No server uploads, 100% private, and free.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Image Compressor',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Compress JPG, PNG, and WebP images instantly in your browser. No server uploads, 100% private.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ImageCompressorClient />
        </>
    )
}
