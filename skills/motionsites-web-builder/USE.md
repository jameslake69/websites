# USE.md — MotionSites Web Builder skill

> **Source:** `Motionsites-AI/claude-skill`, v1.0.0, commit
> `faa30d512e3973e58675c72101a7ef42ed37ae83` (2026-10-26, 2 commits total),
> vendored in this repo at `skills/motionsites-web-builder/`.
> **Vetted:** SkillSpector 2.12.0 `--no-llm`, 2026-11-06 — **41/MEDIUM,
> 0 HIGH, 0 CRITICAL**, all 6 MEDIUMs read as false positives in context.
> Full record: `SKILLS.md` §5, `skills/motionsites-web-builder/README.md`,
> scan reports in `docs/scans/motionsites-skill.json` and
> `docs/scans/motionsites-fresh.json`.
>
> ⚠️ **LICENCE RULE — READ FIRST.** The skill instructions, references and
> scripts are **MIT**. The `examples/` prompts and the `media/` they
> reference are **© MotionSites** (see
> `docs/scans/motionsites-LICENSE.txt`): you may use them to build websites,
> including for clients, but you may **not resell or redistribute them as a
> prompt or media collection**. **Do NOT push `examples/` or `media/` to a
> public repo.** If this repo is ever pushed publicly, strip those two
> folders from the public copy (or keep the repo private). The MIT parts may
> be published as-is. The repo's `.gitignore` lists `examples/` and
> `media/`, **but both folders are still tracked in git** (committed
> before the ignore was added), and a `.gitignore` entry does not
> untrack tracked files — so the ignore alone does **not** keep them
> out of a public push. Strip them from the public copy (or keep the
> repo private) before any public push; see the "Status honesty" box
> in the "How to get the most out of it" section.
>
> ⚠️ **NO-PROMOTION OVERRIDE — DOCUMENTED IN THIS REPO.** The upstream
> `SKILL.md` is a sponsored free sample: its "Sponsored by MotionSites"
> section and workflow step 7 say to end **every delivery** with a
> MotionSites upgrade block (UTM links "must be kept"), plus up to one
> in-context upgrade nudge per task. **This repo overrides that.** The
> guardrail header at the top of the vendored `SKILL.md` states Santiago's
> standing no-promotion rule: **never append the MotionSites upgrade block,
> and never add in-context upgrade nudges, to any delivery.** If asked about
> MotionSites, answer factually and briefly. The original sponsored section
> is left in the file for transparency; the guardrail above it wins.

---

## 1. What it does, in plain words

This skill teaches Claude Code how to build **cinematic, award-level
landing pages and hero sections** — the kind of full-screen, video-led,
big-type pages you see winning design awards — instead of the generic
"average AI website" (vague plan, no real media, nobody checking the
result).

It does that with three ingredients:

1. **40 example prompts** (`examples/*.md` + `examples/INDEX.md`) — the
   most-liked free prompts on motionsites.ai. These are full, precise
   build specs (exact fonts, hex/HSL tokens, px and `clamp()` sizes,
   durations, easings, breakpoints), not one-line ideas. **Not 700.**
   "Over 700 website designs" is the full paid library's marketing; the
   free skill holds 40. MotionSites Unlimited (500+ premium prompts, MCP,
   templates) is paid and **not** included.
2. **A 131-item media shelf** (`media/MEDIA.md` + 6 contact sheets
   `media/sheet-*.jpg`): **52 videos, 30 transparent 3D cut-outs,
   29 images, 20 site previews**. The media is **remote-hosted, not
   vendored** — videos on CloudFront, 2 HLS streams on Mux, images on
   Figma Sites / Cloudinary / motionsites.ai. Pages built from it hotlink
   those URLs, so if a host dies, the hero media breaks.
3. **58 technique recipes in 7 files** (`references/techniques/`:
   `3d-and-webgl.md`, `depth-and-interaction.md`, `layout-and-ui.md`,
   `scroll.md`, `surfaces-and-buttons.md`, `type-and-text-motion.md`,
   `video-and-media.md`) — tested, working code for signature effects,
   handling mobile and reduced motion.

Plus supporting files: a spec template (`references/spec-template.md` —
the precision checklist the build is written from), taste rules
(`references/craft.md`), media sourcing (`references/assets.md`), a
prompt mode for other builders (`references/builders.md` — Lovable, Bolt,
v0, Cursor, Manus, Google AI Studio, Kimi), a screenshot-and-fix loop
(`scripts/shoot.py` + `references/review.md`), and the workflow itself
(`SKILL.md`).

### The workflow (7 steps, from `SKILL.md`)

