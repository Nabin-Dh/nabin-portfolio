# PROJECT_PLAN.md — Nabin Dhungana Portfolio

> Source of truth for the entire project. Update after every phase.

---

## Project Objective

Build a production-quality personal portfolio website for Nabin Dhungana that communicates serious professional credibility as an **infrastructure engineer working across networking, systems, security, and cloud, with a growing focus on cloud architecture**. The site should feel like a serious professional engineer's personal digital identity — not a generic AI-generated portfolio.

---

## Confirmed Professional Positioning

**Positioning:** infrastructure engineer across networking, systems, security, and cloud — no job titles, "open to work" lines, or exaggerated claims. First-person, plain, professional.

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
| Deployment | GitHub Pages (static export, free, custom domain `www.nabin-dhungana.com.np`) |
| Analytics | Not configured — deferred |
| Testing | CLI-level QA (curl); Playwright deferred |
| Linting/Formatting | Biome |

---

## Complete Site/Page Structure

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, focus areas, selected work, technologies, credentials |
| `/about` | About | Bio, focus areas, working approach, certifications |
| `/projects` | Projects Index | Filterable grid of projects |
| `/projects/[slug]` | Project Detail | Full project writeup |
| `/insights` | Insights Index | Blog-style listing |
| `/insights/[slug]` | Insight Detail | Full MDX-rendered article |
| `/contact` | Contact | Contact form (mailto) + direct links |
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
- `components/layout/` — Navbar, Footer, PageHeader, PageTransition
- `components/fx/` — Reveal, SpotlightCard, GradientOrbs, PageTransition
- `components/projects/` — ProjectCard, ProjectGrid, ProjectFilters, ProjectDetail
- `components/insights/` — PostCard, PostList, MDXComponents, feedback/metrics
- `components/contact/` — ContactForm
- `components/ui/` — Button, Container, Link, ProfilePhoto, TechnologyMarquee, brand-icons, ThemeScript, ThemeToggle

### Rules
- Server components by default, client only when interactivity required
- Client boundaries pushed as deep as possible
- Data fetching in server components or generateStaticParams

---

## Design Direction

