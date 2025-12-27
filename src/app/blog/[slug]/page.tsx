import { client } from '@/sanity/lib/client'
import { urlForImage as urlFor } from '@/sanity/lib/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// Fetch post data
async function getPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    _updatedAt,
    mainImage {
      asset,
      hotspot,
      credit
    },
    excerpt,
    author,
    authorImage,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset,
        credit
      },
      _type == "reference" => @->{
        _id,
        title,
        "slug": slug.current,
        price,
        image,
        description,
        category
      }
    }
  }`
    return client.fetch(query, { slug })
}

// Components for PortableText
const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <figure className="my-8">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || 'Blog Image'}
                            fill
                            className="object-cover w-full h-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
                        />
                    </div>
                    {value.credit && (
                        <figcaption className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic text-center">
                            Image courtesy of {value.credit}
                        </figcaption>
                    )}
                </figure>
            )
        },
        reference: ({ value }: any) => {
            if (!value || !value.slug) return null;
            const productUrl = `/shop/${value.slug}?utm_source=blog&utm_medium=embed&utm_campaign=product_card`;

            return (
                <div className="my-12 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 group hover:border-blue-500/50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/* Product Image */}
                        <div className="relative w-full h-40 rounded-xl overflow-hidden flex-shrink-0 bg-white dark:bg-black md:col-span-1">
                            {value.image && (
                                <Link href={productUrl}>
                                    <Image
                                        src={urlFor(value.image).url()}
                                        alt={value.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="md:col-span-2 flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                                    Featured Product
                                </div>
                                <Link href={productUrl} className="block">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {value.title}
                                    </h3>
                                </Link>
                                <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-gray-900 dark:text-white">
                                    ${value.price}
                                </span>
                                <Link
                                    href={productUrl}
                                    className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold text-sm hover:opacity-80 transition-opacity shadow-md"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    },
    block: {
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h3>,
        normal: ({ children }) => <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-600 pl-6 italic text-xl text-gray-800 dark:text-gray-200 my-8">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 text-lg text-gray-700 dark:text-gray-300 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-8 text-lg text-gray-700 dark:text-gray-300 space-y-2">{children}</ol>,
    },
}
// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    const publishedDate = new Date(post.publishedAt).toISOString().split('T')[0]
    const image = post.mainImage ? urlFor(post.mainImage).url() : 'https://websitesarena.com/icon.png'

    // Generate dynamic keywords from post title and excerpt
    const titleWords = post.title.toLowerCase().split(' ').filter((w: string) => w.length > 4)
    const excerptWords = post.excerpt.toLowerCase().split(' ').filter((w: string) => w.length > 4)
    const dynamicKeywords = [
        ...titleWords.slice(0, 3),
        ...excerptWords.slice(0, 2),
        'digital assets',
        'website marketplace',
        'entrepreneur guide',
        'business tips',
        'online business',
        'SaaS marketplace',
    ]

    return {
        title: `${post.title} | Websites Arena Blog`,
        description: post.excerpt,
        keywords: dynamicKeywords,
        authors: [{ name: 'Websites Arena' }],
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
            canonical: `https://websitesarena.com/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post._updatedAt,
            url: `https://websitesarena.com/blog/${slug}`,
            images: [image],
            authors: ['Websites Arena'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [image],
            site: '@websitesarena',
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        author: {
            '@type': 'Organization',
            name: 'Websites Arena',
            url: 'https://websitesarena.com'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Websites Arena',
            logo: {
                '@type': 'ImageObject',
                url: 'https://websitesarena.com/icon.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://websitesarena.com/blog/${post.slug.current}`
        },
        description: post.excerpt,
    }

    return (
        <article className="min-h-screen bg-white dark:bg-black pt-24 pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-16">
                    <div className="flex items-center space-x-2 text-sm text-blue-600 font-bold uppercase tracking-widest mb-6">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    <h1 className="
                      text-5xl md:text-6xl lg:text-7xl
                      font-display font-bold
                      text-gray-900 dark:text-white
                      tracking-tight leading-tight
                      mb-10
                    ">
                        {post.title}
                    </h1>
                    {post.mainImage && (
                        <figure className="my-8">
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>
                            {post.mainImage?.credit && (
                                <figcaption className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic text-center">
                                    Image courtesy of {post.mainImage.credit}
                                </figcaption>
                            )}
                        </figure>
                    )}
                </header>

                {/* Author Section */}
                <div className="
                  mb-16 p-8
                  bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30
                  rounded-2xl border border-gray-200 dark:border-gray-800
                  flex items-center gap-6
                  shadow-sm hover:shadow-md transition-shadow
                ">
                    {post.authorImage && (
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-3 border-gray-200 dark:border-gray-700 ring-2 ring-blue-100 dark:ring-blue-900/50">
                            <Image
                                src={urlFor(post.authorImage).url()}
                                alt={post.author || 'Author'}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Written by</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-1">{post.author || 'Websites Arena'}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Published on {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="
                  prose prose-lg dark:prose-invert max-w-4xl
                  prose-headings:font-display
                  prose-h1:text-6xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:leading-tight
                  prose-h2:text-4xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-3xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-lg prose-p:leading-relaxed prose-p:font-serif prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-6
                  prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-em:italic prose-em:text-gray-800 dark:prose-em:text-gray-200
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 
                  prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                  prose-blockquote:font-serif prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
                  prose-blockquote:rounded-r-lg prose-blockquote:py-4
                  prose-code:bg-gray-900 prose-code:text-white prose-code:px-2 prose-code:py-1 
                  prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:dark:bg-gray-800
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl
                  prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-800 prose-pre:dark:bg-black
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:mb-6
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3 prose-ol:mb-6
                  prose-li:text-lg prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
                  prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-12
                  prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800
                  prose-table:mb-8 prose-th:bg-gray-100 dark:prose-th:bg-gray-900 prose-th:font-bold prose-th:px-4 prose-th:py-3
                  prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-800
                ">
                    <PortableText value={post.body} components={components} />
                </div>

                {/* CTA */}
                <div className="
                  mt-24 p-12
                  bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30
                  rounded-3xl border border-blue-200 dark:border-blue-800
                  text-center shadow-lg
                ">
                    <h3 className="
                      text-3xl md:text-4xl font-display font-bold
                      text-gray-900 dark:text-white
                      mb-4
                    ">
                        Ready to start your journey?
                    </h3>
                    <p className="
                      text-lg text-gray-700 dark:text-gray-300
                      mb-8 max-w-md mx-auto
                      leading-relaxed font-serif
                    ">
                        Browse our marketplace of vetted starter sites and micro-SaaS projects.
                    </p>
                    <Link
                        href="/"
                        className="
                          inline-flex items-center
                          px-8 py-4
                          bg-blue-600 text-white
                          rounded-full
                          font-bold font-display
                          hover:bg-blue-700
                          transition-all shadow-lg hover:shadow-blue-600/30
                          text-lg
                        "
                    >
                        Explore Marketplace
                    </Link>
                </div>
            </div>
        </article>
    )
}
