import Link from "next/link";
import { services } from "@/data/services";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { CardHead } from "@/components/ui/CardHead";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechStack } from "@/components/sections/TechStack";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Custom software, web and mobile development, AI and automation, UI/UX design, cloud and DevOps, ERP and CRM, and system integration from Aarsoft Technologies.",
  path: "/services",
  keywords: [
    "software development services",
    "web development",
    "mobile app development",
    "AI automation",
    "cloud DevOps",
    "ERP CRM development",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />

      <PageHero
        eyebrow="Services"
        lines={["Technology That Solves", "Real Business Problems."]}
        description="Eight practice areas, one delivery standard. Each engagement starts with the outcome you need and works backwards to the build."
        breadcrumb={[{ name: "Services", href: "/services" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Start a Project
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="#all-services" variant="onDarkGhost" size="lg">
            Browse services
          </ButtonLink>
        </div>
      </PageHero>

      {/*
       * The practice index.
       *
       * Written as a card mosaic rather than rows: laid out as a table it
       * read like a CRM listing, because every entry shared the same
       * columns and rules. Here each practice is its own tile, with the
       * number set oversized behind the content so the eye moves down the
       * grid instead of across a ledger.
       */}
      <Section id="all-services" compact>
        <div className="container-x">
          <SectionHeading
            eyebrow="Practice areas"
            lines={["Eight Practices,", "One Delivery Standard."]}
            description="Each one is a team we staff and a standard we hold, not a line on a capability list."
            className="max-w-3xl"
          />

          <RevealGroup
            as="ul"
            stagger={0.06}
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {services.map((service) => {
              return (
                <RevealItem as="li" key={service.slug} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-box corner-card group flex h-full flex-col"
                  >
                    {/*
                      Oversized numeral, set back so it reads as texture. It is
                      clipped by its own layer, so the card needs no overflow
                      clipping and the corner tab can sit over the border.
                    */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden [border-radius:inherit]"
                    >
                      <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-semibold leading-none tracking-[-0.05em] text-ink-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-ink-200">
                        {service.number}
                      </span>
                    </span>

                    <CardHead
                      icon={service.icon}
                      title={service.title}
                      as="h2"
                      className="relative"
                      titleClassName="text-2xl leading-tight text-ink-900"
                    />

                    <p className="relative mt-3 text-[1.125rem] leading-relaxed text-ink-500">
                      {service.excerpt}
                    </p>

                    <span className="relative mt-7 inline-flex items-center gap-1.5 text-[1.0625rem] font-medium text-ink-900">
                      View service
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement models"
            lines={["Three Ways to", "Work With Us."]}
            description="Scope and commercial structure follow the problem, not a fixed template."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" stagger={0.08} className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Fixed-scope project",
                body: "A defined outcome, an agreed price and a clear delivery date. Best when requirements are well understood.",
                fit: "Best for: a first release or a bounded rebuild",
              },
              {
                title: "Dedicated team",
                body: "An engineering team working to your roadmap, with your ceremonies, on a monthly basis.",
                fit: "Best for: continuous product development",
              },
              {
                title: "Advisory & audit",
                body: "An architecture, performance or security review with a prioritised, costed remediation plan.",
                fit: "Best for: assessing an existing system",
              },
            ].map((model) => (
              <RevealItem as="li" key={model.title}>
                <article className="card-box flex flex-col p-8">
                  <h3 className="fluid-h3 text-ink-900">{model.title}</h3>
                  <p className="mt-4 flex-1 text-[1.125rem] leading-relaxed text-ink-500">
                    {model.body}
                  </p>
                  <p className="mt-6 border-t border-ink-100 pt-5 text-[0.875rem] text-ink-400">
                    {model.fit}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[62ch] text-[1.125rem] text-ink-500">
              Not sure which fits? Describe the problem and we will tell you which
              model we would recommend, including when that is the smallest one.
            </p>
          </Reveal>
        </div>
      </Section>

      <ProcessSection />
      <TechStack />

      <CtaSection
        eyebrow="Next step"
        lines={["Tell Us What", "You Need to Build."]}
        description="Send a short brief and we will come back with an honest view of scope, approach and where the risks are."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See Our Work", href: "/work" }}
      />
    </>
  );
}
