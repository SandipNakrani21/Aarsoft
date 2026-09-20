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
  full: { src: "/aarsoft-logo.webp", width: 1931, height: 669 },
} as const;

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
}: {
  /** `full` keeps the tagline. Use it only where there is room to read it. */
  variant?: keyof typeof ART;
  className?: string;
  /** Sets the drawn height; width follows the artwork's own proportions. */
  imageClassName?: string;
  href?: string;
  priority?: boolean;
}) {
  const art = ART[variant];

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
