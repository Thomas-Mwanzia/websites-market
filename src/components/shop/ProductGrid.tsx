'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { fetchMoreProducts } from '@/app/actions'
import { useInView } from 'react-intersection-observer'
import { Loader2 } from 'lucide-react'

interface ProductGridProps {
    initialProducts: any[]
    searchQuery?: string
}

export function ProductGrid({ initialProducts, searchQuery }: ProductGridProps) {
    const [products, setProducts] = useState(initialProducts)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(initialProducts.length === 20)
    const { ref, inView } = useInView()

    // Reset state when search query changes
    useEffect(() => {
        setProducts(initialProducts)
        setHasMore(initialProducts.length === 20)
    }, [initialProducts, searchQuery])

    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore || searchQuery) return

        setIsLoadingMore(true)
        const lastProduct = products[products.length - 1]

        try {
            const newProducts = await fetchMoreProducts(lastProduct._createdAt, lastProduct._id)
            if (newProducts.length < 20) {
                setHasMore(false)
            }
            setProducts(prev => [...prev, ...newProducts])
        } catch (error) {
            console.error('Failed to load more products:', error)
        } finally {
            setIsLoadingMore(false)
        }
    }, [products, isLoadingMore, hasMore, searchQuery])

    useEffect(() => {
        if (inView) {
            loadMore()
        }
    }, [inView, loadMore])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* Loading Spinner / Infinite Scroll Trigger */}
            {!searchQuery && hasMore && (
                <div ref={ref} className="mt-16 flex justify-center">
                    {isLoadingMore && (
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    )}
                </div>
            )}
        </>
    )
}
