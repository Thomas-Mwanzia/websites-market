import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 dark:bg-black dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6 group">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-black dark:border-white transition-transform group-hover:scale-110">
                                <Image
                                    src="/icon.png"
                                    alt="Websites Arena Logo"
                                    fill
                                    className="object-cover scale-125"
                                />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Websites Arena
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm font-medium">
                            The premier marketplace for buying and selling high-quality starter websites.
                            Start your online business journey today.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Marketplace</h3>
                        <ul className="space-y-4">
                            <li><Link href="/shop" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">Browse Sites</Link></li>
                            <li><Link href="/sell" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">Sell a Site</Link></li>
                            <li><Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">How it Works</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Compare</h3>
                        <ul className="space-y-4">
                            <li><Link href="/compare/flippa" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">vs Flippa</Link></li>
                            <li><Link href="/compare/acquire" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">vs Acquire.com</Link></li>
                            <li><Link href="/compare/tiny-acquisitions" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">vs Tiny Acquisitions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} Websites Arena
                    </p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <Link href="/terms" className="text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Terms</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
