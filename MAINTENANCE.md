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
- `api/` — the small "server" that receives contact messages and counts article
  reactions/views. Run by Azure automatically; **you don't normally touch it.**
- `.github/` — the automatic build-and-publish instructions. **Do not edit.**
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
- **Nothing is "instant" without a rebuild.** There is no admin panel, so there
  is no "save and it appears immediately" route for your content. Every *content*
  change travels through the GitHub → build → deploy pipeline. (The only things
  that update instantly are visitor metrics like article views/reactions — those
  are written by the serverless API as they happen, not through a rebuild.)
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

---

## 17. Theme (light / dark) — how it works

The site supports **light, dark, and automatic (system) themes**. You don't
normally need to touch anything — here's what's going on and how to change it.

- **Automatic by default:** if you've never chosen a theme, the site follows your
  device/browser's light-or-dark setting.
- **Manual override:** the button in the top-right of the navigation toggles
  between light and dark, and remembers your choice for next time.
- **No coding needed:** there's no content setting for the theme; it's part of
  the design system (`app/globals.css` + `components/ui/ThemeToggle.tsx`). A
  developer would only change it if you wanted a different color palette.

All pages (home, about, expertise, experience, projects, insights, credentials,
contact) are designed to look correct in both themes. The ideas behind this:

- **Colors come from shared "design tokens"** defined once in `app/globals.css`
  (light values under `:root`, dark values under `[data-theme="dark"]`). Every
  card, border, text, and background reads those tokens, so one change updates
  the whole site.
- **No flash of the wrong theme:** a tiny startup script (`ThemeScript`) reads
  your saved/saved/system preference before the page paints, so the correct
  theme appears immediately.
- **Reduced motion:** if your device asks for less animation (a system
  accessibility setting), the site's scroll reveals, highlights, and transitions
  are turned off automatically.

---

## 18. Contact form — how it works now

The Contact form now submits to a small serverless API (in the `api/` folder)
that **emails you the message directly** through SendGrid. When a visitor fills
the form in and presses "Send message", the message is delivered to your inbox —
no email app on their side is needed, and no visitor data is stored.

What the backend does automatically:

- **Validates** the message (name, valid email, non-empty message) and rejects
  obviously bad input.
- **Blocks spam** quietly: a hidden "honeypot" field traps bots, an instant
  submit is ignored, and there's a per-visitor rate limit. The visitor gets no
  error for these — bots are simply silently accepted-and-ignored.
- **Emails you** via SendGrid from a verified sender address to your `CONTACT_TO_EMAIL`.

If anything isn't configured yet, the form shows a friendly "Contact delivery is
not configured yet" style message and still offers your direct email address as
a fallback — so the site never appears "broken".

The email address you receive messages at is controlled by the setting
`CONTACT_TO_EMAIL` (see section 20). Your public email shown elsewhere on the
site is set in `lib/constants.ts` (the `SITE.email` value).

## 19. Article reactions and views — how they work now

Article pages now show two genuinely-persisted, honest metrics:

- **Views** — a small "views" number next to the date/read-time on each article.
- **Reactions** — "Useful / Not useful" buttons on each article, with the real
  tallies shown next to them.

How it works, and what it deliberately does:

- Counts are **real**, stored in an Azure datastore (Table Storage / Cosmos
  Table API) by the same serverless API. The site **never** shows a made-up
  number. If the metrics backend isn't configured or is unreachable, the site
  simply shows **no** view count and no reaction tallies — it never invents them.
- **Refreshes aren't over-counted.** A visitor's browser session is given a
  random (non-personal) id, and the API counts **at most one view per article
  per day** and **one reaction per article** per that id. Refreshing a page does
  not keep inflating the counter.
- **Privacy-conscious.** Only that random id and a date are stored — no name,
  email, IP address, or device fingerprint. The site tracks nothing else.

You read these numbers with the Azure portal or the Table Storage explorer — see
section 24 ("Understanding metrics"). There is no owner notification for views
or reactions (that would produce noise, not signal); these are aggregate
counters you check when you want to.

---

## 20. Environment variables (the settings the site's server uses)

Everything secret and configurable about the backend is controlled by
**environment variables** — a list of *name = value* settings attached to the
Azure Static Web App. **None of these values belong inside a code file.** They
are entered once in the Azure portal (and optionally in a `.env` file for local
testing).

The API reads these:

| Variable | What it's for | Required? |
|---|---|---|
| `AZURE_TABLES_CONNECTION_STRING` | Connection string for the datastore that holds article views/reactions. | Required for metrics |
| `SENDGRID_API_KEY` | Secret key that lets the site send email through SendGrid. | Required for contact |
| `SENDGRID_FROM_EMAIL` | The verified sender address emails go out from. | Required for contact |
| `SENDGRID_FROM_NAME` | Display name shown as the sender (e.g. "Nabin Dhungana"). | Optional |
| `CONTACT_TO_EMAIL` | The inbox where contact messages arrive (default `nabinndh@gmail.com`). | Optional |

