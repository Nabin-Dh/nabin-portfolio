# MAINTENANCE GUIDE — Nabin Dhungana Portfolio

This guide is written for a non-expert. It explains how to update the website
from any device (phone, tablet, laptop, or desktop) — **no development computer,
no special software, and no technical knowledge beyond web browsing is required.**

Everything on this site is controlled by a set of simple files stored in a
**GitHub repository**. When you change a file and save the change on GitHub, the
live website updates automatically (usually within a few minutes). That is the
whole workflow:

```
Edit a file on GitHub
        ↓
Save (commit) the change
        ↓
Automatic deployment builds the site
        ↓
Live website updated
```

> **The golden rule of maintenance:** you are only ever editing simple text
> files and images. You are **never** touching any workings of the website
> itself. If you can copy an existing example and change a few words, you can
> maintain this site.

---

## Getting around GitHub

The website's files live at:
**`https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`** (replace with your real
username/repository when deployment is set up).

When you open that link, you will see a list of folders and files:

- `app/` — the "engine" of the site. **Do not edit anything here.**
- `components/` — visual building blocks. **Do not edit anything here.**
- `lib/` — the "settings" where your profile data, projects, and expertise live.
- `content/insights/` — where your articles (Insights) live.
- `public/` — where you put images: your CV PDF and your profile photo.
- `MAINTENANCE.md` and `README.md` — these instructions.

To **edit** any file: click on it, then click the **pencil icon** near the top
right. A text box opens; make your change, scroll down to the green **"Commit
changes…"** button, leave the default options, and click it. That's it.

To **add a new file**: click the **"Add file"** button (top right), choose
**"Create new file"**, type the file name, paste content, then commit.

To **delete a file**: open the file, click the **trash icon** at the top right,
then confirm.

---

## 1. How to add an Insight (article)

An Insight is a single article. Each article is its own file in
`content/insights/`, named like `my-article-name.mdx`.

1. In GitHub, go to `content/insights/`.
2. Open the file named **`_template.mdx`** (this is a ready-made blank example).
3. Click the **copy icon** (top right) to copy all of its text — or open it and
   mark all / copy.
4. Go back to the `content/insights/` folder and click **"Add file" → "Create
   new file"**.
5. Give it a **file name** — e.g. `my-article-name.mdx`. Use simple words joined
   by dashes, no spaces or capitals, and **always end in `.mdx`**.
6. Paste the copied text, then edit the top section (the lines between the two
   `---` lines) and the body. See the example below.
7. Click **"Commit changes…"**.

### The frontmatter block (the part between `---` lines)

```yaml
---
title: "A clear, specific title"
description: "One or two sentences that appear under the title and in search results."
date: "2026-09-05"
tags: [azure, networking]
featured: true
---
```

- `title` — the article's headline.
- `description` — a short summary (1–2 sentences).
- `date` — the publish date, always in the form `YYYY-MM-DD` (year-month-day).
- `tags` — 2–4 short keywords. These power the filter buttons and "related
  articles". Keep them lowercase.
- `featured: true` — optional. Set to `true` to pin the article to the top of
  the Insights page, or remove the line / set `false` to not pin it.

### The body (everything below the second `---` line)

Write normally using plain text. A few simple rules:

- A line starting with `## ` makes a section heading (appears in the table of
  contents). Use `### ` for smaller sub-headings.
- Start a paragraph on its own line. Blank line between paragraphs.
- To make a **bullet list**, put `- ` at the start of each line.
- To make a **numbered list**, put `1. `, `2. `, etc.
- To make a **link**, write `[linked words](https://address.com)`.
- To make a **bold** word, wrap it in two asterisks: `**bold**`.

---

## 2. How to edit an article

1. In `content/insights/`, click the article file you want to change.
2. Click the **pencil icon**.
3. Change the text (frontmatter and/or body).
4. Click **"Commit changes…"**.

The reading time, table of contents, tags, and "related articles" all update
automatically after the site rebuilds.

---

## 3. How to delete an article

1. In `content/insights/`, click the article file.
2. Click the **trash icon** at the top right, then confirm.

The article disappears from the site everywhere (index, filters, search, and its
web address returns "not found").

> Prefer to keep the article but hide it temporarily? Rename the file so it
> **starts with an underscore** (e.g. `_draft-article.mdx`). Files starting with
> `_` are never shown on the live site.

---

## 4. How to change an article's tags, date, or title

All three live in the **frontmatter block** at the top of the article file
(the lines between the two `---` lines).

