# Nabin Dhungana — Portfolio

Personal portfolio and insights site for **Nabin Dhungana**, System & Network
Engineer | Aspiring Cloud Solutions Architect.

## Stack

- **Next.js 16.3.4** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** (`@tailwindcss/typography` for prose)
- **MDX** via `@next/mdx` + gray-matter for the Insights publishing system
- **Biome** for linting/formatting
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

## Repository layout

| Path | Purpose |
|---|---|
| `app/` | Pages, routes, layout, sitemap, robots, CV route |
| `components/` | UI primitives, layout, insights, projects, FX |
| `lib/` | Typed content layer (`constants.ts`, `content.ts`, `insights.ts`) |
| `content/insights/` | Article source files (MDX + frontmatter) + `README.md` |
| `public/` | Static assets: `cv/nabin-dhungana-cv.pdf`, optional `profile/` photo |
| `PROJECT_PLAN.md` | Source-of-truth project history, decisions, and roadmap |
| `MAINTENANCE.md` | Non-expert owner's guide: how to update content from any device |

## Editing content

Profile data (bio, role, domains, education, experience, credentials, projects)
lives in `lib/constants.ts` and `lib/content.ts` — simple typed TS data, separate
from presentation. Insights are plain MDX files in `content/insights/`; see the
README there for the full create/edit/delete workflow, frontmatter schema, and
the private-file (`_`-prefixed) convention. All content is committed to the
repository and generated at build time — no database, backend, or admin UI.

> **See [`MAINTENANCE.md`](MAINTENANCE.md)** for the owner-focused, non-technical
> guide on editing articles, projects, profile data, and the CV/photo from any
> device via GitHub.

## Deployment

Deployment-portable Next.js app (Node runtime, standard output). No runtime
dependency on localhost, OmniRoute, OpenCode, or the development machine — the
build output is a self-contained `next start` server. See `PROJECT_PLAN.md` →
"Deployment Architecture" for target hosting and what remains before public
launch.

Optional per-deployment domain override: `NEXT_PUBLIC_SITE_URL` (see
`.env.example`). No other environment variables or secrets are required.

## Placeholders (awaiting real assets from Nabin)

- `public/cv/nabin-dhungana-cv.pdf` — real CV PDF
- `public/profile/profile.jpg|png|webp` or `me.jpg` — profile photo
- `content/insights/` real articles — `_template.mdx` is a private skeleton only

No placeholder content is fabricated; the site renders an empty state until the
real assets are provided.