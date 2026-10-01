import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { NodeNetwork } from "@/components/visuals/NodeNetwork";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";

const capabilities = [
  "Automate repetitive workflows",
  "Extract insights from data",
  "Build intelligent assistants",
  "Improve customer experiences",
  "Generate content",
  "Predict business trends",
  "Connect business systems",
];

export function AiSection() {
  return (
    <section id="ai" className="section-y-sm relative">
      <div className="container-x">
      <div className="relative">
        {/* Offset gradient frames tracing the two sweeping corners. */}
        <div aria-hidden="true" className="cta-frame cta-frame-tr" />
        <div aria-hidden="true" className="cta-frame cta-frame-bl" />

      <div
        className="cta-shape cta-shape-sharp dark-section relative overflow-hidden bg-ink-900 px-6 py-12 text-white md:px-14 md:py-16"
        style={{ backgroundColor: "var(--color-black)" }}
      >
      {/*
       * Abstract AI network. Masked so it fades out before it reaches the
       * copy, rather than running behind the paragraph text.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 lg:opacity-60"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 32%, #000 70%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 32%, #000 70%)",
        }}
      >
        {/* Background layers drift at different rates behind the copy. */}
        <Parallax offset={-28} className="absolute -inset-y-10 inset-x-0" innerClassName="h-full">
          <NodeNetwork />
        </Parallax>
      </div>
      <Parallax
        offset={70}
        className="pointer-events-none absolute -right-32 top-0"
      >
        <div
          aria-hidden="true"
          className="animate-aurora h-[520px] w-[520px] rounded-full opacity-[0.18] blur-[130px]"
          style={{ background: "var(--gradient-primary)" }}
        />
      </Parallax>

      <div className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Artificial Intelligence"
              lines={["Make Your Business", "Intelligent."]}
              narrow
              gradientLines={[1]}
              dark
              description="The value of AI is not the model. It is the workflow you remove, the answer you get in seconds, and the decision you make with confidence."
            />

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                  <ButtonLink href="/services/ai-and-automation" variant="onDark" size="lg">
                    Explore AI Solutions
                    <ArrowIcon />
                  </ButtonLink>
                </Magnetic>
                <ButtonLink href="/contact" variant="onDarkGhost" size="lg">
                  Discuss a use case
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <RevealGroup as="ul" stagger={0.07} className="space-y-px">
              {capabilities.map((item) => (
                <RevealItem
                  as="li"
                  key={item}
                  className="group flex items-center gap-4 border-t border-[rgba(193,184,255,0.14)] py-3 last:border-b"
                >
                  {/* Mark and label lift together on hover. */}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-110"
                    style={{ background: "rgba(193,184,255,0.14)" }}
                  >
                    <Check
                      className="h-4 w-4 text-lavender transition-colors duration-400 group-hover:text-gold"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[1.125rem] text-ink-200 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-white">
                    {item}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </section>
  );
}
