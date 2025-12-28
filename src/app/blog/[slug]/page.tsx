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

async function getRelatedPosts(currentSlug: string) {
    const query = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        excerpt,
        author,
        authorImage
    }`
    return client.fetch(query, { slug: currentSlug })
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
                <div className="my-8 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 group hover:border-blue-500/50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        {/* Product Image */}
                        <Link href={productUrl} className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden flex-shrink-0 bg-white dark:bg-black md:col-span-1 block m-0 p-0">
                            {value.image && (
                                <Image
                                    src={urlFor(value.image).url()}
                                    alt={value.title}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105 m-0 p-0"
                                />
                            )}
                        </Link>

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
    const relatedPosts = await getRelatedPosts(slug)

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 lg:col-start-3">
                        {/* Header */}
                        <header className="mb-12 text-left">
                            <div className="flex items-center justify-start space-x-2 text-sm text-blue-600 font-bold uppercase tracking-widest mb-6">
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                            <h1 className="
                              text-3xl md:text-4xl lg:text-5xl
                              font-display font-bold
                              text-gray-900 dark:text-white
                              tracking-tight leading-tight
                              mb-8
                            ">
                                {post.title}
                            </h1>

                            {/* Author Byline */}
                            <div className="flex items-center justify-start gap-3 mb-12">
                                {post.authorImage && (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <Image
                                            src={urlFor(post.authorImage).url()}
                                            alt={post.author || 'Author'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        {post.author || 'Websites Arena'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Editor
                                    </p>
                                </div>
                            </div>

                            {post.mainImage && (
                                <figure className="my-8">
                                    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                                        <Image
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover w-full h-full"
                                            priority
                                        />
                                    </div>
                                    {post.mainImage?.credit && (
                                        <figcaption className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
                                            Image courtesy of {post.mainImage.credit}
                                        </figcaption>
                                    )}
                                </figure>
                            )}
                        </header>

                        {/* Content */}
                        <div className="
                          prose prose-lg dark:prose-invert max-w-none
                          prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
                          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                          prose-p:text-xl prose-p:leading-relaxed prose-p:font-serif prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:mb-8
                          prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
                          prose-em:italic prose-em:text-gray-800 dark:prose-em:text-gray-200
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 
                          prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-gray-900 dark:prose-blockquote:text-white
                          prose-blockquote:font-serif prose-blockquote:my-12
                          prose-code:bg-gray-100 prose-code:text-gray-900 prose-code:px-2 prose-code:py-1 
                          prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:dark:bg-gray-800 prose-code:dark:text-white
                          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl
                          prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-800 prose-pre:dark:bg-black
                          prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:mb-8
                          prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3 prose-ol:mb-8
                          prose-li:text-xl prose-li:font-serif prose-li:text-gray-800 dark:prose-li:text-gray-300 prose-li:leading-relaxed
                          prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-12
                          prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800
                        ">
                            <PortableText value={post.body} components={components} />
                        </div>

                        {/* Mobile Sharing */}
                        <div className="lg:hidden mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Share this article</h4>
                            <div className="flex justify-center gap-6">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://websitesarena.com/blog/${post.slug.current}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-gray-50 dark:bg-gray-900 rounded-full text-sm font-bold text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors"
                                >
                                    Twitter / X
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://websitesarena.com/blog/${post.slug.current}`)}&title=${encodeURIComponent(post.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-6 py-3 bg-gray-50 dark:bg-gray-900 rounded-full text-sm font-bold text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="
                          mt-24 p-12
                          bg-gray-50 dark:bg-gray-900
                          rounded-3xl border border-gray-200 dark:border-gray-800
                          text-center
                        ">
                            <h3 className="
                              text-3xl font-display font-bold
                              text-gray-900 dark:text-white
                              mb-4
                            ">
                                Ready to start your journey?
                            </h3>
                            <p className="
                              text-lg text-gray-600 dark:text-gray-400
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
                                  bg-black text-white dark:bg-white dark:text-black
                                  rounded-full
                                  font-bold font-display
                                  hover:opacity-80
                                  transition-all shadow-lg
                                  text-lg
                                "
                            >
                                Explore Marketplace
                            </Link>
                        </div>
                    </div>

                    {/* Sticky Sidebar (Desktop) */}
                    <div className="hidden lg:block lg:col-span-2 lg:col-start-11">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Share</h4>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://websitesarena.com/blog/${post.slug.current}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                                    >
                                        Twitter / X
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://websitesarena.com/blog/${post.slug.current}`)}&title=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-32 border-t border-gray-200 dark:border-gray-800 pt-24">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 font-display">Read Next</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost: any) => (
                                <Link
                                    href={`/blog/${relatedPost.slug.current}`}
                                    key={relatedPost._id}
                                    className="group block"
                                >
                                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900">
                                        {relatedPost.mainImage ? (
                                            <Image
                                                src={urlFor(relatedPost.mainImage).url()}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 font-serif">
                                        {relatedPost.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}
