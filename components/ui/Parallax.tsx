"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";
import { SPRING_SCROLL } from "@/lib/motion";

/**
 * Subtle parallax tied to the element's own scroll progress.
 * Kept small on purpose — large offsets read as a gimmick and cause layout
 * surprises on short viewports.
 *
 * Desktop only: on touch devices and under reduced motion the wrapper stays
 * but nothing is bound to scroll, so phones do no per-frame work for it.
 */
export function Parallax({
  children,
  /** Pixels of travel across the full scroll range. Negative reverses it. */
  offset = 60,
  axis = "y",
  className,
  innerClassName,
}: {
  children?: ReactNode;
  offset?: number;
  axis?: "x" | "y";
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const value = useSpring(raw, { ...SPRING_SCROLL, restDelta: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={innerClassName}
        style={tier === "full" ? { [axis]: value } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scroll-linked entrance for large panels: the block settles from a slightly
 * smaller scale to full size as it travels into view, so the growth tracks
 * the reader's own scrolling rather than playing on a timer.
 *
 * Opacity is left alone deliberately — a panel that is only partly faded in
 * while a visitor stops scrolling looks broken. On touch devices and under
 * reduced motion it renders at full size from the start.
 */
export function ScrollScale({
  children,
  from = 0.96,
  className,
}: {
  children: ReactNode;
  from?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useMotionTier();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 55%"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [from, 1]), SPRING_SCROLL);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={tier === "full" ? { scale, transformOrigin: "50% 100%" } : undefined}
    >
      {children}
    </motion.div>
  );
}
