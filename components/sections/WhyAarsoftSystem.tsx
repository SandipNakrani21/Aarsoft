"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { differentiators } from "@/data/company";
import { useMotionTier } from "@/hooks/useMotionTier";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * "Why Aarsoft" as a radial system.
 *
 * Desktop: the Aarsoft mark sits in a dark core, ringed by six segments in
 * alternating lavender tones (a sunburst, long and short in turn). Each
 * segment carries its capability's icon on a dark badge, and the capability
 * itself is labelled outside the ring. Scrolling steps clockwise through the
 * six: the segment fills with the brand gradient and grows a little, its
 * label comes forward, and the core counts up while its ring fills. On tall
 * enough screens the circle holds in place while this plays (`.why-track`
 * in globals.css), then releases with everything lit. Hovering a label or a
 * segment brings that one forward directly.
 *
 * Below lg the same list stacks down a rail, each item taking the highlight
 * as it crosses the middle of the screen. The copy exists once, as a plain
 * list, whichever layout is showing; the circle is decoration.
 */

const COUNT = differentiators.length;
/** Share of the scroll range spent stepping through; the rest shows all six lit. */
const STEP_END = 0.88;

// Drawing space for the circle. Everything below is in these units.
const VB_W = 1200;
const VB_H = 720;
const CX = VB_W / 2;
const CY = VB_H / 2;
const R_CORE = 120;
const R_LONG = 250;
const R_SHORT = 215;
const R_RULE = 330;
const SWEEP = 360 / COUNT;
/** Segment boundaries start straight up, so the first segment sits up and to the right. */
const START = -90;

const rad = (deg: number) => (deg * Math.PI) / 180;
/*
 * Geometry is rounded to 3 decimals. Node and the browser can disagree on
 * the last digit of Math.cos/sin, and those full-precision values end up in
 * the server HTML and the client render — a hydration mismatch. Rounded,
 * both print the same string; a thousandth of a unit is far below a pixel.
 */
const round = (n: number) => Math.round(n * 1000) / 1000;
const point = (r: number, deg: number) => ({
  x: round(CX + r * Math.cos(rad(deg))),
  y: round(CY + r * Math.sin(rad(deg))),
});
const pad = (n: number) => String(n).padStart(2, "0");

/** An annular sector between two radii and two angles. */
function sector(r0: number, r1: number, a0: number, a1: number) {
  const p0 = point(r1, a0);
  const p1 = point(r1, a1);
  const p2 = point(r0, a1);
  const p3 = point(r0, a0);
  return `M ${p0.x} ${p0.y} A ${r1} ${r1} 0 0 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r0} ${r0} 0 0 0 ${p3.x} ${p3.y} Z`;
}

const segments = differentiators.map((_, i) => {
  const a0 = START + i * SWEEP;
  const mid = a0 + SWEEP / 2;
  const outer = i % 2 === 0 ? R_LONG : R_SHORT;
  const badge = point((R_CORE + outer) / 2 + 4, mid);

  // Labels sit outside the ring, pinned by the corner nearest the circle.
  const cos = Math.cos(rad(mid));
  const sin = Math.sin(rad(mid));
  const side = Math.abs(cos) < 0.1 ? "centre" : cos > 0 ? "right" : "left";
  const band = Math.abs(sin) < 0.1 ? "middle" : sin < 0 ? "upper" : "lower";
  const anchor = point(band === "middle" ? outer + 40 : 290, mid);
  const tx = side === "right" ? "0%" : side === "left" ? "-100%" : "-50%";
  const ty = band === "upper" ? "-100%" : band === "lower" ? "0%" : "-50%";

  return {
    d: sector(R_CORE, outer, a0, a0 + SWEEP),
    badge,
    labelStyle: {
      "--lx": `${round((anchor.x / VB_W) * 100)}%`,
      "--ly": `${round((anchor.y / VB_H) * 100)}%`,
      "--lt": `${tx} ${ty}`,
      "--la": side === "left" ? "right" : "left",
    } as CSSProperties,
  };
});

