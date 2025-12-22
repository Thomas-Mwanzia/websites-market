'use client'

import { useState, FormEvent } from 'react'
import { ArrowLeft, Send, CheckCircle2, Globe, DollarSign, FileText, Code, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // In a real app, this would send data to an API or email service
        setSubmitted(true)
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
                                required
                                type="number"
                                placeholder="e.g. 500"
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-600" /> Tech Stack
                        </label>
                        <input
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
                            required
                            rows={6}
                            placeholder="Tell us about your project, why you're selling, and what's included..."
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-6 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center justify-center group"
                    >
                        Submit for Review <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
