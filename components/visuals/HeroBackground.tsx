"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { NodeNetwork } from "./NodeNetwork";
import { site } from "@/data/site";

/**
 * Full-bleed hero backdrop.
 *
 * Layers, back to front:
 *  1. Deep Black ground and the dark technology gradient
 *  2. The animated node network — always present, and the fallback whenever
 *     the video is missing, still loading, or blocked from autoplaying
 *  3. An optional looping video
 *  4. A darkening scrim so the headline keeps its contrast over either
 *
 * To use video: put the file in `public/` and set `heroVideo` in
 * `data/site.ts` to its path. Left empty, the element is never mounted, so
 * there is no failed request. The animated layer carries the section on its
 * own, and reduced-motion visitors never get the video at all.
 */
export function HeroBackground({ src = site.heroVideo }: { src?: string }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;
    // Autoplay can be refused; the animated layer already covers that case.
    void video.play().catch(() => setVideoReady(false));
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Dark technology gradient */}
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-dark)" }}
      />

      {/* Brand grid */}
      <div className="brand-grid-dark absolute inset-0" />

      {/* Animated node network — also the no-video fallback */}
      <div className="absolute inset-0 opacity-80">
        <NodeNetwork />
      </div>

      {/* Drifting brand glows */}
      <div
        className="animate-aurora absolute -right-[15%] -top-[25%] h-[680px] w-[680px] rounded-full opacity-[0.22] blur-[130px]"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        className="animate-float-slow absolute -bottom-[25%] -left-[10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "var(--color-lavender)" }}
      />

      {/* Optional video — only mounted when a source is configured */}
      {!reduced && src && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 0.45 : 0 }}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
      )}

      {/* Scrim: keeps headline contrast high on the left, lets the art breathe right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(13,12,21,0.92) 0%, rgba(13,12,21,0.75) 42%, rgba(13,12,21,0.45) 100%)",
        }}
      />

      {/* Soft fade into the section below */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(13,12,21,0), var(--color-black))",
        }}
      />
    </div>
  );
}
