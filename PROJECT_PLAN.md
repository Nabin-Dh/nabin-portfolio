# PROJECT_PLAN.md — Nabin Dhungana Portfolio

> Source of truth for the entire project. Update after every phase.

---

## Project Objective

Build a production-quality personal portfolio website for Nabin Dhungana that communicates strong professional credibility as a **System & Network Engineer | Aspiring Cloud Solutions Architect**. The site should feel like a serious professional engineer's personal digital identity — not a generic AI-generated portfolio.

---

## Confirmed Professional Positioning

**Title:** System & Network Engineer | Aspiring Cloud Solutions Architect

**Core competencies to communicate:**
- System administration
- Network engineering
- Cybersecurity
- Cloud technologies (Azure, AWS)
- Infrastructure
- Technical problem solving

---

## Approved Technology Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3.4 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | CSS transitions + IntersectionObserver (Reveal, SpotlightCard, PageTransition, Magnetic, GradientOrbs) — no Framer Motion needed |
| 3D (limited) | Not used (skipped — would not add value) |
| Content | MDX via `@next/mdx` + gray-matter (`content/insights/`) |
| Typography (prose) | `@tailwindcss/typography` |
| Icons | Lucide React |
| Forms | mailto-only (no backend/service) |
| Deployment | Azure Static Web Apps (Free tier — not yet configured) |
| Analytics | Not configured — deferred |
| Testing | CLI-level QA (curl); Playwright deferred |
| Linting/Formatting | Biome |

---

## Complete Site/Page Structure

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, featured work, skills overview, latest insights |
| `/about` | About | Bio, career timeline, engineering philosophy |
| `/expertise` | Expertise | Skill categories, tools, technologies matrix |
| `/experience` | Experience | Work history, roles, responsibilities |
| `/projects` | Projects Index | Filterable grid of projects |
| `/projects/[slug]` | Project Detail | Full project writeup |
| `/insights` | Insights Index | Blog-style listing |
| `/insights/[slug]` | Insight Detail | Full MDX-rendered article |
| `/credentials` | Credentials | Certifications, training, education |
| `/contact` | Contact | Contact form + direct links |
| `/cv` | CV Download | Route → serves PDF |
| `/feed.xml` | RSS Feed | Auto-generated |

---

## Component Architecture

### Layout
```
RootLayout
├── Navbar (sticky, collapses on scroll)
├── PageTransition (Framer Motion AnimatePresence)
│   └── {children}
└── Footer
```

### Component Categories
- `components/layout/` — Navbar, Footer, PageTransition, SectionReveal
- `components/home/` — Hero, FeaturedProjects, SkillsOverview, LatestInsights
- `components/about/` — Bio, Timeline, Philosophy
- `components/expertise/` — SkillCard, SkillCategory, ToolGrid
- `components/projects/` — ProjectCard, ProjectGrid, ProjectFilters, ProjectDetail
- `components/insights/` — PostCard, PostList, MDXComponents
- `components/credentials/` — CertCard, CertGrid
- `components/contact/` — ContactForm, ContactInfo
- `components/ui/` — Button, Card, Badge, Heading, Container, Grid, Link, Tooltip
- `components/three/` — NetworkMesh, CloudParticles (if used)

### Rules
- Server components by default, client only when interactivity required
- Client boundaries pushed as deep as possible
- Data fetching in server components or generateStaticParams

---

## Design Direction

