"use client";

import { processSteps } from "@/data/company";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * The five delivery stages as a zig-zag of orbiting badges.
 *
 * On desktop the steps alternate: odd stages carry the badge on top with
 * the copy, stem and number beneath it; even stages mirror that, number on
 * top and badge at the bottom. The mirroring is just `flex-col-reverse` on
 * the same markup, so reading order, headings and copy are identical in
 * both, and on phones the list collapses to badge-beside-copy rows.
 *
 * Each badge is a solid disc (Deep Black or the brand gradient, alternating)
 * inside a still dashed ring and an outer ring of gradient arcs and dots
 * that slowly orbits. The orbit is pure CSS and stops under reduced motion.
 */
export function ProcessSection() {
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

        <RevealGroup
          as="ol"
          stagger={0.12}
          className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-5 lg:gap-6"
        >
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            const low = i % 2 === 1;
            const dark = i % 2 === 0;
            return (
              <RevealItem
                as="li"
                key={step.number}
                className={cn(
                  "process-step group flex items-center gap-5 lg:items-center lg:gap-0",
                  low ? "lg:flex-col-reverse" : "lg:flex-col",
                )}
              >
                {/* Badge */}
                <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32 lg:h-44 lg:w-44">
                  <svg
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full overflow-visible"
                  >
                    <defs>
                      <linearGradient id={`process-arc-${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C1B8FF" />
                        <stop offset="100%" stopColor="#FED97B" />
                      </linearGradient>
                    </defs>

                    {/* Still dashed ring, hugging the disc. */}
                    <circle
                      cx="100"
                      cy="100"
                      r="79"
                      fill="none"
                      stroke={dark ? "rgba(13,12,21,0.35)" : "#C1B8FF"}
                      strokeWidth="1.4"
                      strokeDasharray="4 5"
                    />

                    {/* Orbit: two broken arcs and their dots, turning slowly. */}
                    <g
                      className={cn("process-orbit", low && "process-orbit-reverse")}
                      style={{ animationDuration: `${20 + i * 3}s` }}
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="92"
                        fill="none"
                        stroke={`url(#process-arc-${i})`}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeDasharray="150 38 205 185"
                      />
                      <circle cx="192" cy="100" r="4.5" fill="#FED97B" />
                      <circle cx="20" cy="140" r="3" fill={dark ? "#0D0C15" : "#C1B8FF"} />
                      <circle cx="140" cy="7" r="2.4" fill="#C1B8FF" />
                    </g>
                  </svg>

                  {/* Disc */}
                  <div
                    className={cn(
                      "process-disc absolute inset-[15%] flex items-center justify-center rounded-full",
                      dark ? "bg-ink-900 text-white" : "text-ink-900",
                    )}
                    style={dark ? undefined : { background: "var(--gradient-primary)" }}
                  >
                    <Icon className="h-[38%] w-[38%]" strokeWidth={1.4} aria-hidden="true" />
                  </div>
                </div>

                {/* Copy */}
                <div className="min-w-0 lg:flex lg:min-h-[7.5rem] lg:flex-col lg:items-center lg:justify-center lg:px-1 lg:py-4 lg:text-center">
                  <span className="text-[0.8125rem] font-medium tracking-[0.14em] text-ink-400 lg:hidden">
                    {step.number}
                  </span>
                  <h3 className="process-title font-display text-2xl tracking-[-0.025em] text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-ink-500">
                    {step.description}
                  </p>
                </div>

                {/* Stem and number — desktop only; phones show the number above the title. */}
                <span
                  aria-hidden="true"
                  className="process-stem hidden h-8 w-px lg:block"
                />
                <span
                  aria-hidden="true"
                  className="process-pill hidden h-9 w-9 items-center justify-center rounded-full text-[0.8125rem] font-medium lg:flex"
                >
                  {step.number}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
