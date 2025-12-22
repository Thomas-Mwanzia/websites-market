import { client } from '@/sanity/lib/client'
import { ProductCard } from '@/components/ui/ProductCard'

async function getProducts() {
    const query = `*[_type == "product"] | order(_createdAt desc)`
    try {
        const products = await client.fetch(query)
        return products
    } catch (error) {
        console.error("Failed to fetch products:", error)
        return []
    }
}

export default async function ShopPage() {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Marketplace
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Discover profitable starter websites and micro-SaaS projects.
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product: any) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            No listings found
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            We are currently stocking up the arena. Check back soon!
                        </p>
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl inline-block">
                            <p className="text-blue-800 dark:text-blue-200 font-medium">
                                Admin Tip: Go to <code className="bg-white dark:bg-black px-2 py-1 rounded">/studio</code> to add your first product.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