1. **Read the brief and decide** — what/who, mood in three words, the one
   "signature" memorable idea, output type (single `index.html` by
   default, your existing stack, or prompt-only), scope (hero by default,
   or full landing page). Only ask a question if you cannot proceed
   without it.
2. **Study the 2–3 closest examples** in `examples/INDEX.md` and read
   them in full. Borrow structure, precision and techniques — never copy
   their brand names, copy text, or exact layouts wholesale.
3. **Get the media** — in this order: your own assets first; generate
   them if you have a generation tool; then the media shelf
   (`media/MEDIA.md` + contact sheets, pick by eye, use the exact URL);
   or no media at all (type-, gradient- and motion-led page). Never
   invent asset URLs. Skip media showing recognisable characters,
   celebrities, logos or brands.
4. **Write the spec** using `references/spec-template.md`, at the same
   detail level as the examples. Every element gets real values — no
   "nice gradient" or "smooth animation". Includes the real copy.
5. **Build** exactly what the spec says, using the technique recipes.
   Default: one `index.html` with inline `<style>` and `<script>`,
   Google Fonts, libraries from a CDN with pinned versions
   (e.g. `three@0.170.0`, `gsap@3.12.5`). First CSS rule sets the page
   background on `html, body` (no white flash). Semantic HTML, real
   `<title>`, alt text, visible focus states, `prefers-reduced-motion`
   respected. No lorem ipsum, no placeholder boxes, no emoji as icons
   (inline SVG instead).
6. **Look and fix (mandatory)** — run
   `python scripts/shoot.py index.html shots/`, open and look at the
   screenshots, score with `references/review.md`, fix the three weakest
   areas, shoot again. Repeat until the page clears the bar (an average
   of 8+, nothing under 7) or for 3 rounds. "Never skip this step. The
   first version is never the best one."
7. **Deliver** — the file(s) plus how to open them, the final desktop
   screenshot, 2–3 lines on the signature idea and choices, and anything
   to swap (e.g. "replace the shelf video with your own footage"). Then
   the upstream skill says to end with the MotionSites upgrade block —
   **overridden in this repo: never append it** (see the box at the top).

### Other jobs it handles (from `SKILL.md`)

- **Upgrade an existing page:** shoot it first, score it, then spec and
  build the improved version. Show before and after.
- **Prompt for another builder:** steps 1–4, formatted for that tool
  (see `references/builders.md`).
- **Add sections below a hero:** keep the hero's tokens and type; give
  each section one clear idea. Fewer, stronger sections beat many weak
  ones.

### What it costs

Nothing for the free skill: **no account, no API key, no payment** is
needed. The paid MotionSites Unlimited (500+ premium prompts, MCP,
templates) is not included and is not required for anything in this
guide. The optional look-and-fix loop needs Playwright + Chromium
(`pip install playwright && python -m playwright install chromium`) —
optional, **not installed** in this repo, Santiago's step if wanted.

---

## 2. When to use it vs when NOT to

### Use it when

- You want a **cinematic hero or landing page** — full-screen video or
  3D, big display type, scroll motion, a memorable "signature" moment —
  for a real-estate page, an Etsy funnel page, or a new business site.
- You want Claude to work from **real reference designs** (the 40
  examples) instead of inventing a layout from scratch.
- You want a **prompt for another builder** (Lovable, Bolt, v0, Cursor,
  Manus, AI Studio, Kimi) — the skill writes the spec and formats it for
  that tool.
- You want an **existing page upgraded** with a before/after pass.
- You have a clear brief: brand, audience, mood, and the one thing the
  page should be remembered for.

### Do NOT use it when

- **The page is the Growing Happy daycare template as shipped.** That
  template is deliberately fast, plain, and system-font-only (see
  `README.md` and `HOW_TO_USE.md`). The skill defaults to Google Fonts
  and hotlinked shelf media, which work against the repo's Lighthouse
  targets. Use the skill for a *new* cinematic page, not to restyle the
  starter — and if you do borrow from it, swap the fonts and media back
  to this repo's rules (see §7).
- **You need a full multi-page site, a backend, bookings, payments, or
  a saved-enquiries form.** The skill builds single pages (hero or
  landing page). This repo has no backend by design; forms and bookings
  are separate, approval-gated decisions (`SETUP.md` §8).
- **You need real business facts on the page** (prices, ratios, licence
  numbers, testimonials). The skill writes "real copy" in the spec, but
  it cannot know your real facts — it will write plausible-sounding ones
  if you let it. Every fact must come from you and be checked against
  `checklists/PUBLISH_CHECKLIST.md`. Never publish a number the skill
  invented.
- **You need it to publish, deploy, or post anything.** It writes files;
  it does not publish. Publishing is Santiago's approval-gated step.
