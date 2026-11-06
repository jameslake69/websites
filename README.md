# Websites — Fast, Modern, $0 Static Sites

A starter template for Santiago's small business sites — **Growing Happy
daycare**, real-estate pages, and Etsy funnel landing pages. One working
example page, no build step, no backend, no keys, no monthly cost.

**Stack picked: plain HTML + Tailwind Play CDN (pinned 3.4.16) + hand-written CSS.**
Read the "why" below before you reach for a framework.

---

## What it is

- A **static website**: files you can open by double-clicking, and publish by
  dragging a folder onto a free host. Nothing runs on a server.
- The example page (`index.html`) is a complete daycare homepage: header/nav,
  hero, trust bar, programs, why-us, testimonial, CTA banner, FAQ, contact /
  book-a-tour form, footer — with SEO basics (title, description, Open Graph,
  JSON-LD schema, `robots.txt`, `sitemap.xml`) already in place.
- Every component is copy-paste reusable. `components/COMPONENTS.md` is the
  catalogue; duplicate `index.html` and swap the text to make a second site
  (real-estate landing page, Etsy product funnel) in under an hour.

## The stack, and why this one

| Option | Verdict | Why |
|---|---|---|
| **Plain HTML + Tailwind Play CDN + custom CSS (picked)** | ✅ Primary | No build step, no install, opens anywhere. Tailwind utilities speed up layout; `css/custom.css` carries the real design so the page survives without the CDN. Fastest path to a high Lighthouse score: no framework JavaScript, no webfonts, no tracking. |
| Next.js | ❌ Rejected | Needs Node, `npm install`, a build step, and a host that runs builds — for a brochure page. Client JS by default works against speed. Revisit only if a site needs dynamic content or 10+ pages. |
| Static-site generators (Eleventy / Astro / Hugo) | ❌ Parked | Same build-step cost for no benefit at one-page scale. The upgrade path if the site count grows — not the starting point. |
| WordPress / Wix / Squarespace | ❌ Not used | Monthly cost, slower pages, plugin/update chores, and lock-in. The $0 target rules them out. |

**Why Tailwind via the Play CDN, and its honest limits:** the Play CDN is a
browser-side compiler — convenient for a starter, but it runs JavaScript on
every visit and is not Tailwind's production recommendation. That is why the
template is built so `css/custom.css` carries the design system and the CDN
is only an accelerator. For a live production site, compile Tailwind once and
drop the CDN tag (documented in `SETUP.md`, ~15 minutes, still $0). The CDN
file itself is pinned to **3.4.16** and vetted — see `SKILLS.md`. Do not bump
the version without re-vetting.

## What's inside

```
websites/
├── index.html                  Example homepage (Growing Happy daycare)
├── 404.html                    Plain "page not found" page
├── robots.txt                  Allows all crawlers, points to the sitemap
├── sitemap.xml                 One URL — add a block per page
├── site.webmanifest            Name/theme colour for "add to home screen"
├── css/custom.css              The design system (brand, layout, components)
├── js/main.js                  Vanilla JS: mobile nav, FAQ, mailto form, year
├── assets/img/                 logo.svg + favicon.svg (hand-drawn, tiny)
├── components/COMPONENTS.md    Reusable component catalogue (copy-paste)
├── checklists/SPEED_CHECKLIST.md    Lighthouse-style speed checklist
├── checklists/PUBLISH_CHECKLIST.md  Pre-publish gates (do this every time)
├── README.md                   This file
├── SKILLS.md                   Per-item vetting record (SkillSpector)
├── SETUP.md                    Mac setup, editing, images, SEO, deploy docs
├── skills/motionsites-web-builder/   Vendored Claude skill (see below)
├── docs/scans/                 SkillSpector reports for vetted items
├── .gitignore
└── LICENSE                     Apache License 2.0
```

