# Aarsoft Technologies — Website

Premium marketing site for Aarsoft Technologies, built with Next.js App Router,
TypeScript and Tailwind CSS v4. Server-rendered and statically prerendered for
SEO, with native scrolling, readable server content and desktop motion enhancements.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build (prerenders every route) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run lint` | Noninteractive TypeScript/React hook lint checks |
| `npm test` | Browser regression suite after installing Chromium |
| `npm run test:unit` | Phone validation tests (Node 24) |
| `npm run test:http` | Route/security/OG checks against a running production server |

Do not run `npm run build` while `npm run dev` is running — the build replaces
`.next` underneath the dev server and its chunks start 404ing. Stop the dev
server first, or build, then restart dev.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js defaults.
3. Configure the approved production URL and indexing policy using `.env.example`, then deploy. Verify all business contact details before launch.

Every push to the default branch redeploys production; other branches get preview URLs.

Set `NEXT_PUBLIC_SITE_URL` to the approved HTTPS domain. Vercel production can use its supplied production URL; previews remain noindex. Outside Vercel, set `SITE_INDEXABLE=true` only with a public HTTPS URL. HSTS is opt-in using `ENABLE_HSTS=true` after host verification.

## Where the content lives

All copy and data is separated from the components, so most updates need no
component changes.

| File | Contents |
| --- | --- |
| `lib/site-config.ts` / `data/site.ts` | Company configuration / footer navigation |
| `data/services.ts` | The eight services and every field of their individual pages |
| `data/solutions.ts` | Solution cards |
| `data/company.ts` | Industries, process steps, differentiators, values, statistics, technology stack, testimonials |
| `data/work.ts` | Delivered platforms and their case-study pages |
| `data/insights.ts` | Articles, categories and body copy |
| `data/careers.ts` | Open roles, benefits, culture points |

### Placeholders still to replace

- **Contact details** in `lib/site-config.ts` — email, phone and location are placeholders.
- **Testimonials** in `data/company.ts` — sample quotes with placeholder names.
- **Insights articles** in `data/insights.ts` — written as sample editorial content.
- **Open roles** in `data/careers.ts` — illustrative roles; set `openRoles` to `[]` when there are no vacancies.
- **Client names** in `data/work.ts` — deliberately absent. No numeric business results are claimed anywhere.

## Design system

Brand tokens live at the top of `app/globals.css`. The five base colors are
listed below; derived neutral tints and official third-party logo colors are permitted:

| Token | Value |
| --- | --- |
| `--color-lavender` | `#C1B8FF` |
| `--color-gold` | `#FED97B` |
| `--color-black` | `#0D0C15` |
| `--color-gray` | `#F4F4F4` |
| `--color-white` | `#FFFFFF` |

Greys are tints of the brand black rather than neutral greys, so the whole
palette stays in one family. The four approved gradients are defined as
`--gradient-primary`, `--gradient-dark`, `--gradient-lavender-fade` and
`--gradient-gold-fade`.

Type uses Poppins throughout, matching the Aarsoft brand site, with JetBrains
Mono kept only for code-like details.

The root font size is fluid: 16px up to 1280px wide, rising to 20px by 1920px.
Because the design is sized in rem, type, padding and gaps all scale with it,
so a large display gets proportionally larger text instead of the same small
type stretched across more width. Below 1280px nothing changes, which keeps
phones and tablets exactly as they were.

Heading sizes are the `.hero-display`, `.fluid-display`, `.fluid-h2`,
`.fluid-h2-narrow` and `.fluid-h3` utilities. Each maximum is expressed in rem
so it rises with the root size, and each is chosen to still fit its column once
the container stops growing at `--container` — that is why the `vw` term is
never left to govern on very wide screens. Change the scale there rather than
per component.

Gradient-filled text (`.text-gradient`) is only used on the dark ground, where
it has sufficient contrast. On light surfaces the equivalent emphasis is
`.text-accent`, which keeps the word in Deep Black and puts the gradient in an
underline instead.

### Hover states

One rule, applied by what the element can carry:

| Element | Class | Hover |
| --- | --- | --- |
| Buttons and pills | `.btn-gradient` | Gradient fills the background |
| Light cards and bordered boxes | `.card-box`, `.gradient-border` | Subtle lavender wash and accent border |
| Text-only links | `.link-gradient` | Readable text with lavender underline |

All three are plain CSS in `globals.css` rather than Tailwind `before:`
variants, because those variants cannot target a hand-authored utility class.

`.card-box` defines the shared light card surface: a small lift, a subtle
lavender wash and an accent border. Dark `.svc-card` and technology-card variants
are intentional: their gradient hover changes all text to readable dark colors.