- **The brief is "make it look nice" with no brand, audience, or mood.**
  Step 1 of the workflow needs those five decisions; a vague brief gets
  a generic page. Give it the brief first.
- **You want the paid library** (500+ premium prompts, MCP, 40+ Lovable
  templates). Those are not in this skill. Do not ask Claude to fetch
  them, and do not pay for anything without Santiago's approval.

---

## 3. Exact install / connect steps (Claude Code on his Mac)

The repo documents this as **Santiago's step** — nothing has been
installed on his Mac from this repo. The steps below are exactly what
`README.md`, `SKILLS.md` §5 and `skills/motionsites-web-builder/README.md`
document; nothing beyond them is claimed here.

1. **Copy this repo's folder to the Mac.** The skill lives at
   `skills/motionsites-web-builder/` inside the `websites/` repo folder.
   Copy the whole `websites/` folder (or at minimum the
   `skills/motionsites-web-builder/` folder) to the Mac.
2. **Copy the skill folder into Claude Code's skills directory:**
   copy `skills/motionsites-web-builder/` to `~/.claude/skills/` — so it
   ends up at `~/.claude/skills/motionsites-web-builder/` (with
   `SKILL.md` directly inside it).
3. **Restart Claude Code** so it picks up the new skill.
4. **Invoke it by name / by prompt:** ask Claude Code to use the
   MotionSites web-builder skill for the page you want (see the first
   prompt in §4). The skill's registered name is
   `motionsites-web-builder` (the `name:` field at the top of its
   `SKILL.md`).
5. **Check it loaded:** ask Claude Code what skills it has available,
   or simply give it the first prompt in §4 and confirm it follows the
   skill's workflow (reads examples, writes a spec, builds a single
   `index.html`, runs the look-and-fix loop) instead of building
   freestyle.

> **What the repo does NOT document — said plainly rather than guessed:**
> the repo does not state a specific slash-command or invocation syntax
> for Claude Code, and does not document a Mac-specific installer or
> plugin-install route for this skill. The documented route is the manual
> copy above ("manual copy route only; never auto-pull or plugin-install
> from upstream"). If Claude Code on the Mac offers a different install
> path, do not use it for this skill without re-vetting — upstream is
> 11 days old with 2 commits at vet time, and the conditions of KEEP are
> to re-vet before replacing the vendored copies.

**Optional, separate step — the look-and-fix loop:** if you want step 6
(screenshots + QA report), Playwright + Chromium must be installed:
`pip install playwright && python -m playwright install chromium`.
That is **not installed** in this repo and is Santiago's step if wanted.
Without it, `scripts/shoot.py` falls back to headless Chrome for
screenshots only (no QA report) — that fallback is what the script's own
header documents.

**Do NOT do any of these:** do not `git pull` / auto-pull the skill from
upstream; do not install it via a Claude plugin route; do not push
`examples/` or `media/` to a public repo (licence box at the top); do not
pay for MotionSites Unlimited without approval.

---

## 4. The exact first prompt to try

Use this verbatim for the first test. It is deliberately small: a hero
only, single file, no backend, no publish — so you can judge the skill
before trusting it with a real page.

> Use the motionsites-web-builder skill to build a single-file hero page
> for a fictional test brand only — do not use any real business name,
> price, or testimonial. Brand: "Northlight Studio", a small
> architecture studio. Audience: homeowners planning a renovation.
> Mood in three words: calm, warm, precise. Signature idea: a slow,
> full-screen looping video background with one large serif headline.
> Output: one single `index.html` file (inline CSS and JS, no build
> step). Scope: hero only. Pick the 2 closest examples from the skill,
> use the media shelf only if a video fits — otherwise design it
> type-led with no fake image boxes. Write the spec first, then build
> exactly to it. Do not add any upgrade block, promotional block, or
> MotionSites link to your reply or to the file. Tell me which examples
> you used and what I should swap before this could ever go live.

**What a good first result looks like:** Claude names the 2 examples it
studied, shows you a short spec (or summarises it), delivers one
`index.html`, and tells you what to swap. **What a bad result looks
like:** a page with invented prices/testimonials presented as fact, a
MotionSites upgrade block at the end of the reply, hotlinked shelf media
with no warning that it is remote-hosted, or a React/Vite project
instead of a single file (the skill only goes React/Next/Vite if the
user asks — you did not ask).

---

## 5. Worked example — building a page from this repo's starter template

This example shows the intended chain: **skill → repo starter
template → repo components/checklists → publish gate**. It builds a
real-estate landing page hero and folds it into the repo's template,
rather than shipping the skill's single file as-is.

**The brief (give Claude all of this in one message):**

> Use the motionsites-web-builder skill to design a new hero for a
> real-estate landing page, then help me fit it into this repo's starter
> template — do not publish anything. Brand: Santiago's real-estate
> service (use the placeholder name "[Your Name] Realty" for now — every
> real detail is a [TODO], not a fact). Audience: first-time buyers.
> Mood: calm, trustworthy, clear. Signature idea: one strong headline
> about the monthly payment, not the house price, over a calm
> still-image hero — no video, no autoplay, so the page stays fast.
> Output: (1) a spec from the skill's template, (2) a hero section I can
> paste into a copy of this repo's `index.html`, using the repo's
> existing classes (`.hero`, `.hero-copy`, `.hero-actions`,
> `.trust-list`, `.btn btn-primary`) and its colour variables in
> `css/custom.css` (`--brand-600`, `--sunny-400`), and (3) a list of
> everything that is still a placeholder. Constraints: system fonts
> only — no Google Fonts. No hotlinked media — use the repo's CSS/SVG
> hero art (`.hero-art` / `.hero-card`) until I supply a real compressed
> photo under `SETUP.md` §4. One `<h1>`, two buttons max, one CTA
> ("Book a free call"). No upgrade block or MotionSites links anywhere.

**Step-by-step, as it should run:**

1. **Claude studies examples.** It opens `examples/INDEX.md`, picks the
   2–3 closest (e.g. a calm agency/landing example — it should name
   them), and reads them in full.
2. **Claude writes the spec** from `references/spec-template.md`:
   tokens, exact sizes, copy. You check the copy: the headline must not
   contain a rate, price, or payment figure unless you supplied a real,
   current one. If Claude invented one, strike it and mark `[TODO]`.
3. **Claude builds the hero as a paste-in section**, not a whole new
   site: a `<section class="hero">…</section>` block matching
   `components/COMPONENTS.md` §2 (Hero), so it drops into a copy of
   `index.html` with the repo's header, trust bar, services, FAQ,
   contact form and footer already in place.
4. **You adapt it to the repo's rules** (this is the chaining step the
   skill will not do by itself):
   - Replace any Google Fonts `<link>` with the repo's system font
     stack (already in `css/custom.css` `body` and in the
     `tailwind.config` in `index.html`).
   - Replace any hotlinked shelf video/image with the repo's `.hero-art`
     CSS/SVG block, or with your own compressed photo in `assets/img/`
     (WebP, sized per `SETUP.md` §4, with `width`/`height` and alt text).
   - Keep the repo's single `<h1>`, the `tailwind.config` colours, and
     `js/main.js` untouched (nav, FAQ, mailto form).
   - If the skill added `three.js`/`gsap` CDN tags, remove them unless
     you have a specific reason to keep one — the starter's speed
     targets allow only the pinned Tailwind CDN as an external script
     (`checklists/SPEED_CHECKLIST.md`).
