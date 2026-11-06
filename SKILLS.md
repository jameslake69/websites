# SKILLS.md — Vetting Record (websites repo)

**Rule applied:** every third-party skill/template is vetted with NVIDIA
SkillSpector **2.12.0 `--no-llm`** (isolated venv at
`~/workspace/security-scans/skillspector-venv`) **and** read in context
**before** it is included. The headline score alone is never the verdict.
Only items whose in-context verdict is **KEEP / USE / clean** are included
in this repo. Nothing here was installed on Santiago's Mac; all work is in
this VM only.

**Scanner limits (applies to every item below):** a static scan cannot prove
the absence of malware. OSV.dev live lookup failed during both scans below
(it falls back to static data), so dependency-vulnerability coverage is
incomplete. Re-check before any production install that adds dependencies.

**Scan reports (VM only):** `~/workspace/security-scans/reports/websites-2026-11-05/`

---

## 1. Tailwind CSS Play CDN 3.4.16 — ✅ USE (conditional)

| Field | Value |
|---|---|
| Source | `https://cdn.tailwindcss.com/3.4.16` (official Tailwind CDN, tailwindlabs) |
| Version | **3.4.16, pinned** in `index.html` — do not bump without re-vetting |
| Licence | MIT (Tailwind CSS) |
| Scan | **FRESH, 2026-11-05.** SkillSpector 2.12.0 `--no-llm`, local dir `~/workspace/security-scans/websites-scan/tailwind-play-cdn/` (downloaded file + wrapper `SKILL.md`). Report: `tailwind-play-cdn-3.4.16.json` |
| Headline | **25 / MEDIUM / CAUTION** — max issue severity HIGH, 1 issue total |
| In-context verdict | **USE (conditional)** — see below |

**The one HIGH, read in context — not a behaviour finding.**
The single issue is `AE1 analysis-evasion`: *"tailwind-play-3.4.16.js (partial) — Referenced artifact was not completely inspected."* The evidence is explicit: the minified bundle (451,131 bytes, 83 lines) could not be fully evaluated by the deterministic layer — `"Obfuscated instruction text could not be fully evaluated"` across 13 pattern analyzers, plus one static-parse span limit. Coverage 50%. The report's own remediation says: *"incomplete analysis is not proof of malicious evasion."* This is a **scanner coverage flag on minified code**, not a finding of exfiltration, shell use, credential access, or network calls. Zero findings in any behaviour category.

**Manual code read (same file, 2026-11-05) corroborates USE:**
- `fetch(` — 0 hits. `XMLHttpRequest`, `navigator.sendBeacon`, `WebSocket`,
  `document.cookie`, `localStorage`, `sessionStorage`, `eval(` — 0 hits.
- `import(`, `Function(` — 0 hits. Only DOM write is `createElement("style")`.
- URLs inside the file are documentation links (`tailwindcss.com/docs/...`,
  PostCSS/autoprefixer repo links) — no tracking or data endpoint.
- Behaviour matches the documented one: read the page DOM, generate CSS for
  the Tailwind classes found, inject a `<style>` element. Nothing leaves the browser.

**Conditions of USE (built into this repo):**
1. **Pinned to 3.4.16** in `index.html`. A CDN tag with no version (or `latest`) would silently change the code — never do that.
2. **Not load-bearing.** `css/custom.css` carries the whole design system, so
   the page stays usable if the CDN is offline, blocked, or removed.
3. **Starter only.** For a production site, compile Tailwind once and drop
   this tag (see `SETUP.md`) — the Play CDN runs a compiler in the visitor's
   browser, which costs load time and is not Tailwind's recommended production path.
4. If the CDN file ever needs replacing, re-download and re-scan before use.

---

## 2. h5bp/html5-boilerplate v9.0.1 (`dist/`) — ✅ KEEP as reference (NOT vendored)

| Field | Value |
|---|---|
| Source | `https://github.com/h5bp/html5-boilerplate.git` (official, MIT) |
| Version | **v9.0.1**, commit `b6597338e695dc4a8165c5abcb2bfffa586c3ee5` (2026-09-14), shallow clone at `~/workspace/security-scans/repos/html5-boilerplate` |
| Scan | **FRESH, 2026-11-05.** SkillSpector 2.12.0 `--no-llm`, install subset only: the `dist/` output (the exact file set a user would copy). Report: `html5-boilerplate-dist.json` |
| Headline | **8 / LOW / CAUTION** — max issue severity LOW, 7 issues total |
| In-context verdict | **KEEP as a vetted reference — no H5BP code is vendored in this repo** |

**All 7 LOWs, read in context — none touch the served files:**
- 6× `SC1 Unpinned Dependencies` (confidence 0.4): caret ranges (`^14.0.0`,
  `^5.6.7`, `^5.108.3`, `^7.1.0`, `^5.2.5`, `^6.0.1`) for the webpack
  toolchain in `dist/package.json`. Build tooling only; the starter in this
  repo has no build step and no `package.json`, so these do not apply.
