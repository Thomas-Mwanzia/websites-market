import SuiteClient from './SuiteClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Free Business Tools for Digital Sellers - Contracts, Invoices & Policies | Websites Arena',
    description: 'Generate professional Asset Sale Agreements, NDAs, Invoices, and Privacy Policies for your digital business. Free for SaaS founders, domain flippers, and creators.',
    keywords: ['Free Invoice Generator', 'Website Sale Agreement Template', 'SaaS Privacy Policy Generator', 'Freelance Contract Template', 'NDA Generator', 'Digital Asset Transfer Agreement'],
    openGraph: {
        title: 'Free Business Tools for Digital Sellers',
        description: 'Generate professional Asset Sale Agreements, NDAs, Invoices, and Privacy Policies for your digital business.',
        type: 'website',
    }
}

export default function BusinessSuitePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Seller Business Suite',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: [
            'Asset Sale Agreement Generator',
            'NDA Generator',
            'Invoice Generator',
            'Privacy Policy Generator'
        ],
        description: 'A comprehensive suite of free legal and business tools for digital product sellers.',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SuiteClient />
        </>
    )
}
