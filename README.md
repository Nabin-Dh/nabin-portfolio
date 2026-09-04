# Nabin Dhungana — Portfolio

Personal portfolio and insights site for **Nabin Dhungana**, System & Network
Engineer | Aspiring Cloud Solutions Architect.

## Stack

- **Next.js 16.3.4** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** (`@tailwindcss/typography` for prose)
- **MDX** via `@next/mdx` + gray-matter for the Insights publishing system
- **Biome** for linting/formatting
- **Full light + dark theme** with system-preference detection, localStorage
  persistence, and a no-flash startup script (`ThemeScript`)
- Server components by default; client JS only where interactivity is required

## Commands

```bash
npm install       # install dependencies
npm run dev       # development server (http://localhost:3000)
npm run build     # production build
npm run start     # serve the production build (Node runtime)
npm run lint      # biome check .
npm run typecheck # tsc --noEmit
```

The serverless API in `api/` is a separate project with its own dependencies:
`cd api && npm install`, then `npm run build` (compiles `src/` → `dist/` for the
Azure Functions runtime) and optionally `npm run start` with the Azure Functions
Core Tools for local testing.

## Repository layout

| Path | Purpose |
|---|---|
| `app/` | Pages, routes, layout, sitemap, robots, CV route |
| `components/` | UI primitives, layout, insights, projects, FX |
| `lib/` | Typed content layer (`constants.ts`, `content.ts`, `insights.ts`) |
| `content/insights/` | Article source files (MDX + frontmatter) + `README.md` |
| `public/` | Static assets: `cv/nabin-dhungana-cv.pdf`, optional `profile/` photo |
| `api/` | Serverless Azure Functions: contact delivery (SendGrid) + article metrics (Azure Table Storage) |
| `.github/workflows/` | Azure Static Web Apps CI/CD pipeline — pushes to Azure on every commit |
| `PROJECT_PLAN.md` | Source-of-truth project history, decisions, and roadmap |
| `MAINTENANCE.md` | Non-expert owner's guide: how to update content from any device |

## Editing content

Profile data (bio, role, domains, education, experience, credentials, projects)
lives in `lib/constants.ts` and `lib/content.ts` — simple typed TS data, separate
from presentation. Insights are plain MDX files in `content/insights/`; see the
README there for the full create/edit/delete workflow, frontmatter schema, and
the private-file (`_`-prefixed) convention. All content is committed to the
repository and generated at build time — no admin UI.

The site also ships a small **serverless backend** (`api/`, Azure Functions) that
delivers the Contact form via SendGrid and persists article views/reactions in
Azure Table Storage. See [`MAINTENANCE.md`](MAINTENANCE.md) for setup.

> **See [`MAINTENANCE.md`](MAINTENANCE.md)** for the owner-focused, non-technical
> guide on editing articles, projects, profile data, and the CV/photo from any
> device via GitHub.

## Deployment

The front end is a deployment-portable Next.js app (Node runtime, standard
output) deployed to **Azure Static Web Apps** via GitHub Actions. The backend is
a serverless `api/` folder of Azure Functions served by SWA under `/api/*` (no
always-running server, no local database). No runtime dependency on localhost,
OmniRoute, OpenCode, or the development machine. See `PROJECT_PLAN.md` →
"Deployment Architecture" for the full setup and what remains before launch.

Environment variables:
- Build-time (non-secret): `NEXT_PUBLIC_SITE_URL` (optional domain override),
  and optionally `NEXT_PUBLIC_API_URL` to point the front end at a non-same-origin API.
- Server-side secrets (set in SWA application settings, never committed):
  `AZURE_TABLES_CONNECTION_STRING`, `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`,
  `SENDGRID_FROM_NAME`, `CONTACT_TO_EMAIL`. See `.env.example` and `MAINTENANCE.md`.

## Placeholders (awaiting real assets from Nabin)

- `public/cv/nabin-dhungana-cv.pdf` — real CV PDF
- `public/profile/profile.jpg|png|webp` or `me.jpg` — profile photo
- `content/insights/` real articles — `_template.mdx` is a private skeleton only

No placeholder content is fabricated; the site renders an empty state until the
real assets are provided.