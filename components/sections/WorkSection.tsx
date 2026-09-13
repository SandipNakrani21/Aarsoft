import Link from "next/link";
import { caseStudies } from "@/data/work";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";

export function WorkSection({ limit }: { limit?: number }) {
  const list = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <Section id="work">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            lines={["Digital Products Built", "for Real-World Business."]}
            description="Platforms delivered across manufacturing, travel, healthcare and logistics, each one walked through from the problem to the decisions behind it."
            className="max-w-3xl"
          />
          {limit && (
            <div className="shrink-0 pb-2">
              <ButtonLink href="/work" variant="secondary">
                View all work
                <ArrowIcon />
              </ButtonLink>
            </div>
          )}
        </div>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-[62ch] text-[1.125rem] text-ink-500">
            A selection of the platforms we have delivered, spanning a range of
            industries and business needs. Client names are withheld, and the
            outcomes describe what each platform does rather than claimed figures.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-8">
          {list.map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={(i % 2) * 0.1}
              className={i % 3 === 0 ? "lg:col-span-2" : undefined}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block h-full"
                aria-label={`View case study: ${project.title}`}
              >
                <div className="overflow-hidden rounded-[var(--radius-lg)]">
                  <ProjectVisual
                    variant={project.visual}
                    accent={project.accent}
                    className={i % 3 === 0 ? "lg:aspect-[21/9]" : undefined}
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-[58ch]">
                    <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-ink-400">
                      {project.category}
                    </span>
                    <h3 className="fluid-h3 mt-2.5 text-ink-900">{project.title}</h3>
                    <p className="mt-2.5 text-[1.125rem] leading-relaxed text-ink-500">
                      {project.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.technology.map((tech) => (
                        <li
                          key={tech}
                          className="hairline rounded-full px-2.5 py-1 text-[0.8125rem] text-ink-500"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="group/btn mt-1 inline-flex shrink-0 items-center gap-1.5 text-[1.125rem] font-medium text-ink-900">
                    View Case Study
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
