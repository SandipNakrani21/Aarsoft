"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/data/site";
import { useMotionTier } from "@/hooks/useMotionTier";
import { SPRING_SOFT } from "@/lib/motion";

/*
 * Everything that moves over the artwork is placed in the image's own pixel
 * space (1672 x 941), on the nodes and lines already drawn in it, so the
 * motion reads as the picture coming alive rather than effects laid on top.
 */
const ART_W = 1672;
const ART_H = 941;

/* The large gold nodes: a halo breathes out from each. */
const glowNodes = [
  { x: 1555, y: 246, r: 20, delay: 0 },
  { x: 1530, y: 707, r: 26, delay: 1.6 },
  { x: 1237, y: 489, r: 13, delay: 0.8 },
  { x: 1414, y: 621, r: 12, delay: 2.4 },
  { x: 148, y: 657, r: 13, delay: 3.1 },
  { x: 1404, y: 120, r: 10, delay: 1.2 },
  { x: 1040, y: 76, r: 11, delay: 2.8 },
];

/* The small points of light: they twinkle at staggered rates. */
const twinkles = [
  { x: 924, y: 283, r: 6, c: "#C1B8FF", delay: 0.4 },
  { x: 1434, y: 355, r: 5, c: "#C1B8FF", delay: 1.9 },
  { x: 1361, y: 405, r: 6, c: "#FFFFFF", delay: 0.9 },
  { x: 85, y: 661, r: 5, c: "#C1B8FF", delay: 2.6 },
  { x: 660, y: 877, r: 4, c: "#C1B8FF", delay: 1.4 },
  { x: 387, y: 720, r: 4, c: "#C1B8FF", delay: 3.3 },
  { x: 1203, y: 70, r: 4, c: "#C1B8FF", delay: 2.1 },
  { x: 1483, y: 154, r: 4, c: "#C1B8FF", delay: 0.2 },
  { x: 1087, y: 593, r: 4, c: "#C1B8FF", delay: 1.1 },
  { x: 741, y: 824, r: 5, c: "#FED97B", delay: 2.9 },
  { x: 1154, y: 323, r: 4, c: "#FED97B", delay: 3.6 },
  { x: 128, y: 558, r: 4, c: "#FED97B", delay: 0.6 },
  { x: 330, y: 99, r: 4, c: "#FED97B", delay: 2.2 },
  { x: 45, y: 160, r: 4, c: "#FED97B", delay: 1.7 },
];

/* Routes between nodes that a gold signal pulse travels along. */
const flows = [
  "M148 657 L387 720 L660 877",
  "M660 877 L1087 593 L1414 621",
  "M924 283 L1237 489 L1414 621 L1530 707",
  "M1237 489 L1434 355 L1555 246",
  "M1040 76 L924 283",
  "M45 160 L330 99",
];

/*
 * A few points of light drifting upward over the artwork. Fixed positions so
 * server and client render the same markup; deliberately few.
 */
const particles = [
  { left: "12%", top: "68%", size: 2, duration: 18, delay: 0 },
  { left: "28%", top: "82%", size: 1.5, duration: 22, delay: 4 },
  { left: "46%", top: "74%", size: 2, duration: 20, delay: 9 },
  { left: "63%", top: "88%", size: 1.5, duration: 24, delay: 2 },
  { left: "78%", top: "70%", size: 2.5, duration: 19, delay: 6 },
  { left: "90%", top: "84%", size: 1.5, duration: 23, delay: 11 },
];

/**
 * Full-bleed hero backdrop: the brand artwork, brought to life.
 *
 * Layers, back to front:
 *  1. Deep Black ground and two slow ambient glows
 *  2. The artwork "stage" — the image plus an SVG overlay in the image's own
 *     coordinates: breathing halos on its gold nodes, twinkling points, and
 *     signal pulses travelling its lines. The stage crops like object-cover
 *     (see `.hero-stage`), so the overlay stays on the artwork at every size.
 *     It drifts in a slow zoom-and-pan, and on desktop shifts a little
 *     against the pointer and lags the scroll.
 *  3. A soft light sweep, drifting points of light, an optional video
 *  4. A centred vignette for headline contrast, and a fade into the next section
 *
 * Every loop is CSS on transform or opacity. Phones drop the pulses, the
 * sweep and the pointer depth; reduced motion stops all of it.
 */
