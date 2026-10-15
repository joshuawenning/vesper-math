import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1536],
    imageSizes: [64, 128, 256, 320],
    qualities: [75, 85],
    minimumCacheTTL: 86400,
  },
};
export default config;
