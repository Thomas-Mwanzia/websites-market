'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Book, Code2, Layout, Palette, Box, GraduationCap, ShieldCheck, Gem, Star, Zap, Download } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'

interface ProductProps {
    title: string
    slug: { current: string }
    price: number
    description: string
    image: any
    category?: string
    sellerType?: 'independent' | 'verified' | 'premium'
    avgRating?: number
    reviewCount?: number
    deliveryMethod?: 'instant' | 'transfer'
}

export function ProductCard({ product }: { product: ProductProps }) {
    const getIcon = (category: string) => {
        switch (category?.toLowerCase()) {
            case 'e-book': return Book
            case 'ui-kit': return Palette
            case 'template': return Layout
            case 'saas': return Code2
            case 'course': return GraduationCap
            default: return Box
        }
    }

    const CategoryIcon = getIcon(product.category || '')

    return (
        <motion.article
            whileHover={{ y: -4 }}
            className="group bg-white dark:bg-black rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <Link href={`/shop/${product.slug.current}`} className="flex flex-col h-full">
                {/* 1. Header Section: Title */}
                <div className="px-5 pt-5 pb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
                        {product.title}
                    </h3>
                </div>

                {/* 2. Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 dark:bg-gray-900 mx-5 rounded-2xl">
                    {product.image ? (
                        <Image
                            src={urlForImage(product.image).url()}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    {/* 3. Badges Row (Moved from Image Overlay) */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {/* Category Badge */}
                        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                            <CategoryIcon className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                {product.category || 'Asset'}
                            </span>
                        </div>

                        {/* Premium Badge */}
                        {product.sellerType === 'premium' && (
                            <div className="bg-blue-600 text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                <Gem className="w-3 h-3 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Premium</span>
                            </div>
                        )}

                        {/* Verified Badge */}
                        {product.sellerType === 'verified' && (
                            <div className="bg-green-500 text-white px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                <ShieldCheck className="w-3 h-3" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                            </div>
                        )}
                    </div>

                    {/* Star Rating */}
                    {product.avgRating !== undefined && (
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < Math.floor(product.avgRating!)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : i < Math.ceil(product.avgRating!)
                                                ? 'fill-yellow-200 text-yellow-400'
                                                : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                {product.avgRating?.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                ({product.reviewCount || 0})
                            </span>
                        </div>
                    )}
                    {/* Price and Quick Badges Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-black text-blue-600">
                            ${product.price}
                        </div>

                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </Link>
        </motion.article>
    )
}
