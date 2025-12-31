import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { getProductsWithRatings } from '@/lib/reviews'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

async function getProducts(searchParams: { q?: string, category?: string, minPrice?: string, maxPrice?: string }) {
  const { q, category, minPrice, maxPrice } = searchParams

  const conditions = ['_type == "product"']

  if (q) {
    conditions.push(`(
      title match "${q}*" || 
      description match "${q}*" || 
      category match "${q}*" || 
      techStack[] match "${q}*" || 
      features[] match "${q}*"
    )`)
  }

  if (category) {
    const categories = category.split(',').map(c => `"${c.trim()}"`).join(',')
    conditions.push(`category in [${categories}]`)
  }

  if (minPrice) {
    conditions.push(`price >= ${minPrice}`)
  }

  if (maxPrice) {
    conditions.push(`price <= ${maxPrice}`)
  }

  const query = `*[${conditions.join(' && ')}] | order(_createdAt desc) [0...20] {
    _id,
    title,
    slug,
    price,
    description,
    image,
    category,
    sellerType,
    deliveryMethod,
    _createdAt
  }`

  try {
    const products = await client.fetch(query)
    // Enhance with rating data
    const productsWithRatings = await getProductsWithRatings(products)
    return productsWithRatings
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export const metadata: Metadata = {
  title: "Websites Arena | Buy & Sell Digital Assets, Websites, SaaS & Templates",
  description: "The premier marketplace for buying and selling premium digital assets: starter websites, SaaS codebases, e-books, UI kits, design templates, courses, and more. Hand-vetted listings from verified sellers.",
  keywords: [
    "buy website",
    "sell website",
    "digital assets marketplace",
    "starter website",
    "SaaS for sale",
    "website flipper",
    "online business",
    "digital marketplace",
    "buy SaaS",
    "design templates",
    "UI kits",
    "e-books for sale",
    "course marketplace",
    "micro business",
    "websites arena",
    "flippa alternative",
    "acquire alternative",
    "small business acquisition"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://websitesarena.com',
  },
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string, category?: string, minPrice?: string, maxPrice?: string }>
}) {
  const params = await searchParams
  const products = await getProducts(params)

  // JSON-LD Structured Data for Home Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'name': 'Websites Arena',
        'description': 'The premier marketplace for buying and selling premium digital assets, starter websites, SaaS, and more.',
        'url': 'https://websitesarena.com',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://websitesarena.com?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        'name': 'Websites Arena',
        'url': 'https://websitesarena.com',
        'description': 'Digital asset marketplace for buying and selling websites, SaaS, templates, and online businesses.',
        'logo': 'https://websitesarena.com/icon.png',
        'sameAs': [
          'https://twitter.com/websitesarena',
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+1',
          'contactType': 'Customer Service',
          'email': 'hello@websitesarena.com'
        }
      },
      {
        '@type': 'CollectionPage',
        'name': 'Digital Assets Marketplace',
        'description': 'Browse and buy verified digital assets including websites, SaaS, templates, and more.',
        'url': 'https://websitesarena.com',
        'mainEntity': {
          '@type': 'ItemList',
          'numberOfItems': products.length,
          'itemListElement': products.slice(0, 10).map((product: any, index: number) => ({
            '@type': 'Product',
            'position': index + 1,
            'name': product.title,
            'description': product.description,
            'price': product.price,
            'priceCurrency': 'USD',
            'url': `https://websitesarena.com/shop/${product.slug.current}`,
            'image': product.image ? urlForImage(product.image).url() : 'https://websitesarena.com/icon.png',
            'offers': {
              '@type': 'Offer',
              'price': product.price,
              'priceCurrency': 'USD',
              'availability': 'https://schema.org/InStock',
              'url': `https://websitesarena.com/shop/${product.slug.current}`,
              'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
              'hasMerchantReturnPolicy': {
                '@type': 'MerchantReturnPolicy',
                'applicableCountry': 'US',
                'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
                'merchantReturnDays': 10,
                'returnMethod': 'https://schema.org/ReturnByMail',
                'returnFees': 'https://schema.org/FreeReturn'
              },
              'shippingDetails': {
                '@type': 'OfferShippingDetails',
                'shippingRate': {
                  '@type': 'MonetaryAmount',
                  'value': 0,
                  'currency': 'USD'
                },
                'shippingDestination': {
                  '@type': 'DefinedRegion',
                  'addressCountry': 'US'
                },
                'deliveryTime': {
                  '@type': 'ShippingDeliveryTime',
                  'handlingTime': {
                    '@type': 'QuantitativeValue',
                    'minValue': 0,
                    'maxValue': 0,
                    'unitCode': 'DAY'
                  },
                  'transitTime': {
                    '@type': 'QuantitativeValue',
                    'minValue': 0,
                    'maxValue': 0,
                    'unitCode': 'DAY'
                  }
                }
              }
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': product.avgRating ? product.avgRating.toString() : '4.5',
              'reviewCount': product.reviewCount ? product.reviewCount.toString() : '1',
              'bestRating': '5',
              'worstRating': '1'
            }
          }))
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Concise */}
          <div className="text-center mb-24">
            <h1 className="sr-only">Websites Arena - Buy & Sell Digital Assets, Websites, and SaaS</h1>

            {params.q && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Results for "{params.q}"
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Found {products.length} {products.length === 1 ? 'project' : 'projects'}
                </p>
              </div>
            )}
            {!params.q && (
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                Discover profitable starter websites, micro-SaaS projects, courses, templates, and premium digital assets. Hand-vetted and ready for use and for launch.
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="w-full">
              {products.length > 0 ? (
                <ProductGrid initialProducts={products} searchParams={params} />
              ) : (
                <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem] border border-gray-200 dark:border-gray-800">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {(params.q || params.category || params.minPrice || params.maxPrice) ? `No results found` : "The Arena is Empty"}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg max-w-md mx-auto">
                    {params.q
                      ? "Try searching for different keywords or browse our full marketplace."
                      : "We are currently vetting new projects. Check back soon or list your own site today."
                    }
                  </p>
                  {params.q ? (
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
    </>
  )
}
