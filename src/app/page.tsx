import { client } from '@/sanity/lib/client'
import { ProductGrid } from '@/components/shop/ProductGrid'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

async function getProducts(searchTerm?: string) {
  let query = `*[_type == "product"] | order(_createdAt desc) [0...20]`

  if (searchTerm) {
    query = `*[_type == "product" && (
            title match "${searchTerm}*" || 
            description match "${searchTerm}*" || 
            category match "${searchTerm}*" || 
            techStack[] match "${searchTerm}*" || 
            features[] match "${searchTerm}*"
        )] | order(_createdAt desc) [0...20]`
  }

  try {
    const products = await client.fetch(query)
    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const products = await getProducts(q)

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Concise */}
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
              Discover profitable starter websites, micro-SaaS projects, courses, templates, and premium digital assets. Hand-vetted and ready for launch.
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="w-full">
            {products.length > 0 ? (
              <ProductGrid initialProducts={products} searchQuery={q} />
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
                    href="/"
                    className="inline-flex items-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold transition-all"
                  >
                    Clear Search
                  </Link>
                ) : (
                  <Link
                    href="/sell"
                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold transition-all"
                  >
                    List Your Project <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
