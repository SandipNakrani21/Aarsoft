import Link from "next/link";
import type { ComponentType } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { WhatsAppIcon, XIcon } from "@/components/ui/BrandIcons";
import { footerNav, legalNav, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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
        {/* Columns settle in left to right as the footer comes into view. */}
        <RevealGroup
          stagger={0.08}
          className="grid gap-8 pb-4 pt-8 md:grid-cols-2 md:pb-5 md:pt-9 lg:flex lg:justify-between lg:gap-6 xl:gap-8"
        >
          {/* Brand column */}
          <RevealItem className="md:col-span-2 lg:min-w-0 lg:flex-[0_1_20rem]">
            {/* Full lockup, tagline included. In the single row it scales to the
                column width rather than holding a fixed height. */}
            <Logo
              variant="full"
              className="lg:w-full lg:max-w-[18rem]"
              imageClassName="h-16 lg:h-auto lg:w-full"
            />

            <p className="mt-[0.65rem] max-w-[40ch] text-[1rem] leading-relaxed text-ink-300 lg:text-[0.9375rem] xl:text-[0.9375rem]">
              A digital engineering and product development partner helping startups,
              businesses and agencies build software that drives real business impact.
            </p>

          </RevealItem>

          {/* Link columns keep their natural width; the row spreads the spare
              space into equal gaps. From xl each label holds one line and only the
              brand column gives way; below that, long labels wrap to fit. */}
          {footerNav.map((group) => (
            <RevealItem key={group.title} className="lg:flex-[0_1_auto] xl:flex-none">
            <nav aria-label={group.title}>
              <h2 className="text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-lavender lg:text-[0.75rem] lg:tracking-[0.12em] xl:text-[0.8125rem] xl:tracking-[0.16em]">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="link-rise link-rise-flat text-[1rem] text-ink-300 lg:text-[0.9375rem] xl:whitespace-nowrap xl:text-[0.9375rem] transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            </RevealItem>
          ))}

          {/* Contact column */}
          {/* Never shrinks, so the email and the social row always hold one line. */}
          <RevealItem className="md:col-span-2 lg:flex-none">
            <h2 className="text-[0.875rem] font-semibold uppercase tracking-[0.16em] text-lavender lg:text-[0.75rem] lg:tracking-[0.12em] xl:text-[0.8125rem] xl:tracking-[0.16em]">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-[1rem] text-ink-300 lg:text-[0.9375rem] xl:text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-rise link-rise-flat transition-colors duration-200 hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="link-rise link-rise-flat transition-colors duration-200 hover:text-white"
                >
                  {site.contact.phone}
                </a>
              </li>
            </ul>

            {/* Social icons sit with the rest of the ways to reach us. */}
            <ul className="mt-5 flex flex-wrap gap-2">
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
                      className="btn-gradient relative isolate flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(193,184,255,0.24)] text-ink-300 transition-[color,border-color,translate,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 hover:border-transparent hover:text-ink-900"
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Matches the social buttons: a bordered pill that fills with the gradient */}
            <Link
              href="/contact"
              className="btn-gradient group/btn relative isolate mt-5 inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] border border-[rgba(193,184,255,0.24)] px-4 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:border-transparent hover:text-ink-900"
            >
              Start a project
              <ArrowIcon />
            </Link>
          </RevealItem>
        </RevealGroup>

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
         *
         * It rises in slowly, last, as the page's closing gesture.
         */}
        <Reveal distance={40} duration={1.3} delay={0.15}>
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
        </Reveal>

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
