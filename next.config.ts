import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.68.100"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "files.devancetech.com",
      // },
    ],
  },
};

export default nextConfig;
