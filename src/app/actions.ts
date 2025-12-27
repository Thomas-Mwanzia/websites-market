'use server'

import { client } from "@/sanity/lib/client"
import { getProductsWithRatings } from "@/lib/reviews"

export async function fetchMorePosts(lastPublishedAt: string, lastId: string) {
  const query = `*[_type == "post" && (
    publishedAt < $lastPublishedAt ||
    (publishedAt == $lastPublishedAt && _id < $lastId)
  )] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt
  }`

  try {
    const posts = await client.fetch(query, { lastPublishedAt, lastId })
    return posts
  } catch (error) {
    console.error("Error fetching more posts:", error)
    return []
  }
}

export async function searchPosts(term: string) {
  if (!term) return []

  const query = `*[_type == "post" && (
    title match "${term}*" || 
    excerpt match "${term}*"
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

  try {
    const posts = await client.fetch(query)
    return posts
  } catch (error) {
    console.error("Error searching posts:", error)
    return []
  }
}

export async function fetchMoreProducts(
  lastCreatedAt: string,
  lastId: string,
  filters?: { q?: string, category?: string, minPrice?: string, maxPrice?: string }
) {
  const conditions = ['_type == "product"']

  // Pagination condition
  conditions.push(`(
    _createdAt < $lastCreatedAt ||
    (_createdAt == $lastCreatedAt && _id < $lastId)
  )`)

  // Filter conditions
  if (filters?.q) {
    const q = filters.q
    conditions.push(`(
      title match "${q}*" || 
      description match "${q}*" || 
      category match "${q}*" || 
      techStack[] match "${q}*" || 
      features[] match "${q}*"
    )`)
  }

  if (filters?.category) {
    const categories = filters.category.split(',').map(c => `"${c.trim()}"`).join(',')
    conditions.push(`category in [${categories}]`)
  }

  if (filters?.minPrice) {
    conditions.push(`price >= ${filters.minPrice}`)
  }

  if (filters?.maxPrice) {
    conditions.push(`price <= ${filters.maxPrice}`)
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
    const products = await client.fetch(query, { lastCreatedAt, lastId })
    // Enhance with rating data
    const productsWithRatings = await getProductsWithRatings(products)
    return productsWithRatings
  } catch (error) {
    console.error("Error fetching more products:", error)
    return []
  }
}
