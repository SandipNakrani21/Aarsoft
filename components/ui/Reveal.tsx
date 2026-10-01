"use client";

import { useReducedMotion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { resolveMotionTag } from "./motionTags";
import { useReveal } from "@/hooks/useReveal";
import { EASE_OUT, revealTransition, staggerItem } from "@/lib/motion";

/** `scale` grows in from 96%, for visuals and panels rather than copy. */
type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

type RevealProps = {
  children: ReactNode;
  /** Entry direction. Defaults to a subtle upward fade. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Travel distance in pixels. */
  distance?: number;
  /** Render as a different element, e.g. "li" or "section". */
  as?: ElementType;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "animate">;

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "scale":
      return { scale: 0.96, y: distance * 0.5 };
    default:
      return {};
  }
};

/**
 * Scroll-triggered entrance. Every animated section on the site funnels
 * through this component so timing and easing stay consistent, and so
 * reduced-motion users get a single, well-defined no-animation path.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 26,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, shown } = useReveal<HTMLDivElement>(!reduced);

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = resolveMotionTag(as as string);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      animate={shown ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={revealTransition(delay, duration)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* Staggered groups                                                    */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants = staggerItem;

/*
 * A second tier of stagger inside an item — the chips on a technology card,
 * say. It inherits the group's "visible" signal, so it needs no trigger of
 * its own, and waits for its card to land before starting.
 */
const subItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.3 + index * 0.04, ease: EASE_OUT },
  }),
};

/** Parent for a list whose children should animate in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const { ref, shown } = useReveal<HTMLDivElement>(!reduced);

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = resolveMotionTag(as as string);

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

/** Child of RevealGroup. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = resolveMotionTag(as as string);

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}

/** Child of a RevealItem that staggers in after its parent has landed. */
export function RevealSubItem({
  children,
  className,
  index = 0,
  as = "li",
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = resolveMotionTag(as as string);

  return (
    <MotionTag className={className} variants={subItemVariants} custom={index}>
      {children}
    </MotionTag>
  );
}
