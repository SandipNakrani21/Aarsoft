"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMotionTier } from "@/hooks/useMotionTier";
import { SPRING_SOFT } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='button'], summary, label, select";
const TEXT_ENTRY = "input, textarea, [contenteditable='true']";

/**
 * Every pointer-driven effect on the site, run from a single listener.
 *
 *  - A small ring trails the pointer and grows over things that can be
 *    clicked. The system cursor is never hidden, so precision, text
 *    selection and assistive cursor settings all keep working; the ring is
 *    purely an accent and is kept out of the way over text fields.
 *  - Cards get the pointer position as `--mx` / `--my`, which the
 *    `.card-box` spotlight in globals.css reads. Setting two custom
 *    properties costs far less than a React state update per card.
 *
 * Desktop with a precise pointer only. Touch devices and reduced-motion
 * visitors never mount the listener.
 */
export function PointerEffects() {
  const tier = useMotionTier();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.4 });
  const scale = useSpring(1, SPRING_SOFT);
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (tier !== "full") return;

    let frame = 0;
    let last: PointerEvent | null = null;

    // All reads and writes happen once per frame, however often the pointer reports.
    const apply = () => {
      frame = 0;
      const event = last;
      if (!event) return;

      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as Element | null;
      if (target?.closest?.(TEXT_ENTRY)) {
        opacity.set(0);
        return;
      }
      opacity.set(1);

      const card = target?.closest?.(".card-box") as HTMLElement | null;
      scale.set(target?.closest?.(INTERACTIVE) ? 1.65 : card ? 1.25 : 1);

      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - box.left}px`);
        card.style.setProperty("--my", `${event.clientY - box.top}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [tier, x, y, scale, opacity]);

  if (tier !== "full") return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 h-8 w-8 rounded-full border border-[rgba(193,184,255,0.75)]"
      style={{ x: ringX, y: ringY, scale, opacity }}
    />
  );
}
