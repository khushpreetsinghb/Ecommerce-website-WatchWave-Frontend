"use client";

import axios from "axios";

// Keep browser requests same-origin. The Next.js rewrite in next.config.mjs
// forwards `/api/*` requests to the server-only API_URL.
export default axios;
