# Aarsoft website audit — 8 October 2026

## Scope and result

Reviewed the website running at `http://localhost:3002/`, its source in `D:\Aarsoft_Web - Copy`, and a separately built production copy at `http://localhost:3004/`. This report contains **38 prioritized findings**, a brand/design review, and the remaining functionality backlog. The original audit was read-only; remediation status is recorded immediately below.

**Highest-priority launch gaps:** enquiries are not delivered despite a success message; mobile contact controls overflow; the menu close control can disappear against its background; keyboard focus escapes the open menu; important content depends on animation JavaScript; testimonials/work claims need publication review. Contact destinations also need verification because the repository identifies them as placeholders.

## Remediation status — 8 October 2026

The baseline findings below predate the code changes. The user asked to defer unfinished functionality until after bug fixes; see [PENDING_FUNCTIONALITY.md](./PENDING_FUNCTIONALITY.md). A mitigation is not claimed as a completed backend integration or external business verification.

| Audit ID | Status | Change / remaining limit |
| --- | --- | --- |
| AUD-01 | Mitigated; backend deferred | False delivery confirmation removed; explicit email-draft flow preserves fields. Real online delivery is pending. |
| AUD-02 | Fixed | Contact grid permits shrinking; form padding/control sizing and footer layout corrected. |
| AUD-03 | Fixed | Shared CTA padding, wrapping, minimum height and arrow sizing are responsive. |
| AUD-04 | Fixed | Open overlay uses readable light-surface controls and its own close button. |
| AUD-05 | Fixed | Dialog focus containment, background inert state and trigger focus return implemented. |
| AUD-06 | Fixed | Desktop breakpoint closes the mobile menu and restores the prior body overflow. |
| AUD-07 | Fixed | Native history/scrolling retained; destination hashes receive focus/scroll after navigation. |
| AUD-08 | Fixed | Skip/field/section anchors transfer focus; error-field behavior reproduced. |
| AUD-09 | Fixed in code; no-script browser acceptance pending | Readable reveal defaults, static correct counters, no blocking loader, native FAQ and noscript navigation. |
| AUD-10 | Fixed in shared reviewed uses | Muted light-surface text/placeholders darkened; dark-surface metadata uses lighter semantic tint. |
| AUD-11 | Fixed | Link/process hover uses readable text with approved accent underline. |
| AUD-12 | Fixed | Card hover uses a subtle surface/border instead of the opaque gradient fill. |
| AUD-13 | Fixed through interaction change | Work list is manually scrollable and nonmoving; duplicate animated copies removed. |
| AUD-14 | Fixed | All technology items wrap in a static list; no motion-dependent access. |
| AUD-15 | Fixed | CTA wording remains stable throughout hover/interaction. |
| AUD-16 | Fixed in implemented tokens/states | Undocumented deep gradient removed; readable card/link behavior documented. |
| AUD-17 | Fixed | Directory variants remove self-links and use complementary headings. |
| AUD-18 | Fixed | Solution/industry IDs and navigation links are namespaced. |
| AUD-19 | Mitigated; business verification deferred | Generic/unconfigured social profiles hidden; contact configuration isolated. Ownership remains pending. |
| AUD-20 | Misleading presentation fixed; real content deferred | Section and quote attributions explicitly identify samples. |
| AUD-21 | Misleading presentation fixed; real content deferred | Cards/directory/detail pages identify demonstration builds and remove withheld-client claims. |
| AUD-22 | Fixed; real vacancies deferred | Confirmed opening list is empty; illustrative roles retained unpublished; speculative email route remains. |
| AUD-23 | Fixed for current scope; future analytics deferred | Unneeded banner removed; current no-tracking/mail-draft policy clarified. |
| AUD-24 | Fixed | Noninteractive ESLint/TypeScript/React hook checks configured. |
| AUD-25 | Implemented; CI execution pending | Phone and HTTP tests run locally; browser regression suite and CI added, not claimed as executed. |
| AUD-26 | Fixed | Next.js 15.5.27 and patched transitives installed; local dependency audit returns zero vulnerabilities. |
| AUD-27 | Baseline hardening implemented; deployment checks pending | CSP/permissions policy and JSON-LD escaping added; HTTPS/HSTS and stricter inline policy remain qualified. |
| AUD-28 | Fixed in code; production configuration deferred | Indexing is environment-controlled and public HTTPS URL is validated before enabling it. |
| AUD-29 | Fixed | Query/category URL state, reset and history restore implemented; deep link/reset reproduced. |
| AUD-30 | Fixed | Header sizes hints and visible-variant-only priority applied. |
| AUD-31 | Fixed | Blocking intro/route-loader mounting and delayed hero readiness removed. |
| AUD-32 | Improved; field/performance profiling pending | Duplicate work/technology markup, animation work and client imports reduced; before/after numbers below. |
| AUD-33 | Fixed in reviewed motion paths | Capability listeners shared; scroll/pointer features mount only in full tier; continuous Lenis loop removed. |
| AUD-34 | Fixed in affected client imports | Generated plain navigation/service projections and server-supplied article summaries replace broad imports. |
| AUD-35 | Fixed | External ButtonLink forwards caller properties and supports explicit target. |
| AUD-36 | Fixed | OG renderer uses bundled licensed Poppins, supplied mark and configured domain. |
| AUD-37 | Fixed | Unknown modification dates omitted instead of regenerated at each build. |
| AUD-38 | Fixed | Phone digit count/format checked; punctuation-only value rejected and tested. |

Verification: production build, type check and warning-free lint pass; dependency audit reports zero vulnerabilities. Phone unit tests and production HTTP route/header/JSON-LD/OG/404 tests pass. Browser checks covered 320, 390, 768, 1024, 1440 and 1920 px, including long CTAs, menu focus/resize, invalid phone/error focus, cross-page technology navigation and search query/reset. The initial desktop contact-button failure found during this pass was corrected before final re-verification. Native-device, screen-reader and no-script browser acceptance remain pending. The added Playwright/CI suite has not been represented as a passed CI run.

First production comparison: home first-load JavaScript decreased from 192 to 182 kB; contact from 166 to 155 kB; insights from 164 to 160 kB. These are build estimates, not field Core Web Vitals.

