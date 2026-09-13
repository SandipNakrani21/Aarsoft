import { differentiators } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export function WhyAarsoft() {
  return (
    <Section id="why-us" tone="surface">
      <div className="container-x">
        <SplitHeading
          eyebrow="Why us"
          lines={["Why Businesses", "Choose Aarsoft."]}
          description="Engineering judgement built over a decade of delivering software that businesses run on every day."
        >
          <ButtonLink href="/about" variant="secondary">
            About Aarsoft
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealItem as="li" key={item.title}>
                <article className="card-box group p-8 lg:p-9">

                  <div className="flex items-start justify-between">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-sm)]"
                      style={{ background: "var(--color-lavender-soft)" }}
                    >
                      <Icon
                        className="h-7 w-7 text-ink-900"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-[0.8125rem] tracking-[0.14em] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-2xl leading-tight tracking-[-0.025em] text-ink-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[1.125rem] leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

      </div>
    </Section>
  );
}
