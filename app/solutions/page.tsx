import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "SaaS platforms, enterprise software, CRM and ERP systems, e-commerce, business automation, AI applications, customer portals and analytics built around business outcomes.",
  path: "/solutions",
  keywords: [
    "SaaS platform development",
    "enterprise software solutions",
    "business automation",
    "customer portal development",
    "data and analytics",
  ],
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Solutions", path: "/solutions" }])} />

      <PageHero
        eyebrow="Solutions"
        lines={["Platforms Built Around", "a Business Outcome."]}
        description="Every solution here starts from a problem that costs time or revenue. The technology is how we get there, not the point of it."
        breadcrumb={[{ name: "Solutions", href: "/solutions" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Discuss Your Requirement
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/work" variant="onDarkGhost" size="lg">
            See Our Work
          </ButtonLink>
        </div>
      </PageHero>

      <SolutionsSection />
      <IndustriesSection />
      <ProcessSection />

      <CtaSection
        eyebrow="Next step"
        lines={["Not Sure Which", "One You Need?"]}
        description="Describe the problem in plain language. We will tell you which approach fits and what it would take."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </>
  );
}