Final decoded HTML/RSC response sizes: home **413,174 bytes** (baseline 474,101; approximately 13% lower), contact **106,741** (baseline 110,767), and insights **95,849** (baseline 102,801). Final production contact checks at 320/390/768/1024/1440/1920 px found no page overflow or clipped shared buttons. Header images selected `w=256` at the large-desktop sample rather than the original `w=2048`. Later viewport checks were performed after resetting the browser override, which allowed actual 320 px testing; the baseline's earlier minimum-width limitation is retained below as historical context.

The mobile-menu proof is available at `C:\Users\sandi\.codex\visualizations\2026\10\08\01a11c38-e36b-7a92-9339-01ea225d8430\mobile-menu-fixed.jpg`.

Priority definitions:

- **P0 — critical:** demonstrated compromise or complete production outage. None demonstrated in this audit.
- **P1 — before launch:** lost leads, materially inaccessible navigation/content, or misleading publication claims.
- **P2 — next release:** functional, accessibility, responsive, maintenance, or deployment issues needing correction soon.
- **P3 — improvement:** polish, consistency, or maintainability work with lower immediate impact.

Evidence labels distinguish **browser-confirmed**, **source-confirmed**, **conditional risk**, and **optimization opportunity**. A source-confirmed defect is not necessarily an observed exploit or measured performance regression.

### Viewports and coverage

| View | CSS viewport sampled | Coverage |
| --- | --- | --- |
| Large desktop | 1920 × 1080 | Shared navigation, homepage, representative page templates and article; additional extra-wide sampling |
| Desktop | 1440 × 900 | Shared layout, page sections, navigation and anchor behavior |
| Tablet portrait | Approximately 768 × 1023 | Mobile navigation, controls and responsive layout |
| Tablet landscape / breakpoint | Approximately 1023 / 1025 × 768 | Navigation breakpoint and resizing behavior |
| Mobile | Approximately 390 px visible content; browser `innerWidth` 400 px, height approximately 843 px | Homepage, contact, careers, industries, navigation and long CTAs |

The browser had a 0.6 scale factor; the dimensions above describe measured CSS dimensions, not requested physical window dimensions. Its minimum width prevented reliable 320/360 px testing. Those widths remain required verification work. Native mobile browsers, touch hardware, Safari, screen-reader output, and every route at every viewport were not tested. Browser capture artifacts outside the rendered page were excluded from findings.

All **32 content URLs in the sitemap** were checked over HTTP against the production build. All returned 200 and contained exactly one H1. This is route coverage, not a claim of exhaustive visual coverage.

| Route family | Review performed |
| --- | --- |
| `/` | Shared sections, visual sampling across device sizes, source review |
| `/services` and 8 service pages | Directory and representative detail browser checks; all detail routes HTTP/source review |
| `/solutions`, `/industries` | Shared cards, responsive CTAs, heading/anchor review; HTTP checks |
| `/work` and 6 case studies | Directory and representative travel case-study browser review; all routes HTTP/source review |
| `/insights` and 7 articles | Search/filter behavior, representative article and build-versus-buy route; all routes HTTP/source review |
| `/contact`, `/careers`, `/about` | Contact validation/success, mobile layout, publication content and shared layout |
| `/privacy`, `/terms` | Source/content/headers/HTTP review; shared legal layout |
| Invalid service slug; `/api/og` | Invalid slug returned 404; OG endpoint returned 200 with PNG content type |

### Verification results

| Check | Result |
| --- | --- |
| TypeScript check | Passed |
| Production build | Passed; 39 generated/static route entries reported by Next.js |
| Production content route requests | 32/32 returned 200 |
| H1 count | One per checked production content page |
| Lint | Not a usable automated check: current command prompts for ESLint setup |
| Dependency audit | 3 affected packages: 2 high, 1 moderate; exposure qualifications in AUD-26 |
| Response headers | `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin` present |
| Lighthouse / field Core Web Vitals | Not measured; do not treat payload figures as CWV scores |

A cold concurrent development request briefly returned 500 for an insight page, then passed on repeat and in production. It is not reported as a reproducible production defect. Build work ran in a separate temporary copy to avoid replacing the active development server's `.next` files.

## Prioritized issue index

| ID | Priority | Area | Finding |
| --- | --- | --- | --- |
| AUD-01 | P1 | Functionality | Contact form confirms an enquiry without delivering it |
| AUD-02 | P1 | Mobile layout | Contact form exceeds available page width |
| AUD-03 | P2 | Responsive design | Long CTA labels/padding overflow or clip on mobile |
| AUD-04 | P1 | Navigation design | Open-menu close control becomes white on white |
| AUD-05 | P1 | Accessibility | Keyboard focus escapes the open mobile/tablet menu |
| AUD-06 | P2 | Navigation | Resizing an open menu leaves desktop scrolling locked |
| AUD-07 | P2 | Navigation | Cross-page section links reset to the page top |
| AUD-08 | P2 | Accessibility | Smooth anchors scroll without moving keyboard focus |
| AUD-09 | P1 | Resilience | Reveal content depends on successful JavaScript execution |
| AUD-10 | P2 | Accessibility/design | Small muted text has insufficient contrast |
| AUD-11 | P2 | Hover/focus design | Pastel gradient text loses contrast on light surfaces |
| AUD-12 | P2 | Card design | Gradient card hover leaves metadata too faint |
| AUD-13 | P2 | Motion/usability | Marquees lack complete pause/keyboard/touch controls |
| AUD-14 | P2 | Reduced motion | Stopped technology strip hides items beyond the viewport |
| AUD-15 | P3 | Animation | Typewriter CTA periodically loses its visible label |
| AUD-16 | P2 | Brand/CSS | Implemented palette/card behavior drifts from documented rules |
| AUD-17 | P3 | Content design | Directory pages repeat headings and link back to themselves |
| AUD-18 | P3 | HTML/navigation | Repeated `e-commerce` IDs make anchors ambiguous |
| AUD-19 | P1 | Publication/functionality | Contact details remain unverified; social links are generic |
| AUD-20 | P1 | Publication | Sample testimonials read as actual commissioned-client quotes |
| AUD-21 | P1 | Publication | Work delivery claims contradict demonstration-project disclosure |
| AUD-22 | P2 | Careers | Roles are described as both real openings and samples |
| AUD-23 | P2 | Privacy/UX | Consent UI does not implement the implied tracking preferences |
| AUD-24 | P2 | Tooling | Lint is not configured for repeatable checking |
| AUD-25 | P2 | Quality/architecture | Critical user journeys have no automated regression checks |
| AUD-26 | P2 | Security maintenance | Installed dependency versions have published advisories |
| AUD-27 | P2 | Security hardening | Browser policy coverage and JSON-LD serialization need hardening |
| AUD-28 | P2 | Deployment/SEO | Canonical URL fallback and preview indexing need environment policy |
| AUD-29 | P2 | Functionality/SEO | Insights search ignores the query URL advertised in structured data |
| AUD-30 | P2 | Images/performance | Small header logos request oversized images and duplicate priority |
| AUD-31 | P2 | Perceived performance | Intro sequence artificially delays primary content |
| AUD-32 | P2 | Performance | Marketing pages carry substantial HTML and first-load JavaScript |
| AUD-33 | P2 | Motion architecture | Mobile tier still creates desktop scroll subscriptions |
| AUD-34 | P3 | Data architecture | Client components import content/presentation data too broadly |
| AUD-35 | P3 | Component API | External ButtonLink drops passed-through properties |
| AUD-36 | P3 | Brand/SEO | Share image omits brand font/logo and hardcodes domain text |
| AUD-37 | P3 | SEO | Sitemap modification dates reflect generation rather than edits |
| AUD-38 | P2 | Validation | Phone validation accepts punctuation with no phone digits |

