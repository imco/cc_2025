import type { NextConfig } from "next";

const nextConfig: NextConfig = {
experimental: {
  turbo:{
    rules: {
      '*.csv': {
        loaders:['raw-loader'],
        as: '*.ts'
      }
    }
  }
}
};

export default nextConfig;
