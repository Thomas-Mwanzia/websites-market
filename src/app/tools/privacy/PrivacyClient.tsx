'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Shield, Copy, Check, Globe, Mail, Building2, FileText, Download, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function PrivacyPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        websiteUrl: '',
        email: '',
        collectsEmail: true,
        collectsName: true,
        collectsPayment: false,
        collectsAnalytics: true,
        collectsCookies: true,
        hasDigitalGoods: false
    })

    const [previewText, setPreviewText] = useState('')

    const generatePolicy = () => {
        const date = new Date().toLocaleDateString()

        let dataCollected = []
        if (formData.collectsEmail) dataCollected.push('Email address')
        if (formData.collectsName) dataCollected.push('First and last name')
        if (formData.collectsPayment) dataCollected.push('Payment information')
        if (formData.collectsAnalytics) dataCollected.push('Usage data and analytics')
        if (formData.collectsCookies) dataCollected.push('Cookies and tracking technologies')

        return `PRIVACY POLICY
Last updated: ${date}

1. INTRODUCTION
Welcome to ${formData.companyName || '[Company Name]'}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (${formData.websiteUrl || '[Website URL]'}) and tell you about your privacy rights and how the law protects you.

2. THE DATA WE COLLECT
We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
${dataCollected.map(item => `- ${item}`).join('\n')}

3. HOW WE USE YOUR DATA
We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
- To register you as a new customer.
- To process and deliver your order.
- To manage our relationship with you.
- To improve our website, products/services, marketing or customer relationships.

4. DATA SECURITY
We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.

5. REFUND POLICY
${formData.hasDigitalGoods
                ? 'We offer a 10-day money-back guarantee for all digital assets. If you are not satisfied with your purchase within 10 days of delivery, please contact us at ' + (formData.email || '[Email Address]') + ' for a refund. Please see our Terms of Service for complete refund policy details.'
                : 'We offer a 10-day money-back guarantee for all purchases. If you are not satisfied, please contact us for a refund.'}

6. CONTACT DETAILS
If you have any questions about this privacy policy or our privacy practices, please contact us at:
Email: ${formData.email || '[Email Address]'}
`
    }

    // Update preview when form changes
    useEffect(() => {
        setPreviewText(generatePolicy())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    const handleCopy = () => {
        navigator.clipboard.writeText(previewText)
        toast.success('Privacy Policy copied to clipboard!')
    }

    const handleDownload = (format: 'txt' | 'html') => {
        const content = previewText
        const blob = new Blob([content], { type: format === 'html' ? 'text/html' : 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `privacy-policy.${format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success(`Downloaded as ${format.toUpperCase()}`)
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <Toaster position="bottom-center" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/tools" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Armory
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        PRIVACY POLICY <span className="text-amber-600">GENERATOR</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Generate a standard privacy policy for your SaaS or digital product in seconds. Free and ready to use.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <Building2 className="w-5 h-5 mr-2 text-amber-600" /> Company Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">App / Company Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Acme Corp"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Website URL</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            value={formData.websiteUrl}
                                            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="support@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-amber-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.hasDigitalGoods}
                                            onChange={(e) => setFormData({ ...formData, hasDigitalGoods: e.target.checked })}
                                            className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 border-gray-300 dark:border-gray-700"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            I sell digital products (with 10-day refund guarantee)
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <Shield className="w-5 h-5 mr-2 text-amber-600" /> Data Collection
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'collectsEmail', label: 'Email Addresses' },
                                    { id: 'collectsName', label: 'Names' },
                                    { id: 'collectsPayment', label: 'Payment Information' },
                                    { id: 'collectsAnalytics', label: 'Analytics / Usage Data' },
                                    { id: 'collectsCookies', label: 'Cookies' },
                                ].map((item) => (
                                    <label key={item.id} className="flex items-center p-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:border-amber-500 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={formData[item.id as keyof typeof formData] as boolean}
                                            onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                                            className="w-5 h-5 text-amber-600 rounded focus:ring-amber-600 border-gray-300"
                                        />
                                        <span className="ml-3 font-medium text-gray-900 dark:text-white">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="relative h-full min-h-[600px]">
                        <div className="sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-amber-600" /> Live Preview
                                </h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDownload('txt')}
                                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-bold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
                                    >
                                        <Download className="w-3 h-3 mr-1" /> TXT
                                    </button>
                                    <button
                                        onClick={() => handleDownload('html')}
                                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-bold text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
                                    >
                                        <Download className="w-3 h-3 mr-1" /> HTML
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold text-sm hover:opacity-80 transition-opacity flex items-center"
                                    >
                                        <Copy className="w-4 h-4 mr-2" /> Copy
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={previewText}
                                onChange={(e) => setPreviewText(e.target.value)}
                                className="w-full h-full min-h-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-300 resize-none focus:ring-2 focus:ring-amber-600 outline-none"
                            />
                        </div>
                    </div>
                </div>


                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Why do you need a Privacy Policy?
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    A Privacy Policy is a legal requirement for any website or app that collects user data. It builds trust with your users and protects your business from legal issues.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>GDPR & CCPA Compliance:</strong> Essential for operating in Europe and California.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>App Store Requirement:</strong> Google Play and Apple App Store require a privacy policy link.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Third-Party Tools:</strong> Services like Google Analytics and AdSense require you to disclose data collection.</span>
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
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Is this free?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes, this tool is 100% free to use for unlimited projects. No credit card required.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Can I use this for mobile apps?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Absolutely. This policy template covers both web and mobile applications.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Is this legal advice?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This is a standard template suitable for most startups. For complex legal needs, we always recommend consulting a professional lawyer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Built a great product?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                Don't let it sit idle. List your SaaS, app, or digital asset on Websites Arena and reach thousands of potential buyers instantly.
                            </p>
                            <Link
                                href="/sell"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                List Your Project <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-amber-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-blue-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
