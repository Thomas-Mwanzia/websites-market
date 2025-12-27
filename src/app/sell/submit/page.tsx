'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { ArrowLeft, Send, CheckCircle2, Globe, DollarSign, FileText, Code, Shield, BookOpen, Layout, Monitor, Link as LinkIcon, Upload, AlertCircle, Video, GraduationCap, Camera, Image as ImageIcon, Film, Calendar, RotateCcw, Star, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'

const ASSET_CATEGORIES = ['photography', 'video', 'digital-art', 'template', 'ebook', 'course']

export default function SubmitPage() {
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [payoutMethod, setPayoutMethod] = useState('')
    const [productType, setProductType] = useState('saas')
    const [submissionMethod, setSubmissionMethod] = useState<'link' | 'file'>('link')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [ownershipProofImages, setOwnershipProofImages] = useState<File[]>([])
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    // Form Data State
    const [formData, setFormData] = useState({
        revenue: '',
        profit: '',
        traffic: '',
        age: '',
        resolution: '',
        format: '',
        // Domain-specific fields
        domainName: '',
        registrar: '',
        customRegistrar: '',
        registrationDate: '',
        expiryDate: '',
        purchasePrice: '',
        yearlyRenewal: '',
        renewalDate: '',
        // Payout Details
        accountName: '',
        iban: '',
        swift: '',
        bankName: '',
        cryptoNetwork: '',
        walletAddress: '',
        payoutEmail: '',
        features: ['']
    })

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features]
        newFeatures[index] = value
        setFormData({ ...formData, features: newFeatures })
    }

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] })
    }

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index)
        setFormData({ ...formData, features: newFeatures.length ? newFeatures : [''] })
    }

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

    const handleOwnershipProofChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const validFiles = files.filter(file => {
                if (file.size > 5 * 1024 * 1024) { // 5MB per image
                    toast.error(`${file.name} is too large (Max 5MB per image)`, {
                        icon: '⚠️',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    })
                    return false
                }
                return true
            })
            setOwnershipProofImages(validFiles)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const submitData = new FormData(e.target as HTMLFormElement)
        submitData.set('productType', productType)
        submitData.set('captchaToken', captchaToken!)

        // Append structured payout data
        if (payoutMethod === 'Bank Transfer') {
            submitData.set('accountName', formData.accountName)
            submitData.set('iban', formData.iban)
            submitData.set('swift', formData.swift)
            submitData.set('bankName', formData.bankName)
        } else if (payoutMethod === 'Crypto') {
            submitData.set('walletAddress', formData.walletAddress)
            submitData.set('cryptoNetwork', formData.cryptoNetwork)
        } else {
            submitData.set('payoutEmail', formData.payoutEmail)
        }

        // Append domain-specific data
        if (productType === 'domain') {
            submitData.set('domainName', formData.domainName)
            submitData.set('registrar', formData.registrar === 'Other' ? formData.customRegistrar : formData.registrar)
            submitData.set('registrationDate', formData.registrationDate)
            submitData.set('expiryDate', formData.expiryDate)
            submitData.set('purchasePrice', formData.purchasePrice)
            submitData.set('yearlyRenewal', formData.yearlyRenewal)
            submitData.set('renewalDate', formData.renewalDate)

            // Append ownership proof images
            ownershipProofImages.forEach((image, index) => {
                submitData.append(`ownershipProof${index}`, image)
            })
            submitData.set('ownershipProofCount', ownershipProofImages.length.toString())
        }

        // Append features
        formData.features.forEach((feature) => {
            if (feature.trim()) submitData.append('features', feature.trim())
        })

        // File is optional for SaaS and courses when using link method
        const isFileRequired = !['saas', 'course', 'domain'].includes(productType) && submissionMethod === 'file'

        if (isFileRequired && !selectedFile) {
            toast.error('Please select a file to upload.')
            setIsSubmitting(false)
            return
        }

        if (productType === 'domain' && ownershipProofImages.length === 0) {
            toast.error('Please upload at least one ownership proof image.')
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
                        Fill out the form below to start the vetting process. We&apos;ll review your submission and get back to you shortly.
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

                    {/* Domain-Specific Fields */}
                    {productType === 'domain' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-blue-600" /> Registrar
                                </label>
                                <div className="relative">
                                    <AnimatePresence mode="wait">
                                        {formData.registrar !== 'Other' ? (
                                            <motion.div
                                                key="select-mode"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <select
                                                    required
                                                    value={formData.registrar}
                                                    onChange={(e) => setFormData({ ...formData, registrar: e.target.value, customRegistrar: e.target.value !== 'Other' ? '' : formData.customRegistrar })}
                                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer hover:border-gray-300 dark:hover:border-gray-700"
                                                    style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                        backgroundPosition: 'right 1rem center',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: '1.5em 1.5em',
                                                        paddingRight: '3rem'
                                                    }}
                                                >
                                                    <option value="" disabled>Select registrar...</option>
                                                    <optgroup label="Popular Registrars">
                                                        <option value="GoDaddy">GoDaddy</option>
                                                        <option value="Namecheap">Namecheap</option>
                                                        <option value="Cloudflare">Cloudflare</option>
                                                        <option value="Porkbun">Porkbun</option>
                                                        <option value="Google Domains">Google Domains</option>
                                                    </optgroup>
                                                    <optgroup label="Other Registrars">
                                                        <option value="Name.com">Name.com</option>
                                                        <option value="Hover">Hover</option>
                                                        <option value="Dynadot">Dynadot</option>
                                                        <option value="Domain.com">Domain.com</option>
                                                        <option value="NameSilo">NameSilo</option>
                                                        <option value="Gandi">Gandi</option>
                                                        <option value="Network Solutions">Network Solutions</option>
                                                        <option value="IONOS">IONOS (1&1)</option>
                                                        <option value="Bluehost">Bluehost</option>
                                                        <option value="Hostinger">Hostinger</option>
                                                    </optgroup>
                                                    <optgroup label="Custom">
                                                        <option value="Other">Other (Type manually)</option>
                                                    </optgroup>
                                                </select>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="input-mode"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="relative"
                                            >
                                                <input
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    placeholder="Type registrar name..."
                                                    value={formData.customRegistrar}
                                                    onChange={(e) => setFormData({ ...formData, customRegistrar: e.target.value })}
                                                    className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-gray-400 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, registrar: '', customRegistrar: '' })}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="Back to list"
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
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
                                <p className="text-xs text-gray-500">How much you originally paid for this domain</p>
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
                                <p className="text-xs text-gray-500">Annual renewal cost at your registrar</p>
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
                                                <div className="mt-2 text-sm text-gray-500">
                                                    {ownershipProofImages.map((file, idx) => (
                                                        <div key={idx}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <span className="font-bold text-gray-900 dark:text-white">Click to Upload Ownership Proof</span>
                                                <span className="text-sm text-gray-500">Screenshots from registrar (PNG, JPG - Max 5MB each)</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">Upload screenshots showing you own this domain (e.g., registrar dashboard)</p>
                                <div className="mt-2">
                                    <Link href="/tools/business-suite" target="_blank" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center">
                                        <Shield className="w-3 h-3 mr-1" /> Protect your data? Generate NDA
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {!['ebook', 'photography', 'video', 'digital-art', 'domain'].includes(productType) && (
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
                            <div className="mt-1">
                                {productType === 'saas' && (
                                    <Link href="/tools/valuation" target="_blank" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center">
                                        <DollarSign className="w-3 h-3 mr-1" /> Unsure about price? Calculate Valuation
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Support Field - Only for relevant categories */}
                        {!['photography', 'video', 'digital-art', 'domain'].includes(productType) && (
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-blue-600" /> Support Included?
                                </label>
                                <select
                                    name="support"
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                                >
                                    <option value="none">No Support (Sold as-is)</option>
                                    <option value="10-days">10 Days Support</option>
                                    <option value="30-days">30 Days Support (Recommended)</option>
                                    <option value="3-months">3 Months Support</option>
                                    <option value="lifetime">Lifetime Updates & Support</option>
                                </select>
                                <p className="text-xs text-gray-500">Offering support increases your chance of selling by 40%.</p>
                            </div>
                        )}
                    </div>





                    {/* Key Features Input */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                            <Star className="w-4 h-4 mr-2 text-blue-600" /> Key Features
                        </label>
                        <div className="space-y-3">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={`Feature ${index + 1} (e.g., "Responsive Design")`}
                                        value={feature}
                                        onChange={(e) => {
                                            const newFeatures = [...formData.features]
                                            newFeatures[index] = e.target.value
                                            setFormData({ ...formData, features: newFeatures })
                                        }}
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

                    {/* Business Metrics - Hidden for Asset Categories and Domains */}
                    {!ASSET_CATEGORIES.includes(productType) && productType !== 'domain' && (
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
                    {['photography', 'video', 'digital-art'].includes(productType) && (
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

                    {/* Asset Delivery Section - Hidden for Domains */}
                    {productType !== 'domain' && (
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center">
                                {productType === 'saas' ? (
                                    <><Code className="w-4 h-4 mr-2 text-blue-600" /> Source Code / Access Link</>
                                ) : productType === 'course' ? (
                                    <><LinkIcon className="w-4 h-4 mr-2 text-blue-600" /> Course Link</>
                                ) : (
                                    <><Upload className="w-4 h-4 mr-2 text-blue-600" /> Asset Delivery</>
                                )}
                            </label>

                            {/* Asset Requirements Notice - Only for Code Products */}
                            {['saas', 'template', 'boilerplate', 'tool', 'ecommerce', 'other'].includes(productType) && (
                                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-900 dark:text-blue-200">
                                        <p className="font-bold mb-1">Important: What to include in your delivery</p>
                                        <p className="leading-relaxed opacity-90">
                                            To ensure a smooth transaction and avoid refunds, your delivered asset <strong>MUST</strong> contain:
                                        </p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 ml-1">
                                            <li>Full Source Code & Programs</li>
                                            <li>Relevant Documentation</li>
                                            <li>Step-by-step Setup Guide</li>
                                            <li>License & Terms of Use</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

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

                            <AnimatePresence mode="wait">
                                {submissionMethod === 'link' || ['course'].includes(productType) ? (
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
                                            placeholder={
                                                productType === 'saas' ? "https://github.com/username/repo or https://drive.google.com/..." :
                                                    productType === 'course' ? "https://udemy.com/... or https://drive.google.com/..." :
                                                        "https://dropbox.com/s/... or https://drive.google.com/..."
                                            }
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                        />
                                        {productType === 'saas' && (
                                            <p className="text-xs text-gray-500 mt-2">Provide GitHub repo, Google Drive, Dropbox, or any secure link to your source code</p>
                                        )}
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
                            <div className="mt-2 space-y-1">
                                <Link href="/tools/business-suite" target="_blank" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center">
                                    <FileText className="w-3 h-3 mr-1" /> Need a contract? Generate Asset Sale Agreement
                                </Link>
                                {['ebook', 'template', 'course'].includes(productType) && submissionMethod === 'file' && (
                                    <Link href="/tools/image-compressor" target="_blank" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center">
                                        <ImageIcon className="w-3 h-3 mr-1" /> Optimize images? Use Image Compressor
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}

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
                            className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800"
                        >
                            {payoutMethod === 'Bank Transfer' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                                Account Holder Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. John Doe"
                                                value={formData.accountName}
                                                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                                Bank Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Chase Bank"
                                                value={formData.bankName}
                                                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                            IBAN / Account Number
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. US123456789"
                                            value={formData.iban}
                                            onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                            SWIFT / BIC Code
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. CHASUS33"
                                            value={formData.swift}
                                            onChange={(e) => setFormData({ ...formData, swift: e.target.value })}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                        />
                                        <p className="text-xs text-gray-500">Required for international transfers.</p>
                                    </div>
                                </>
                            )}

                            {payoutMethod === 'Crypto' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                            Network
                                        </label>
                                        <select
                                            required
                                            value={formData.cryptoNetwork}
                                            onChange={(e) => setFormData({ ...formData, cryptoNetwork: e.target.value })}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                        >
                                            <option value="">Select Network...</option>
                                            <option value="ERC20">Ethereum (ERC20)</option>
                                            <option value="TRC20">Tron (TRC20)</option>
                                            <option value="SOL">Solana</option>
                                            <option value="BTC">Bitcoin</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                            Wallet Address
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="0x..."
                                            value={formData.walletAddress}
                                            onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                        />
                                    </div>
                                </>
                            )}

                            {['PayPal', 'Wise'].includes(payoutMethod) && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                        {payoutMethod} Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={formData.payoutEmail}
                                        onChange={(e) => setFormData({ ...formData, payoutEmail: e.target.value })}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                    />
                                </div>
                            )}
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
                            placeholder={
                                productType === 'domain'
                                    ? "Tell us about this domain, its history, and why it's valuable..."
                                    : "Tell us about your project, what's included, and why it's valuable..."
                            }
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
                                {productType === 'domain'
                                    ? "We manually review every domain submission to ensure its value and legitimacy. This includes checking domain authority, history, and market potential."
                                    : ['saas', 'template', 'course'].includes(productType)
                                        ? "We manually review every submission to ensure it meets our quality standards. This includes checking for clean code, responsive design, and legitimate business potential."
                                        : "We manually review every submission to ensure it meets our quality standards. This includes checking for content quality, value, and legitimate potential."}
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