1. Open the article, click the pencil.
2. Edit the `title:`, `date:`, or `tags:` lines.
3. Commit.

- **Title** → changes the heading and search/SEO title.
- **Date** → changes what's shown and where it sorts in the list.
- **Tags** → changes the filter buttons and which articles appear as "related".

---

## 5. How to add article images

1. In GitHub, go to the `public` folder → `images` folder → `insights` folder.
   (If `images/insights` doesn't exist yet, create it with **"Add file" →
   "Upload files"** — it will let you drag a picture in.)
2. Upload the image file there.
3. In your article's body, insert a picture line where you want it:

   ```
   ![A short description of the image](/images/insights/your-image-name.png)
   ```

   Replace the file name with the one you uploaded.
4. Commit. The picture appears in the article.

Notes:

- Use `.png`, `.jpg`, or `.webp` files. Keep them reasonably small (compress or
  resize before uploading if possible) so the site stays fast.
- Keep the short description meaningful for accessibility.
- Only use images you have the right to publish (your own photos/diagrams, or
  properly licensed ones — never copyrighted images you don't own).

---

## 6. How to update profile information

Your core profile (name, job title, headline, the "about" bio, email, and social
links) lives in **`lib/constants.ts`** and **`lib/content.ts`**.

- `lib/constants.ts` → the `SITE` block: name, role, headline, description,
  email, and social links (LinkedIn, GitHub, Credly).
- `lib/content.ts` → the longer paragraphs (bio, "About" text, focus areas).

To edit: open the file, click the pencil, change the text between the
double-quote marks next to the labels (`name:`...), and commit. Keep the
quotes and formatting exactly as they are — only change the words inside.

## 7. How to update experience (work history)

Work history is in **`lib/content.ts`**, in a section called `EXPERIENCE` (or
`EMPLOYMENT`). Each job is a small block like:

```ts
{
  role: "System & Network Engineer",
  company: "Rolling Plans Pvt. Ltd.",
  period: "July 2026 – present",
  // ...description lines
},
```

- **Add a job:** copy one existing `{ ... },` block, paste it after it, and
  change the role/company/period/details.
- **Edit a job:** change the text inside its block.
- **Remove a job:** delete its whole `{ ... },` block.

Only change the words inside the quotes — keep the commas, brackets, and
formatting otherwise identical.

## 8. How to update expertise

Expertise domains and skills are in **`lib/content.ts`**, in the `DOMAINS` and
`SKILL_CATEGORIES` sections. Each domain/skill is a small text entry. To add,
edit, or remove a skill, follow the same copy/edit/delete approach as
experience: change only the quoted text, keep the surrounding formatting
(commas, brackets) intact.

## 9. How to add or edit projects

Projects appear on the Projects page. They live in **`lib/content.ts`**, in the
`PROJECTS` section. Each project is a block like:

```ts
{
  slug: "unique-short-name",
  title: "Project title",
  category: "Cloud" /* or Networking, Security, ... */,
  description: "A clear one-paragraph description.",
  technologies: ["Azure", "Virtual Networks"],
  repository: "https://github.com/...",
  // ...
},
```

- **Add:** copy an existing block, paste it after it, and give it a **new
  `slug`** (unique, lowercase, dashes, no spaces) plus a new title/description/
  technologies. The URL will be `/projects/your-new-slug`.
- **Edit:** change the text inside the block.
- **Remove:** delete the whole block. (The web address for that project then
  returns "not found".)

---

## 10. How to replace the CV

1. In GitHub, go to `public` → `cv`.
2. Click the file **`nabin-dhungana-cv.pdf`**.
3. Click the **trash icon** to delete it, then:
   - Click **"Add file" → "Upload files"**.
   - Upload your new PDF **with the exact same file name**
     `nabin-dhungana-cv.pdf`.
4. Commit.

> The file name must stay exactly `nabin-dhungana-cv.pdf` — the site and the
> download button depend on that exact name. Your PDF can contain anything you
> like; no code change is needed.

## 11. How to replace the profile photo

1. In GitHub, go to the `public` → `profile` folder. (If it doesn't exist,
   create it via **"Add file"**.)
2. Upload your photo with one of these exact names:
   - `profile.jpg`, `profile.png`, `profile.webp`, or `me.jpg`
3. Commit.

The photo appears automatically on the About page (and Home) once the site
rebuilds. Use a simple headshot square image (JPG/PNG/WebP). If no photo is
present, the site simply shows no photo — nothing breaks.

---

## 12. How changes get from GitHub to the live website

The deployment service (Azure Static Web Apps) is connected to your GitHub
repository. The automatic flow is:

1. You **save/commit** a change on GitHub.
2. Azure notices the new commit and **automatically rebuilds** the site.
3. Azure publishes the new version to the internet.
4. The live website shows your change — usually within ~2–5 minutes.

You do **not** need to start anything, run any command, or use any software.
Deployment is hands-free.

> The build machine is a remote cloud service. It does **not** need your
> computer, OmniRoute, OpenCode, or anything local to be running.

## 13. What requires a rebuild/deployment and what does not

- **Every published change** (an article, a profile edit, a new project, the
  CV, the photo, any file in `content/`, `lib/`, or `public/`) goes through the
  automatic rebuild as described above. You don't do anything extra — the rebuild
  is automatic on every commit.
- **Nothing is "instant" without a rebuild.** There is no database and no
  admin panel, so there is no "save and it appears immediately" route. Every
  change travels through the GitHub → build → deploy pipeline.
- **Nothing about hosting/security settings** (domain, HTTPS, DNS) requires a
  rebuild — those are configured once at the hosting provider, not per change.

In practice: for content, **every change = one commit = one automatic rebuild**.
That's the whole model.

## 14. How to rollback a bad change

GitHub keeps the full history of every file. To undo a change:

1. Open the file you changed.
2. Click **"History"** (near the top).
3. You'll see a list of past versions with dates. Click the version *before*
   the bad change.
4. Click the **"..."** menu and choose **"Restore this version"**, then confirm.

This reverts that file to the earlier version and triggers a rebuild that
publishes the restored version. This is safe and reversible — you can always
roll forward again.

## 15. What to do if deployment fails

A failed deployment usually means the site stops updating (the last good
version stays live — it does **not** go blank). Common causes and fixes:

- **Typo in a file** (a missing quote or comma, usually in `lib/*.ts` or a
  `.mdx` file). Check the `Actions` tab of your GitHub repo — a red ⤫ next to
  the latest run shows a failure message explaining the line/column. Fix the
  file and commit again.
- **A file name is wrong** (e.g. the CV or photo not using the exact required
  name). Check the names against sections 10 and 11.
- **Left a half-pasted block** in `lib/content.ts` (missing comma/bracket).
  Compare your block against the example above.

If you can't fix it: **restore the last working version** (see section 14) to
get the site back to a good state, then retry your change more carefully.
The live, already-published version keeps working while you fix things — a
failed rebuild never takes the existing site down.

## 16. What must NEVER be committed to GitHub

The most important rule, and the only truly dangerous one:

- **Never commit secrets.** This includes:
  - Passwords and login details
  - API keys or tokens (any service: email, cloud, payment, social, etc.)
  - Private keys (RSA/SSH keys, certificate private keys)
  - Long random tokens that look like `ghp_...`, `sk-...`, `AKIA...`, etc.
  - Personal identity numbers, bank/financial details, or phone numbers

The repository's settings already ignore files named like `.env` (a common
secret file) and the site has no secrets in it. Maintain that habit: **if a
piece of text is a credential, it does not belong in any file here.** If you
ever accidentally commit a secret, remove it from the file *and* rotate/replace
the secret at the service that issued it (deleting it from the file alone is
not enough once it's been published to GitHub history).

By contrast, everything the site *needs* (your name, email, projects, articles)
is meant to be public and is fine to commit.

---

## Quick reference — what to edit and where

| I want to... | File / folder | Section |
|---|---|---|
| Add an article | `content/insights/new-name.mdx` | 1 |
| Edit an article | `content/insights/<name>.mdx` | 2, 4 |
| Delete an article | `content/insights/<name>.mdx` | 3 |
| Add article images | `public/images/insights/` | 5 |
| Update profile/bio/links | `lib/constants.ts`, `lib/content.ts` | 6 |
| Update experience | `lib/content.ts` | 7 |
| Update expertise | `lib/content.ts` | 8 |
| Add/edit projects | `lib/content.ts` | 9 |
| Replace CV | `public/cv/nabin-dhungana-cv.pdf` | 10 |
| Replace profile photo | `public/profile/` | 11 |

**Advanced/don't-touch:** anything in `app/` or `components/` changes how the
site looks and is built. A developer handles those — a normal content edit never
needs them.

The full technical architecture, deployment setup, and roadmap live in
`PROJECT_PLAN.md`.
