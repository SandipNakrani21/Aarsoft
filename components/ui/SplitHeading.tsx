import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { TextRevealOnScroll } from "./TextReveal";

/**
 * The section header used across the site.
 *
 * Eyebrow, then the title with its gradient rule, then the supporting copy
 * directly beneath it — all left-aligned on one stack. An optional action
 * sits to the right on wide screens and drops under the copy on narrow ones.
 */
export function SplitHeading({
  eyebrow,
  lines,
  description,
  gradientLines,
  dark = false,
  className,
  descriptionClassName,
  children,
}: {
  eyebrow: string;
  lines: string[];
  description: string;
  gradientLines?: number[];
  dark?: boolean;
  className?: string;
  /** Overrides the default measure, for copy that has to hold one line. */
  descriptionClassName?: string;
  /** Optional "view all" style action. */
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div>
        <Reveal>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>

        <TextRevealOnScroll
          lines={lines}
          gradientLines={gradientLines ?? [lines.length - 1]}
          className={cn(
            "fluid-h2 mt-4 max-w-[22ch]",
            dark ? "text-white" : "text-ink-900",
          )}
        />

        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 max-w-[62ch] text-xl leading-relaxed",
              dark ? "text-ink-300" : "text-ink-500",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        </Reveal>
      </div>

      {children && (
        <Reveal delay={0.16} className="shrink-0 md:pb-2">
          {children}
        </Reveal>
      )}
    </div>
  );
}
