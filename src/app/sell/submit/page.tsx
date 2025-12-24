'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { ArrowLeft, Send, CheckCircle2, Globe, DollarSign, FileText, Code, Shield, BookOpen, Layout, Monitor, Link as LinkIcon, Upload, AlertCircle, Video, GraduationCap, Camera, Image as ImageIcon, Film } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'

const ASSET_CATEGORIES = ['Photography', 'Video Footage', 'Digital Art', 'Template', 'E-book', 'Course']

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [payoutMethod, setPayoutMethod] = useState('')
    const [productType, setProductType] = useState('saas')
    const [submissionMethod, setSubmissionMethod] = useState<'link' | 'file'>('link')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    // Form Data State
    const [formData, setFormData] = useState({
        revenue: '',
        profit: '',
        traffic: '',
        age: '',
        resolution: '',
        format: ''
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.size > 10 * 1024 * 1024) { // 10MB
                toast.error('File is too large (Max 10MB). Please use a link instead.', {
                    icon: '⚠️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                e.target.value = '' // Reset input
                return
            }
            setSelectedFile(file)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const submitData = new FormData(e.target as HTMLFormElement)
        submitData.set('productType', productType)
        submitData.set('captchaToken', captchaToken!)

        if (submissionMethod === 'file' && !selectedFile && !['saas', 'course'].includes(productType)) {
            toast.error('Please select a file to upload.')
            setIsSubmitting(false)
            return
        }

        if (!captchaToken) {
            toast.error('Please complete the captcha verification.')
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: submitData,
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                toast.error('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            toast.error('Failed to submit. Please check your connection.')
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
            <Toaster position="top-center" />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/sell" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-12 transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Link>

                <div className="mb-16">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        SUBMIT YOUR <br />
                        <span className="text-blue-600">DIGITAL ASSET.</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                        Fill out the form below to start the vetting process. We'll review your submission and get back to you shortly.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Product Type Selector */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { id: 'saas', label: 'SaaS / Web', icon: Monitor },
                            { id: 'ebook', label: 'E-book', icon: BookOpen },
                            { id: 'template', label: 'Template', icon: Layout },
                            { id: 'course', label: 'Course', icon: GraduationCap },
                            { id: 'Photography', label: 'Photo', icon: Camera },
                            { id: 'Video Footage', label: 'Video', icon: Film },
                            { id: 'Digital Art', label: 'Art', icon: ImageIcon },
                        ].map((type) => {
                            const Icon = type.icon
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => {
                                        setProductType(type.id)
                                        if (['saas', 'course'].includes(type.id)) {
                                            setSubmissionMethod('link')
                                        }
                                    }}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${productType === type.id
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                        : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 text-gray-500'
                                        }`}
                                >
                                    <Icon className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-bold">{type.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {!['ebook', 'Photography', 'Video Footage', 'Digital Art'].includes(productType) && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                                    {productType === 'saas' ? 'Website URL' : 'Demo URL'}
                                </label>
                                <input
                                    name="url"
                                    required
                                    type="url"
                                    placeholder="https://..."
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                        )}
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

                    {/* Business Metrics - Hidden for Asset Categories */}
                    {!ASSET_CATEGORIES.includes(productType) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Monthly Revenue
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="0"
                                    value={formData.revenue}
                                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Monthly Profit
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="0"
                                    value={formData.profit}
                                    onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Monthly Traffic
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="0"
                                    value={formData.traffic}
                                    onChange={(e) => setFormData({ ...formData, traffic: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Project Age (Months)
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="12"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {/* Asset Details - Only for Art/Media */}
                    {['Photography', 'Video Footage', 'Digital Art'].includes(productType) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    Resolution / Dimensions
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 4K, 6000x4000px"
                                    value={formData.resolution}
                                    onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                    File Format
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. RAW, MP4, PNG"
                                    value={formData.format}
                                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {/* Asset Delivery Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            {productType === 'saas' ? (
                                <><Code className="w-4 h-4 mr-2 text-blue-600" /> Source Code / Repo</>
                            ) : productType === 'course' ? (
                                <><LinkIcon className="w-4 h-4 mr-2 text-blue-600" /> Course Link</>
                            ) : (
                                <><Upload className="w-4 h-4 mr-2 text-blue-600" /> Asset Delivery</>
                            )}
                        </label>

                        {!['saas', 'course'].includes(productType) && (
                            <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl w-fit mb-4">
                                <button
                                    type="button"
                                    onClick={() => setSubmissionMethod('link')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${submissionMethod === 'link'
                                        ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Share Link
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSubmissionMethod('file')}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${submissionMethod === 'file'
                                        ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                        }`}
                                >
                                    Upload File
                                </button>
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {submissionMethod === 'link' || ['saas', 'course'].includes(productType) ? (
                                <motion.div
                                    key="link-input"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <input
                                        name="assetLink"
                                        required={submissionMethod === 'link'}
                                        type="url"
                                        placeholder={productType === 'saas' ? "https://github.com/username/repo" : "https://dropbox.com/s/..."}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="file-input"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <div className="relative group">
                                        <input
                                            name="file"
                                            type="file"
                                            accept=".pdf,.zip,.rar,.png,.jpg"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full px-6 py-8 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl group-hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center">
                                            {selectedFile ? (
                                                <>
                                                    <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                                                    <span className="font-bold text-gray-900 dark:text-white">{selectedFile.name}</span>
                                                    <span className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                    <span className="font-bold text-gray-900 dark:text-white">Click to Upload File</span>
                                                    <span className="text-sm text-gray-500">PDF, ZIP, Images (Max 10MB)</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                            <FileText className="w-4 h-4 mr-2 text-blue-600" /> Description & Features
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={6}
                            placeholder="Tell us about your project, what's included, and why it's valuable..."
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token) => setCaptchaToken(token)}
                            theme="light"
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
