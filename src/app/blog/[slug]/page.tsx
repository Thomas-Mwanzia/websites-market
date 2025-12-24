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
    mainImage,
    excerpt,
    body[]{
      ...,
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
                <div className="relative w-full h-96 my-8 rounded-2xl overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Blog Image'}
                        fill
                        className="object-cover"
                    />
                </div>
            )
        },
        reference: ({ value }: any) => {
            if (!value || !value.slug) return null;
            const productUrl = `/shop/${value.slug}?utm_source=blog&utm_medium=embed&utm_campaign=product_card`;

            return (
                <div className="my-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-6 items-center group hover:border-blue-500/50 transition-colors relative">
                    <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-white dark:bg-black">
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
                    <div className="flex-grow text-center md:text-left">
                        <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                            Featured Product
                        </div>
                        <Link href={productUrl} className="block">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                {value.title}
                            </h3>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                            {value.description}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <span className="text-lg font-black text-gray-900 dark:text-white">
                                ${value.price}
                            </span>
                            <Link
                                href={productUrl}
                                className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:opacity-80 transition-opacity"
                            >
                                View Product
                            </Link>
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

    return {
        title: `${post.title} | Websites Arena Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
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
                <header className="mb-12">
                    <div className="flex items-center space-x-2 text-sm text-blue-600 font-bold uppercase tracking-wider mb-4">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-8">
                        {post.title}
                    </h1>
                    {post.mainImage && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={post.body} components={components} />
                </div>

                {/* CTA */}
                <div className="mt-20 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to start your journey?
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Browse our marketplace of vetted starter sites and micro-SaaS projects.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20"
                    >
                        Explore Marketplace
                    </Link>
                </div>
            </div>
        </article>
    )
}
