"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Counter } from "@/components/ui/Counter";
import { HeroBackground } from "@/components/visuals/HeroBackground";
import { HeroPanel } from "@/components/visuals/HeroPanel";
import { stats } from "@/data/company";

/* The hero shows the first three of the shared figures. */
const heroStats = stats.slice(0, 3);

export function Hero() {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="dark-section relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+3.5rem)] md:pb-28 md:pt-[calc(var(--nav-h)+5.5rem)]">
      <HeroBackground />

      <div className="container-x relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0.05)}>
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
              delay={0.15}
              lines={["Explore", "Intelligence"]}
              gradientLines={[1]}
              fill
              className="hero-display mt-8 font-semibold text-white"
            />

            <motion.p
              {...fadeUp(0.55)}
              className="mt-8 max-w-[54ch] text-xl leading-relaxed text-ink-200 md:text-2xl"
            >
              Aarsoft helps startups, businesses and agencies turn ideas and complex
              business requirements into scalable digital products, powerful business
              applications and intuitive user experiences.
            </motion.p>

            <motion.div
              {...fadeUp(0.68)}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <ButtonLink href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
                Start a Project
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink
                href="/work"
                variant="onDarkGhost"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Our Work
              </ButtonLink>
            </motion.div>

            {/* Reach summary — counts up the first time it is seen */}
            <motion.dl
              {...fadeUp(0.8)}
              className="mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-[rgba(193,184,255,0.18)] pt-8"
            >
              {heroStats.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                      <Counter to={item.countTo} literal={item.value} suffix={item.suffix} />
                    </span>
                    <span className="mt-2 block text-[0.9375rem] text-ink-300">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Product UI fragments, floating over the background */}
          <div className="lg:col-span-5">
            <HeroPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
