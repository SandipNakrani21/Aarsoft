import Link from "next/link";
import { featuredPost } from "@/data/insights";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Button";
import { InsightsBrowser } from "@/components/sections/InsightsBrowser";
import { CtaSection } from "@/components/sections/CtaSection";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical writing on software engineering, AI adoption, cloud cost, design systems and the business decisions behind building technology.",
  path: "/insights",
  keywords: ["software engineering blog", "AI adoption", "cloud cost", "design systems"],
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Insights", path: "/insights" }])} />

      <PageHero
        eyebrow="Insights"
        lines={["Notes From", "the Build."]}
        description="Practical writing about the decisions behind software: what to build, what to buy, and what quietly costs you later."
        breadcrumb={[{ name: "Insights", href: "/insights" }]}
      />

      {/* Featured article */}
      <Section compact className="pt-0">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/insights/${featuredPost.slug}`}
              className="dark-section group relative grid overflow-hidden rounded-[var(--radius-lg)] lg:grid-cols-12"
              style={{ backgroundColor: "var(--color-black)" }}
            >
              <div aria-hidden="true" className="brand-grid-dark absolute inset-0" />
              <div
                aria-hidden="true"
                className="animate-aurora pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.2] blur-[110px]"
                style={{ background: "var(--gradient-primary)" }}
              />

              <div className="relative p-8 md:p-12 lg:col-span-8">
                <span className="text-[0.8125rem] uppercase tracking-[0.16em] text-lavender">
                  Featured · {featuredPost.category}
                </span>

                <h2 className="fluid-h2 mt-6 max-w-[18ch] text-white">
                  {featuredPost.title}
                </h2>

                <p className="mt-6 max-w-[58ch] text-[1.125rem] leading-relaxed text-ink-300 md:text-xl">
                  {featuredPost.excerpt}
                </p>

                <span className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-ink-400">
                  <span>{featuredPost.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readingTime} min read</span>
                </span>

                <span className="group/btn mt-7 inline-flex items-center gap-2 text-[1.125rem] font-medium text-white">
                  Read article
                  <ArrowIcon />
                </span>
              </div>

              {/* Abstract editorial mark */}
              <div
                aria-hidden="true"
                className="relative hidden items-center justify-center p-12 lg:col-span-4 lg:flex"
              >
                <div className="relative h-40 w-40">
                  <span
                    className="animate-float-slow absolute inset-0 rounded-[var(--radius-lg)] opacity-80"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <span
                    className="absolute inset-6 rounded-[var(--radius-md)]"
                    style={{ backgroundColor: "var(--color-black)" }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-display text-6xl font-semibold text-white">
                    {featuredPost.readingTime}
                    <span className="ml-1 self-end pb-2 text-xs text-lavender">
                      min
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Browser */}
      <Section compact className="pt-0">
        <div className="container-x">
          <InsightsBrowser />
        </div>
      </Section>

      <CtaSection
        eyebrow="Talk to us"
        lines={["Facing One of", "These Problems?"]}
        description="If any of this sounds like your situation, we are happy to talk it through before there is any project on the table."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </>
  );
}
