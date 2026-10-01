"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { markIntroDone } from "@/lib/intro";
import { isReturningVisit } from "@/lib/visit";

/* Shown at least this long, so it reads as a transition rather than a flicker. */
const MIN_MS = 450;
/* Never held longer than this, however slow the page or the route is. */
const MAX_BOOT_MS = 1600;
const MAX_NAV_MS = 5000;
/* Length of the fade out. */
const EXIT_MS = 400;

type Phase = "boot" | "nav" | "leaving" | "idle";

/**
 * The everyday loader: the Aarsoft mark inside a turning gradient ring on a
 * light screen. The first-visit intro plays once per browser; after that,
 * this is what shows
 *
 *  - on a refresh or a fresh load, until the page has loaded, and
 *  - on every in-site link, from the click until the new page renders.
 *
 * Like the intro it cannot get stuck: every phase has a ceiling, and a CSS
 * failsafe hides the refresh cover if script never runs. It is rendered on
 * the server in the "boot" phase, but CSS only shows that phase to browsers
 * flagged as returning (lib/visit.ts), so first-time visitors see the intro
 * instead and never this.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [phase, setPhaseState] = useState<Phase>("boot");
  // Mirrors `phase` so event handlers and effects read the current value.
  const phaseRef = useRef<Phase>("boot");
  const setPhase = (next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  };
  const startedAt = useRef(0);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  const leave = () => {
    clearTimers();
    setPhase("leaving");
    later(() => setPhase("idle"), EXIT_MS);
  };

  // Refresh or first load for a returning visitor: hold until the page has loaded.
  useEffect(() => {
    if (!isReturningVisit()) {
      setPhase("idle");
      return;
    }
    const finish = () => {
      markIntroDone();
      leave();
    };
    const tryFinish = () => {
      if (document.readyState === "complete" && performance.now() >= MIN_MS) finish();
    };
    window.addEventListener("load", tryFinish, { once: true });
    later(tryFinish, Math.max(0, MIN_MS - performance.now()));
    later(finish, Math.max(0, MAX_BOOT_MS - performance.now()));
    return () => {
      window.removeEventListener("load", tryFinish);
      clearTimers();
    };
    // Runs once, on the page the visitor arrived on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In-site links: cover from the click. Capture phase, so it runs before
  // next/link cancels the browser's own navigation.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page, or a jump to a section on it: nothing to load.
      if (url.pathname === window.location.pathname) return;

      clearTimers();
      startedAt.current = performance.now();
      setPhase("nav");
      later(leave, MAX_NAV_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The new route has rendered: fade out, after the minimum time on screen.
  useEffect(() => {
    if (phaseRef.current !== "nav") return;
    const shown = performance.now() - startedAt.current;
    clearTimers();
    later(leave, Math.max(0, MIN_MS - shown));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div className="route-loader" data-phase={phase} role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="route-loader-mark" aria-hidden="true">
        <span className="route-loader-ring" />
        <Image src="/aarsoft-mark.png" alt="" width={64} height={64} priority className="h-11 w-11 object-contain" />
      </div>
    </div>
  );
}
