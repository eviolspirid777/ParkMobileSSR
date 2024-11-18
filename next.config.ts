import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
          source: "/api/:path*",
          destination: "http://localhost:5164/api/:path*"
        }
      ]
  },
};

export default nextConfig;
