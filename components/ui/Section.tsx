import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TextRevealOnScroll } from "./TextReveal";

/** Small uppercase label that sits above every section heading. */
export function Eyebrow({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em]",
        dark ? "text-lavender" : "text-ink-500",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6",
          dark ? "bg-lavender/50" : "bg-gradient-primary",
        )}
      />
      {children}
    </span>
  );
}

/**
 * Standard section header: eyebrow, heading with line-by-line reveal, and
 * optional supporting copy. Headings are passed as an array of lines so the
 * reveal can mask each one independently.
 */
export function SectionHeading({
  eyebrow,
  lines,
  description,
  align = "left",
  dark = false,
  gradientLines,
  as = "h2",
  narrow = false,
  className,
  children,
}: {
  eyebrow?: string;
  lines: string[];
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  gradientLines?: number[];
  as?: "h1" | "h2" | "h3";
  /** Set when the heading sits in a narrow side column. */
  narrow?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <TextRevealOnScroll
        as={as}
        lines={lines}
        gradientLines={gradientLines ?? [lines.length - 1]}
        className={cn(
          as === "h1" ? "fluid-display" : narrow ? "fluid-h2-narrow" : "fluid-h2",
          "mt-5 max-w-[26ch]",
          align === "center" && "mx-auto",
          dark ? "text-white" : "text-ink-900",
        )}
      />

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-4 max-w-[72ch] text-xl leading-relaxed",
              dark ? "text-ink-300" : "text-ink-500",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}

/** Page section wrapper with consistent vertical rhythm. */
export function Section({
  children,
  className,
  id,
  tone = "light",
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "surface" | "dark";
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        compact ? "section-y-sm" : "section-y",
        tone === "surface" && "bg-surface",
        tone === "dark" && "dark-section bg-ink-900 text-white",
        className,
      )}
      style={tone === "dark" ? { backgroundColor: "var(--color-black)" } : undefined}
    >
      {children}
    </section>
  );
}
