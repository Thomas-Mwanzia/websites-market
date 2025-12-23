import { Check, X, ArrowRight, DollarSign, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Websites Arena vs Flippa | The Best Alternative for Selling Websites",
    description: "Compare Websites Arena vs Flippa. See why creators choose Websites Arena for $0 listing fees, higher profit margins, and better quality control.",
    keywords: ["flippa alternative", "websites arena vs flippa", "sell website for free", "flippa fees", "best place to sell websites"],
}

export default function FlippaComparePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
                        Websites Arena vs Flippa
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                        The Flippa Alternative <br />
                        <span className="text-blue-600">That Puts Creators First.</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Stop paying upfront fees just to list your project. Websites Arena is the curated, creator-friendly marketplace you've been looking for.
                    </p>
                    <Link
                        href="/sell"
                        className="inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        Start Selling for Free <ArrowRight className="ml-2 w-5 h-5" />
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
                                <span className="text-xl font-bold text-gray-400">Flippa</span>
                            </div>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Listing Fee
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-green-500 font-black text-lg">
                                $0 (Free)
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-red-500 font-medium">
                                $29 - $499+
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Success Fee
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-900 dark:text-white font-bold">
                                15%
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium">
                                10% - 15%
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Quality Control
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-blue-600 font-bold text-center">
                                <ShieldCheck className="w-5 h-5 mr-2" /> Hand-Vetted
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center">
                                Automated / Mixed
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-3 p-8 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Asset Types
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-900 dark:text-white font-bold text-center text-sm">
                                SaaS, E-books, Templates
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center text-sm">
                                Everything (incl. junk)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Keep More Profit</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Don't pay to list. We only make money when you make money. Simple, fair pricing for everyone.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No Junk Listings</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Flippa is full of low-quality spam. We manually vet every project to ensure a premium marketplace.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Faster Sales</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Our focused audience of developers and entrepreneurs means faster sales for quality assets.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-black dark:bg-white rounded-[3rem] p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white dark:text-black mb-6">Ready to switch?</h2>
                        <p className="text-gray-400 dark:text-gray-600 text-lg mb-10 max-w-xl mx-auto">
                            List your project on Websites Arena today and experience the difference.
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
