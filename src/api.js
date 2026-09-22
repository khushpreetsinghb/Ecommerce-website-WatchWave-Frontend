import axios from "axios";

// Central place for API configuration.
//
// - Local dev (single repo, `npm run dev` from root): CRA `proxy`
//   forwards `/api/*` to http://localhost:8080, so empty baseURL works.
// - Split deploys (frontend on Vercel/Netlify, backend on Render/Railway):
//   set REACT_APP_API=https://your-backend.onrender.com in the frontend
//   host dashboard. All existing `axios.get("/api/v1/...")` calls then
//   automatically target the deployed backend.
axios.defaults.baseURL = process.env.REACT_APP_API || "";

export default axios;
