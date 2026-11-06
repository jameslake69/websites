# SETUP.md — Mac Setup, Editing, Images, SEO & Deploy

Everything here is $0 and runs in this VM or on Santiago's Mac. **Nothing has
been deployed and no account has been created.** Deploying, buying a domain,
and adding a form backend are approval-gated steps at the bottom of this file.

---

## 1. What you need on the Mac (basic path — no installs)

| Need | What to use |
|---|---|
| A browser | Safari or Chrome (either works; Chrome has Lighthouse built in — §6) |
| A text editor | **TextEdit in plain-text mode** (Format → Make Plain Text) for small text edits, or **VS Code** (free, from code.visualstudio.com) for regular work. Never edit HTML in Word/Pages — they add formatting that breaks the page. |
| A way to preview | Double-click `index.html`, or the local-server method in §2 |
| Nothing else | No Homebrew, no Node, no terminal, no account |

> Mac note: this Mac has no Homebrew, and this starter does not need it. Every
> step below works without it. The only step that ever mentions Node is the
> *optional* Tailwind compile (§5), and it uses the Node.js installer from
> nodejs.org — not Homebrew.

## 2. Preview the site

**Easiest (no terminal):** double-click `index.html`. It opens in the browser.
Everything works except one detail: the contact form's mailto still works,
but some browsers restrict nothing here — this page has no feature that
needs a server.

**Better (matches the live site):** in Terminal, from inside the folder:
```
python3 -m http.server 8000
```
then open `http://localhost:8000` in the browser. Stop with `Ctrl+C`.
macOS ships Python 3, so this needs no install.

**VM test note (2026-11-05):** the page was served this way in this VM and
checked with `curl`: `index.html`, `css/custom.css`, `js/main.js`,
`assets/img/logo.svg`, `assets/img/favicon.svg`, `404.html`, `robots.txt`,
`sitemap.xml`, and `site.webmanifest` all returned HTTP 200. The only
external request the page makes is the pinned Tailwind CDN script tag. The
page was not rendered in a browser in this VM, so treat the first Mac open as
the visual check (layout, colours, mobile menu, FAQ accordion).

## 3. Editing guide — where things live

| Change | File | How |
|---|---|---|
| Words on the page (headings, programs, FAQ, footer) | `index.html` | Edit the text between the tags. Do not delete the tags themselves. Keep one `<h1>` per page. |
| Business details (phone, email, address, hours, prices) | `index.html` + `js/main.js` | Search for `555`, `example.com`, `[Your`, `*` footnotes. Every placeholder is marked with `*` or `[…]`. Also update the JSON-LD block in `<head>`. |
| Contact email for tour requests | `js/main.js` | `CONTACT_EMAIL` near the bottom (currently `hello@example.com`). |
| Colours | `css/custom.css` | The `:root` variables at the top (`--brand-600`, `--sunny-400`, …). Change once, whole site follows. |
| Spacing / font size | `css/custom.css` | `--space-section`, `--wrap`, `body` font-size. |
| Favicon / logo | `assets/img/favicon.svg`, `assets/img/logo.svg` | Replace with your own SVG (or a 512×512 PNG for the favicon — update the `<link rel="icon">` line if you do). |
| A second page (e.g. `/programs.html`) | Copy `index.html` | Change `<title>`, description, canonical, and the `<h1>`; add the URL to `sitemap.xml`; add a nav link. Keep the same header/footer. |

**Editing rules that keep the site fast and correct:**
- Never paste text from Word/Google Docs straight into the HTML — paste as plain text first (stray formatting breaks tags and adds junk).
- Never invent a fact to fill a gap (a price, a ratio, a licence number, a testimonial). If you do not know it, write `[TODO: …]` and check the publish checklist.
- Keep images out of the repo until they are compressed (§4). A single 5 MB phone photo can double the page weight.
- Keep one `<h1>` per page. Sub-headings go `<h2>` then `<h3>` in order — skipping levels hurts SEO and screen readers.

## 4. Images — the speed rules (this is where most sites get slow)

Images are the #1 cause of slow pages. Rules:

