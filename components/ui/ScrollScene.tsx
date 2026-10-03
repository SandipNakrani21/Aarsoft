"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";

/**
 * Scroll-led entrance for a whole section, tied to scroll position rather
 * than fired once: scrolling down plays it forward, scrolling back plays it
 * in reverse. The smooth scroll (Lenis) is what makes it glide.
 *
 *  - `rise`   the section lifts into place and fades up as its top edge
 *             travels from the bottom of the screen to about a third down.
 *  - `panel`  for full-width dark sections: the section settles in from a
 *             slightly smaller, lower position to full size.
 *
 * Performance: only transform and opacity are animated, which the browser
 * composites on the GPU without repainting the section. The section is
 * promoted to its own layer (`will-change`) only while it is actually
 * mid-transition, so a page of them does not hold a dozen large layers.
 *
 * Desktop with a precise pointer only (the `full` motion tier). Touch,
 * smaller screens and reduced motion render the section untouched. The
 * wrapper is always the same element, so a tier change never remounts it.
 */
export function ScrollScene({
  children,
  variant = "rise",
}: {
  children: ReactNode;
  variant?: "rise" | "panel";
}) {
  const tier = useMotionTier();
  const ref = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  // No extra spring: Lenis already smooths the scroll, and a spring per
  // section only added a dozen animation loops to every frame.
  const progress = scrollYProgress;

  // Layer promotion only while between the start and end states.
  useMotionValueEvent(progress, "change", (v) => {
    const next = v > 0.002 && v < 0.998;
    setMoving((was) => (was === next ? was : next));
  });

  const y = useTransform(progress, [0, 1], variant === "panel" ? [80, 0] : [100, 0]);
  const opacity = useTransform(progress, [0, 0.55], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.95, 1]);

  const active = tier === "full";
  const style = !active
    ? undefined
    : variant === "panel"
      ? { y, scale, willChange: moving ? "transform" : "auto" }
      : { y, opacity, willChange: moving ? "transform, opacity" : "auto" };

  return (
    <motion.div ref={ref} style={style} className="scroll-scene">
      {children}
    </motion.div>
  );
}
