import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/overseas-pathways",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
