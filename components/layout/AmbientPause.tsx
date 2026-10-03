"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pauses every looping CSS animation in a section that is out of view.
 *
 * Several sections carry ambient loops (the hero artwork, glow drift,
 * marquees, the process orbits). They are invisible once scrolled past, yet
 * would keep the browser repainting and compositing. One observer watches
 * every section and the footer and sets `data-paused` on the ones off
 * screen; a rule in globals.css pauses all animations inside those. The
 * margin resumes a section a little before it scrolls back into view.
 */
export function AmbientPause() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("main section, footer");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.removeAttribute("data-paused");
          else el.setAttribute("data-paused", "");
        }
      },
      { rootMargin: "200px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      targets.forEach((el) => el.removeAttribute("data-paused"));
    };
  }, [pathname]);

  return null;
}
