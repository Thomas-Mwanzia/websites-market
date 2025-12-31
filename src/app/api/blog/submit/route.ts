import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const authorEmail = formData.get('authorEmail') as string
        const publicAuthorEmail = formData.get('publicAuthorEmail') as string
        const excerpt = formData.get('excerpt') as string
        const body = formData.get('body') as string
        const imageCredit = formData.get('imageCredit') as string
        const imageFile = formData.get('mainImage') as File | null
        const authorImageFile = formData.get('authorImage') as File | null

        if (!title || !author || !authorEmail) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        let imageAsset = null
        if (imageFile) {
            const buffer = await imageFile.arrayBuffer()
            const asset = await client.assets.upload('image', Buffer.from(buffer), {
                filename: imageFile.name,
            })
            imageAsset = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
                credit: imageCredit || undefined,
            }
        }

        let authorImageAsset = null
        if (authorImageFile) {
            const buffer = await authorImageFile.arrayBuffer()
            const asset = await client.assets.upload('image', Buffer.from(buffer), {
                filename: authorImageFile.name,
            })
            authorImageAsset = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
            }
        }

        const doc = {
            _type: 'post',
            _id: `drafts.${crypto.randomUUID()}`, // Use drafts. prefix for drafts
            title,
            slug: {
                _type: 'slug',
                current: title.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
            },
            author,
            authorEmail,
            publicAuthorEmail: publicAuthorEmail || undefined,
            authorImage: authorImageAsset,
            excerpt,
            publishedAt: new Date().toISOString(),
            mainImage: imageAsset,
            body: [
                {
                    _type: 'block',
                    _key: crypto.randomUUID(),
                    children: [
                        {
                            _type: 'span',
                            _key: crypto.randomUUID(),
                            text: body,
                        },
                    ],
                    markDefs: [],
                    style: 'normal',
                },
            ],
        }

        const result = await client.create(doc)

        // Send Admin Notification
        await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: ['hello@websitesarena.com'],
            replyTo: authorEmail,
            subject: `New Blog Submission: ${title}`,
            html: `
                <h1>New Blog Post Submitted</h1>
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Author:</strong> ${author}</p>
                <p><strong>Email:</strong> ${authorEmail}</p>
                ${publicAuthorEmail ? `<p><strong>Public Email:</strong> ${publicAuthorEmail}</p>` : ''}
                <p><strong>Excerpt:</strong> ${excerpt}</p>
                <p>Review the draft in Sanity Studio.</p>
            `
        })

        // Send Author Confirmation
        await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: [authorEmail],
            subject: 'Blog Submission Received - Websites Arena',
            html: `
                <h1>Submission Received</h1>
                <p>Hi ${author},</p>
                <p>Thanks for submitting your blog post "<strong>${title}</strong>" to Websites Arena.</p>
                <p>Our team will review it shortly. You'll receive another email once it's published.</p>
            `
        })

        return NextResponse.json({ result })
    } catch (error) {
        console.error('Error submitting blog post:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
