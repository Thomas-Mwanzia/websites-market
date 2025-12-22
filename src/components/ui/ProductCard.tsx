'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
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
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <Link href={`/shop/${product.slug.current}`}>
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {product.image ? (
                        <Image
                            src={urlForImage(product.image).url()}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Image
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                        ${product.price}
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">5.0 (New)</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                        {product.description}
                    </p>

                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
