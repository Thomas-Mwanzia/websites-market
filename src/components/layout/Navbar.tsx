'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchFilterDropdown } from '../shop/SearchFilterDropdown'

const navLinks = [
    { name: 'Marketplace', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Sell', href: '/sell' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isHome = pathname === '/'

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const [showGlow, setShowGlow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGlow(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    const MotionLink = motion(Link)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-black dark:border-white transition-transform group-hover:scale-110">
                                <Image
                                    src="/icon.png"
                                    alt="Websites Arena Logo"
                                    fill
                                    className="object-cover scale-125"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                                Websites Arena
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar (Only on Home/Marketplace) */}
                    {isHome && (
                        <div className="flex-grow max-w-2xl mx-2 sm:mx-8 z-50">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search websites, templates..."
                                    defaultValue={searchParams.get('q') || ''}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-12 pr-32 py-3 bg-gray-100 dark:bg-gray-900 border-2 border-transparent focus:border-blue-600/20 rounded-full text-base outline-none transition-all shadow-sm hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                                />

                                {/* Filter Button inside Search Bar */}
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className={cn(
                                            "flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all",
                                            isFilterOpen
                                                ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                                                : "bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 shadow-sm"
                                        )}
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        <span>Filter</span>
                                    </button>
                                </div>

                                {/* Dropdown Component */}
                                <SearchFilterDropdown
                                    isOpen={isFilterOpen}
                                    onClose={() => setIsFilterOpen(false)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            link.name === 'Sell' ? (
                                <MotionLink
                                    key={link.href}
                                    href={link.href}
                                    className="relative overflow-hidden px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:opacity-80 transition-opacity shadow-sm"
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {showGlow && (
                                        <motion.div
                                            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-black/40 -skew-x-12"
                                            initial={{ left: '-100%' }}
                                            animate={{ left: '200%' }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                repeatDelay: 3,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    )}
                                </MotionLink>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-bold uppercase tracking-widest transition-colors",
                                        pathname === link.href
                                            ? "text-blue-600"
                                            : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}

                        <div className="flex items-center space-x-4 pl-4 border-l border-gray-100 dark:border-gray-900">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 dark:bg-black dark:border-gray-900"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "block px-3 py-2 rounded-md text-base font-bold uppercase tracking-widest transition-colors",
                                        pathname === link.href
                                            ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
