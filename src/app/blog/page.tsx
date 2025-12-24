import { client } from '@/sanity/lib/client'
import { BlogList } from '@/components/blog/BlogList'

async function getPosts(searchTerm?: string) {
    let query = `*[_type == "post"] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt
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
            excerpt
        }`
    }

    return client.fetch(query)
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const { q } = await searchParams
    const posts = await getPosts(q)
    return <BlogList initialPosts={posts} initialSearch={q} />
}
