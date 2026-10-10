import Image from "next/image";
import { trustLabels } from "@/data/company";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Technology capability strip. These are the technologies we work with —
 * deliberately not presented as client logos or partnership claims.
 * Each shows its official mark beside its name.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-ink-200 bg-surface py-10 md:py-12">
      <Reveal>
        <p className="container-x text-center text-[1.125rem] text-ink-500">
          Trusted engineering practice, built on technology teams already rely on.
        </p>
      </Reveal>

      <div className="container-x relative mt-8">
        <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
          {trustLabels.map((item, i) => {
            const Glyph = item.icon;
            return (
              <li
                key={`${item.name}-${i}`}
                aria-hidden={false}
                className="group flex items-center gap-3 font-display text-xl font-medium tracking-[-0.02em] text-ink-500 transition-colors duration-300 hover:text-ink-900 md:text-2xl"
              >
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt=""
                    width={32}
                    height={32}
                    /* The strip moves, so off-screen logos must be ready before they slide in. */
                    loading="lazy"
                    className="h-7 w-7 object-contain md:h-8 md:w-8"
                  />
                ) : Glyph ? (
                  <Glyph
                    className="h-7 w-7 text-ink-700 md:h-8 md:w-8"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                ) : null}
                <span data-text={item.name} className="link-gradient">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
