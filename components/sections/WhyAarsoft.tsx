import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { WhyAarsoftSystem } from "./WhyAarsoftSystem";

export function WhyAarsoft() {
  return (
    <Section id="why-us" tone="surface">
      <div className="container-x">
        <SplitHeading
          eyebrow="Why us"
          lines={["Why Businesses", "Choose Aarsoft."]}
          description="Engineering judgement built over a decade of delivering software that businesses run on every day."
          actionFrom="right"
        >
          <ButtonLink href="/about" variant="secondary">
            About Aarsoft
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <WhyAarsoftSystem />
      </div>
    </Section>
  );
}
