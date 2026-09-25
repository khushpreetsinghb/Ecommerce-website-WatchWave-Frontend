# WatchWave frontend (Next.js)

Next.js 16 App Router storefront for WatchWave. Talks to the Express API in `../backend`.

## Develop

```bash
npm install
cp .env.example .env.local   # API_URL=http://localhost:8080
npm run dev                  # http://localhost:3000 (API proxied to :8080)
```

Run the backend alongside it (`npm run dev` from the repo root runs both).

## Build / deploy (Vercel, Netlify…)

```bash
npm run build
```

- Root directory: repository root (`.`), build command `npm run build`.
- Server-only env var: `API_URL=https://<your-backend>` (no trailing slash).
- About/Contact/Policy pages are statically prerendered; product pages are
  server-rendered per request with per-product `<title>` via `generateMetadata`.

## Notes

- `lib/api-client.js` — axios instance using same-origin `/api/*` requests;
  Next.js forwards them to the server-only `API_URL`.
- `lib/api.js` — `apiUrl()` for `<img>` product-photo URLs (keeps image
  requests on the same frontend origin).
- Route guards live in `components/Routes/` (`PrivateGuard`, `AdminGuard`)
  and the `app/dashboard/*/layout.js` files, replacing react-router outlets.
