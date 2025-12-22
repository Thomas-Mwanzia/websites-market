import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                        No hidden fees. No monthly subscriptions. We only win when you win.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <div className="p-12 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem] border border-gray-200 dark:border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl font-bold text-sm uppercase tracking-widest">
                            For Sellers
                        </div>

                        <div className="mb-8">
                            <span className="text-6xl font-black text-gray-900 dark:text-white">15%</span>
                            <span className="text-xl text-gray-500 font-bold ml-2">Commission</span>
                        </div>

                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 font-medium leading-relaxed">
                            We take a small 15% fee on every successful sale to cover platform maintenance, marketing, and secure file delivery.
                        </p>

                        <ul className="space-y-6 mb-12">
                            {[
                                "Free to list your site",
                                "No monthly fees",
                                "Secure escrow payments",
                                "Automated file delivery",
                                "Hand-vetted listings",
                                "Global reach"
                            ].map((item) => (
                                <li key={item} className="flex items-center text-gray-900 dark:text-white font-bold">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/sell"
                            className="block w-full py-6 bg-black text-white dark:bg-white dark:text-black text-center rounded-full font-bold text-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center"
                        >
                            Start Selling <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