## Detailed findings

### AUD-01 — P1 — Contact form reports success without delivery

**Evidence:** Browser-confirmed and source-confirmed. **Where:** `components/forms/ContactForm.tsx:98–105`, success copy around line 127; `/contact`.

Valid submission waits 900 ms, sets `success`, and resets the form. There is no enquiry request, storage, inbox delivery, or CRM integration. The user is told “your enquiry is in” and promised a reply. A synthetic audit submission reproduced this locally; it was not sent to an external recipient.

**Fix:** Implement an authenticated-to-provider server endpoint, server validation, spam/rate controls, and delivery/storage handling. Only show success after confirmed acceptance; preserve entered data on failure and provide retry/error feedback.

**Acceptance:** A test enquiry reaches the intended destination exactly once; rejected and unavailable-provider responses cannot show success; secrets remain server-side.

### AUD-02 — P1 — Mobile contact form overflows horizontally

**Evidence:** Browser-confirmed. **Where:** `app/contact/page.tsx` form/grid wrapper; `components/forms/ContactForm.tsx`; shared `components/ui/Button.tsx:15–37`.

At the mobile sample, the form rectangle extended from approximately x=17.78 to x=418.77, with document scroll width approximately 421 versus `innerWidth` 400. The form's right edge/control area exceeded the visible page. Grid intrinsic minimum sizing and the wide nowrap submit button contribute.

**Fix:** Add `min-w-0` to relevant grid children; constrain controls to available width; make button padding/type responsive and allow long labels to fit. Avoid using global overflow clipping to conceal the defect.

**Acceptance:** At 320, 360, 390, 400 and 768 px, the form, validation summary, submit and success states fit without clipping or horizontal page scrolling.

### AUD-03 — P2 — Long shared CTAs clip on mobile

**Evidence:** Browser-confirmed. **Where:** `components/ui/Button.tsx:15–37`; `/industries` sector CTA; `/careers` speculative application CTA.

Shared buttons combine `whitespace-nowrap`, large fixed horizontal padding and 1.25 rem text. “Talk to Us About Your Sector” clips at the mobile edge; the careers CTA had roughly 350 px client width versus 388 px scroll width. Its content does not fit the nominal box.

**Fix:** Use smaller mobile padding/type, sensible maximum width and wrapping where necessary; keep arrows inside the content box. Review every long button label using the shared component.

**Acceptance:** Full label and arrow remain visible at narrow widths and enlarged text, with a usable tap area.

### AUD-04 — P1 — Open menu close control can disappear

**Evidence:** Browser-confirmed on tablet, source-confirmed. **Where:** `components/layout/Navbar.tsx:173`, 308–319, 369 onward.

The mobile/tablet overlay is white, but the menu button continues to derive its color from the dark hero underneath (`lightText = overDark`). Opening it over a dark section produces a white close icon against white. The tablet header CTA can inherit the same mismatch. The logo already accounts for `!open`, showing inconsistent theme handling.

**Fix:** Derive all header controls from the open overlay theme while the menu is open.

**Acceptance:** Open/close controls and header CTA have visible contrast over dark/light sections, before and after scrolling, at phone/tablet widths.

### AUD-05 — P1 — Focus escapes the open overlay menu

**Evidence:** Browser-confirmed. **Where:** `components/layout/Navbar.tsx`, overlay beginning around line 369.

Tabbing from the last menu email link moved focus to the background hero's “Start a Project” link. The overlay visually covers the page but does not implement a modal focus boundary or make background content inert.

**Fix:** Implement an accessible modal/dialog menu: move initial focus inside, contain Tab/Shift+Tab, provide a labelled close control, make background content inert, and restore focus to the trigger after dismissal.

**Acceptance:** Keyboard users cannot focus hidden background controls; Escape/close returns focus predictably. Verify with a screen reader as well.

### AUD-06 — P2 — Menu resize leaves scrolling locked

**Evidence:** Browser-confirmed in production. **Where:** `components/layout/Navbar.tsx:112–130`, responsive overlay visibility.

Open the menu at mobile width, then resize to desktop. The menu and trigger become hidden by desktop CSS, but `body.style.overflow` remains `hidden` and the menu's scrolling lock/state remains active. There is no breakpoint-driven close/cleanup.

**Fix:** Close the menu when entering the desktop breakpoint and consistently release body/Lenis locks; preserve previous body styles rather than assuming empty values.

**Acceptance:** Repeated mobile-to-desktop-to-mobile resizing always leaves the visible page scrollable and the menu state consistent.

