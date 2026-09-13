import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getPost, posts } from "@/data/insights";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaSection } from "@/components/sections/CtaSection";
import { formatDate, splitIntoTwoLines } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Insights", description: "", path: "/insights" });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    keywords: [post.category.toLowerCase()],
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />

      <PageHero
        eyebrow={post.category}
        lines={splitIntoTwoLines(post.title)}
        description={post.excerpt}
        breadcrumb={[
          { name: "Insights", href: "/insights" },
          { name: post.title, href: `/insights/${post.slug}` },
        ]}
      >
        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[rgba(193,184,255,0.18)] pt-7 text-[0.9375rem] text-ink-300">
          <span className="font-medium text-white">{post.author}</span>
          <span className="text-ink-400">{post.authorRole}</span>
          <span aria-hidden="true" className="text-ink-500">
            ·
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true" className="text-ink-500">
            ·
          </span>
          <span>{post.readingTime} min read</span>
        </div>
      </PageHero>

      {/* Body */}
      <Section compact className="pt-0">
        <div className="container-x">
          <article className="mx-auto max-w-[68ch]">
            {post.body.map((block, i) =>
              block.startsWith("## ") ? (
                <Reveal key={i}>
                  <h2 className="fluid-h3 mt-10 text-ink-900 first:mt-0">
                    {block.replace("## ", "")}
                  </h2>
                </Reveal>
              ) : (
                <Reveal key={i} delay={0.02}>
                  <p className="mt-6 text-[1.125rem] leading-[1.75] text-ink-700 md:text-xl md:leading-[1.75]">
                    {block}
                  </p>
                </Reveal>
              ),
            )}

            <Reveal>
              <div className="mt-11 border-t border-ink-200 pt-8">
                <p className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                  Written by
                </p>
                <div className="mt-4 flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[0.8125rem] font-medium text-ink-900"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    AT
                  </span>
                  <span className="text-[1.125rem]">
                    <span className="block font-medium text-ink-900">{post.author}</span>
                    <span className="block text-ink-500">{post.authorRole}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </article>
        </div>
      </Section>

      {/* Related */}
      <Section tone="surface" compact>
        <div className="container-x">
          <h2 className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
            Keep reading
          </h2>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="card-box group flex flex-col p-7"
                >
                  <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-ink-400">
                    {item.category}
                  </span>
                  <h3 className="mt-4 flex-1 font-display text-xl leading-tight tracking-[-0.02em] text-ink-900">
                    {item.title}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[1.125rem] font-medium text-ink-900">
                    Read
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection
        eyebrow="Talk to us"
        lines={["Want to Discuss", "This in Context?"]}
        description="Every business applies these differently. Tell us your situation and we will give you a straight answer."
        primary={{ label: "Start a Conversation", href: "/contact" }}
        secondary={{ label: "More Insights", href: "/insights" }}
      />
    </>
  );
}
