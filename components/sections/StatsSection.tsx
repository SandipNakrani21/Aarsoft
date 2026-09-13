import { stats } from "@/data/company";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The headline figures, set as open tiles rather than cards. Each one lifts
 * on hover and its figure takes the brand gradient; the rule between them
 * does the separating that a border used to.
 */
export function StatsSection() {
  return (
    <section className="border-y border-ink-200 bg-white">
      <div className="container-x">
        <RevealGroup
          as="dl"
          stagger={0.09}
          className="grid grid-cols-2 gap-x-6 gap-y-6 py-5 md:py-6 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="stat-tile px-2 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 lg:border-l lg:border-ink-200 lg:first:border-l-0 lg:px-7 lg:first:pl-0"
            >
              <dd className="stat-figure font-display text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-ink-900 md:text-5xl">
                <Counter
                  to={stat.countTo}
                  literal={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </dd>
              <dt className="mt-2 text-[1rem] text-ink-500">{stat.label}</dt>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
