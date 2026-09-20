import Link from "next/link";
import type { ComponentType } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { WhatsAppIcon, XIcon } from "@/components/ui/BrandIcons";
import { footerNav, legalNav, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon } from "@/components/ui/Button";

/**
 * Social platforms are stored as keys in the data file, resolved here.
 * WhatsApp and X are drawn locally because Lucide ships neither mark.
 */
const socialIcons: Record<
  string,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: WhatsAppIcon,
  twitter: XIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="dark-section relative overflow-hidden text-white"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Dark technology gradient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-lavender), var(--color-gold), transparent)",
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden="true"
        className="brand-grid-dark pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full opacity-[0.13] blur-[120px]"
        style={{ background: "var(--gradient-dark)" }}
      />

      <div className="container-x relative">
        <div className="grid gap-8 pb-4 pt-8 md:grid-cols-2 md:pb-5 md:pt-9 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* The footer has the width for the full lockup, tagline included. */}
            <Logo variant="full" imageClassName="h-20 xl:h-28" />

            <p className="mt-4 max-w-[40ch] text-[1.1875rem] leading-relaxed text-ink-300">
              A digital engineering and product development partner helping startups,
              businesses and agencies build software that drives real business impact.
            </p>

          </div>

          {/* Link columns */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <h2 className="text-[0.9375rem] font-semibold uppercase tracking-[0.18em] text-lavender">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      data-text={link.label}
                      className="link-rise text-[1.1875rem] text-ink-300 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact column */}
          {/* Wider than the link columns so the five social marks hold one row. */}
          <div className="lg:col-span-4">
            <h2 className="text-[0.9375rem] font-semibold uppercase tracking-[0.18em] text-lavender">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-[1.1875rem] text-ink-300">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  data-text={site.contact.email}
                  className="link-rise transition-colors duration-200 hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  data-text={site.contact.phone}
                  className="link-rise transition-colors duration-200 hover:text-white"
                >
                  {site.contact.phone}
                </a>
              </li>
            </ul>

            {/* Social icons sit with the rest of the ways to reach us. */}
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {site.social.map((item) => {
                const Icon = socialIcons[item.icon];
                if (!Icon) return null;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="btn-gradient relative isolate flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(193,184,255,0.24)] text-ink-300 transition-colors duration-300 hover:border-transparent hover:text-ink-900"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Matches the social buttons: a bordered pill that fills with the gradient */}
            <Link
              href="/contact"
              className="btn-gradient group/btn relative isolate mt-5 inline-flex h-11 items-center gap-2.5 rounded-[var(--radius-sm)] border border-[rgba(193,184,255,0.24)] px-5 text-[1rem] font-medium text-white transition-colors duration-300 hover:border-transparent hover:text-ink-900"
            >
              Start a project
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/*
         * Oversized wordmark drawn as SVG rather than text.
         *
         * `textLength` pins the word to the full viewBox width and the SVG
         * scales to its container, so the name always spans the footer
         * exactly — the size follows the screen instead of needing a clamp
         * per breakpoint, and it can never be clipped or wrap.
         *
         * The top-to-bottom falloff is a mask on the whole block rather than
         * stops inside each fill. That way both the resting and the hover
         * colour fade out identically, and each fill is free to run its
         * gradient across the word instead of spending it on the fade.
         */}
        <div
          aria-hidden="true"
          className="group mx-auto w-[70%] select-none md:w-[50%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0) 94%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0) 94%)",
          }}
        >
          {/*
           * Tracking is opened up to 0.05em, and the size dropped to suit:
           * at 250px the word measures 1004 user units naturally, so being
           * pinned to 1000 costs 0.4% of glyph width rather than squeezing
           * the letters to make room for the wider gaps. The box starts
           * above the f and t ascenders (ink tops out at 105 units at this
           * size) and ends just past the baseline, so nothing is cropped.
           */}
          <svg
            viewBox="0 100 1000 205"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            className="block"
            role="presentation"
          >
            <defs>
              {/* Resting state: lavender across the word, as before. */}
              <linearGradient id="footer-wordmark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C1B8FF" stopOpacity="0.62" />
                <stop offset="100%" stopColor="#C1B8FF" stopOpacity="0.62" />
              </linearGradient>

              {/* Hover state: the brand gradient spread across the whole word. */}
              <linearGradient id="footer-wordmark-hover" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C1B8FF" />
                <stop offset="50%" stopColor="#FED97B" />
                <stop offset="100%" stopColor="#C1B8FF" />
              </linearGradient>
            </defs>

            {/*
             * Both layers carry identical metrics so they sit exactly on top
             * of one another. The cross-fade eases in — barely moving at the
             * start, then resolving — so the colour arrives gradually.
             */}
            <text
              x="500"
              y="300"
              textAnchor="middle"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#footer-wordmark)"
              className="transition-opacity duration-[900ms] ease-[cubic-bezier(0.55,0,1,0.45)] group-hover:opacity-0"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "250px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Aarsoft
            </text>
            <text
              x="500"
              y="300"
              textAnchor="middle"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#footer-wordmark-hover)"
              className="opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.55,0,1,0.45)] group-hover:opacity-100"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "250px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              Aarsoft
            </text>
          </svg>
        </div>

        {/*
         * Three columns rather than a flex row: the empty first column is
         * what keeps the copyright centred on the footer itself while the
         * legal links sit right. A two-item flex would centre it between
         * the two instead.
         */}
        <div className="grid gap-3 border-t border-[rgba(193,184,255,0.14)] py-4 text-center text-[1.0625rem] text-ink-400 sm:grid-cols-3 sm:items-center">
          <span aria-hidden="true" className="hidden sm:block" />
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-text={item.label}
                  className="link-gradient transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
