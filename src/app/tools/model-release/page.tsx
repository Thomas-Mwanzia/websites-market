import ModelReleaseClient from './ModelReleaseClient'

export const metadata = {
    title: 'Free Model Release Form Generator - Photography Consent Contract | Websites Arena',
    description: 'Generate a professional model release form for photographers and videographers. Protect your rights to sell and publish your work.',
    openGraph: {
        title: 'Free Model Release Form Generator',
        description: 'Generate a professional model release form for photographers and videographers. Protect your rights to sell and publish your work.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Model Release Form Generator',
        applicationCategory: 'LegalApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Generate a professional model release form for photographers and videographers. Protect your rights to sell and publish your work.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ModelReleaseClient />
        </>
    )
}
