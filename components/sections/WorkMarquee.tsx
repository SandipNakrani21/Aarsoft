"use client";

import Link from "next/link";
import { caseStudies } from "@/data/work";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Parallax } from "@/components/ui/Parallax";

/**
 * One manually scrollable project band. Each unique card is rendered once;
 * keyboard/touch users and reduced-motion users get the same stable content.
 */
export function WorkMarquee() {

  const card = (project: (typeof caseStudies)[number], duplicate: boolean) => (
    <li
      key={`${project.slug}${duplicate ? "-dup" : ""}`}
      aria-hidden={duplicate}
      className="snap-start w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30rem]"
    >
      <Link
        href={`/work/${project.slug}`}
        tabIndex={duplicate ? -1 : undefined}
        className="card-box group block overflow-hidden p-0"
      >
        <ProjectVisual
          variant={project.visual}
          accent={project.accent}
          className="rounded-none"
        />

        <div className="p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
          <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-ink-500">
            {project.category} · Demonstration
          </span>

          <h3 className="mt-2.5 text-2xl font-semibold tracking-[-0.025em] text-ink-900">
            {project.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-[1.0625rem] leading-relaxed text-ink-500">
            {project.excerpt}
          </p>

          <span className="group/btn mt-5 inline-flex items-center gap-2 text-[1.0625rem] font-medium text-ink-900">
            View case study
            <ArrowIcon className="group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </li>
  );

  return (
    <Section id="work">
      <div className="container-x">
        <SplitHeading
          eyebrow="What we do"
          lines={["Products Built for", "Real-World Business."]}
          description="A selection of the demonstration platforms, across manufacturing, healthcare, logistics, travel, commerce and care."
        >
          <ButtonLink href="/work" variant="secondary">
            View all projects
            <ArrowIcon />
          </ButtonLink>
        </SplitHeading>
      </div>

      {/*
       * Full-bleed band, so cards run past both edges of the container.
       * On desktop the whole band also drifts sideways with the page scroll,
       * layered over the marquee, so the row answers the reader's movement.
       */}
      <Parallax axis="x" offset={48} className="mask-fade-x mt-10 overflow-hidden">
        <ul aria-label="Demonstration projects — scroll to explore" className="container-x flex gap-6 overflow-x-auto pb-5 snap-x snap-proximity">
          {caseStudies.map((project) => card(project, false))}
        </ul>
      </Parallax>
    </Section>
  );
}
