'use client'

import { urlForImage as urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, X, Loader2 } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { fetchMorePosts } from '@/app/actions'
import { useInView } from 'react-intersection-observer'

interface BlogListProps {
    initialPosts: any[]
    initialSearch?: string
}

export function BlogList({ initialPosts, initialSearch }: BlogListProps) {
    const [posts, setPosts] = useState(initialPosts)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState(initialSearch || '')
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Infinite Scroll State
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(initialPosts.length === 12)
    const { ref, inView } = useInView()

    // Load More Logic
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore || searchQuery) return

        setIsLoadingMore(true)
        const lastPost = posts[posts.length - 1]

        try {
            const newPosts = await fetchMorePosts(lastPost.publishedAt, lastPost._id)
            if (newPosts.length < 12) {
                setHasMore(false)
            }
            setPosts(prev => [...prev, ...newPosts])
        } catch (error) {
            console.error('Failed to load more posts:', error)
        } finally {
            setIsLoadingMore(false)
        }
    }, [posts, isLoadingMore, hasMore, searchQuery])

    // Trigger load more when scrolling to bottom
    useEffect(() => {
        if (inView) {
            loadMore()
        }
    }, [inView, loadMore])

    // Search Logic
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/blog?q=${encodeURIComponent(searchQuery)}`)
        } else {
            router.push('/blog')
        }
    }

    const handleSearchClick = () => {
        setIsSearchOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
    }

    const handleCloseSearch = () => {
        setIsSearchOpen(false)
        setSearchQuery('')
        router.push('/blog')
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Search */}
                <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                            Blog
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                            Insights, strategies, and guides on buying, selling, and growing digital assets.
                        </p>
                    </div>

                    {/* Search Component */}
                    <div className="relative h-12 flex items-center justify-end w-full md:w-auto">
                        <AnimatePresence mode="wait">
                            {!isSearchOpen && !initialSearch ? (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onClick={handleSearchClick}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-900 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-medium whitespace-nowrap"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Search for a blog</span>
                                </motion.button>
                            ) : (
                                <motion.form
                                    initial={{ width: 48, opacity: 0 }}
                                    animate={{ width: 300, opacity: 1 }}
                                    exit={{ width: 48, opacity: 0 }}
                                    className="relative"
                                    onSubmit={handleSearch}
                                >
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Type to search..."
                                        className="w-full pl-10 pr-10 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-lg"
                                    />
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={handleCloseSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4 text-gray-400" />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: any) => (
                                <Link
                                    href={`/blog/${post.slug.current}`}
                                    key={post._id}
                                    className="group flex flex-col bg-gray-50 dark:bg-gray-900/50 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                                >
                                    {/* Image */}
                                    <div className="relative h-64 w-full overflow-hidden">
                                        {post.mainImage ? (
                                            <Image
                                                src={urlFor(post.mainImage).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-2xl opacity-50">Websites Arena</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-8 flex flex-col">
                                        <div className="flex items-center text-sm text-gray-400 mb-4 space-x-2">
                                            <time dateTime={post.publishedAt}>
                                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-500 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
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
                ) : (
                    <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem] border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {searchQuery ? `No results for "${searchQuery}"` : "No posts yet"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {searchQuery ? "Try searching for something else." : "Check back soon for the latest updates."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
