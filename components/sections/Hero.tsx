"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroBackground } from "@/components/visuals/HeroBackground";
import { stats } from "@/data/company";
import { useMotionTier } from "@/hooks/useMotionTier";
import { useIntroDone } from "@/lib/intro";
import { EASE_OUT, SPRING_SCROLL } from "@/lib/motion";

/*
 * The hero shows the first three of the shared figures, with labels worded
 * for the hero. The shared labels elsewhere on the site are unchanged.
 */
const heroLabels = ["Clients Served", "Projects Delivered", "Engineering Experts"];
const heroStats = stats.slice(0, 3).map((item, i) => ({ ...item, label: heroLabels[i] ?? item.label }));

/*
 * Load sequence, in seconds after the intro loader opens. The whole thing
 * lands inside about 1.4s and nothing waits on it: every control is
 * clickable from the first frame.
 *
 *   0.05  badge
 *   0.15  headline, line by line
 *   0.55  supporting copy
 *   0.68  calls to action, staggered
 *   0.82  figures, staggered
 */
const SEQUENCE = { badge: 0.05, headline: 0.15, copy: 0.55, ctas: 0.68, stats: 0.82 };

/**
 * Centred hero over the brand artwork (see HeroBackground). Everything sits
 * on one axis — badge, headline, copy, actions, figures — and the section
 * fills the first screen so the artwork frames it on every side.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const tier = useMotionTier();
  const sectionRef = useRef<HTMLElement>(null);
  /* The sequence waits for the intro loader to open, so it plays in view. */
  const play = useIntroDone();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: play ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 0.8, delay, ease: EASE_OUT },
        };

  /*
   * Depth on scroll-out: the copy drifts up slowly and dims while the
   * artwork behind it lags (see HeroBackground). Desktop only.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), SPRING_SCROLL);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const full = tier === "full";

  return (
    <section
      ref={sectionRef}
      className="dark-section relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-[calc(var(--nav-h)+3rem)] md:pb-20 md:pt-[calc(var(--nav-h)+4rem)]"
    >
      <HeroBackground />

      <div className="container-x relative">
        <motion.div
          className="mx-auto flex max-w-6xl flex-col items-center text-center"
          style={full ? { y: copyY, opacity: copyOpacity } : undefined}
        >
          <motion.div {...fadeUp(SEQUENCE.badge)}>
            <span className="inline-flex items-center gap-3 rounded-full border border-[rgba(193,184,255,0.28)] bg-[rgba(13,12,21,0.5)] px-5 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-200 backdrop-blur sm:text-[0.875rem] sm:tracking-[0.18em]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
              />
              Digital Engineering &amp; Product Development Partner
            </span>
          </motion.div>

          {/* Short lines keep the display type large at every width. */}
          <TextReveal
            as="h1"
            delay={SEQUENCE.headline}
            lines={["Engineering Digital Products", "Built for What’s Next."]}
            gradientLines={[1]}
            fill
            soft
            play={play}
            className="hero-display mx-auto mt-8 text-center font-semibold text-white"
          />

          <motion.p
            {...fadeUp(SEQUENCE.copy)}
            className="mt-8 max-w-[54ch] text-xl leading-relaxed text-ink-200 md:text-2xl"
          >
            Aarsoft helps startups, businesses and enterprises turn complex ideas
            into scalable software, intelligent applications and digital
            experiences built for real-world growth.
          </motion.p>

          <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <motion.div {...fadeUp(SEQUENCE.ctas)} className="w-full sm:w-auto">
              <Magnetic className="flex w-full sm:inline-flex sm:w-auto">
                <ButtonLink href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
                  Start a Project
                  <ArrowIcon />
                </ButtonLink>
              </Magnetic>
            </motion.div>
            <motion.div {...fadeUp(SEQUENCE.ctas + 0.08)} className="w-full sm:w-auto">
              <ButtonLink
                href="/work"
                variant="onDarkGhost"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Our Work
              </ButtonLink>
            </motion.div>
          </div>

          {/* Reach summary — each figure rises in turn, then counts up */}
          <dl className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-[rgba(193,184,255,0.18)] pt-8">
            {heroStats.map((item, i) => (
              <motion.div key={item.label} {...fadeUp(SEQUENCE.stats + i * 0.09)}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="block text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                    <Counter
                      to={item.countTo}
                      literal={item.value}
                      suffix={item.suffix}
                      start={play}
                    />
                  </span>
                  <span className="mt-2 block text-[0.9375rem] text-ink-300">
                    {item.label}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
