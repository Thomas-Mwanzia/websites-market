'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
    { label: 'SaaS / Website', value: 'saas' },
    { label: 'E-book / PDF', value: 'ebook' },
    { label: 'Template / UI Kit', value: 'template' },
    { label: 'Course', value: 'course' },
    { label: 'Photography', value: 'photography' },
    { label: 'Video Footage', value: 'video' },
    { label: 'Digital Art', value: 'digital-art' },
    { label: 'Domain', value: 'domain' },
    { label: 'Tool', value: 'tool' },
    { label: 'Boilerplate', value: 'boilerplate' },
    { label: 'E-commerce', value: 'ecommerce' },
    { label: 'Blog', value: 'blog' },
    { label: 'Other', value: 'other' },
]

const PRICE_RANGES = [
    { label: 'Any Price', min: null, max: null },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: '$500 - $1k', min: 500, max: 1000 },
    { label: '$1k - $5k', min: 1000, max: 5000 },
    { label: '$5k+', min: 5000, max: null },
]

interface SearchFilterDropdownProps {
    isOpen: boolean
    onClose: () => void
}

export function SearchFilterDropdown({ isOpen, onClose }: SearchFilterDropdownProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Initialize state from URL params
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0) // Index of PRICE_RANGES
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Sync state with URL on mount or param change
        const categoryParam = searchParams.get('category')
        if (categoryParam) {
            setSelectedCategories(categoryParam.split(','))
        } else {
            setSelectedCategories([])
        }

        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')

        const foundIndex = PRICE_RANGES.findIndex(r =>
            (r.min === (minPrice ? Number(minPrice) : null)) &&
            (r.max === (maxPrice ? Number(maxPrice) : null))
        )

        if (foundIndex !== -1) {
            setSelectedPriceRange(foundIndex)
        } else {
            setSelectedPriceRange(0)
        }
    }, [searchParams])

    const toggleCategory = (value: string) => {
        setSelectedCategories(prev =>
            prev.includes(value)
                ? prev.filter(c => c !== value)
                : [...prev, value]
        )
    }

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        // Update Category
        if (selectedCategories.length > 0) {
            params.set('category', selectedCategories.join(','))
        } else {
            params.delete('category')
        }

        // Update Price
        const price = PRICE_RANGES[selectedPriceRange]
        if (price.min !== null) params.set('minPrice', price.min.toString())
        else params.delete('minPrice')

        if (price.max !== null) params.set('maxPrice', price.max.toString())
        else params.delete('maxPrice')

        router.push(`/?${params.toString()}`)
        onClose()
    }

    const clearFilters = () => {
        setSelectedCategories([])
        setSelectedPriceRange(0)
        const params = new URLSearchParams(searchParams.toString())
        params.delete('category')
        params.delete('minPrice')
        params.delete('maxPrice')
        router.push(`/?${params.toString()}`)
        onClose()
    }

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            <div className="flex flex-col md:flex-row h-[60vh] md:h-[400px]">
                                {/* Left Column: Categories */}
                                <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-900 p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        Categories
                                    </h3>
                                    <div className="space-y-2">
                                        {CATEGORIES.map((category) => (
                                            <button
                                                key={category.value}
                                                onClick={() => toggleCategory(category.value)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                                    selectedCategories.includes(category.value)
                                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                                        : "hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                                )}
                                            >
                                                {category.label}
                                                {selectedCategories.includes(category.value) && (
                                                    <Check className="w-4 h-4" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column: Price */}
                                <div className="w-full md:w-1/2 p-6 bg-gray-50/50 dark:bg-gray-900/20 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        Price Range
                                    </h3>
                                    <div className="space-y-2">
                                        {PRICE_RANGES.map((range, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedPriceRange(index)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all border-2",
                                                    selectedPriceRange === index
                                                        ? "border-blue-600 bg-white dark:bg-black text-blue-600 dark:text-blue-400 shadow-sm"
                                                        : "border-transparent hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                                                )}
                                            >
                                                {range.label}
                                                {selectedPriceRange === index && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-black flex justify-between items-center">
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={applyFilters}
                                    className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:scale-105 transition-transform"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}
