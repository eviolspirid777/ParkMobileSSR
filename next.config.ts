import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5164/api/:path*",
      },
    ];
  },
  webpack(config) {
    return config;
  },
  output: "export",
  images: {
    unoptimized: true,
  }
};

export default nextConfig;