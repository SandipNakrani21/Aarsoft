import { ArrowIcon, ButtonLink } from "./Button";
import { cn } from "@/lib/utils";
/** Stable action wording; movement is confined to the shared arrow/outline. */
export function TypewriterButton({ href = "/contact", variant = "primary", size = "md", className }: {
  href?: string; variant?: "primary" | "onDark"; size?: "md" | "lg"; className?: string;
}) {
  return <ButtonLink href={href} variant={variant} size={size} className={cn("justify-between!", className ?? "w-[12rem] lg:w-[11rem] lg:px-6")}>
    <span className="font-semibold uppercase text-[1rem]">Let&apos;s Talk</span><ArrowIcon />
  </ButtonLink>;
}
