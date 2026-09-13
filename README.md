# Aarsoft Technologies — Website

Premium marketing site for Aarsoft Technologies, built with Next.js App Router,
TypeScript and Tailwind CSS v4. Server-rendered and statically prerendered for
SEO, with smooth momentum scrolling and scroll-triggered reveals throughout.

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

Do not run `npm run build` while `npm run dev` is running — the build replaces
`.next` underneath the dev server and its chunks start 404ing. Stop the dev
server first, or build, then restart dev.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js defaults.
3. Deploy. No environment variables are required.

Every push to the default branch redeploys production; other branches get preview URLs.

Canonical links, the sitemap and share previews use the project's production domain, so they point at the `.vercel.app` address at first. Once a custom domain such as `www.aarsoft.com` is added under **Settings → Domains** and set as primary, the next deploy picks it up with no code change.

## Where the content lives

All copy and data is separated from the components, so most updates need no
component changes.

| File | Contents |
| --- | --- |
| `data/site.ts` | Company name, positioning, founding year, headquarters, countries served, contact details, navigation |
| `data/services.ts` | The eight services and every field of their individual pages |
| `data/solutions.ts` | Solution cards |
| `data/company.ts` | Industries, process steps, differentiators, values, statistics, technology stack, testimonials |
| `data/work.ts` | Delivered platforms and their case-study pages |
| `data/insights.ts` | Articles, categories and body copy |
| `data/careers.ts` | Open roles, benefits, culture points |

### Placeholders still to replace

- **Contact details** in `data/site.ts` — email, phone and location are placeholders.
- **Testimonials** in `data/company.ts` — sample quotes with placeholder names.
- **Insights articles** in `data/insights.ts` — written as sample editorial content.
- **Open roles** in `data/careers.ts` — illustrative roles; set `openRoles` to `[]` when there are no vacancies.
- **Client names** in `data/work.ts` — deliberately absent. No numeric business results are claimed anywhere.

## Design system

Brand tokens live at the top of `app/globals.css`. Only the five approved
colours are used anywhere in the site:

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
| Cards and bordered boxes | `.card-box`, `.gradient-border` | Gradient 1px ring |
| Text-only links | `.link-gradient` | Gradient fills the text |

All three are plain CSS in `globals.css` rather than Tailwind `before:`
variants, because those variants cannot target a hand-authored utility class.

`.card-box` is the single card surface used across the site. Every card uses
it, so they all lift, take a lavender wash rising from the bottom edge, and
pick up the same gradient ring on hover.

The wash lives on the card background-image layer rather than a pseudo-element,
which lets it paint above the card colour but below the content without any
wrapper markup — growing `background-size` from the bottom is what makes it
rise.

## Hero background video

The hero backdrop is layered in `components/visuals/HeroBackground.tsx`:
the Deep Black ground, the animated node network, then an optional video, then
a scrim that protects the headline contrast.

To use video, put the file in `public/` and point `heroVideo` in
`data/site.ts` at it, for example `"/hero-background.mp4"`. It is empty by
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
