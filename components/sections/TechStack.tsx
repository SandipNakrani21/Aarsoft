import { techStack } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export function TechStack() {
  return (
    <Section id="technology">
      <div className="container-x">
        <SplitHeading
          eyebrow="Technology"
          lines={["The Stack", "We Build On."]}
          description="Current, well-supported technology chosen for longevity, and for teams that need to hire against it later."
        >
          <ButtonLink href="/services" variant="secondary">
            Explore technology
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        {/* Capability cards */}
        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {techStack.map((group) => {
            const Icon = group.icon;
            return (
              <RevealItem as="li" key={group.category}>
                <article className="card-box group flex flex-col p-7">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
                      style={{ background: "var(--color-lavender-soft)" }}
                    >
                      <Icon
                        className="h-7 w-7 text-ink-900"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="text-2xl font-semibold tracking-[-0.025em] text-ink-900">
                      {group.category}
                    </h3>
                  </div>

                  <p className="mt-5 text-[1.125rem] leading-relaxed text-ink-500">
                    {group.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-ink-100 pt-6">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-surface px-3.5 py-1.5 text-[0.9375rem] font-medium text-ink-700 transition-colors duration-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
