
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {} 
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

module.exports = nextConfig;
