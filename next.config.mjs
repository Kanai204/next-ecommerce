/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },

        ],
        domains: [
            'static.wixstatic.com', 
            'images.pexels.com'
        ],
          
    },
};

export default nextConfig;
