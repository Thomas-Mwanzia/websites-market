import { Check, X, ArrowRight, DollarSign, Palette, Layout } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Websites Arena vs Tiny Acquisitions | The Best Alternative for Selling Digital Assets",
    description: "Compare Websites Arena vs Tiny Acquisitions. See why creators choose Websites Arena for better design, wider asset variety, and a premium marketplace experience.",
    keywords: ["tiny acquisitions alternative", "sell side projects", "buy side projects", "websites arena vs tiny acquisitions"],
}

export default function TinyAcquisitionsComparePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
                        Websites Arena vs Tiny Acquisitions
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                        The Premium Home <br />
                        <span className="text-blue-600">For Your Side Projects.</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Your hard work deserves a beautiful showcase. Websites Arena offers a world-class design and buying experience.
                    </p>
                    <Link
                        href="/sell"
                        className="inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        List Your Project <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                {/* Comparison Table */}
                <div className="max-w-4xl mx-auto mb-32">
                    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50">
                            <div className="col-span-1"></div>
                            <div className="col-span-1 text-center">
                                <span className="text-xl font-black text-gray-900 dark:text-white">Websites Arena</span>
                            </div>
                            <div className="col-span-1 text-center">
                                <span className="text-xl font-bold text-gray-400">Tiny Acquisitions</span>
                            </div>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Design Quality
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-green-500 font-black text-lg text-center">
                                World-Class
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center">
                                Basic / Dated
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Asset Types
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-blue-600 font-bold text-center text-sm">
                                SaaS, E-books, Templates
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center text-sm">
                                Mostly SaaS
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Listing Fee
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-green-500 font-black text-lg">
                                $0 (Free)
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium">
                                $0 (Free)
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-3 p-8 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                SEO & Marketing
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-900 dark:text-white font-bold text-center">
                                High Visibility
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center">
                                Limited
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                            <Palette className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Beautiful Listings</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            We present your project in the best light possible with high-quality images, video demos, and clean typography.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                            <Layout className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">More Than Code</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Sell your design templates, UI kits, and e-books. We are a home for all digital creators.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fair Pricing</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            We keep our fees competitive so you can keep more of your profit. No hidden costs.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-black dark:bg-white rounded-[3rem] p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white dark:text-black mb-6">Upgrade your marketplace.</h2>
                        <p className="text-gray-400 dark:text-gray-600 text-lg mb-10 max-w-xl mx-auto">
                            Join the platform that treats your side project like a real business.
                        </p>
                        <Link
                            href="/sell/submit"
                            className="inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all"
                        >
                            List Your Project <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
