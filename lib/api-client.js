"use client";

import axios from "axios";
import { API_BASE } from "./api";

// Client-side axios instance. All existing `axios.get("/api/v1/...")`
// calls keep working: relative locally (via the next.config.mjs rewrite
// proxy) and absolute in split production deploys via NEXT_PUBLIC_API_URL.
axios.defaults.baseURL = API_BASE;

export default axios;
