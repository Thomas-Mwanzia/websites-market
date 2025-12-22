import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Shield, Zap } from 'lucide-react'

async function getProduct(slug: string) {
    const query = `*[_type == "product" && slug.current == $slug][0]`
    return client.fetch(query, { slug })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Images & Video */}
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                            {product.image && (
                                <Image
                                    src={urlForImage(product.image).url()}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>

                        {product.youtubeUrl && (
                            <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={product.youtubeUrl.replace("watch?v=", "embed/")}
                                    title="Product Demo"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details & Buy */}
                    <div>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {product.title}
                            </h1>
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-3xl font-bold text-blue-600">
                                    ${product.price}
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    Instant Download
                                </span>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-100 dark:border-gray-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">What's Included:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Check className="w-5 h-5 text-green-500 mr-3" /> Full Source Code (Next.js)
                                </li>
                                <li className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Check className="w-5 h-5 text-green-500 mr-3" /> CMS Configuration
                                </li>
                                <li className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Check className="w-5 h-5 text-green-500 mr-3" /> Installation Guide
                                </li>
                                <li className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Check className="w-5 h-5 text-green-500 mr-3" /> 6 Months Support
                                </li>
                            </ul>
                        </div>

                        <a
                            href={product.checkoutUrl || "#"} // This goes to the secure payment page
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-blue-600 text-white text-center rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 mb-6"
                        >
                            Buy Now & Download
                        </a>

                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" /> Secure Payment
                            </div>
                            <div className="flex items-center">
                                <Zap className="w-4 h-4 mr-2" /> Instant Access
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
