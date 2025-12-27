import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
    console.warn('Sanity project ID not configured. Check your .env.local file.')
}

if (!token) {
    console.warn('Sanity write token not configured. Reviews and other write operations will fail. Add SANITY_API_WRITE_TOKEN to your .env.local file.')
}

export const writeClient = createClient({
    projectId: projectId || 'missing-project-id',
    dataset: dataset || 'production',
    apiVersion,
    useCdn: false,
    token: token,
})
