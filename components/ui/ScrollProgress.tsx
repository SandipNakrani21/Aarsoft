"use client";
import { useMotionTier } from "@/hooks/useMotionTier";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar showing read progress, pinned under the navigation. */
function FullScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });


  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-primary fixed inset-x-0 top-0 z-[60] h-[5px] origin-left"
    />
  );
}

export function ScrollProgress() { return useMotionTier() === "full" ? <FullScrollProgress /> : null; }
