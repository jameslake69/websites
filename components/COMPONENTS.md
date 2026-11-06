# COMPONENTS.md — Reusable Component Catalogue

Every component below already exists in `index.html` (daycare example) and is
written so you can copy it into any page in this repo. Styles live in
`css/custom.css`; behaviour (nav, FAQ, form) in `js/main.js`. Tailwind
utilities are used only for spacing/layout — the components look right
without them.

**How to use:** copy the HTML block, paste it inside `<main>`, change the
words, keep the class names. Do not invent facts to fill a component — if a
number, price, or quote is not real, leave a `[TODO]` and check the publish
checklist.

**Which site needs which:**

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
| Contact / lead form | ✅ Book a tour | ✅ Book a call | ✅ Email capture (needs a form provider — see SETUP.md §8) |
| Footer | ✅ | ✅ | ✅ |

---

## 1. Header / nav

Sticky header with logo, links, and one call-to-action. On mobile it collapses
behind a menu button (behaviour in `js/main.js`).

```html
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="index.html" aria-label="Growing Happy Daycare — home">
      <img src="assets/img/logo.svg" alt="" width="40" height="40" aria-hidden="true">
      <span class="brand-name">Growing Happy</span>
      <span class="brand-tag">Daycare &amp; Preschool</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
      <span class="sr-only">Menu</span>
      <span aria-hidden="true">☰</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Main navigation" data-nav>
      <ul>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#why-us">Why us</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#visit" class="btn btn-primary btn-small">Book a tour</a></li>
      </ul>
    </nav>
  </div>
</header>
```

Rules: keep the CTA to **one** action per page (tour / call / buy). Logo `alt`
stays empty (`alt=""`) because the brand name is text next to it.

## 2. Hero

One headline, one supporting line, two buttons max, and 2–3 trust facts.
The example uses CSS/SVG art; swap `.hero-art` for a real compressed photo
(SETUP.md §4) when you have one.

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">Now enrolling · Ages 6 weeks – 5 years</p>
      <h1 id="hero-title">A safe, happy place for your little one to grow.</h1>
      <p class="lede">Play-based learning, small groups, and teachers who truly know your child — in [Your Town].</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#visit">Book a tour</a>
        <a class="btn btn-secondary" href="#programs">See programs</a>
      </div>
      <ul class="trust-list" aria-label="At a glance">
        <li><strong>1:4</strong> infant ratio*</li>
        <li><strong>Licensed</strong> &amp; inspected*</li>
        <li><strong>7am–6pm</strong> weekdays*</li>
      </ul>
    </div>
    <div class="hero-art" aria-hidden="true"><!-- photo or art here --></div>
  </div>
</section>
```

Rules: the `<h1>` is the page's one headline — it must say what you do and
for whom, in plain words. Never put a slogan here that a stranger could not
understand in 3 seconds.

## 3. Trust bar

A single line of three short proof points, directly under the hero.

```html
<section class="trustbar" aria-label="Highlights">
  <div class="wrap trustbar-inner">
    <p><strong>Small groups</strong> — every child known by name</p>
    <p><strong>Play-based learning</strong> — no worksheets, lots of doing</p>
    <p><strong>Daily updates</strong> — photos &amp; notes for parents</p>
  </div>
</section>
```

Rules: every claim must be true and checkable. If you cannot prove it, do
not write it.

## 4. Services / programs grid

Two-column card grid (one column on phones). Used for daycare programs,
real-estate services, or Etsy products.

```html
<section id="programs" class="section" aria-labelledby="programs-title">
  <div class="wrap">
    <p class="eyebrow">Programs</p>
    <h2 id="programs-title">Care that fits each age</h2>
    <p class="section-intro">One or two sentences on how the services work together.</p>
    <div class="card-grid">
      <article class="card">
        <h3>Infants <span class="age">6 weeks – 12 mo</span></h3>
        <p>What happens, in plain words. One or two sentences.</p>
        <p class="card-meta">Ratio 1:4* · From $X/week*</p>
      </article>
      <!-- repeat <article class="card"> … -->
    </div>
  </div>
</section>
```

Rules: 2–4 cards, not 8. Each card answers: what is it, who is it for, what
does it cost (or what is the next step). Prices must be real or omitted —
never a placeholder price on a live page.

## 5. Features / why-us

Two-column list of differentiators. Each feature is a claim + one sentence
of evidence.

```html
<div class="feature-list">
  <div class="feature">
    <h3>Teachers who stay</h3>
    <p>Low staff turnover means your child bonds with the same familiar faces, week after week.</p>
  </div>
  <!-- repeat -->
</div>
```

Rules: 4 features max. "We care" is not a feature — the evidence sentence
is the feature.

## 6. Testimonial

One strong quote beats five weak ones.

```html
<figure class="quote">
  <blockquote>“Our daughter runs to the door every morning. The teachers know her so well — and the daily photos mean I never miss a moment.”</blockquote>
  <figcaption>— Example Parent, Preschool family*</figcaption>
