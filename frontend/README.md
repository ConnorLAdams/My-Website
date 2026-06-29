# Frontend (Vite + React 19 + Tailwind v4)

The single-page portfolio app. See the [root README](../README.md) for full project, deployment, and security docs.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

The contact form posts to the API via `VITE_API_URL` (`.env.development` → `http://127.0.0.1:8080/api`), so run the backend (`cd ../backend && cargo run`) to exercise it locally.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build → `build/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint

## Styling

Tailwind v4. Design tokens are CSS variables in `src/theme.css`, mapped into Tailwind via `@theme` in `src/index.css`; dark mode switches on `[data-theme="dark"]`.
