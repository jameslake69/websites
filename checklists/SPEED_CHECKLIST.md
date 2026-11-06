# SPEED_CHECKLIST.md — Lighthouse-Style Pre-Publish Checklist

Run this **before every publish**, and again after adding any photo, video,
or third-party script. It is the only performance gate this repo has — there
is no build step to catch a slow page for you.

## How to run Lighthouse (free, built into Chrome)

1. Open the page in Chrome (preview locally with `python3 -m http.server`,
   or open the live URL — test the live URL at least once).
2. Press `F12` (or `Cmd+Option+I` on Mac) → **Lighthouse** tab. If you do not
   see it, click the `»` in DevTools to find it.
3. Check **Performance**, **Accessibility**, **Best Practices**, **SEO**.
   Device: **Mobile** first (most visitors are on phones), then Desktop.
4. Click **Analyze page load**. Fix everything marked red; treat orange as a
   warning worth fixing if it is cheap.
5. Also run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL
   once — same engine, plus real-world field data when the page has traffic.

## Targets

| Metric | Target | Where it comes from |
|---|---|---|
| Performance (mobile) | **≥ 90** | Lighthouse |
| Performance (desktop) | **≥ 95** | Lighthouse |
| Accessibility | **≥ 95** (aim 100) | Lighthouse |
| Best Practices | **100** | Lighthouse |
| SEO | **100** | Lighthouse |
| Largest Contentful Paint (LCP) | **< 2.5 s** | Lighthouse / field data |
| Cumulative Layout Shift (CLS) | **< 0.1** | Lighthouse / field data |
| Interaction to Next Paint (INP) | **< 200 ms** | Lighthouse / field data |
| Total page weight (with photos) | **< 500 KB** | DevTools → Network |
| Total page weight (example as shipped) | **< 100 KB** | No photos shipped; only HTML/CSS/JS/SVG + the Tailwind CDN script |
| Requests | **< 25** | DevTools → Network |

## Checklist

### Images (the usual cause of a bad score)
- [ ] Every photo compressed with Squoosh (WebP, quality ~75–80) — see SETUP.md §4.
- [ ] Every photo resized to its display width (hero ≤ 1600 px wide, cards ≤ 800 px).
- [ ] `width` + `height` set on every `<img>` (prevents layout shift / CLS).
- [ ] `loading="lazy"` on all below-fold images; **not** on the hero.
- [ ] Hero image (if any) uses `fetchpriority="high"` and is the LCP element.
- [ ] No image over 200 KB on the page; no single image over 300 KB (OG image aside).
- [ ] No hotlinked images (someone else's server) and no uncompressed phone photos.

### Code & assets
- [ ] No webfonts (system font stack only). If a font was added, remove it or justify it — one font family costs ~100–300 ms on mobile.
- [ ] Only one external script: the pinned Tailwind Play CDN (`3.4.16`). No other
      third-party scripts (chat widgets, trackers, social embeds) unless they
      passed the vetting rule and Santiago approved them.
- [ ] `css/custom.css` is the only stylesheet besides Tailwind. No extra CSS files.
- [ ] `js/main.js` is the only local script and loads at the end of `<body>`.
- [ ] No `console` errors in DevTools when the page loads (open Console, reload, check).
- [ ] If the optional Tailwind compile step was done (SETUP.md §5), the Play CDN
      tags are removed and the page looks identical.

### Layout & rendering
- [ ] No horizontal scrolling on a 360 px-wide phone screen.
- [ ] Text is readable without zooming on mobile (no tiny grey text).
- [ ] Tap targets (buttons, links, FAQ) are at least 44×44 px on mobile.
- [ ] Page does not jump while loading (watch for images/fonts shifting content).
- [ ] `prefers-reduced-motion` is respected (already in `custom.css` — do not remove).

### Mobile pass (do this on a real phone if possible)
- [ ] Hero headline fits without awkward wrapping; CTA buttons are reachable without scrolling far.
- [ ] Mobile menu opens and closes; tapping a link closes it.
- [ ] FAQ opens and closes by touch.
- [ ] Form fields are tappable and the keyboard type matches (email keyboard for email).
- [ ] Phone number is a `tel:` link; email is a `mailto:` link.

### After publishing (live URL only)
- [ ] PageSpeed Insights on the live URL: Performance (mobile) ≥ 90.
- [ ] Check the page on a slow connection (DevTools → Network → "Slow 4G" throttling) — it should be readable in under ~5 s.
- [ ] Re-run this checklist after **any** change that adds an image, a script, or a new section.

## If the score is low

| Lighthouse complaint | Usual fix |
|---|---|
| "Properly size images" / "Serve images in next-gen formats" | Squoosh → WebP, resize to display width (SETUP.md §4). |
| "Eliminate render-blocking resources" | The Tailwind CDN tag is the cause — do the compile step (SETUP.md §5). |
| "Reduce unused JavaScript/CSS" | Same as above; also check no extra scripts were added. |
| "Largest Contentful Paint element was late" | Hero image too big, or hero is a background image — use a real `<img>` with `fetchpriority="high"`. |
| "Avoid large layout shifts" | Missing `width`/`height` on images, or a late-loading font/banner. |
| "Tap targets are too small" | Increase button/link padding (minimum 44 px). |
| Low score only on mobile, fine on desktop | Almost always image weight or the CDN script on a slow connection — compress images first. |

## What this checklist does NOT cover

Lighthouse cannot tell you whether the words are true, the prices are right,
or the photos are yours. That is `checklists/PUBLISH_CHECKLIST.md` — run
both, every time.
