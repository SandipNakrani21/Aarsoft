"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";
import { Check, Award } from "lucide-react";
import { industries, processSteps, stats } from "@/data/company";
import { EASE_OUT } from "@/lib/motion";

/**
 * One depth layer: shifts with the pointer by `depth` pixels at the hero's
 * edge. Cards further forward get a larger depth, so the stack separates
 * slightly as the pointer moves and reads as layered glass rather than a
 * flat picture.
 */
function DepthLayer({
  pointerX,
  pointerY,
  depth,
  interactive,
  children,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  depth: number;
  interactive: boolean;
  children: ReactNode;
}) {
  const x = useTransform(pointerX, (v) => v * depth);
  const y = useTransform(pointerY, (v) => v * depth * 0.7);
  return <motion.div style={interactive ? { x, y } : undefined}>{children}</motion.div>;
}

/**
 * Product UI fragments floating over the hero background.
 *
 * Everything shown here is drawn from real company data — the five delivery
 * stages, the industries served and the published company figures — so the
 * hero makes no claim the rest of the site does not support.
 */
export function HeroPanel({
  pointerX: pointerXProp,
  pointerY: pointerYProp,
  interactive = false,
  play = true,
}: {
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
  /** Pointer-reactive depth. Only the desktop hero turns this on. */
  interactive?: boolean;
  /** Hold the entrance until this turns true, e.g. while the intro loader shows. */
  play?: boolean;
}) {
  const reduced = useReducedMotion();
  const idleX = useMotionValue(0);
  const idleY = useMotionValue(0);
  const pointerX = pointerXProp ?? idleX;
  const pointerY = pointerYProp ?? idleY;
  const depth = (px: number) => ({ pointerX, pointerY, depth: px, interactive });

  /* The stage currently in progress in the illustrated engagement. */
  const activeStage = 3;

  /* The hero band already carries the first three figures; this is the last. */
  const experience = stats[stats.length - 1];

  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          whileInView: play ? { opacity: 1, y: 0, scale: 1 } : undefined,
          viewport: { once: true },
          transition: { duration: 0.9, delay, ease: EASE_OUT },
        };

  const card =
    "rounded-[var(--radius-md)] border border-[rgba(193,184,255,0.22)] bg-[rgba(13,12,21,0.62)] backdrop-blur-xl";

  return (
    <div className="relative mx-auto flex max-w-md flex-col gap-5 lg:max-w-none">
      {/* How an engagement runs */}
      <motion.div {...enter(0.35)} className="w-full">
        <DepthLayer {...depth(10)}>
          <motion.div {...float(0)} className={`${card} p-6`}>
            <div className="flex items-center justify-between">
              <span className="text-[0.875rem] font-medium uppercase tracking-[0.16em] text-ink-300">
                Delivery
              </span>
              <span className="text-[0.875rem] font-medium text-gold">
                Stage {activeStage} of {processSteps.length}
              </span>
            </div>

            <ul className="mt-5 space-y-3">
              {processSteps.map((step, i) => {
                const done = i < activeStage - 1;
                const current = i === activeStage - 1;
                return (
                  <li key={step.number} className="flex items-center gap-3.5">
                    <span
                      className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold"
                      style={{
                        background: current
                          ? "var(--gradient-primary)"
                          : done
                            ? "rgba(193,184,255,0.18)"
                            : "rgba(193,184,255,0.07)",
                        color: current ? "var(--color-black)" : "var(--color-lavender)",
                      }}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        step.number
                      )}
                      {/* The live stage breathes, so the panel reads as a running system. */}
                      {current && (
                        <span
                          aria-hidden="true"
                          className="animate-stage-ping absolute inset-0 rounded-full"
                          style={{ boxShadow: "0 0 0 1px var(--color-lavender)" }}
                        />
                      )}
                    </span>
                    <span
                      className={
                        current
                          ? "text-[1rem] font-medium text-white"
                          : "text-[1rem] text-ink-300"
                      }
                    >
                      {step.title}
                    </span>
                    {current && (
                      <span className="ml-auto text-[0.875rem] text-lavender">
                        in progress
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </DepthLayer>
      </motion.div>

      {/* Industries served */}
      <motion.div {...enter(0.5)} className="w-full lg:ml-auto lg:w-[94%]">
        <DepthLayer {...depth(6)}>
          <motion.div {...float(1.6)} className={`${card} p-6`}>
            <span className="text-[0.875rem] font-medium uppercase tracking-[0.16em] text-ink-300">
              Industries we build for
            </span>

            <ul className="mt-5 flex flex-wrap gap-2">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <li
                    key={industry.name}
                    className="flex items-center gap-2 rounded-full border border-[rgba(193,184,255,0.2)] bg-[rgba(193,184,255,0.07)] px-3.5 py-2 text-[0.9375rem] text-ink-200"
                  >
                    <Icon
                      className="h-4 w-4 text-lavender"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    {industry.name}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </DepthLayer>
      </motion.div>

      {/* Track record */}
      <motion.div {...enter(0.62)} className="w-full lg:max-w-[19rem]">
        <DepthLayer {...depth(14)}>
          <motion.div
            {...float(2.6)}
            className={`${card} flex items-center gap-5 px-6 py-5`}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(193,184,255,0.14)" }}
            >
              <Award className="h-6 w-6 text-lavender" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[0.875rem] uppercase tracking-[0.16em] text-ink-400">
                {experience.label}
              </span>
              <span className="mt-1 block text-2xl font-semibold leading-none text-white">
                {experience.value}
              </span>
            </span>
          </motion.div>
        </DepthLayer>
      </motion.div>
    </div>
  );
}
