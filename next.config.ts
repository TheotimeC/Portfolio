import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@google/adk"],
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
