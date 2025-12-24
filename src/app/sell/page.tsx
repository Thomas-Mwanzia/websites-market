import { ArrowRight, CheckCircle2, DollarSign, Rocket, ShieldCheck, Zap, BookOpen, Layout, Code2, GraduationCap, Wrench, Globe } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Sell Your Digital Assets | Websites Arena Marketplace",
    description: "Sell your starter website, e-book, UI kit, or template on Websites Arena. Reach thousands of buyers, keep 85% of the profit, and enjoy secure, automated delivery.",
    keywords: ["sell website", "sell saas", "sell e-book", "sell templates", "digital asset marketplace", "passive income", "creator economy", "sell notion template", "sell figma ui kit", "sell code", "sell software"],
}

export default function SellPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="pt-24 pb-32 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
                        Creator Marketplace
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Monetize Your Digital Assets
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Sell your websites, e-books, templates, courses, and other digital assets on Websites Arena. We handle the marketing, payments, and delivery so you can focus on creating.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/sell/submit"
                            className="px-10 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center"
                        >
                            Start Selling <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            href="/sell/guide"
                            className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all dark:bg-black dark:text-white dark:border-gray-800 dark:hover:bg-gray-900"
                        >
                            How it Works
                        </Link>
                    </div>
                </div>
            </section>

            {/* What Can You Sell? */}
            <section className="py-20 border-y border-gray-200 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Can You Sell?</h2>
                        <p className="text-gray-500 dark:text-gray-400">If it's digital and valuable, there's a buyer for it.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <Code2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">SaaS & Websites</h3>
                            <p className="text-gray-500 dark:text-gray-400">modern tech stack websites, micro-SaaS projects, and niche blogs among others.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">E-books & Guides</h3>
                            <p className="text-gray-500 dark:text-gray-400">PDF guides, courses, and educational content.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                <Layout className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Templates & UI Kits</h3>
                            <p className="text-gray-500 dark:text-gray-400">Figma files, Notion templates, and component libraries.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Courses & Education</h3>
                            <p className="text-gray-500 dark:text-gray-400">Video courses, coding tutorials, and workshops.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Boilerplates & Tools</h3>
                            <p className="text-gray-500 dark:text-gray-400">SaaS starters, automation scripts, and dev tools.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors group">
                            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Domains & More</h3>
                            <p className="text-gray-500 dark:text-gray-400">Premium domains, plugins, and digital assets.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Sell With Us */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Websites Arena?</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">The most transparent marketplace for creators.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div>
                            <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                                <DollarSign className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Keep 85% Profit</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                We only take a small 15% commission on successful sales. You keep the rest of your hard-earned money.
                            </p>
                        </div>

                        <div>
                            <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                                <Rocket className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fast Listings</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                Our team reviews and approves listings within 24-48 hours, so you can start selling immediately.
                            </p>
                        </div>

                        <div>
                            <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 shadow-sm">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Secure Delivery</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                We handle the payment and file delivery securely, ensuring both the buyer and seller are protected.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-32 px-4 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-20 text-center">How It Works</h2>
                    <div className="space-y-20">
                        <div className="flex items-start space-x-8">
                            <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl font-bold">1</div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Submit Your Project</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                                    Fill out our simple form with your product details. Whether it's code, a PDF, or a design file, we support it all.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-8">
                            <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl font-bold">2</div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">We Review & List</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                                    Our team vets your product for quality. Once approved, we create a high-converting listing and promote it to our audience.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-8">
                            <div className="flex-shrink-0 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl font-bold">3</div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Paid Automatically</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                                    When a sale happens, we handle the transaction and file delivery. You get paid your 85% share directly to your account.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 p-12 bg-blue-600 rounded-[3rem] text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <h3 className="text-3xl font-bold mb-6 relative z-10">Ready to earn?</h3>
                        <p className="mb-12 text-blue-100 text-lg max-w-md mx-auto relative z-10">
                            Join the fastest growing marketplace for digital assets and get the value your work deserves.
                        </p>
                        <Link
                            href="/sell/submit"
                            className="inline-block px-12 py-6 bg-white text-blue-600 rounded-full font-bold text-xl hover:bg-gray-100 transition-all relative z-10"
                        >
                            Submit Your Project
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
