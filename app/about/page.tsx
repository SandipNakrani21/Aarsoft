import { values } from "@/data/company";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextRevealOnScroll } from "@/components/ui/TextReveal";
import { Eyebrow } from "@/components/ui/Section";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { NodeNetwork } from "@/components/visuals/NodeNetwork";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Aarsoft Technologies is a technology company building scalable software, AI solutions and cloud platforms. Our story, mission, values and engineering philosophy.",
  path: "/about",
  keywords: ["about Aarsoft", "software company", "engineering culture", "technology partner"],
});

const philosophy = [
  {
    title: "Choose boring technology deliberately",
    body: "We pick tools with long support horizons and a hiring pool behind them. Novelty has to remove a real constraint before it earns a place in your stack.",
    tradeoff: "The cost: we are rarely first to a new framework.",
  },
  {
    title: "Make the simple case simple",
    body: "Most systems are abstracted before they have earned it. We add structure when the code asks for it, which keeps the common path short and readable.",
    tradeoff: "The cost: some early code gets rewritten once the pattern is clear.",
  },
  {
    title: "Optimise for the second year",
    body: "Anyone can ship a first version quickly. We design for the point where three more engineers are changing it every week and nobody remembers why.",
    tradeoff: "The cost: the first release takes slightly longer.",
  },
  {
    title: "Write it down",
    body: "Architecture decisions, integration contracts and runbooks get documented as they are made. A system only one person can explain is already a liability.",
    tradeoff: "The cost: time spent writing that could have been spent building.",
  },
];

