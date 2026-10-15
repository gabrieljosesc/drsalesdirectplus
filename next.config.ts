import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Classic rendering model (same as the main drsalesdirect site) — the
  // peptides page reads the live catalog per request.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        // Product photos live in the main Dr Sales Direct catalog's storage
        protocol: "https",
        hostname: "iswvqbjzdxqjpiidezor.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
