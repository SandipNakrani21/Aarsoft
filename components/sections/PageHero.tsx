import type { ReactNode } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

/**
 * Shared hero for every inner page, with an optional breadcrumb trail.
 *
 * Sits on the Deep Black ground, so every page opens the way the home page
 * does and the navbar reads it as a dark ground on its own. The heading
 * structure is the one used site-wide: eyebrow, two lines with the
 * gradient rule under the last, then the copy beneath it.
 */
export function PageHero({
  eyebrow,
  lines,
  description,
  breadcrumb,
  gradientLines,
  children,
  align = "left",
}: {
  eyebrow: string;
  lines: string[];
  description?: string;
  breadcrumb?: { name: string; href: string }[];
  gradientLines?: number[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section
      className="dark-section relative overflow-hidden pb-14 pt-[calc(var(--nav-h)+3rem)] text-white md:pb-20 md:pt-[calc(var(--nav-h)+5rem)]"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/*
       * The band grades across rather than sitting flat: the brand's dark
       * gradient runs corner to corner over the Deep Black ground, held
       * back so it reads as depth rather than as a second colour.
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(193,184,255,0.16) 0%, rgba(193,184,255,0.1) 38%, rgba(254,217,123,0.42) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 10% 0%, rgba(13,12,21,0.94) 0%, rgba(13,12,21,0.6) 48%, rgba(13,12,21,0.25) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute -right-[10%] -top-[25%] h-[520px] w-[520px] rounded-full opacity-[0.34] soft-glow"
        style={{
          background:
            "linear-gradient(135deg, rgba(193,184,255,0.5) 0%, rgba(254,217,123,1) 100%)",
        }}
      />
      {/* Brand hairline along the top, matching the other dark blocks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div className="container-x relative">
        <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
          {/*
           * Eyebrow and trail share one row, which saves the band a whole
           * line of height. Centred headings keep the trail above, since
           * there is nothing to sit opposite it.
           */}
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-6 gap-y-3",
              align === "center" ? "flex-col" : "justify-between",
            )}
          >
            <Reveal>
              <Eyebrow dark className={cn(align === "center" && "justify-center")}>
                {eyebrow}
              </Eyebrow>
            </Reveal>

            {breadcrumb && (
              <Reveal>
                <nav aria-label="Breadcrumb">
                  <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] uppercase tracking-[0.12em] text-ink-400">
                    <li>
                      <Link href="/" className="link-gradient transition-colors hover:text-white">
                        Home
                      </Link>
                    </li>
                    {breadcrumb.map((crumb, i) => (
                      <li key={crumb.href} className="flex items-center gap-2">
                        <span aria-hidden="true">/</span>
                        {i === breadcrumb.length - 1 ? (
                          <span className="text-ink-200" aria-current="page">
                            {crumb.name}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            className="link-gradient transition-colors hover:text-white"
                          >
                            {crumb.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            )}
          </div>

          <TextReveal
            as="h1"
            delay={0.1}
            lines={lines}
            gradientLines={gradientLines ?? [lines.length - 1]}
            className={cn(
              "fluid-display mt-6 max-w-[26ch] text-white",
              align === "center" && "mx-auto",
            )}
          />

          {description && (
            <Reveal delay={0.4}>
              <p
                className={cn(
                  "mt-4 max-w-[58ch] text-xl leading-relaxed text-ink-300 md:text-2xl",
                  align === "center" && "mx-auto",
                )}
              >
                {description}
              </p>
            </Reveal>
          )}

          {children && <Reveal delay={0.5}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
