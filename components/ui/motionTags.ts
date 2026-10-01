"use client";

import { motion } from "framer-motion";

/**
 * Motion components resolved once, at module scope.
 *
 * Looking these up inside a render (`motion[tag]`) hands React a new
 * component identity on every pass, which remounts the subtree, re-applies
 * the `initial` variant and leaves scroll reveals stuck at their start
 * position. Resolving them here keeps the identities stable.
 */
export const motionTags = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  nav: motion.nav,
  header: motion.header,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

export type MotionTag = keyof typeof motionTags;

/**
 * Returned as `motion.div` so callers can pass one consistent prop shape;
 * the rendered element is still the requested tag.
 */
export const resolveMotionTag = (tag: string): typeof motion.div =>
  (motionTags[tag as MotionTag] ?? motionTags.div) as typeof motion.div;
