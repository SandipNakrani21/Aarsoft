import { solutions } from "@/data/solutions";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export function SolutionsSection({ limit }: { limit?: number }) {
  const list = limit ? solutions.slice(0, limit) : solutions;

  return (
    <Section id="solutions" tone="surface">
      <div className="container-x">
        <SplitHeading
          eyebrow="Solutions"
          lines={["Platforms Built Around", "a Business Outcome."]}
          description="Each of these starts with a problem that costs you time or revenue, not with a technology we wanted to use."
        >
          <ButtonLink href="/solutions" variant="secondary">
            View all solutions
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <RevealGroup
          as="ul"
          stagger={0.055}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((solution) => {
            const Icon = solution.icon;
            return (
              <RevealItem as="li" key={solution.title}>
                <article className="card-box group flex flex-col p-7">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius-sm)]"
                    style={{ background: "var(--color-lavender-soft)" }}
                  >
                    <Icon
                      className="h-7 w-7 text-ink-900"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-6 font-display text-2xl tracking-[-0.025em] text-ink-900">
                    {solution.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[1.125rem] leading-relaxed text-ink-500">
                    {solution.value}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-ink-100 pt-5">
                    {solution.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-full bg-surface px-2.5 py-1 text-[0.8125rem] text-ink-500"
                      >
                        {outcome}
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
