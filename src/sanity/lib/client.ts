import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

if (!projectId || projectId === 'dummy-project-id') {
    console.warn('Sanity project ID not configured. Using dummy client.')
}

export const client = createClient({
    projectId: projectId || 'dummy-project-id',
    dataset: dataset || 'production',
    apiVersion,
    useCdn,
    perspective: 'published',
})