### AUD-07 — P2 — Cross-page section links land at the top

**Evidence:** Browser-confirmed. **Where:** `components/layout/SmoothScroll.tsx:74`; `data/site.ts` footer technology links.

Clicking a footer technology link from `/services` changed the URL to `/#technology`, but the settled page stayed at y=0 while the technology section was thousands of pixels below. The unconditional route-change reset overrides section navigation. The same reset also deserves back/forward restoration testing; that history case was not fully reproduced.

**Fix:** Respect destination hashes after route/content readiness, account for the sticky header, and avoid indiscriminate resets during history navigation.

**Acceptance:** Cross-page technology, solution and industry links land on the named section; back/forward preserves expected position.

### AUD-08 — P2 — Anchor navigation does not transfer focus

**Evidence:** Browser-confirmed for a normal section link; source-confirmed for skip/error anchor interception. **Where:** `components/layout/SmoothScroll.tsx:47–60`; skip-to-content link and contact error links.

The click handler prevents native anchor behavior, scrolls with Lenis, and replaces the URL, but never focuses the destination. Focus stayed on “Browse Services” after its section scroll. A skip link or error link needs focus transfer to be useful to keyboard/assistive-technology users.

**Fix:** Exempt skip/error navigation or explicitly focus the target with appropriate `tabIndex` and `preventScroll`; focus actual form controls for errors. Preserve intentional anchor history behavior.

**Acceptance:** Activating skip/error links moves focus to main/the invalid field; subsequent Tab continues from that destination.

### AUD-09 — P1 — Key content is hidden before JavaScript reveals it

**Evidence:** Source-confirmed resilience risk; JavaScript-disabled browser test remains outstanding. **Where:** `components/ui/Reveal.tsx:71,166`, `components/ui/TextReveal.tsx:197,246`, `components/sections/Hero.tsx`, animated counters.

Server-rendered reveal markup starts with opacity zero or text displaced within overflow-hidden wrappers. Hero visibility also waits for intro state, and counters initially show zero. The loader's timeout fallback does not independently restore all reveal content. Blocked scripts or failed hydration can therefore leave important marketing content hidden/inaccurate despite SSR.

**Fix:** Render readable content and final statistics by default; apply animation hiding only after enhancement is available. Provide a robust fallback for delayed/failed scripts.

**Acceptance:** With JavaScript blocked or hydration deliberately failed, headings, copy, CTAs and correct statistic totals remain available; the mobile navigation has a usable fallback.

### AUD-10 — P2 — Muted small text fails contrast expectations

**Evidence:** Source/computed-color review. **Where:** ink tokens in `app/globals.css`; `components/sections/InsightsBrowser.tsx:96,136,148`; `components/forms/ContactForm.tsx:249,284,314`.

`ink-400` (`#8e8d98`) has approximately 3.27:1 contrast on white and 2.98:1 on `#f4f4f4`; `ink-300` has approximately 1.99:1 on white. Several uses are ordinary small text, metadata or form guidance rather than large text. These combinations fall below the 4.5:1 normal-text target.

**Fix:** Define semantic readable secondary/placeholder/metadata tokens and use a darker tint on light backgrounds. Evaluate actual font size and weight for every use, rather than banning a token globally.

**Acceptance:** Rest, hover, focus, error and disabled states meet their applicable contrast requirements.

### AUD-11 — P2 — Light-surface hover/focus text becomes too pale

**Evidence:** Source-confirmed. **Where:** `app/globals.css:956–969`; `components/sections/LegalDocument.tsx:22`, `app/not-found.tsx:51`, technology-strip text.

`.link-gradient` changes text to the pastel brand gradient on hover/focus. On white, lavender is about 1.82:1 and gold about 1.36:1. Light-page legal and not-found links use this treatment. A separate deep-gradient class fixes some contexts but introduces colors outside the documented palette.

**Fix:** Keep readable brand-black text on light surfaces and animate a gradient underline/background accent; use pastel text only on appropriate dark backgrounds.

**Acceptance:** Every shared link remains readable in hover and keyboard focus states on its actual background.

### AUD-12 — P2 — Card hover washes out metadata

**Evidence:** Source-confirmed color/state issue. **Where:** `.card-box` rules in `app/globals.css`, including gradient fill around line 731; insights card category/date/author text.

Hover introduces a full pastel fill, while the text recoloring rules cover some ink classes and leave `ink-400` metadata unchanged. That gray has about 1.80:1 contrast against the lavender end of the fill. The main title can remain readable while smaller supporting text disappears visually.

**Fix:** Use explicit semantic card text colors for every interactive state or retain a white inner surface with the gradient border treatment documented in README.

**Acceptance:** Title, metadata, icon, and link state all remain readable on hover/focus; keyboard focus receives the same coherent treatment.

### AUD-13 — P2 — Moving strips need accessible controls

**Evidence:** Source-confirmed. **Where:** `components/sections/WorkMarquee.tsx`, `components/sections/TrustStrip.tsx`, marquee CSS.

Work cards move continuously on a long loop and pause primarily through hover. Keyboard users can focus links while their cards continue moving; touch users lack equivalent hover behavior or an obvious manual browsing control. The technology strip also lacks a visible pause control.

**Fix:** Provide pause/resume, pause on focus-within, and an intentional touch/manual browsing mode. Ensure repeated decorative copies do not create duplicate keyboard stops.

**Acceptance:** Every real item is discoverable with keyboard/touch, focused content stays still, and users can stop ongoing movement independently of OS settings.

### AUD-14 — P2 — Reduced-motion technology list is incomplete visually

**Evidence:** Source-confirmed; OS reduced-motion device testing outstanding. **Where:** `components/sections/TrustStrip.tsx:22–25`; global reduced-motion animation rule.

The strip is a `w-max` list inside `overflow-hidden`. Stopping its animation leaves only the first visible items, with the rest off-screen and no manual scroll control. WorkMarquee has a more deliberate reduced-motion branch; TrustStrip does not.

**Fix:** Switch to a wrapping/static list or accessible horizontal scroller when motion is reduced.

**Acceptance:** All unique technologies remain reachable/readable when animation is disabled.

