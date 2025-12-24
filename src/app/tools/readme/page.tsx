import ReadmeClient from './ReadmeClient'

export const metadata = {
    title: 'Readme.md Generator - Create Professional GitHub Documentation | Websites Arena',
    description: 'The easiest way to create a beautiful README.md for your GitHub project. Add features, installation steps, and license info in seconds.',
    openGraph: {
        title: 'Readme.md Generator - Create Professional GitHub Documentation',
        description: 'The easiest way to create a beautiful README.md for your GitHub project. Add features, installation steps, and license info in seconds.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Readme Generator',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Create professional README.md documentation for your GitHub repositories in seconds.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ReadmeClient />
        </>
    )
}
