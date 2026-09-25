// Browser-safe API URL helper.
//
// The backend URL is intentionally not imported here. API calls stay on the
// frontend origin and Next.js forwards `/api/*` to the server-only API_URL
// configured in next.config.mjs. This prevents the backend hostname from
// being embedded in the client bundle.
export const apiUrl = (path) => path;
