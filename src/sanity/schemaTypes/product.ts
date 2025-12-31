import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product (Digital Asset)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Product Title',
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
                    { title: 'SaaS / Website', value: 'saas' },
                    { title: 'E-book / PDF', value: 'ebook' },
                    { title: 'Template / UI Kit', value: 'template' },
                    { title: 'Course', value: 'course' },
                    { title: 'Photography', value: 'photography' },
                    { title: 'Video Footage', value: 'video' },
                    { title: 'Digital Art', value: 'digital-art' },
                    { title: 'Domain', value: 'domain' },
                    { title: 'Tool', value: 'tool' },
                    { title: 'Boilerplate', value: 'boilerplate' },
                    { title: 'E-commerce', value: 'ecommerce' },
                    { title: 'Blog', value: 'blog' },
                    { title: 'Other', value: 'other' },
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
            hidden: ({ document }) => !['saas', 'course', 'template', 'boilerplate', 'ecommerce', 'tool', 'blog'].includes(document?.category as string),
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
            hidden: ({ document }) => !['saas', 'template', 'boilerplate', 'ecommerce', 'tool', 'blog', 'course'].includes(document?.category as string),
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => !['saas', 'template', 'boilerplate', 'ecommerce', 'tool', 'blog'].includes(document?.category as string),
        }),
        defineField({
            name: 'digitalAsset',
            title: 'Digital Asset File',
            type: 'file',
            description: 'Upload the digital asset directly (PDF, Zip, etc.) if not using an external link.',
            hidden: ({ document }) => !['ebook', 'template', 'digital-art', 'photography', 'video'].includes(document?.category as string),
        }),
        defineField({
            name: 'assetExternalLink',
            title: 'External Asset Link',
            type: 'url',
            description: 'Link to the asset (Google Drive, Dropbox, etc.) for large files > 4MB.',
        }),

        defineField({
            name: 'sellerType',
            title: 'Seller Tier',
            type: 'string',
            options: {
                list: [
                    { title: 'Independent Seller', value: 'independent' },
                    { title: 'Verified Seller', value: 'verified' },
                    { title: 'Premium (Websites Arena)', value: 'premium' },
                ],
            },
            initialValue: 'independent',
        }),
        defineField({
            name: 'deliveryMethod',
            title: 'Delivery Method',
            type: 'string',
            options: {
                list: [
                    { title: 'Instant Download', value: 'instant' },
                    { title: 'Manual Transfer', value: 'transfer' },
                ],
            },
            initialValue: 'instant',
            description: 'Select "Manual Transfer" for domains, SaaS, or items requiring handover.',
        }),
        defineField({
            name: 'support',
            title: 'Support Offered',
            type: 'string',
            options: {
                list: [
                    { title: 'No Support', value: 'none' },
                    { title: '10 Days Support', value: '10-days' },
                    { title: '30 Days Support', value: '30-days' },
                    { title: '3 Months Support', value: '3-months' },
                    { title: 'Lifetime Updates & Support', value: 'lifetime' },
                ]
            },
            initialValue: 'none',
            description: 'Does the seller offer technical support after purchase?',
        }),
        defineField({
            name: 'previewImages',
            title: 'Preview Gallery',
            type: 'array',
            of: [{ type: 'image' }],
            description: 'Safe screenshots or previews to show publicly (e.g., first 5 pages of ebook).',
        }),
        defineField({
            name: 'previewFile',
            title: 'Preview PDF',
            type: 'file',
            description: 'Upload a TRUNCATED version of the PDF for public preview (e.g., first 5 pages).',
            hidden: ({ document }) => document?.category !== 'ebook',
        }),
        defineField({
            name: 'metadata',
            title: 'Technical Details (Art/Video)',
            type: 'object',
            fields: [
                defineField({ name: 'resolution', title: 'Resolution', type: 'string', description: 'e.g., 4K, 6000x4000px' }),
                defineField({ name: 'fileFormat', title: 'File Format', type: 'string', description: 'e.g., RAW, JPG, MP4' }),
                defineField({ name: 'aspectRatio', title: 'Aspect Ratio', type: 'string', description: 'e.g., 16:9' }),
            ],
            hidden: ({ document }) => !['photography', 'video', 'digital-art'].includes(document?.category as string),
        }),
        defineField({
            name: 'metrics',
            title: 'Business Metrics (SaaS/Project)',
            type: 'object',
            fields: [
                defineField({ name: 'revenue', title: 'Monthly Revenue ($)', type: 'number' }),
                defineField({ name: 'profit', title: 'Monthly Profit ($)', type: 'number' }),
                defineField({ name: 'traffic', title: 'Monthly Traffic', type: 'number' }),
                defineField({ name: 'age', title: 'Project Age (Months)', type: 'number' }),
            ],
            hidden: ({ document }) => !['saas', 'ecommerce', 'blog', 'tool', 'boilerplate'].includes(document?.category as string),
        }),
        defineField({
            name: 'domainDetails',
            title: 'Domain Details',
            type: 'object',
            fields: [
                defineField({ name: 'registrar', title: 'Registrar', type: 'string' }),
                defineField({ name: 'expiryDate', title: 'Expiry Date', type: 'date' }),
                defineField({ name: 'renewalPrice', title: 'Yearly Renewal ($)', type: 'number' }),
                defineField({ name: 'age', title: 'Domain Age (Years)', type: 'number' }),
            ],
            hidden: ({ document }) => document?.category !== 'domain',
        }),
    ],
})