There is also one **build-time** variable used only when building the front end
(not secret): `NEXT_PUBLIC_SITE_URL` (the site's canonical URL). Never prefix a
secret with `NEXT_PUBLIC_` — only non-secret, front-end values use that prefix.

> **Never** commit real values. The file `.env.example` shows only safe, empty
> placeholder names. Real secrets live only in Azure (and optionally a local
> `.env` that is git-ignored).

## 21. Set up SendGrid (one time, for contact email)

Contact messages are delivered with **SendGrid** (Twilio's email service). You
need a free SendGrid account and a verified sender.

1. **Create a SendGrid account** at sendgrid.com (click "Start for free").
2. **Verify a sender.** In SendGrid go to **Settings → Sender Authentication**.
   The simplest is a **Single Sender Verification**: enter an email address you
   control (e.g. `nabin@your-domain.com` or your Gmail) and click the
   confirmation link they email you.
3. **Create an API key.** Go to **Settings → API Keys**, click **Create API
   Key**, name it (e.g. `portfolio-contact`), choose **Restricted Access** (a
   key that can only *Send*), and save the full key — it is shown once only.
4. **Add the settings in Azure.** In the Azure portal open your Static Web App →
   **Configuration → Application settings**, and add:
   - `SENDGRID_API_KEY` = the key from step 3
   - `SENDGRID_FROM_EMAIL` = the address you verified in step 2
   - `SENDGRID_FROM_NAME` = your name (optional)
   - `CONTACT_TO_EMAIL` = the inbox you want to receive messages in
   Save, then wait a moment for the deployment to pick them up.

## 22. Set up the Azure datastore (one time, for views/reactions)

Article views and reactions are stored in **Azure Table Storage** (the simplest,
cheapest option; the same connection string also works with Cosmos DB's Table
API). It needs no "server" — Azure manages it.

1. **Create a storage account.** In the Azure portal choose **Create a resource
   → Storage account** (any standard account type is fine; the free/basic tiers
   work for a portfolio).
2. **Copy the connection string.** Open the storage account → **Security +
   networking → Access keys**, and copy either connection string.
3. **Add the setting in Azure.** In your Static Web App → **Configuration →
   Application settings**, add `AZURE_TABLES_CONNECTION_STRING` = the string from
   step 2 and save. The first article view/reaction will create the table and
   rows automatically — you don't need to create tables by hand.

For Cosmos DB instead: create a Cosmos DB account with the **Table API**, and use
its table connection string in the same `AZURE_TABLES_CONNECTION_STRING` setting.

## 23. Testing the API locally (for a developer)

A developer can run the API on their own computer to test it before deploying:

1. Install the [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local).
2. In the `api/` folder, copy `local.settings.example.json` to `local.settings.json`
   and put in real (or test) placeholder values for the connection string and
   SendGrid key.
3. Run `npm install` then `npm run start` inside `api/`.
4. The endpoints are then available locally at `http://localhost:7071/api/...`
   (`/api/contact`, `/api/insights/views`, `/api/insights/reaction`,
   `/api/insights?slug=...`).

Local testing is optional and is for developers only — you never need it to
maintain the live site.

## 24. Understanding article metrics

There is no admin dashboard for metrics — the numbers are already shown on each
article page (views next to the date, and the Useful/Not-useful tallies), and
the underlying rows are stored in your datastore.

To inspect the raw rows:

- **Azure portal:** open your storage account → **Storage browser → Tables →
  `insightsMetrics`**. Each article has:
  - rows whose name starts with `views:<article-slug>` — one row per unique
    count; each row is one view (a visitor+day).
  - rows whose name starts with `reactions:<article-slug>` — one row per unique
    reaction, with a `vote` column of `helpful` or `not-helpful`.
- **Interpreting:** the number of `views:` rows for an article = its view count;
  the number of `reactions:` rows whose `vote` is `helpful` = the Useful count
  (and likewise for `not-helpful`).

These counts are deliberately **deduplicated** (one view per visitor per day, one
reaction per visitor per article), so they reflect distinct readers, not page
refreshes.

## 25. Deployment & rollback

Deployment is fully automatic via GitHub Actions (see the `.github/workflows/`
file): every commit to the `main` branch triggers a build of the front end and
the `api/` functions, then publishes both to Azure Static Web Apps. You do not
run anything manually.

- **Deploy a change:** just commit it on GitHub — see section 1.
- **Roll back a bad change:** use the same "History → Restore this version"
  steps as section 14. That reverts the files and pushes an automatic rebuild.
  The already-published version keeps serving until the rebuild finishes. If the
  rollout fails, the previous good deployment stays live — a failed build never
  blanks the site.
- **Config-only changes** (new SendGrid key, storage settings) are made in Azure
  application settings and do not require a code commit; Azure picks them up on
  the next deploy or immediately.

> **First deployment note:** the exact `app_location` / `api_location` values in
> the workflow must be confirmed against the workflow Azure auto-generates when
> you create the Static Web App resource. If the API doesn't appear after the
> first deploy, compare the generated workflow with the one in `.github/`.

The full technical architecture and step-by-step roadmap live in
`PROJECT_PLAN.md`.
