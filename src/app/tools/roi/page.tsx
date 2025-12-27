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

            <div className="max-w-4xl mx-auto mt-16 px-4">
                <div className="p-8 md:p-12 bg-blue-600 rounded-3xl text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Building something similar?</h3>
                        <p className="mb-8 text-blue-100 text-lg max-w-xl mx-auto">
                            Don't let your code gather dust. Sell your side project, template, or SaaS on Websites Arena and cash out.
                        </p>
                        <a href="/sell" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg">
                            Start Selling Now
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
