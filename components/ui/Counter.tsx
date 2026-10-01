"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

/**
 * Counts up to `to` the first time the element is seen, then stops.
 *
 * Non-numeric statistics (like "24/7") skip the animation and render their
 * literal value. Uses the shared reveal trigger rather than an intersection
 * observer, so a fast scroll past the number cannot leave it stuck at zero.
 */
export function Counter({
  to,
  literal,
  prefix = "",
  suffix = "",
  duration = 1800,
  start = true,
}: {
  to?: number;
  literal: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Hold the count at zero until this turns true, e.g. behind the intro loader. */
  start?: boolean;
}) {
  const reduced = useReducedMotion();
  const animatable = typeof to === "number" && !reduced;
  const { ref, shown } = useReveal<HTMLSpanElement>(animatable);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animatable || !shown || !start) return;

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      // Exponential ease-out so the number settles rather than stopping dead.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to!));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animatable, shown, start, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {animatable ? `${prefix}${value}${suffix}` : literal}
    </span>
  );
}
