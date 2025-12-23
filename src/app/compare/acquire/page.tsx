import { Check, X, ArrowRight, DollarSign, ShieldCheck, Zap, Users } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Websites Arena vs Acquire.com | The Best Alternative for Selling SaaS",
    description: "Compare Websites Arena vs Acquire.com (MicroAcquire). See why creators choose Websites Arena for open access, lower fees, and no buyer paywalls.",
    keywords: ["acquire.com alternative", "microacquire alternative", "sell saas", "buy micro saas", "websites arena vs acquire.com"],
}

export default function AcquireComparePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
                        Websites Arena vs Acquire.com
                    </div>
              
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Acquire.com often requires buyer subscriptions. Websites Arena puts your work in front of thousands of buyers instantly.
                    </p>
                    <Link
                        href="/sell"
                        className="inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        List Your SaaS <ArrowRight className="ml-2 w-5 h-5" />
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
                                <span className="text-xl font-bold text-gray-400">Acquire.com</span>
                            </div>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Buyer Access
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-green-500 font-black text-lg text-center">
                                Open to All
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-red-500 font-medium text-center">
                                Subscription Required
                            </div>
                        </div>

                        {/* Row 2 */}
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

                        {/* Row 3 */}
                        <div className="grid grid-cols-3 p-8 border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Asset Variety
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-blue-600 font-bold text-center text-sm">
                                SaaS, E-books, Templates
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center text-sm">
                                SaaS Only
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-3 p-8 hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                            <div className="col-span-1 flex items-center font-bold text-gray-900 dark:text-white">
                                Complexity
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-900 dark:text-white font-bold text-center">
                                Simple & Fast
                            </div>
                            <div className="col-span-1 flex items-center justify-center text-gray-500 font-medium text-center">
                                Enterprise Focused
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">More Buyers</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            We don't charge buyers to see your listing. This means more eyes on your project and faster offers.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Instant Access</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Buyers can purchase digital assets instantly. No long negotiation processes for smaller items.
                        </p>
                    </div>
                    <div className="p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Creator Focused</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            We support all types of digital creators, not just SaaS founders. Sell your e-books and templates too.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-black dark:bg-white rounded-[3rem] p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white dark:text-black mb-6">Don't limit your reach.</h2>
                        <p className="text-gray-400 dark:text-gray-600 text-lg mb-10 max-w-xl mx-auto">
                            List on Websites Arena and get your project in front of everyone, not just premium subscribers.
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