/* Team composition rather than invented individuals. */
const team = [
  { discipline: "Engineering", detail: "Backend, frontend and full-stack engineers across .NET, Node.js, React and Angular." },
  { discipline: "Design", detail: "Product designers working on research, interaction and design systems." },
  { discipline: "Quality", detail: "QA engineers owning test strategy and automation inside the pipeline." },
  { discipline: "Platform", detail: "DevOps and cloud engineers responsible for environments and delivery." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />

      <PageHero
        eyebrow="About Aarsoft"
        lines={["Revolutionizing", "Business Software."]}
        description="Founded in 2014 and headquartered in Ahmedabad, Aarsoft partners with startups, businesses and agencies across 9 countries to build the software behind their operations."
        breadcrumb={[{ name: "About", href: "/about" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Work With Us
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/careers" variant="onDarkGhost" size="lg">
            Join the Team
          </ButtonLink>
        </div>
      </PageHero>

      {/* Story */}
      <Section tone="surface">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <Eyebrow>Our story</Eyebrow>
                </Reveal>
                <TextRevealOnScroll
                  lines={["Intelligence in", "Every Line of Code."]}
                  gradientLines={[1]}
                  className="fluid-h2-narrow mt-5 text-ink-900"
                />
                <Reveal delay={0.12}>
                  <p className="mt-4 max-w-[38ch] text-[1.25rem] leading-relaxed text-ink-700">
                    Eleven years of building software for businesses that depend on
                    it, and the working habits that came out of it.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup stagger={0.1} className="space-y-6 text-[1.125rem] leading-relaxed text-ink-700 md:text-xl">
                <RevealItem as="p">
                  Aarsoft is a technology and digital product development partner. We
                  help startups, businesses and agencies turn ideas and complex
                  requirements into scalable digital products, powerful business
                  software and intuitive experiences.
                </RevealItem>
                <RevealItem as="p">
                  Since 2014 we have applied web engineering, data and automation to
                  help organisations across manufacturing, healthcare, logistics and
                  beyond work smarter and grow faster.
                </RevealItem>
                <RevealItem as="p">
                  Our solutions are more than just technology. They are built to be
                  understood, adopted and trusted by the people who rely on them every
                  day.
                </RevealItem>
                <RevealItem as="p">
                  From Ahmedabad to international teams across Canada, the United
                  Kingdom and Germany, we bring the same standard of engineering to
                  every engagement.
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="hairline flex h-full flex-col justify-between rounded-[var(--radius-lg)] bg-white p-9 md:p-12">
                <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Mission
                </span>
                <p className="mt-8 text-3xl leading-snug tracking-[-0.025em] text-ink-900 md:text-4xl">
                  To build technology that makes complex business problems simpler,
                  and to be honest about what that takes.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.12}>
              <article
                className="dark-section relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] p-9 md:p-12"
                style={{ backgroundColor: "var(--color-black)" }}
              >
                <div aria-hidden="true" className="brand-grid-dark absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-[90px]"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <span className="relative text-[0.8125rem] uppercase tracking-[0.16em] text-lavender">
                  Vision
                </span>
                <p className="relative mt-8 text-3xl leading-snug tracking-[-0.025em] text-white md:text-4xl">
                  A technology partner that ambitious businesses return to, because
                  the first system we built for them is still working.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Values"
            lines={["What We Hold", "Ourselves To."]}
            description="Six commitments that decide how we work when a project gets difficult, which is the only time they matter."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <RevealGroup
            as="ul"
            stagger={0.07}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <RevealItem as="li" key={value.title}>
                  <div className="card-box group p-8">
                    <Icon
                      className="h-8 w-8 text-ink-400 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-ink-900 link-gradient"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="mt-6 font-display text-2xl tracking-[-0.025em] text-ink-900">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[1.125rem] leading-relaxed text-ink-500">
                      {value.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      {/* Technology philosophy */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-50">
          <NodeNetwork />
        </div>

        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Technology philosophy"
                lines={["Opinions We", "Have Earned."]}
                narrow
                gradientLines={[1]}
                dark
                description="These are the positions that shape every technical decision we make, and we will explain the reasoning behind any of them."
              />
              <Reveal delay={0.2}>
                <Parallax offset={24} className="mt-9 hidden lg:block">
                  <div
                    className="hairline-dark rounded-[var(--radius-md)] p-7"
                    style={{ backgroundColor: "rgba(13,12,21,0.6)" }}
                  >
                    <p className="text-[1.0625rem] leading-relaxed text-ink-300">
                      Each of these costs us something. We have listed what, because a
                      principle with no trade-off attached is just a slogan.
                    </p>
                  </div>
                </Parallax>
              </Reveal>
            </div>

            <RevealGroup as="ul" stagger={0.09} className="lg:col-span-7">
              {philosophy.map((item, i) => (
                <RevealItem
                  as="li"
                  key={item.title}
                  className="border-t border-[rgba(193,184,255,0.14)] py-8 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex gap-6 md:gap-8">
                    <span className="mt-1.5 text-[0.8125rem] tracking-[0.14em] text-lavender">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="fluid-h3 text-white">{item.title}</h3>
                      <p className="mt-3 max-w-[56ch] text-[1.125rem] leading-relaxed text-ink-300">
                        {item.body}
                      </p>
                      <p className="mt-3.5 flex items-start gap-3 text-[1rem] leading-relaxed text-ink-400">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-6 shrink-0"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                        {item.tradeoff}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <StatsSection />

      {/* Team */}
      <Section>
        <div className="container-x">
          <SectionHeading
            eyebrow="Team"
            lines={["How the Team", "Is Built."]}
            description="Project teams stay small and cross-functional. You work with the people building your system, not an account layer in front of them."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((group) => (
              <RevealItem as="li" key={group.discipline}>
                <article className="card-box p-7">
                  <span
                    aria-hidden="true"
                    className="block h-1 w-10 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <h3 className="mt-6 font-display text-xl tracking-[-0.02em] text-ink-900">
                    {group.discipline}
                  </h3>
                  <p className="mt-2.5 text-[1.125rem] leading-relaxed text-ink-500">
                    {group.detail}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

        </div>
      </Section>

      <ProcessSection />

      <CtaSection
        eyebrow="Work with us"
        lines={["Let's Build", "Something Together."]}
        description="Tell us what you are trying to change about your business. We will tell you honestly whether we are the right team for it."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "View Our Work", href: "/work" }}
      />
    </>
  );
}
