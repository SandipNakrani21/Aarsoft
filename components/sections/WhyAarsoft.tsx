import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { WhyAarsoftSystem } from "./WhyAarsoftSystem";

/** On the dark ground, matching the Services section: plain, with a soft glow. */
export function WhyAarsoft() {
  return (
    <Section id="why-us" tone="dark" className="overflow-x-clip">
      {/* `overflow-x-clip`, not hidden: hidden would make this a scroll box and break the pinned sequence. */}
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-[0.12] soft-glow"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="container-x relative">
        <SplitHeading
          dark
          eyebrow="Why us"
          lines={["Why Businesses", "Choose Aarsoft."]}
          description="Engineering judgement built over a decade of delivering software that businesses run on every day."
          actionFrom="right"
        >
          <ButtonLink href="/about" variant="onDarkGhost">
            About Aarsoft
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <WhyAarsoftSystem />
      </div>
    </Section>
  );
}
