"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A shared, scroll-driven reveal registry.
 *
 * IntersectionObserver alone is not reliable here: it only fires when the
 * intersection state changes, so an element that moves from "below the
 * viewport" to "above the viewport" between two frames — which happens on a
 * fast scroll, a jump link, or a restored scroll position — never produces a
 * callback and stays hidden forever.
 *
 * Instead every pending element is measured against a trigger line on each
 * scroll frame. One rAF-throttled pass reads all pending rects together, so
 * it costs a single layout flush, and entries are dropped as soon as they
 * reveal. The listeners detach once nothing is pending.
 */

type Pending = { el: HTMLElement; show: () => void };

const pending = new Set<Pending>();
let frame = 0;
let listening = false;

/** Reveal once the element's top edge crosses this fraction of the viewport. */
const TRIGGER = 0.94;

function runPass() {
  frame = 0;
  const limit = window.innerHeight * TRIGGER;

  for (const entry of Array.from(pending)) {
    if (!entry.el.isConnected) {
      pending.delete(entry);
      continue;
    }
    // Negative top means the element has already scrolled past — reveal too.
    if (entry.el.getBoundingClientRect().top < limit) {
      pending.delete(entry);
      entry.show();
    }
  }

  if (pending.size === 0) stopListening();
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(runPass);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

/**
 * Returns a ref to attach and a `shown` flag that flips to true exactly once,
 * when the element reaches the trigger line.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Already at or above the trigger line on mount.
    if (el.getBoundingClientRect().top < window.innerHeight * TRIGGER) {
      setShown(true);
      return;
    }

    const entry: Pending = { el, show: () => setShown(true) };
    pending.add(entry);
    startListening();
    schedule();

    return () => {
      pending.delete(entry);
      if (pending.size === 0) stopListening();
    };
  }, [enabled]);

  return { ref, shown };
}
