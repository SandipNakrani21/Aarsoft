import type { LucideIcon } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The header every icon card on the site shares.
 *
 * The icon sits in a tab bound into the card's square top-left corner, on
 * the brand gradient, and the tab turns black when the card is hovered or
 * focused. The title sits beside the tab, centred on it.
 *
 * The card itself needs the `corner-card` class (see globals.css), which
 * sets the padding the tab is measured against. Any element after the head
 * is the card body.
 */
export function CardHead({
  icon: Icon,
  title,
  as: Tag = "h3",
  className,
  titleClassName,
}: {
  icon: LucideIcon;
  title: ReactNode;
  /** Heading level for the title; cards on overview pages may need h2. */
  as?: ElementType;
  className?: string;
  /** Size and colour of the title (both, as a pair); layout comes from `corner-title`. */
  titleClassName?: string;
}) {
  return (
    <div className={cn("corner-head", className)}>
      <span className="corner-tab" aria-hidden="true">
        <span className="corner-fillet corner-fillet-top" />
        <span className="corner-fillet corner-fillet-side" />
        <Icon className="corner-tab-icon h-7 w-7" strokeWidth={1.5} />
      </span>
      <Tag
        className={cn(
          "corner-title font-display leading-snug tracking-[-0.02em]",
          titleClassName ?? "text-xl text-ink-900",
        )}
      >
        {title}
      </Tag>
    </div>
  );
}
