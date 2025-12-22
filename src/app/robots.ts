import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://websitesarena.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/studio/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
