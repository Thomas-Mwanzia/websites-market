import ValuationClient from './ValuationClient'

export const metadata = {
    title: 'SaaS Price Valuation Calculator - How much is my website worth? | Websites Arena',
    description: 'Estimate the selling price of your SaaS, Micro-SaaS, or content site. Based on revenue, traffic, and tech stack multiples.',
    openGraph: {
        title: 'SaaS Price Valuation Calculator - How much is my website worth?',
        description: 'Estimate the selling price of your SaaS, Micro-SaaS, or content site. Based on revenue, traffic, and tech stack multiples.',
        type: 'website',
    }
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SaaS Valuation Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: 'Estimate the selling price of your SaaS, Micro-SaaS, or content site based on revenue, traffic, and tech stack.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ValuationClient />
        </>
    )
}
