'use server'

import { client } from "@/sanity/lib/client"

export async function fetchMorePosts(lastPublishedAt: string, lastId: string) {
  const query = `*[_type == "post" && (
    publishedAt < $lastPublishedAt ||
    (publishedAt == $lastPublishedAt && _id < $lastId)
  )] | order(publishedAt desc) [0...12] {
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

export async function fetchMoreProducts(lastCreatedAt: string, lastId: string) {
  const query = `*[_type == "product" && (
    _createdAt < $lastCreatedAt ||
    (_createdAt == $lastCreatedAt && _id < $lastId)
  )] | order(_createdAt desc) [0...12]`

  try {
    const products = await client.fetch(query, { lastCreatedAt, lastId })
    return products
  } catch (error) {
    console.error("Error fetching more products:", error)
    return []
  }
}
