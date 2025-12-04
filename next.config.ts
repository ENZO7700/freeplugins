
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  
  // This will prevent the build from failing due to the missing favicon.ico
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // This is to prevent the error: "Error occurred prerendering page "/favicon.ico""
    // This can be removed if a favicon.ico is added to the public folder.
    const pathMap = { ...defaultPathMap };
    delete pathMap['/favicon.ico'];
    return pathMap;
  },
};

export default nextConfig;
