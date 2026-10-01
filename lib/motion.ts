import type { Transition, Variants } from "framer-motion";

/*
 * The site's motion vocabulary, in one place.
 *
 * Every animated component reads its timing and easing from here so that a
 * hover, a section reveal and the hero entrance all feel like parts of the
 * same system rather than a collection of individual effects.
 *
 * Hierarchy, strongest first: the hero load sequence; section reveals;
 * card responses; micro-interactions; ambient background loops. Nothing
 * below the hero is allowed to move as far or as long as the hero does.
 */

/** Expo-out: fast pickup, long settle. The house curve for everything that enters. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** Hover and press feedback. */
  micro: 0.2,
  /** State changes inside a component. */
  ui: 0.4,
  /** Content entering the viewport. */
  reveal: 0.75,
  /** Large, section-level entrances. */
  cinematic: 1.1,
} as const;

/** Spring for pointer-driven motion: settles quickly, never overshoots visibly. */
export const SPRING_SOFT = { stiffness: 150, damping: 20, mass: 0.4 } as const;
/** Spring that smooths scroll-linked values without lagging behind the page. */
export const SPRING_SCROLL = { stiffness: 90, damping: 26, restDelta: 0.001 } as const;

export const revealTransition = (delay = 0, duration: number = DURATION.reveal): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

/** A child of a staggered group: rises a short way and fades in. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: revealTransition(0, 0.65) },
};
