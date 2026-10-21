import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.szigetibikak.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