### AUD-15 — P3 — Typewriter CTA periodically appears blank

**Evidence:** Browser-confirmed and source-confirmed. **Where:** `components/ui/TypewriterButton.tsx` deletion/gap cycle.

The CTA deletes its full visible label and pauses before retyping; a capture showed only its arrow. A stable accessible label is already provided, but the visual primary action temporarily lacks meaning.

**Fix:** Keep the main action wording stable and animate auxiliary text/accent, or maintain readable text throughout the cycle.

**Acceptance:** Visitors can identify the CTA immediately at any point in its animation; reduced-motion mode remains static.

### AUD-16 — P2 — Brand documentation and CSS disagree

**Evidence:** Source-confirmed. **Where:** README Design system; `app/globals.css:40` and multiple card/link hover rules.

README specifies five approved colors, four gradients and a shared card treatment. CSS adds `--gradient-primary-deep` using `#5443d6` and `#a36a00`, and later card rules override earlier treatments with full fills. Component variants also diverge. These may be intentional design changes, but they are not reflected in the stated brand contract.

**Fix:** Establish one approved token/state specification; consolidate competing selectors; document permitted variants. Treat official third-party technology-logo colors as an explicit exception rather than recoloring them blindly.

**Acceptance:** Buttons, cards, links, navigation and focus rings use documented variants without contradictory cascade overrides.

### AUD-17 — P3 — Directory pages repeat copy and offer redundant navigation

**Evidence:** Browser/source-confirmed. **Where:** `app/solutions/page.tsx`, `app/industries/page.tsx`, `components/sections/SolutionsSection.tsx:21`, technology section on `/services`.

Directory hero and reused section headings repeat the same message. “View all solutions” appears on the solutions directory and links back to that page; “Explore technology” on services similarly points to services. These controls imply an additional destination that does not exist.

**Fix:** Give shared sections a directory mode that hides redundant “view all” links and uses complementary section copy; point technology actions to their actual section where appropriate.

**Acceptance:** Every CTA has a meaningful destination and adjacent headings add information rather than restating each other.

### AUD-18 — P3 — Duplicate section IDs

**Evidence:** Browser-confirmed on industries; source-confirmed across reused solution/industry sections. **Where:** solution and industry card IDs generated with `slugify`; homepage and directories containing both sections.

Both a solution and an industry use `id="e-commerce"`. An anchor resolves to the first matching element rather than uniquely identifying its intended destination.

**Fix:** Namespace IDs (`solution-e-commerce`, `industry-e-commerce`) and update navigation links consistently.

**Acceptance:** Each rendered page has unique IDs; menu links reach the corresponding card.

### AUD-19 — P1 — Publication destinations need completion/verification

**Evidence:** Source-confirmed. **Where:** `README.md` placeholder list; `data/site.ts` contact/social configuration; `lib/seo.ts:72`.

README and data comments identify contact details as placeholders. Their live ownership/delivery was not verified. LinkedIn, Instagram, Facebook and Twitter links point to platform homepages rather than company profiles, and are reused as organization `sameAs` identity URLs. WhatsApp has a number-specific URL but still needs ownership verification.

**Fix:** Confirm inboxes, phone, WhatsApp and address with the business; replace social URLs with approved profiles or remove unavailable links. Publish response-time promises only when operationally supported.

**Acceptance:** A visitor reaches the actual company through every visible channel; structured data lists verified identity pages only.

### AUD-20 — P1 — Sample testimonials are not clearly labelled where displayed

**Evidence:** Source-confirmed. **Where:** `data/company.ts` testimonial data around line 370; Testimonials section copy; `app/terms/page.tsx:26`; README.

Terms/README describe sample quotes with placeholder names and companies, while the testimonial section frames speakers as people who commissioned the work. A disclaimer on a separate legal page does not resolve the visible claim.

**Fix:** Replace with approved real quotes and attribution, remove the section, or prominently label demonstration content beside each quote until approved.

**Acceptance:** Every published endorsement has appropriate approval and accurately describes its provenance.

### AUD-21 — P1 — Work presentation contradicts its demonstration status

**Evidence:** Source-confirmed. **Where:** `app/terms/page.tsx:25`; `data/work.ts`; `components/sections/WorkMarquee.tsx` and case-study copy.

Terms explicitly say Work projects are demonstration builds and not client engagements. Elsewhere, delivered-platform wording and withheld-client presentation imply actual engagements. The underlying business provenance was not independently verified.

**Fix:** Decide which projects are approved actual work versus demonstrations; label each accurately at the card and case-study level, with consistent claims and permissions.

**Acceptance:** Cards, case studies, README and legal content agree; no demonstration is presented as a client delivery.

### AUD-22 — P2 — Careers openings contradict their sample disclaimer

**Evidence:** Source-confirmed. **Where:** `app/careers/page.tsx:167–173`; `data/careers.ts`.

One paragraph says every role is a real opening; the next says the roles are samples and asks applicants to confirm availability. The implemented application flow is email-based, not an upload/ATS workflow.

**Fix:** Publish confirmed current vacancies or an explicit no-openings state; remove conflicting copy. Confirm the careers inbox. An ATS is optional if email applications are the intended accepted workflow.

**Acceptance:** Each role has current status and a clear working application route; applicants are not sent toward illustrative vacancies.

### AUD-23 — P2 — Consent behavior and wording are disconnected

**Evidence:** Source-confirmed, mobile size sampled. **Where:** `components/layout/CookieConsent.tsx:29–35,65`; `lib/visit.ts`; `/privacy`.

Accept/decline saves a choice to localStorage, but no analytics/tracking integration was found consuming that choice. The banner nevertheless says cookies help understand usage. Privacy copy describes a different present/future tracking position. There is no visible way to reopen/change preferences or expire a prior choice. On mobile the notice occupies roughly 245 px, about 29% of the sampled viewport.

**Fix:** First inventory actual storage/tracking. Remove or accurately simplify the notice when optional tracking is absent; if tracking is added, implement gating and preference changes before enabling it. Review copy against actual providers and operations; compact the mobile notice.

**Acceptance:** UI/privacy statements match actual behavior; decline prevents optional tracking; preferences can be changed. No current unauthorized tracking was demonstrated.

