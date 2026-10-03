import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
type Size = "md" | "lg";

/*
 * The site button: an outline with two slanted gaps cut into it (see
 * `.btn-cut` in globals.css). On hover the brand gradient wipes in on a
 * slant, the outline fades into it and the label turns dark. Variants set
 * the outline and label colours; main buttons carry a stronger outline than
 * secondary ones, so the hierarchy survives without a solid fill.
 */
const base =
  "btn-cut group/btn relative isolate inline-flex items-center justify-center gap-2.5 font-medium " +
  "btn-shape transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none " +
  "hover:-translate-y-0.5 hover:text-ink-900 focus-visible:text-ink-900";

const variants: Record<Variant, string> = {
  primary:
    "font-semibold text-ink-900 hover:shadow-[0_14px_30px_-10px_rgba(193,184,255,0.6)]",
  secondary:
    "text-ink-900 [--btn-line:var(--color-ink-300)] hover:shadow-[0_14px_30px_-12px_rgba(193,184,255,0.7)]",
  ghost:
    "text-ink-700 [--btn-line:var(--color-ink-200)] hover:shadow-[0_10px_24px_-12px_rgba(193,184,255,0.6)]",
  onDark:
    "font-semibold text-white [--btn-line:var(--color-white)] hover:shadow-[0_14px_30px_-10px_rgba(193,184,255,0.55)]",
  onDarkGhost:
    "text-white [--btn-line:rgba(193,184,255,0.5)] hover:shadow-[0_14px_30px_-10px_rgba(193,184,255,0.45)]",
};

const sizes: Record<Size, string> = {
  md: "h-[52px] px-10 text-[1.125rem]",
  lg: "h-[60px] px-14 text-[1.25rem]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: BaseProps & ComponentProps<typeof Link>) {
  const external = typeof href === "string" && /^https?:/.test(href);

  if (external) {
    return (
      <a
        href={href as string}
        className={cn(base, variants[variant], sizes[size], className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Arrow that nudges right on hover of its parent button. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-[18px] w-[18px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1",
        className,
      )}
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
