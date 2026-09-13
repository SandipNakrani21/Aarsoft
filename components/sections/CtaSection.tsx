import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextRevealOnScroll } from "@/components/ui/TextReveal";
import { Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function CtaSection({
  eyebrow = "Get started",
  lines = ["Ready to Build", "With Aarsoft?"],
  description = "Tell us about your business, product or software requirement, and our team will get back to you with the right approach.",
  primary = { label: "Let's Talk", href: "/contact" },
  secondary = { label: "Explore Our Work", href: "/work" },
}: {
  eyebrow?: string;
  lines?: string[];
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-x">
        <div
          className="dark-section relative overflow-hidden rounded-[var(--radius-hero)] px-6 py-12 md:px-14 md:py-16"
          style={{ backgroundColor: "var(--color-black)" }}
        >
          {/* Primary brand gradient accent */}
          <div
            aria-hidden="true"
            className="animate-aurora pointer-events-none absolute -top-1/3 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[120px]"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div aria-hidden="true" className="brand-grid-dark absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: "var(--gradient-primary)" }}
          />

          <div className="relative">
            {/* Title and supporting copy share one row */}
            {/* Eyebrow, title with its rule, then the copy beneath it. */}
            <div className="text-left">
              <Reveal>
                <Eyebrow dark>{eyebrow}</Eyebrow>
              </Reveal>

              <TextRevealOnScroll
                lines={lines}
                gradientLines={[lines.length - 1]}
                className="fluid-h2 mt-4 max-w-[22ch] text-white"
              />

              <Reveal delay={0.12}>
                <p className="mt-4 max-w-[62ch] text-xl leading-relaxed text-ink-300">
                  {description}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={primary.href}
                  variant="onDark"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {primary.label}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink
                  href={secondary.href}
                  variant="onDarkGhost"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {secondary.label}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-7 text-[1.125rem] text-ink-400">
                or email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-lavender underline-offset-4 transition-colors hover:text-white link-gradient hover:underline"
                >
                  {site.contact.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
