import { defineType } from 'sanity'

export default defineType({
  name: 'review',
  type: 'document',
  title: 'Product Review',
  fields: [
    {
      name: 'product',
      type: 'reference',
      to: [{ type: 'product' }],
      title: 'Product',
      validation: (rule) => rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Star Rating',
      description: '1-5 stars',
      validation: (rule) =>
        rule.required().min(1).max(5),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Review Title',
      description: 'Brief headline for the review',
      validation: (rule) =>
        rule.required().max(100),
    },
    {
      name: 'text',
      type: 'text',
      title: 'Review Text',
      description: 'Detailed review content',
      validation: (rule) =>
        rule.required().min(10).max(1000),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Reviewer Name',
      validation: (rule) => rule.required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Reviewer Email',
      description: 'Email for verification (not published)',
      validation: (rule) =>
        rule.required().email(),
    },
    {
      name: 'verified',
      type: 'boolean',
      title: 'Verified Purchase',
      description:
        'Check this box after verifying the purchase',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    },
  ],
})