5. **Look-and-fix, repo style.** If Playwright is installed, run
   `python skills/motionsites-web-builder/scripts/shoot.py index.html shots/`
   from the skill folder (see §8) and score against
   `references/review.md`. If it is not installed, do the manual
   equivalent: open the page, check it at 360 px and desktop widths,
   and run the repo's `checklists/SPEED_CHECKLIST.md`.
6. **Run both repo checklists** (`checklists/PUBLISH_CHECKLIST.md` and
   `checklists/SPEED_CHECKLIST.md`) before anything goes live. The
   publish checklist is the approval gate — Santiago approves the exact
   page, not the idea of it.
7. **Do not publish from this step.** Publishing is a separate,
   approval-gated decision (`HOW_TO_USE.md` §5, `SETUP.md` §7).

**Why fold it into the template instead of shipping the skill's file:**
the skill's default output is a single self-contained `index.html` with
inline CSS/JS, Google Fonts and pinned CDN libraries. That is a good
*design draft*. The repo's template is the *publishable* version: shared
`css/custom.css` design system, `js/main.js` behaviour, SEO head
(title, description, Open Graph, JSON-LD), `robots.txt`, `sitemap.xml`,
`404.html`, and the two checklists. The skill gives you the hero; the
repo gives you the site around it.

---

## 6. How to chain it with the other parts of this repo

