import ROIClient from './ROIClient'

export const metadata = {
    title: 'Website ROI(Investment Return) Calculator - Investment Return Analysis | Websites Arena',
    description: 'Calculate the Return on Investment (ROI) for buying a website or SaaS. Determine your break-even point and future profits.',
    openGraph: {
        title: 'Website ROI(Investment Return) Calculator - Investment Return Analysis',
        description: 'Calculate the Return on Investment (ROI) for buying a website or SaaS. Determine your break-even point and future profits.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'ROI Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Calculate Return on Investment (ROI) for digital assets. See break-even time and future profit projections.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ROIClient />
        </>
    )
}
