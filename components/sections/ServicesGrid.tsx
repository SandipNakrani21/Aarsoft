import Link from "next/link";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

/**
 * Services on the dark ground. Each practice is a tinted glass card with a
 * large outlined number riding its top-right corner, a gradient title and
 * the summary beneath — the number is SVG so its outline can carry the
 * brand gradient, which CSS text-stroke cannot.
 */
export function ServicesGrid({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Section id="services" tone="dark" className="overflow-hidden">
      {/* Brand grid and a soft glow behind the cards */}
      <div aria-hidden="true" className="brand-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="container-x relative">
        {showHeading && (
          <SplitHeading
            dark
            eyebrow="Services"
            lines={["Technology That Solves", "Real Business Problems."]}
            description="Eight practice areas, one delivery standard. Every engagement starts with the outcome you need and works backwards to the build."
          >
            <ButtonLink href="/services" variant="onDarkGhost">
              View all services
              <ArrowIcon />
            </ButtonLink>
          </SplitHeading>
        )}

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {list.map((service, i) => {
            const Icon = service.icon;
            const gradientId = `svc-num-${i}`;
            return (
              /* Top padding leaves room for the number to ride above the card. */
              <RevealItem as="li" key={service.slug} className="pt-10">
                <Link href={`/services/${service.slug}`} className="svc-card group">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 110"
                    className="svc-number"
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C1B8FF" />
                        <stop offset="100%" stopColor="#FED97B" />
                      </linearGradient>
                    </defs>
                    <text
                      x="200"
                      y="92"
                      textAnchor="end"
                      fill={`url(#${gradientId})`}
                      stroke={`url(#${gradientId})`}
                      strokeWidth="1.6"
                      className="svc-number-text"
                    >
                      {service.number}
                    </text>
                  </svg>

                  <span className="svc-icon">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>

                  <h3 className="text-gradient mt-6 w-fit font-display text-2xl font-semibold leading-tight tracking-[-0.025em]">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[1.0625rem] leading-relaxed text-ink-300">
                    {service.excerpt}
                  </p>

                  <span className="group/btn mt-6 inline-flex items-center gap-2 text-[1.0625rem] font-medium text-white">
                    Learn more
                    <ArrowIcon className="group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
