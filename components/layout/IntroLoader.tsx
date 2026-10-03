"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { markIntroDone } from "@/lib/intro";
import { VISITED_KEY, isReturningVisit, writeStorage } from "@/lib/visit";

/* Never shorter than this, so the reveal reads as intended rather than a flicker. */
const MIN_MS = 700;
/* Never longer than this, however slow the network: the loader cannot hold the page. */
const MAX_MS = 1600;
/* Length of the split-open exit, after which the loader unmounts. */
const EXIT_MS = 1100;

const STATUS = [
  { from: 0, text: "Initialising" },
  { from: 40, text: "Compiling" },
  { from: 80, text: "Launching" },
];

/**
 * First-visit intro: the Aarsoft logo "compiles" in behind a scan line
 * while a counter runs, then the black screen splits open — top half up,
 * bottom half down — to reveal the page.
 *
 * It is built so it cannot get stuck:
 *  - It leaves when the page has loaded, but never before MIN_MS and never
 *    after MAX_MS, whichever comes first.
 *  - Timing runs on timers, not animation frames, so a background tab still
 *    progresses.
 *  - If JavaScript never runs at all, a CSS failsafe on `.intro-loader`
 *    hides it and stops it catching clicks a little later.
 *  - It is server-rendered, so it covers the very first paint, and it lives
 *    in the root layout, so client-side navigations never show it again.
 *  - It plays once per browser. Returning visitors are flagged on <html>
 *    before first paint (see lib/visit.ts), CSS keeps this hidden for them,
 *    and the lighter RouteLoader takes over instead.
 *
 * The counter and status are written straight to the DOM; nothing here
 * re-renders while it runs.
 */
export function IntroLoader() {
  const [state, setState] = useState<"loading" | "exit" | "gone">("loading");
  const countRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Seen it before: the route loader handles this load, so step aside at once.
    if (isReturningVisit()) {
      setState("gone");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /*
     * performance.now() counts from the start of navigation, not from when
     * this script woke up. So MIN_MS and MAX_MS are real wall-clock limits
     * from the visitor's first paint: a device that is slow to hydrate goes
     * straight to the exit instead of starting the countdown late.
     */
    const start = 0;
    let pageReady = document.readyState === "complete";
    let finished = false;
    let frame = 0;
    const timers: number[] = [];

    const paint = (percent: number) => {
      const value = Math.round(percent);
      if (countRef.current) countRef.current.textContent = String(value).padStart(2, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;
      if (statusRef.current) {
        const label = [...STATUS].reverse().find((s) => value >= s.from)!.text;
        if (statusRef.current.textContent !== label) statusRef.current.textContent = label;
      }
    };

    // Eases toward 90% while waiting; only a real finish takes it to 100.
    const tick = () => {
      if (finished) return;
      const t = Math.min((performance.now() - start) / MIN_MS, 1);
      paint(90 * (1 - Math.pow(1 - t, 3)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      paint(100);
      // A beat on 100%, then open up and let the hero start its entrance.
      timers.push(
        window.setTimeout(() => {
          setState("exit");
          markIntroDone();
          writeStorage(VISITED_KEY, "1");
          timers.push(window.setTimeout(() => setState("gone"), EXIT_MS));
        }, reduced ? 0 : 220),
      );
    };

    const tryFinish = () => {
      if (pageReady && performance.now() - start >= (reduced ? 300 : MIN_MS)) finish();
    };

    const onLoad = () => {
      pageReady = true;
      tryFinish();
    };
    if (!pageReady) window.addEventListener("load", onLoad, { once: true });

    const elapsed = performance.now() - start;
    timers.push(window.setTimeout(tryFinish, Math.max(0, (reduced ? 300 : MIN_MS) - elapsed)));
    // The hard ceiling: leave regardless of what the page is still loading.
    timers.push(window.setTimeout(finish, Math.max(0, MAX_MS - elapsed)));

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", onLoad);
      // No markIntroDone() here: development mounts effects twice, and that
      // would fire it instantly. useIntroDone's own failsafe covers teardown.
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div className="intro-loader" data-state={state} aria-hidden="true">
      <div className="intro-half intro-half-top" />
      <div className="intro-half intro-half-bottom" />
      <span className="intro-seam" />

      <div className="intro-center">
        <div className="intro-logo">
          {/* Same source and size as the header logo, so it is one shared download. */}
          <Image
            src="/aarsoft-logo-2026-light.webp"
            width={1941}
            height={666}
            priority
            alt=""
            className="h-16 w-auto sm:h-20"
          />
          <span className="intro-scan" />
        </div>

        <div className="intro-meta">
          <span ref={statusRef}>Initialising</span>
          <span>
            <span ref={countRef}>00</span>%
          </span>
        </div>
        <span className="intro-bar">
          <span ref={barRef} />
        </span>
      </div>
    </div>
  );
}
