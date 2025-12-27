import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'credit',
                    title: 'Image Credit / Attribution',
                    type: 'string',
                    description: 'Source or photographer credit. e.g., "Unsplash", "John Smith", "Getty Images"',
                }),
            ],
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'A short summary of the post for SEO and previews.',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            description: 'Name of the author who wrote this post.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'authorImage',
            title: 'Author Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Profile picture of the author (optional).',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Alternative text for accessibility and SEO.',
                        }),
                        defineField({
                            name: 'credit',
                            title: 'Image Credit / Attribution',
                            type: 'string',
                            description: 'Source or photographer credit. e.g., "Unsplash", "John Smith", "Getty Images"',
                        }),
                    ],
                },
                {
                    type: 'reference',
                    to: [{ type: 'product' }],
                    title: 'Product Embed',
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})
