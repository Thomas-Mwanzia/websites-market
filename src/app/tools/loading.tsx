export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Skeleton */}
                <div className="text-center mb-20 animate-pulse">
                    <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl w-3/4 md:w-1/2 mx-auto mb-6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-full md:w-2/3 mx-auto"></div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 animate-pulse">
                            <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-800 mb-6"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-2/3 mb-8"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-1/4 mt-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
