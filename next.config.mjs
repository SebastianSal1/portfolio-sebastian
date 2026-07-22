/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Local `/public` assets only — no remote image CDN for the ship path.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
