'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, FileSignature, Copy, Download, User, Camera, Calendar, MapPin, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function ModelReleaseClient() {
    const [formData, setFormData] = useState({
        photographerName: '',
        modelName: '',
        shootDate: new Date().toISOString().split('T')[0],
        location: '',
        witnessName: ''
    })

    const [previewText, setPreviewText] = useState('')

    const generateContract = () => {
        return `MODEL RELEASE FORM

1. GRANT OF RIGHTS
I, ${formData.modelName || '[Model Name]'} ("Model"), hereby grant to ${formData.photographerName || '[Photographer Name]'} ("Photographer") and their legal representatives, heirs, and assigns, the irrevocable and unrestricted right to use and publish photographs of me, or in which I may be included, for editorial, trade, advertising, and any other purpose and in any manner and medium; to alter the same without restriction; and to copyright the same.

2. RELEASE
I hereby release Photographer and their legal representatives and assigns from all claims and liability relating to said photographs.

3. COMPENSATION
I acknowledge that I have received full payment or other consideration for my time and services, and I have no further claim for compensation.

4. AGREEMENT
This agreement shall be binding upon me and my heirs, legal representatives, and assigns.

DATED: ${formData.shootDate}
LOCATION: ${formData.location || '[Location]'}

_____________________________
Signature of Model
(${formData.modelName || '[Model Name]'})

_____________________________
Signature of Photographer
(${formData.photographerName || '[Photographer Name]'})

_____________________________
Signature of Witness
(${formData.witnessName || '[Witness Name]'})
`
    }

    // Update preview when form changes
    useEffect(() => {
        setPreviewText(generateContract())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])

    const handleCopy = () => {
        navigator.clipboard.writeText(previewText)
        toast.success('Contract copied to clipboard!')
    }

    const handleDownload = () => {
        const content = previewText
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'model-release-form.txt'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
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
                        MODEL <span className="text-pink-600">RELEASE</span> GENERATOR
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
                        Create a legally binding model release form in seconds. Essential for selling stock photography and commercial work.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center mb-6">
                                <User className="w-5 h-5 mr-2 text-pink-600" /> Parties Involved
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Photographer Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        value={formData.photographerName}
                                        onChange={(e) => setFormData({ ...formData, photographerName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Model Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jane Smith"
                                        value={formData.modelName}
                                        onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Witness Name (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Bob Wilson"
                                        value={formData.witnessName}
                                        onChange={(e) => setFormData({ ...formData, witnessName: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
                            <h3 className="font-bold text-gray-900 dark:text-white flex items-center mb-6">
                                <Camera className="w-5 h-5 mr-2 text-pink-600" /> Shoot Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="date"
                                            value={formData.shootDate}
                                            onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Central Park, NY"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-pink-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="flex flex-col h-full">
                        <div className="bg-gray-900 rounded-t-3xl p-4 flex justify-between items-center">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                    title="Copy to Clipboard"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                    title="Download Text"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={previewText}
                            onChange={(e) => setPreviewText(e.target.value)}
                            className="w-full h-full min-h-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-b-3xl p-8 shadow-xl font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-300 resize-none focus:ring-2 focus:ring-pink-600 outline-none"
                        />
                    </div>
                </div>

                {/* SEO & Conversion Content */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Why do you need a Model Release?
                            </h2>
                            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                <p>
                                    If you plan to sell your photos or use them for commercial purposes (ads, brochures, websites), you legally need the model's permission.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Sell on Stock Sites:</strong> Shutterstock, Adobe Stock, and Getty Images all require this form.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Avoid Lawsuits:</strong> Protect yourself from claims of "Right of Publicity" violations.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-pink-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span><strong>Professionalism:</strong> Shows clients and models that you run a legitimate business.</span>
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
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Is this legally binding?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes, this is a standard general release form used in the industry. However, for complex commercial shoots, consult a lawyer.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Do I need a witness?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        It's not strictly required in all jurisdictions, but having a witness sign adds an extra layer of legal validity.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                        <HelpCircle className="w-4 h-4 mr-2 text-gray-400" /> Can I edit the text?
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Yes! The preview box is fully editable. You can add specific clauses or remove sections as needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-black dark:bg-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-white dark:text-black mb-4">
                                Got a portfolio of great shots?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
                                Don't let them sit on your hard drive. Sell your high-resolution photos and video footage on Websites Arena.
                            </p>
                            <Link
                                href="/sell"
                                className="inline-flex items-center px-8 py-4 bg-white text-black dark:bg-black dark:text-white rounded-full font-bold text-lg hover:scale-105 transition-transform"
                            >
                                Sell Your Work <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-pink-600 blur-[100px]"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-rose-600 blur-[100px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
