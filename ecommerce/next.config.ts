

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com"], 
  },
};

// next.config.js
module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};



export default nextConfig;
