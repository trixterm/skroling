import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["upload.wikimedia.org"],
  // },
   compiler: {
    styledComponents: true,
  },

  reactStrictMode: false,
};

export default nextConfig;