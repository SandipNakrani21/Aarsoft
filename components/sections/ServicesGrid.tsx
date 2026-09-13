import Link from "next/link";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export function ServicesGrid({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Section id="services" tone="light">
      <div className="container-x">
        {showHeading && (
          <SplitHeading
            eyebrow="Services"
            lines={["Technology That Solves", "Real Business Problems."]}
            description="Eight practice areas, one delivery standard. Every engagement starts with the outcome you need and works backwards to the build."
          >
            <ButtonLink href="/services" variant="secondary">
              View all services
              <ArrowIcon />
            </ButtonLink>
          </SplitHeading>
        )}

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {list.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem as="li" key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card-box group flex h-full flex-col p-7 lg:p-8"
                >

                  <div className="flex items-start justify-between">
                    <span className="text-[0.8125rem] tracking-[0.14em] text-ink-400">
                      {service.number}
                    </span>
                    <Icon
                      className="h-7 w-7 text-ink-400 transition-colors duration-300 group-hover:text-ink-900 link-gradient"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-9 font-display text-2xl leading-tight tracking-[-0.025em] text-ink-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-[1.125rem] leading-relaxed text-ink-500">
                    {service.excerpt}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[1.125rem] font-medium text-ink-900">
                    <span className="relative">
                      Learn more
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink-900 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
                      />
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    >
                      <path
                        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
