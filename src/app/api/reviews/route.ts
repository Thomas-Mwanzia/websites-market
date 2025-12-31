import { client } from '@/sanity/lib/client'
import { writeClient } from '@/sanity/lib/write-client'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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

    // Check if write token is available
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('SANITY_API_WRITE_TOKEN is not configured')
      return NextResponse.json(
        { error: 'Review submission is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    // Create review in Sanity using write client
    const review = await writeClient.create({
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

    console.log('Review created successfully:', review._id)

    // Send Admin Notification
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Websites Arena <hello@websitesarena.com>',
        to: ['hello@websitesarena.com'],
        replyTo: email,
        subject: `New Review for Product: ${product.title || 'Unknown Product'}`,
        html: `
                <h1>New Review Submitted</h1>
                <p><strong>Product:</strong> ${product.title || productId}</p>
                <p><strong>Rating:</strong> ${rating} / 5</p>
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Reviewer:</strong> ${author} (${email})</p>
                <p><strong>Review:</strong></p>
                <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
                    ${text}
                </blockquote>
                <p>Review ID: ${review._id}</p>
            `
      })
    } catch (emailError) {
      console.error('Failed to send review notification email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { success: true, reviewId: review._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Review submission error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Provide more specific error messages for debugging
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Authentication failed. Write token may be invalid.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit review. Please try again.' },
      { status: 500 }
    )
  }
}
