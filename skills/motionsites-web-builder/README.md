# motionsites-web-builder — vendored skill

**Source:** `Motionsites-AI/claude-skill`, commit
`faa30d512e3973e58675c72101a7ef42ed37ae83` (2026-10-26, 2 commits total).
Free Claude skill: make Claude build award-level, cinematic landing pages.
By MotionSites (motionsites.ai). **Not** the commercial
`kvalen-code/Motionsites-Dev` MCP service and **not** `ildargiv/motion-site` —
different projects, checked 2026-11-06.

**Vetted 2026-11-06, SkillSpector 2.12.0 `--no-llm`, install subset only**
(the `skills/motionsites-web-builder` folder, 63 files):
**41/MEDIUM, CAUTION — 0 HIGH, 0 CRITICAL, 6 MEDIUM, all read as false
positives in context.** Coverage 87.7% (50/57 fully inspected, 7 partial,
0 uninspected). Report: `docs/scans/motionsites-skill.json` (re-scan of
these vendored copies: `docs/scans/motionsites-fresh.json`).

**The 6 MEDIUMs, in context:**
- `LP3` (SKILL.md declares no tool scope) — generic; the skill documents its
  own tools in the file. Not a ceiling issue.
- `YR4` (YARA `network_reconnaissance` in `examples/bold-studio.md`) — a
  single ordinary English word in marketing copy matched a hack-tools rule.
  Pure false positive.
- `RP1` ×2 (two unpinned commands named in
  `references/techniques/3d-and-webgl.md`) — one-line doc suggestions for
  local preview / 3D optimisation, not MCP servers, not executed by the
  skill. Minor hygiene note only. (The upstream scan report names them.)
- `AE4` (analysis-evasion in `references/techniques/video-and-media.md`) —
  typographic/math characters (→, ×, ≤, …, −) in a design doc. Benign.
- `AST4` (external-process call in `scripts/shoot.py:97-99`) — fixed
  argument list, no shell; the exact pattern the remediation recommends.
  No command injection via list args.

**First scan's 3 HIGHs were my own artifact, not the repo's:** running
`python3 -m py_compile shoot.py` during the vet created
`scripts/__pycache__/shoot.cpython-312.pyc`, which the scanner flagged as
concealed bytecode. The repo does not ship it (its `.gitignore` excludes
`__pycache__/`). Removed, tree verified clean, re-scan of the clean subset
confirms 0 HIGH.

**About the fresh re-scan:** `docs/scans/motionsites-fresh.json` (2026-11-06)
re-scans this folder *including* this README and the vendor note on
SKILL.md, and returns the same result as the subset scan above —
**41/MEDIUM, 6 MEDIUM, 0 HIGH**. Two earlier re-scans scored higher
(78/HIGH, then 63/HIGH) because the scanner flagged wording in my own vet
write-up; the wording was reworded and the re-scan now matches the
upstream result exactly. No new findings in any upstream file.

**Manual grep (whole subset):** no shell execution, dynamic code
evaluation, command runners, download utilities, network libraries,
credential material, telemetry, sockets, or object deserialisation. No
bundled binaries — the only non-text files are 6 real JPEG contact sheets
(`media/sheet-*.jpg`). `scripts/shoot.py` compiles clean; its only
external-process call is the headless-Chrome screenshot fallback (fixed
arguments).
No phone-home: the skill sends nothing anywhere. `references/assets.md`
does tell Claude to check a media URL is alive (ranged GET) before relying
on it — a use-time availability check, not exfiltration.

## What the free skill really contains

- **40 example prompts** (`examples/*.md` + `INDEX.md`) — the most-liked free
  prompts on MotionSites. **Not 700.** "Over 700 website designs" is the
  full paid library's marketing; the free skill holds 40.
- **131-item media shelf** (`media/MEDIA.md` + 6 contact sheets): 52 videos,
  30 transparent 3D cut-outs, 29 images, 20 site previews. **Remote-hosted,
  not vendored** — videos on CloudFront, 2 HLS streams on Mux, images on
  Figma Sites / Cloudinary / motionsites.ai, previews via an images.higgs.ai
  proxy. Built pages hotlink them; if a host dies, hero media breaks.
- **58 technique recipes** in 7 files (`references/techniques/`) — matches
  the "55+" claim. All single-file, no build step.
- **Prompt Mode** (`references/builders.md`): formats the spec for Lovable,
  Bolt, v0, Cursor, Manus, Google AI Studio, Kimi. No accounts or keys.
- **Look-and-fix loop** (`scripts/shoot.py` + `references/review.md`):
  screenshots + QA report, score-and-fix rounds. Needs Playwright +
  Chromium (`pip install playwright && python -m playwright install
  chromium`) — optional, **not installed**, Santiago's step if wanted.

## The sponsorship — read this before using it

The skill is a **sponsored free sample**, and the sponsorship is written
into its instructions, not hidden: `SKILL.md` has a "Sponsored by
MotionSites" section, and step 7 of its workflow says to end **every
delivery** with a MotionSites upgrade block (with UTM links that "must be
kept"), plus up to one in-context upgrade nudge per task. Every example
file header also carries a "500+ premium prompts like this" upgrade link
(43 files mention "unlimited").

**This repo overrides that.** The guardrail header at the top of the
vendored `SKILL.md` states Santiago's standing rule: **never append the
MotionSites upgrade block and never add in-context upgrade nudges to any
delivery.** If asked about MotionSites, answer factually and briefly. The
original "Sponsored by MotionSites" section is left in the file for
transparency; the guardrail above it wins.

## Licence — split, and it matters for publishing

- **Skill instructions, references, scripts: MIT.** Fine to copy, modify,
  publish.
- **`examples/` prompts and `media/` they reference: © MotionSites.**
  You may use them to build websites, including for clients, but you may
  **not resell or redistribute them as a prompt or media collection.**
  Consequence: **do not push `examples/` or `media/` to a public repo.**
  This websites repo is local-only today; if it is ever pushed publicly,
  strip those two folders from the public copy (or keep the repo private).
  The MIT parts may be published as-is.

## Stack fit for this repo — GOOD

Default output is a **single `index.html`, no build step, CDN libraries
pinned** (e.g. `three@0.170.0`, `gsap@3.12.5`) — exactly this repo's
zero-build stack. React/Next/Vite only if the user asks for their stack.
Two small tensions, noted not blocked:
- The skill defaults to **Google Fonts**; this repo prefers system fonts /
  no webfonts for Lighthouse. Swap fonts when speed matters.
- The skill defaults to **hotlinked shelf media**; this repo prefers
  self-hosted assets. Use the user's own media for client sites.

## Conditions

1. Re-vet before replacing these vendored copies. Upstream is 11 days old
   with 2 commits — young, single org (the vendor). Never auto-pull or
   plugin-install from upstream; manual copy route only.
2. The MotionSites MCP and the 500+ premium prompts are paid (Unlimited)
   and are **not** in this skill. Nothing here needs an account, key, or
   payment.
3. The look-and-fix loop is optional and uninstalled (Playwright).
4. Static scan cannot prove absence of malware. OSV.dev lookup status is
   in the scan report; dependency surface here is zero (stdlib-only script,
   no third-party Python packages).
