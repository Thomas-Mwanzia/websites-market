import SocialPreviewClient from './SocialPreviewClient'

export const metadata = {
    title: 'Open Graph Image Generator - Social Media Previews | Websites Arena',
    description: 'Create beautiful, branded Open Graph images for your website, blog post, or product launch. Optimized for Twitter, LinkedIn, and Facebook.',
    openGraph: {
        title: 'Open Graph Image Generator - Social Media Previews',
        description: 'Create beautiful, branded Open Graph images for your website, blog post, or product launch. Optimized for Twitter, LinkedIn, and Facebook.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Social Preview Generator',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Generate beautiful Open Graph images for your website in seconds. Boost your social media click-through rates.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SocialPreviewClient />
        </>
    )
}
