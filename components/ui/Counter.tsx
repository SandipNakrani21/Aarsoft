/** Server-rendered totals stay accurate without scripts or animation frames. */
export function Counter({ literal }: { literal: string; to?: number; prefix?: string; suffix?: string; duration?: number; start?: boolean }) {
  return <span className="tabular-nums">{literal}</span>;
}
