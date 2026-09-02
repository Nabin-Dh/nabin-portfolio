# Insights — Article Format

Articles live in `content/insights/` as Markdown files with YAML frontmatter.

## Frontmatter schema

```yaml
---
title: "Article title"        # required
description: "One to two sentence summary."  # required
date: "2026-09-02"             # required, ISO format `YYYY-MM-DD`
tags: ["networking", "azure"]  # optional, array of lowercase slugs
featured: true                 # optional, boolean — shown first on the index
---
```

The rest of the file is standard Markdown (GitHub-flavored: tables, task lists,
fenced code blocks). MDX is also supported if you need to embed React
components, but plain Markdown is preferred and sufficient for most articles.

## Conventions

- File name becomes the URL slug: `azure-vnets-deep-dive.mdx` → `/insights/azure-vnets-deep-dive`.
- **Files whose name begins with `_` are private** (e.g. `_template.mdx`). They are never
  published: excluded from the index, tag filter, sitemap, and direct routes, and they
  return 404. `_template.mdx` is a copy-ready skeleton — keep at least one private file
  present so the dynamic MDX import glob stays resolvable during production builds.
- Use `##` as the top-level heading inside the body (the article title itself is rendered by the page).
- Headings (`##`, `###`) are automatically collected into a table of contents and get anchor links.
- Dates should not be in the future. Format is strict `YYYY-MM-DD`.
- Keep `tags` to 2–4 focused lowercase slugs so the tag filter stays useful.

## Article lifecycle

Everything below is a plain file edit + commit. There is no admin UI or database.

### Create an article

1. Copy `_template.mdx` to a real slug, e.g. `my-first-article.mdx` (no leading `_`).
2. Fill in frontmatter: `title`, `description`, `date`, `tags`, optional `featured: true`.
3. Write the body: `##` for top-level headings, `###` for subsections. Any Markdown
   (lists, tables, fenced code, links, blockquotes) renders with the global prose styles.
4. Commit the file. A deploy/render rebuild regenerates the index, sitemap, TOC, and
   reading time automatically.

### Edit an article

Edit the `.mdx` file (frontmatter and/or body) and commit. Headings only appear in the
table of contents if they are `##`/`###` and unique; the page rebuild regenerates the
anchor links.

### Delete an article

Delete the `.mdx` file and commit. The article vanishes from the index, tag filter, tag
stat, sitemap, and its URL returns 404 (`dynamicParams = false`). There is nothing else
to clean up — articles are self-contained files. (To "unpublish" without deleting, rename
the file with a leading `_`.)

### Update tags

Edit the `tags:` array in the frontmatter and commit. Tags drive the index filter
buttons, the tag pills on the article page, `article:tag` metadata, JSON-LD keywords,
and related-article scoring. Keep tags lowercase kebab-case slugs.

### Update dates

Edit `date:` in the frontmatter and commit. The date appears on the index card, the
article header, `article:published_time` metadata, JSON-LD, and sitemap `lastmod`.
Format is always `YYYY-MM-DD`.

### Add images

- Small/static images: drop the file into `public/images/insights/` (create it) and
  reference by URL path, e.g. `![Diagram](/images/insights/hub-spoke.png)`.
- Images render as regular Markdown `<img>`; the prose styles give them borders/radius.
- Keep images optimized (compressed, reasonable dimensions) — they are served as static
  assets, not re-processed at build.
- Never commit third-party images without a license to use them.

### Add related articles

Related articles are **auto-derived from shared tags** and don't need an explicit field:
`lib/insights.ts` ranks other articles by tag overlap and fills remaining slots
chronologically. To influence which articles are related, make their `tags:` overlap.

## Remote editing (Git-based) — out of the box

Because content is plain files in a Git repository, any Git-capable editor works from any
device. From a phone/tablet/laptop you can use GitHub's web editor, GitHub Codespaces, or
a Git client — clone → edit a `.mdx` file or `lib/content.ts` → commit → push. A
connected deployment (see PROJECT_PLAN.md "Deployment Architecture") rebuilds
automatically. No local dev machine, OmniRoute, or OpenCode involvement is required.

This layout is also compatible with a future lightweight headless CMS or Git-based CMS
(e.g. a markdown/frontmatter generator or CMS that outputs `.mdx` files into this
directory) without architectural changes — `lib/insights.ts` is the only adapter point.
None of that is installed yet by design.

## Example

```mdx
---
title: "Azure Hub-Spoke Topologies"
description: "How Azure virtual network peering enables hub-spoke designs."
date: "2026-09-02"
tags: ["azure", "networking"]
---

## Why hub-spoke

Content here.
```

## System notes

- `lib/insights.ts` reads this directory at build time (filesystem, server-side only).
  Underscore-prefixed files are filtered out everywhere.
- The `[slug]` page sets `dynamicParams = false`; any slug not in `generateStaticParams`
  (which excludes `_`-prefixed files) returns 404.
- Reading time and the table of contents are derived automatically.
- The index page (search + tag filter), share/copy-link, related-article suggestions, and
  `Article` JSON-LD structured data are all generated from these files.
- Sitemap entries for articles are emitted automatically.