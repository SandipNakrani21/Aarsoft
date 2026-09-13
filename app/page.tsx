import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyAarsoft } from "@/components/sections/WhyAarsoft";
import { TechStack } from "@/components/sections/TechStack";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { WorkMarquee } from "@/components/sections/WorkMarquee";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AiSection } from "@/components/sections/AiSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhoWeAre />
      <WhyAarsoft />
      <ServicesGrid limit={8} />
      <TechStack />
      <SolutionsSection limit={6} />
      <IndustriesSection />
      <WorkMarquee />
      <ProcessSection />
      <AiSection />
      <StatsSection />
      <Testimonials />
      <CtaSection />
    </>
  );
}