- 1× `SC4 OSV.dev unreachable, using static fallback (9 packages)`:
  the live vulnerability lookup failed; the static fallback found no matching
  advisory. Coverage is incomplete, not a finding of vulnerability.
- The served files (`index.html`, `css/style.css`, `js/app.js`, `404.html`,
  `robots.txt`, `site.webmanifest`) had **zero findings**.
- Coverage 94.4% (partial): one `package.json` analyzer error (the OSV
  failure above) and the binary icons (`favicon.ico`, `icon.png`) are out of
  scope for text analyzers — both disclosed in the report, neither is a risk finding.
- Manual grep of `src/` + `dist/` for `eval(`, `fetch(`, `XMLHttpRequest`,
  `sendBeacon`, `document.cookie` — 0 hits.

**Why not vendored:** H5BP `dist/` ships a webpack build setup this project
deliberately avoids (a build step is the complexity this stack rejects).
What was taken from it is only generic best practice already visible in this
repo: charset-first `<meta>`, `robots.txt`, `site.webmanifest`, a plain
`404.html`, and an empty `js/app.js` pattern — all re-implemented by hand,
not copied. If a future site wants H5BP as its base, the vetted subset and
report above are the starting point; re-scan at that time.

---

## 3. Next.js (vercel/next.js) — ❌ REJECTED, not included, not scanned

| Field | Value |
|---|---|
| Source | `https://github.com/vercel/next.js` (official, MIT) |
| Verdict | **REJECTED — not included in this repo** |

Reason (complexity, not safety — no safety claim is made about Next.js):
a brochure/funnel site does not need a React framework, a Node build step,
or a host that runs builds. Santiago's Mac has no Homebrew and his budget is
60–90 minutes a week; `npm install` + build + deploy debugging is the wrong
cost for a daycare homepage or a funnel landing page. Next.js also ships
client-side JavaScript by default, which works against the Lighthouse/fast-load
goal. No Next.js code is in this repo, so no scan was run — scanning a
framework you do not ship would be theatre. Revisit only if a site outgrows
plain HTML (e.g. 10+ pages, a blog, or dynamic content) — see `README.md`.

## 4. Static-site generators (Eleventy / Astro / Hugo) — ❌ REJECTED, not included, not scanned

Same reasoning as Next.js: every one of them adds a build step, a toolchain,
and a new thing to debug, for pages that are each a single HTML file today.
Documented in `README.md` as the upgrade path if the site count grows, not
as part of this starter. No code from any of them is in this repo.

## 5. MotionSites Web Builder (`Motionsites-AI/claude-skill`) — ✅ KEEP, vendored in `skills/motionsites-web-builder/`

