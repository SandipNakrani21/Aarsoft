"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Horizontal timeline on desktop, vertical on mobile. The connecting rail
 * fills as the section scrolls through the viewport, which gives the steps
 * a sense of progression without any additional chrome.
 */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Section id="process" tone="surface">
      <div className="container-x">
        <SplitHeading
          eyebrow="Process"
          lines={["From First Idea", "to Production."]}
          description="Five stages, each with a defined output you sign off before the next one begins."
          descriptionClassName="max-w-none xl:whitespace-nowrap"
        >
          <ButtonLink href="/contact" variant="secondary">
            Start a project
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>

        <div ref={ref} className="relative mt-11 md:mt-20">
          {/* Rails */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-ink-200 md:left-0 md:top-[19px] md:h-px md:w-full"
          />
          <motion.div
            aria-hidden="true"
            style={
              reduced
                ? { transform: "scale(1)" }
                : { scaleY: progress, scaleX: progress }
            }
            className="bg-gradient-primary absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px origin-top md:left-0 md:top-[19px] md:h-px md:w-full md:origin-left"
          />

          <RevealGroup
            as="ol"
            stagger={0.1}
            className="grid gap-8 md:grid-cols-5 md:gap-6"
          >
            {processSteps.map((step) => (
              <RevealItem as="li" key={step.number} className="relative pl-14 md:pl-0">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-[0.8125rem] text-ink-700 md:relative md:mb-7"
                >
                  {step.number}
                </span>

                <h3 className="font-display text-2xl tracking-[-0.025em] text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[1.125rem] font-medium leading-relaxed text-ink-700">
                  {step.description}
                </p>
                <p className="mt-2.5 text-[1.125rem] leading-relaxed text-ink-500">
                  {step.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