### AUD-24 — P2 — Lint command is not a repeatable check

**Evidence:** Command-confirmed. **Where:** `package.json`, absent configured ESLint rules/setup.

Running the lint script prompts for setup rather than executing a completed noninteractive lint check. It cannot reliably gate a pull request or deployment as currently configured.

**Fix:** Install/configure the compatible lint tooling, use a noninteractive command, and document/enforce it in the build workflow.

**Acceptance:** A fresh checkout can run lint unattended, with deterministic exit status.

### AUD-25 — P2 — Critical flows lack regression coverage

**Evidence:** Repository/source review. **Where:** package scripts and repository test/CI configuration.

No project test suite or CI checks were found covering the lead form, mobile menu lifecycle, anchor destinations or responsive clipping. These are shared components, so one regression can affect the whole site.

**Fix:** Add focused checks for enquiry success/failure, mobile menu focus/resize, hash navigation, unique IDs and representative viewport screenshots. Configure build/type/lint and selected journey checks in CI.

**Acceptance:** The defects in AUD-01–08 have meaningful regression protection. Do not add tests that merely duplicate implementation details.

### AUD-26 — P2 — Dependencies need advisory-driven updates

**Evidence:** `npm audit --json` and installed dependency tree; advisory pages checked. **Where:** `package.json`, `package-lock.json`.

| Package | Installed / patched | Advisory and actual exposure qualification |
| --- | --- | --- |
| Next.js | 15.5.25 / 15.5.27 | [GHSA-4jqv-mc3x-m676](https://github.com/advisories/GHSA-4jqv-mc3x-m676) concerns self-hosted Pages Router SSG/ISR; this repo uses App Router. [GHSA-mcj8-r9mp-w47p](https://github.com/advisories/GHSA-mcj8-r9mp-w47p) requires a root catch-all SSG/ISR setup not found here. Affected version is installed, but exploit preconditions were not observed. |
| sharp | 0.35.4 / 0.35.5 | [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w): librsvg memory-safety issue; potential RCE depends on glibc Linux/runtime conditions and relevant SVG processing. Current audit ran on Windows with trusted local assets and no public upload pipeline. Current RCE was not demonstrated. |
| source-map-js | 1.2.1 / 1.2.2 | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q): DoS with attacker-controlled indexed source maps. Found in the build dependency chain; no public source-map processing endpoint identified. |

**Fix:** Upgrade patched compatible versions/transitives, regenerate lockfile, rerun audit/build/type checks. **Escalate sharp to P1 before a relevant Linux deployment or introduction of untrusted SVG processing.** The audit's high severity does not itself prove that this site is exploitable.

**Acceptance:** Patched tree is installed; advisory-specific prerequisites and deployment exposure are recorded.

### AUD-27 — P2 — Security hardening is incomplete

**Evidence:** Header/source review; no exploit demonstrated. **Where:** `next.config.mjs` headers; `components/ui/JsonLd.tsx:6`.

Existing anti-sniffing, framing and referrer headers are useful. CSP and Permissions-Policy are not configured here. HSTS was absent locally, but localhost HTTP cannot establish whether a production HTTPS proxy supplies it. JSON-LD uses raw `JSON.stringify` inside a script; current data is trusted, but future untrusted CMS text containing a closing script sequence would need escaping.

**Fix:** Design/test a CSP compatible with Next.js and inline initialization, restrict unnecessary permissions, verify HTTPS/HSTS at the actual deployment edge, and escape `<` in JSON-LD serialization. Avoid a blanket CSP that breaks the app.

**Acceptance:** Deployed policy headers are verified over HTTPS and do not break forms/images/animation; hostile future content cannot break out of JSON-LD.

### AUD-28 — P2 — Deployment URL/indexing policy is implicit

**Evidence:** Source and local response review. **Where:** `next.config.mjs:10–14`, `data/site.ts`, `lib/seo.ts`, `app/robots.ts`.

Outside a configured Vercel production URL or explicit `NEXT_PUBLIC_SITE_URL`, canonical metadata falls back to `http://localhost:3000`. The audit servers on 3002/3004 therefore emitted the fallback. On a non-Vercel production host with no variable, this would publish invalid canonical/sitemap/share URLs. Preview/staging indexing is not explicitly separated from production.

**Fix:** Require/validate the production site URL for deployment, document custom-host setup and set an explicit preview/staging noindex policy where appropriate.

**Acceptance:** Production metadata references the approved HTTPS domain; staging does not accidentally compete in search. Local fallback alone is not a production incident.

### AUD-29 — P2 — Insights query URLs do not work as advertised

**Evidence:** Browser-confirmed. **Where:** `components/sections/InsightsBrowser.tsx:13`; `lib/seo.ts` SearchAction around line 83.

Structured data advertises `/insights?q=...`, but opening `/insights?q=automation` still shows an empty search input and all seven articles. Query state initializes to an empty string instead of the URL. Typing into the filter works locally, so the missing part is shareable/restorable state.

**Fix:** Read/write search parameters, define category/query history behavior, and keep structured data consistent with implemented search.

**Acceptance:** Direct query links show the matching input/results; reload and back/forward restore the selected filters.

### AUD-30 — P2 — Header logo requests are oversized

**Evidence:** Browser-confirmed image selection and source review. **Where:** `components/ui/Logo.tsx:80–88`; Navbar priority prop.

At a rendered logo width around 163 px, the image request used `w=2048&q=75`, matching the 1941 × 666 intrinsic source rather than the displayed size. Two light/dark variants are marked priority even when one is visually hidden. A large PNG brand mark is also used at small loader sizes.

**Fix:** Supply correct responsive `sizes`/render dimensions, prioritize only required content, and consider appropriately sized/vector assets without changing brand appearance.

**Acceptance:** Network-selected sizes reflect rendered width/device density; hidden variants do not unnecessarily compete with hero resources.

### AUD-31 — P2 — Intro animation delays access to primary content

**Evidence:** Source-confirmed timing; field impact not measured. **Where:** `components/layout/IntroLoader.tsx:9` and exit sequencing; `components/sections/Hero.tsx:39`.

