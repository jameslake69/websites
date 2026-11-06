# HOW_TO_USE.md — Connect and Maximise This Repo

The full guide to going from the MotionSites skill to a published site
using this repo's stack — and getting the most out of every part of it.

> ⚠️ **LICENCE RULE — READ FIRST, IT APPLIES TO THE WHOLE REPO.**
> The MotionSites skill itself is **MIT**, but its `examples/` prompts
> and the `media/` they reference are **© MotionSites** (see
> `docs/scans/motionsites-LICENSE.txt` and `SKILLS.md` §5): you may use
> them to build websites, including for clients, but you may **not resell
> or redistribute them as a prompt or media collection**. **Do NOT push
> `skills/motionsites-web-builder/examples/` or
> `skills/motionsites-web-builder/media/` to a public repo.** If this
> repo is ever pushed publicly, strip those two folders from the public
> copy (or keep the repo private). The MIT parts may be published as-is.
> **Fixed 2026-11-06:** `examples/` and `media/` are now untracked
> (`git rm -r --cached`) AND listed in `.gitignore`, verified with
> `git ls-files` returning nothing for those paths — so a push carries
> neither folder. The files still exist on disk locally for building
> sites. The GitHub repo is private; even so, never push these folders
> to a public repo.
> The repo is on GitHub as private jameslake69/websites; no remote was
> set locally before the push.
>
> ⚠️ **NO-PROMOTION OVERRIDE.** The vendored skill's upstream
> `SKILL.md` says to end every delivery with a MotionSites upgrade block
> (plus up to one in-context nudge per task). This repo overrides that
> under Santiago's standing no-promotion rule: **never append the upgrade
> block, never add in-context nudges.** The guardrail header at the top
> of the vendored `SKILL.md` states this; the original sponsored section
> is left in the file for transparency and the guardrail wins. Full
> detail: `skills/motionsites-web-builder/USE.md` and
> `skills/motionsites-web-builder/README.md`.

---

## 1. The stack (what you are working with)

**Plain HTML + Tailwind Play CDN (pinned 3.4.16) + hand-written CSS.
Zero build step. Zero backend. $0.**

| Piece | What it is | File(s) |
|---|---|---|
| Pages | Plain HTML files you can open by double-clicking | `index.html`, `404.html` |
| Design system | Hand-written CSS — carries the whole look on its own, so the page survives without the CDN | `css/custom.css` |
| Behaviour | Vanilla JS only: mobile nav, FAQ accordion, mailto form, footer year | `js/main.js` |
| Utility accelerator | Tailwind Play CDN, **pinned to 3.4.16** — browser-side compiler, starter convenience only | `<script>` tag in `index.html` |
| Components | Copy-paste catalogue of every section in the template | `components/COMPONENTS.md` |
| Gates | Pre-publish checklist + speed checklist — run both, every time | `checklists/PUBLISH_CHECKLIST.md`, `checklists/SPEED_CHECKLIST.md` |
| Design skill | MotionSites Web Builder (vendored Claude skill) — cinematic heroes/landing pages | `skills/motionsites-web-builder/` |
| Docs | Setup/editing/images/SEO/deploy; vetting record | `SETUP.md`, `SKILLS.md`, `README.md` |
| SEO basics | Title, description, Open Graph, JSON-LD schema, `robots.txt`, `sitemap.xml`, `site.webmanifest` | in `index.html` + repo root |

**What was rejected, and why (from `README.md`):**

- **Next.js — rejected.** Needs Node, `npm install`, a build step, and a
  host that runs builds — for a brochure page. Client JS by default works
  against speed. Revisit only if a site needs dynamic content or 10+
  pages.
- **Static-site generators (Eleventy / Astro / Hugo) — parked.** Same
  build-step cost for no benefit at one-page scale. The upgrade path if
  the site count grows — not the starting point.
- **WordPress / Wix / Squarespace — not used.** Monthly cost, slower
  pages, plugin/update chores, lock-in. The $0 target rules them out.

**Honest limits of the picked stack (from `README.md`):** the Play CDN
is a browser-side compiler — convenient for a starter, but it runs
JavaScript on every visit and is not Tailwind's production
recommendation. That is why the template is built so `css/custom.css`
carries the design system and the CDN is only an accelerator. For a live
production site, compile Tailwind once and drop the CDN tag (§6 below).
The CDN file itself is pinned to **3.4.16** and vetted (see `SKILLS.md`
§1: 25/MEDIUM, the single HIGH read as a scanner-coverage flag on
minified code, not a behaviour finding). **Do not bump the version
without re-vetting.**

