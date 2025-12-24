'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ThemeToggle } from '../ui/ThemeToggle'

const navLinks = [
    { name: 'Marketplace', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Sell', href: '/sell' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
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
                        <div className="flex-grow max-w-md mx-2 sm:mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    defaultValue={searchParams.get('q') || ''}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-9 sm:pl-12 pr-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-full text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
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