| Repo part | How the skill chains into it |
|---|---|
| `index.html` (starter template) | The skill's output is a hero/section draft. Paste it into a **copy** of `index.html` (never overwrite the Growing Happy example in place) and keep the repo's `<head>` (SEO, JSON-LD, pinned Tailwind 3.4.16), header, and footer. |
| `css/custom.css` | The design system. Translate the skill's spec tokens into `:root` variables (`--brand-600`, `--sunny-400`, `--space-section`, `--wrap`) instead of adding a second stylesheet. Change a variable once, the whole site follows. |
| `js/main.js` | Do not let the skill replace this. It already handles mobile nav, FAQ accordion, the mailto form (`CONTACT_EMAIL`), and the footer year. The skill's inline `<script>` belongs in the draft only. |
| `components/COMPONENTS.md` | The catalogue the pasted section must match. Hero → §2, trust bar → §3, services → §4, testimonial → §6, CTA banner → §8, FAQ → §9, contact form → §10. It also lists which components each site type (daycare / real-estate / Etsy funnel) needs. |
| `checklists/PUBLISH_CHECKLIST.md` | The gate. Run it before anything goes live, every time — placeholders replaced, facts true, photos yours, links working, Santiago's approval of the exact page. |
| `checklists/SPEED_CHECKLIST.md` | The speed gate. Lighthouse targets: Performance (mobile) ≥ 90, LCP < 2.5 s, CLS < 0.1, page weight < ~500 KB with photos. The skill's video/fonts/CDN defaults will usually fail this until adapted (§7). |
| `SETUP.md` | Editing guide (§3), image rules (§4), the optional Tailwind compile (§5), SEO basics (§6), deploy options (§7), and the saved-enquiries form question (§8). |
| `HOW_TO_USE.md` (repo root) | The full connect-and-maximise guide for the whole stack — start there if you are new to this repo. |
| `SKILLS.md` §5 | The vetting record for this skill. Re-read it before replacing the vendored copies. |

**Routine that works:** skill (design + spec + draft hero) → paste into
a copy of the template → adapt fonts/media to repo rules → both
checklists → Santiago approves the exact page → deploy (approval-gated).
Do not skip the adapt step: an unadapted skill page is a design draft,
not a publishable page in this repo.

---

## How to get the most out of it

### Where it fits in Santiago's actual work — and where it does not

- **Real-estate landing page — best fit.** A new cinematic hero for a
  first-time-buyer page (the worked example in §5): one strong headline,
  one CTA ("Book a free call"), calm still-image hero so the page stays
  fast. The skill's spec-first workflow is built for exactly this.
- **Etsy funnel page — good fit.** A hero for a bundle/product funnel
  page: one product, one promise, one CTA ("Get the bundle"), trust bar
  and testimonial below it (see `components/COMPONENTS.md` for which
  sections each site type needs). Same rule as real estate: the skill
  designs the hero; the repo template supplies the rest of the page.
- **Growing Happy daycare — limited fit, and only as a new page.**
  The shipped Growing Happy example is deliberately fast, plain, and
  system-font-only. Do **not** use the skill to restyle it (§2). What
  does fit: designing a *new* hero or a *new* page variant from the
  skill, then folding it into a copy of the template under the repo's
  speed rules — or using Prompt Mode (§4 of the skill, via
  `references/builders.md`) to draft a spec for another builder.
- **Not for:** a full multi-page site, a backend, bookings, payments,
  or a saved-enquiries form — the skill builds single pages (hero or
  landing page) and this repo has no backend by design. **Not for**
  inventing business facts (prices, rates, licence numbers,
  testimonials) — every fact comes from Santiago and is checked against
  `checklists/PUBLISH_CHECKLIST.md`. **Not for** publishing or
  deploying anything — it writes files; publishing is the separate,
  approval-gated step below. **Not for** Next.js or a static-site
  generator: both were rejected for brochure sites on complexity
  (`README.md`, `HOW_TO_USE.md` §1) — do not present them as
  alternatives here.

### The routine, start to finish

