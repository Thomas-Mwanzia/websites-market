import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { NextResponse } from 'next/server'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
})

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const excerpt = formData.get('excerpt') as string
        const body = formData.get('body') as string
        const imageCredit = formData.get('imageCredit') as string
        const imageFile = formData.get('mainImage') as File | null
        const authorImageFile = formData.get('authorImage') as File | null

        if (!title || !author) {
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
            authorImage: authorImageAsset,
            excerpt,
            publishedAt: new Date().toISOString(),
            mainImage: imageAsset,
            body: [
                {
                    _type: 'block',
                    children: [
                        {
                            _type: 'span',
                            text: body,
                        },
                    ],
                    markDefs: [],
                    style: 'normal',
                },
            ],
        }

        const result = await client.create(doc)

        return NextResponse.json({ result })
    } catch (error) {
        console.error('Error submitting blog post:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
