import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextRevealOnScroll } from "@/components/ui/TextReveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { NodeNetwork } from "@/components/visuals/NodeNetwork";
import { site } from "@/data/site";
import { stats } from "@/data/company";

/**
 * Company introduction. Asymmetric editorial layout: the statement holds a
 * sticky left column while the story scrolls past it.
 */
export function WhoWeAre() {
  return (
    <Section id="who-we-are">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,max-content)_minmax(0,1fr)] lg:gap-10">
          <div>
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>Who we are</Eyebrow>
              </Reveal>

              {/* Two balanced lines; the wider column is what lets them fit. */}
              <TextRevealOnScroll
                lines={["Intelligence in", "Every Line of Code."]}
                gradientLines={[1]}
                className="fluid-h2-narrow mt-5 text-ink-900"
              />

              <Reveal delay={0.12}>
                <p className="mt-4 max-w-[32ch] text-[1.375rem] leading-relaxed text-ink-700 md:text-[1.5rem]">
                  Aarsoft is a technology and digital product development partner.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <ButtonLink href="/about" variant="secondary" className="mt-7">
                  More about Aarsoft
                  <ArrowIcon />
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div>
            <RevealGroup
              stagger={0.1}
              className="space-y-6 text-[1.25rem] leading-relaxed text-ink-500 md:text-xl"
            >
              <RevealItem as="p">
                We help startups, businesses and agencies turn ideas and complex
                requirements into scalable digital products, powerful business
                software and intuitive experiences. Since {site.founded} we have
                applied web engineering, data and automation to help organisations
                across manufacturing, healthcare, logistics and beyond work smarter
                and grow faster.
              </RevealItem>

              <RevealItem as="p">
                Our solutions are more than just technology. They are built to be
                understood, adopted and trusted by the people who rely on them every
                day.
              </RevealItem>

              <RevealItem as="p">
                From {site.headquarters} to international teams across{" "}
                {site.internationalTeams.slice(0, -1).join(", ")} and{" "}
                {site.internationalTeams.at(-1)}, we bring the same standard of
                engineering to every engagement.
              </RevealItem>
            </RevealGroup>

            {/* Figures panel: the company numbers sit on the brand's node artwork */}
            <Reveal delay={0.1}>
              <div
                className="dark-section relative mt-9 overflow-hidden rounded-[var(--radius-lg)] p-7 md:p-9"
                style={{ backgroundColor: "var(--color-black)" }}
              >
                <div aria-hidden="true" className="brand-grid-dark absolute inset-0" />
                <div aria-hidden="true" className="absolute inset-0 opacity-70">
                  <NodeNetwork />
                </div>
                <div
                  aria-hidden="true"
                  className="animate-aurora pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-[90px]"
                  style={{ background: "var(--gradient-primary)" }}
                />

                <dl className="relative grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                  {stats.map((item) => (
                    <div key={item.label}>
                      <dd className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                        <Counter
                          to={item.countTo}
                          literal={item.value}
                          suffix={item.suffix}
                          prefix={item.prefix}
                        />
                      </dd>
                      <dt className="mt-2 text-[0.9375rem] text-ink-300">{item.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
