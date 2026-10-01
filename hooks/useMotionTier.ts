"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * How much motion this device should get.
 *
 *  - `full`    Desktop with a precise pointer: parallax, magnetic buttons,
 *              pointer-reactive depth and the cursor ring.
 *  - `lite`    Touch, tablet and small screens: entrance reveals and
 *              touch-friendly card feedback only. Nothing is tied to scroll
 *              position, so there are no per-frame calculations on phones.
 *  - `none`    The visitor prefers reduced motion.
 *
 * It starts at `lite` on the server and on the first client render, so the
 * markup never differs between the two and there is no hydration mismatch;
 * desktop upgrades itself immediately after mount.
 */
export type MotionTier = "full" | "lite" | "none";

const FULL_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export function useMotionTier(): MotionTier {
  const reduced = useReducedMotion();
  const [full, setFull] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(FULL_QUERY);
    const update = () => setFull(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (reduced) return "none";
  return full ? "full" : "lite";
}
