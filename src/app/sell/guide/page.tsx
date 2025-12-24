import { ArrowRight, CheckCircle2, DollarSign, Rocket, ShieldCheck, Clock, FileCheck, TrendingUp, Users, Zap, BookOpen, Layout } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "How to Sell Digital Assets | Seller Guide | Websites Arena",
    description: "Learn how to sell your website, e-book, or design template on Websites Arena. Complete step-by-step guide covering listing, pricing, and selling your digital asset.",
    keywords: [
        "how to sell digital products",
        "sell e-book guide",
        "sell website guide",
        "digital asset marketplace",
        "passive income",
        "creator economy"
    ],
    openGraph: {
        title: "How to Sell Digital Assets | Seller Guide | Websites Arena",
        description: "Learn how to sell your website, e-book, or design template on Websites Arena. Complete step-by-step guide covering listing, pricing, and selling your digital asset.",
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
            title: "Prepare Your Asset",
            description: "Ensure your product is ready for the public. For code, clean it up. For PDFs, ensure high-quality formatting.",
            details: [
                "Clean code & documentation (SaaS)",
                "High-res files & Model Releases (Art/Media)",
                "Course curriculum & video links (Courses)",
                "Ownership proof (Domains)",
                "Working demo link",
                "SaaS: Upload as ZIP with README.md"
            ],
            icon: FileCheck
        },
        {
            number: 2,
            title: "Calculate Your Price",
            description: "Research similar products. SaaS projects often sell for 24x monthly revenue. E-books and templates typically range from $20-$200.",
            details: [
                "Analyze comparable listings",
                "Calculate revenue multiples (for SaaS)",
                "Factor in uniqueness",
                "Consider market demand",
                "Set a fair fixed price"
            ],
            icon: DollarSign
        },
        {
            number: 3,
            title: "Submit Your Listing",
            description: "Fill out our simple submission form. Select your product type (SaaS, E-book, Template) and provide the details.",
            details: [
                "Select correct category",
                "Write compelling description",
                "Add high-quality screenshots",
                "List all features",
                "Include proof of traction"
            ],
            icon: Rocket
        },
        {
            number: 4,
            title: "Review & Approval",
            description: "Our team reviews your listing for quality. We typically approve legitimate listings within 24-48 hours.",
            details: [
                "Quality assessment",
                "Virus/Malware check (for files)",
                "Market fit analysis",
                "Approval or feedback",
                "Live notification"
            ],
            icon: CheckCircle2
        },
        {
            number: 5,
            title: "Go Live & Get Paid",
            description: "Your listing goes live. When a sale happens, we handle the delivery and send you 85% of the sale price.",
            details: [
                "Instant file delivery",
                "Secure payment processing",
                "15% commission deducted",
                "85% paid to you",
                "Automated payouts"
            ],
            icon: TrendingUp
        }
    ]

    const benefits = [
        {
            icon: Zap,
            title: "Fast Processing",
            description: "Listing approval within 24-48 hours. Start selling immediately."
        },
        {
            icon: Users,
            title: "Thousands of Buyers",
            description: "Access our network of entrepreneurs and creators looking for assets."
        },
        {
            icon: ShieldCheck,
            title: "Secure Delivery",
            description: "We handle the file hosting and delivery. You don't need to lift a finger."
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
            title: "Passive Income",
            description: "List once, sell forever. Perfect for e-books and templates."
        }
    ]

    const faqs = [
        {
            question: "What can I sell?",
            answer: "We accept starter websites, micro-SaaS, e-books, courses, photography, video footage, digital art, templates (Figma/Notion), and premium domains. If it's digital and valuable, you can sell it."
        },
        {
            question: "How do I deliver the file?",
            answer: "For files (PDFs, Templates), you upload them to us (or provide a secure link) during the listing process. We handle the automated delivery to the buyer."
        },
        {
            question: "What's your commission?",
            answer: "We take a 15% commission on successful sales. You keep 85% of the sale price. No hidden fees."
        },
        {
            question: "How is code transferred?",
            answer: "For SaaS/Websites, we facilitate a secure handover of the repository (GitHub) and domain ownership after the purchase is confirmed."
        },
        {
            question: "How do I get paid?",
            answer: "We support PayPal, Wise, Bank Transfer, and Crypto. Payouts are processed automatically after the sale is finalized."
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
                        How to Sell Digital Assets <br /> in 5 Simple Steps
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        A complete guide to selling your code, content, and designs on Websites Arena. Learn how to turn your work into passive income.
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

            {/* FAQ Section */}
            <section className="py-32 px-4 bg-gray-50 dark:bg-gray-900/30">
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Sell?</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Submit your project today and join hundreds of successful creators on Websites Arena.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/sell/submit"
                            className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center"
                        >
                            Submit Your Project <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