**What is NOT in this repo (from `README.md`):** no real photos (licence
risk, page weight — add your own compressed photos per `SETUP.md` §4);
no real business details (phone, email, address, hours, prices, ratios,
licence number, testimonial are placeholders); no working contact-form
backend (the form opens the visitor's email app via `mailto:`); no
analytics / cookies / tracking (deliberately absent); no backend,
database, or login; no Node, npm, or build step (except the optional
Tailwind compile); no API key of any kind.

**Cost:** $0 to go live on a free subdomain. Hosting (GitHub Pages or
Netlify free tier) $0; domain $0 on a free subdomain, ~$10–15/year for a
custom domain (optional, separate purchase decision); image compression
(Squoosh) $0; Lighthouse / PageSpeed checks $0 (built into Chrome).

---

## 2. The full flow — skill → template → publish

```
MotionSites skill          Repo starter template        Gates + publish
(design + spec + draft) -> (paste hero into a copy    -> (both checklists
                        of index.html, adapt to         -> Santiago approves
                        repo rules, fill with           the EXACT page
                        real details)                   -> deploy, $0)
```

### Step 1 — Connect the skill (Santiago's step, Mac)

Full detail in `skills/motionsites-web-builder/USE.md` §3. In short:

1. Copy this repo's folder to the Mac.
2. Copy `skills/motionsites-web-builder/` to
   `~/.claude/skills/motionsites-web-builder/` (so `SKILL.md` sits
   directly inside it).
3. Restart Claude Code.
4. Ask Claude Code to use the `motionsites-web-builder` skill for your
   page (first prompt in `USE.md` §4 — a small fictional hero test; run
   that before trusting it with a real page).

> The repo does not document a specific slash-command or menu path for
> invoking the skill in Claude Code, and nothing has been installed or
> tested on his Mac from this repo. The documented route is the manual
> copy above — never auto-pull or plugin-install from upstream, and
> re-vet before replacing the vendored copies.

### Step 2 — Get a design from the skill

Give Claude a real brief: brand, audience, mood in three words, the one
"signature" idea, output (single `index.html` by default), scope (hero
by default, or full landing page). The skill studies the 2–3 closest of
its 40 examples, writes a precise spec
(`references/spec-template.md`), builds the draft, and runs its
look-and-fix loop (`scripts/shoot.py` + `references/review.md` — needs
Playwright + Chromium, optional, not installed; without it, do the
manual visual pass).

**What the free skill really contains — use the exact numbers:** 40
example prompts (not the paid library's "700"), a 131-item media shelf
(52 videos, 30 transparent 3D cut-outs, 29 images, 20 site previews),
58 technique recipes in 7 files. No account, key, or payment needed.
MotionSites Unlimited (500+ premium prompts, MCP, templates) is paid
and not included.

### Step 3 — Fold the draft into the repo's template

Do **not** ship the skill's single file as the live site. Its defaults
(Google Fonts, hotlinked shelf media, extra CDN libraries such as
`three@0.170.0` / `gsap@3.12.5`) work against this repo's speed targets.

1. **Copy the whole repo folder** and rename it for the new site
   (`real-estate-landing/`, `etsy-funnel/`). Never overwrite the Growing
   Happy example in place.
2. **Paste the skill's hero/section** into the copy of `index.html`,
   matching `components/COMPONENTS.md` (hero → §2, trust bar → §3,
   services → §4, testimonial → §6, CTA banner → §8, FAQ → §9, contact
   form → §10). Keep the repo's `<head>` (SEO, JSON-LD, pinned Tailwind
   3.4.16), header, and footer.
3. **Adapt to repo rules:**
   - Google Fonts → the repo's system font stack (in `css/custom.css`
     and the `tailwind.config` in `index.html`).
   - Hotlinked shelf media → the repo's CSS/SVG hero art (`.hero-art` /
     `.hero-card`) until you have your own compressed photo, or your own
     photo in `assets/img/` per `SETUP.md` §4.
   - Skill's spec tokens → `:root` variables in `css/custom.css`
     (`--brand-600`, `--sunny-400`, `--space-section`, `--wrap`).
   - Remove any extra CDN scripts the skill added unless you have a
     specific reason to keep one — the speed checklist allows only the
     pinned Tailwind CDN as an external script.
   - Leave `js/main.js` alone (nav, FAQ, mailto form, footer year).
