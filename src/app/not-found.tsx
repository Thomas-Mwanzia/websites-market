import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
                        404
                    </h1>
                    <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4 opacity-80" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Page not found
                </h2>

                <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Home
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 dark:border-gray-800 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
                    >
                        See Deals
                    </Link>
                </div>
            </div>
        </div>
    )
}
