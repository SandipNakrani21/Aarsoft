"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { caseStudies } from "@/data/work";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { Parallax } from "@/components/ui/Parallax";

/**
 * Projects as a single band travelling right to left, rather than a tall
 * stack the visitor has to scroll past.
 *
 * The list is rendered twice and the track is translated by exactly half its
 * width, so the loop is seamless. Hovering pauses it, and reduced-motion
 * visitors get a normal horizontal scroller with no animation at all.
 */
export function WorkMarquee() {
  const reduced = useReducedMotion();

  const card = (project: (typeof caseStudies)[number], duplicate: boolean) => (
    <li
      key={`${project.slug}${duplicate ? "-dup" : ""}`}
      aria-hidden={duplicate}
      className="w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30rem]"
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
          <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-ink-400">
            {project.category}
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
          description="A selection of the platforms we have delivered, across manufacturing, healthcare, logistics, travel, commerce and care."
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
        {reduced ? (
          <ul className="no-scrollbar container-x flex gap-6 overflow-x-auto pb-2">
            {caseStudies.map((project) => card(project, false))}
          </ul>
        ) : (
          <ul className="animate-marquee-x flex w-max gap-6 pb-2 hover:[animation-play-state:paused]">
            {caseStudies.map((project) => card(project, false))}
            {caseStudies.map((project) => card(project, true))}
          </ul>
        )}
      </Parallax>
    </Section>
  );
}
