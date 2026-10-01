"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

/*
 * The first page a visitor lands on is server-rendered and must be visible
 * in that HTML — for crawlers, for LCP, and for anyone whose script is slow.
 * So only client-side navigations after the first get the entrance.
 */
let hasNavigated = false;

/**
 * Soft entrance for each new route: a short fade and a few pixels of rise.
 * There is no exit phase, so the browser's back and forward buttons and
 * scroll restoration behave exactly as they would without it.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const animate = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? (reduced ? { opacity: 0 } : { opacity: 0, y: 12 }) : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.2 : 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
