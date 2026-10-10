import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";
/** Native disclosure works with keyboard and without JavaScript. */
export function Accordion({ items }: { items: Faq[] }) {
  return <div className="border-t border-ink-200">{items.map((item,i) => <details key={item.question} open={i === 0} className="group border-b border-ink-200">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
      <span className="font-display text-xl tracking-[-0.02em] text-ink-900 md:text-2xl">{item.question}</span>
      <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200"><Plus className="h-4 w-4 text-ink-700 transition-transform group-open:rotate-45" /></span>
    </summary>
    <p className="max-w-[68ch] pb-7 pr-4 text-[1.125rem] leading-relaxed text-ink-500">{item.answer}</p>
  </details>)}</div>;
}
