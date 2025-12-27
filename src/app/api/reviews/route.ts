import { client } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { productId, rating, title, text, author, email } = await request.json()

    // Validation
    if (!productId || rating === undefined || !title || !text || !author || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Rating must be a whole number between 1 and 5' },
        { status: 400 }
      )
    }

    if (title.length < 3 || title.length > 100) {
      return NextResponse.json(
        { error: 'Review title must be between 3 and 100 characters' },
        { status: 400 }
      )
    }

    if (text.length < 10 || text.length > 1000) {
      return NextResponse.json(
        { error: 'Review text must be between 10 and 1000 characters' },
        { status: 400 }
      )
    }

    // Verify product exists
    const product = await client.fetch('*[_type == "product" && _id == $id][0]', { id: productId })
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Create review in Sanity
    const review = await client.create({
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId,
      },
      rating: parseInt(String(rating)),
      title,
      text,
      author,
      email,
      verified: false,
      publishedAt: new Date().toISOString(),
    })

    console.log('Review created:', review._id)

    return NextResponse.json(
      { success: true, reviewId: review._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit review. Please try again.' },
      { status: 500 }
    )
  }
}
