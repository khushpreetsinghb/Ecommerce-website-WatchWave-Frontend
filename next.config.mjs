/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hides the floating Next.js dev-tools button (bottom-left in `next dev`).
  // Production builds never show it.
  devIndicators: false,
  // Local dev convenience: `/api/*` is proxied to the Express backend,
  // mirroring the old CRA `proxy` setting. In split production deploys
  // requests use the absolute NEXT_PUBLIC_API_URL instead (see lib/api.js).
  async rewrites() {
    const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    return [{ source: "/api/:path*", destination: `${api}/api/:path*` }];
  },
};

export default nextConfig;
