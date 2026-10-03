import { industries } from "@/data/company";
import { slugify } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CardHead } from "@/components/ui/CardHead";

/**
 * Industries on the dark ground, built to match the Services section: the
 * same brand grid and glow behind, and the same tinted glass cards
 * (`.svc-card`) with the outlined number riding the top-right corner, the
 * corner icon tab, a gradient title and the shared gradient hover.
 */
export function IndustriesSection() {
  return (
    <Section id="industries" tone="dark" className="overflow-hidden">
      {/* Brand grid and a soft glow behind the cards */}
      <div aria-hidden="true" className="brand-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-[0.12] soft-glow"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="container-x relative">
        <SplitHeading
          dark
          eyebrow="Industries"
          lines={["Context Matters", "as Much as Code."]}
          description="Every sector has its own vocabulary, constraints and regulatory weight. We learn yours before we design anything."
        >
          <ButtonLink href="/industries" variant="onDarkGhost">
            View all industries
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry, i) => {
            const number = String(i + 1).padStart(2, "0");
            const gradientId = `ind-num-${i}`;
            return (
              /* Top padding leaves room for the number to ride above the card. */
              <RevealItem as="li" key={industry.name} className="pt-10">
                <div
                  id={slugify(industry.name)}
                  className="svc-card corner-card group scroll-mt-32"
                >
                  <svg aria-hidden="true" viewBox="0 0 200 110" className="svc-number">
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C1B8FF" />
                        <stop offset="100%" stopColor="#FED97B" />
                      </linearGradient>
                      {/*
                        The part of the number that overlaps the card: from the
                        card's top edge down. The number rides 58% above the
                        card and lifts a little on hover, which puts the edge
                        at about y=69.5 of the 110-unit drawing while hovered.
                      */}
                      <clipPath id={`ind-clip-${i}`}>
                        <rect x="0" y="69.5" width="200" height="60" />
                      </clipPath>
                    </defs>
                    <text
                      x="200"
                      y="92"
                      textAnchor="end"
                      fill={`url(#${gradientId})`}
                      stroke={`url(#${gradientId})`}
                      strokeWidth="1.6"
                      className="svc-number-text"
                    >
                      {number}
                    </text>
                    {/* Black copy over the card, shown on hover so the number stays readable on the gradient. */}
                    <text
                      x="200"
                      y="92"
                      textAnchor="end"
                      fill="#0D0C15"
                      stroke="#0D0C15"
                      strokeWidth="1.6"
                      clipPath={`url(#ind-clip-${i})`}
                      className="svc-number-text svc-number-ink"
                    >
                      {number}
                    </text>
                  </svg>

                  <CardHead
                    icon={industry.icon}
                    title={industry.name}
                    titleClassName="text-gradient w-fit text-xl font-semibold leading-snug"
                  />

                  <p className="mt-3 flex-1 text-[1.0625rem] leading-relaxed text-ink-300">
                    {industry.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
