import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/work";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { CtaSection } from "@/components/sections/CtaSection";
import { splitIntoTwoLines } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return buildMetadata({ title: "Work", description: "", path: "/work" });

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${project.slug}`,
    keywords: [project.category.toLowerCase(), ...project.technology.map((t) => t.toLowerCase())],
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const index = caseStudies.findIndex((p) => p.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />

      <PageHero
        eyebrow={project.category}
        lines={splitIntoTwoLines(project.title)}
        description={project.description}
        breadcrumb={[
          { name: "Work", href: "/work" },
          { name: project.title, href: `/work/${project.slug}` },
        ]}
      />

      <Section compact className="pt-0">
        <div className="container-x">
          <Reveal>
            <div className="group">
              <ProjectVisual
                variant={project.visual}
                accent={project.accent}
                className="md:aspect-[21/9]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[1.125rem] text-ink-400">
              Client name withheld. The outcomes below describe what the platform
              does rather than business results claimed on a client's behalf.
            </p>
          </Reveal>

          {/* Meta bar */}
          <Reveal delay={0.15}>
            <dl className="mt-9 grid gap-8 border-y border-ink-200 py-8 sm:grid-cols-3">
              <div>
                <dt className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Category
                </dt>
                <dd className="mt-2.5 text-[1.125rem] text-ink-900">{project.category}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Technology
                </dt>
                <dd className="mt-2.5">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.technology.map((tech) => (
                      <li
                        key={tech}
                        className="hairline rounded-full px-2.5 py-1 text-[0.8125rem] text-ink-700"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Capability
                </dt>
                <dd className="mt-2.5">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="hairline rounded-full px-2.5 py-1 text-[0.8125rem] text-ink-700"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Challenge & approach */}
      <Section tone="surface">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="The challenge"
                  lines={["The Problem", "Behind the Brief."]}
                  narrow
                  description="What was actually costing the business time or revenue before we started."
                />
                <Reveal delay={0.12}>
                  <p className="mt-7 max-w-[46ch] text-[1.125rem] leading-relaxed text-ink-700">
                    {project.challenge}
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  The approach
                </span>
              </Reveal>

              <RevealGroup as="ol" stagger={0.09} className="mt-7">
                {project.approach.map((step, i) => (
                  <RevealItem
                    as="li"
                    key={step}
                    className="flex gap-6 border-t border-ink-200 py-7 first:border-t-0 first:pt-0 last:pb-0 md:gap-8"
                  >
                    <span className="mt-1 text-[0.8125rem] tracking-[0.14em] text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-[56ch] text-[1.125rem] leading-relaxed text-ink-700">
                      {step}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Section>

      {/* Outcomes */}
      <Section>
        <div className="container-x">
          <SectionHeading
            eyebrow="What it delivers"
            lines={["Capabilities", "in the Build."]}
            description="These describe what the system does, not business results claimed on behalf of a client."
            className="max-w-3xl"
          />

          <RevealGroup as="ul" stagger={0.08} className="mt-10 grid gap-5 md:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <RevealItem as="li" key={outcome}>
                <div className="card-box flex gap-4 p-7">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--color-lavender-soft)" }}
                  >
                    <Check className="h-4 w-4 text-ink-900" aria-hidden="true" />
                  </span>
                  <p className="text-[1.125rem] leading-relaxed text-ink-700">{outcome}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Next project */}
      <Section tone="surface" compact>
        <div className="container-x">
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group grid items-center gap-8 rounded-[var(--radius-lg)] border border-ink-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-lg md:grid-cols-12 md:p-8"
            >
              <div className="md:col-span-4">
                <ProjectVisual variant={next.visual} accent={next.accent} />
              </div>
              <div className="md:col-span-7">
                <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Next project — {next.category}
                </span>
                <span className="fluid-h3 mt-3 block text-ink-900">{next.title}</span>
                <span className="mt-3 block max-w-[52ch] text-[1.125rem] leading-relaxed text-ink-500">
                  {next.excerpt}
                </span>
              </div>
              <div className="md:col-span-1 md:justify-self-end">
                <ArrowRight
                  className="h-6 w-6 text-ink-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>
        </div>
      </Section>

      <CtaSection
        eyebrow="Your project"
        lines={["Have Something", "Like This in Mind?"]}
        description="Tell us what the system needs to change about your business, and we will tell you how we would approach it."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "View All Work", href: "/work" }}
      />
    </>
  );
}
