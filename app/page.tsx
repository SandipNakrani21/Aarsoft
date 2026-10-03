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
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { ScrollScene } from "@/components/ui/ScrollScene";
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
      {/*
        Every section after the hero enters on scroll: light sections rise into
        place, full-width dark sections open out from an inset panel. See
        ScrollScene; desktop only, and still under reduced motion.
      */}
      <ScrollScene>
        <TrustStrip />
      </ScrollScene>
      <ScrollScene>
        <WhoWeAre />
      </ScrollScene>
      <ScrollScene variant="panel">
        <WhyAarsoft />
      </ScrollScene>
      <ScrollScene>
        <TechStack />
      </ScrollScene>
      <ScrollScene variant="panel">
        <ServicesGrid limit={8} />
      </ScrollScene>
      <ScrollScene>
        <SolutionsSection limit={6} />
      </ScrollScene>
      <ScrollScene variant="panel">
        <IndustriesSection />
      </ScrollScene>
      <ScrollScene>
        <WorkMarquee />
      </ScrollScene>
      <ScrollScene>
        <ProcessSection />
      </ScrollScene>
      <ScrollScene>
        <AiSection />
      </ScrollScene>
      <ScrollScene>
        <Testimonials />
      </ScrollScene>
      <ScrollScene>
        <CtaSection />
      </ScrollScene>
    </>
  );
}
