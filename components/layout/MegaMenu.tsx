"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavLink } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Menu = NonNullable<NavLink["menu"]>;

/**
 * The desktop mega menu panel, in three parts:
 *
 *  - the group's intro and a "view all" link,
 *  - a compact list of its pages, with a highlight that glides from link to
 *    link under the pointer or keyboard focus,
 *  - a dark preview card that follows that same highlight, showing the
 *    item's icon, full description and a link through.
 *
 * The panel unfolds from its top edge, its contents settle in on a short
 * stagger, and switching between menus while open cross-fades the contents
 * as the panel resizes. Reduced motion gets plain fades.
 */
export function MegaMenu({
  label,
  href,
  menu,
  reduced,
  onNavigate,
}: {
  label: string;
  href: string;
  menu: Menu;
  reduced: boolean;
  onNavigate: () => void;
}) {
  const [focus, setFocus] = useState(0);
  // A new menu starts with its first item in the preview.
  useEffect(() => setFocus(0), [label]);

  const current = menu.items[Math.min(focus, menu.items.length - 1)];
  const CurrentIcon = current.icon;

  const settle = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.08 + i * 0.03, ease: EASE_OUT },
        };

  return (
    <motion.div
      layout={!reduced}
      transition={{ layout: { duration: 0.4, ease: EASE_OUT } }}
      className="overflow-hidden rounded-[0_var(--card-r)_0_var(--card-r)] border border-ink-200/70 bg-white shadow-[0_30px_70px_-24px_rgba(13,12,21,0.4)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-12 gap-4 p-3"
        >
          {/* Intro */}
          <motion.div
            {...settle(0)}
            className="col-span-3 flex flex-col rounded-[0_16px_0_16px] bg-lavender-faint p-6"
          >
            <span className="inline-flex items-center gap-2.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink-500">
              <span aria-hidden="true" className="h-px w-6 bg-gradient-primary" />
              {label}
            </span>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-700">{menu.intro}</p>
            <Link
              href={href}
              onClick={onNavigate}
              className="group/all mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-semibold text-ink-900"
            >
              <span className="link-gradient-deep" data-text={`View all ${label.toLowerCase()}`}>
                View all {label.toLowerCase()}
              </span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/all:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Links, with a highlight that glides between them */}
          <ul
            className="col-span-6 grid content-start grid-cols-2 gap-1 py-1"
          >
            {menu.items.map((sub, i) => {
              const Icon = sub.icon;
              const on = i === focus;
              return (
                <motion.li key={sub.href} {...settle(i + 1)} className="relative">
                  {on && (
                    <motion.span
                      layoutId={reduced ? undefined : `mega-hover-${label}`}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[0_14px_0_14px] bg-lavender-faint"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <Link
                    href={sub.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setFocus(i)}
                    onFocus={() => setFocus(i)}
                    className="relative flex items-center gap-3 rounded-[0_14px_0_14px] px-3 py-2.5 outline-none"
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[0_10px_0_10px] transition-colors duration-300",
                        on ? "bg-ink-900 text-white" : "bg-gradient-primary text-ink-900",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        "text-[0.9375rem] font-medium leading-snug transition-[color,transform] duration-300",
                        on ? "translate-x-0.5 text-ink-900" : "text-ink-700",
                      )}
                    >
                      {sub.label}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Preview of the highlighted item */}
          <motion.div
            {...settle(2)}
            className="dark-section relative col-span-3 flex min-h-[15rem] flex-col overflow-hidden rounded-[0_16px_0_16px] bg-ink-900 p-6 text-white"
            style={{ backgroundColor: "var(--color-black)" }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 soft-glow"
              style={{ background: "var(--gradient-primary)" }}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.href}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="relative flex flex-1 flex-col"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[0_14px_0_14px] bg-gradient-primary text-ink-900">
                  <CurrentIcon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="mt-5 text-gradient w-fit text-lg font-semibold leading-snug">{current.label}</p>
                {current.description && (
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-300">{current.description}</p>
                )}
                <Link
                  href={current.href}
                  onClick={onNavigate}
                  tabIndex={-1}
                  className="group/open mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] font-medium text-white"
                >
                  Open
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/open:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Footer strip */}
          <motion.div
            {...settle(3)}
            className="col-span-12 flex items-center justify-between rounded-[0_14px_0_14px] border-t border-ink-100 px-3 pb-1 pt-3 text-[0.9375rem]"
          >
            <span className="text-ink-500">Not sure where to start?</span>
            <Link
              href="/contact"
              onClick={onNavigate}
              className="group/talk inline-flex items-center gap-2 font-medium text-ink-900"
            >
              Talk to us
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/talk:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