export function HeroBackground({ src = site.heroVideo }: { src?: string }) {
  const reduced = useReducedMotion();
  const tier = useMotionTier();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const depth = tier === "full";

  /*
   * Scroll depth: the artwork drifts down more slowly than the page scrolls.
   * It is oversized vertically by the same margin, so no edge can open up.
   */
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 900], [0, 110], { clamp: true });

  /* Pointer depth: the stage leans a few pixels away from the pointer. */
  const pointerX = useSpring(useMotionValue(0), SPRING_SOFT);
  const pointerY = useSpring(useMotionValue(0), SPRING_SOFT);

  useEffect(() => {
    if (!depth) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      if (!last) return;
      pointerX.set((last.clientX / window.innerWidth - 0.5) * -24);
      pointerY.set((last.clientY / window.innerHeight - 0.5) * -16);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [depth, pointerX, pointerY]);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;
    // Autoplay can be refused; the artwork already carries the section.
    void video.play().catch(() => setVideoReady(false));
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      {/* Ambient glows, drifting slowly behind the artwork's own orbs */}
      <div
        className="animate-aurora absolute -right-[10%] -top-[20%] h-[620px] w-[620px] rounded-full opacity-[0.14] soft-glow"
        style={{ background: "var(--color-lavender)" }}
      />
      <div
        className="animate-float-slow absolute -bottom-[20%] left-[8%] h-[480px] w-[480px] rounded-full opacity-[0.1] soft-glow"
        style={{ background: "var(--color-gold)" }}
      />

      {/* Artwork, with scroll depth */}
      <motion.div
        className="animate-backdrop-in absolute inset-x-0 -top-[4%] -bottom-[14%] [container-type:size]"
        style={depth ? { y: artY } : undefined}
      >
        {/* The stage, with pointer depth */}
        <motion.div
          className="hero-stage absolute"
          style={depth ? { x: pointerX, y: pointerY } : undefined}
        >
          {/* Slow zoom-and-pan over the whole artwork and its overlay */}
          <div className="hero-drift absolute inset-0">
            <Image
              src="/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <svg
              viewBox={`0 0 ${ART_W} ${ART_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {/* Signal routes: a faint line, and a gold pulse running along it */}
              {flows.map((d, i) => (
                <g key={d}>
                  <path d={d} fill="none" stroke="rgba(193,184,255,0.14)" strokeWidth="1" />
                  <path
                    d={d}
                    pathLength={1000}
                    fill="none"
                    stroke="#FED97B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="14 986"
                    className="hero-flow node-flow"
                    style={{
                      animationDuration: `${7 + (i % 3) * 2.5}s`,
                      animationDelay: `${i * 1.3}s`,
                    }}
                  />
                </g>
              ))}

              {/* Halos breathing out of the gold nodes */}
              {glowNodes.map((n) => (
                <circle
                  key={`${n.x}-${n.y}`}
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 2.4}
                  fill="#FED97B"
                  className="hero-halo"
                  style={{ animationDelay: `${n.delay}s` }}
                />
              ))}

              {/* Twinkling points */}
              {twinkles.map((t) => (
                <circle
                  key={`${t.x}-${t.y}`}
                  cx={t.x}
                  cy={t.y}
                  r={t.r}
                  fill={t.c}
                  className="hero-twinkle"
                  style={{ animationDelay: `${t.delay}s` }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* A soft band of light sweeping across now and then */}
      <div className="hero-sweep absolute inset-y-0 -left-1/2 w-1/2" />

      {/* Slow points of light — desktop only, never under reduced motion */}
      {depth && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <span
              key={p.left}
              className="animate-particle absolute rounded-full bg-lavender"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

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

      {/* Centred vignette: darkest behind the copy, letting the art show at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(13,12,21,0.72) 0%, rgba(13,12,21,0.4) 60%, rgba(13,12,21,0.12) 100%)",
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
