"use client";

import { useReducedMotion, type Variants } from "framer-motion";
import type { ElementType } from "react";
import { resolveMotionTag } from "./motionTags";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

/*
 * Headings shrink to their content so the rule beneath can span the
 * longest line exactly, ending on its last character rather than running
 * out to the column edge. The max-width each caller sets still caps it, so
 * a line that has to wrap falls back to the available width.
 */
const HEADING_FIT = "w-fit";

/*
 * Highlight treatment for an emphasised headline line.
 *
 * The gradient emphasis is now a standalone rule drawn beneath the whole
 * heading rather than an underline hung off one line, so it never crowds a
 * descender and the gap to the copy below is set once, here. The
 * filled-glyph variant is still opt-in via `fill`, and is only used where
 * the ground is dark enough for it — currently the hero.
 */
const highlightClass = (fill: boolean) => (fill ? "text-gradient" : undefined);

/**
 * The rule that sits between a heading and its supporting copy. It fills
 * the heading, which is itself sized to the longest line, so it stops on
 * the title's last character. Its own top margin holds it clear of the
 * descenders; the bottom margin is what the copy below is spaced from.
 */
function HeadingRule() {
  return (
    <span
      aria-hidden="true"
      className="mb-1 mt-6 block h-[3px] w-full rounded-full"
      style={{ background: "var(--gradient-primary)" }}
    />
  );
}

/*
 * One parent drives the whole heading and the lines inherit through
 * variants. Giving each line its own trigger proved unreliable — lines near
 * the edge of the trigger area could be left un-animated.
 */
const container: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.085, delayChildren: delay },
  }),
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/*
 * The hero's version also resolves from a slight blur as it rises. Blur is
 * costly to animate, so it is kept to this one heading, runs once, and is
 * cleared entirely when it lands so the text is not left on a filter layer.
 * Opacity is deliberately not animated: the mask already hides the line, and
 * the headline is the page's largest paint, which should not start at zero.
 */
const lineSoft: Variants = {
  hidden: { y: "110%", filter: "blur(8px)" },
  visible: {
    y: "0%",
    filter: "blur(0px)",
    transitionEnd: { filter: "none" },
    transition: { duration: 1, ease: EASE_OUT },
  },
};

type SharedProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Indexes of lines that get the brand highlight. */
  gradientLines?: number[];
  /** Fill the highlighted line with the gradient instead of ruling it. */
  fill?: boolean;
  /** Draw the gradient rule beneath the heading. Off for filled headings. */
  rule?: boolean;
};

function Lines({
  lines,
  gradientLines,
  fill,
  rule,
  reduced,
  soft = false,
}: {
  lines: string[];
  gradientLines: number[];
  fill: boolean;
  rule: boolean;
  reduced: boolean;
  soft?: boolean;
}) {
  return (
    <>
      {lines.map((text, i) => {
        const highlight = gradientLines.includes(i) ? highlightClass(fill) : undefined;
        const content = highlight ? <span className={highlight}>{text}</span> : text;

        return (
          <span
            key={text}
            className="block overflow-hidden"
            /* Extra room so ascenders and descenders are never clipped. */
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            {reduced ? (
              <span className="block">{content}</span>
            ) : (
              <MotionLine soft={soft}>{content}</MotionLine>
            )}
          </span>
        );
      })}
      {rule && <HeadingRule />}
    </>
  );
}

const MotionSpan = resolveMotionTag("span");

function MotionLine({ children, soft }: { children: React.ReactNode; soft: boolean }) {
  return (
    <MotionSpan className="block" variants={soft ? lineSoft : line}>
      {children}
    </MotionSpan>
  );
}

/**
 * Line-by-line masked text reveal for major headlines. Each line is clipped
 * by its own wrapper and slides up into view, which reads as deliberate
 * rather than as a generic fade. This variant animates on mount.
 */
export function TextReveal({
  lines,
  as: Tag = "h1",
  className,
  delay = 0,
  gradientLines = [],
  fill = false,
  rule,
  soft = false,
  play = true,
}: SharedProps & {
  delay?: number;
  /** Add a blur-to-sharp resolve to the rise. Reserved for the hero. */
  soft?: boolean;
  /** Hold the reveal until this turns true, e.g. while the intro loader shows. */
  play?: boolean;
}) {
  const reduced = useReducedMotion();
  const showRule = rule ?? !fill;

  if (reduced) {
    return (
      <Tag className={cn(HEADING_FIT, className)}>
        <Lines
          lines={lines}
          gradientLines={gradientLines}
          fill={fill}
          rule={showRule}
          reduced
        />
      </Tag>
    );
  }

  const MotionTag = resolveMotionTag(Tag as string);

  return (
    <MotionTag
      className={cn(HEADING_FIT, className)}
      variants={container}
      custom={delay}
      initial="hidden"
      animate={play ? "visible" : "hidden"}
    >
      <Lines
        lines={lines}
        gradientLines={gradientLines}
        fill={fill}
        rule={showRule}
        reduced={false}
        soft={soft}
      />
    </MotionTag>
  );
}

/** Same effect, triggered when the heading scrolls into view. */
export function TextRevealOnScroll({
  lines,
  as: Tag = "h2",
  className,
  gradientLines = [],
  fill = false,
  rule,
}: SharedProps) {
  const reduced = useReducedMotion();
  const showRule = rule ?? !fill;
  const { ref, shown } = useReveal<HTMLHeadingElement>(!reduced);

  if (reduced) {
    return (
      <Tag className={cn(HEADING_FIT, className)}>
        <Lines
          lines={lines}
          gradientLines={gradientLines}
          fill={fill}
          rule={showRule}
          reduced
        />
      </Tag>
    );
  }

  const MotionTag = resolveMotionTag(Tag as string);

  return (
    <MotionTag
      ref={ref}
      className={cn(HEADING_FIT, className)}
      variants={container}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
    >
      <Lines
        lines={lines}
        gradientLines={gradientLines}
        fill={fill}
        rule={showRule}
        reduced={false}
      />
    </MotionTag>
  );
}
