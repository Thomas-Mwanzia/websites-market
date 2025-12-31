'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Loader2, Plus, User, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function BlogSubmissionModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState<'guide' | 'form'>('form')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        authorEmail: '',
        publicAuthorEmail: '',
        excerpt: '',
        body: '',
        imageCredit: '',
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [authorImageFile, setAuthorImageFile] = useState<File | null>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const openModal = (initialView: 'guide' | 'form') => {
        setView(initialView)
        setIsOpen(true)
        setIsDropdownOpen(false)
    }

    const resetForm = () => {
        setFormData({ title: '', author: '', authorEmail: '', publicAuthorEmail: '', excerpt: '', body: '', imageCredit: '' })
        setImageFile(null)
        setAuthorImageFile(null)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('author', formData.author)
            data.append('authorEmail', formData.authorEmail)
            data.append('publicAuthorEmail', formData.publicAuthorEmail)
            data.append('excerpt', formData.excerpt)
            data.append('body', formData.body)
            data.append('imageCredit', formData.imageCredit)
            if (imageFile) {
                data.append('mainImage', imageFile)
            }
            if (authorImageFile) {
                data.append('authorImage', authorImageFile)
            }

            const res = await fetch('/api/blog/submit', {
                method: 'POST',
                body: data,
            })

            if (!res.ok) throw new Error('Failed to submit')

            toast.success('Posted successfully and it will be online in a few')
            handleClose()
            resetForm()
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create a Blog</span>
                </button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden z-20"
                        >
                            <button
                                onClick={() => openModal('guide')}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors border-b border-gray-100 dark:border-zinc-800"
                            >
                                <span className="block font-bold text-blue-600 dark:text-blue-400 text-sm">Viral Blog Guide</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">5 tips to rank & go viral</span>
                            </button>
                            <button
                                onClick={() => openModal('form')}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <span className="block font-bold text-green-600 dark:text-green-400 text-sm">Proceed to create blog</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">Skip guide, start writing</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-xl shadow-2xl"
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6">
                                {view === 'guide' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                5 Steps to Viral Success
                                            </h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                    1. Emotional Hook
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Write content that makes people feel something. Stories that create excitement, surprise, or strong emotions get shared much more than plain facts.
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                    2. Engaging Visuals
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Use high-quality images and screenshots to break up text. Visuals keep readers engaged longer and make your post look professional.
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                    3. Strategic Distribution
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    We promote your post to our network! You should also share it on your social channels (X, LinkedIn) to maximize reach.
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                    4. Extreme Value
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Solve a specific problem completely. Give clear steps and tools so readers don't need to look anywhere else.
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                    5. Trend Surfing
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Write about what's trending right now, but add your own opinion. Joining current conversations helps you get noticed.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                                            <button
                                                onClick={() => setView('form')}
                                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                                            >
                                                <span>Proceed to Blog</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {view === 'form' && (
                                    <>
                                        <div className="flex items-center gap-4 mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog Post</h2>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                                                    placeholder="Enter post title"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Author Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.author}
                                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Your Email (Private) <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.authorEmail}
                                                        onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                                                        placeholder="For admin communication only"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Public Email (Optional)
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={formData.publicAuthorEmail}
                                                        onChange={(e) => setFormData({ ...formData, publicAuthorEmail: e.target.value })}
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                                                        placeholder="Displayed on your blog post"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Author Image (Optional)
                                                    </label>
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => setAuthorImageFile(e.target.files?.[0] || null)}
                                                            className="hidden"
                                                            id="author-image-upload"
                                                        />
                                                        <label
                                                            htmlFor="author-image-upload"
                                                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors w-full"
                                                        >
                                                            <User className="w-4 h-4 text-gray-500" />
                                                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                                {authorImageFile ? authorImageFile.name : 'Upload Photo'}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Excerpt
                                                </label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={formData.excerpt}
                                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                                                    placeholder="Short summary of the post..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Main Image
                                                </label>
                                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                                        className="hidden"
                                                        id="image-upload"
                                                    />
                                                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                                        <Upload className="w-8 h-8 text-gray-400" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {imageFile ? imageFile.name : 'Click to upload main image'}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Image Credit / Attribution (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.imageCredit}
                                                    onChange={(e) => setFormData({ ...formData, imageCredit: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                                                    placeholder='e.g. "Unsplash", "John Smith"'
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Content
                                                </label>
                                                <textarea
                                                    required
                                                    rows={10}
                                                    value={formData.body}
                                                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none font-mono text-sm"
                                                    placeholder="Write your post content here (Markdown supported)..."
                                                />
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                                <button
                                                    type="button"
                                                    onClick={handleClose}
                                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            Posting...
                                                        </>
                                                    ) : (
                                                        'Post'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
