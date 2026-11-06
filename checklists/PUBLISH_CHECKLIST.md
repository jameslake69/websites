# PUBLISH_CHECKLIST.md — Pre-Publish Gates

Run this **before anything goes live**, every time — including small edits to
a live page. Nothing here is optional. If an item cannot be ticked, the page
does not publish yet.

This checklist is the approval gate: publishing a site is a public act, and
under Santiago's standing rule nothing is publicly submitted or published
without his explicit approval. The checklist is how that approval is earned.

## 1. Placeholders — all replaced

- [ ] No `example.com`, `(555) 010-0000`, `hello@example.com`, `[Your Town]`,
      `[YOUR-…]`, `$X`, or `*` footnote placeholders remain anywhere — including
      the JSON-LD schema block, `robots.txt`, `sitemap.xml`, and `js/main.js`
      (`CONTACT_EMAIL`).
- [ ] Search the folder for `example`, `TODO`, `XXX`, `Lorem`, and `555` and
      confirm every hit is intentional.
- [ ] The `<title>`, meta description, canonical URL, and Open Graph URL all
      show the real domain and the real page.
- [ ] `og:image` points at a real 1200×630 JPG that exists in `assets/img/`.
      (The template references `og-image.jpg`, which is **not** shipped — create
      it or remove the `og:image` tags.)

## 2. Facts — all true

- [ ] Every number on the page is real and current: prices, ratios, hours,
      ages, licence number, years in business.
- [ ] Every claim is checkable ("licensed", "inspected", "first-aid trained",
      "small groups") and the proof exists if someone asks.
- [ ] Hours include holiday closures, or say where to find them.
- [ ] Prices include what is included and what costs extra. No price you cannot honour.
- [ ] No invented testimonial, review, or statistic. Testimonials are real
      quotes, from real people, with their permission, in their real words.
- [ ] No income, earnings, or outcome guarantees anywhere (especially on
      Etsy funnel pages: no "make $X" claims, no "guaranteed results").
- [ ] No photo is presented as something it is not. AI-generated decoration
      is labelled as such; photos of real children/rooms are real photos.
- [ ] Real-estate pages: brokerage and licence disclosure required in your
      state is present. Daycare pages: licence number is present. Etsy pages:
      digital-download and refund terms are stated plainly.

## 3. Photos & media — yours and lawful

- [ ] Every photo is yours (your premises, your staff with permission, your
      work) or properly licensed with the licence noted.
- [ ] Written permission exists for any identifiable child or staff member in a photo.
- [ ] No stock photo with a watermark; no hotlinked images.
- [ ] Every photo compressed (SETUP.md §4) and `alt` text written.
- [ ] No video autoplays with sound. (Prefer no video at all on a brochure page.)

## 4. Links & function

- [ ] Every link works: nav, footer, phone (`tel:`), email (`mailto:`),
      Etsy/shop links, social links (if any).
- [ ] Contact form: `CONTACT_EMAIL` in `js/main.js` is the real inbox; test it
      by submitting once and confirming the email arrives.
- [ ] If a saved-enquiries form was added (Formspree/Netlify Forms), it was
      approved separately, a privacy note is on the page, and a test
      submission was received and replied to.
- [ ] 404 page exists and links back home.
- [ ] Page works with JavaScript disabled for reading (content visible; only
      the FAQ accordion and mobile menu need JS).
- [ ] Page works if the Tailwind CDN is blocked (custom.css fallback — check
      by loading with Wi-Fi off after a first load, or by temporarily removing
      the CDN tags in a copy).

## 5. Speed & accessibility

- [ ] `checklists/SPEED_CHECKLIST.md` completed, Performance (mobile) ≥ 90.
- [ ] Lighthouse Accessibility ≥ 95: headings in order, form labels present,
      colour contrast checked, focus visible, images have `alt`.
- [ ] Page reads correctly on a phone (360 px) and a desktop — no overlap, no sideways scroll.
- [ ] No cookie banner is needed (no analytics, no tracking — if either was
      added, the banner and privacy note are a separate approval).

## 6. Legal & disclosure

- [ ] Business name, contact details, and (where required) licence/brokerage
      disclosure are in the footer.
- [ ] If any content, image, or voice on the page is AI-generated, it is
      labelled as AI-generated where a visitor could mistake it for real.
- [ ] No third-party trademark or logo is used without permission.
- [ ] Privacy: the page states it uses no cookies and no tracking (footer
      line already says this — keep it true). If a form provider was added,
      its privacy note replaces this line.
- [ ] For Etsy funnel pages: the Etsy listing it links to exists, the price
      matches, and the page does not promise anything the listing does not.

## 7. Approval & deploy

- [ ] Santiago has approved this exact page (content + deploy choice) — not
      "the idea of it", the page itself.
- [ ] Deploy choice confirmed: GitHub Pages / Netlify / Cloudflare Pages
      (SETUP.md §7), and who holds the account login is known.
- [ ] Domain confirmed: free subdomain, or custom domain purchased (separate
      purchase decision — never buy a domain inside this checklist).
- [ ] After deploy: open the live URL on a phone and a desktop, click every
      link once, submit the form once, and run PageSpeed Insights on the live URL.
- [ ] The deployed copy matches the approved copy (no last-minute edits after approval).

## If anything fails

Do not publish and fix it later. A wrong price, a fake testimonial, or an
unlawful photo is harder to undo than to delay by a day. Note the blocker,
fix it, and re-run this checklist from the top.
