import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Platforms delivered by Aarsoft across travel, manufacturing, healthcare, e-commerce, logistics and care services.",
  path: "/work",
  keywords: ["software case studies", "CRM platform", "workflow automation", "AI analytics"],
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Work", path: "/work" }])} />

      <PageHero
        eyebrow="Work"
        lines={["Digital Products Built", "for Real-World Business."]}
        description="A selection of the platforms we have delivered, spanning a range of industries and business needs. Each one walks through the challenge and the decisions behind it."
        breadcrumb={[{ name: "Work", href: "/work" }]}
      >
        <div className="mt-8">
          <ButtonLink href="/contact" variant="onDark" size="lg">
            Start Your Project
            <ArrowIcon />
          </ButtonLink>
        </div>
      </PageHero>

      <WorkSection />
      <ProcessSection />
      <Testimonials />

      <CtaSection
        eyebrow="Your project"
        lines={["Yours Could Be", "the Next One."]}
        description="Bring us the problem before you have decided the solution. That is when we can help most."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </>
  );
}
