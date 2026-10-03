import Image from "next/image";
import { techStack } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem, RevealSubItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { CardHead } from "@/components/ui/CardHead";

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

        {/* Capability cards: icon tab in the top-left corner, title beside it. */}
        <RevealGroup
          from="left"
          as="ul"
          stagger={0.06}
          /* `tech-invert`: gradient accents at rest, gradient card on hover. */
          className="tech-invert mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {techStack.map((group) => {
            return (
              <RevealItem as="li" key={group.category}>
                <div className="tech-shell">
                  <article className="tech-card corner-card flex flex-col">
                    <CardHead
                      icon={group.icon}
                      title={group.category}
                      titleClassName="tech-title text-2xl font-semibold tracking-[-0.025em] text-ink-900"
                    />

                    <p className="tech-summary mt-3 text-[1.0625rem] leading-relaxed text-ink-500">
                      {group.summary}
                    </p>

                    {/* Each technology lands in turn once its card is in place. */}
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item, i) => {
                        const Glyph = item.icon;
                        return (
                          <RevealSubItem key={item.name} index={i}>
                            <span className="tech-chip inline-flex items-center gap-2 rounded-full py-1 pr-3.5 pl-1 text-[0.9375rem] font-medium">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                                {item.logo ? (
                                  <Image
                                    src={item.logo}
                                    alt=""
                                    width={18}
                                    height={18}
                                    className="h-[18px] w-[18px] object-contain"
                                  />
                                ) : Glyph ? (
                                  <Glyph
                                    className="tech-chip-glyph h-4 w-4"
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                  />
                                ) : null}
                              </span>
                              {item.name}
                            </span>
                          </RevealSubItem>
                        );
                      })}
                    </ul>
                  </article>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
