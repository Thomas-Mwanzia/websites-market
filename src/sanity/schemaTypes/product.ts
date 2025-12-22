import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product (Website)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Website Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price ($)',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'SaaS', value: 'saas' },
                    { title: 'E-commerce', value: 'ecommerce' },
                    { title: 'Blog', value: 'blog' },
                    { title: 'Portfolio', value: 'portfolio' },
                    { title: 'Tool', value: 'tool' },
                ]
            }
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Demo URL',
            type: 'url',
            description: 'Link to a YouTube video demonstrating the website.',
        }),
        defineField({
            name: 'checkoutUrl',
            title: 'Checkout URL (Lemon Squeezy)',
            type: 'url',
            description: 'The "Buy Now" link from Lemon Squeezy. Users click this to pay.',
        }),
        defineField({
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
