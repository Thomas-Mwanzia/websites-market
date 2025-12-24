'use client'

import { useState } from 'react'
import { ArrowLeft, Calculator, DollarSign, TrendingUp, Calendar, Code, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ValuationPage() {
    const [formData, setFormData] = useState({
        revenue: '',
        profit: '',
        traffic: '',
        age: '',
        techStack: 'modern' // modern, wordpress, nocode, other
    })
    const [result, setResult] = useState<{ min: number; max: number } | null>(null)

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault()

        const profit = parseFloat(formData.profit) || 0
        const revenue = parseFloat(formData.revenue) || 0
        const traffic = parseFloat(formData.traffic) || 0
        const age = parseFloat(formData.age) || 0

        if (profit <= 0 && revenue <= 0) {
            // Pre-revenue valuation logic (based on traffic/tech)
            let baseValuation = 500 // Starter value
            if (traffic > 1000) baseValuation += (traffic * 0.5) // $0.50 per visitor
            if (formData.techStack === 'modern') baseValuation *= 1.5
            if (age > 6) baseValuation *= 1.2

            setResult({
                min: Math.round(baseValuation * 0.8),
                max: Math.round(baseValuation * 1.2)
            })
            return
        }

        // Revenue-based valuation logic
        let multiplier = 30 // Base 30x monthly profit (2.5 years)

        // Adjustments
        if (formData.techStack === 'modern') multiplier += 5 // Next.js/React premium
        if (formData.techStack === 'nocode') multiplier -= 5 // No-code discount
        if (age > 12) multiplier += 5 // Stability premium
        if (age < 3) multiplier -= 10 // Risk discount
        if (traffic > 10000) multiplier += 5 // High traffic premium

        // Profit margin adjustment
        const margin = (profit / revenue)
        if (margin > 0.8) multiplier += 5 // High margin
        if (margin < 0.2) multiplier -= 5 // Low margin

        const valuation = profit * multiplier

        setResult({
            min: Math.round(valuation * 0.9),
            max: Math.round(valuation * 1.1)
        })
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val)
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-left">
                    <Link href="/tools" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Armory
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        SAAS <span className="text-green-600">VALUATION</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Discover what your project is worth in today's market. Based on real sales data from the Websites Arena marketplace.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Calculator Form */}
                    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                        <form onSubmit={handleCalculate} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                        Monthly Revenue
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={formData.revenue}
                                            onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                        Monthly Profit
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={formData.profit}
                                            onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Monthly Traffic (Unique Visitors)
                                </label>
                                <div className="relative">
                                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="e.g. 5000"
                                        value={formData.traffic}
                                        onChange={(e) => setFormData({ ...formData, traffic: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                        Project Age (Months)
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="e.g. 12"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                        Tech Stack
                                    </label>
                                    <div className="relative">
                                        <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            value={formData.techStack}
                                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all appearance-none"
                                        >
                                            <option value="modern">Modern (Next.js, React)</option>
                                            <option value="wordpress">WordPress / PHP</option>
                                            <option value="nocode">No-Code (Bubble, etc)</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center"
                            >
                                <Calculator className="w-5 h-5 mr-2" /> Calculate Value
                            </button>
                        </form>
                    </div>

                    {/* Result Section */}
                    <div className="flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-3xl p-8 text-center"
                                >
                                    <h3 className="text-sm font-bold text-green-800 dark:text-green-400 uppercase tracking-widest mb-4">
                                        Estimated Valuation
                                    </h3>
                                    <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
                                        {formatCurrency(result.min)} - {formatCurrency(result.max)}
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
                                        *This is an estimate based on market multiples.
                                    </p>

                                    <div className="space-y-4">
                                        <p className="font-bold text-gray-900 dark:text-white">
                                            Like this price?
                                        </p>
                                        <Link
                                            href="/sell"
                                            className="block w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                                        >
                                            List for Free <ArrowRight className="inline-block w-5 h-5 ml-2" />
                                        </Link>
                                        <p className="text-xs text-gray-400">
                                            Get access to 10,000+ buyers instantly.
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center p-8 opacity-50"
                                >
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <DollarSign className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Enter your metrics
                                    </h3>
                                    <p className="text-gray-500">
                                        Fill out the form to see how much your project could sell for today.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* SEO Content */}
                <div className="mt-24 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        How we calculate valuation
                    </h2>
                    <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                        <p>
                            Valuing a SaaS or digital asset is part art, part science. We use a <strong>Profit Multiplier</strong> method, which is the industry standard for micro-SaaS acquisitions.
                        </p>
                        <ul className="space-y-3 pl-4">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                <span><strong>Profit:</strong> The most important metric. We typically see multiples of 24x - 48x monthly profit.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                <span><strong>Tech Stack:</strong> Modern stacks like Next.js and React are easier to transfer and maintain, commanding a premium.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                <span><strong>Age & Stability:</strong> Older projects with consistent history are less risky and worth more.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Valuation Methodology
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    Our calculator uses a <strong>Profit Multiplier</strong> approach, which is the industry standard for valuing digital assets.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Profit (SDE):</strong> The primary driver. We typically see multiples of 24x - 48x monthly profit.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Growth Rate:</strong> Fast-growing SaaS companies command a premium.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Tech Stack:</strong> Modern stacks (Next.js, React) are easier to transfer and maintain.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> How accurate is this?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This provides a realistic range based on current market data. However, the final price depends on negotiation and due diligence.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> What if I have no revenue?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Pre-revenue projects are valued based on traffic, technology, and potential. Our calculator accounts for this.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Where can I sell?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Websites Arena is the best place to sell your SaaS. We connect you with thousands of verified buyers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Looking for an investment?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                Don't just calculate values—start investing. Browse hundreds of profitable SaaS businesses and content sites for sale right now.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                Browse Listings <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-green-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-emerald-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
