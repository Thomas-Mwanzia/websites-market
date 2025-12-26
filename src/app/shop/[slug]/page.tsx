import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Shield, Zap, ArrowLeft, ShieldCheck, Gem, FileText, Eye, Lock } from 'lucide-react'

import { Metadata } from 'next'

async function getProduct(slug: string) {
    const query = `*[_type == "product" && slug.current == $slug][0] {
        ...,
        "previewFileUrl": previewFile.asset->url
    }`
    return client.fetch(query, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) return { title: 'Product Not Found' }

    return {
        title: `${product.title} | Websites Arena`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.title,
            description: product.description.substring(0, 160),
            images: [urlForImage(product.image).url()],
        },
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <Link href="/" className="text-blue-600 hover:underline">Return to Marketplace</Link>
                </div>
            </div>
        )
    }

    let schemaType = 'Product'
    if (product.category === 'saas' || product.category === 'tool') {
        schemaType = 'SoftwareApplication'
    } else if (product.category === 'e-book') {
        schemaType = 'Book'
    } else if (product.category === 'course') {
        schemaType = 'Course'
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        name: product.title,
        image: urlForImage(product.image).url(),
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Websites Arena'
        },
        sku: product._id,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '1'
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        ...(schemaType === 'SoftwareApplication' && {
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
            },
        }),
        ...(schemaType === 'Book' && {
            format: 'EBook',
        }),
        ...(schemaType === 'Course' && {
            provider: {
                '@type': 'Organization',
                name: 'Websites Arena',
            }
        })
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white mb-12 transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Column: Images & Video */}
                    <div className="space-y-12">
                        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
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
                            <div className="aspect-video rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 bg-black">
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

                    {/* Preview Gallery (if available) */}
                    {(product.previewImages?.length > 0 || product.previewFileUrl) && (
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Preview Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {product.previewImages?.map((img: any, idx: number) => (
                                    <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 group">
                                        <Image
                                            src={urlForImage(img).url()}
                                            alt={`Preview ${idx + 1}`}
                                            fill
                                            className="object-cover blur-[2px] group-hover:blur-0 transition-all duration-300"
                                        />
                                        {/* Watermark Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                                            <div className="bg-black/50 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transform -rotate-45">
                                                Websites Arena Preview
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {product.previewFileUrl && (
                                    <a
                                        href={product.previewFileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                                    >
                                        <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                                        <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 text-center px-2">Read Preview PDF<br/>(First 5% Only)</span>
                                    </a>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 italic">
                                * These are secure previews (watermarked & truncated). Full access is granted instantly upon purchase.
                            </p>
                        </div>
                    )}

                    {/* Right Column: Details & Buy */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-12">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-6 font-bold text-xs uppercase tracking-widest">
                                {product.category === 'saas' ? 'SaaS' :
                                    product.category === 'ui-kit' ? 'UI Kit' :
                                        product.category === 'e-book' ? 'E-book' :
                                            product.category || 'Premium Asset'}
                            </div>

                            {/* Seller Info Badge */}
                            {product.sellerType === 'premium' && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest mb-6 ml-3">
                                    <Gem className="w-3 h-3 fill-current" />
                                    Websites Arena Premium
                                </div>
                            )}
                            {product.sellerType === 'verified' && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-widest mb-6 ml-3">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified Seller
                                </div>
                            )}
                            <div className="text-4xl font-black text-blue-600 mb-8">
                                ${product.price}
                            </div>
                            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                {product.description}
                            </p>

                            {/* Technical Details for Art/Video */}
                            {product.metadata && (
                                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Technical Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {product.metadata.resolution && (
                                            <div>
                                                <div className="text-xs text-gray-500">Resolution</div>
                                                <div className="font-bold text-gray-900 dark:text-white">{product.metadata.resolution}</div>
                                            </div>
                                        )}
                                        {product.metadata.fileFormat && (
                                            <div>
                                                <div className="text-xs text-gray-500">Format</div>
                                                <div className="font-bold text-gray-900 dark:text-white">{product.metadata.fileFormat}</div>
                                            </div>
                                        )}
                                        {product.metadata.aspectRatio && (
                                            <div>
                                                <div className="text-xs text-gray-500">Aspect Ratio</div>
                                                <div className="font-bold text-gray-900 dark:text-white">{product.metadata.aspectRatio}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 mb-12">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">What's Included</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(product.features || []).map((item: string) => (
                                    <div key={item} className="flex items-center text-gray-900 dark:text-white font-bold">
                                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                                {product.deliveryMethod === 'transfer' && (
                                    <div className="flex items-center text-gray-900 dark:text-white font-bold">
                                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                            <Shield className="w-3 h-3 text-white" />
                                        </div>
                                        Secure Handover Process
                                    </div>
                                )}
                            </div>
                        </div>

                        <a
                            href={product.checkoutUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-6 bg-black text-white dark:bg-white dark:text-black text-center rounded-full font-bold text-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all mb-8"
                        >
                            {product.deliveryMethod === 'transfer' ? 'Buy & Start Transfer' : 'Buy Now & Download'}
                        </a>

                        <div className="flex items-center justify-center space-x-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" /> Secure
                            </div>
                            <div className="flex items-center">
                                {product.deliveryMethod === 'transfer' ? (
                                    <><Lock className="w-4 h-4 mr-2" /> Manual Transfer</>
                                ) : (
                                    <><Zap className="w-4 h-4 mr-2" /> Instant Delivery</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
