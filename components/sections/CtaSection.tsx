import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextRevealOnScroll } from "@/components/ui/TextReveal";
import { Eyebrow } from "@/components/ui/Section";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax, ScrollScale } from "@/components/ui/Parallax";
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
        {/*
         * The closing panel arrives as the conclusion of the page: it fades
         * up, then settles from 97% to full size in step with the scroll.
         */}
        <Reveal direction="scale" duration={1.1}>
        <ScrollScale from={0.97} className="relative">

          <div className="cta-shape cta-shape-sharp dark-section relative overflow-hidden bg-ink-900 px-6 py-8 md:px-12 md:py-10">
          {/* Primary brand gradient accent */}
          <div
            aria-hidden="true"
            className="animate-aurora pointer-events-none absolute -top-1/3 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.22] blur-[120px]"
            style={{ background: "var(--gradient-primary)" }}
          />
          {/* The grid slides against the scroll, a layer behind the copy. */}
          <Parallax
            offset={32}
            className="pointer-events-none absolute -inset-y-12 inset-x-0"
            innerClassName="brand-grid-dark h-full"
          />
          {/*
           * Copy on the left, actions on the right: one compact row on
           * large screens, stacking naturally below that.
           */}
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="text-left lg:col-span-7">
              <Reveal>
                <Eyebrow dark>{eyebrow}</Eyebrow>
              </Reveal>

              <TextRevealOnScroll
                lines={lines}
                gradientLines={[lines.length - 1]}
                className="fluid-h2 mt-3 max-w-[22ch] text-white"
              />

              <Reveal delay={0.12}>
                <p className="mt-3 max-w-[58ch] text-lg leading-relaxed text-ink-300">
                  {description}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.32} className="lg:col-span-5">
              <div className="flex flex-col gap-5 lg:items-end">
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Magnetic className="flex w-full sm:inline-flex sm:w-auto">
                    <ButtonLink
                      href={primary.href}
                      variant="onDark"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {primary.label}
                      <ArrowIcon />
                    </ButtonLink>
                  </Magnetic>
                  <ButtonLink
                    href={secondary.href}
                    variant="onDarkGhost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {secondary.label}
                  </ButtonLink>
                </div>

                <p className="text-base text-ink-400">
                  or email{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-lavender underline-offset-4 transition-colors hover:text-white link-gradient hover:underline"
                  >
                    {site.contact.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
          </div>
        </ScrollScale>
        </Reveal>
      </div>
    </section>
  );
}
