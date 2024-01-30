/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  distDir: 'build', 
    experimental: {
      forceSwcTransforms: true,
    },
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      
      return config;
    } 
  }
