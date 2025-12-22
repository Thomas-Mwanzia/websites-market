import { ArrowRight, CheckCircle2, DollarSign, Rocket, ShieldCheck, Clock, FileCheck, TrendingUp, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "How to Sell Your Website | Complete Seller Guide | Websites Arena",
    description: "Learn how to sell your website, starter project, or micro-SaaS on Websites Arena. Complete step-by-step guide covering listing, pricing, and selling your digital asset for maximum profit.",
    keywords: [
        "how to sell a website",
        "website selling guide",
        "sell startup project",
        "micro saas seller",
        "exit strategy",
        "digital asset marketplace",
        "website valuation",
        "passive income",
        "sell side hustle",
        "seller guide"
    ],
    openGraph: {
        title: "How to Sell Your Website | Complete Seller Guide | Websites Arena",
        description: "Learn how to sell your website, starter project, or micro-SaaS on Websites Arena. Complete step-by-step guide covering listing, pricing, and selling your digital asset for maximum profit.",
        url: "https://websitesarena.com/sell/guide",
        siteName: "Websites Arena",
        type: "article",
        locale: "en_US",
    },
    robots: "index, follow",
}

export default function SellGuidePage() {
    const steps = [
        {
            number: 1,
            title: "Prepare Your Project",
            description: "Before listing, ensure your website is in excellent condition. Make sure your code is clean, documentation is clear, and all assets are organized.",
            details: [
                "Clean, well-commented code",
                "Complete setup documentation",
                "Working demo or live link",
                "All assets and databases included",
                "No personal data or credentials in code"
            ],
            icon: FileCheck
        },
        {
            number: 2,
            title: "Calculate Your Price",
            description: "Research similar projects and use our valuation guide to set a competitive price. Consider monthly revenue, traffic, and potential.",
            details: [
                "Analyze comparable listings",
                "Calculate multiples of revenue",
                "Factor in growth potential",
                "Consider market demand",
                "Set tiered pricing options"
            ],
            icon: DollarSign
        },
        {
            number: 3,
            title: "Create Your Listing",
            description: "Submit your project with compelling descriptions, screenshots, and metrics. Highlight what makes your project unique and valuable.",
            details: [
                "Write compelling title and description",
                "Add high-quality screenshots",
                "Showcase revenue/traffic metrics",
                "List all features and technologies",
                "Include testimonials or proof of traction"
            ],
            icon: Rocket
        },
        {
            number: 4,
            title: "Review & Approval",
            description: "Our team reviews your listing for quality and authenticity. We typically approve legitimate listings within 24-48 hours.",
            details: [
                "Quality and code assessment",
                "Revenue verification",
                "Technology stack evaluation",
                "Market fit analysis",
                "Approval or feedback"
            ],
            icon: CheckCircle2
        },
        {
            number: 5,
            title: "Go Live on Marketplace",
            description: "Your approved listing goes live and is instantly visible to thousands of potential buyers actively browsing our marketplace.",
            details: [
                "Featured on marketplace",
                "SEO optimization",
                "Social media promotion",
                "Email to interested buyers",
                "24/7 availability"
            ],
            icon: TrendingUp
        },
        {
            number: 6,
            title: "Negotiate & Close Sale",
            description: "Interested buyers can reach out through our secure messaging. Negotiate terms and close the deal using our escrow system.",
            details: [
                "Communicate with buyers",
                "Answer due diligence questions",
                "Negotiate if needed",
                "Funds held in secure escrow",
                "Transfer ownership and assets"
            ],
            icon: ShieldCheck
        },
        {
            number: 7,
            title: "Receive Payment",
            description: "Once the buyer confirms delivery, we release funds minus our 15% commission. You receive 85% of the sale price.",
            details: [
                "Buyer confirms receipt",
                "15% commission deducted",
                "85% paid to your account",
                "Multiple payout methods",
                "Fast processing"
            ],
            icon: CheckCircle2
        }
    ]

    const benefits = [
        {
            icon: Zap,
            title: "Fast Processing",
            description: "Listing approval within 24-48 hours. Start selling your project immediately."
        },
        {
            icon: Users,
            title: "Thousands of Buyers",
            description: "Access to our network of entrepreneurs and investors actively looking to buy."
        },
        {
            icon: ShieldCheck,
            title: "Secure Escrow",
            description: "All transactions are protected. Funds held securely until successful delivery."
        },
        {
            icon: TrendingUp,
            title: "Professional Listing",
            description: "SEO-optimized listing with marketing support from our team."
        },
        {
            icon: DollarSign,
            title: "Keep 85%",
            description: "We only take a 15% commission. You keep the majority of your profit."
        },
        {
            icon: Clock,
            title: "No Maintenance",
            description: "Stop maintaining and supporting your project. Sell and move on."
        }
    ]

    const faqs = [
        {
            question: "What types of websites can I sell?",
            answer: "We accept starter websites, niche blogs, micro-SaaS projects, side hustles, and any digital property with proven metrics. Must have clean code and working functionality."
        },
        {
            question: "How long does the listing approval take?",
            answer: "Most listings are reviewed and approved within 24-48 hours. We assess code quality, documentation, and market potential."
        },
        {
            question: "What's your commission?",
            answer: "We take a 15% commission on successful sales. You keep 85% of the sale price. No hidden fees or surprise charges."
        },
        {
            question: "How do I set the right price?",
            answer: "Use our valuation guide based on monthly revenue multiples (typically 24-36 months), traffic metrics, growth potential, and comparable listings."
        },
        {
            question: "How is payment handled?",
            answer: "All payments go through our secure escrow system. The buyer's funds are held until they confirm receipt and everything works as described."
        },
        {
            question: "What happens after the sale?",
            answer: "You transfer ownership (domain, hosting, code), assist with transition if needed, and we process your 85% payment automatically."
        },
        {
            question: "Can I negotiate with buyers?",
            answer: "Absolutely! You can communicate with interested buyers through our messaging system to discuss price, terms, and answer questions."
        },
        {
            question: "Is there a minimum price?",
            answer: "No minimum price, but typically projects sell better when priced between $500-$50,000. Our tool helps you find the sweet spot."
        }
    ]

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="pt-24 pb-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
                        Seller Guide
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        How to Sell Your Website in 7 Simple Steps
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        A complete guide to selling your starter website, micro-SaaS, or niche blog on Websites Arena. Learn the proven process we use to help sellers succeed.
                    </p>
                    <Link
                        href="/sell/submit"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all"
                    >
                        Start Selling Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Key Benefits */}
            <section className="py-20 px-4 border-y border-gray-200 dark:border-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">Why Sell on Websites Arena?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <div key={index} className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                                    <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-20 text-center">The Complete Selling Process</h2>
                    <div className="space-y-16">
                        {steps.map((step) => {
                            const Icon = step.icon
                            return (
                                <div key={step.number} className="relative">
                                    {step.number !== steps.length && (
                                        <div className="absolute left-6 top-24 w-0.5 h-24 bg-gradient-to-b from-blue-500 to-transparent" />
                                    )}
                                    <div className="flex gap-8">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                Step {step.number}: {step.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                                                {step.description}
                                            </p>
                                            <ul className="space-y-3">
                                                {step.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                                        <span className="text-gray-600 dark:text-gray-400">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Pricing & Valuations */}
            <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">How to Price Your Website</h2>
                    <div className="space-y-6 mb-12">
                        <div className="p-6 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Revenue Multiple Method</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Most websites sell for 24-36 months of net monthly revenue. This is the most common and reliable valuation method.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-mono">
                                Annual Revenue × 2-3 = Fair Sale Price
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Example Valuation</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                <li><strong>Monthly Revenue:</strong> $1,000</li>
                                <li><strong>Annual Revenue:</strong> $12,000</li>
                                <li><strong>At 24x Multiple:</strong> $24,000 - $36,000</li>
                                <li><strong>Industry Average:</strong> $28,000</li>
                            </ul>
                        </div>

                        <div className="p-6 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Factors That Increase Value</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                <li>✓ Growing revenue (positive trajectory)</li>
                                <li>✓ Recurring revenue or subscriptions</li>
                                <li>✓ Loyal customer base</li>
                                <li>✓ Clean, maintainable code</li>
                                <li>✓ Established domain authority</li>
                                <li>✓ Multiple revenue streams</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{faq.question}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Sell Your Website?</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Submit your project today and join hundreds of successful sellers who've earned thousands on Websites Arena.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/sell/submit"
                            className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center"
                        >
                            Submit Your Site <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            href="/sell"
                            className="px-10 py-4 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-400 transition-all"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
