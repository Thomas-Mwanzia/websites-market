import { client } from "@/sanity/lib/client"

export async function getProductRating(productId: string) {
  try {
    const reviews = await client.fetch(
      `*[_type == "review" && product._ref == $productId && verified == true]`,
      { productId }
    )

    if (reviews.length === 0) {
      return { avgRating: undefined, reviewCount: 0 }
    }

    const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0)
    const avgRating = totalRating / reviews.length

    return {
      avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
      reviewCount: reviews.length,
    }
  } catch (error) {
    console.error("Error fetching product rating:", error)
    return { avgRating: undefined, reviewCount: 0 }
  }
}

export async function getProductsWithRatings(products: any[]) {
  try {
    // Fetch all reviews for these products in one query
    const productIds = products.map(p => p._id)
    const reviewsData = await client.fetch(
      `*[_type == "review" && product._ref in $productIds && verified == true] {
        "productId": product._ref,
        rating
      }`,
      { productIds }
    )

    // Group reviews by product
    const reviewsByProduct: { [key: string]: any[] } = {}
    reviewsData.forEach((review: any) => {
      if (!reviewsByProduct[review.productId]) {
        reviewsByProduct[review.productId] = []
      }
      reviewsByProduct[review.productId].push(review)
    })

    // Enhance products with ratings
    return products.map(product => {
      const reviews = reviewsByProduct[product._id] || []
      if (reviews.length === 0) {
        return { ...product, avgRating: undefined, reviewCount: 0 }
      }

      const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0)
      const avgRating = totalRating / reviews.length

      return {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
      }
    })
  } catch (error) {
    console.error("Error fetching products with ratings:", error)
    return products
  }
}
