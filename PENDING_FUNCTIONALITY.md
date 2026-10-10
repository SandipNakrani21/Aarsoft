# Pending functionality — after the bug fixes

Updated 8 October 2026. These items are deliberately deferred at the user's request. The form currently prepares an email draft and clearly explains that visitors must send it themselves. It does not claim online delivery.

## Business details supplied and implemented

- All enquiry, careers and privacy email links use `sandipnakrani21@gmail.com`.
- Phone and WhatsApp use the confirmed existing number, `+91 78787 82189`; WhatsApp links to `https://wa.me/917878782189`.
- Business address: 2001–2002, IT Park, Surat. Company location text now uses Surat.
- Working hours: 09:00 AM–05:00 PM, India Standard Time. Working days have not been specified.
- No current vacancies; the no-openings state remains.
- Enquiries must be saved in a CRM. CRM product or private-dashboard choice is awaiting the business's answer. No CRM storage is currently active.
- No email delivery service is configured. A receiving Gmail address alone does not enable automatic server delivery; authenticated service setup is still needed.
- Automatic acknowledgements, domain and hosting are explicitly on hold.
- Contact destinations are confirmed by the business; actual message delivery and phone/WhatsApp operation still need verification.

| Priority | Pending work | Location / dependencies | Completion criteria |
| --- | --- | --- | --- |
| P1 | Online enquiry submission | `components/forms/ContactForm.tsx`; new server endpoint and chosen email/CRM provider | Server validates, delivers/stores, confirms provider acceptance, preserves fields on failure, supports safe retry and duplicate prevention |
| P1 | Backend spam/rate controls | New contact endpoint; hosting/rate-limit service | Server-side validation, bounded request size, abuse controls, appropriate distributed limits, safe logging and server-only secrets |
| P1 | Verify actual contact delivery | `lib/site-config.ts`, `.env.example` | Business details are confirmed and implemented; actual email delivery and phone/WhatsApp operation still require verification |
| P1 | Approved real testimonials and work | `data/company.ts`, `data/work.ts` | Replace clearly labelled samples/demonstrations only with approved factual material and permissions |
| P2 | Verified social profiles | Public URL settings in `.env.example` | Approved company-profile URLs supplied; unspecified/generic links remain hidden |
| P2 | Actual career vacancies | `data/careers.ts` | Publish confirmed roles; current no-openings state remains until then. Email is the current application route |
| P2 | Production domain and hosting verification | `.env.example`, `next.config.mjs` | Set approved HTTPS `NEXT_PUBLIC_SITE_URL`; enable indexing only for production; verify deployment headers, HTTPS and optional HSTS |
| P2 | Privacy provider and retention details | `/privacy`, enquiry provider/business process | Business approves actual hosting/mail processors and retention schedule before online submission launches |
| P2, only if tracking is introduced | Analytics and consent preferences | New tracking integration; currently no optional tracking or consent banner | Define actual analytics need; block optional tracking until consent; add reopen/withdrawal and accurate policy before activation |
| P3 / optional | Editorial publishing/CMS | `data/insights.ts`, content projections | Approve existing editorial copy; agree ownership and cadence. Add CMS only if a non-developer publishing interface is required |
| Optional | ATS/upload, CRM, acknowledgements, hero video | Business/provider choices | Implement only after requirements and approved assets/providers are supplied |

## Verification still needed outside this local environment

- Actual inbox/phone/social ownership and production delivery are not verifiable from code alone.
- Native iOS/Safari, Android touch hardware, screen-reader output and deployed field Core Web Vitals remain a separate acceptance pass.
- Browser regression tests and CI have been added. Run `npm test` after installing Chromium (`npx playwright install chromium`); the local browser was checked through the connected browser controls. Do not treat an added test suite as a passed CI run.
- The CSP is a compatible baseline for static Next.js hydration and still permits inline scripts/styles. A stricter nonce/hash policy requires a deployment architecture decision and verification; no demonstrated injection was found. HSTS is opt-in for an approved HTTPS host.

No API keys, provider credentials or production deployment were configured during these fixes.
