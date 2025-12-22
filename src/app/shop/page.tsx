import { client } from '@/sanity/lib/client'
import { ProductCard } from '@/components/ui/ProductCard'
import AdUnit from '@/components/ads/AdUnit'
import Link from 'next/link'

async function getProducts(searchTerm?: string) {
    let query = `*[_type == "product"] | order(_createdAt desc)`

    if (searchTerm) {
        // Enhanced matching for "similar in meaning" effect
        // We match against title, description, category, techStack, and features
        query = `*[_type == "product" && (
            title match "${searchTerm}*" || 
            description match "${searchTerm}*" || 
            category match "${searchTerm}*" || 
            techStack[] match "${searchTerm}*" || 
            features[] match "${searchTerm}*"
        )] | order(_createdAt desc)`
    }

    try {
        const products = await client.fetch(query)
        return products
    } catch (error) {
        console.error("Failed to fetch products:", error)
        return []
    }
}

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const { q } = await searchParams
    const products = await getProducts(q)

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    {q && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Results for "{q}"
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Found {products.length} {products.length === 1 ? 'project' : 'projects'}
                            </p>
                        </div>
                    )}
                    {!q && (
                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            Discover profitable starter websites and micro-SaaS projects. Hand-vetted and ready for launch.
                        </p>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {products.map((product: any) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem] border border-gray-200 dark:border-gray-800">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {q ? `No results for "${q}"` : "The Arena is Empty"}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg max-w-md mx-auto">
                                    {q
                                        ? "Try searching for different keywords or browse our full marketplace."
                                        : "We are currently vetting new projects. Check back soon or list your own site today."
                                    }
                                </p>
                                {q ? (
                                    <Link
                                        href="/shop"
                                        className="inline-flex items-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold transition-all"
                                    >
                                        Clear Search
                                    </Link>
                                ) : (
                                    <div className="inline-flex items-center px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-sm">
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Ads */}
                    <div className="w-full lg:w-1/4 space-y-8">
                        <div className="sticky top-24">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Sponsored</h3>
                            <AdUnit
                                type="adsense"
                                format="vertical"
                                slot="5662119628"
                                className="w-full shadow-lg bg-white dark:bg-gray-900"
                            />
                            <div className="h-8"></div>
                            <AdUnit
                                type="adsense"
                                format="rectangle"
                                slot="5662119628"
                                className="w-full shadow-lg bg-white dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
