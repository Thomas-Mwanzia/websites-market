'use client'

import { useState, FormEvent } from 'react'
import { ArrowLeft, Send, CheckCircle2, Globe, DollarSign, FileText, Code, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [payoutMethod, setPayoutMethod] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const data = {
            url: formData.get('url'),
            price: formData.get('price'),
            techStack: formData.get('techStack'),
            description: formData.get('description'),
            email: formData.get('email'),
            payoutMethod: formData.get('payoutMethod'),
            payoutDetails: formData.get('payoutDetails'),
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                alert('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Submission Received!</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg">
                        Our team will review your project and get back to you within 24-48 hours. Check your email for a confirmation.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                    >
                        Browse Marketplace
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/sell" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-12 transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Link>

                <div className="mb-16">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        SUBMIT YOUR <br />
                        <span className="text-blue-600">PROJECT.</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                        Fill out the form below to start the vetting process. We'll review your code, design, and potential.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                <Globe className="w-4 h-4 mr-2 text-blue-600" /> Website URL
                            </label>
                            <input
                                name="url"
                                required
                                type="url"
                                placeholder="https://yourproject.com"
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-blue-600" /> Asking Price ($)
                            </label>
                            <input
                                name="price"
                                required
                                type="number"
                                placeholder="e.g. 500"
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            <Send className="w-4 h-4 mr-2 text-blue-600" /> Contact Email
                        </label>
                        <input
                            name="email"
                            required
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-blue-600" /> Preferred Payout Method
                        </label>
                        <select
                            name="payoutMethod"
                            required
                            value={payoutMethod}
                            onChange={(e) => setPayoutMethod(e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                        >
                            <option value="" disabled>Select a method...</option>
                            <option value="PayPal">PayPal (Fees may apply)</option>
                            <option value="Wise">Wise (Recommended)</option>
                            <option value="Bank Transfer">Bank Transfer ($25 fee)</option>
                            <option value="Crypto">Crypto (USDT/USDC)</option>
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            * Transaction fees may be deducted from your final payout depending on the selected method.
                        </p>
                    </div>

                    {payoutMethod && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2"
                        >
                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                                {payoutMethod === 'Crypto' ? 'Wallet Address (USDT/USDC)' :
                                    payoutMethod === 'Bank Transfer' ? 'Bank Details (IBAN/SWIFT)' :
                                        `${payoutMethod} Email`}
                            </label>
                            <input
                                name="payoutDetails"
                                required
                                type="text"
                                placeholder={
                                    payoutMethod === 'Crypto' ? '0x...' :
                                        payoutMethod === 'Bank Transfer' ? 'IBAN / SWIFT / Account Number' :
                                            'you@example.com'
                                }
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            />
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-600" /> Tech Stack
                        </label>
                        <input
                            name="techStack"
                            required
                            type="text"
                            placeholder="e.g. Next.js, Tailwind, Sanity"
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-blue-600" /> Description & Features
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={6}
                            placeholder="Tell us about your project, why you're selling, and what's included..."
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Submit for Review'} <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-start">
                        <Shield className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Our Vetting Process</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                We manually review every submission to ensure it meets our quality standards. This includes checking for clean code, responsive design, and legitimate business potential.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
