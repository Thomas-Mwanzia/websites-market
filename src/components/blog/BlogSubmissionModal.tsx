'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Loader2, Plus, User } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function BlogSubmissionModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        excerpt: '',
        body: '',
        imageCredit: '',
    })
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [authorImageFile, setAuthorImageFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('author', formData.author)
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
            setIsOpen(false)
            setFormData({ title: '', author: '', excerpt: '', body: '', imageCredit: '' })
            setImageFile(null)
            setAuthorImageFile(null)
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors whitespace-nowrap"
            >
                <Plus className="w-4 h-4" />
                <span>Create a Blog</span>
            </button>

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
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create New Blog Post</h2>

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
                                            onClick={() => setIsOpen(false)}
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
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
