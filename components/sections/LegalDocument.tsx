import { Reveal } from "@/components/ui/Reveal";

/** Shared layout for the privacy and terms pages. */
export function LegalDocument({
  sections,
}: {
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Contents */}
      <nav aria-label="On this page" className="lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <h2 className="text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
            On this page
          </h2>
          <ul className="mt-5 space-y-2.5">
            {sections.map((section) => (
              <li key={section.heading}>
                <a
                  href={`#${slugify(section.heading)}`}
                  className="text-[1.125rem] text-ink-500 transition-colors hover:text-ink-900 link-gradient"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="lg:col-span-8 lg:col-start-5">
        <Reveal>
          <p className="hairline rounded-[var(--radius-md)] bg-surface p-6 text-[1.125rem] leading-relaxed text-ink-500">
            This is a general template provided as a starting point. Have it
            reviewed by a qualified legal adviser before relying on it.
          </p>
        </Reveal>

        {sections.map((section) => (
          <Reveal key={section.heading}>
            <section className="mt-9 first:mt-8">
              <h2
                id={slugify(section.heading)}
                className="fluid-h3 scroll-mt-32 text-ink-900"
              >
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-5 max-w-[68ch] text-[1.125rem] leading-[1.75] text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
