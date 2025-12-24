'use client'

import { useState } from 'react'
import { ArrowLeft, BarChart3, DollarSign, TrendingUp, Clock, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ROIPage() {
    const [formData, setFormData] = useState({
        price: '',
        profit: '',
        growth: '0'
    })
    const [result, setResult] = useState<{
        breakEvenMonths: number;
        oneYearProfit: number;
        threeYearProfit: number;
        roiPercent: number;
    } | null>(null)

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault()

        const price = parseFloat(formData.price) || 0
        const profit = parseFloat(formData.profit) || 0
        const growthRate = (parseFloat(formData.growth) || 0) / 100

        if (price <= 0 || profit <= 0) return

        let currentMonthlyProfit = profit
        let totalProfit = 0
        let months = 0
        let breakEvenFound = false
        let breakEvenMonths = 0

        // Simulate 36 months (3 years)
        for (let i = 1; i <= 36; i++) {
            totalProfit += currentMonthlyProfit
            months++

            if (!breakEvenFound && totalProfit >= price) {
                breakEvenMonths = months
                breakEvenFound = true
            }

            // Apply growth for next month
            currentMonthlyProfit = currentMonthlyProfit * (1 + growthRate)
        }

        // If not broken even in 3 years, estimate linearly
        if (!breakEvenFound) {
            const remaining = price - totalProfit
            const extraMonths = remaining / currentMonthlyProfit
            breakEvenMonths = 36 + Math.ceil(extraMonths)
        }

        // Calculate 1 year profit (re-run simulation simply)
        let oneYearProfit = 0
        let tempProfit = profit
        for (let i = 1; i <= 12; i++) {
            oneYearProfit += tempProfit
            tempProfit = tempProfit * (1 + growthRate)
        }

        const roiPercent = ((totalProfit - price) / price) * 100

        setResult({
            breakEvenMonths,
            oneYearProfit,
            threeYearProfit: totalProfit,
            roiPercent
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
                        ROI(Investment Return) <span className="text-purple-600">CALCULATOR</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Calculate your Return on Investment. See exactly when you'll make your money back and how much profit you'll generate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Calculator Form */}
                    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                        <form onSubmit={handleCalculate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                    Asking Price <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="e.g. 5000"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">The total amount you are paying for the project.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Monthly Net Profit
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="e.g. 200"
                                        value={formData.profit}
                                        onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Revenue minus expenses (hosting, tools, etc).</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Expected Monthly Growth (%)
                                </label>
                                <div className="relative">
                                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="e.g. 5"
                                        value={formData.growth}
                                        onChange={(e) => setFormData({ ...formData, growth: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Conservative estimate of how much you'll grow profit each month.</p>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center"
                            >
                                <BarChart3 className="w-5 h-5 mr-2" /> Calculate Returns
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
                                    className="space-y-6"
                                >
                                    {/* Break Even Card */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 rounded-3xl p-8 text-center">
                                        <h3 className="text-sm font-bold text-purple-800 dark:text-purple-400 uppercase tracking-widest mb-4 flex items-center justify-center">
                                            <Clock className="w-4 h-4 mr-2" /> Break-Even Time
                                        </h3>
                                        <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">
                                            {result.breakEvenMonths} <span className="text-2xl font-bold text-gray-500">Months</span>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            This is when you earn back your initial investment.
                                        </p>
                                    </div>

                                    {/* Profit Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">1st Year Profit</p>
                                            <p className="text-xl font-black text-gray-900 dark:text-white">
                                                {formatCurrency(result.oneYearProfit)}
                                            </p>
                                        </div>
                                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">3 Year Total</p>
                                            <p className="text-xl font-black text-gray-900 dark:text-white">
                                                {formatCurrency(result.threeYearProfit)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl p-6 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold opacity-70 uppercase mb-1">Total ROI (3 Years)</p>
                                            <p className="text-3xl font-black">
                                                {result.roiPercent > 0 ? '+' : ''}{result.roiPercent.toFixed(0)}%
                                            </p>
                                        </div>
                                        <Link href="/" className="px-6 py-3 bg-white/20 dark:bg-black/10 rounded-xl font-bold hover:bg-white/30 dark:hover:bg-black/20 transition-all">
                                            Find Deals <ArrowRight className="inline-block w-4 h-4 ml-1" />
                                        </Link>
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
                                        <BarChart3 className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        See your future returns
                                    </h3>
                                    <p className="text-gray-500">
                                        Enter the numbers to see how fast you'll make your money back.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Understanding ROI
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    Return on Investment (ROI) is the most critical metric for any digital asset acquisition. It tells you how fast you'll get your money back.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Break-Even Point:</strong> The moment your cumulative profits equal your purchase price.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Annualized Return:</strong> A better way to compare digital assets against stocks or real estate.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Growth Factor:</strong> Even small monthly growth can drastically shorten your break-even time.</span>
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
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> What is a good ROI?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        For digital assets, investors often look for a 30-50% annual return, which is significantly higher than traditional investments.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Does this include taxes?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No, this calculator estimates pre-tax returns. Tax liabilities vary by country and business structure.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> How do I verify profit?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Always ask for P&L statements and payment processor screenshots (Stripe, PayPal) before buying any asset.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Ready to invest?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                Find high-ROI opportunities on Websites Arena. We have listings ranging from $500 micro-SaaS to $50k+ established businesses.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                View Opportunities <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-pink-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
