/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hides the floating Next.js dev-tools button (bottom-left in `next dev`).
  // Production builds never show it.
  devIndicators: false,
  // Keep the backend URL server-side. Browser requests use same-origin
  // `/api/*` paths and Next.js forwards them to the Express backend.
  async rewrites() {
    const api = (process.env.API_URL || "http://localhost:8080").replace(/\/+$/, "");
    return [{ source: "/api/:path*", destination: `${api}/api/:path*` }];
  },
};

export default nextConfig;
