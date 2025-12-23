'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Book, Code2, Layout, Palette, Box, GraduationCap } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'

interface ProductProps {
    title: string
    slug: { current: string }
    price: number
    description: string
    image: any
    category?: string
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
        <motion.div
            whileHover={{ y: -4 }}
            className="group bg-white dark:bg-black rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-900 transition-all duration-300"
        >
            <Link href={`/shop/${product.slug.current}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 dark:bg-gray-900">
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
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 border border-gray-200 dark:border-gray-800">
                        <CategoryIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            {product.category || 'Asset'}
                        </span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                            {product.title}
                        </h3>
                        <div className="text-xl font-black text-blue-600">
                            ${product.price}
                        </div>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-base line-clamp-2 mb-8 font-medium">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                            View Details
                        </span>
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
