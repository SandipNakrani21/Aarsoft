"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
function focusTarget(target: HTMLElement, smooth: boolean) {
  if (!target.matches("a, button, input, select, textarea, [tabindex]")) target.tabIndex = -1;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "start" });
}
/** Native scrolling preserves touch behavior and browser history restoration. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;
      let id: string;
      try { id = decodeURIComponent(href.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== href) history.pushState(null, "", href);
      focusTarget(target, !id.startsWith("field-") && id !== "main" && !matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (!location.hash) return;
        try {
          const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
          if (target) focusTarget(target, false);
        } catch { /* Ignore malformed hashes. */ }
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
declare global { interface Window { __lenis?: Lenis; } }