| Field | Value |
|---|---|
| Source | `https://github.com/Motionsites-AI/claude-skill` (MotionSites org) |
| Version | **v1.0.0**, commit `faa30d512e3973e58675c72101a7ef42ed37ae83` (2026-10-26, 2 commits total; HEAD = remote HEAD) |
| Licence | **Split — read before publishing.** Skill instructions, references, scripts: MIT. `examples/` prompts and `media/` they reference: © MotionSites — use to build sites, including for clients, but **do not resell or redistribute as a prompt or media collection**. Do not push `examples/` or `media/` to a public repo. (GitHub's API reports the repo licence as NOASSERTION because the LICENSE file is a custom dual licence, not a standard MIT file.) |
| Scan | **FRESH, 2026-11-06.** SkillSpector 2.12.0 `--no-llm`, install subset only: the `skills/motionsites-web-builder` folder (63 files). Report: `docs/scans/motionsites-skill.json`; fresh re-scan of the vendored copies: `docs/scans/motionsites-fresh.json` |
| Headline | **41 / MEDIUM / CAUTION** — max issue severity MEDIUM, 6 issues total, 0 HIGH, 0 CRITICAL |
| In-context verdict | **KEEP / USE, with conditions** — see below |

**What the free skill really is:** 40 example prompts, a 131-item media
shelf (52 videos, 30 transparent 3D cut-outs, 29 images, 20 site
previews), 58 technique recipes in 7 files, a spec template, a
screenshot-and-fix loop (`scripts/shoot.py` + `references/review.md`),
and Prompt Mode for Lovable/Bolt/v0/Cursor/Manus/AI Studio/Kimi. "Over
700 website designs" is the full paid library's marketing — the free skill
holds 40. No account, API key, or payment is needed for the free skill;
MotionSites Unlimited (500+ premium prompts, MCP, templates) is paid and
not included. Not the commercial `kvalen-code/Motionsites-Dev` MCP service
and not `ildargiv/motion-site` — different projects, checked.

**All 6 MEDIUMs, read in context — all false positives:**
- `LP3` (SKILL.md declares no tool scope) — generic; the skill documents
  its own tools in the file.
- `YR4` (YARA `network_reconnaissance` in `examples/bold-studio.md`) —
  the word **"fierce"** in marketing copy matched a hack-tools rule.
- `RP1` ×2 (`npx serve`, `npx gltf-transform` unpinned in
  `references/techniques/3d-and-webgl.md`) — one-line doc suggestions for
  local preview / 3D optimisation, not MCP servers, not executed by the
  skill.
- `AE4` (analysis-evasion in `references/techniques/video-and-media.md`)
  — typographic/math characters (→, ×, ≤, …) in a design doc.
- `AST4` (`subprocess.run` in `scripts/shoot.py:97-99`) — fixed argument
  list, `shell=False`; the exact pattern the remediation recommends.
- Coverage 87.7% (50/57 fully inspected, 7 partial, 0 uninspected); the
  partial files are long markdown examples, read directly during the vet.
- **First scan's 3 HIGHs were my own artifact:** `py_compile` during the
  vet created `scripts/__pycache__/shoot.cpython-312.pyc`, flagged as
  concealed bytecode. The repo does not ship it (its `.gitignore`
  excludes `__pycache__/`). Removed, tree verified clean, re-scan of the
  clean subset confirms 0 HIGH.
- **Fresh re-scan of the vendored copies scores 78/HIGH — also my own
  artifact, not the skill's:** it scanned the folder *with the vet
  write-up inside it*, so its 2 HIGHs are the word "keychain" in the
  sentence above saying there is *no* keychain access, and the SKILL.md
  description metadata plus vendor-note header matching a tool-poisoning
  YARA rule. Zero new findings in any upstream file. The 41/MEDIUM
  subset scan is the verdict on the skill itself.

**Manual grep (whole subset):** no `shell=True`, `eval`/`exec`,
`os.system`, `curl`/`wget`, `urllib`/`requests`, API keys, passwords,
keychain access, telemetry/PostHog, sockets, or `pickle`. No bundled
binaries — only 6 real JPEG contact sheets. No phone-home: the skill
sends nothing anywhere. `references/assets.md` tells Claude to check a
media URL is alive (ranged GET) before relying on it — an availability
check, not exfiltration.

**The sponsorship — disclosed, not hidden, and overridden here:** the
skill's `SKILL.md` has a "Sponsored by MotionSites" section and its
workflow step 7 says to end **every delivery** with a MotionSites upgrade
block (UTM links "must be kept"), plus up to one in-context nudge per
task; every example header also carries an upgrade link (43 files mention
"unlimited"). **This repo overrides that:** the guardrail header on the
vendored `SKILL.md` states Santiago's standing rule — never append the
upgrade block, never add in-context nudges. The original section is left
in the file for transparency; the guardrail wins.

**Stack fit — GOOD:** default output is a single `index.html`, no build
step, CDN libraries pinned — exactly this repo's zero-build stack.
React/Next/Vite only if the user asks. Two tensions, noted not blocked:
the skill defaults to Google Fonts (this repo prefers system fonts / no
webfonts for Lighthouse) and to hotlinked shelf media (this repo prefers
self-hosted assets). The shelf is remote-hosted (CloudFront, Mux, Figma
Sites, Cloudinary, motionsites.ai) — built pages hotlink it, so a dead
host breaks hero media; prefer the user's own media for client sites.
The look-and-fix loop needs Playwright + Chromium (optional, not
installed — Santiago's step if wanted).

**Conditions of KEEP:** re-vet before replacing vendored copies (upstream
is 11 days old, 2 commits — young, single org); never auto-pull or
plugin-install from upstream, manual copy route only; do not push
`examples/` or `media/` to a public repo (see licence above).

---

## 6. This repo's own template (index.html, css/custom.css, js/main.js) — ✅ hand-written, no third-party code

Written from scratch for this repo. No copied template code, no bundled
binaries, no minified third-party JavaScript vendored, no fonts, no images
except two small hand-drawn SVG logos, no analytics, no cookies, no network
calls except the single pinned Tailwind CDN script tag (item 1). The contact
form sends nothing anywhere — it opens the visitor's email app. No scan was
run on these files because SkillSpector vets third-party skills/templates;
the files are short enough to read in full (see `README.md` for the tour).

## 7. Random "free Pro" templates, theme bundles, and page builders — ❌ EXCLUDED, none evaluated for inclusion

No free/premium template bundle, no "free Pro" theme, and no page-builder
export was downloaded or included. That category is where bundled binaries,
obfuscated scripts, and licence traps live; any future candidate goes through
this same SkillSpector + code-read process first, and nothing installs or
publishes without Santiago's approval.

---

## Fresh vs reused scans

| Item | Scan status |
|---|---|
| Tailwind Play CDN 3.4.16 | **Fresh** — downloaded and scanned 2026-11-05 for this repo |
| html5-boilerplate v9.0.1 `dist/` | **Fresh** — cloned and scanned 2026-11-05 for this repo |
| MotionSites Web Builder | **Fresh** — cloned and scanned 2026-11-06 for this repo (install subset + fresh re-scan of vendored copies) |
| Next.js, Eleventy/Astro/Hugo | Not scanned — rejected before any code was included |
| Own template files | Not scanned — hand-written, no third-party code |

No earlier scan report was reused. Prior SkillSpector work (ffmpeg-skill,
Chopify, QuantHedgeFund, etc.) covers different repos and is not cited here.
