import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL === 'https' ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || '127.0.0.1',
        port: process.env.NEXT_PUBLIC_IMAGE_PORT !== undefined ? process.env.NEXT_PUBLIC_IMAGE_PORT : '8000',
        pathname: '/storage/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: http://127.0.0.1:8000; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' http://127.0.0.1:8000;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;