1. **Use your own photos.** Your rooms, your staff (with permission), your
   work. Never hotlink someone else's images, and never use a photo you do
   not have the right to publish.
2. **Compress before adding — free, local, no account:** open
   [squoosh.app](https://squoosh.app) in the browser, drop the photo in,
   choose **WebP** (or AVIF if you want the smallest file), quality ~75–80,
   resize to the size it will actually display (see table). Download, then add
   the file to `assets/img/`. Nothing is uploaded to an account; Squoosh runs
   in the browser.
3. **Size it to its display size:**

   | Use | Display width | Export width | Target size |
   |---|---|---|---|
   | Hero photo | ~1100 px | 1600 px max | < 200 KB |
   | Card / program photo | ~550 px | 800 px | < 100 KB |
   | Small thumbnail / avatar | ~200 px | 400 px | < 40 KB |
   | Open Graph share image | 1200×630 | exactly 1200×630, JPG | < 300 KB |
4. **Responsive markup** — serve two sizes so phones do not download desktop
   images (copy this pattern, adjusting filenames):
   ```html
   <img src="assets/img/classroom-800.webp"
        srcset="assets/img/classroom-400.webp 400w, assets/img/classroom-800.webp 800w"
        sizes="(max-width: 640px) 100vw, 50vw"
        width="800" height="600"
        alt="Children playing with wooden blocks in the preschool room"
        loading="lazy">
   ```
5. **Always set `width` + `height`** — it stops the page jumping as images load (CLS).
6. **`loading="lazy"` on every image below the fold; never on the hero image.**
   The hero should use `fetchpriority="high"` instead.
7. **Alt text** describes the image for screen readers and Google: real
   description, not `image1.jpg`, not a keyword list.
8. **The OG image must be JPG/PNG** (1200×630) — social crawlers do not reliably read SVG/WebP. The template points at `assets/img/og-image.jpg`, which does **not** exist yet: create it before publishing or remove the `og:image` tags.
9. **Never add a stock-photo watermark, and never use AI-generated photos of
   real children or real premises as if they were real.** If an image is
   AI-generated decoration, say so in the publish checklist.

## 5. Optional: compile Tailwind for production (still $0, still optional)

The Play CDN tag in `index.html` is fine for a starter, but for a live site
it runs a compiler in every visitor's browser. Compiling once removes that
cost and makes the CSS file tiny. Do this once per site, when the design is
settled — not on day one.

1. Install Node.js (LTS) from **nodejs.org** (the macOS installer — no Homebrew needed).
2. In Terminal, inside the site folder:
   ```
   npm install -D tailwindcss@3.4.16
   npx tailwindcss -i ./css/tailwind-input.css -o ./css/tailwind.css --minify
   ```
   (`css/tailwind-input.css` is a two-line file with `@tailwind base;
   @tailwind components; @tailwind utilities;` — create it when you do this
   step; it is intentionally not shipped, so the starter stays dependency-free.)
3. In `index.html`, delete the two `<script>` tags for the Play CDN and the
   inline `tailwind.config`, and add:
   `<link rel="stylesheet" href="css/tailwind.css">`
4. Re-run the speed checklist (§6). The page must look identical.
5. **Pin the version** (`tailwindcss@3.4.16`) and re-vet before any upgrade
   (see `SKILLS.md` — the vetting rule applies to version bumps too).

If Node is not installed, or this step feels like friction, skip it — the CDN
version is acceptable for a low-traffic brochure site, and `css/custom.css`
means the page degrades gracefully.

## 6. SEO basics (already in the template — verify per page)

- [ ] One `<h1>`, descriptive `<title>` (≤ 60 characters), meta description
      (120–155 characters, written for humans, includes the town + service).
- [ ] `canonical` URL points at the real published URL (currently `example.com`).
- [ ] Open Graph + Twitter card tags present; `og:image` is a real 1200×630 JPG.
- [ ] JSON-LD schema matches the real business (type `ChildCare` for daycare;
      `RealEstateAgent` for real-estate pages; `Product` for an Etsy funnel
      page) — with real values only.
- [ ] `robots.txt` + `sitemap.xml` updated to the real domain; one `<url>` per page.
- [ ] Descriptive `alt` text on every photo; file names descriptive (`preschool-room.webp`, not `IMG_4421.jpg`).
- [ ] No keyword stuffing, no hidden text, no bought links. Ever.
- [ ] After publishing, check the page in Google Search Console (free) — optional, approval-gated account step, not done here.

## 7. Deploy options — documented only, nothing deployed

### Option A — GitHub Pages (recommended)
1. Create a GitHub repo (account step — not done here) and push this folder.
2. Repo → Settings → Pages → Source: Deploy from a branch → Branch: `main`, Folder: `/ (root)`.
3. Site goes live at `https://<username>.github.io/<repo>/`. Free.
4. A custom domain is optional: add a `CNAME` file with the domain, and a DNS
   `CNAME` record at the registrar. The domain purchase (~$10–15/year) is a
   separate decision.
5. Every `git push` redeploys automatically. No server to maintain.

### Option B — Netlify free tier
1. Drag the site folder onto [Netlify Drop](https://app.netlify.com/drop) (no repo needed), or connect the GitHub repo for auto-deploy on push.
2. Site goes live at `https://<name>.netlify.app`. Free tier covers these sites comfortably.
3. Netlify Forms is the easiest saved-enquiries form later (§8) — still a separate decision.

### Option C — Cloudflare Pages
Same shape as Netlify: connect the repo or drag-drop, free tier. Use it if you ever want Cloudflare's analytics (privacy-friendly, no cookies).

**Do not** deploy to a $5/month VPS, a shared host, or any paid plan for these
sites — there is no server-side work to pay for.

## 8. Forms that save enquiries — approval-gated, not wired

The template's form opens the visitor's email app and stores nothing. If you
want enquiries saved (a list you can reply to), the two $0 options are:

| Option | How | Notes |
|---|---|---|
| **Netlify Forms** | Add `data-netlify="true"` to the `<form>` and deploy on Netlify. Free tier: 100 submissions/month. | Easiest. Requires Netlify deploy (Option B). No key in the code. |
| **Formspree** | Create a form endpoint in Formspree (free tier: 50 submissions/month), set the form's `action` to it. | Works on any host, including GitHub Pages. Needs a Formspree account. |

Either one is a separate decision: it creates an account and a place where
visitors' personal data (names, emails, children's ages) is stored, so it
needs Santiago's explicit approval, a privacy note on the page, and a plan for
who reads the inbox. Do not wire either without that approval. Never collect
more than the form asks for, and never add a "subscribe me" checkbox that is
pre-ticked.

## 9. Troubleshooting

| Symptom | Fix |
|---|---|
| Page looks unstyled when double-clicked | The Tailwind CDN needs internet. Without it, `custom.css` still styles the page, but Tailwind utilities won't apply. Preview with `python3 -m http.server` (§2) or connect to the internet. |
| Changes don't show | Hard refresh: `Cmd+Shift+R` (Mac). Browsers cache CSS aggressively. |
| FAQ answers don't open | `js/main.js` failed to load — check the file is at `js/main.js` and there are no typos in the `<script src>` line. The page still reads fine without it. |
| Form does nothing | No email app is configured on the machine, or the browser blocked the `mailto:` pop-up. Use the phone/email links in the contact section instead, and consider §8. |
| Images look blurry | Exported too small — re-export at the display width in §4. |
| Page is slow | Run the speed checklist; the usual cause is an uncompressed photo. Re-run it through Squoosh. |
| `git` / deploy errors | The repo is local-only by design (`git init` + one commit, no remote). Adding a remote is Santiago's step, done only when he picks a host. |

## 10. What still needs Santiago

- [ ] Which site goes first (Growing Happy, real-estate page, or Etsy funnel).
- [ ] Real business details + real photos for that site.
- [ ] Domain: free subdomain vs custom domain (custom domain = ~$10–15/year purchase).
- [ ] Host: GitHub Pages vs Netlify (both $0; recommendation is GitHub Pages).
- [ ] Saved-enquiries form: yes/no, and which provider (§8).
- [ ] Whether to do the Tailwind compile step (§5) before first publish, or ship the CDN version and compile later.
