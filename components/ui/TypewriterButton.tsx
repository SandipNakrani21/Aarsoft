"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowIcon, ButtonLink } from "./Button";
import { cn } from "@/lib/utils";

type Phrase = {
  text: string;
  /** Longer phrases step down a size so every one fits the same pill. */
  small?: boolean;
};

const PHRASES: Phrase[] = [
  { text: "Let's Talk" },
  { text: "Free Estimation" },
  { text: "Response in 24 Hours", small: true },
];

/* Typing rhythm, in milliseconds. Deleting runs faster than typing, as a person would. */
const TYPE_MS = 75;
const DELETE_MS = 40;
const HOLD_MS = 1600;
const GAP_MS = 220;

/**
 * Cycles through the phrases with a typewriter effect: the current phrase
 * holds, deletes character by character, and the next one types in.
 *
 * The server and the first client render show the first phrase in full, so
 * the markup matches, crawlers read a real label, and nothing flickers
 * before hydration. Under reduced motion it stays on that first phrase.
 */
function useTypewriter(phrases: Phrase[], enabled: boolean) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].text.length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const full = phrases[index].text.length;
    let delay: number;
    let step: () => void;

    if (!deleting && length === full) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (deleting && length === 0) {
      delay = GAP_MS;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      };
    } else {
      delay = deleting ? DELETE_MS : TYPE_MS;
      step = () => setLength((n) => n + (deleting ? -1 : 1));
    }

    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [enabled, phrases, index, length, deleting]);

  const phrase = enabled ? phrases[index] : phrases[0];
  return { phrase, visible: enabled ? phrase.text.slice(0, length) : phrase.text };
}

/**
 * The "Let's Talk" call to action, with the promise it carries — a free
 * estimation and a reply within a day — typed into the button itself.
 *
 * The pill keeps a fixed width so the navigation never shifts as the text
 * changes. Screen readers get one steady label instead of the moving text.
 */
export function TypewriterButton({
  href = "/contact",
  variant = "primary",
  size = "md",
  className,
}: {
  href?: string;
  variant?: "primary" | "onDark";
  size?: "md" | "lg";
  /** Replaces the default fixed width, e.g. `w-full` in the mobile menu. */
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { phrase, visible } = useTypewriter(PHRASES, !reduced);

  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      aria-label="Let's Talk — free estimation, response in 24 hours"
      /*
       * `!` so it beats the centring in the shared button base. Between lg
       * and xl the bar also carries every nav link, so the pill narrows a
       * little there and the long phrase drops a size to match.
       */
      className={cn(
        "justify-between!",
        className ?? "w-[17.5rem] lg:w-[15rem] lg:px-6 xl:w-[17.5rem] xl:px-8",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-semibold uppercase leading-none tracking-[0.02em]",
          phrase.small
            ? "text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]"
            : "text-[1rem]",
        )}
      >
        {/* A zero-width space holds the line height while the text is empty. */}
        {visible || "​"}
      </span>
      <ArrowIcon />
    </ButtonLink>
  );
}
