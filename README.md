# EDUARDO.DEV — Portfolio

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint    # type-check (tsc --noEmit)
```
Requires Node.js 18.18+ (20+ recommended). Read PROJECT_CONTEXT.md before continuing development.

## Adding real projects
Edit `CASE_STUDIES` in `src/lib/projects.ts` (template in the comments). Screenshots go in `public/projects/`.

## SEO / deployment
Copy `.env.example` → `.env.local`, set `NEXT_PUBLIC_SITE_URL` to the real domain once deployed.
Favicon and Open Graph image are generated at runtime (`src/app/icon.tsx`, `opengraph-image.tsx`) —
no image assets to replace manually. Full deploy steps, env var table and a post-deploy checklist
are in `DEPLOYMENT.md`. Security headers and CSP live in `next.config.mjs`.
