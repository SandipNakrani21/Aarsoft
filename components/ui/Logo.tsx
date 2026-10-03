import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * The supplied logo artwork, in the two crops the site needs.
 *
 * `wordmark` drops the "Innovate · Integrate · Elevate" line, because at
 * header size that line renders a few pixels tall and turns to mush. The
 * footer has the room for the whole lockup, so it uses `full`.
 *
 * Intrinsic sizes are declared so the browser reserves the right space
 * before the file arrives and the bar never jumps on load.
 */
const ART = {
  wordmark: { src: "/aarsoft-logo-wordmark.webp", width: 1931, height: 573 },
  /*
   * The brand lockup as supplied: pastel gradient mark and wordmark with
   * "TECHNOLOGIES" in white, for dark grounds such as the footer.
   */
  full: { src: "/aarsoft-logo-2026-light.webp", width: 1941, height: 666 },
  /*
   * The header lockup on light grounds: the same artwork with "TECHNOLOGIES"
   * in Deep Black. Its twin (HEADER_ON_DARK, the supplied white version) is
   * cross-faded in whenever the bar sits over a dark section.
   */
  header: { src: "/aarsoft-logo-2026-dark-text.webp", width: 1941, height: 666 },
} as const;

const HEADER_ON_DARK = "/aarsoft-logo-2026-light.webp";

/**
 * Brand lockup, linked home.
 *
 * The artwork carries its own colour, so there is no light and dark
 * variant to pick between; it sits on every ground unchanged.
 */
export function Logo({
  variant = "wordmark",
  className,
  imageClassName,
  href = "/",
  priority = false,
  onDark = false,
}: {
  /** Header lockup only: swap "TECHNOLOGIES" to white over a dark ground. */
  onDark?: boolean;
  /** `full` keeps the tagline. Use it only where there is room to read it. */
  variant?: keyof typeof ART;
  className?: string;
  /** Sets the drawn height; width follows the artwork's own proportions. */
  imageClassName?: string;
  href?: string;
  priority?: boolean;
}) {
  const art = ART[variant];

  const imageClass = cn(
    /* object-contain keeps the artwork's shape if a narrow column clamps the width. */
    "w-auto max-w-full object-contain transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
    imageClassName ?? "h-8",
  );

  /*
   * The header's two versions are stacked and cross-faded rather than
   * swapped by `src`, so the change of ground never shows a blank frame
   * while the other file loads.
   */
  if (variant === "header") {
    return (
      <Link
        href={href}
        className={cn("group relative inline-flex items-center rounded-[var(--radius-sm)]", className)}
        aria-label="Aarsoft Technologies — home"
      >
        <Image
          src={art.src}
          width={art.width}
          height={art.height}
          priority={priority}
          alt=""
          className={cn(imageClass, onDark && "opacity-0")}
        />
        <Image
          src={HEADER_ON_DARK}
          width={art.width}
          height={art.height}
          priority={priority}
          alt=""
          className={cn(imageClass, "absolute left-0 top-1/2 -translate-y-1/2", !onDark && "opacity-0")}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center rounded-[var(--radius-sm)]", className)}
      aria-label="Aarsoft Technologies — home"
    >
      <Image
        src={art.src}
        width={art.width}
        height={art.height}
        priority={priority}
        /* The link is already labelled, so the art is decorative here. */
        alt=""
        className={cn(
          /* object-contain keeps the artwork's shape if a narrow column clamps the width. */
          "w-auto max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
          imageClassName ?? "h-8",
        )}
      />
    </Link>
  );
}