The loader intentionally waits at least 700 ms for normal motion, with an additional beat/exit animation and then staggered hero reveals. A fast page can therefore still hold the visitor behind a decorative sequence. This may worsen perceived speed and content paint timing; no Lighthouse/LCP result is claimed.

**Fix:** Make the intro optional/nonblocking, shorten first-visit treatment, and ensure meaningful content is visible immediately. Keep reduced-motion behavior and failure fallbacks reliable.

**Acceptance:** A fast cached load does not impose an avoidable waiting screen; test slow script delivery and repeat visits.

### AUD-32 — P2 — Payload needs measured optimization

**Evidence:** Production build and decoded response measurements; optimization opportunity.

| Page | Decoded HTML/RSC bytes | Reported first-load JS |
| --- | ---: | ---: |
| Home | 474,101 | 192 kB |
| Services | 207,552 | 168 kB |
| Careers | 203,225 | 155 kB |
| Work | 204,612 | 163 kB |
| Contact | 110,767 | 166 kB |
| Privacy / Terms | 88,234 / 88,455 | 150 kB each |

Shared first-load JavaScript is approximately 103 kB. Complex inline mockups/SVGs, repeated marquee markup and site-wide motion/client features contribute to the marketing site's footprint. HTML figures are **decoded sizes, not compressed transfer sizes**; these numbers alone do not establish a failed performance budget.

**Fix:** Profile on a representative phone/slow connection; identify expensive shared bundles, defer nonessential interactive effects, simplify duplicated/decorative markup and use static rendering where sufficient.

**Acceptance:** Agree a performance budget and record before/after transfer, LCP, INP, CLS and scripting results under the same conditions.

### AUD-33 — P2 — Lite motion still subscribes to desktop scroll calculations

**Evidence:** Source-confirmed architecture mismatch, not measured dropped frames. **Where:** `hooks/useMotionTier.ts`; `components/ui/ScrollScene.tsx:42–64`; `components/layout/SmoothScroll.tsx`.

Each motion-tier hook installs its own media-query listener. ScrollScene creates `useScroll`, transforms and change subscriptions before checking whether the tier is full, so mobile/reduced tiers suppress styles but still establish scroll machinery. Lenis also runs a continuous animation-frame loop for non-reduced touch devices although touch synchronization is disabled. This conflicts with the comment that phones have no per-frame calculations.

**Fix:** Share motion capability state; mount the scroll-animation implementation only in the full tier; consider native touch scrolling and idle-aware scheduling.

**Acceptance:** Performance profiles show unnecessary subscriptions/loops absent on lite/reduced tiers while desktop animation remains intact.

### AUD-34 — P3 — Content and presentation imports are too coupled

**Evidence:** Source review. **Where:** `data/site.ts` menu construction and icon imports; `data/insights.ts`; InsightsBrowser, ContactForm and Navbar imports.

Content models include icon components and menu presentation structures. Client consumers import broader datasets than their UI needs: article lists reference the article dataset, contact service choices need only labels, and navigation imports grouped content. This increases coupling and can add serialized/bundled data; the exact removable byte count was not measured.

**Fix:** Separate plain content DTOs, lightweight listing/navigation projections and icon mappings. Pass only necessary summaries into client components. CMS adoption is a business choice, not inherently required.

**Acceptance:** Adding article bodies/service details does not unnecessarily enlarge unrelated interactive UI; one authoritative content source remains.

### AUD-35 — P3 — External ButtonLink loses supported props

**Evidence:** Source-confirmed component API bug; no current user-facing instance demonstrated. **Where:** `components/ui/Button.tsx:70–81`.

The external `<a>` branch does not spread `...rest`, unlike the internal Link branch. Passed `aria-label`, `title`, click handlers and other supported properties silently disappear. It also always forces a new tab regardless of caller intent.

**Fix:** Forward safe supported props consistently and define/document target defaults with secure rel handling.

**Acceptance:** External/internal links preserve requested accessible names and supported behavior.

### AUD-36 — P3 — OG image is inconsistent with the page brand

**Evidence:** Source/endpoint-confirmed. **Where:** `app/api/og/route.tsx`.

The share-image endpoint works and uses core brand colors, but does not load Poppins, substitutes a generic gradient square for the brand mark, and prints a hardcoded domain rather than deriving it from the deployment URL. Shared previews therefore differ from the website's documented font/logo system.

**Fix:** Use an appropriate licensed brand font/mark supported by the renderer and derive domain text from approved site configuration.

**Acceptance:** Short and long title previews are legible and match approved typography/logo/domain across deployments.

### AUD-37 — P3 — Sitemap dates do not represent actual edits

**Evidence:** Source-confirmed. **Where:** `app/sitemap.ts:8,29,35,41`.

Static, service and work pages receive a newly generated timestamp rather than their actual content modification date. Articles already use their own dates. Rebuilds can falsely suggest that unchanged pages were updated.

**Fix:** Store actual updated dates, derive them from content revision metadata, or omit `lastModified` when unknown.

**Acceptance:** Unchanged pages retain accurate modification dates after unrelated deployments.

### AUD-38 — P2 — Phone pattern does not require phone digits

**Evidence:** Source-confirmed. **Where:** `components/forms/ContactForm.tsx:32,49`.

The optional phone regex accepts 7–20 characters drawn from digits, punctuation and spaces. A value such as `-------` passes despite having no digits. Client validation also cannot protect the eventual server endpoint.

**Fix:** Normalize input and validate actual digit count/format against supported locales; repeat validation on the server when AUD-01 is implemented. Keep optional empty values accepted.

**Acceptance:** Punctuation-only values are rejected, valid intended international formats work, and server handling is authoritative.

## Brand, CSS and interaction review

The local README and token definitions are the audit baseline. No separate approved brand manual or external reference design was supplied, so this is an internal consistency review, not certification of exact brand matching.