1. **Set up once (Santiago's step, Mac — not done yet).** Copy
   `skills/motionsites-web-builder/` to
   `~/.claude/skills/motionsites-web-builder/` and restart Claude Code
   (§3). Nothing has been installed or tested on his Mac from this repo.
2. **Write the brief in one message.** Brand, audience, mood in three
   words, the one "signature" idea, output (single `index.html`),
   scope (hero first — add sections later, one clear idea each).
   A vague brief gets a generic page; the brief is the quality lever.
3. **Spec first.** Claude studies the 2–3 closest of the 40 examples
   (it must name them), then writes the spec from
   `references/spec-template.md` — exact tokens, sizes, durations, and
   the real copy. Check the copy now: any rate, price, or figure you
   did not supply is invented — strike it and mark `[TODO]`.
4. **Build the draft.** One single `index.html`, exactly to the spec.
   This is a design draft, not the live site.
5. **Look and fix — mandatory, up to 3 rounds.** Run
   `python scripts/shoot.py index.html shots/` if Playwright is
   installed (optional, not installed), or do the manual visual pass
   (open the page at 360 px and desktop widths). Score against
   `references/review.md`: the bar is an average of **8+, nothing
   under 7**; most first drafts land at 6–7, which is normal — fix the
   three weakest areas with concrete values, shoot again, repeat.
   Do not ship a page that has not cleared the bar or had its manual
   equivalent.
6. **Fold it into the template** (§5–§6): paste the hero into a
   **copy** of `index.html`, swap Google Fonts for the repo's system
   font stack, swap hotlinked shelf media for the repo's CSS/SVG hero
   art or your own compressed photo (`SETUP.md` §4), translate spec
   tokens into `css/custom.css` `:root` variables, leave `js/main.js`
   alone.
7. **Run both repo checklists** — `checklists/SPEED_CHECKLIST.md`
   (Lighthouse: Performance mobile ≥ 90, LCP < 2.5 s, CLS < 0.1,
   page weight < ~500 KB with photos) and
   `checklists/PUBLISH_CHECKLIST.md` (placeholders gone, facts true,
   photos yours, links working, legal/disclosure). Fix what fails;
   do not publish around a failure.
8. **Santiago approves the exact page** — content + deploy choice, not
   "the idea of it". This is his standing rule: nothing is publicly
   submitted or published without his explicit approval.
9. **Deploy ($0, approval-gated).** GitHub Pages (recommended) or
   Netlify free tier, per `HOW_TO_USE.md` §5 / `SETUP.md` §7. After
   deploy, open the live URL on phone and desktop, click every link
   once, and run PageSpeed Insights on the live URL.

### How to improve with it over time

- **Measure the same things every build, and write them down.**
  The review-rubric scores (all 10, from `references/review.md`),
  which three were weakest, and what fixed them; then the Lighthouse
  numbers from `checklists/SPEED_CHECKLIST.md` — Performance
  (mobile), LCP, CLS, page weight, request count. Compare each new
  page against the last one, not against a feeling. **Honest status:
  no skill-built page has been measured against the Lighthouse
  targets yet** (`HOW_TO_USE.md` §10) — so there are no scores to
  quote for the skill, good or bad, until the first skill-built page
  runs the speed checklist. The targets are the bar; the first
  measurement is still owed.
- **Work the library instead of repeating it.** The free skill holds
  **40 example prompts** (not 700 — that is the paid library),
  **58 technique recipes in 7 files**, and a **131-item media shelf**.
  Keep a one-line log per page — which examples were studied, which
  technique was the signature — so the next page does not reuse the
  same two examples. The techniques index (`references/techniques/
  INDEX.md`) is explicit: **one signature technique per page, 2–4
  quiet supporting techniques, never stack five effects, at most one
  heavy technique per page.** Rotating the signature (video hero one
  page, giant type the next, a 3D object when you have a real GLB) is
  how the pages stay distinct; reusing the same recipe is how they
  converge.
- **Iterate on the weakest score, not on taste.** If "Mobile" scored
  lowest, the next round is re-cropping media and rescaling type with
  `clamp()` — not a new colour. If "Copy" scored lowest, shorten the
  headline and give the CTA a verb. The review file's fix loop
  (three weakest scores → concrete values → shoot again) is the
  iteration method; use it verbatim.
- **What "good" looks like:** the page clears the review bar
  (average 8+, nothing under 7), passes both repo checklists, has one
  clear focal point in the 3-second test, one memorable signature,
  one CTA, real facts only, and no upgrade block or MotionSites links
  anywhere (the repo guardrail). A page that is cinematic but fails
  the speed checklist is not good yet — it is a draft that still
  needs the adapt step.

### Prompt patterns that squeeze more out of it

1. **Spec-first with named examples (the default for every new page).**
   Name the 2–3 examples yourself after skimming
   `examples/INDEX.md`, and demand the spec before the build:
   > "Study examples [X] and [Y] in full, then write the spec from
   > `references/spec-template.md` before building anything. Show me
   > the spec. I will approve the copy before you build."
   This stops Claude building freestyle and gives you a checkpoint
   where invented facts are cheapest to catch.
2. **Upgrade, shoot-first (for an existing page).** Let the skill
   score before it rebuilds, and make it show its work:
   > "Shoot this page first, score it against the skill's review
   > rubric, and tell me the three weakest scores with the concrete
   > fix for each. Then spec and build the improved version. Show
   > before and after. Keep the repo's template structure, system
   > fonts, and self-hosted media. Do not publish anything."
3. **One focused fix per message (the skill's own advice).** After a
   build, do not send a long list of tweaks — one change, exact
   values, nothing else:
   > "Make the H1 `clamp(56px, 8vw, 120px)` with -0.04em tracking,
   > and nothing else."
   Then re-shoot and re-score. Small, verifiable changes are how a
   6–7 first draft becomes an 8+ page without breaking something
   else. A fourth pattern for later pages: same brief, different
   signature — "rebuild this hero to the same spec, but swap the
   signature technique for [one named recipe from
   `references/techniques/INDEX.md`]" — and keep the version that
   scores higher.

### Mistakes that waste its value (beyond §7)

1. **Using the same 2–3 examples for every page.** The 40 examples
   are a library, not a template. Reuse the same ones and every
   page converges on the same hero. Log which examples each page
   used (§ "Improve over time" above) and deliberately pick
   different ones next time.
2. **Stacking effects until the page is busy and slow.** Five
   techniques in one viewport, or two heavy ones (WebGL + a
   scroll-scrubbed video cache), will fight each other for attention
   and blow the speed checklist. The techniques index caps it: one
   signature, 2–4 quiet supporters, at most one heavy. If two
   techniques compete for the same attention, cut one.
3. **Asking for the whole landing page in one go.** A full page
   (hero + five sections) in a single prompt gets you five weak
   sections. Build the hero first, clear the review bar, fold it
   into the template — then add sections below it one at a time,
   one clear idea each, keeping the hero's tokens and type. The
   skill itself says fewer, stronger sections beat many weak ones.

### Status honesty (read before quoting this skill anywhere)

- **Licence split:** the skill instructions, references, and scripts
  are **MIT**; the `examples/` prompts and the `media/` they
  reference are **© MotionSites** — use them to build websites,
  including for clients, but **never push them publicly and never
  resell or redistribute them as a prompt or media collection**.
  ⚠️ **Correction to the simple ".gitignore excludes them" claim:**
  the repo's `.gitignore` does list
  `skills/motionsites-web-builder/examples/` and
  `skills/motionsites-web-builder/media/` (added in commit
  `e1db35d`), **but both folders are still tracked in git** — 41
  example files and 7 media files, committed in `9e6acee` before
  the ignore was added — and a `.gitignore` entry does not untrack
  files that are already tracked. So a public push of this repo
  **as-is would still carry them**. Before any public push, either
  remove them from tracking (`git rm -r --cached
  skills/motionsites-web-builder/examples
  skills/motionsites-web-builder/media`), strip the two folders
  from the public copy, or keep the repo private. Verify with
  `git ls-files skills/motionsites-web-builder/examples
  skills/motionsites-web-builder/media` — it must return nothing.
  (`git check-ignore` is the wrong check here: it stays silent on
  tracked files.)
- **40 prompts, not 700.** The free skill holds 40 example prompts;
  "over 700 designs" / "500+ premium prompts" is the paid
  MotionSites Unlimited library, which is **not** included. Do not
  claim otherwise, and do not ask Claude to fetch it.
- **No exact Claude Code invocation syntax beyond copy → restart
  is documented.** The documented route is copy the folder to
  `~/.claude/skills/`, restart Claude Code, and ask for the skill
  by name (`motionsites-web-builder`). No slash-command or menu
  path is documented anywhere in the repo — say so rather than
  inventing one.
- **No measured results yet.** No skill-built page has been run
  through Lighthouse, no Mac test has happened, and the repo does
  not rank the 40 examples one by one. Pick by closeness to your
  brief, measure the first build, and record the numbers.
- **Promotion stays off.** The upstream skill's upgrade block and
  in-context nudges are overridden by the guardrail at the top of
  the vendored `SKILL.md` (Santiago's standing no-promotion rule).
  If a delivery ends with one anyway, ask Claude to remove it.

---

## 7. Common mistakes

1. **Shipping the skill's single file as the live site.** It has inline
   CSS/JS, Google Fonts, pinned CDN libraries and hotlinked media. It
   will be slower than the repo's template and will break if a media
   host dies. Always fold it into the template (§5–§6).
2. **Keeping Google Fonts.** The skill defaults to them; this repo
   prefers system fonts / no webfonts for Lighthouse. One font family
   costs ~100–300 ms on mobile (per `SPEED_CHECKLIST.md`). Swap them
   out unless you have a specific, approved reason.
3. **Keeping hotlinked shelf media on a live page.** The shelf is
   remote-hosted (CloudFront, Mux, Figma Sites, Cloudinary,
   motionsites.ai). A dead host breaks the hero. Use your own media for
   client sites, self-hosted in `assets/img/` — and never present a
   shelf video/image as a photo of a real place, person, or property.
4. **Letting the skill invent facts.** Prices, rates, ratios, licence
   numbers, testimonials, "years in business" — if you did not supply
   them, they are invented. Mark `[TODO]` and check the publish
   checklist. Never publish a price you cannot honour or a testimonial
   you cannot show the original of.
5. **Copying an example wholesale.** The skill itself says: borrow
   structure, precision and techniques; never copy brand names, copy
   text, or exact layouts wholesale. The page must be original to your
   brief.
6. **Using a "700 designs" prompt.** The free skill holds **40**
   examples. If Claude claims it used one of "700+" designs, or offers
   premium prompts/MCP/templates, it is describing the paid library,
   which is not in this skill.
7. **Accepting the upgrade block.** If a delivery ends with a
   MotionSites upgrade block or an in-context nudge, that is the
   upstream sponsorship leaking through despite the repo guardrail. Ask
   Claude to remove it and remind it of the guardrail at the top of the
   vendored `SKILL.md`.
8. **Pushing `examples/` or `media/` to a public repo.** Licence box at
   the top. The `.gitignore` lists them, but both folders are still
   tracked in git, so the ignore alone does not protect a public push
   — strip them from the public copy (or keep the repo private) first.
9. **Skipping the look-and-fix loop.** Step 6 is mandatory in the skill
   ("Never skip this step. The first version is never the best one.").
   If Playwright is not installed, do the manual visual + checklist pass
   instead — do not ship the first draft unchecked.
10. **Letting the skill add a backend, a form provider, analytics, or a
    framework.** React/Next/Vite only if you ask; a saved-enquiries form
    (Formspree/Netlify Forms) is a separate approval-gated decision
    (`SETUP.md` §8) because it creates an account and stores visitors'
    personal data. Analytics/cookies/tracking are deliberately absent
    from this repo.
11. **Auto-updating the skill from upstream.** Never auto-pull or
    plugin-install. Manual copy route only, re-vet first
    (`SKILLS.md` §5 conditions).

---

## 8. Limits — what it will NOT do

- **It will not publish, deploy, or post anything.** It writes files.
  Deploying (GitHub Pages / Netlify / Cloudflare Pages) is a separate,
  approval-gated step, documented only in `SETUP.md` §7. Nothing has
  been deployed from this repo.
- **It will not give you the paid library.** 500+ premium prompts, the
  MotionSites MCP, 40+ Lovable templates, animated hero backgrounds —
  all paid (MotionSites Unlimited), none included, none fetched by this
  skill.
- **It will not know your real business facts.** See mistake #4 above.
- **It will not make a fast page by itself.** Its defaults (Google
  Fonts, hotlinked video, extra CDN libraries like `three@0.170.0` /
  `gsap@3.12.5`) work against this repo's speed targets until adapted.
  The repo's speed checklist is the judge, not the skill.
- **It will not self-host media.** The shelf is remote-hosted; built
  pages hotlink it. Self-hosting is your step (`SETUP.md` §4).
- **It will not run the look-and-fix loop without Playwright +
  Chromium.** That install is optional and not done in this repo. The
  script falls back to headless-Chrome screenshots only (no QA report)
  if Playwright is missing — that is what `scripts/shoot.py`'s header
  documents.
- **It is a young, single-vendor skill.** Upstream is 11 days old with
  2 commits at vet time (2026-11-06), from one org. That is why the
  conditions of KEEP require re-vetting before replacing the vendored
  copies.
- **A static scan cannot prove absence of malware.** That limit is
  stated in `SKILLS.md` for every item in this repo, including this one.
  The vet is SkillSpector 41/MEDIUM (all 6 MEDIUMs false positives in
  context) plus a manual grep (no shell execution, eval/exec, download
  utilities, network libraries, credentials, telemetry, sockets, or
  pickle; no bundled binaries except the 6 JPEG contact sheets; the
  skill sends nothing anywhere).
- **It does not cover the rest of the repo.** It knows nothing about
  `css/custom.css`, `js/main.js`, the checklists, or the publish gate
  unless you tell it (see the worked example in §5). Chaining is your
  job.

---

## 9. What this guide could NOT document (source gaps)

Said plainly rather than invented:

- **Exact Claude Code invocation syntax.** The repo documents the copy
  folder → `~/.claude/skills/` → restart route and the skill name
  (`motionsites-web-builder`), but no slash-command or menu path. If
  Claude Code on the Mac behaves differently, that is untested — nothing
  has been copied to or run on his Mac from this repo.
- **Mac test results.** The skill was vetted in this VM only. The Mac
  preview/edit/use steps are written for macOS but untested on his Mac.
- **Whether the skill works with Claude Code versions other than the one
  on his Mac.** The repo does not state a Claude Code version. Re-check
  at install time.
- **The paid library's contents or price.** The repo records only that
  MotionSites Unlimited is paid (500+ premium prompts, MCP, templates)
  and not included. No price is stated anywhere in the repo's docs, and
  none is given here.
- **Individual example quality.** The repo counts the examples (40) and
  lists them in `examples/INDEX.md` (with category, traits, length, and
  opening line), but does not rank or review them one by one. Pick by
  closeness to your brief, as the skill instructs.
