// Universal (server + client safe) API base helpers.
//
// NEXT_PUBLIC_API_URL points at the Express backend. When unset (local
// `next dev` with the rewrite proxy in next.config.mjs, or same-origin
// single-service deploys) requests stay relative and same-origin.
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// Build a URL for places that can't use the axios instance, e.g. <img> tags
// for product photos (`/api/v1/product/product-photo/:id`).
export const apiUrl = (path) => `${API_BASE}${path}`;
