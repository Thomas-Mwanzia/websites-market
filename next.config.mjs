/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
        localPatterns: [
            {
                pathname: '/api/watermark',
            },
            {
                pathname: '/icon.png',
            },
        ],
    },
};

export default nextConfig;
