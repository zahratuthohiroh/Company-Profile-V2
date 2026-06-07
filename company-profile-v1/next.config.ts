import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL === 'https' ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || '127.0.0.1',
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;