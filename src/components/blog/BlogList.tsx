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
import { BlogSubmissionModal } from './BlogSubmissionModal'

interface BlogListProps {
    initialPosts: any[]
    initialSearch?: string
}

export function BlogList({ initialPosts, initialSearch }: BlogListProps) {
    const [posts, setPosts] = useState(initialPosts)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState(initialSearch || '')
    const [isSearching, setIsSearching] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Infinite Scroll State
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(initialPosts.length === 20)
    const { ref, inView } = useInView()

    // Debounced Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true)
                try {
                    // Import dynamically to avoid circular dependencies if any, though direct import is fine here
                    const { searchPosts } = await import('@/app/actions')
                    const results = await searchPosts(searchQuery)
                    setPosts(results)
                    setHasMore(false) // Disable infinite scroll for search results
                } catch (error) {
                    console.error('Search failed:', error)
                } finally {
                    setIsSearching(false)
                }
            } else if (searchQuery === '') {
                // Reset to initial state when search is cleared
                setPosts(initialPosts)
                setHasMore(initialPosts.length === 20)
            }
        }, 300) // 300ms debounce

        return () => clearTimeout(timer)
    }, [searchQuery, initialPosts])

    // Load More Logic
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore || searchQuery) return

        setIsLoadingMore(true)
        const lastPost = posts[posts.length - 1]

        try {
            const newPosts = await fetchMorePosts(lastPost.publishedAt, lastPost._id)
            if (newPosts.length < 20) {
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

    const handleSearchClick = () => {
        setIsSearchOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
    }

    const handleCloseSearch = () => {
        setIsSearchOpen(false)
        setSearchQuery('')
        // No need to push router, state reset handles it
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Search */}
                <div className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight font-display">
                            Insights , <span className="text-blue-600">Strategies</span> & More
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed">
                            Expert guides on buying, selling, growing and more around digital assets.
                        </p>
                    </div>

                    {/* Search Component */}
                    <div className="relative h-12 flex items-center justify-end w-full md:w-auto gap-4">
                        <AnimatePresence mode="wait">
                            {!isSearchOpen && !initialSearch ? (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onClick={handleSearchClick}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-900 rounded-full text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-bold whitespace-nowrap"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>Search articles</span>
                                </motion.button>
                            ) : (
                                <motion.form
                                    initial={{ width: 48, opacity: 0 }}
                                    animate={{ width: 300, opacity: 1 }}
                                    exit={{ width: 48, opacity: 0 }}
                                    className="relative"
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search topics..."
                                        className="w-full pl-12 pr-12 py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-full focus:border-blue-500 outline-none transition-all shadow-lg text-sm sm:text-base font-medium"
                                    />
                                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isSearching ? 'opacity-0' : 'opacity-100'} transition-opacity`} />
                                    {isSearching && (
                                        <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 animate-spin" />
                                    )}
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
                        <BlogSubmissionModal />
                    </div>
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {posts.map((post: any) => (
                                <article key={post._id} className="h-full">
                                    <Link
                                        href={`/blog/${post.slug.current}`}
                                        className="group flex flex-col h-full"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-900">
                                            {post.mainImage ? (
                                                <Image
                                                    src={urlFor(post.mainImage).url()}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                                    <span className="text-gray-400 font-bold text-xl opacity-50">No Image</span>
                                                </div>
                                            )}
                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-sm">
                                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col">
                                            <h2 className="
                                          text-2xl font-bold
                                          text-gray-900 dark:text-white
                                          mb-3 line-clamp-2
                                          group-hover:text-blue-600 dark:group-hover:text-blue-400
                                          transition-colors leading-tight
                                        ">
                                                {post.title}
                                            </h2>

                                            <p className="
                                          text-gray-600 dark:text-gray-400
                                          mb-4 line-clamp-3 flex-grow
                                          leading-relaxed font-serif text-lg
                                        ">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:translate-x-1 transition-transform mb-6">
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>

                                            {/* Author Info */}
                                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/50">
                                                {post.authorImage ? (
                                                    <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                        <Image
                                                            src={urlFor(post.authorImage).url()}
                                                            alt={post.author || 'Author'}
                                                            fill
                                                            className="object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        WA
                                                    </div>
                                                )}
                                                <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                                                    {post.author || 'Websites Arena'}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>

                        {/* Loading Spinner / Infinite Scroll Trigger */}
                        {!searchQuery && hasMore && (
                            <div ref={ref} className="mt-20 flex justify-center">
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
                        <p className="text-gray-500 dark:text-gray-400 font-serif text-lg">
                            {searchQuery ? "Try searching for something else." : "Check back soon for the latest updates."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
