'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Search } from 'lucide-react'

const navLinks = [
    { name: 'Marketplace', href: '/shop' },
    { name: 'Sell Your Site', href: '/sell' },
    { name: 'About', href: '/about' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isShop = pathname === '/shop'

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
                            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                                <span className="text-white dark:text-black font-bold text-xl">W</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                                Websites Arena
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar (Only on Shop) */}
                    {isShop && (
                        <div className="flex-grow max-w-md mx-8 hidden md:block">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    defaultValue={searchParams.get('q') || ''}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
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
                            <Link
                                href="/shop"
                                className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                            >
                                Get Started
                            </Link>
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
                            <Link
                                href="/shop"
                                className="block px-3 py-4 mt-4 bg-black text-white dark:bg-white dark:text-black rounded-xl text-center font-bold uppercase tracking-widest"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
