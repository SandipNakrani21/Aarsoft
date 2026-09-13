import { trustLabels } from "@/data/company";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Technology capability strip. These are the technologies we work with —
 * deliberately not presented as client logos or partnership claims.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-ink-200 bg-surface py-10 md:py-12">
      <Reveal>
        <p className="container-x text-center text-[1.125rem] text-ink-500">
          Trusted engineering practice, built on technology teams already rely on.
        </p>
      </Reveal>

      <div className="mask-fade-x relative mt-8 overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-x-12 md:gap-x-16">
          {[...trustLabels, ...trustLabels].map((label, i) => (
            <li
              key={`${label}-${i}`}
              aria-hidden={i >= trustLabels.length}
              className="font-display text-xl font-medium tracking-[-0.02em] text-ink-400 transition-colors duration-300 hover:text-ink-900 link-gradient md:text-2xl"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
