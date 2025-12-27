import { client } from '@/sanity/lib/client'
import { BlogList } from '@/components/blog/BlogList'
import { Metadata } from 'next'

async function getPosts(searchTerm?: string) {
    let query = `*[_type == "post"] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    author,
    authorImage
  }`

    if (searchTerm) {
        query = `*[_type == "post" && (
            title match "${searchTerm}*" || 
            excerpt match "${searchTerm}*"
        )] | order(publishedAt desc) [0...20] {
            _id,
            title,
            slug,
            publishedAt,
            mainImage,
            excerpt,
            author,
            authorImage
        }`
    }

    return client.fetch(query)
}

export const metadata: Metadata = {
    title: 'Blog | Websites Arena - Digital Assets & Marketplace Insights',
    description: 'Expert insights on buying and selling digital assets, websites, SaaS, templates, and online businesses. Learn marketplace trends, valuation tips, and business strategies.',
    keywords: ['digital assets blog', 'website selling guide', 'SaaS marketplace', 'small business tips', 'entrepreneurship', 'website monetization', 'digital marketing', 'online business'],
    openGraph: {
        title: 'Blog | Websites Arena',
        description: 'Expert insights on buying and selling digital assets, websites, SaaS, templates, and online businesses.',
        url: 'https://websitesarena.com/blog',
        type: 'website',
        images: [{
            url: 'https://websitesarena.com/icon.png',
            width: 1200,
            height: 630,
            alt: 'Websites Arena Blog'
        }]
    },
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
        canonical: 'https://websitesarena.com/blog',
    },
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const { q } = await searchParams
    const posts = await getPosts(q)
    
    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Websites Arena Blog',
        description: 'Expert insights on buying and selling digital assets, websites, SaaS, templates, and online businesses.',
        url: 'https://websitesarena.com/blog',
        publisher: {
            '@type': 'Organization',
            name: 'Websites Arena',
            url: 'https://websitesarena.com',
        },
        hasPart: posts.map((post: any) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `https://websitesarena.com/blog/${post.slug.current}`,
            datePublished: post.publishedAt,
            image: post.mainImage ? `https://websitesarena.com/api/og?image=${encodeURIComponent(post.mainImage.asset.url)}` : undefined,
        }))
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogList initialPosts={posts} initialSearch={q} />
        </>
    )
}
