import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

if (!projectId) {
    console.warn('Sanity project ID not configured. Check your .env.local file.')
}

export const client = createClient({
    projectId: projectId || 'missing-project-id',
    dataset: dataset || 'production',
    apiVersion,
    useCdn,
    perspective: 'published',
})
