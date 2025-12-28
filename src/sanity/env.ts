export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Explicitly log to debug the issue
const projectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
console.log('[Sanity Env] NEXT_PUBLIC_SANITY_PROJECT_ID:', projectIdFromEnv)

export const projectId = projectIdFromEnv;

export const useCdn = false
