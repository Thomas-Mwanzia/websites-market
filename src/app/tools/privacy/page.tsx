import PrivacyClient from './PrivacyClient'

export const metadata = {
    title: 'Free Privacy Policy Generator for websites, SaaS & Apps | Websites Arena',
    description: 'Generate a professional, GDPR-friendly privacy policy for your startup, mobile app, or website in seconds. Free to use.',
    openGraph: {
        title: 'Free Privacy Policy Generator for websites, SaaS & Apps',
        description: 'Generate a professional, GDPR-friendly privacy policy for your startup, mobile app, or website in seconds. Free to use.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Privacy Policy Generator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Generate a professional, GDPR-friendly privacy policy for your startup, mobile app, or website in seconds.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PrivacyClient />
        </>
    )
}
