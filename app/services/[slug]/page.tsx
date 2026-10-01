import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/data/services";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { splitIntoTwoLines } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaSection } from "@/components/sections/CtaSection";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every service page at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return buildMetadata({ title: "Service", description: "", path: "/services" });

  return buildMetadata({
    title: service.title,
    description: service.hero.intro,
    path: `/services/${service.slug}`,
    keywords: [service.title.toLowerCase(), ...service.technology.map((t) => t.toLowerCase())],
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === slug);
  const next = services[(index + 1) % services.length];
  const Icon = service.icon;

  return (
    <>
      <JsonLd
        data={serviceSchema(service.title, service.hero.intro, `/services/${service.slug}`)}
      />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow={service.hero.eyebrow}
        lines={splitIntoTwoLines(service.hero.headline)}
        description={service.hero.intro}
        breadcrumb={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Start a Project
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="#capabilities" variant="onDarkGhost" size="lg">
            See capabilities
          </ButtonLink>
        </div>
      </PageHero>

      {/* Problem / Solution */}
      <Section tone="surface">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <article className="hairline h-full rounded-[var(--radius-lg)] bg-white p-8 md:p-10">
                <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  {service.problem.title}
                </span>
                <p className="mt-5 text-2xl leading-relaxed text-ink-900 md:text-3xl">
                  {service.problem.body}
                </p>
                <ul className="mt-8 space-y-3.5 border-t border-ink-100 pt-7">
                  {service.problem.points.map((point) => (
                    <li key={point} className="flex gap-3.5 text-[1.125rem] text-ink-500">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-4 shrink-0 rounded-full bg-ink-300"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.12}>
              <article
                className="dark-section relative h-full overflow-hidden cta-shape cta-shape-sharp p-8 md:p-10"
                style={{ backgroundColor: "var(--color-black)" }}
              >
                <div aria-hidden="true" className="brand-grid-dark absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[80px]"
                  style={{ background: "var(--gradient-primary)" }}
                />

                <div className="relative">
                  <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-lavender">
                    {service.solution.title}
                  </span>
                  <p className="mt-5 text-2xl leading-relaxed text-white md:text-3xl">
                    {service.solution.body}
                  </p>
                  <ul className="mt-8 space-y-3.5 border-t border-[rgba(193,184,255,0.16)] pt-7">
                    {service.solution.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3.5 text-[1.125rem] text-ink-300"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities">
        <div className="container-x">
          <SectionHeading
            eyebrow="Capabilities"
            lines={["What This Service", "Actually Covers."]}
            description="The specific work included, so you can see where this service starts and where it hands over."
            className="max-w-3xl"
          />

          <RevealGroup
            as="ul"
            stagger={0.07}
            className="mt-10 grid gap-5 md:grid-cols-2"
          >
            {service.capabilities.map((cap, i) => (
              <RevealItem as="li" key={cap.title}>
                <div className="card-box group p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8125rem] tracking-[0.14em] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="h-7 w-7 text-ink-300 transition-colors duration-300 group-hover:text-ink-900 link-gradient"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="fluid-h3 mt-8 text-ink-900">{cap.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-[1.125rem] leading-relaxed text-ink-500">
                    {cap.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Technology */}
      <Section tone="surface" compact>
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <SectionHeading
                eyebrow="Technology"
                lines={["The Tools", "We Use."]}
                as="h2"
                description="Chosen for support horizons and hiring pools, not novelty."
              />
            </div>
            <Reveal delay={0.1} className="md:col-span-8">
              <ul className="flex flex-wrap gap-2">
                {service.technology.map((tech) => (
                  <li
                    key={tech}
                    className="hairline rounded-[var(--radius-sm)] bg-white px-4 py-2.5 text-[1.125rem] text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:shadow-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <ProcessSection />

      {/* Benefits */}
      <Section>
        <div className="container-x">
          <SectionHeading
            eyebrow="Benefits"
            lines={["What You Get", "Out of It."]}
            description="The outcomes this work is measured against once it is live and people are relying on it."
            className="max-w-3xl"
          />

          <RevealGroup
            as="ul"
            stagger={0.07}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {service.benefits.map((benefit) => (
              <RevealItem as="li" key={benefit.title}>
                <div className="card-box p-7">
                  <span
                    aria-hidden="true"
                    className="block h-1 w-10 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <h3 className="mt-6 font-display text-xl tracking-[-0.02em] text-ink-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-[1.125rem] leading-relaxed text-ink-500">
                    {benefit.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface" id="faq">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="FAQ"
                  lines={["Common", "Questions."]}
                  narrow
                  description="If yours is not here, ask us directly."
                />
                <ButtonLink href="/contact" variant="secondary" className="mt-8">
                  Ask a question
                  <ArrowIcon />
                </ButtonLink>
              </div>
            </div>

            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion items={service.faqs} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Next service */}
      <Section compact>
        <div className="container-x">
          <Reveal>
            <Link
              href={`/services/${next.slug}`}
              className="group flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-lg)] border border-ink-200 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-lg md:p-10"
            >
              <span>
                <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Next service
                </span>
                <span className="fluid-h3 mt-2.5 block text-ink-900">{next.title}</span>
              </span>
              <ArrowRight
                className="h-6 w-6 text-ink-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </Section>

      <CtaSection
        eyebrow="Get started"
        lines={["Ready to Talk", "About Your Project?"]}
        description={`Tell us what you are trying to achieve with ${service.title.toLowerCase()} and we will come back with a clear view of scope and approach.`}
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "All Services", href: "/services" }}
      />
    </>
  );
}
