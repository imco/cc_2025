import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_MODE === 'export' ? 'export' : undefined,
  // /derecho y /derecho/ deben resolver en GitHub Pages: el export genera
  // derecho/index.html y Pages redirige la forma sin diagonal a la carpeta
  trailingSlash: true,

  images: {
    // en el export estático no existe el optimizador (/_next/image); GitHub
    // Actions lo inyecta vía configure-pages, aquí se hace explícito para
    // que el build local sea idéntico al publicado
    unoptimized: process.env.BUILD_MODE === 'export',
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
