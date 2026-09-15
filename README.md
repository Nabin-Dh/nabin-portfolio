# Nabin Dhungana — Portfolio

Personal portfolio and insights site for **Nabin Dhungana**, an infrastructure
engineer working across networking, systems, security, and cloud.

Deployed as a **fully static site on GitHub Pages** at
`https://www.nabin-dhungana.com.np`.

## Stack

- **Next.js 16.3.4** (App Router, static export) + React 19 + TypeScript
- **Tailwind CSS v4** (`@tailwindcss/typography` for prose)
- **MDX** via `@next/mdx` + gray-matter for the Insights publishing system
- **Biome** for linting/formatting
- **Full light + dark theme** with system-preference detection, localStorage
  persistence, and a no-flash startup script (`ThemeScript`)
- Server components by default; client JS only where interactivity is required
- Static export (`output: "export"`, `trailingSlash: true`) → `out/` deployed to
  GitHub Pages — no server, no runtime dependencies

## Commands

```bash
npm install       # install dependencies
npm run dev       # development server (http://localhost:3000)
npm run build     # production build → static export in `out/`
npm run lint      # biome check .
npm run typecheck # tsc --noEmit
npx serve out     # optional local preview of the static export
```

To add the benefit of a server-side contact form / article metrics, see the
optional `api/` folder documented below — but the site is designed to work
fully static with a `mailto:` contact form and no backend.

## Repository layout

| Path | Purpose |
|---|---|
| `app/` | Pages, routes, layout, sitemap, robots, metadata, JSON-LD |
| `components/` | UI primitives, layout, insights, projects, FX |
| `lib/` | Typed content layer (`constants.ts`, `content.ts`, `insights.ts`, `feedback.ts`) |
| `content/insights/` | Article source files (MDX + frontmatter) + `README.md` |
| `public/` | Static assets: `profile/` photo, `CNAME` |
| `api/` | **Optional** serverless Azure Functions (contact delivery + article metrics) — not deployed with the Pages site |
| `.github/workflows/` | GitHub Pages CI/CD pipeline (`deploy.yml`) |
| `PROJECT_PLAN.md` | Source-of-truth project history, decisions, and roadmap |
| `MAINTENANCE.md` | Non-expert owner's guide: how to update content from any device |

## Editing content

Profile data (bio, focus areas, certifications, projects) lives in
`lib/constants.ts` and `lib/content.ts` — simple typed TS data, separate
from presentation. Insights are plain MDX files in `content/insights/`; see the
README there for the full create/edit/delete workflow, frontmatter schema, and
the private-file (`_`-prefixed) convention. All content is committed to the
repository and generated at build time — no admin UI, no server.

The Contact form is a client-side `mailto:` composer — it opens the visitor's own
email app; no message data is transmitted to or stored by this site.

> **See [`MAINTENANCE.md`](MAINTENANCE.md)** for the owner-focused, non-technical
> guide on editing articles, projects, profile data, and the photo from any
> device via GitHub.

## Deployment

This is a **static-site deployment** to **GitHub Pages**:

- The repo keeps a `CNAME` file (`www.nabin-dhungana.com.np`) so GitHub Pages
  serves the custom domain.
- `.github/workflows/deploy.yml` runs on every push to `main`: install, lint,
  typecheck, `npm run build`, then uploads `out/` via
  `actions/upload-pages-artifact` + `actions/deploy-pages`.
- DNS: a CNAME record for `www` → `Nabin-Dh.github.io` (see MAINTENANCE.md).

The build never requires secrets. `NEXT_PUBLIC_SITE_URL` (optional) overrides the
canonical domain used for sitemap/robots/OG/metadata; it defaults to
`https://www.nabin-dhungana.com.np`.

## Optional serverless backend (`api/`)

The `api/` folder holds a standalone Azure Functions project (separate deps;
builds with `tsc` to `dist/`) that can deliver contact messages via SendGrid and
persist article views/reactions. It is **not** part of the GitHub Pages
deployment and the front end never requires it: `lib/feedback.ts` calls the API
only when `NEXT_PUBLIC_API_URL` is set, and the metrics UI renders nothing when
the API is unreachable — counts are never fabricated. See `README.md` inside
`api/` and MAINTENANCE.md for opt-in setup.

## Placeholders / known pending items

- `content/insights/` real articles — `_template.mdx` is a private skeleton only
- The site currently has no CV/PDF by design (removed with the Azure
  migration); the navbar, footer, and contact pages link to LinkedIn/GitHub
  instead.

No placeholder content is fabricated; the site renders an honest empty state
until real assets are provided.