"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";
import { SPRING_SOFT } from "@/lib/motion";

/**
 * Lets a primary call to action lean a few pixels toward the pointer.
 *
 * The pull is capped at `max` pixels however far the pointer travels across
 * the button, so it reads as the control acknowledging you rather than
 * following you. Desktop pointers only; elsewhere it is a plain wrapper.
 */
export function Magnetic({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const tier = useMotionTier();
  const x = useSpring(useMotionValue(0), SPRING_SOFT);
  const y = useSpring(useMotionValue(0), SPRING_SOFT);

  const active = tier === "full";

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!active || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    // -1..1 across each axis, scaled to the cap.
    const dx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
    const dy = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * max);
    y.set(Math.max(-1, Math.min(1, dy)) * max * 0.6);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={className ?? "inline-flex"}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