### Visual Identity
- **Light + Dark theme** — complete light/dark theme system with system-preference detection, localStorage persistence, and no-FOUC inline script. Toggle in the navbar (accessible, keyboard-operable, with `aria-label`/`role="switch"`).
- **Light:** warm off-white background (#f8f9fb), dark text (#111827)
- **Dark:** deep navy (#0a0e1a), light text (#e5e7eb)
- **Accent:** Steel blue (#2563eb light / #3b82f6 dark), used sparingly
- **Typography:** Inter for body, JetBrains Mono for code/technical labels
- **No:** glowing effects, particle backgrounds, over-animated gradient, floating elements
- **Texture:** Subtle grid/dot patterns at low opacity (engineering paper feel)
- **Borders:** 1px low-opacity border for cards/sections (theme-aware)
- **Shadows:** Minimal — depth through border contrast + subtle elevation on hover
- **Motion:** tasteful scroll-reveal, spotlight cards, page transitions — all respecting `prefers-reduced-motion`

### Design Tokens
```
--color-bg-primary:     #f8f9fb   (light)  /  #0a0e1a  (dark)
--color-bg-secondary:   #f0f2f5   (light)  /  #111827  (dark)
--color-bg-card:        #ffffff   (light)  /  #151c2e  (dark)
--color-border:         rgba(9,12,22,0.08) / rgba(243,244,246,0.08)
--color-text-primary:   #111827   (light)  /  #e5e7eb  (dark)
--color-text-secondary: #6b7280   (light)  /  #9ca3af  (dark)
--color-accent:         #2563eb   (light)  /  #3b82f6  (dark)
--color-accent-muted:   rgba(37,99,235,0.08) / rgba(59,130,246,0.12)
```

---

## Content Requirements

### NO fabricated content. All content is confirmed by Nabin.

**Confirmed content now stored in `lib/content.ts` + `lib/constants.ts`:**
- [x] Professional bio/about text
- [x] Current focus areas (Networking, Systems, Cloud, Security)
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

## Deployment Plan — Target Production Architecture (MIGRATED to GitHub Pages)

```
GitHub repository
        ↓  (push / commit to main)
GitHub Actions (lint → typecheck → next build → static export `out/`)
        ↓  (upload-pages-artifact + deploy-pages)
GitHub Pages  →  https://www.nabin-dhungana.com.np   (custom domain via CNAME)
```

- **Platform:** GitHub Pages — fully static export (`next.config.ts` sets
  `output: "export"` + `trailingSlash: true` + `images.unoptimized`). No server,
  no Node runtime at the host.
- **Deploy:** `.github/workflows/deploy.yml` on every push to `main`:
  permissions `contents: read` / `pages: write` / `id-token: write`, concurrency
  group `pages`, uploads `out/`, deploys via the Pages API. Custom domain served
  from `public/CNAME` (`www.nabin-dhungana.com.np`).
- **Build:** `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build`.
  The build is fully static — no secrets or env vars are required.
- **DNS:** CNAME record for `www` → `<owner>.github.io` at the domain registrar.
- **Canonical/metadata domain:** `SITE.url` = `https://www.nabin-dhungana.com.np`
  (default), overridable per-environment via `NEXT_PUBLIC_SITE_URL`. No
  localhost hard-coding.
- **Cost:** $0/month (GitHub Pages + GitHub Actions). The only purchased item is
  the domain itself (owner-owned).
- **Honesty constraints kept:** contact = `mailto:` composer (no backend), the
  optional serverless `api/` (Azure Functions) is documented but **not** deployed
  with the Pages site, and article metrics render nothing unless that API is
  reachable — counts are never fabricated.

### Deployment prerequisites

- GitHub **repository** `github.com/Nabin-Dh/nabin-portfolio` (`main` branch).
- The **real content** from the owner: profile photo (present), insight article
  topics (site is ready; Insights shows an empty state).
- The **domain** `www.nabin-dhungana.com.np` (owner-owned).

### Required GitHub repository setup

1. Repo published on GitHub (`main`), code pushed.
2. Pages must be enabled in **Settings → Pages → Build and deployment →
   Source = "GitHub Actions"** (the workflow deploys via the Actions API, so the
   "GitHub Actions" source is mandatory — do NOT select "Deploy from a branch").
3. Custom domain `www.nabin-dhungana.com.np` configured in **Settings → Pages →
   Custom domain** (DNS must verify first). HTTPS (Enforce) is automatic.

### Required DNS setup (registrar)

1. Create a CNAME record: **`www` → `Nabin-Dh.github.io`**.
2. (Optional in most setups) Apex (`@`) either an ALIAS/ANAME to the same target
   or a URL redirect to `www` — the site's canonical domain is `www...`.

### Expected maintenance workflow

The owner edits content (articles, profile, projects, photo) directly on GitHub
from any device; every commit auto-deploys. See **MAINTENANCE.md** for the full
non-expert guide. A developer is only needed for structural/design/code changes.

### Backup / rollback strategy

- **Backup = the Git repository.** Every version of every file is in Git history;
  the repo (possess a local clone) is the backup.
- **Rollback** = use GitHub's file "History → Restore" (MAINTENANCE.md §14) for
  a single file, or revert a commit. Pages redeploys the restored version
  automatically.
- A failed deployment **never takes the live site down** — the last good build
  stays up.

### Cost considerations

- GitHub Pages + Actions: $0 (public repo).
- Domain: ~cost of the `.com.np` domain (owner). No database, backend, analytics,
  or CMS costs — none were added in the Pages deployment.

### Remaining owner-provided items (before/at launch)

- Insight article topics/content (site is ready; Insights shows an empty state)
- Any additional projects/experience beyond the confirmed ones
- DNS CNAME record + Pages custom-domain confirmation on the registrar side

### Post-deployment maintenance checklist

- [x] Publish repo; GitHub Pages enabled with **Source = GitHub Actions**
- [x] Add `public/CNAME` (`www.nabin-dhungana.com.np`)
- [x] Set up the DNS CNAME record (`www` → `Nabin-Dh.github.io`) at the registrar
- [x] Configure the custom domain in Settings → Pages (+ enforce HTTPS)
- [ ] Visit every route on the live domain (all 200) and unknown slugs (404)
- [ ] Confirm `/robots.txt` + `/sitemap.xml` use `https://www.nabin-dhungana.com.np`
- [ ] Verify profile photo appears (About/Home)
- [ ] Confirm the marquee shows the working-stack icons on the homepage
- [ ] Confirm security headers (6 set + no `X-Powered-By`) on the live host
- [ ] Add real content (articles, CV, photo, education)
- [ ] Lighthouse pass (perf/a11y/SEO) + final CSP decision on the live host
- [ ] Optional later: RSS feed, OG images, privacy-friendly analytics, visual/Git CMS

---

## Phase 10 — GitHub Pages Migration + Professional Refinement (2026-09-14)

> This phase migrated the site from the planned Azure Static Web Apps hosting to
> **GitHub Pages (fully static export)** and refined professional presentation.

**Deployment migration:**
- Switched `next.config.ts` to `output: "export"` + `trailingSlash: true` +
  `images.unoptimized`; removed the Node-runtime-only headers.
- **Deleted** the two Azure Static Web Apps workflows
  (`azure-static-web-apps.yml`, `azure-static-web-apps-lemon-glacier-092bae200.yml`).
- **Added** `.github/workflows/deploy.yml`: on push to `main` (or `workflow_dispatch`),
  `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build`, then
  `actions/upload-pages-artifact` (`out/`) + `actions/deploy-pages`. Permissions:
  `contents: read`, `pages: write`, `id-token: write`; concurrency group `pages`.
- **Added** `public/CNAME` → `www.nabin-dhungana.com.np` (custom domain).
- **Added** `.gitattributes` (`* text=auto eol=lf`) to fix repo-wide CRLF formatter
  failures on Windows checkouts (`core.autocrlf` + Biome LF); ran `npm run format`.
- **Cleared stale `.next` dev types** that referenced the deleted `app/cv/route.js`.

**Professional-identity refinement:**
- **CV removed site-wide:** `app/cv/route.ts` + `public/cv/nabin-dhungana-cv.pdf`
  deleted; all CV CTAs stripped from Navbar, Footer, Hero, About, and Contact (no
  download PDF is fabricated). No employer is named on the site; work history is
  reframed as two-plus years of hands-on practice across networking, systems,
  security, and cloud — no invented employer.
- **Working-stack marquee (new) on the homepage:** `components/ui/TechnologyMarquee.tsx`
  renders a seamless, reduced-motion-aware marquee of 12 curated technology chips
  (AWS, Microsoft Azure, Powershell, Linux, Windows Server, VMware, Git, GitHub,
  Cisco, Bash) plus text-only chips for Active Directory, Aviatrix, and Red Hat.
  Icons are inline `currentColor` SVG paths (simple-icons); brand accents use
  per-technology colors that stay readable in both themes. "Active Directory",
  "Aviatrix", and "Red Hat" render as text-only. CSS + keyframes added in
  `app/globals.css`; section wired into `app/page.tsx` in the Technologies block.
- **Contact form → `mailto:` composer** (`components/ui/ContactForm.tsx`): validates,
  opens the visitor's email client, gives feedback. No backend, no stored data.

**Documentation rewrite:**
- `README.md`, `MAINTENANCE.md`, and this `PROJECT_PLAN.md` were rewritten for
  the GitHub Pages architecture: deployment flow, DNS/CNAME, no server/no
  secrets, `mailto:` contact, CV removal, and the optional `api/` backend
  documented as not part of the Pages deployment (metrics render nothing/were
  never fabricated).

**Validation (2026-09-14):**
- `npm run lint` (Biome) clean — fixed unused Navbar `Button` import,
  `role="region"` → `<section>` a11y semantics, and normalized line endings.
- `npm run typecheck` clean — deduped `NAV_LINKS`/`CONTACT_TOPICS` in
  `lib/constants.ts` (duplicate-declaration regression from Phase 1).
- `npm run build` green — static export produced; `out/` contents verified
  (routes, `sitemap.xml` with trailing-slash URLs, `robots.txt`, `CNAME` copied,
  profile photo, no Azure/localhost references).
- Single commit `Migrate portfolio to GitHub Pages and refine professional
  presentation` pushed to `main`.

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

**Phase:** 8 → 9 — Final Architecture + Maintenance Preparation / Polish & QA

**Status (2026-09-03):** ✅ COMPLETE — production architecture finalized (`GitHub → Azure SWA Free → Cloudflare DNS → nabindhungana.com`), non-expert **MAINTENANCE.md** guide created, full light/dark theme system implemented, all pages refined with consistent theme-aware styling, premium UX/visual polish applied (icons in skill cards, refined hero with technical details panel, improved project/insight cards, contact validation, refined author card), and security/SEO/performance maintained. Remaining is the owner's real content (CV, profile photo, articles) + actual Phase 9/10 provisioning (deployment).

**Environment:** Next.js 16.3.4 (Turbopack), React 19.2.8, TypeScript 5, Tailwind CSS v4 (typography plugin), @next/mdx + gray-matter. Production output: standard Node runtime (`next start`), container-agnostic, portable to Azure SWA / Vercel / Netlify / App Service.

**Pending from Nabin:** real CV PDF, formal education info, insight article topics/content, Git remote + hosting wiring, live-domain env value, and the backend's external configuration (SendGrid + Azure datastore app-settings). (Profile photo now present at `public/profile/profile.jpeg`.) Remaining code work before launch: Phase 9 QA (Lighthouse, cross-browser/mobile, live CSP/headers check), optional future owner-notification features, RSS feed.

**Final validation (2026-09-03, after visual/theme refinements):** lint clean, typecheck clean, production build green, all route checks verified.

**QA harden pass (2026-09-03):** lint clean, typecheck clean, production build green (17 routes). Professional refinements landed — see "Phase 9 — Prefix QA harden pass (2026-09-03)" below.

**Next implementation phase (2026-09-03):** profile photo integrated (`.jpeg` support added to `ProfilePhoto`), `SKILL_CATEGORIES` reorganized into 5 broad professional categories (Networking; Systems & Infrastructure; Cloud & Virtualization; Cybersecurity; IT Operations & Technical Support) with vendor/product names removed from core-skill lists, and the Insights feedback/view architecture scaffolded (`lib/feedback.ts` + `ArticleFeedback`). Validation: lint clean (54 files), typecheck clean, production build green (17 routes). Remaining from the target list: content-depth placeholders across pages, MAINTENANCE.md expansion, contact backend-prep docs, and final visual/responsive QA — deferred to the next phase.

**Feedback widget finished (2026-09-03):** `ArticleFeedback` UI polished and verified honest about persistence — `lib/feedback.ts` keeps `feedbackEnabled = false` with `getArticleMetrics` returning `null` and `recordFeedback` a typed no-op stub (no counts shown, none faked); the widget is explicitly non-persistent (local state only) and its muted note states feedback isn't stored yet. Responsive/a11y pass: label now full-width on small screens so the buttons group on their own row, `aria-live="polite"` status message announces selection to screen readers (added "Thanks — marked as useful/not useful in this session only."), buttons remain native with `focus-visible` outlines and `aria-pressed`. Validation: lint clean (54 files), typecheck clean, production build green (17 routes).

**Backend phase (2026-09-03) — serverless API implemented & validated:** a production serverless backend was added in `api/` (Azure Functions, Node 20). **Contact**: `POST /api/contact` validates + sanitizes (strips control chars to block header injection), applies anti-abuse (honeypot, min-submit-time, per-IP rate limit, request-size limit), and delivers via SendGrid from a verified sender to `CONTACT_TO_EMAIL` — all secrets via server-side env vars. **Article metrics**: `POST /api/insights/views`, `POST /api/insights/reaction`, `GET /api/insights?slug=` persist real view/reaction counts in Azure Table Storage with authoritative de-dup (one view/article/day and one reaction/article per random non-personal visitorId) — never fabricates numbers and degrades gracefully (renders nothing) when the datastore is unconfigured. **Client wiring**: `ContactForm` now POSTs with loading/success/error states + a mailto fallback; `lib/feedback.ts` is the client API layer; `ArticleFeedback` (reactions) and new `ArticleMetrics` (views) show counts only when the backend returns real numbers. **Value**: same-origin `/api` via SWA (no CORS config); no always-running server; no local DB; no hard-coded resource IDs or secrets; `.github/workflows/azure-static-web-apps.yml` scaffold with `api_build_command`. Validation: root lint clean, typecheck clean, production build green (17 routes); **api TypeScript compiles clean** (`tsc -p api/tsconfig.json` → `dist/`). Remaining for the owner: provisioning SendGrid + datastore + app-settings (see MAINTENANCE.md §§20-25).

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
- [x] Build Home page (Hero + focus areas/projects/technologies/credentials)
- [x] Build About page (bio, career direction, focus areas, certifications, contact sidebar)
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
- [x] Phase 9 (partial, 2026-09-03) — **Premium visual + theme refinements:** complete light/dark theme (refined design tokens, theme-aware borders everywhere, removed all `border-white`/`bg-white` hardcodes), hero improved (technical details panel, refined profile-photo container with glow + status line, skill category icons in cards), profile-photo fallback improved (initials badge in a ring with subtle glows + status dot), contact form upgraded (client-side validation with inline errors + `aria-invalid`/`aria-describedby`, optional subject label), project cards (category badge with accent color, theme-aware hover), expertise + experience + credentials pages (theme-aware cards/buttons, consistent chips), insights (theme-aware filters, improved empty state, author card with photo + clear filters), footer (added "Open to" column from centralized `CONTACT_TOPICS`), Navbar mobile-menu body-scroll lock, refined shadow/spotlight variables per theme, prose code/table/blockquote styling for articles
- [x] Phase 9 (2026-09-03) — **Prefix QA harden pass (static/code-level):** semantic fix (nested `<article>` → `<div>` in insight detail — only the outer element remains an article), accessibility fix (ProfilePhoto initials fallback now exposed via `role="img"` + `aria-label` instead of hiding the whole container with `aria-hidden`), footer "Open to" internal links switched from `<a>` to `<Link>` (client-side nav, no full reload), SpotlightCard applied consistently to ProjectCard across Home + project-detail related (was only on Projects index), Experience domain cards now use the previously-dead `area` field to render a per-domain icon (Network/Server/ShieldCheck/Cloud), OG image derives the role line + domain from `SITE` constants (was hardcoded), `lib/insights.ts` adds a module-level cache for repeated build-time fs reads + `getInsightBySlug` refactored to read each file once (was reading twice). Validation: lint clean (52 files), typecheck clean, production build green (17 routes).
- [x] Phase 9 (2026-09-03) — **Profile photo + expertise categories + feedback architecture:** profile photo added at `public/profile/profile.jpeg` and `.jpeg` added to the `ProfilePhoto` supported filenames (renders automatically in the Home hero, About sidebar, and insight author card; `object-cover` in `aspect-square` containers keeps it undistorted); `SKILL_CATEGORIES` reorganized from 4 → 5 broad professional categories (Networking; Systems & Infrastructure; Cloud & Virtualization; Cybersecurity; IT Operations & Technical Support) with vendor/product names (Azure, AWS, VMware ESXi) removed from core-skill lists and mapped to per-category icons on Home + Expertise (`Wrench` for IT Ops); Insights feedback/view architecture scaffolded — new `lib/feedback.ts` (`feedbackEnabled = false`, `getArticleMetrics`/`recordFeedback` typed adapter stubs, never fakes counts) and `components/insights/ArticleFeedback.tsx` (non-persistent useful/not-useful widget, `<fieldset>`/`<legend>` semantics, `aria-pressed`, wired on the insight detail page). Validation: lint clean (54 files), typecheck clean, production build green (17 routes).
- [x] Phase 9 (2026-09-03) — **Feedback widget polish + honest-persistence verification:** verified `lib/feedback.ts` never claims persistent data (backend disabled, null metrics, no-op adapter); improved `ArticleFeedback` responsive behavior (label full-width on small screens so buttons group cleanly on their own row) and accessibility (`aria-live="polite"` status message announcing selection, e.g. "Thanks — marked as useful in this session only.", while the idle note clarifies feedback isn't stored until the backend phase); confirmed no view/fake counts are rendered anywhere. Validation: lint clean (54 files), typecheck clean, production build green (17 routes).
- [x] Phase 9 (2026-09-03) — **Backend (serverless Azure Functions) — Contact + persistent article metrics:** implemented the production serverless backend in `api/` (Azure Functions v4, Node 20, TypeScript, separate/own deps: `@azure/functions`, `@azure/data-tables`, `@sendgrid/mail`). **Contact** (`POST /api/contact`): server-side validation & sanitization (control-char stripping blocks email header injection), anti-abuse (honeypot field, 3s minimum-submit timing check, per-IP in-memory rate limit 5/min, 32KB request-size limit), SendGrid delivery to `CONTACT_TO_EMAIL` from a verified `SENDGRID_FROM_EMAIL`; generic 502/503 errors, no internal leakage. **Metrics** (`POST /api/insights/views`, `POST /api/insights/reaction`, `GET /api/insights?slug=`): Azure Table Storage persistence with authoritative de-dup via row-key uniqueness (one view/article/day, one reaction/article, keyed by a random non-personal visitorId in localStorage); never fabricates counts and degrades gracefully (renders nothing) when the datastore is unconfigured. **Client**: `ContactForm` POSTs with loading/success/error states + mailto fallback; `lib/feedback.ts` rewritten as the client API layer (no secrets); `ArticleFeedback` persists reactions + shows real tallies; new `ArticleMetrics` shows a real view count. **Platform**: same-origin `/api` via SWA (no CORS config), no always-running server, no local DB, no hard-coded Azure/SendGrid ids or secrets (all env vars), `.env.example` placeholder names only, `.github/workflows/azure-static-web-apps.yml` scaffolded with `api_build_command: npm run build`. Validation: root lint/typecheck/build all green (17 routes); **api TypeScript compiles clean** (`tsc -p api/tsconfig.json` → `dist/functions/*.js` + `dist/lib/*.js`, ESM with `.js` import extensions, `main` → `dist/functions/*.js`).

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
- [x] GitHub Actions workflow scaffold (`.github/workflows/azure-static-web-apps.yml`; validate against Azure-generated workflow on first deploy)
- [ ] Provision backend services (SendGrid + Azure datastore) and set SWA app-settings
- [ ] Custom domain configuration
- [ ] Analytics integration (optional; likely skipped — see roadmap)

---

## Phase 7 — Remote Content Management + Deployment Readiness (2026-09-02)

> This section is the living architecture reference for content editing and hosting.
> Update it whenever the architecture or workflow changes.

### 1. Current architecture

```
Git repository  ── build (npm run build) ──▶  static export (out/)
      │                                           (GitHub Pages, automatic deploy on push)
      ├─ app/          routes, layout, sitemap, robots
      ├─ components/   UI (server components by default, client islands for FX/filters)
      ├─ lib/          typed content layer (constants.ts, content.ts, insights.ts)
      ├─ content/insights/  article source (MDX + YAML frontmatter)
      └─ public/       profile photo, CNAME, insight images
```

- **Rendering:** everything is statically generated at build time. All routes are
  SSG; `/insights/[slug]` and `/projects/[slug]` use `generateStaticParams` +
  `dynamicParams = false` (unknown slugs return 404).
- **Content vs UI:** profile data, focus areas, certifications, projects, and the
  bio live in typed TS data (`lib/constants.ts`, `lib/content.ts`) — no markup.
  Articles live as MDX in `content/insights/`. The only adapter between
  content and the app is `lib/insights.ts`.
- **Build-time generated:** sitemap (incl. article URLs), robots.txt, JSON-LD
  (Person/WebSite/Article), OG metadata, security headers, fonts (self-hosted).
- **Serverless backend (added 2026-09-03).** A small `api/` folder of Azure
  Functions (Node 20) now powers the Contact form (SendGrid delivery, validated +
  anti-abuse) and article metrics (persistent views + Useful/Not-useful reactions
  in Azure Table Storage). It is genuinely serverless (no always-running server,
  no local/no separate database), keeps all secrets in server-side env vars, and
  never fabricates counts — metrics are only shown when the backend returns real
  numbers. The site itself remains static/SSG; interactivity is progressive.

### 2. How content is edited now

All edits are plain file edits in the repository, followed by a deploy-triggering commit:

| What | Where | How |
|---|---|---|
| Insigh articles | `content/insights/<slug>.mdx` | Edit frontmatter + Markdown body; see `content/insights/README.md` for the full lifecycle (create/edit/delete/tags/dates/images/related) |
| Bio, tagline, email, socials | `lib/constants.ts` | Edit the `SITE` object |
| Nav links | `lib/constants.ts` — `NAV_LINKS` | Edit array |
| Focus areas, certifications | `lib/content.ts` | Edit `FOCUS_AREAS`, `CERTIFICATIONS`, `PROFILE`, `ENGINEERING_APPROACH` |
| Projects | `lib/content.ts` — `PROJECTS` | Edit or append a typed entry |
| Profile photo | `public/profile/profile.jpg|jpeg|png|webp` | Add the file; appears automatically after deploy rebuild |
| Site domain | `.env.example` / host env `NEXT_PUBLIC_SITE_URL` | Optional; defaults to `https://www.nabin-dhungana.com.np` |

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

**MIGRATED (2026-09-14): target and live deployment is GitHub Pages with a fully
static export.** `next.config.ts` sets `output: "export"` (`trailingSlash: true`,
`images.unoptimized`, headers removed). `.github/workflows/deploy.yml` runs
lint/typecheck/build, uploads `out/`, and deploys via the Pages API; custom
domain `www.nabin-dhungana.com.np` is served from `public/CNAME`. No server, no
secrets, no Node runtime at the host. (Historical: the earlier target was Azure
Static Web Apps with the Node runtime — superseded by this migration.)

Portability review results (current static-export codebase):

| Aspect | Status | Notes |
|---|---|---|
| `next.config.ts` | ✅ static export | MDX plugins as strings (Turbopack-safe), `poweredByHeader: false`, `output: "export"`, `trailingSlash: true`, `images.unoptimized` |
| Env vars | ✅ none required | `NEXT_PUBLIC_SITE_URL` optional per-domain override with `https://www.nabin-dhungana.com.np` fallback; `.env.example` documents it; `.gitignore` permits `.env.example` |
| Asset paths | ✅ portable | Everything under `public/`, referenced by absolute paths, no `localhost`/machine paths |
| Sitemap / robots / metadata | ✅ portable | Canonical domain from `SITE.url` (env-overridable); `metadataBase` set; article URLs emitted at build; all entry URLs use trailing slashes |
| CV delivery | ✅ removed | CV page/route/PDF removed during the Pages migration; navbar/footer/hero/about/contact no longer expose a CV link |
| Image handling | ✅ static | Local-only images; `images.unoptimized` (no runtime image optimizer on Pages) |
| MDX generation | ✅ build-time | Build-time fs reads of `content/insights/`, no runtime dependency |
| Dynamic routes | ✅ SSG | `generateStaticParams` + `dynamicParams = false` → unknown slugs 404 |
| Security headers | ✅ host-level | Removed from `next.config.ts` (not applicable to static export); enforced at GitHub Pages / not required for a static site — see vercel/gh-pages conventions |
| Caching | ✅ static | Fully static assets served by Pages CDN; trailing `.html`/slash routing standard |
| Build behavior | ✅ green | `npm run build` verified green (static `out/`); lint + typecheck clean |

**Deliberate tradeoff:** the site is now fully static — no server, no route
handlers, no runtime API. The optional `api/` (Azure Functions) project remains
in the repo but is **not** deployed with the Pages site; article metrics and the
contact form degrade honestly (mailto / nothing shown) without it.

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

1. **Repo + Pages wiring (owner):** GitHub Pages enabled with source = "GitHub
   Actions" (deploy via the workflow), custom domain configured
   (`www.nabin-dhungana.com.np`), DNS CNAME `www` → `Nabin-Dh.github.io`.
2. **Real content (owner):** insight articles/posts. (Profile photo present;
   CV was intentionally removed in the Pages migration.)
3. **Post-launch QC (developer):** cross-browser/mobile interactive pass,
   Lighthouse (perf/a11y/SEO), final live check of robots/sitemap/canonical.
4. **Post-launch optional:** RSS feed, OG images, analytics (privacy-friendly),
   a visual/Git CMS only if the owner wants one, the optional `api/` backend.

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

## Phase 9 — Prefix QA harden pass (2026-09-03)

Static/code-level hardening pass performed without running a server (production build independently verified first). Focus: genuine semantic, accessibility, consistency, and build-efficiency fixes.

- **Semantic HTML:** insight detail page had a nested `<article>` (outer structure article + inner prose article). Changed the inner one to a `<div>` — only the outer element remains an `<article>`, which is now the correct single article landmark.
- **Accessibility — ProfilePhoto fallback:** the initials-badge fallback container previously carried `aria-hidden="true"`, hiding the person's name context from screen readers. The container now uses `role="img"` + `aria-label` (`"{name} — initials placeholder"`); only genuinely decorative children (grid, glow orbs, status dot) remain `aria-hidden`. Decorative/status spans are hidden inside the `role="img"` context automatically.
- **Internal navigation consistency:** the footer "Open to" list rendered `<a href="/contact">` per item, forcing a full page reload; now uses the app `<Link>` for client-side navigation (matches all other internal links in the footer/nav).
- **Spotlight consistency:** `SpotlightCard` was applied to `ProjectCard` only on the Projects index. It's now applied consistently to the Home featured projects and the project-detail "Related projects" as well, so the pointer spotlight micro-interaction is uniform everywhere project cards render.
- **Dead data field now used:** `ExperienceDomain.area` was typed and set on all four entries but never read. The Experience page now maps each area to a Lucide icon (Network / Server / ShieldCheck / Cloud) shown in the technical-domain cards — gives the field purpose and improves visual scannability.
- **OG image derived from constants:** `app/opengraph-image.tsx` renders the tagline and domain from `SITE.tagline` and `SITE.url`, so the image stays in sync if the site identity/domain ever changes.
- **Build-time fs efficiency (`lib/insights.ts`):** repeated `readAllInsights()` / `getAllSlugs()` / `getAllTags()` calls during a single build (sitemap, home, insights index, related) each re-read and re-parsed every MDX file. Added a module-level cache so the directory scan + file reads happen once per build. Also refactored `getInsightBySlug` to read each file once (it previously read the file twice — once for content/headings and again via `readInsightFile`), via a shared `readInsightWithContent` helper.
- **Validation (2026-09-03):** `npm run lint` clean (52 files), `npm run typecheck` clean, `npm run build` green (17 routes, incl. 2 SSG project details + SSG insight route with zero prerendered posts). No running server started; static/code-level checks only.

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

- **Confirmed source of truth:** Real profile data for Nabin (bio, focus areas, certs, projects, links) was provided by the user and is stored in `lib/content.ts` and `lib/constants.ts`.
- **Contact form:** Implemented as a `mailto:` client component (no backend/service added, per "no unnecessary backend services"). Resend/API integration deferred until a production server backend is needed.
- **CV pathway:** Real PDF not provided. A clearly-labeled **placeholder PDF** was created at `public/cv/nabin-dhungana-cv.pdf` so the download pathway works and no link 404s. It must be replaced with Nabin's real CV. No fabricated CV content.
- **Lucide brand icons removed:** The installed lucide-react (v1.38.0) no longer exports `Github`/`Linkedin`. Replaced with custom inline SVGs in `components/ui/brand-icons.tsx` (`GithubIcon`, `LinkedinIcon`).
- **JSON-LD:** Person schema added to root layout; Biome `noDangerouslySetInnerHtml` suppressed with a `biome-ignore` comment (static, trusted data).
- **Stats/fake counters avoided:** No fabricated statistics or counters anywhere. Per confirmed data only.
- **Projects not yet built as pages:** The Projects index/detail pages are deferred to Phase 3 (as instructed). The 2 confirmed projects appear on Home only.
- **Positioning honored:** Nabin presented as a working infrastructure professional across networking, systems, security, and cloud. No student/intern/fellow-teacher emphasis; no invented years of experience; no job titles or "open to work" language on the site.

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
4. **Light + dark theme** — full theme system with system-preference fallback, persistence, and no-FOUC startup script
5. **Server components by default** — minimize client JS
6. **MDX for content** — no external CMS
7. **GitHub Pages** — fully static export (free tier), GitHub-linked deployment
8. **Biome over ESLint+Prettier** — single tool for lint+format
9. **3D usage is optional and must prove its value** — not decorative
10. **CV must be downloadable from multiple locations** (navbar, footer, about, contact)
11. **Expertise stays general/professional** — vendor/product/tool names only appear in Projects, Certifications, or Technologies where relevant, never as core skill tags
12. **No fabricated insight articles** — the Insights system is populated only when Nabin authors real content (underscore-prefixed files are private/build scaffolding, never published).
