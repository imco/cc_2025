import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_MODE === 'export' ? 'export' : undefined,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imco.org.mx',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    turbo:{
      rules: {
        '*.csv': {
          loaders:['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test:/\.csv$/,
      use:[
        options.defaultLoaders.babel,
          {
            loader:'raw-loader'
          },
      ]
    })
    return config
  }
};

export default nextConfig;
