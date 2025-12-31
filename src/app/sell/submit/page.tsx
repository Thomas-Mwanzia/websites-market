'use client'

import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { ArrowLeft, Send, CheckCircle2, Globe, DollarSign, FileText, Code, Shield, BookOpen, Layout, Monitor, Link as LinkIcon, Upload, AlertCircle, Video, GraduationCap, Camera, Image as ImageIcon, Film, Calendar, RotateCcw, Star, Plus, X, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'

const ASSET_CATEGORIES = ['photography', 'video', 'digital-art', 'template', 'ebook', 'course']

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)

    // Form State
    const [productType, setProductType] = useState('saas')
    const [submissionMethod, setSubmissionMethod] = useState<'link' | 'file'>('link')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [ownershipProofImages, setOwnershipProofImages] = useState<File[]>([])
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const [formData, setFormData] = useState({
        // Step 1: Basics
        url: '', // Also serves as Name/Title source if not domain
        description: '',

        // Step 2: Details & Metrics
        features: [''],
        revenue: '',
        profit: '',
        traffic: '',
        age: '',
        resolution: '',
        format: '',
        // Domain specific
        domainName: '',
        registrar: '',
        customRegistrar: '',
        registrationDate: '',
        expiryDate: '',

        // Step 3: Advanced & Delivery
        purchasePrice: '',
        yearlyRenewal: '',
        renewalDate: '',
        support: 'none',
        assetLink: '',

        // Step 4: Pricing & Contact
        price: '',
        email: '',
        payoutMethod: '',

        // Step 5: Payout Details
        accountName: '',
        iban: '',
        swift: '',
        bankName: '',
        cryptoNetwork: '',
        walletAddress: '',
        payoutEmail: '',
        techStack: '',
        videoPreviewLink: '',
        // Images
        coverImage: null as File | null,
        screenshots: [] as File[],
    })

    // Reset submission method when type changes
    useEffect(() => {
        if (['saas', 'course'].includes(productType)) {
            setSubmissionMethod('link')
        }
    }, [productType])

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features]
        newFeatures[index] = value
        setFormData({ ...formData, features: newFeatures })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.size > 10 * 1024 * 1024) { // 10MB
                toast.error('File is too large (Max 10MB). Please use a link instead.')
                e.target.value = ''
                return
            }
            setSelectedFile(file)
        }
    }

    const handleOwnershipProofChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const validFiles = files.filter(file => {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`${file.name} is too large (Max 5MB per image)`)
                    return false
                }
                return true
            })
            setOwnershipProofImages(validFiles)
        }
    }

    const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image is too large (Max 5MB).')
                return
            }
            setFormData({ ...formData, coverImage: file })
        }
    }

    const handleScreenshotsChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const validFiles = files.filter(file => {
                if (file.size > 5 * 1024 * 1024) {
                    toast.error(`${file.name} is too large (Max 5MB per image)`)
                    return false
                }
                return true
            })
            setFormData({ ...formData, screenshots: validFiles })
        }
    }

    const validateStep = (step: number) => {
        switch (step) {
            case 1: // Basics
                if (!productType) return 'Please select a product type.'
                if (productType === 'domain') {
                    if (!formData.domainName) return 'Please enter the domain name.'
                } else {
                    // For non-domains, we might want a name/title or URL. 
                    // The original form used 'url' for SaaS/Web and implied title from it or description.
                    // Let's enforce URL for SaaS, but maybe just a title/name for others if we had one.
                    // The original form had "Website URL" or "Demo URL" required for most except assets.
                    if (!['ebook', 'photography', 'video', 'digital-art'].includes(productType) && !formData.url) {
                        return 'Please enter the URL.'
                    }
                }
                if (!formData.description) return 'Please enter a description.'
                return null

            case 2: // Details & Metrics
                // Features are always good to have, but maybe not strictly required to block? 
                // Let's require at least one feature if the array is empty or has empty strings?
                // Original form didn't strictly validate features array length, but let's be nice.

                if (productType === 'domain') {
                    if (!formData.registrar && !formData.customRegistrar) return 'Please select a registrar.'
                    if (!formData.registrationDate) return 'Please enter registration date.'
                    if (!formData.expiryDate) return 'Please enter expiry date.'
                } else if (!ASSET_CATEGORIES.includes(productType)) {
                    // SaaS/Project metrics
                    if (!formData.revenue) return 'Please enter monthly revenue (0 if none).'
                    if (!formData.profit) return 'Please enter monthly profit (0 if none).'
                    if (!formData.traffic) return 'Please enter monthly traffic (0 if none).'
                    if (!formData.age) return 'Please enter project age.'
                    if (['saas', 'template'].includes(productType) && !formData.techStack) return 'Please enter the tech stack.'
                } else if (['photography', 'video', 'digital-art'].includes(productType)) {
                    if (!formData.resolution) return 'Please enter resolution/dimensions.'
                    if (!formData.format) return 'Please enter file format.'
                }

                // Require Cover Image for all types
                if (!formData.coverImage) return 'Please upload a main cover image.'

                return null

            case 3: // Advanced & Delivery
                if (productType === 'domain') {
                    if (!formData.purchasePrice) return 'Please enter purchase price.'
                    if (!formData.yearlyRenewal) return 'Please enter yearly renewal cost.'
                    if (!formData.renewalDate) return 'Please enter next renewal date.'
                    if (ownershipProofImages.length === 0) return 'Please upload ownership proof.'
                } else {
                    // Delivery
                    if (submissionMethod === 'link' && !formData.assetLink) return 'Please provide the asset link.'
                    if (submissionMethod === 'file' && !selectedFile) return 'Please upload a file.'
                }
                return null

            case 4: // Pricing & Contact
                if (!formData.price) return 'Please enter the asking price.'
                if (!formData.email) return 'Please enter your contact email.'
                if (!formData.payoutMethod) return 'Please select a payout method.'
                return null

            case 5: // Payout Details & Finalize
                if (!formData.payoutEmail && ['PayPal', 'Wise'].includes(formData.payoutMethod)) return 'Please enter payout email.'
                if (!captchaToken) return 'Please complete the captcha.'
                if (!agreedToTerms) return 'You must agree to the terms.'
                return null

            default:
                return null
        }
    }

    const handleNext = () => {
        const error = validateStep(currentStep)
        if (error) {
            toast.error(error)
            return
        }
        setCurrentStep(prev => Math.min(prev + 1, 5))
        window.scrollTo(0, 0)
    }

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
        window.scrollTo(0, 0)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const error = validateStep(5)
        if (error) {
            toast.error(error)
            return
        }

        setIsSubmitting(true)

        const submitData = new FormData()
        // Append all simple fields
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => submitData.append(key, v))
            } else if (key !== 'coverImage' && key !== 'screenshots') {
                submitData.append(key, value as string)
            }
        })

        if (formData.coverImage) {
            submitData.append('coverImage', formData.coverImage)
        }

        formData.screenshots.forEach((file, index) => {
            submitData.append(`screenshot${index}`, file)
        })
        submitData.append('screenshotCount', formData.screenshots.length.toString())

        submitData.set('productType', productType)
        submitData.set('captchaToken', captchaToken!)

        // Handle specific logic map from original form
        if (productType === 'domain') {
            submitData.set('registrar', formData.registrar === 'Other' ? formData.customRegistrar : formData.registrar)
            ownershipProofImages.forEach((image, index) => {
                submitData.append(`ownershipProof${index}`, image)
            })
            submitData.set('ownershipProofCount', ownershipProofImages.length.toString())
        }

        if (selectedFile) {
            submitData.set('file', selectedFile)
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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/sell" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Link>

                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                        SUBMIT YOUR <span className="text-blue-600">ASSET.</span>
                    </h1>
                    <div className="flex items-center justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                            <span className={currentStep >= 1 ? 'text-green-600' : ''}>Basics</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className={currentStep >= 2 ? 'text-green-600' : ''}>Details</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className={currentStep >= 3 ? 'text-green-600' : ''}>Delivery</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className={currentStep >= 4 ? 'text-green-600' : ''}>Pricing</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className={currentStep >= 5 ? 'text-green-600' : ''}>Finish</span>
                        </div>
                        <span className="text-green-600 font-bold">{Math.round((currentStep / 5) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 mt-4 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-600"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(currentStep / 5) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <AnimatePresence mode="wait">
                        {/* STEP 1: BASICS */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { id: 'saas', label: 'SaaS / Web', icon: Monitor },
                                        { id: 'ebook', label: 'E-book', icon: BookOpen },
                                        { id: 'template', label: 'Template', icon: Layout },
                                        { id: 'course', label: 'Course', icon: GraduationCap },
                                        { id: 'photography', label: 'Photo', icon: Camera },
                                        { id: 'video', label: 'Video', icon: Film },
                                        { id: 'digital-art', label: 'Art', icon: ImageIcon },
                                        { id: 'domain', label: 'Domain', icon: Globe },
                                    ].map((type) => {
                                        const Icon = type.icon
                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setProductType(type.id)}
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

                                {productType === 'domain' ? (
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                            <Globe className="w-4 h-4 mr-2 text-blue-600" /> Domain Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="example.com"
                                            value={formData.domainName}
                                            onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                        />
                                    </div>
                                ) : (
                                    !['ebook', 'photography', 'video', 'digital-art'].includes(productType) && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Globe className="w-4 h-4 mr-2 text-blue-600" />
                                                {productType === 'saas' ? 'Website URL' : 'Demo URL'}
                                            </label>
                                            <input
                                                type="url"
                                                required
                                                placeholder="https://..."
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                    )
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                        <FileText className="w-4 h-4 mr-2 text-blue-600" /> Description
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder={productType === 'domain' ? "Tell us about this domain..." : "Describe your project..."}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: DETAILS & METRICS */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                        <Star className="w-4 h-4 mr-2 text-blue-600" /> Key Features
                                    </label>
                                    <div className="space-y-3">
                                        {formData.features.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder={`Feature ${index + 1}`}
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                                />
                                                {formData.features.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newFeatures = formData.features.filter((_, i) => i !== index)
                                                            setFormData({ ...formData, features: newFeatures })
                                                        }}
                                                        className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })}
                                            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center"
                                        >
                                            <Plus className="w-4 h-4 mr-1" /> Add Feature
                                        </button>
                                    </div>
                                </div>

                                {productType === 'domain' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Shield className="w-4 h-4 mr-2 text-blue-600" /> Registrar
                                            </label>
                                            <select
                                                required
                                                value={formData.registrar}
                                                onChange={(e) => setFormData({ ...formData, registrar: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                                            >
                                                <option value="" disabled>Select registrar...</option>
                                                <option value="GoDaddy">GoDaddy</option>
                                                <option value="Namecheap">Namecheap</option>
                                                <option value="Cloudflare">Cloudflare</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {formData.registrar === 'Other' && (
                                                <input
                                                    type="text"
                                                    placeholder="Enter registrar name"
                                                    value={formData.customRegistrar}
                                                    onChange={(e) => setFormData({ ...formData, customRegistrar: e.target.value })}
                                                    className="mt-2 w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                                />
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Registration Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.registrationDate}
                                                onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Expiry Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.expiryDate}
                                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                ) : !ASSET_CATEGORIES.includes(productType) ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Monthly Revenue</label>
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
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Monthly Profit</label>
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
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Monthly Traffic</label>
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
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Project Age (Months)</label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="12"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        {['saas', 'template'].includes(productType) && (
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                    <Code className="w-4 h-4 mr-2 text-blue-600" /> Tech Stack (Comma separated)
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Next.js, Tailwind, Supabase"
                                                    value={formData.techStack}
                                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Resolution / Dimensions</label>
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
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">File Format</label>
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


                                {/* Image Uploads Section */}
                                <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                            <ImageIcon className="w-4 h-4 mr-2 text-blue-600" /> Main Cover Image (Required)
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                required
                                                onChange={handleCoverImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="w-full px-6 py-8 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl group-hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center">
                                                {formData.coverImage ? (
                                                    <>
                                                        <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                                                        <span className="font-bold text-gray-900 dark:text-white">{formData.coverImage.name}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                        <span className="font-bold text-gray-900 dark:text-white">Upload Cover Image (16:9 recommended)</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {!['domain'].includes(productType) && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <ImageIcon className="w-4 h-4 mr-2 text-blue-600" /> Screenshots / Gallery (Optional)
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleScreenshotsChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full px-6 py-8 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl group-hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center">
                                                    {formData.screenshots.length > 0 ? (
                                                        <>
                                                            <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                                                            <span className="font-bold text-gray-900 dark:text-white">
                                                                {formData.screenshots.length} image{formData.screenshots.length > 1 ? 's' : ''} selected
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                            <span className="font-bold text-gray-900 dark:text-white">Upload Screenshots</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: ADVANCED & DELIVERY */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {productType === 'domain' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <DollarSign className="w-4 h-4 mr-2 text-blue-600" /> Purchase Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="e.g. 500"
                                                value={formData.purchasePrice}
                                                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <DollarSign className="w-4 h-4 mr-2 text-blue-600" /> Yearly Renewal ($)
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="e.g. 15"
                                                value={formData.yearlyRenewal}
                                                onChange={(e) => setFormData({ ...formData, yearlyRenewal: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Next Renewal Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.renewalDate}
                                                onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Shield className="w-4 h-4 mr-2 text-blue-600" /> Proof of Ownership
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    required
                                                    onChange={handleOwnershipProofChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full px-6 py-8 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl group-hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center">
                                                    {ownershipProofImages.length > 0 ? (
                                                        <>
                                                            <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                                                            <span className="font-bold text-gray-900 dark:text-white">
                                                                {ownershipProofImages.length} image{ownershipProofImages.length > 1 ? 's' : ''} selected
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                            <span className="font-bold text-gray-900 dark:text-white">Click to Upload Proof</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {!['photography', 'video', 'digital-art'].includes(productType) && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                    <Shield className="w-4 h-4 mr-2 text-blue-600" /> Support Included?
                                                </label>
                                                <select
                                                    value={formData.support}
                                                    onChange={(e) => setFormData({ ...formData, support: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                                                >
                                                    <option value="none">No Support (Sold as-is)</option>
                                                    <option value="10-days">10 Days Support</option>
                                                    <option value="30-days">30 Days Support (Recommended)</option>
                                                    <option value="3-months">3 Months Support</option>
                                                    <option value="lifetime">Lifetime Updates & Support</option>
                                                </select>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Video className="w-4 h-4 mr-2 text-blue-600" /> Video Preview Link (Optional)
                                            </label>
                                            <input
                                                type="url"
                                                placeholder="https://youtube.com/..."
                                                value={formData.videoPreviewLink}
                                                onChange={(e) => setFormData({ ...formData, videoPreviewLink: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Upload className="w-4 h-4 mr-2 text-blue-600" /> Asset Delivery
                                            </label>

                                            {!['course'].includes(productType) && (
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

                                            {submissionMethod === 'link' || ['course'].includes(productType) ? (
                                                <input
                                                    type="url"
                                                    required
                                                    placeholder="https://drive.google.com/..."
                                                    value={formData.assetLink}
                                                    onChange={(e) => setFormData({ ...formData, assetLink: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                                />
                                            ) : (
                                                <div className="relative group">
                                                    <input
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
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                                <span className="font-bold text-gray-900 dark:text-white">Click to Upload File</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 4: PRICING & CONTACT */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                        <DollarSign className="w-4 h-4 mr-2 text-blue-600" /> Asking Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="e.g. 500"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                        <Send className="w-4 h-4 mr-2 text-blue-600" /> Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                        <DollarSign className="w-4 h-4 mr-2 text-blue-600" /> Preferred Payout Method
                                    </label>
                                    <select
                                        required
                                        value={formData.payoutMethod}
                                        onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                                    >
                                        <option value="" disabled>Select a method...</option>
                                        <option value="PayPal">PayPal (Fees may apply)</option>
                                        <option value="Wise">Wise (Recommended)</option>
                                        <option value="Bank Transfer">Bank Transfer ($25 fee)</option>
                                        <option value="Crypto">Crypto (USDT/USDC)</option>
                                    </select>
                                </div>


                            </motion.div>
                        )}

                        {/* STEP 5: PAYOUT DETAILS & FINALIZE */}
                        {currentStep === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                                    {/* Payout Details - Simplified */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                                        <div className="flex items-start gap-3">
                                            <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Secure Payment Collection</h3>
                                                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                                    To ensure your security, we do <strong>not</strong> collect sensitive bank details here.
                                                    Once your asset is approved and sold, we will contact you via a secure channel to arrange the payout
                                                    via your selected method ({formData.payoutMethod || 'selected method'}).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {['PayPal', 'Wise'].includes(formData.payoutMethod) && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                                <Send className="w-4 h-4 mr-2 text-blue-600" /> Payout Email (for {formData.payoutMethod})
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder={`Your ${formData.payoutMethod} email`}
                                                value={formData.payoutEmail}
                                                onChange={(e) => setFormData({ ...formData, payoutEmail: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <label htmlFor="terms" className="text-sm text-blue-900 dark:text-blue-200">
                                        I agree to the <Link href="/terms" target="_blank" className="underline font-bold">Terms of Service</Link> and confirm this asset is mine to sell.
                                    </label>
                                </div>

                                <div className="flex justify-center">
                                    <ReCAPTCHA
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                        onChange={(token) => setCaptchaToken(token)}
                                        theme="light"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-between pt-8 border-t border-gray-100 dark:border-gray-800">
                        {currentStep > 1 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" /> Back
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center"
                            >
                                Next <ChevronRight className="w-5 h-5 ml-2" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-12 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Asset'} <Send className="ml-3 w-5 h-5" />
                            </button>
                        )}
                    </div>
                </form>
            </div >
        </div >
    )
}