The wash lives on the card background-image layer rather than a pseudo-element,
which lets it paint above the card colour but below the content without any
wrapper markup — growing `background-size` from the bottom is what makes it
rise.

## Hero background video

The hero backdrop is layered in `components/visuals/HeroBackground.tsx`:
the Deep Black ground, the animated node network, then an optional video, then
a scrim that protects the headline contrast.

To use video, put the file in `public/` and point `heroVideo` in
`lib/site-config.ts` at it, for example `"/hero-background.mp4"`. It is empty by
default, which keeps the element unmounted so there is no failed request.

With no video the animated layer carries the section on its own, so the hero
never looks broken while the file is missing, still loading, or blocked from
autoplaying. Reduced-motion visitors never get the video element at all.

## Footer wordmark

The oversized "Aarsoft Technologies" in the footer is drawn as SVG text rather
than HTML. `textLength` pins the word to the full viewBox width and the SVG
scales to its container, so the name always spans the footer exactly at any
screen size — no clamp per breakpoint, and it can never wrap or be clipped.

The font size is chosen so the natural text width already matches the forced
width, which keeps the glyphs undistorted. If the wording changes, re-check
that: compare `getComputedTextLength()` with the textLength and adjust the
font size until they agree. The viewBox also starts above zero so ascenders
and the descender of the "g" are not cut off by the SVG viewport.

## Motion

- `components/layout/SmoothScroll.tsx` — momentum scrolling via Lenis, plus eased in-page anchor links.
- `hooks/useReveal.ts` — the trigger behind every scroll animation.
- `components/ui/Reveal.tsx` — fade-and-rise entrances, individually or as staggered groups.
- `components/ui/TextReveal.tsx` — line-by-line masked headline reveals.
- `components/ui/Counter.tsx` — number count-up for the statistics band.
- `components/ui/Parallax.tsx` — subtle vertical parallax.

`useReveal` deliberately does not use framer-motion's `whileInView`. That only
reacts to a change in intersection state, so an element that moves from below
the viewport to above it between two frames — during a fast scroll, a jump link
or a restored scroll position — never fires and stays invisible. Instead every
pending element is measured against a trigger line on each scroll frame, in one
rAF-throttled pass, and entries drop out of the set as they reveal.

Everything honours `prefers-reduced-motion`: Lenis does not initialise, each
motion component renders its plain element, and a CSS media query disables the
remaining keyframe animations.

## SEO

`lib/seo.ts` builds every page's metadata, so titles, descriptions, canonical
URLs, Open Graph and Twitter cards stay consistent. It also produces the
structured data: Organization, WebSite, BreadcrumbList, Service, FAQPage and
BlogPosting.

- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from the data files, so new services, projects and articles appear automatically.
- `app/api/og/route.tsx` renders a branded Open Graph image per page at request time.
- The site URL behind canonical links and the sitemap is resolved in `next.config.mjs`. On Vercel it follows the project's production domain automatically; set `NEXT_PUBLIC_SITE_URL` only to override it.

## Accessibility

Semantic landmarks and headings, a skip link, visible focus rings, keyboard
operable navigation and accordions, labelled form fields with an error summary
that takes focus, and `aria-hidden` on every decorative graphic. Verified: one
`h1` per page, no skipped heading levels, and no unnamed controls.

## Current interaction and publishing behavior

- Contact prepares an email draft; visitors must send it from their own email app. Online enquiry delivery is deliberately deferred and no success message claims receipt.
- Work and testimonials are visibly labelled demonstrations/samples. No sample vacancy is advertised as an actual opening.
- Unconfigured/generic social profiles are hidden. Current contact defaults require business verification.
- No optional tracker is installed, so no misleading cookie consent banner is displayed. Add consent gating before introducing optional tracking.
- Hover links retain readable text and use lavender underlines. Cards retain white/subtle lavender surfaces and gradient accents; light-surface text uses readable dark tints. Official technology-logo colors are permitted exceptions.
- Work is a manual horizontal scroller; the technology list wraps. Motion is supplementary, and primary headings/figures stay readable without animation.
- Navigation and service-choice projections are generated from authoritative data by scripts/generate-content.mjs before dev/build. Do not edit generated files.
- CSP currently permits inline scripts/styles for static Next hydration; it restricts sources, framing, objects and browser permissions. A stricter nonce/hash policy and production HTTPS/HSTS require deployment verification.

See WEBSITE_AUDIT_2026-10-08.md for baseline findings and remediation status, and PENDING_FUNCTIONALITY.md for deliberately deferred work.

To build while development remains running, use NEXT_DIST_DIR=.next-audit for both build and production start. Never run simultaneous builds against the same output directory. Browser checks use TEST_BASE_URL when testing a separately running server.

Font for OG images: Poppins SemiBold from the official Google Fonts repository, bundled with its OFL license in public/fonts.
