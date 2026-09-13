"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin gradient bar showing read progress, pinned under the navigation. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-primary fixed inset-x-0 top-0 z-[60] h-[5px] origin-left"
    />
  );
}
