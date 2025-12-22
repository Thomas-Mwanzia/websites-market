import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 dark:bg-black dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">W</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Websites Arena
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            The premier marketplace for buying and selling high-quality starter websites.
                            Start your online business journey today.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Marketplace</h3>
                        <ul className="space-y-2">
                            <li><Link href="/shop" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Browse Sites</Link></li>
                            <li><Link href="/sell" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Sell a Site</Link></li>
                            <li><Link href="/pricing" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Websites Arena. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {/* Social Links could go here */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