/** Spokes on every segment boundary, running out past the ring. */
const rules = differentiators.map((_, i) => {
  const a = START + i * SWEEP;
  const from = point(R_CORE, a);
  const to = point(R_RULE, a);
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
});

/** Scale an SVG group about a point in the drawing. */
const originAt = (x: number, y: number) => ({
  transformOrigin: `${x}px ${y}px`,
  transformBox: "view-box" as const,
});

type Emphasis = "idle" | "active" | "dim" | "on";

export function WhyAarsoftSystem() {
  const tier = useMotionTier();
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [radial, setRadial] = useState(false);
  const [active, setActive] = useState(-1);
  const [complete, setComplete] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setRadial(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Starts once the circle is well in view and ends where the hold releases.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.35", "end end"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Desktop: the lit segment follows scroll position, forwards and back.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (tier === "none" || !radial) return;
    setComplete(p >= STEP_END);
    setActive(p <= 0 ? -1 : Math.min(COUNT - 1, Math.floor((p / STEP_END) * COUNT)));
  });

  // Stacked layout: whichever item crosses the middle band takes the highlight.
  useEffect(() => {
    setActive(-1);
    setComplete(false);
    if (tier === "none" || radial || !listRef.current) return;

    const items = listRef.current.querySelectorAll<HTMLElement>("[data-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [tier, radial]);

  const still = tier === "none";

  const emphasis = (i: number): Emphasis => {
    if (still) return "idle";
    if (hover !== null) return i === hover ? "active" : "dim";
    if (complete) return "on";
    if (active < 0) return "idle";
    return i === active ? "active" : "dim";
  };

  const lit = still || complete ? COUNT : Math.max(0, (hover ?? active) + 1);

  // Hover only means something with a mouse over the circle layout.
  const hoverTo = (i: number | null) => (event: PointerEvent) => {
    if (event.pointerType === "mouse" && radial && !still) setHover(i);
  };

  // Entrance: the core first, the ring builds out from it, then badges, then labels.
  const enter = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, scale: 0.85 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.8, delay, ease: EASE_OUT },
        };

  return (
    <div ref={trackRef} className="why-track mt-10 lg:mt-6">
      <div className="why-stage lg:py-12">
        <div className="relative mx-auto w-full max-w-[1100px] lg:aspect-[1200/720]">
          {/* Soft light behind the circle, drifting slower than the page. */}
          <motion.div
            aria-hidden="true"
            className="why-backdrop pointer-events-none absolute inset-0 -z-10 hidden lg:block"
            style={tier === "full" ? { y: glowY } : undefined}
          />

          <svg
            aria-hidden="true"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 hidden h-full w-full overflow-visible lg:block"
          >
            <defs>
              <linearGradient id="why-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C1B8FF" />
                <stop offset="100%" stopColor="#FED97B" />
              </linearGradient>
            </defs>

            {rules.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="rgba(193,184,255,0.2)"
                strokeWidth={1}
                fill="none"
                initial={still ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.05, ease: EASE_OUT }}
              />
            ))}

            {/* Segments: a base tone, with the brand gradient laid over the lit one. */}
            {segments.map((seg, i) => {
              const state = emphasis(i);
              return (
                <motion.g key={seg.d} {...enter(0.15 + i * 0.07)} style={originAt(CX, CY)}>
                  <motion.g
                    animate={{
                      scale: state === "active" ? 1.045 : 1,
                      opacity: state === "dim" ? 0.55 : 1,
                    }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    style={originAt(CX, CY)}
                    onPointerEnter={hoverTo(i)}
                    onPointerLeave={hoverTo(null)}
                  >
                    <path d={seg.d} fill={i % 2 === 0 ? "#C1B8FF" : "#E3DEFF"} />
                    <motion.path
                      d={seg.d}
                      fill="url(#why-gradient)"
                      initial={false}
                      animate={{ opacity: state === "active" ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    />
                  </motion.g>
                </motion.g>
              );
            })}

            {/* Icon badges on the ring. */}
            {segments.map((seg, i) => {
              const Icon = differentiators[i].icon;
              const state = emphasis(i);
              return (
                <motion.g
                  key={`badge-${seg.d}`}
                  {...enter(0.55 + i * 0.07)}
                  style={originAt(seg.badge.x, seg.badge.y)}
                >
                  <motion.g
                    animate={{ scale: state === "active" ? 1.15 : 1 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    style={originAt(seg.badge.x, seg.badge.y)}
                  >
                    <circle cx={seg.badge.x} cy={seg.badge.y} r={31} fill="var(--color-ink-900)" />
                    <circle
                      cx={seg.badge.x}
                      cy={seg.badge.y}
                      r={27}
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth={1}
                      strokeDasharray="2 3"
                    />
                    <Icon
                      x={seg.badge.x - 12}
                      y={seg.badge.y - 12}
                      width={24}
                      height={24}
                      color="#FFFFFF"
                      strokeWidth={1.6}
                    />
                  </motion.g>
                </motion.g>
              );
            })}

            {/* The core: a dark disk with a thin inner ring that fills as capabilities come online. */}
            <motion.g {...enter(0)} style={originAt(CX, CY)}>
              <circle cx={CX} cy={CY} r={R_CORE - 4} fill="var(--color-ink-900)" />
              <circle
                cx={CX}
                cy={CY}
                r={R_CORE - 16}
                fill="none"
                stroke="rgba(193,184,255,0.18)"
                strokeWidth={2}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={R_CORE - 16}
                fill="none"
                stroke="url(#why-gradient)"
                strokeWidth={2.5}
                strokeLinecap="round"
                transform={`rotate(-90 ${CX} ${CY})`}
                initial={still ? false : { pathLength: 0 }}
                animate={{ pathLength: lit / COUNT }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              />
            </motion.g>
          </svg>

          {/* Core content, as HTML so the mark and type stay crisp. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex"
            initial={still ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          >
            <Image
              src="/aarsoft-mark.png"
              alt=""
              width={64}
              height={64}
              className="h-12 w-12 object-contain xl:h-14 xl:w-14"
            />
            <span className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-lavender">
              Why Aarsoft
            </span>
            <span className="relative mt-1 block h-5 overflow-hidden text-[0.8125rem] font-medium tracking-[0.08em] text-white">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={lit}
                  className="block"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  {pad(lit)} / {pad(COUNT)}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* The six capabilities: labels around the circle on desktop, a rail when stacked. */}
          <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-[rgba(193,184,255,0.2)] lg:hidden" />
          <ul ref={listRef} className="relative space-y-8 lg:static lg:space-y-0">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              const state = emphasis(i);
              return (
                <motion.li
                  key={item.title}
                  data-index={i}
                  className="why-item flex gap-5"
                  style={segments[i].labelStyle}
                  onPointerEnter={hoverTo(i)}
                  onPointerLeave={hoverTo(null)}
                  initial={still ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.7, delay: radial ? 0.8 + i * 0.08 : 0, ease: EASE_OUT }}
                >
                  {/* Rail badge, stacked layout only. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(193,184,255,0.3)] bg-ink-900 text-white transition-shadow duration-500 lg:hidden",
                      state === "active" && "shadow-[0_0_0_4px_var(--color-lavender)]",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>

                  <div className={cn("transition-opacity duration-500", state === "dim" && "opacity-[0.62]")}>
                    <span className="block text-[0.8125rem] tracking-[0.14em] text-lavender">
                      {pad(i + 1)}
                    </span>
                    <h3
                      className={cn(
                        "why-title mt-1 font-display text-xl leading-tight tracking-[-0.02em] text-white xl:text-[1.375rem]",
                        state === "active" && "why-title-lit",
                      )}
                    >
                      <span className="why-title-text">{item.title}</span>
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-300 lg:max-w-[18.5rem]">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Scrolls past while the stage holds; zero height wherever the hold is off. */}
      <div aria-hidden="true" className="why-hold" />
    </div>
  );
}
