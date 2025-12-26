'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProductCard } from '@/components/ui/ProductCard'
import { fetchMoreProducts } from '@/app/actions'
import { useInView } from 'react-intersection-observer'
import { Loader2 } from 'lucide-react'

interface ProductGridProps {
    initialProducts: any[]
    searchParams?: { q?: string, category?: string, minPrice?: string, maxPrice?: string }
}

export function ProductGrid({ initialProducts, searchParams }: ProductGridProps) {
    const [products, setProducts] = useState(initialProducts)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(initialProducts.length === 20)
    const { ref, inView } = useInView()

    // Reset state when search params change
    useEffect(() => {
        setProducts(initialProducts)
        setHasMore(initialProducts.length === 20)
    }, [initialProducts, searchParams])

    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return

        setIsLoadingMore(true)
        const lastProduct = products[products.length - 1]

        try {
            const newProducts = await fetchMoreProducts(
                lastProduct._createdAt,
                lastProduct._id,
                searchParams
            )
            if (newProducts.length < 20) {
                setHasMore(false)
            }
            setProducts(prev => [...prev, ...newProducts])
        } catch (error) {
            console.error('Failed to load more products:', error)
        } finally {
            setIsLoadingMore(false)
        }
    }, [products, isLoadingMore, hasMore, searchParams])

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
            {hasMore && (
                <div ref={ref} className="mt-16 flex justify-center">
                    {isLoadingMore && (
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    )}
                </div>
            )}
        </>
    )
}
