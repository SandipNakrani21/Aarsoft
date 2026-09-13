import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
type Size = "md" | "lg";

/*
 * Every button shares one hover behaviour: the brand gradient wipes in from
 * a `::before` layer underneath the label, so the text colour can flip
 * independently and the transition stays smooth. `isolate` keeps the layer
 * behind the content without needing a z-index on every child.
 */
const base =
  "btn-gradient group/btn relative isolate inline-flex items-center justify-center gap-2 font-medium " +
  "rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none " +
  "hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-white hover:text-ink-900 hover:shadow-[0_14px_30px_-10px_rgba(193,184,255,0.6)]",
  secondary:
    "bg-white text-ink-900 border border-ink-200 hover:border-transparent hover:shadow-[0_14px_30px_-12px_rgba(193,184,255,0.7)]",
  ghost:
    "text-ink-700 hover:text-ink-900 hover:shadow-[0_10px_24px_-12px_rgba(193,184,255,0.6)]",
  onDark:
    "bg-white text-ink-900 hover:shadow-[0_14px_30px_-10px_rgba(193,184,255,0.55)]",
  onDarkGhost:
    "text-white border border-[rgba(193,184,255,0.28)] hover:border-transparent hover:text-ink-900",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-8 text-[1.0625rem]",
  lg: "h-[52px] px-12 text-[1.1875rem]",
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
        "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1",
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