</figure>
```

Rules: only real quotes, from real people, with their permission, in their
real words. Never write a testimonial for a client, never use a stock-photo
face next to a real name, and never publish a review you cannot show the
original of.

## 7. Pricing (Etsy funnel / product pages)

Not in the daycare example (daycare prices vary — use the CTA instead). For a
product or bundle page:

```html
<section class="section" aria-labelledby="pricing-title">
  <div class="wrap">
    <p class="eyebrow">Pricing</p>
    <h2 id="pricing-title">Everything in the bundle</h2>
    <div class="card-grid">
      <article class="card">
        <h3>Money &amp; Home Starter Bundle</h3>
        <p>6 guides: buying, selling, budgeting, credit, moving, and first-home checklist.</p>
        <p class="card-meta">$39.99 · Instant download · Free updates</p>
        <a class="btn btn-primary" href="[ETSY-LISTING-URL]">Get the bundle on Etsy</a>
      </article>
    </div>
    <p class="fineprint">Digital download — no shipping. Refunds follow Etsy's digital-item policy; say so plainly.</p>
  </div>
</section>
```

Rules: price, what is inside, format, and refund/licence terms — all four, on
the page. The buy button links out to Etsy (never take payment on this static
site). No income claims, no guarantees, no "results may vary" fine print
hiding a promise made in the headline.

## 8. CTA banner

Full-width coloured band with one headline and one button. Place it once per
page, after the proof (testimonial) and before the FAQ.

```html
<section class="cta-banner" aria-labelledby="cta-title">
  <div class="wrap cta-inner">
    <h2 id="cta-title">Come and see it for yourself.</h2>
    <p>Tours take about 20 minutes. Bring your little one — they can play while we talk.</p>
    <a class="btn btn-light" href="#visit">Book a free tour</a>
  </div>
</section>
```

Rules: same single CTA as the header. A page with three different asks
converts worse than a page with one.

## 9. FAQ (accordion)

Questions visitors actually ask, answered in two sentences. Behaviour in
`js/main.js` (one open at a time, keyboard accessible).

```html
<div class="faq" data-faq>
  <div class="faq-item">
    <h3><button type="button" aria-expanded="false">What are your hours?</button></h3>
    <div class="faq-answer" hidden>
      <p>Example answer: weekdays 7:00am–6:00pm. Replace with your real hours.</p>
    </div>
  </div>
  <!-- repeat -->
</div>
```

Rules: 4–6 questions max. Write the question the way a visitor would ask
it (that is also what they type into Google). Do not use the FAQ to hide
information that belongs in the main copy (price, hours, location).

## 10. Contact / lead form

`mailto:` form — opens the visitor's email app, stores nothing. The pattern
is in `index.html` (`#visit`); the submit handler is in `js/main.js`.
Change `CONTACT_EMAIL` in `js/main.js` to the real inbox before publishing.
For a form that saves enquiries, see SETUP.md §8 (approval-gated).

Rules: ask for the minimum (name, email, one qualifying question). Every
extra field loses enquiries. Say what happens next ("we reply within one
working day") and keep that promise. Include the phone number and email as
plain links next to the form, for people who do not want to fill in a form.

## 11. Footer

Three columns: about line, nav, contact. Plus a base line with copyright,
licence number, and the no-cookies note.

```html
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div><p><strong>Growing Happy Daycare</strong></p><p>Safe, play-based childcare in [Your Town].</p></div>
    <nav aria-label="Footer navigation"><ul>
      <li><a href="#programs">Programs</a></li>
      <li><a href="#why-us">Why us</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#visit">Book a tour</a></li>
    </ul></nav>
    <div><p><a href="tel:+15550100000">(555) 010-0000</a><br><a href="mailto:hello@example.com">hello@example.com</a></p></div>
  </div>
  <div class="wrap footer-base">
    <p>© <span data-year>2026</span> Growing Happy Daycare. All rights reserved.</p>
    <p>Licence no. [YOUR-LICENCE-NUMBER] · This site uses no cookies and no tracking.</p>
  </div>
</footer>
```

Rules: the footer must contain the real business name, a way to contact you,
and — for a daycare — the licence number. For real-estate pages add the
brokerage / licence disclosure required in your state; for Etsy pages add a
link to the Etsy shop and the digital-download / refund note.

## 12. SEO head snippet (every page)

Copy from `index.html` `<head>` and change the values per page: `<title>`,
`description`, `canonical`, Open Graph tags, and the JSON-LD block (schema
type: `ChildCare`, `RealEstateAgent`, or `Product`). Keep `charset` first and
`viewport` second — order matters for how browsers parse the page.

## Composing a page (order that works)

1. Header/nav → 2. Hero → 3. Trust bar → 4. Services/programs → 5. Why-us →
6. Testimonial → 7. CTA banner → 8. FAQ → 9. Contact → 10. Footer.
For a short funnel landing page, cut 5 and 6 and keep the rest. Never put the
contact form before the visitor knows what you offer.
