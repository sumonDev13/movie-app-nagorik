/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
    images: {
        domains: ['image.tmdb.org'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            pathname: '/t/p/**',
          },
        ],
      },
};

export default nextConfig;