### Visual Identity
- **Dark theme only** — deep navy/charcoal (#0a0e1a)
- **Accent:** Steel blue (#3b82f6), used sparingly
- **Typography:** Inter for body, JetBrains Mono for code/technical labels
- **No:** glowing effects, particle backgrounds, animated gradients, floating elements
- **Texture:** Subtle grid/dot patterns at 2-3% opacity (engineering paper feel)
- **Borders:** 1px low-opacity white for cards/sections
- **Shadows:** Minimal — depth through border contrast

### Design Tokens
```
--color-bg-primary:     #0a0e1a
--color-bg-secondary:   #111827
--color-bg-card:        #1a1f2e
--color-border:         rgba(255,255,255,0.06)
--color-text-primary:   #e5e7eb
--color-text-secondary: #9ca3af
--color-accent:         #3b82f6
--color-accent-muted:   rgba(59,130,246,0.12)
```

---

## Content Requirements

### NO fabricated content. All content is confirmed by Nabin.

**Confirmed content now stored in `lib/content.ts` + `lib/constants.ts`:**
- [x] Professional bio/about text
- [x] Current role (System & Network Engineer, Rolling Plans Pvt. Ltd., July 2026)
- [x] Skills by category (Networking, Systems, Cloud, Cybersecurity, Tools)
- [x] Certifications (AZ-900, AZ-104, Google Cybersecurity, Aviatrix, RH124)
- [x] Professional links (LinkedIn, GitHub, Credly, email)
- [x] Projects (Enterprise Campus Network, Azure Enterprise Infrastructure)

**Still required from Nabin:**
- [ ] Profile photo (drop `profile.jpg`/`profile.png`/`profile.webp`/`me.jpg` into `public/profile/` — the About/Home photo appears automatically)
- [ ] Insight articles / topics to write about (see `content/insights/README.md` + `_template.mdx`)
- [ ] CV/resume PDF (real file replaces placeholder at `public/cv/nabin-dhungana-cv.pdf`)
- [ ] Formal education entry (only professional training/certs are listed now — nothing invented)
- [ ] Any additional projects/experience beyond confirmed list
- [ ] Phone (decided NOT to display)

---

## SEO Requirements

- Unique `<Metadata>` export per page
- Auto-generated sitemap via `app/sitemap.ts`
- Robots.txt via `app/robots.ts`
- JSON-LD structured data (Person, WebSite, Article)
- Canonical URLs on every page
- Open Graph images per page
- Page titles: `<PageName> — Nabin Dhungana`

---

## Accessibility Requirements

- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- Skip-to-content link
- Visible focus rings (`ring-2 ring-accent`)
- WCAG AA color contrast (4.5:1 minimum)
- Respect `prefers-reduced-motion`
- Descriptive alt text on all images
- Full keyboard navigation
- ARIA labels on icon-only buttons
- Logical heading hierarchy (one h1 per page)

---

## Security Requirements

- Security headers via middleware.ts (X-Content-Type-Options, X-Frame-Options, etc.)
- Content-Security-Policy
- Honeypot field on contact form
- No secrets in client bundle
- No user-uploaded content

---

## Performance Requirements

- All pages statically generated (SSG)
- next/image with WebP, sizes, priority/lazy
- next/font self-hosted, display: swap
- Dynamic imports for heavy components
- LCP < 2s, CLS < 0.1, FID < 100ms
- Zero client JS for layout/structure (server components)

---

## Responsive Requirements

| Breakpoint | Target |
|---|---|
| < 640px | Mobile |
| 640–1024px | Tablet |
| 1024px+ | Desktop |

- Mobile-first
- Navbar: hamburger on mobile, horizontal on desktop
- Grid: 1 col → 2 col → 3 col
- Fluid typography with clamp()
- Min 44x44px touch targets
- No horizontal scrolling

---

## Insights/Blog Architecture

- MDX files in `content/insights/` — `lib/insights.ts` (fs + gray-matter) reads frontmatter at build time (server-only).
- Frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `tags`, `featured`.
- **Private files:** any `.mdx` whose name starts with `_` (e.g. `_template.mdx`) is never published — excluded from index, tag filter, sitemap, and direct routes (404). Keep ≥1 private file present so Turbopack's dynamic import glob (`@/content/insights/*.mdx`) stays resolvable even when zero articles are published.
- `app/insights/[slug]/page.tsx`: SSG via `generateStaticParams`, `dynamicParams = false` (unknown slugs → 404), `Article` JSON-LD, sticky table of contents, author card, related-article suggestions, copy-link button, global prose styling (`@tailwindcss/typography` via `@plugin`).
- Index: search + tag filter (client component, `aria-live` count), reading time + excerpt derived automatically.
- Reading time (≈200 wpm) and TOC headings (github-slugger ids matching rehype-slug) are auto-computed.
- Sitemap emits article URLs automatically.
- RSS feed at `/feed.xml` deferred until real articles exist.

---

## Projects Architecture

- MDX files in `content/projects/`
- Frontmatter: title, date, description, technologies, category, status, images
- Filterable grid (networking, cloud, security, devops)
- URL-param filtering (?category=cloud)
- Full detail pages with image gallery

---

## CV Download Requirements

- Static PDF at `/public/cv/nabin-dhungana-cv.pdf`
- `/cv` route redirects with Content-Disposition: attachment
- CV link in navbar, footer, About page, Contact page

---

## Deployment Plan — Target Production Architecture

```
GitHub repository
        ↓  (push / commit to main)
Azure Static Web Apps (Free tier) — automatic build + host
        ↓  (HTTP + HTTPS)
Cloudflare DNS  →  https://nabindhungana.com   /   https://www.nabindhungana.com
```

- **Platform:** Azure Static Web Apps (Free tier) — connected to the GitHub repo,
  auto-builds on every push, includes free HTTPS.
- **Build:** `npm install` + `npm run build` (standard Next.js; the app uses the
  Node runtime, verified portable — see "Phase 7").
- **DNS/CDN:** Cloudflare (free) points the domain at the Azure host; provides the
  public DNS records for `nabindhungana.com` and `www.nabindhungana.com`.
- **Custom domain:** `nabindhungana.com` canonical, `www.nabindhungana.com` supported
  (Cloudflare redirects www → apex).
- **Canonical/metadata domain:** `SITE.url` = `https://nabindhungana.com` (default), and
  is overridable per-environment via `NEXT_PUBLIC_SITE_URL`. No localhost hard-coding.
- **Cost:** $0/month (Azure SWA Free + Cloudflare Free). The only purchased item is the
  domain itself (owner-owned, not purchased in this project).
- **No Azure-specific application dependencies** were introduced — the app is portable
  to any Next.js Node host.

### Deployment prerequisites

- A GitHub **repository** for the code (not created in this project yet — repo is local).
- The **real content** from the owner: CV PDF, profile photo, education details, any
  article topics (all placeholders documented; nothing fabricated).
- A **domain** Nabin owns, e.g. `nabindhungana.com` (not purchased here).

### Required GitHub repository setup

1. Initialize/publish the repo (e.g. `github.com/nabin-dh/nabin-portfolio`), push the
   current code to a `main` branch (`.gitignore` already excludes `node_modules`,
   `.next`, env files; `.env.example` is included).
2. (Recommended) protect `main` with branch protection; enable a repo Secrets/variables
   scope if Azure needs a token (see Azure below).

### Required Azure setup (Azure Static Web Apps, free tier)

1. Create an **Azure Static Web Apps** resource with the Free plan.
2. Connect its deployment source to the GitHub repo + `main` branch.
3. Azure generates a GitHub Actions workflow that builds (`npm run build`) and publishes
   automatically on every push.
4. Under **Custom domains**, add `nabindhungana.com` (and optionally `www.nabindhungana.com`).

### Required DNS setup (Cloudflare)

1. Add `nabindhungana.com` to Cloudflare (free plan) and let Cloudflare manage DNS.
2. Point the apex/`www` to the Azure SWA endpoint exactly as the Azure portal's
   "Custom domains" wizard prescribes (typically a Cloudflare CNAME / edge record to the
   SWA host and the generated `TXT`/verification record for the custom domain).
3. Create an **Apex redirect** (`.host.data` or dynamic redirect) — or a plain redirect
   rule pointing `www.nabindhungana.com` at `https://nabindhungana.com`.
4. Ensure SSL/TLS is set (Cloudflare "Full" mode works with Azure SWA's HTTPS; Azure SWA
   itself issues an HTTPS cert once the domain is validated).

### Custom domain + HTTPS setup

- Choose the **apex (`nabindhungana.com`) as canonical** and redirect `www` to it (or
  register both and pick a primary). The site's `SITE.url`/canonical/sitemap defaults to
  the apex; set `NEXT_PUBLIC_SITE_URL=https://nabindhungana.com` at the host if hosting on
  a preview/non-apex URL during setup.
- HTTPS is provided by Azure SWA (automatic) and/or Cloudflare (its own SSL). Keep
  `Strict-Transport-Security` (already sent) so browsers stick to HTTPS.
- Verify `/sitemap.xml` and `/robots.txt` still emit the final canonical domain after
  deployment.

### Expected maintenance workflow

The owner edits content (articles, profile, projects, CV, photo) directly on GitHub from
any device; every commit auto-deploys. See **MAINTENANCE.md** for the full non-expert
guide. A developer is only needed for structural/design/code changes.

### Backup / rollback strategy

- **Backup = the Git repository.** Every version of every file is in Git history; the
  repo (possess a local clone) is the backup.
- **Rollback** = use GitHub's file "History → Restore" (MAINTENANCE.md §14) for a single
  file, or revert a commit. Azure redeploys the restored version automatically.
- A failed deployment **never takes the live site down** — the last good build stays up.

### Cost considerations

- Azure SWA Free tier: $0 (1 free production environment; appropriate for a portfolio).
- Cloudflare Free: $0.
- Domain: ~$10–15/yr (owner). No other recurring costs. No database, backend, analytics,
  or CMS costs — none were added.

### Remaining owner-provided items (before/at launch)

- Real CV PDF → `public/cv/nabin-dhungana-cv.pdf`
- Profile photo → `public/profile/` (name per MAINTENANCE.md §11)
- Formal education details (only confirmed professional training is shown now — nothing
  fabricated)
- Insight article topics/content (site is ready; Insights shows an empty state)
- Any additional projects/experience beyond the confirmed two
- The domain + GitHub repo ownership

### Post-deployment maintenance checklist

- [ ] Publish repo; connect Azure; verify first auto-deploy turns green
- [ ] Point Cloudflare DNS at Azure; add custom domain(s); validate HTTPS
- [ ] Visit every route on the live domain (all 200) and unknown slugs (404)
- [ ] Confirm `/robots.txt` + `/sitemap.xml` use `https://nabindhungana.com`
- [ ] Verify `/cv` streams the real PDF (attachment header)
- [ ] Verify profile photo appears (About/Home) once added
- [ ] Confirm security headers (6 set + no `X-Powered-By`) on the live host
- [ ] Add real content (articles, CV, photo, education)
- [ ] Lighthouse pass (perf/a11y/SEO) + final CSP decision on the live host
- [ ] Optional later: RSS feed, OG images, privacy-friendly analytics, visual/Git CMS

---

## Development Phases

### Phase 1: Project Foundation ✅ CURRENT
- Initialize Next.js 15 + TypeScript
- Configure Tailwind CSS v4
- Configure Biome
- Set up fonts (Inter + JetBrains Mono)
- Create folder structure
- Create foundational files (layout, globals, constants, metadata)
- Create UI primitive components
- Create layout components (Navbar, Footer)
- Create root layout and home page skeleton
- Validate build

### Phase 2: Core Pages
- Home page (Hero, featured sections)
- About page (Bio, timeline)
- Expertise page (Skills grid)
- Experience page (Work history)
- Contact page (Form + info)
- CV download route

### Phase 3: Content System
- MDX setup for insights and projects
- Content schemas/frontmatter types
- Insights index + detail pages
- Projects index + detail pages
- Project filtering
- RSS feed generation

### Phase 4: Content Population
- All real content provided by Nabin
- All images and assets
- CV PDF
- SEO metadata per page

### Phase 5: Animation & Interaction ✅ COMPLETE
- Page transitions (PageTransition)
- Scroll reveals (Reveal + IntersectionObserver)
- Hover effects (SpotlightCard, ProjectCard, Magnetic)
- Reduced-motion support (CSS + JS guards)
- Added in Phase 6: GradientOrbs ambient orbs, PageHeader orbs

### Phase 6: 3D/Visual (if approved) ✅ COMPLETE (visual only — 3D skipped as not valuable)
- Premium UI/UX refinements (see Completed Items)
- Insights/MDX publishing system
- ORGs/identity polish, performance footprint kept lean
- Performance testing → deferred to Phase 8 (Lighthouse)

### Phase 7: Remote Content Management + Deployment Readiness ✅ COMPLETE (2026-09-02)
- Deployment-portability hardening (SITE_URL env, .env.example, poweredByHeader, dynamicParams consistency, README)
- Full insights article lifecycle documented (create/edit/delete/tags/dates/images/related)
- Remote-editing + headless-CMS compatibility documented (nothing installed)
- Localhost/dev-machine dependency scan (clean)
- See "Phase 7 — Remote Content Management + Deployment Readiness" section below

### Phase 8: Final Architecture + Maintenance Preparation ✅ COMPLETE (2026-09-02)
- MAINTENANCE.md owner's guide created (GitHub-based editing workflow)
- Production architecture finalized: GitHub → Azure SWA Free → Cloudflare DNS → nabindhungana.com
- Final security architecture review + dependency/secret/localhost/asset scans
- PROJECT_PLAN phase-list renumbering (Polish/QA → Phase 9, Deployment → Phase 10)
- See "Phase 8 — Final Architecture + Maintenance" section below

### Phase 9: Polish & QA
- Cross-browser testing
- Mobile testing
- Performance audit (Lighthouse)
- Accessibility audit
- SEO validation
- Security headers verification

### Phase 10: Deployment
- Azure Static Web Apps setup
- GitHub Actions workflow
- Custom domain configuration
- Analytics integration

---

## Testing/QA Checklist

- [x] Build succeeds with zero errors (verified)
- [x] All pages render correctly (verified — all 13 routes 200, unknown slug 404)
- [ ] Responsive on mobile/tablet/desktop (responsive classes in place; browser render test deferred)
- [ ] Keyboard navigation works (aria + Escape-to-close in code; interactive test deferred)
- [x] Focus rings visible (verified — focus-visible styles global + component-level)
- [x] Reduced motion respected (verified — `prefers-reduced-motion` block in globals.css)
- [ ] Lighthouse performance > 90 (deferred — requires browser tooling)
- [ ] Lighthouse accessibility > 90 (deferred — requires browser tooling)
- [ ] Lighthouse SEO > 90 (deferred — requires browser tooling)
- [ ] No console errors (no failing requests observed; static SSG + minimal client JS)
- [ ] Images optimized and loading (no content images yet — favicon + CV only)
- [x] Fonts loading correctly (verified — self-hosted woff2 served 200 via next/font, display: swap)
- [x] CV download works (verified — /cv 200, `Content-Disposition: attachment`)
- [x] Contact form validation works (verified — native `required` + `type="email"`)
- [x] Security headers present (verified — 6 headers; CSP not implemented, see notes)
- [x] Sitemap generates (verified — /sitemap.xml 200; home + pages + projects, insight URLs emitted only when articles exist)
- [x] Robots.txt correct (verified — /robots.txt 200, allow-all + sitemap ref)
- [x] MDX/Insights system validates (verified — temp article rendered prose + TOC + anchor links + Article JSON-LD + GFM lists/code blocks; then removed)
- [x] Empty-insights build validates (verified — zero published posts still builds; `/insights/[slug]` SSG with no prerendered children; `/insights` shows elegant empty state; `_template.mdx` private → excluded everywhere + 404 on direct route)
- [x] Dynamic-route 404s (verified — /insights/nonexistent, /projects/nonexistent, /insights/_build-test all 404)
- [x] Deployment-portability scan (verified — zero localhost/dev-machine/OmniRoute/OpenCode refs; no required env vars; `SITE.url` env-overridable with fallback; `.env.example` present; `/projects/[slug]` `dynamicParams = false`)
- [x] `X-Powered-By` suppressed (`poweredByHeader: false`, verified via curl)

---

## Current Project Status

**Phase:** 8 — Final Architecture + Maintenance Preparation
**Status:** ✅ COMPLETE — production architecture finalized (`GitHub → Azure SWA Free → Cloudflare DNS → nabindhungana.com`), a non-expert **MAINTENANCE.md** guide created, a final security architecture review completed, and the repo scanned clean for localhost/dev-machine references, secrets, and asset-path problems. All validation green: lint, typecheck, production build, all route checks, security headers, dependency/secret/asset scans. **Nothing has been deployed and no CMS/backend/database was added.** Remaining is the owner's content + the actual Phase 9/10 provisioning (deployment).

**Environment:** Next.js 16.3.4 (Turbopack), React 19.2.8, TypeScript 5, Tailwind CSS v4 (typography plugin), @next/mdx + gray-matter. Production output: standard Node runtime (`next start`), container-agnostic, portable to Azure SWA / Vercel / Netlify / App Service.

**Pending from Nabin:** real CV PDF, profile photo, formal education info, insight article topics/content, Git remote + hosting wiring, live-domain env value. Remaining code work before launch: Phase 9 QA (Lighthouse, cross-browser/mobile, live CSP/headers check).

**Final validation (2026-09-02, re-run after docs):** lint clean (49 files), typecheck clean, production build green (16 routes), all 16 routes verified via `curl --max-time 10` — 13× 200 (incl `/cv`) and 3× 404 (unknown slugs) — 6 security headers verified (no `X-Powered-By`), `/cv` attachment + cache headers verified, dependency/secret/localhost/asset scans clean, README linked to MAINTENANCE.md. No deploy, no new phase started.

---

## Completed Items

- [x] Architecture proposal and approval
- [x] PROJECT_PLAN.md created
- [x] Initialize Next.js 16 project (Turbopack) + TypeScript
- [x] Configure Tailwind CSS v4 (design tokens in globals.css)
- [x] Configure Biome (lint + format, replaces ESLint/Prettier)
- [x] Set up fonts (Inter + JetBrains Mono via next/font, display: swap)
- [x] Create folder structure (components, lib, content, public subdirs)
- [x] Create globals.css with design tokens + reduced-motion support
- [x] Create lib/constants.ts (site identity, nav links, CV path)
- [x] Create lib/utils.ts (cn helper)
- [x] Create UI primitives: Button, Badge, Card, Heading, Container, Link
- [x] Create layout components: Navbar (responsive + mobile menu), Footer
- [x] Create root layout (skip-link, fonts, metadata, a11y)
- [x] Create home page skeleton (positioning only, no fabricated content)
- [x] Set up CV download as static asset path (public/cv/)
- [x] Validate: lint pass, typecheck pass, production build pass, dev server 200
- [x] Store confirmed profile data in lib/constants.ts + lib/content.ts
- [x] Build Home page (Hero + featured skills/projects/credentials, CV button in hero)
- [x] Build About page (bio, career direction, CV button, contact sidebar)
- [x] Build Expertise page (skills grid by category)
- [x] Build Experience page (confirmed Rolling Plans role timeline)
- [x] Build Contact page (mailto contact form + direct channels + CV button)
- [x] Create CV download path + placeholder PDF (no fabricated CV)
- [x] Update Footer with confirmed social links
- [x] Add per-page metadata, sitemap.ts, robots.ts, JSON-LD Person schema
- [x] Replace removed lucide brand icons with custom inline SVGs (GithubIcon/LinkedinIcon)
- [x] Validate Phase 2: lint pass, typecheck pass, build pass, all routes 200
- [x] Apply expertise content correction (removed vendor names from core skills)
- [x] Add slug/category to Project data model (+ overview derived from confirmed data)
- [x] Build Projects index page (app/projects/)
- [x] Build project detail pages (app/projects/[slug]/) with metadata + generateStaticParams
- [x] Build Insights content layer (lib/insights.ts, empty, no fabricated articles)
- [x] Build Insights index page with empty state
- [x] Build Credentials page (previously missing nav target)
- [x] Add project detail routes to sitemap
- [x] Update Home featured projects to link to detail pages
- [x] Validate Phase 3: lint pass, typecheck pass, build pass, all routes 200
- [x] Implement `/cv` route handler (serves PDF with `Content-Disposition: attachment`, returns 404 if missing)
- [x] Point all CV links (navbar, footer, About, Contact, Hero) to `/cv`; drop redundant `download` attrs
- [x] Add engineering grid texture utilities (`bg-grid`, `mask-fade-b`) + `scroll-padding-top` for sticky nav
- [x] Navbar: active-link state via `usePathname` + `aria-current`, `aria-controls`, Escape-to-close
- [x] Footer: CV link, email link, nav links column, refined layout
- [x] PageHeader: grid texture background, refined spacing/type scale
- [x] Home hero: two-column layout with technical "profile" panel (desktop), grid texture
- [x] Home sections: numerate skill cards, replace inline project cards with ProjectCard
- [x] About: sticky sidebar card, FOCUS_AREAS constant
- [x] Expertise: per-category icons (Network/Server/Cloud/ShieldCheck), hover borders
- [x] Experience: refined timeline markers (accent dot + ring)
- [x] Credentials: refined cards with hover states
- [x] Projects detail: breadcrumb back link (`/projects`), cleaner footer buttons
- [x] Insights: remove placeholder `-` list item, proper empty state with icon
- [x] Contact: fix email channel icon (was rendering nothing), icon map for all channels
- [x] ContactForm: explicit focus-visible outline on all inputs/textarea
- [x] SEO: `alternates.canonical` on every page; WebSite JSON-LD; keywords/authors metadata
- [x] Remove unused components (Badge, Heading) and dead placeholder dirs (content/, public/images subdirs)
- [x] Validate Phase 4: lint pass, typecheck pass, build pass, all routes 200, CV download headers verified
- [x] Phase 5 QA run (2026-09-02): lint/typecheck/build pass, all 13 routes 200 + 404 handling, CV attachment headers, security headers (6/6, CSP gap noted), sitemap + robots verified, fonts self-hosted OK, a11y code-level checks — see QA Notes
- [x] Phase 6 — MDX/Insights system: next.config.ts createMDX (remark-frontmatter, remark-mdx-frontmatter, remark-gfm, rehype-slug; pageExtensions incl md/mdx), root mdx-components.tsx (h2/h3 `#` anchors, external-link handling), `@tailwindcss/typography` via `@plugin`, full `lib/insights.ts` loader (gray-matter, reading time, TOC via github-slugger, related), insight index (search + tag filter + empty state), insight detail (SSG, `dynamicParams = false`, Article JSON-LD, sticky TOC, author card, related, copy-link), content/insights README + `_template.mdx` (private file keeps the dynamic import glob resolvable at zero published posts)
- [x] Phase 6 — Premium FX: Reveal (IntersectionObserver + reduced-motion fallback), SpotlightCard (pointer spotlight), GradientOrbs (stylized ambient orbs + orb-drift keyframes), PageTransition (keyed fade in main), Magnetic (hero CTA), ProjectCard group-hover micro-interactions; all FX disabled under `prefers-reduced-motion`
- [x] Phase 6 — Page rewrites: Home (hero profile panel + orbs, skills, domains, featured projects, approach, latest insight w/ empty state, credentials), About (overview, career direction, domains, approach, education/training, sticky sidebar + conditional ProfilePhoto), Expertise (domain sections w/ icons + core skills), Experience (employment + technical domains), Projects index (ProjectFilters), Project detail (overview/tech/repo/related), Contact (form, channels, open-to topics, CV), Credentials (certs + education/training)
- [x] Phase 6 — lib/content.ts: DOMAINS (5), EDUCATION (professional training/certs only — real), ENGINEERING_APPROACH (4), EXPERIENCE_DOMAINS (4); ProfilePhoto (fs existence check, statically scoped — resolves Turbopack dynamic-fs warning; drop-in at public/profile/)
- [x] Phase 6 — sitemap now emits `/insights/*` URLs from getAllInsights()
- [x] Phase 6 — final validation (2026-09-02): lint 49 files clean, typecheck clean, build green (16 static routes, `/insights/[slug]` SSG w/ zero prerendered children), all 18 CLI route checks pass (13× 200 incl /cv, 5× 404 incl /insights/_template, /insights/_build-test, unknown slugs), sitemap has `/insights` index + zero article URLs, 6 security headers verified, CV headers verified, empty-state page verified (no `_template` leakage)
- [x] Phase 7 — portability hardening: `SITE.url` now reads `NEXT_PUBLIC_SITE_URL` (fallback `https://nabindhungana.com`); `.env.example` added + `.gitignore` allows it; `poweredByHeader: false`; `dynamicParams = false` added to `/projects/[slug]` (matches insights); stale boilerplate README replaced with accurate stack/content/deployment docs
- [x] Phase 7 — dependency scan: zero references to localhost, 127.0.0.1, machine paths, OmniRoute, OpenCode, or the dev machine anywhere in source (app/components/lib/content/public; verified by ripgrep-style scan)
- [x] Phase 7 — docs: `content/insights/README.md` extended with full article lifecycle (create/edit/delete/tags/dates/images/related), remote Git-editing path, and headless-CMS compatibility (adapter point = `lib/insights.ts`); PROJECT_PLAN.md architecture/hosting reference added
- [x] Phase 7 — final validation (2026-09-02): lint clean, typecheck clean, production build green, CLI route checks re-affirmed, localhost scan clean; no deploy performed
- [x] Phase 8 — MAINTENANCE.md created: non-expert GitHub-based editing guide covering all 16 topics (add/edit/delete articles; tags/date/title; images; profile; experience; expertise; projects; CV; profile photo; GitHub→live flow; what needs a rebuild; rollback; deployment-failure recovery; never-commit secrets), plus a quick-reference table
- [x] Phase 8 — production architecture finalized and documented in PROJECT_PLAN.md: GitHub → Azure SWA Free → Cloudflare DNS → nabindhungana.com (www redirect); deployment prerequisites, GitHub/Azure/DNS/custom-domain+HTTPS setup, maintenance workflow, backup/rollback, costs, owner items, post-deploy checklist
- [x] Phase 8 — final security review (appropriate for a static portfolio): 6 security headers verified (no X-Powered-By), HSTS + nosniff + X-Frame-Options SAMEORIGIN; `dangerouslySetInnerHTML` limited to static trusted JSON-LD; no user-submitted content (owner-authored MDX only); `mailto:` contact (no server form endpoint = no bot/spam/false-submission surface); no eval/document.write; clean secret scan; no production-browser source maps; external links `rel="noopener noreferrer"`; CSP decision documented (deferred to live host — see notes)
- [x] Phase 8 — final validation (2026-09-02): lint clean, typecheck clean, production build green (16 routes), all 16 route checks pass (13× 200 incl /cv, 3× 404), security headers verified, dependency/secret/localhost/asset-path scans clean, CV serves with attachment + cache headers, robots/sitemap emit canonical domain, profile placeholder documented. Re-run (2026-09-02, post-JSON) with `curl --max-time 10` per route — all 16 pass; README now links MAINTENANCE.md; hang-free (Invoke-WebRequest avoided)

---

## Remaining Items

### Phase 3 completed
Phase 3 (Content System) is complete. See Completed Items above.

### Phase 4: Content Population ✅ COMPLETE (code) — real assets pending Nabin
- [x] Replace temporary CV placeholder with proper CV handling pathway (`/cv` route handler, `Content-Disposition: attachment`)
- [x] Insights system fully built (index + detail + filters + MDX pipeline) — publishes only Nabin's real articles
- [ ] Real CV PDF replaces placeholder (public/cv/nabin-dhungana-cv.pdf) — still pending Nabin's real file
- [ ] Profile photo (drop `profile.jpg|png|webp|me.jpg` into `public/profile/` — ProfilePhoto renders it automatically)
- [ ] Formal education entry (only professional training/certs currently — do NOT fabricate)
- [x] Insight article topics/guidance (see `content/insights/README.md` + `_template.mdx`)
- [ ] RSS feed generation (deferred until insights exist)
- [ ] Additional projects/experience beyond confirmed list
- [ ] Open Graph images per page (once real assets exist)

### Phase 5: Animation & Interaction ✅ COMPLETE
- Page transitions, scroll reveals, hover effects, reduced-motion — done (Phase 6; see notes)

### Phase 6: 3D/Visual ✅ COMPLETE
- 3D element skipped (not valuable); premium visual + Insights/MDX work landed
- Performance testing → deferred to Phase 8 (Lighthouse)

### Phase 7: Remote Content Management + Deployment Readiness ✅ COMPLETE
- Deployment-portability hardening + documentation (see "Phase 7" section and Completed Items)

### Phase 8: Polish & QA
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit
- [ ] SEO validation
- [ ] Security headers verification

### Phase 9: Deployment
- [ ] Azure Static Web Apps setup
- [ ] GitHub Actions workflow
- [ ] Custom domain configuration
- [ ] Analytics integration

---

## Phase 7 — Remote Content Management + Deployment Readiness (2026-09-02)

> This section is the living architecture reference for content editing and hosting.
> Update it whenever the architecture or workflow changes.

### 1. Current architecture

```
Git repository  ── build (npm run build) ──▶  self-contained next start server
      │                                           (continuous deploy on push)
      ├─ app/          routes, layout, sitemap, robots, /cv route handler
      ├─ components/   UI (server components by default, client islands for FX/filters)
      ├─ lib/          typed content layer (constants.ts, content.ts, insights.ts)
      ├─ content/insights/  article source (MDX + YAML frontmatter)
      └─ public/       cv PDF, optional profile photo, future insight images
```

- **Rendering:** nearly everything is statically generated at build time. `/` through
  `/credentials`, `/insights`, `/projects` and both detail routes are SSG;
  `/insights/[slug]` and `/projects/[slug]` use `generateStaticParams` +
  `dynamicParams = false` (unknown slugs return 404). The only dynamic route is
  `/cv`, a route handler that streams the PDF from `public/`.
- **Content vs UI:** profile data, projects, experience, expertise, education, and
  credentials live in typed TS data (`lib/constants.ts`, `lib/content.ts`) — no
  markup. Articles live as MDX in `content/insights/`. The only adapter between
  content and the app is `lib/insights.ts`.
- **Build-time generated:** sitemap (incl. article URLs), robots.txt, JSON-LD
  (Person/WebSite/Article), OG metadata, security headers, fonts (self-hosted).
- **No backend, no database, no authentication.** Contact stays a `mailto:` form.
  No reaction/voting UI exists — a useful/not-useful feature would be added only with
  a real persistence strategy, never faked.

### 2. How content is edited now

All edits are plain file edits in the repository, followed by a deploy-triggering commit:

| What | Where | How |
|---|---|---|
| Insigh articles | `content/insights/<slug>.mdx` | Edit frontmatter + Markdown body; see `content/insights/README.md` for the full lifecycle (create/edit/delete/tags/dates/images/related) |
| Bio, role, headline, email, socials | `lib/constants.ts` | Edit the `SITE` object |
| Nav links | `lib/constants.ts` — `NAV_LINKS` | Edit array |
| Domains, education, approach, tech experience | `lib/content.ts` | Edit `DOMAINS`, `EDUCATION`, `ENGINEERING_APPROACH`, `EXPERIENCE_DOMAINS` |
| Projects | `lib/content.ts` — `PROJECTS` | Edit or append a typed entry |
| Expertise skills | `lib/content.ts` — `SKILL_CATEGORIES` | Edit entries |
| CV PDF | `public/cv/nabin-dhungana-cv.pdf` | Replace the file (keep the same filename) |
| Profile photo | `public/profile/profile.jpg|png|webp` (or `me.jpg`) | Add the file; appears automatically after deploy rebuild |
| Site domain | `.env.example` / host env `NEXT_PUBLIC_SITE_URL` | Optional; defaults to `https://nabindhungana.com` |

After the commit/push, the connected host rebuilds; no local machine or manual server
action is needed.

### 3. Recommended future remote-editing workflow

Phase 7 deliberately installs **nothing**. The architecture is already compatible with
two remote-editing paths; pick one later:

- **A. Git-based web editor (zero new infra, recommended first):** the owner edits
  files from any device through GitHub's web editor, GitHub Codespaces, or a mobile Git
  client (clone → edit → commit → push). The connected deployment rebuilds automatically.
  Works entirely on phone/tablet/laptop.
- **B. Lightweight headless/Git-based CMS (only if the owner wants a visual editor or
  non-technical authors):** a CMS that stores markdown/frontmatter and syncs to the repo,
  or commits generated `.mdx` files into `content/insights/`. No app changes required —
  `lib/insights.ts` is the single adapter point and already reads plain files at build.

Do **not** add a database-backed admin panel, auth, or CRUD backend — it adds security
surface and cost with no benefit for this portfolio.

### 4. Deployment architecture

**Target: Azure Static Web Apps (free tier) with its hybrid/Next.js runtime — or any
platform that runs `next build` + `next start` (Vercel, Netlify, Azure App Service,
Azure Container Apps).** The app uses the standard Next.js Node output: `npm install`,
`npm run build`, then serve the `.next` production build. Deployment is **continuous and
repo-driven** — whatever connects the Git remote to the host rebuilds on every push.

Portability review results (all verified for the current codebase):

| Aspect | Status | Notes |
|---|---|---|
| `next.config.ts` | ✅ portable | MDX plugins as strings (Turbopack-safe), `poweredByHeader: false`, headers are host-agnostic middleware config |
| Env vars | ✅ none required | `NEXT_PUBLIC_SITE_URL` optional per-domain override with `https://nabindhungana.com` fallback; `.env.example` documents it; `.gitignore` permits `.env.example` |
| Asset paths | ✅ portable | Everything under `public/`, referenced by absolute paths, no `localhost`/machine paths |
| Sitemap / robots / metadata | ✅ portable | Canonical domain from `SITE.url` (env-overridable); `metadataBase` set; article URLs emitted at build |
| CV delivery | ✅ portable | `/cv` streams `public/cv/nabin-dhungana-cv.pdf` with `Content-Disposition: attachment` + `Cache-Control: public, max-age=3600` + 404 when missing |
| Image handling | ✅ portable | Local-only images (no remote clouds, no `images.remotePatterns`); next/image optimized from `public/` |
| MDX generation | ✅ portable | Build-time fs reads of `content/insights/`, no runtime dependency |
| Dynamic routes | ✅ portable | SSG + `dynamicParams = false` → unknown slugs 404; no on-demand runtime generation needed |
| Security headers | ✅ portable | 6 headers via `next.config.ts`; **CSP still a deliberate gap** — revisit before/at launch (Phase 8) |
| Caching | ✅ portable | SSG pages + Next static asset caching; `/cv` explicit `Cache-Control`; no CDN-specific config |
| Build behavior | ✅ portable | `next build` verified green; self-contained output |

**Deliberate tradeoff:** static HTML export (`output: "export"`) is *not* used. The `/cv`
route handler (attachment streaming + 404) and header/route handler support need the Node
runtime. All target hosts listed above support it natively; no architectural change is
required to host.

### 5. What can/cannot be edited from another device

**Can edit from any device via Git (no dev machine, OmniRoute, or OpenCode needed):**
- Insight articles (create/edit/delete/tags/dates/images/related) — plain MDX files
- All profile data, projects, experience, expertise, education, credentials, skills
- CV PDF and profile photo (swap files under `public/`)
- Socials/email/nav/domain URL

**Requires a developer (code change) — not content edits:**
- New pages, routes, layout/design changes, animations, route handlers
- Changing the data schema (e.g. adding a new field to projects) — needs a small
  `lib/*.ts` + page update
- Domain/DNS/TLS and any host env settings — configured at the hosting platform, not in code

**Explicitly not built (by design):**
- No database, auth, or admin dashboard
- No contact-submission storage (contact remains `mailto:`)
- No reaction/vote persistence — if a useful/not-useful feature is added later it gets a
  real persistence strategy (e.g. a tiny serverless store), never fake local votes

### 6. Remaining work before public deployment

1. **Repo + host wiring (owner):** publish the Git remote (GitHub), connect the host
   (Azure SWA recommended), set `NEXT_PUBLIC_SITE_URL` to the final domain.
2. **Real content (owner):** real CV PDF, profile photo, formal education details,
   article topics/posts. Placeholders are documented, nothing fabricated.
3. **Phase 8 QA (developer):** cross-browser/mobile interactive pass, Lighthouse
   (perf/a11y/SEO), CSP decision, final security-header check on the live host.
4. **Post-launch optional:** RSS feed, OG images, analytics (privacy-friendly), a
   visual/Git CMS only if the owner wants one.

## Phase 6 Notes & Decisions (2026-09-02)

- **Insights became a real MDX system.** `lib/content.ts`'s typed layer still drives pages, but insights now use true MDX (`@next/mdx`) with gray-matter for metadata — the original Phase 3 decision ("typed layer, no MDX") was reversed because long-form articles need rich rendering and the MDX pipeline adds no friction once configured. Projects remain typed/structured (no long-form prose).
- **Turbopack dynamic-import glob needs a file to resolve.** With zero `.mdx` articles, the `await import(\`@/content/insights/${slug}.mdx\`)` glob cannot compile and the build fails. Solution: a **private `_template.mdx`** whose name guarantees it is never published. `lib/insights.ts` filters underscore-prefixed files from every consumer (index, tags, sitemap, slugs, direct route). The pattern is applied in 3 places (readInsightFile, readAllInsights, getInsightBySlug) — document if changed.
- **`dynamicParams = false`** on the insight detail page: any slug not in `generateStaticParams` → 404 (matches docs pattern and the "keep 404 default" rule; a branded not-found page was deliberately skipped).
- **MDX plugins as strings** (not function imports) in `next.config.ts` — Turbopack-compatible. `remark-mdx-frontmatter` strips YAML frontmatter into the compiled module, so body prose never leaks frontmatter.
- **TOC ids match rehype-slug** because `lib/insights.ts` uses the same `github-slugger` algorithm when extracting `##`/`###` headings.
- **Prose styling** via `@tailwindcss/typography` activated with `@plugin "@tailwindcss/typography"` in `globals.css` (Tailwind v4 syntax); `mdx-components.tsx` overrides h2/h3 (anchor links) and external `a` (target=_blank + noopener).
- **ProfilePhoto drop-in readiness:** server component statically scopes to `public/profile/{profile.jpg|profile.png|profile.webp|me.jpg}`; returns null when absent. Fixes the Turbopack "dynamic filesystem access traces whole project" warning.
- **No interfered content:** no article was shipped. The site builds a polished "No insights published yet" empty state. `_build-test.mdx` (temp validation article) was created for a pipeline proof, verified serving (markdown→prose→TOC→JSON-LD), then deleted.
- **New dependencies:** runtime — `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `gray-matter`, `remark-frontmatter`, `remark-mdx-frontmatter`, `remark-gfm`, `rehype-slug`, `github-slugger`; dev — `@tailwindcss/typography`. `npm install` reported 0 vulnerabilities.
- **FX kept dependency-free:** Reveal/Spotlight/PageTransition/Magnetic use CSS + IntersectionObserver, GradientOrbs pure CSS keyframes. All are inert under `prefers-reduced-motion` and when IntersectionObserver is unavailable.
- **Verification quirks:** `npm run start` spawned via `cmd`/`node` inherits the caller's stdio and makes the shell tool hang until timeout (which then kills the tree). Detached server was started via WMI `Win32_Process.Create` (no handle inheritance) for clean route checks.

## Phase 8 — Final Architecture + Maintenance (2026-09-02)

### Security architecture review (static portfolio — appropriately scoped, not over-engineered)

| Area | Status | Notes |
|---|---|---|
| CSP | Documented gap (deferred) | Next.js injects inline RSC payloads + inline bootstrap scripts whose hashes change per build; a strict CSP needs builder/portal-side nonce/hash support and risks breaking the site. Owner-only static content, no third-party scripts/analytics, and no server-side form make this low-risk. **Decision: enable a conservative CSP at the live host (Azure SWA response headers or Cloudflare) after Phase 9 testing**, where nonces can be managed. |
| Security headers | ✅ 6 verified | nosniff, Referrer-Policy, X-Frame-Options SAMEORIGIN, Permissions-Policy, HSTS (2y), X-DNS-Prefetch; `X-Powered-By` suppressed. |
| XSS | ✅ Low risk | No user-submitted content; all content is owner-authored MDX/files compiled at build time (no runtime strings from visitors). `dangerouslySetInnerHTML` appears only twice (JSON-LD) from static trusted constants, with `biome-ignore` justification. |
| Unsafe HTML/MDX | ✅ Owner-only input | MDX authored by the owner via Git; no visitor-controlled HTML reaches the renderer. External `<a>` are forced `noopener noreferrer` + new tab. |
| External links | ✅ | `rel="noopener noreferrer"` on all external anchors (mdx-components + footer/socials). |
| Forms | ✅ No attack surface | Contact is a `mailto:` client component — no server endpoint, no storage, no bot-farming target, no injection into a backend. |
| Secrets | ✅ Clean | Dedicated scan returned zero matches; `.gitignore` excludes `.env*` (allows `.env.example`); no `process.env` secret usage in code; only public data (name/email/projects) is in the repo by design. |
| Dependency exposure | ✅ | `poweredByHeader: false`; no production browser source maps configured; deps install showed 0 vulnerabilities earlier; runtime deps are minimal/SSG. |
| Source maps | ✅ None emitted | `productionBrowserSourceMaps` not enabled — no client source map exposure. |
| Unnecessary APIs | ✅ None | No backend, no API routes, no auth, no analytics, no CMS integration installed. Sole route handler is `/cv` (static asset streaming). |
| Contact abuse/spam | ✅ Minimal | mailto form can't be spammed server-side (opens the visitor's own email client); the spam burden is the email account's normal filtering. No honeypot needed (no real submission endpoint). |

**Privacy / legal / professional:** privacy-conscious (mailto only, no visitor-data capture), no fabricated testimonials or claims, no copyrighted third-party material, image-attribution mechanism documented (MAINTENANCE.md §5 — only use images you own or have rights to), no cookie banners/analytics/tracking added.

### Dependency portability verification (this phase)

- No `localhost`, `127.0.0.1:3000`, machine paths, OmniRoute, or OpenCode references in app code (exact scan; the lone doc mention in `content/insights/README.md` is instructional text telling owners they don't need them).
- All assets under `public/` served by absolute paths; CV and profile placeholders documented; robots/sitemap/canonical/metadata use `SITE.url` (env-overridable, defaults to `https://nabindhungana.com`), never localhost.

### Key decisions

- **Owner-editing = Git only, no admin dashboard.** Matches "professional portfolio, not a frequently changing app." GitHub web editing from any device.
- **Domain duality:** canonical apex `nabindhungana.com`, `www.nabindhungana.com` redirected to apex via Cloudflare. Domain handled at host/DNS level only — no code required.
- **Keep it static + portable:** no Azure-specific app code; any Node Next.js host works if Nabin prefers a different free host.

## Phase 7 Notes & Decisions (2026-09-02)

- **No new dependencies, no backend, no deploy.** This phase was pure hardening + documentation. The site remains fully static/SSG with a single dynamic `/cv` route handler.
- **SITE_URL env:** `lib/constants.ts` computes `SITE.url` from `NEXT_PUBLIC_SITE_URL`, falling back to `https://nabindhungana.com`. This keeps preview/staging/custom-domain builds correct without code edits. No other env vars exist; `.env.example` documents it and `.gitignore` now allows `.env.example` through the blanket `.env*` ignore. The env var is optional — the build does not require it.
- **`dynamicParams = false` added to `/projects/[slug]`** for parity with insights — deterministic 404s for any unknown slug regardless of host/environment.
- **`poweredByHeader: false`** removes the `X-Powered-By` header (minor info-disclosure reduction; consistent with suppressing other server headers).
- **README replaced:** the create-next-app boilerplate (Vercel/Geist references that matched neither the stack nor repo) was replaced with accurate stack/commands/layout/content/deployment docs.
- **Static export (`output: "export"`) deliberately NOT used.** The `/cv` route handler (attachment streaming + 404) and route-handler/header support need the Next.js Node runtime. Target hosts (Azure SWA runtime, Vercel, Netlify, App Service, Container Apps) all support it — no re-architecture needed.
- **Git-based editing is the recommended future remote workflow** (GitHub web editor/Codespaces/mobile Git client) — zero new infra, works from any device, and stays compatible with a future lightweight headless CMS. A DB/auth/admin dashboard was explicitly excluded as unnecessary complexity/security risk for a portfolio.

## Phase 5 QA Verification Notes (2026-09-02)

- Fresh QA run after killing a stale, idle node process (15h+, no listener) and confirming no production server was left running (port 3000 free). The two active `node` processes were `omniroute` (external dev tool), left untouched.
- **Lint:** `npx biome check .` → 35 files checked, no issues.
- **Typecheck:** `npx tsc --noEmit` → clean.
- **Build:** `npm run build` → success. 13 static routes (incl. 2 SSG project details), 1 dynamic route (`/cv`), plus `robots.txt` + `sitemap.xml`. Zero errors.
- **Routes:** Home, /about, /contact, /credentials, /cv, /experience, /expertise, /insights, /projects, both project detail pages, /sitemap.xml, /robots.txt → all **200**. Unknown path → **404**. Verified with `curl --max-time` (PowerShell `Invoke-WebRequest` hangs on this machine — that was the QA-stuck symptom, not a server fault).
- **CV:** `/cv` returns 200 with `Content-Disposition: attachment; filename="Nabin-Dhungana-CV.pdf"` and `Content-Type: application/pdf`. Placeholder PDF present (773 bytes, to be replaced by Nabin's real CV).
- **Security headers:** All 6 from `next.config.ts` present on every page (X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, X-Frame-Options SAMEORIGIN, Permissions-Policy, HSTS, X-DNS-Prefetch-Control). **Content-Security-Policy is not implemented** — noted as a gap; deferred (Next inline RSC payload + JSON-LD make CSP a non-trivial change).
- **Sitemap:** 10 URLs (home + 7 static + 2 projects), canonical domain, lastmod set. **Robots:** Allow all + sitemap ref.
- **Fonts:** Inter + JetBrains Mono served self-hosted via `next/font` (woff2 → 200, `display: swap`).
- **A11y code-level checks:** skip-to-content link, semantic nav/main, `aria-current` nav state, `aria-controls` + Escape-to-close on mobile menu, visible `:focus-visible` rings (global + contact inputs), `prefers-reduced-motion` block present.
- **Contact form:** native `required` + `type="email"` + `autoComplete` validated — opens mailto.
- **Cannot verify from CLI without browser tooling:** real responsive/visual rendering, interactive keyboard nav, Lighthouse scores (>90 each), console-error absence, image optimization (no content images exist yet). Playwright is not installed and is not in `devDependencies` — deferring these to a browser-based pass (Phase 7).
- No source changes were required — all checks passed against the codebase as-is.

---

## Phase 1 Notes & Decisions

- **Version drift:** create-next-app installed Next.js **16.3.4** (not 15 as originally proposed). Feature set is a superset; App Router conventions remain consistent. The approved architecture is fully compatible.
- **ESLint removed** in favor of Biome per the approved stack (`biome check .`).
- **Biome reduced-motion `!important`:** Intentionally kept (standard WCAG practice); disabled `noImportantStyles` for CSS files via override.
- **Default create-next-app SVG assets removed** from public/ (unused, triggered a11y lint).
- **CV download:** Implemented as a static asset link (`/cv/nabin-dhungana-cv.pdf`) — simplest and static-export-compatible for Azure SWA. A `/cv` route handler for download tracking is deferred until the PDF exists and tracking is needed.
- **No fabricated content:** Home page contains only the confirmed professional positioning + a "content pending" note.

---

## Phase 2 Notes & Decisions

- **Confirmed source of truth:** Real profile data for Nabin (bio, role at Rolling Plans Pvt. Ltd. July 2026, skills, certs, projects, links) was provided by the user and is stored in `lib/content.ts` and `lib/constants.ts`.
- **Contact form:** Implemented as a `mailto:` client component (no backend/service added, per "no unnecessary backend services"). Resend/API integration deferred until a production server backend is needed.
- **CV pathway:** Real PDF not provided. A clearly-labeled **placeholder PDF** was created at `public/cv/nabin-dhungana-cv.pdf` so the download pathway works and no link 404s. It must be replaced with Nabin's real CV. No fabricated CV content.
- **Lucide brand icons removed:** The installed lucide-react (v1.38.0) no longer exports `Github`/`Linkedin`. Replaced with custom inline SVGs in `components/ui/brand-icons.tsx` (`GithubIcon`, `LinkedinIcon`).
- **JSON-LD:** Person schema added to root layout; Biome `noDangerouslySetInnerHtml` suppressed with a `biome-ignore` comment (static, trusted data).
- **Stats/fake counters avoided:** No fabricated statistics or counters anywhere. Per confirmed data only.
- **Projects not yet built as pages:** The Projects index/detail pages are deferred to Phase 3 (as instructed). The 2 confirmed projects appear on Home only.
- **Positioning honored:** Nabin presented as a working infrastructure professional (System & Network Engineer). No student/intern/fellow-teacher emphasis; no invented years of experience.

---

## Phase 3 Notes & Decisions

- **Expertise content correction (per client):** Removed vendor/product names (MikroTik, Cisco, Git, GitHub, Ekahau AI Pro, NetSpot, OSPF/HSRP/etc.) from core expertise skills. Expertise is now professionally grouped and general (Network Administration, TCP/IP & IP Addressing, Routing & Switching, Network Security, Wireless Networking, System Administration, Windows & Linux, Virtualization, VMware ESXi, Cloud Infrastructure, Microsoft Azure, AWS, Cybersecurity, Infrastructure Troubleshooting). The old "Tools" category was removed.
- **Vendor names still appear where relevant:** In Projects (technologies lists), Certifications (issuer names), and credentials — not as core skill tags.
- **Content model:** Projects and Insights use **typed structured data** (`lib/content.ts`, `lib/insights.ts`) instead of MDX. Rationale: confirmed project content is structured (no long-form prose), zero insight articles exist yet, and MDX would add dependencies (shiki, mdx parser) for no current content. The type layer is equally scalable (add an entry) and can move to MDX later if long-form articles need rich rendering.
- **Insights index:** Built with a graceful empty state. No fabricated articles created. `lib/insights.ts` holds an empty `INSIGHTS` array as the future content slot. Insights detail route + RSS deferred until real articles exist (per "Add RSS only if it fits the architecture without unnecessary dependencies").
- **No project filtering/search:** Only 2 confirmed projects — a filter would add complexity without genuine UX value. Skipped per instruction.
- **Credentials page added:** It was a nav target that previously had no page (Phase 2 built all other nav pages). Created with confirmed certification data.
- **Project detail pages:** Built from confirmed data only (title, description, technologies, repository). No invented metrics, results, or responsibilities.
- **404 handling:** `notFound()` on unknown project slugs (verified returns 404).

---

## Phase 4 Notes & Decisions

- **CV handling pathway (per instruction):** Replaced the plain static-asset link with a proper `/cv` route handler (`app/cv/route.ts`) that reads `public/cv/nabin-dhungana-cv.pdf` and serves it with `Content-Disposition: attachment; filename="Nabin-Dhungana-CV.pdf"` and `Content-Type: application/pdf`. Returns 404 if the file is missing. All CV links (navbar, footer, About, Contact, Hero) now point to `/cv`; the redundant `download` HTML attributes were removed since the header handles it. **The placeholder PDF content was NOT touched** — it remains clearly labeled and will be replaced with Nabin's real CV when provided.
- **Visual/design refinement:** Full pass across all pages for cohesion — engineering grid texture behind hero/page headers, sticky active-nav states with `aria-current`, refined footers/headers, numbered skill cards, sticky about side card, timeline markers, project breadcrumbs, polished empty states, and card hover borders. No new dependencies added; motion stays CSS-only (transitions), matching the approved stack and Phase 5's future Framer Motion scope.
- **Design consistency rules kept:** Dark-only, no glowing/particle effects, monotone accents, one h1 per page, `prefers-reduced-motion` respected (globals), external links securely opened (`rel="noopener noreferrer"`).
- **SEO:** Added `alternates.canonical` to every page (root + 7 static pages + 2 project details), a WebSite JSON-LD schema alongside the Person schema, and `applicationName`/`authors`/`keywords` metadata. Open Graph image files still deferred until real assets (e.g., profile photo) exist — no fabricated OG images.
- **Cleanup:** Removed unused UI primitives (Badge.tsx, Heading.tsx), the empty `content/` placeholder dirs (the typed `lib/content.ts`/`lib/insights.ts` layer replaced MDX), and empty `public/images/*` scaffolding dirs. `public/cv/nabin-dhungana-cv.pdf` is the only real asset location now.
- **Route handler note:** `/cv` is now dynamic (ƒ) rather than a static route — this is by design for the attachment-serving behavior and works in dev/start and on Azure SWA's function-based hosting. Static prerendering is unaffected for all page routes.

---

## Important Decisions and Constraints

1. **No fabricated content** — all personal info, projects, experience, and credentials come from Nabin
2. **No generic portfolio aesthetic** — no glowing gradients, particles, fake stats, or stock layouts
3. **No Architecture/Lab page** — explicitly excluded
4. **Dark theme only** — no light mode toggle
5. **Server components by default** — minimize client JS
6. **MDX for content** — no external CMS
7. **Azure Static Web Apps** — free tier, GitHub-linked deployment
8. **Biome over ESLint+Prettier** — single tool for lint+format
9. **3D usage is optional and must prove its value** — not decorative
10. **CV must be downloadable from multiple locations** (navbar, footer, about, contact)
11. **Expertise stays general/professional** — vendor/product/tool names only appear in Projects, Certifications, or Technologies where relevant, never as core skill tags
12. **No fabricated insight articles** — the Insights system is populated only when Nabin authors real content (underscore-prefixed files are private/build scaffolding, never published).
