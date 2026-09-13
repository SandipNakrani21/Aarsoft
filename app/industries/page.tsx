import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Software for healthcare, finance, retail, e-commerce, logistics, education, real estate, manufacturing, professional services and startups.",
  path: "/industries",
  keywords: [
    "healthcare software development",
    "fintech software",
    "retail technology",
    "logistics software",
    "manufacturing systems",
  ],
});

const approach = [
  {
    title: "We learn your vocabulary first",
    body: "Every sector names the same idea differently. Getting that wrong in the data model creates confusion that lasts for years.",
  },
  {
    title: "Compliance shapes the design",
    body: "Retention, access control and audit requirements are architectural decisions. We establish them before the first schema.",
  },
  {
    title: "We design for the real environment",
    body: "A warehouse tablet, a hospital corridor and a trading desk are different problems. Interfaces are built for where they are used.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Industries", path: "/industries" }])} />

      <PageHero
        eyebrow="Industries"
        lines={["Context Matters", "as Much as Code."]}
        gradientLines={[1]}
        description="We work across sectors, and we treat the differences between them as part of the engineering problem rather than a detail to pick up later."
        breadcrumb={[{ name: "Industries", href: "/industries" }]}
      >
        <div className="mt-8">
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Talk to Us About Your Sector
            <ArrowIcon />
          </ButtonLink>
        </div>
      </PageHero>

      <IndustriesSection />

      <Section tone="surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our approach"
            lines={["How Sector Knowledge", "Changes the Build."]}
            description="What a sector expects of its software shapes the architecture, the data model and the rollout, so we settle it before the build."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" stagger={0.09} className="mt-10 grid gap-5 md:grid-cols-3">
            {approach.map((item, i) => (
              <RevealItem as="li" key={item.title}>
                <article className="card-box p-8">
                  <span className="text-[0.8125rem] tracking-[0.14em] text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="fluid-h3 mt-7 text-ink-900">{item.title}</h3>
                  <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-500">
                    {item.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <SolutionsSection limit={6} />

      <CtaSection
        eyebrow="Get started"
        lines={["Your Sector Has", "Its Own Constraints."]}
        description="Tell us about them. We would rather understand the regulation and the reality before proposing anything."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
