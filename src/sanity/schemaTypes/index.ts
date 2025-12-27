import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import { post } from './post'
import review from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, post, review],
}
