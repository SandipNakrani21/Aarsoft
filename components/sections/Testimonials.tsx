import { testimonials } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <Section tone="surface">
      <div className="container-x">
        <SplitHeading
          eyebrow="Testimonials"
          lines={["What Working With", "Us Sounds Like."]}
          description="What the people who commissioned these platforms say about working with the team that built them."
        >
          <ButtonLink href="/work" variant="secondary">
            View our work
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <RevealGroup
          from="top"
          as="ul"
          stagger={0.09}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <RevealItem as="li" key={i}>
              <figure className="card-box group flex flex-col p-7">
                <span
                  aria-hidden="true"
                  className="inline-block origin-bottom-left font-display text-5xl leading-none text-lavender transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-110"
                >
                  &ldquo;
                </span>

                <blockquote className="mt-3 flex-1">
                  <p className="text-[1.125rem] leading-relaxed text-ink-700">
                    {t.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-ink-100 pt-6">
                  <span
                    aria-hidden="true"
                    className="card-icon flex h-10 w-10 items-center justify-center rounded-full text-[0.8125rem] font-medium text-ink-900"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {t.initials}
                  </span>
                  <span className="text-[1.125rem]">
                    <span className="block font-medium text-ink-900">{t.name}</span>
                    <span className="block text-ink-500">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
