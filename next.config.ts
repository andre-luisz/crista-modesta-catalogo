import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dqrfvkgxbzblxpkuvuqi.supabase.co",
        pathname: "/storage/v1/object/public/produtos/**",
      },
    ],
    qualities: [75, 90, 92],
  },
};

export default nextConfig;
