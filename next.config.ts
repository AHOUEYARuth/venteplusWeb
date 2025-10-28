import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors:true
  },
  eslint: {
    ignoreDuringBuilds:true
  },
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000', // ton port backend
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
