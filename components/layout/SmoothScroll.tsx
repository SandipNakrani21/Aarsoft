"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Momentum smooth scrolling via Lenis, driven by requestAnimationFrame.
 *
 * Two behaviours matter here:
 *  - Users who prefer reduced motion never get the hijacked scroll at all.
 *  - Same-page anchor links are routed through Lenis so they ease rather
 *    than jump, while cross-page navigation resets to the top instantly.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      /*
       * Interpolated scrolling: each frame closes 10% of the gap to the target,
       * so the page glides and keeps gliding while the wheel keeps turning,
       * which also drives the scroll-linked section entrances evenly.
       */
      lerp: 0.1,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoResize: true,
    });

    // Expose for anchor handling and the mobile menu scroll lock.
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96, duration: 1.2 });
      history.replaceState(null, "", href);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Reset scroll position on route change; Lenis keeps its own offset.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