| System / locations | Current assessment | Required action |
| --- | --- | --- |
| Core backgrounds, dark hero, lavender/gold accents | Broadly consistent with five main brand tokens | Preserve; consolidate derived/extra gradients (AUD-16) |
| Page typography | Poppins and fluid heading utilities implemented | Verify real-device text scaling; fix faint secondary text; align OG typography |
| Header/footer logos | Brand assets implemented with theme variants | Fix open-overlay theme and responsive image selection |
| Desktop grids and section spacing | Shared containers and responsive grids are present; no universal desktop overflow established | Remove redundant directory content; verify long-copy extremes at zoom |
| Mobile buttons/contact grid | Shared visual language but intrinsic-width failures | AUD-02/03 before mobile approval |
| Primary buttons | Shared cut-outline/gradient interaction established | Keep labels visible and use coherent focus contrast |
| Link hover/focus | Dark-surface pastel treatment appropriate in many contexts; light-surface contrast inconsistent | AUD-11; document light/dark variants |
| Cards across services/solutions/industries/work/insights | Shared component style exists but hover rules compete | Consolidate and verify metadata contrast (AUD-12/16) |
| Navigation mega-menu/mobile overlay | Shared styling, but menu theme/focus/resize lifecycle incomplete | AUD-04–06 |
| Reveal, scroll, cursor/magnetic effects | Desktop/lite/reduced tier concept exists | Fix progressive enhancement and subscriptions (AUD-09/33); profile rather than assume smoothness |
| Typewriter and moving work/technology strips | Brand motion is visible but can hinder reading/action clarity | AUD-13–15/31 |
| Reduced motion | Several branches implemented; not complete for technology-strip access | Verify every unique item and content remains available |
| Form labels, helper copy and validation | Client errors and focused summary implemented | Fix text contrast, error-link focus, phone validation and delivery lifecycle |
| Focus/accessibility states | Some deliberate states exist; menu/anchors/hover combinations remain incomplete | Keyboard and screen-reader acceptance pass after fixes |
| Consent notice | Uses shared typography/colors; large on first mobile visit | Correct behavior/copy and reduce obstruction |
| Social share image | Core colors match, font/logo/domain incomplete | AUD-36 |
| Third-party technology marks | Official colored assets are used | Document a permissible exception; avoid implying client/partner status |

## Functionality still left to implement

This separates missing backend/product work from UI fixes. A missing optional feature is not automatically a bug.

| Priority / status | Functionality left | Where | Definition of done |
| --- | --- | --- | --- |
| P1 — missing | Real enquiry submission and delivery | ContactForm + new server endpoint/provider | Server validates, sends/stores, returns real result; production destination verified |
| P1 — missing with endpoint | Spam/rate/abuse controls and safe secrets | New contact backend | Appropriate throttling/spam controls; credentials server-side; safe logs; duplicate handling |
| P1 — missing | Contact failure/retry/delivery lifecycle | ContactForm | Provider rejection/network error is visible; data retained; retry works; success only after acceptance |
| P1 — verification required | Approved business contact channels | `data/site.ts`, footer/contact/careers | Inboxes, phone, WhatsApp, address and response promise verified |
| P1 — publication work | Genuine endorsements or explicit demo presentation | Testimonials, work cards/case studies, terms | Provenance and permissions approved; consistent visible labels |
| P1/P2 — incomplete | Accessible responsive navigation lifecycle | Navbar/SmoothScroll | Focus containment/return, visible close control, resize unlock and correct section navigation |
| P2 — incomplete | URL-driven article search/filter state | InsightsBrowser + SEO SearchAction | Direct links, reload and history restore intended results |
| P2 — incomplete | Consent preferences aligned to actual tracking | CookieConsent/privacy/provider setup | Accurate current notice; gating and withdrawal if optional tracking introduced |
| P2 — content/workflow decision | Current vacancy publication/application route | Careers/data/careers.ts | Approved roles/empty state, working inbox, clear instructions. ATS/file upload optional if desired |
| P2 — missing configuration | Reliable lint and critical-flow CI coverage | Tooling/CI | Unattended checks cover agreed launch journeys |
| P2 — deployment verification | Canonical domain, preview indexing, HTTPS/policy headers | Config/SEO/hosting | Correct production URL, intentional staging policy and verified deployment headers |
| P2 — remaining QA | 320/360 px, real touch devices, Safari, screen reader, reduced motion, 200% zoom | All shared templates | Acceptance checks above pass on representative hardware/browsers |
| P2 — performance work | Reproducible performance baseline/budget | Production deployment | Mobile network/CPU runs and field metrics when available; optimize measured bottlenecks |
| P2 — maintenance | Patched dependencies | Package/lockfile | Advisory-qualified upgrades verified by audit/build/type checks |
| P3 — business decision | Editorial approval/maintenance process | Insights, roles, service/work data | Owners and update cadence agreed; sample articles approved/replaced |
| P3 — optional | CMS/editor interface | Content architecture | Needed only if non-developer publishing is a requirement; static data works today |
| Optional | Hero background video | `data/site.ts:heroVideo`, public asset | Currently intentionally empty; supply optimized approved media only if wanted. No missing-video 404 found |
| Optional | CRM, automated acknowledgements, applicant tracking and lead analytics | Provider integrations | Define actual business requirements before choosing integrations; these are not implemented today |

Functionality already present includes static content routes, client-side insight filtering, individual service/case-study/article pages, client-side form validation/error summary, email/phone links, metadata/sitemap/robots generation, OG-image generation and a 404 response for an invalid service slug. Do not rebuild these as though absent; correct the specific gaps above.

## Recommended implementation sequence

1. **Before publication:** connect/test enquiries, confirm contact channels, correct testimonial/work/role claims, fix mobile form/buttons and accessible menu behavior.
2. **Shared reliability:** correct hash/focus navigation, ensure visible fallback content, fix contrast and reduced-motion access, make query URLs work.
3. **Deployment and quality:** update advisory-affected dependencies, configure lint/CI, validate domain/indexing/HTTPS policies and align privacy behavior.
4. **Measure and polish:** capture mobile performance baselines, reduce oversized images/payload/motion work, consolidate CSS/brand states, refine redundant copy and share images.

This is a bounded audit of observed behavior and reviewed source, not an exhaustive penetration test or proof that every possible defect has been found. No authentication, payment, private API or public upload system was present in the reviewed website scope. Security recommendations marked conditional should be checked against the actual production host and future integrations.