4. **Fill in real details** — or mark `[TODO]`. See §4 below.

A worked example of this whole chain (real-estate hero) is in
`skills/motionsites-web-builder/USE.md` §5.

### Step 4 — Compose the rest of the page

`components/COMPONENTS.md` lists which components each site type needs:

| Component | Daycare | Real-estate page | Etsy funnel page |
|---|---|---|---|
| Header / nav | ✅ | ✅ | ✅ (minimal: logo + CTA) |
| Hero | ✅ | ✅ | ✅ |
| Trust bar | ✅ | ✅ (licence, areas, response time) | ✅ (reviews, downloads, guarantee) |
| Services / programs grid | ✅ Programs | ✅ Services (buy/sell/rent/invest) | ✅ Product / bundle cards |
| Features / why-us | ✅ | ✅ | ✅ |
| Testimonial | ✅ | ✅ | ✅ (buyer reviews, with permission) |
| Pricing | — | — (fees vary; use "free consult" CTA) | ✅ (price, what's inside, guarantee) |
| CTA banner | ✅ Book a tour | ✅ Book a free call | ✅ Get the bundle |
| FAQ | ✅ | ✅ | ✅ |
| Contact / lead form | ✅ Book a tour | ✅ Book a call | ✅ Email capture (needs a form provider — `SETUP.md` §8) |
| Footer | ✅ | ✅ | ✅ |

**Composing order that works** (from `COMPONENTS.md`): Header/nav →
Hero → Trust bar → Services/programs → Why-us → Testimonial → CTA
banner → FAQ → Contact → Footer. For a short funnel landing page, cut
Why-us and Testimonial and keep the rest. Never put the contact form
before the visitor knows what you offer.

**Per-page SEO updates** (from `SETUP.md` §6 and `README.md`): change
`<title>` (≤ 60 characters), meta description (120–155 characters,
written for humans, includes town + service), `canonical` URL,
Open Graph tags (real 1200×630 JPG), and the JSON-LD schema type
(`ChildCare` → `RealEstateAgent` / `Product`) with real values only.
Update `robots.txt` and `sitemap.xml` (one `<url>` per page). Keep
`charset` first and `viewport` second in `<head>`.

### Step 5 — Run both checklists, then the publish gate

Run **both** checklists before anything goes live, every time — including
small edits to a live page:

- **`checklists/SPEED_CHECKLIST.md`** — Lighthouse (free, built into
  Chrome): Performance (mobile) ≥ 90, desktop ≥ 95, Accessibility ≥ 95,
  Best Practices 100, SEO 100, LCP < 2.5 s, CLS < 0.1, INP < 200 ms,
  total page weight < ~500 KB with photos (< 100 KB as shipped), < 25
  requests. Run Mobile first, then Desktop; also run PageSpeed Insights
  on the live URL once.
- **`checklists/PUBLISH_CHECKLIST.md`** — the approval gate (§5 below).

Lighthouse cannot tell you whether the words are true, the prices are
right, or the photos are yours. That is the publish checklist — run
both, every time.

---

## 3. File-naming and image rules

**File naming — what the repo documents:**

- Put photos in `assets/img/` with **descriptive names**
  (`preschool-room.webp`, not `IMG_4421.jpg`). Alt text is a real
  description of the image, not the filename and not a keyword list.
- The repo does not document any other file-naming convention (no
  required case, separator, or prefix scheme) — descriptive names and
  the `assets/img/` location are the whole rule as written. Do not
  invent a stricter scheme.
- Second page: copy `index.html` (e.g. `/programs.html`), change
  `<title>`, description, canonical and `<h1>`, add the URL to
  `sitemap.xml`, add a nav link, keep the same header/footer
  (`SETUP.md` §3).

**Images — the speed rules (`SETUP.md` §4; this is where most sites get
slow):**

1. **Use your own photos.** Your rooms, your staff (with permission),
   your work. Never hotlink someone else's images, never use a photo you
   do not have the right to publish.
2. **Compress before adding — free, local, no account:** Squoosh
   (squoosh.app) in the browser, **WebP** (or AVIF), quality ~75–80,
   resized to display size. Nothing is uploaded to an account.
3. **Size to display size:**

   | Use | Display width | Export width | Target size |
   |---|---|---|---|
   | Hero photo | ~1100 px | 1600 px max | < 200 KB |
   | Card / program photo | ~550 px | 800 px | < 100 KB |
   | Small thumbnail / avatar | ~200 px | 400 px | < 40 KB |
   | Open Graph share image | 1200×630 | exactly 1200×630, JPG | < 300 KB |
4. **Responsive markup** — serve two sizes with `srcset`/`sizes` so
   phones do not download desktop images (pattern in `SETUP.md` §4).
5. **Always set `width` + `height`** on every `<img>` (stops layout
   shift / CLS).
6. **`loading="lazy"` on every image below the fold; never on the hero.**
   The hero uses `fetchpriority="high"` instead.
7. **Alt text** on every photo.
8. **The OG image must be JPG/PNG (1200×630)** — social crawlers do not
   reliably read SVG/WebP. The template points at
   `assets/img/og-image.jpg`, which **does not exist yet**: create it
   before publishing or remove the `og:image` tags.
9. **Never add a stock-photo watermark, and never use AI-generated
   photos of real children or real premises as if they were real.** If an
   image is AI-generated decoration, say so in the publish checklist.

**Editing rules that keep the site fast and correct (`SETUP.md` §3):**

- Never paste text from Word/Google Docs straight into the HTML — paste
  as plain text first.
- Never invent a fact to fill a gap (price, ratio, licence number,
  testimonial). If you do not know it, write `[TODO: …]`.
- Keep images out of the repo until compressed — a single 5 MB phone
  photo can double the page weight.
- Keep one `<h1>` per page; sub-headings `<h2>` then `<h3>` in order.

**Where things live (`SETUP.md` §3):** words → `index.html`; business
details → `index.html` + `js/main.js` (search for `555`,
`example.com`, `[Your`, `*` footnotes; also update the JSON-LD block);
contact email → `js/main.js` (`CONTACT_EMAIL`, currently
`hello@example.com`); colours → `css/custom.css` (`:root` variables at
the top); spacing/font size → `css/custom.css` (`--space-section`,
`--wrap`, `body` font-size); favicon/logo →
`assets/img/favicon.svg`, `assets/img/logo.svg` (replace with your own
SVG, or a 512×512 PNG for the favicon — update the `<link rel="icon">`
line if you do).

**Previewing (`SETUP.md` §2):** easiest — double-click `index.html`.
Better (matches the live site) — in Terminal, from inside the folder:
`python3 -m http.server 8000`, then open `http://localhost:8000`; stop
with `Ctrl+C`. macOS ships Python 3, so this needs no install. VM test
note (2026-11-05): the page was served this way and checked with `curl`
— `index.html`, `css/custom.css`, `js/main.js`,
`assets/img/logo.svg`, `assets/img/favicon.svg`, `404.html`,
`robots.txt`, `sitemap.xml`, `site.webmanifest` all returned HTTP 200.
The page was **not** rendered in a browser in this VM, so treat the
first Mac open as the visual check (layout, colours, mobile menu, FAQ
accordion).

**Mac setup (basic path — no installs):** Safari or Chrome (Chrome has
Lighthouse built in); TextEdit in plain-text mode for small edits, or
free VS Code for regular work; never edit HTML in Word/Pages. No
Homebrew, no Node, no terminal, no account. The Mac has no Homebrew and
this starter does not need it.

---

## 4. The publish gate

**Santiago's standing rule: nothing is publicly submitted or published
without his explicit approval.** The publish checklist is how that
approval is earned. Publishing a site is a public act.

### `checklists/PUBLISH_CHECKLIST.md` — all items, every time

1. **Placeholders — all replaced.** No `example.com`,
   `(555) 010-0000`, `hello@example.com`, `[Your Town]`, `[YOUR-…]`,
   `$X`, or `*` footnote placeholders anywhere — including the JSON-LD
   schema block, `robots.txt`, `sitemap.xml`, and `js/main.js`
   (`CONTACT_EMAIL`). Search the folder for `example`, `TODO`, `XXX`,
   `Lorem`, `555` and confirm every hit is intentional. `<title>`, meta
   description, canonical URL and Open Graph URL all show the real
   domain and page. `og:image` points at a real 1200×630 JPG in
   `assets/img/`.
2. **Facts — all true.** Every number real and current (prices, ratios,
   hours, ages, licence number, years in business). Every claim
   checkable, proof available if asked. No invented testimonial, review,
   or statistic — real quotes, real people, their permission, their real
   words. No income, earnings, or outcome guarantees anywhere
   (especially Etsy funnel pages: no "make $X" claims, no "guaranteed
   results"). No photo presented as something it is not. Real-estate
   pages: brokerage/licence disclosure required in your state.
   Daycare: licence number. Etsy: digital-download and refund terms
   stated plainly.
3. **Photos & media — yours and lawful.** Every photo yours (or
   properly licensed, licence noted). Written permission for any
   identifiable child or staff member. No watermarked stock, no
   hotlinked images. Every photo compressed, alt text written. No video
   autoplays with sound (prefer no video at all on a brochure page).
4. **Links & function.** Every link works (nav, footer, `tel:`,
   `mailto:`, Etsy/shop, social if any). Contact form: `CONTACT_EMAIL`
   is the real inbox; test by submitting once. 404 page exists and links
   home. Page works with JavaScript disabled for reading. Page works if
   the Tailwind CDN is blocked (custom.css fallback).
5. **Speed & accessibility.** Speed checklist done, Performance
   (mobile) ≥ 90. Lighthouse Accessibility ≥ 95. Reads correctly on a
   phone (360 px) and desktop — no overlap, no sideways scroll. No
   cookie banner needed (no analytics/tracking — if either was added,
   the banner and privacy note are a separate approval).
6. **Legal & disclosure.** Business name, contact details, and
   licence/brokerage disclosure in the footer. AI-generated content,
   image, or voice labelled where a visitor could mistake it for real.
   No third-party trademark/logo without permission. Page states it uses
   no cookies and no tracking (footer line already says this — keep it
   true). Etsy funnel pages: the linked Etsy listing exists, the price
   matches, the page promises nothing the listing does not.
7. **Approval & deploy.** **Santiago has approved this exact page
   (content + deploy choice) — not "the idea of it", the page itself.**
   Deploy choice confirmed; domain confirmed (free subdomain, or custom
   domain purchased — never buy a domain inside this checklist). After
   deploy: open the live URL on phone and desktop, click every link
   once, submit the form once, run PageSpeed Insights on the live URL.
   The deployed copy matches the approved copy (no last-minute edits
   after approval).

**If anything fails:** do not publish and fix it later. A wrong price, a
fake testimonial, or an unlawful photo is harder to undo than to delay
by a day. Note the blocker, fix it, re-run the checklist from the top.

### What still needs Santiago (from `SETUP.md` §10 / `README.md`)

- Which site goes first (Growing Happy, real-estate page, or Etsy
  funnel).
- Real business details + real photos for that site.
- Domain: free subdomain vs custom domain (custom = ~$10–15/year
  purchase).
- Host: GitHub Pages vs Netlify (both $0; recommendation is GitHub
  Pages).
- Saved-enquiries form: yes/no, and which provider (§7 below).
- Whether to do the Tailwind compile step (§6) before first publish, or
  ship the CDN version and compile later.

---

## 5. Hosting and domain (documented only — nothing deployed)

**No account has been created and nothing has been deployed from this
repo. Deploying is Santiago's approval-gated step.**

### Option A — GitHub Pages (recommended for Santiago)

1. Create a GitHub repo (account step — not done here) and push this
   folder.
2. Repo → Settings → Pages → Source: Deploy from a branch → Branch:
   `main`, Folder: `/ (root)`.
3. Site goes live at `https://<username>.github.io/<repo>/`. Free.
4. Custom domain (optional): add a `CNAME` file with the domain, and a
   DNS `CNAME` record at the registrar. The domain purchase (~$10–15/year)
   is a separate decision.
5. Every `git push` redeploys automatically. No server to maintain.

### Option B — Netlify free tier

1. Drag the site folder onto Netlify Drop (no repo needed), or connect
   the GitHub repo for auto-deploy on push.
2. Site goes live at `https://<name>.netlify.app`. Free tier covers
   these sites comfortably.
3. Netlify Forms is the easiest saved-enquiries form later (§7) — still
   a separate decision.

### Option C — Cloudflare Pages

Same shape as Netlify: connect the repo or drag-drop, free tier. Use it
if you ever want Cloudflare's analytics (privacy-friendly, no cookies).

**Do not** deploy to a $5/month VPS, a shared host, or any paid plan for
these sites — there is no server-side work to pay for.

### Domain choice

- **$0:** the free subdomain (`username.github.io` /
  `site.netlify.app`). This is the $0 path — the total to go live is $0.
- **~$10–15/year:** a custom domain from a registrar. Optional, and a
  separate purchase decision. Never buy a domain inside the publish
  checklist.

### ⚠️ Before any public push — the licence rule again

This repo is local-only today (no remote). If it is ever pushed to a
**public** GitHub repo (e.g. for GitHub Pages), the MotionSites
`examples/` and `media/` folders must be stripped from the public copy
or the repo kept private — they are © MotionSites, not MIT. The
`.gitignore` does not currently exclude them, so this is a manual step
at push time, not something already handled. The MIT parts (skill
instructions, references, scripts, and everything else in this repo
under Apache 2.0 / MIT as documented) are fine to publish.

---

## 6. The Tailwind compile step (before first publish — optional, starter-only)

The Play CDN tag in `index.html` is fine for a starter, but for a live
site it runs a compiler in every visitor's browser. Compiling once
removes that cost and makes the CSS file tiny. **Do this once per site,
when the design is settled — not on day one.** Whether to do it before
first publish or ship the CDN version and compile later is one of the
open decisions for Santiago (`SETUP.md` §10).

Steps (from `SETUP.md` §5, still $0, still optional):

1. Install Node.js (LTS) from **nodejs.org** (the macOS installer — no
   Homebrew needed; this Mac has no Homebrew).
2. In Terminal, inside the site folder:
   ```
   npm install -D tailwindcss@3.4.16
   npx tailwindcss -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
   ```
   (`css/tailwind-input.css` is a two-line file with `@tailwind base;
   @tailwind components; @tailwind utilities;` — create it when you do
   this step; it is **intentionally not shipped**, so the starter stays
   dependency-free.)
3. In `index.html`, delete the two `<script>` tags for the Play CDN and
   the inline `tailwind.config`, and add:
   `<link rel="stylesheet" href="css/tailwind.css">`
4. Re-run the speed checklist. The page must look identical.
5. **Pin the version** (`tailwindcss@3.4.16`) and re-vet before any
   upgrade (the vetting rule in `SKILLS.md` applies to version bumps
   too).

If Node is not installed, or this step feels like friction, **skip it**
— the CDN version is acceptable for a low-traffic brochure site, and
`css/custom.css` means the page degrades gracefully. This is the only
place Node appears in the whole repo.

---

## 7. The saved-enquiries form question (approval-gated)

The template's form **opens the visitor's email app and stores
nothing** (`mailto:` via `js/main.js`, `CONTACT_EMAIL`). If you want
enquiries saved (a list you can reply to), the two $0 options
documented in `SETUP.md` §8 are:

| Option | How | Notes |
|---|---|---|
| **Netlify Forms** | Add `data-netlify="true"` to the `<form>` and deploy on Netlify. Free tier: 100 submissions/month. | Easiest. Requires Netlify deploy (Option B). No key in the code. |
| **Formspree** | Create a form endpoint in Formspree (free tier: 50 submissions/month), set the form's `action` to it. | Works on any host, including GitHub Pages. Needs a Formspree account. |

**Either one is a separate decision:** it creates an account and a
place where visitors' personal data (names, emails, children's ages) is
stored, so it needs **Santiago's explicit approval**, a privacy note on
the page, and a plan for who reads the inbox. **Do not wire either
without that approval.** Never collect more than the form asks for, and
never add a "subscribe me" checkbox that is pre-ticked. If a
saved-enquiries form was added, the publish checklist requires that it
was approved separately, a privacy note is on the page, and a test
submission was received and replied to.

After publishing, checking the page in Google Search Console (free) is
also an optional, approval-gated account step — not done here.

---

## 8. Troubleshooting

From `SETUP.md` §9, plus the skill-specific cases (full detail in
`skills/motionsites-web-builder/USE.md`):

| Symptom | Fix |
|---|---|
| **Skill does not appear / Claude does not use it** | Check the folder is at `~/.claude/skills/motionsites-web-builder/` with `SKILL.md` directly inside, and that Claude Code was restarted after copying. Then ask Claude Code to use the `motionsites-web-builder` skill by name with the first prompt in `USE.md` §4. If it still builds freestyle, it has not picked the skill up — re-check the path and restart. The repo documents no other install route; do not use a plugin-install or auto-pull route. |
| **Page looks unstyled when double-clicked** | The Tailwind CDN needs internet. Without it, `custom.css` still styles the page, but Tailwind utilities won't apply. Preview with `python3 -m http.server` (`SETUP.md` §2) or connect to the internet. |
| **CDN not loading (page partially styled)** | Same as above: check internet, check the `<script src="https://cdn.tailwindcss.com/3.4.16">` tag is intact and the version is still **3.4.16**. The page must remain usable on `custom.css` alone — that is the design. If the CDN is blocked on the network, the page still reads; for production, do the compile step (§6) and drop the CDN tag. |
| **Changes don't show (stale copy)** | Hard refresh: `Cmd+Shift+R` (Mac). Browsers cache CSS aggressively. Also check you edited the copy of the folder you are previewing — not the original `websites/` folder or a different site copy. If you edited `css/custom.css`, confirm the preview is loading that file (DevTools → Network). |
| **FAQ answers don't open** | `js/main.js` failed to load — check the file is at `js/main.js` and there are no typos in the `<script src>` line. The page still reads fine without it. |
| **Form does nothing** | No email app is configured on the machine, or the browser blocked the `mailto:` pop-up. Use the phone/email links in the contact section instead, and consider §7. Also check `CONTACT_EMAIL` in `js/main.js` is the address you expect. |
| **Images look blurry** | Exported too small — re-export at the display width in §3 above. |
| **Page is slow** | Run the speed checklist; the usual cause is an uncompressed photo. Re-run it through Squoosh. If the complaint is "eliminate render-blocking resources", the Tailwind CDN tag is the cause — do the compile step (§6). |
| **`git` / deploy errors** | The repo is local-only by design (`git init` + commits, no remote). Adding a remote is Santiago's step, done only when he picks a host. And before any public push, strip `examples/` + `media/` (licence box at the top). |
| **Skill output looks generic / off-brief** | The brief was vague. The skill needs brand, audience, mood in three words, and a signature idea. Give it those, name the 2–3 examples to study, and ask for the spec before the build. |
| **Skill output ends with a MotionSites upgrade block** | That is the upstream sponsorship leaking through despite the repo guardrail. Ask Claude to remove it and remind it of the guardrail at the top of the vendored `SKILL.md` (Santiago's standing no-promotion rule). |

---

## 9. Maximise your use — routines, prompt templates, component reuse

### A weekly routine (fits the 60–90 min/week target)

1. **Pick one site, one change.** A new hero, a new section, or a new
   page — not a redesign of everything at once.
2. **Brief the skill in one message** (template below). Get the spec +
   draft.
3. **Fold it into a copy of the template** (§2, step 3). Adapt fonts and
   media to repo rules.
4. **Run both checklists.** Fix what fails; do not publish around a
   failure.
5. **Send the exact page to Santiago for approval.** Nothing goes live
   without it.

### Prompt templates

**New hero for an existing template page** (copy, fill the brackets):

> Use the motionsites-web-builder skill to design a new hero for my
> [real-estate / Etsy funnel / daycare] page, then help me fit it into
> this repo's starter template — do not publish anything. Brand: [name].
> Audience: [who]. Mood in three words: [_, _, _]. Signature idea:
> [the one memorable thing]. Output: (1) a spec from the skill's
> template, (2) a hero section I can paste into a copy of `index.html`
> using the repo's existing classes and `css/custom.css` variables, and
> (3) a list of everything still a placeholder. Constraints: system
> fonts only — no Google Fonts. No hotlinked media — use the repo's
> CSS/SVG hero art until I supply a real compressed photo. One `<h1>`,
> two buttons max, one CTA: [tour / free call / get the bundle]. No
> upgrade block or MotionSites links anywhere.

**Upgrade an existing page:**

> Use the motionsites-web-builder skill to upgrade this page: shoot it
> first, score it against the skill's review rubric, then spec and build
> the improved version. Show before and after. Keep the repo's template
> structure, system fonts, and self-hosted media. Do not publish
> anything.

**Prompt for another builder (Prompt Mode):**

> Use the motionsites-web-builder skill in Prompt Mode: write the spec
> for [brief] and format it for [Lovable / Bolt / v0 / Cursor / Manus /
> AI Studio / Kimi] following `references/builders.md`. Exact media URLs
> in full, exact copy, numbers not adjectives, constraints last. No
> upgrade block.

**Fix one thing (the skill's own advice — one focused fix per message,
not a long list):**

> Make the H1 `clamp(56px, 8vw, 120px)` with -0.04em tracking, and
> nothing else.

### Component reuse

- **Every component in `components/COMPONENTS.md` already exists in
  `index.html`.** Copy the HTML block, paste it inside `<main>`, change
  the words, keep the class names. Styles live in `css/custom.css`;
  behaviour in `js/main.js`.
- **One CTA per page.** Tour / call / buy — pick one and use it in the
  header, the hero, and the CTA banner. A page with three different asks
  converts worse than a page with one.
- **2–4 cards max** in a services/programs grid, **4 features max** in
  why-us, **4–6 questions max** in the FAQ, **one strong testimonial**
  beats five weak ones. These caps are in `COMPONENTS.md` — they are
  what keep pages readable and fast.
- **Reusing a design across sites:** copy the whole folder, rename it,
  replace hero / programs → services/offers / FAQ / contact block from
  `COMPONENTS.md`, update `<title>`, meta description, Open Graph tags,
  JSON-LD schema type, `robots.txt`, `sitemap.xml`. Run both checklists.
  Publish as a separate free site — no shared backend, no shared cost.
- **Reusing a skill design:** the 40 examples and 58 technique recipes
  are a library, not a template. Pick the 2–3 closest examples per brief;
  borrow structure and precision, never copy brand names, copy, or exact
  layouts wholesale. Keep a note of which examples you used for each page
  so the next page does not repeat the same one.
- **Keep the look-and-fix habit:** every skill build gets a visual pass
  (screenshots via `scripts/shoot.py` if Playwright is installed, else
  manual) and both repo checklists. The first version is never the best
  one.

### What "maximise" does NOT mean

- It does not mean adding analytics, tracking, a backend, or a framework
  "because the skill can". Those are separate decisions, and most are
  rejected for this stack on purpose.
- It does not mean using the paid MotionSites library. The free skill's
  40 examples + 131-item shelf + 58 recipes are the working set.
- It does not mean publishing faster by skipping the checklists. The
  checklists are the product: they are what make a $0 page trustworthy.

---

## 10. What this guide could NOT document (source gaps)

Said plainly rather than invented:

- **Exact Claude Code invocation syntax** for the skill. The repo
  documents the copy → `~/.claude/skills/` → restart route and the skill
  name, but no slash-command or menu path.
- **Mac test results.** Everything was built and verified in this VM
  only (local HTTP serve + `curl`, 2026-11-05). The Mac preview/edit/use
  steps are written for macOS but untested on his Mac; the first Mac open
  is the visual check.
- **No "free Pro" templates.** None were downloaded or included in this
  repo (`SKILLS.md` §7: that category is where bundled binaries,
  obfuscated scripts, and licence traps live; any future candidate goes
  through the same SkillSpector + code-read process first). Do not go
  looking for one outside this guide.
- **The paid library's price or contents** beyond what the skill's docs
  state (500+ premium prompts, MCP, templates — paid, not included). No
  price is stated anywhere in the repo's docs.
- **Per-example quality rankings.** The repo counts and lists the 40
  examples but does not rank them; pick by closeness to your brief.
- **Lighthouse scores for a skill-built page.** The repo's speed targets
  are documented; no skill-built page has been measured against them
  yet. Run the speed checklist on every skill-built page before judging
  it.

---

## 11. File map (where everything lives)

```
websites/
├── HOW_TO_USE.md               This file
├── README.md                   What the repo is, the stack, the $0 table
├── SETUP.md                    Mac setup, editing, images, SEO, deploy, forms, troubleshooting
├── SKILLS.md                   Vetting record for every third-party item
├── index.html                  Example homepage (Growing Happy daycare)
├── 404.html                    Plain "page not found" page
├── robots.txt / sitemap.xml / site.webmanifest
├── css/custom.css              The design system (brand, layout, components)
├── js/main.js                  Vanilla JS: mobile nav, FAQ, mailto form, year
├── assets/img/                 logo.svg + favicon.svg (hand-drawn, tiny)
├── components/COMPONENTS.md    Reusable component catalogue (copy-paste)
├── checklists/PUBLISH_CHECKLIST.md   Pre-publish gates
├── checklists/SPEED_CHECKLIST.md     Lighthouse-style speed checklist
├── skills/motionsites-web-builder/
│   ├── USE.md                  Per-skill usage guide (this skill in depth)
│   ├── README.md               Vendored-skill record (vet, licence, sponsorship)
│   ├── SKILL.md                The skill itself (with repo guardrail header)
│   ├── examples/               40 example prompts — © MotionSites, never push publicly
│   ├── media/                  131-item shelf (contact sheets vendored; media remote-hosted) — © MotionSites
│   ├── references/             Spec template, techniques (58 recipes), craft, assets, builders, review
│   └── scripts/shoot.py        Screenshot + QA loop (needs Playwright, optional)
├── docs/scans/                 SkillSpector reports + motionsites-LICENSE.txt
├── .gitignore
└── LICENSE                     Apache License 2.0
```
