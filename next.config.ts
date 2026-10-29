import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.szigetibikak.com",
        pathname: "/wp-content/uploads/**",
      },
    ],

    formats: ["image/webp"],

    minimumCacheTTL: 86400,
  },
};

export default nextConfig;