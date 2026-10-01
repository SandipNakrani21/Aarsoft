import { industries } from "@/data/company";
import { slugify } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function IndustriesSection() {
  return (
    <Section id="industries">
      <div className="container-x">
        <SplitHeading
          eyebrow="Industries"
          lines={["Context Matters", "as Much as Code."]}
          description="Every sector has its own vocabulary, constraints and regulatory weight. We learn yours before we design anything."
        >
          <ButtonLink href="/industries" variant="secondary">
            View all industries
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <RevealGroup
          as="ul"
          stagger={0.045}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <RevealItem as="li" key={industry.name}>
                {/* The lavender wash now comes from .card-box itself. */}
                <div
                  id={slugify(industry.name)}
                  className="card-box group scroll-mt-32 overflow-hidden p-7"
                >
                  <Icon
                    className="card-icon h-8 w-8 text-ink-400 group-hover:text-ink-900"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 font-display text-xl tracking-[-0.02em] text-ink-900">
                    {industry.name}
                  </h3>
                  <p className="mt-2.5 text-[1.125rem] leading-relaxed text-ink-500">
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
