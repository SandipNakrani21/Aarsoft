import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Aarsoft mark — an abstract "A" built from a node and two connection
 * strokes, matching the brand pattern language (grid, nodes, data flow).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect width="32" height="32" rx="8" fill="var(--color-black)" />
      {/* Left stroke of the A */}
      <path
        d="M9 23.5 15.2 9.5"
        stroke="url(#aarsoft-mark-gradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Right stroke of the A */}
      <path
        d="M23 23.5 16.8 9.5"
        stroke="var(--color-lavender)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      {/* Crossbar rendered as a data connection */}
      <path
        d="M11.8 18.4h8.4"
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Apex node */}
      <circle cx="16" cy="8.4" r="2.4" fill="var(--color-gold)" />
      <defs>
        <linearGradient
          id="aarsoft-mark-gradient"
          x1="9"
          y1="23.5"
          x2="16"
          y2="9.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-lavender)" />
          <stop offset="1" stopColor="var(--color-gold)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Full lockup: mark plus wordmark. */
export function Logo({
  dark = false,
  className,
  href = "/",
}: {
  /** True when sitting on a dark surface. */
  dark?: boolean;
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-[var(--radius-sm)]",
        className,
      )}
      aria-label="Aarsoft Technologies — home"
    >
      <LogoMark className="h-9 w-9 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.125rem] font-semibold tracking-[-0.02em]",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          Aarsoft
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5625rem] uppercase tracking-[0.22em]",
            dark ? "text-ink-400" : "text-ink-400",
          )}
        >
          Technologies
        </span>
      </span>
    </Link>
  );
}
