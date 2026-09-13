import { benefits, culturePoints, openRoles } from "@/data/careers";
import { site } from "@/data/site";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { values } from "@/data/company";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Aarsoft Technologies. Sample openings across .NET, Angular, full stack, UI/UX, QA, AI and DevOps, with flexible working and real ownership.",
  path: "/careers",
  keywords: [
    "software developer jobs",
    "dotnet developer career",
    "angular developer job",
    "devops engineer role",
    "AI engineer job",
  ],
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Careers", path: "/careers" }])} />

      <PageHero
        eyebrow="Careers"
        lines={["Help Us Build", "What’s Next."]}
        gradientLines={[1]}
        description="Work on real products, complex technical problems and international client engagements — with room to learn, own your work and grow."
        breadcrumb={[{ name: "Careers", href: "/careers" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#open-positions" variant="onDark" size="lg">
            See Open Positions
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink
            href={`mailto:${site.contact.careersEmail}`}
            variant="onDarkGhost"
            size="lg"
          >
            Send a Speculative Application
          </ButtonLink>
        </div>
      </PageHero>

      {/* Why join */}
      <Section tone="surface">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Why join us"
                  lines={["Engineering Work,", "Not Ticket Work."]}
                  narrow
                  description="You will understand why a feature exists, talk to the people who need it, and own it through to production."
                />
              </div>
            </div>

            <RevealGroup as="ul" stagger={0.09} className="lg:col-span-7">
              {culturePoints.map((point, i) => (
                <RevealItem
                  as="li"
                  key={point.title}
                  className="border-t border-ink-200 py-8 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex gap-6 md:gap-8">
                    <span className="mt-1.5 text-[0.8125rem] tracking-[0.14em] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="fluid-h3 text-ink-900">{point.title}</h3>
                      <p className="mt-3 max-w-[54ch] text-[1.125rem] leading-relaxed text-ink-500">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Culture values */}
      <Section>
        <div className="container-x">
          <SectionHeading
            eyebrow="Culture"
            lines={["The Values We", "Actually Use."]}
            description="These are not a poster in the office. They are the criteria we use when a decision is genuinely difficult."
            align="center"
            className="mx-auto max-w-2xl"
          />

          <RevealGroup
            as="ul"
            stagger={0.06}
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

      {/* Benefits */}
      <Section tone="surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Benefits"
            lines={["What Comes", "With the Job."]}
            description="The practical side of working here, from how we handle hours to what we put behind your learning."
            className="max-w-3xl"
          />

          <RevealGroup
            as="ul"
            stagger={0.07}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <RevealItem as="li" key={benefit.title}>
                  <article className="card-box p-7">
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius-sm)]"
                      style={{ background: "var(--color-gold-soft)" }}
                    >
                      <Icon
                        className="h-7 w-7 text-ink-900"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-6 font-display text-xl tracking-[-0.02em] text-ink-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 text-[1.125rem] leading-relaxed text-ink-500">
                      {benefit.description}
                    </p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      {/* Open positions */}
      <Section id="open-positions">
        <div className="container-x">
          <SectionHeading
            eyebrow="Open positions"
            lines={["Roles We Are", "Hiring For."]}
            description="Every role here is a real opening on a real team. If none of them fit, send us your work anyway."
            className="max-w-3xl"
          />

          <Reveal delay={0.05}>
            <p className="mt-6 max-w-[62ch] text-[1.125rem] text-ink-500">
              These are sample roles showing the disciplines we hire into. Confirm
              current availability by emailing{" "}
              <a
                href={`mailto:${site.contact.careersEmail}`}
                className="font-medium text-ink-900 underline decoration-lavender decoration-2 underline-offset-4 transition-colors hover:decoration-gold"
              >
                {site.contact.careersEmail}
              </a>
              .
            </p>
          </Reveal>

          <RevealGroup as="ul" stagger={0.06} className="mt-9 space-y-px">
            {openRoles.map((role) => (
              <RevealItem as="li" key={role.slug}>
                <details className="group border-t border-ink-200 last:border-b">
                  <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-3 py-7 transition-colors duration-300 hover:bg-lavender-faint md:px-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-2xl tracking-[-0.025em] text-ink-900 md:text-3xl">
                      {role.title}
                    </h3>

                    <ul className="flex flex-wrap items-center gap-2">
                      {[role.discipline, role.type, role.location, role.experience].map(
                        (meta) => (
                          <li
                            key={meta}
                            className="hairline rounded-full px-2.5 py-1 text-[0.8125rem] text-ink-500"
                          >
                            {meta}
                          </li>
                        ),
                      )}
                    </ul>

                    <span
                      aria-hidden="true"
                      className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-all duration-300 group-hover:border-ink-900 group-open:rotate-45"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                        <path
                          d="M8 3v10M3 8h10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="grid gap-8 pb-9 md:grid-cols-12 md:px-4">
                    <p className="text-[1.125rem] leading-relaxed text-ink-700 md:col-span-4">
                      {role.summary}
                    </p>

                    <div className="md:col-span-4">
                      <h4 className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                        What you will do
                      </h4>
                      <ul className="mt-4 space-y-2.5">
                        {role.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[1.125rem] leading-relaxed text-ink-500"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-3 shrink-0 rounded-full bg-ink-300"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-4">
                      <h4 className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                        What we look for
                      </h4>
                      <ul className="mt-4 space-y-2.5">
                        {role.requirements.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[1.125rem] leading-relaxed text-ink-500"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-3 shrink-0 rounded-full bg-ink-300"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <ButtonLink
                        href={`mailto:${site.contact.careersEmail}?subject=${encodeURIComponent(
                          `Application: ${role.title}`,
                        )}`}
                        variant="secondary"
                        className="mt-7"
                      >
                        Apply for this role
                        <ArrowIcon />
                      </ButtonLink>
                    </div>
                  </div>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaSection
        eyebrow="Apply"
        lines={["Nothing Here", "Quite Fits?"]}
        description="If you are good at something we should be doing, tell us what it is. Speculative applications are read properly."
        primary={{ label: "Email Your CV", href: `mailto:${site.contact.careersEmail}` }}
        secondary={{ label: "About Aarsoft", href: "/about" }}
      />
    </>
  );
}