**Vendored skill — MotionSites Web Builder:** `skills/motionsites-web-builder/`
is a vetted Claude skill (Motionsites-AI/claude-skill, SkillSpector 2.12.0
`--no-llm` 2026-11-06: 41/MEDIUM, 0 HIGH/0 CRITICAL, all 6 MEDIUMs false
positives — see `SKILLS.md` §5 and `skills/motionsites-web-builder/README.md`).
It teaches Claude to build cinematic single-file landing pages from 40 example
designs, 58 technique recipes, and a remote media shelf — a good fit for this
repo's zero-build stack. Two rules baked into the vendored copy: the skill's
"MotionSites upgrade block" is never appended to any delivery (Santiago's
standing rule), and the `examples/` + `media/` folders are © MotionSites and
must not be pushed to a public repo. Copy the skill folder into
`~/.claude/skills/` to use it in Claude Code (Santiago's step).

## What is NOT inside, and why

| Missing thing | Why it is missing |
|---|---|
| Real photos | No stock photos are bundled (licence risk, page weight). Add your own compressed photos — see `SETUP.md` image guide. The hero uses CSS/SVG art so the example is fast as shipped. |
| Real business details | Phone, email, address, hours, prices, ratios, licence number, and the testimonial are **placeholders** (`(555) 010-0000`, `example.com`). Replace every one before publishing — `checklists/PUBLISH_CHECKLIST.md` is the gate. |
| A working contact form backend | The form opens the visitor's email app (`mailto:`). Nothing is stored, nothing is sent by the site. A real saved-enquiries form (Formspree / Netlify Forms) is documented in `SETUP.md` — it is a separate, approval-gated decision. |
| Analytics / cookies / tracking | Deliberately absent. No Google Analytics, no Meta Pixel, no cookie banner needed. Add analytics only as a separate decision, and only the privacy-respecting kind. |
| A backend, database, or login | A brochure/funnel site does not need one. If a site ever needs bookings or payments, that is a new project, not a tweak to this template. |
| Node, npm, or a build step | The starter needs none of these. The optional Tailwind compile step in `SETUP.md` is the only place Node appears, and it is optional. |
| Any API key | None. There is nothing to key. If a file ever asks for one, stop — that is not this template. |

## $0 cost

| Item | Cost |
|---|---|
| Template (this repo) | $0 |
| Hosting — GitHub Pages or Netlify free tier | $0 |
| Domain | $0 **if** you use the free subdomain (`username.github.io` / `site.netlify.app`). A custom domain is ~$10–15/year from a registrar — optional, and a separate purchase decision. |
| Images (Squoosh compression) | $0 |
| Lighthouse / PageSpeed checks | $0 (built into Chrome) |
| **Total to go live on a free subdomain** | **$0** |

## Mac setup (summary — full steps in SETUP.md)

No Homebrew, no install, no terminal required for the basic path:

1. Copy this folder to your Mac.
2. Double-click `index.html` — it opens in your browser. That is the preview.
3. Edit text in `index.html` with any text editor (TextEdit in plain-text mode, or free VS Code).
4. Change colours in `css/custom.css` (`:root` variables at the top).
5. Change the contact email in `js/main.js` (`CONTACT_EMAIL` near the bottom).
6. Run `checklists/PUBLISH_CHECKLIST.md` and `checklists/SPEED_CHECKLIST.md`
   before anything goes live.

## Making a second site (real-estate / Etsy funnel)

1. Copy the whole folder, rename it (`real-estate-landing/`, `etsy-funnel/`).
2. In the copy, replace the hero, programs → services/offers, FAQ, and contact
   block using the snippets in `components/COMPONENTS.md` (it lists which
   components each site type needs).
3. Update `<title>`, meta description, Open Graph tags, JSON-LD schema type
   (`ChildCare` → `RealEstateAgent` / `Product`), `robots.txt`, `sitemap.xml`.
4. Run both checklists. Publish as a separate free site — no shared backend,
   no shared cost.

## Deploy options (documented only — nothing deployed, no accounts created)

- **GitHub Pages (recommended for Santiago):** push this folder to a GitHub
  repo → Settings → Pages → deploy from branch. Free, version-controlled, and
  the repo already lives in git. Full steps in `SETUP.md`.
- **Netlify free tier:** drag the folder onto Netlify Drop, or connect the
  repo for auto-deploy. Free tier covers these sites comfortably.
- **Cloudflare Pages:** same idea, free tier, if you ever want it.
- No account has been created and nothing has been deployed from this repo.
  Deploying is Santiago's approval-gated step.

## Speed (Lighthouse-style) — what "fast" means here

Targets in `checklists/SPEED_CHECKLIST.md`: Performance ≥ 90, LCP < 2.5s,
CLS < 0.1, no render-blocking webfonts, total page weight under ~500 KB
with real photos (the example as shipped is a few tens of KB). How it gets
there: no framework JS, system fonts, tiny CSS, one small JS file, SVG art
instead of a hero photo, and the image rules in `SETUP.md` for any photo
you add.

## Status

- ✅ Starter template built and verified locally in this VM (page serves over
  local HTTP, all local assets return 200, no console-blocking errors from
  local files — see `SETUP.md` test notes).
- ⏳ **Needs Santiago's pick/approval:** real business details for Growing
  Happy (or whichever site goes first), real photos, the domain choice
  (free subdomain vs custom domain), the deploy choice (GitHub Pages vs
  Netlify), and whether to add a saved-enquiries form. None of those are
  done here — publishing is approval-gated, as always.
- ⏳ **Not yet tested on his Mac:** the Mac preview/edit steps are written
  for macOS, but nothing has been copied to or run on his Mac from this repo.

## Licence

Apache License 2.0 — see `LICENSE`. You can reuse this template for any of
your sites, commercial included.
