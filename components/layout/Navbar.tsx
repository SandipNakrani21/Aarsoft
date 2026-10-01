"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav, site } from "@/data/site";
import { TypewriterButton } from "@/components/ui/TypewriterButton";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { useIntroDone } from "@/lib/intro";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /* Every page opens on the Deep Black ground, so start there and measure. */
  const [overDark, setOverDark] = useState(true);
  const [open, setOpen] = useState(false);
  /* Label of the desktop mega menu currently open, if any. */
  const [menu, setMenu] = useState<string | null>(null);
  /* Label of the mobile accordion group currently expanded, if any. */
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  /* The bar enters as the intro loader opens, not unseen behind it. */
  const introDone = useIntroDone();

  /*
   * Two things follow the scroll position: whether the bar has elevated,
   * and what kind of ground is currently behind it.
   *
   * The bar is thin frosted glass, so the section underneath decides
   * whether it reads light or dark. Hit-testing the middle of the bar for
   * a `.dark-section` ancestor is what tells it which, and is why the
   * links stay readable as black blocks pass beneath. Reading the class
   * beats sampling pixels: it costs one hit test per frame and it cannot
   * be fooled by a decorative overlay.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);

      const bar = document.querySelector("header nav");
      if (!bar) return;
      const box = bar.getBoundingClientRect();
      const under = document.elementsFromPoint(
        Math.round(box.left + box.width / 2),
        Math.round(box.top + box.height / 2),
      );
      /* The bar itself sits at that point; the ground is the first thing below it. */
      const ground = under.find((el) => !el.closest("header"));
      setOverDark(Boolean(ground?.closest(".dark-section")));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    /* Re-measure on navigation: the new page's first section may differ. */
  }, [pathname]);

  /* Close every menu whenever the route changes. */
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  /* Lock scrolling behind the mobile menu, including Lenis. */
  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes either menu. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /*
   * Hover intent for the mega menu: opening is immediate, closing waits a
   * beat so a pointer crossing from the link to the panel, or clipping a
   * corner on the way, does not snap it shut.
   */
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const openMenu = useCallback(
    (label: string) => {
      cancelClose();
      setMenu(label);
    },
    [cancelClose],
  );
  const closeMenuSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  }, [cancelClose]);
  useEffect(() => cancelClose, [cancelClose]);

  const activeMenu = mainNav.find((item) => item.label === menu && item.menu);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Light text whenever the ground behind the bar is dark, docked or not. */
  const lightText = overDark;

  /*
   * First-load entrance: logo, then links in a quick stagger, then the call
   * to action. The bar lives in the root layout, so this plays once per
   * visit rather than on every navigation. Only the contents animate — the
   * bar itself carries a CSS transition for docking, and driving it from
   * script as well would make the two fight.
   */
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: -8 },
          animate: introDone ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-[0.9375rem] focus:text-white"
      >
        Skip to main content
      </a>

      {/*
       * At the top the bar is flush and transparent. Once the page moves it
       * detaches into a floating pill: inset from every edge, fully rounded
       * and elevated, so it reads as a control sitting over the page rather
       * than a band stuck to it.
       */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled && "pt-3 md:pt-4",
        )}
      >
        <div className="container-x">
          {/*
           * The pill's negative margin cancels its own padding, so it grows
           * outward into the page gutter while the logo and links stay on the
           * same vertical line as the content below. Nothing shifts sideways
           * when the bar docks.
           */}
          <nav
            aria-label="Main"
            className={cn(
              "relative flex h-[var(--nav-h)] items-center justify-between gap-4 xl:gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled
                ? "nav-gloss -mx-3 rounded-full px-3 sm:-mx-5 sm:px-5 md:-mx-7 md:px-7"
                : "border border-transparent bg-transparent",
            )}
          >
            <motion.div {...enter(0)} className="shrink-0">
              {/* Full lockup; a touch taller so "TECHNOLOGIES" stays legible. */}
              {/* The open mobile menu is white, so it always takes the black word. */}
              <Logo
                variant="header"
                onDark={lightText && !open}
                priority
                imageClassName="h-14"
              />
            </motion.div>

          <ul className="hidden items-center lg:flex xl:gap-1">
            {mainNav.map((item, i) => {
              const hasMenu = Boolean(item.menu);
              const expanded = menu === item.label;
              const highlighted = isActive(item.href) || expanded;
              return (
                <motion.li
                  key={item.href}
                  {...enter(0.1 + i * 0.04)}
                  className="relative flex items-center"
                  onMouseEnter={hasMenu ? () => openMenu(item.label) : closeMenuSoon}
                  onMouseLeave={hasMenu ? closeMenuSoon : undefined}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    data-text={item.label}
                    className={cn(
                      /* Slightly tighter below xl, where the bar is at its fullest. */
                      "link-gradient relative rounded-[var(--radius-sm)] py-2 text-[1rem] font-medium xl:text-[1.125rem] transition-colors duration-200",
                      hasMenu ? "pl-2 pr-0.5 xl:pl-3.5" : "px-2 xl:px-3.5",
                      lightText
                        ? highlighted
                          ? "text-white"
                          : "text-ink-300 hover:text-white"
                        : cn(
                            "link-gradient-deep",
                            highlighted ? "text-ink-900" : "text-ink-500 hover:text-ink-900",
                          ),
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId={reduced ? undefined : "nav-active"}
                        aria-hidden="true"
                        className={cn(
                          "bg-gradient-primary absolute -bottom-0.5 h-[2px] rounded-full",
                          hasMenu ? "left-2 right-0.5 xl:left-3.5" : "inset-x-2 xl:inset-x-3.5",
                        )}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </Link>

                  {/* The chevron is the keyboard and touch way into the menu. */}
                  {hasMenu && (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls="nav-mega"
                      aria-label={`${expanded ? "Hide" : "Show"} ${item.label} menu`}
                      onClick={() => (expanded ? setMenu(null) : openMenu(item.label))}
                      className={cn(
                        "mr-1 inline-flex h-7 w-6 items-center justify-center rounded-md transition-colors xl:mr-2",
                        lightText
                          ? highlighted
                            ? "text-white"
                            : "text-ink-300 hover:text-white"
                          : highlighted
                            ? "text-ink-900"
                            : "text-ink-500 hover:text-ink-900",
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          expanded && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </motion.li>
              );
            })}
          </ul>

          <motion.div {...enter(0.35)} className="flex items-center gap-2">
            {/* Wrapper handles the breakpoint: `hidden` on the button itself
                would lose to the `inline-flex` in the button base styles. */}
            <span className="hidden sm:block">
              <TypewriterButton variant={lightText ? "onDark" : "primary"} />
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] border transition-colors lg:hidden",
                lightText
                  ? "border-[rgba(193,184,255,0.3)] text-white hover:bg-white/10"
                  : "border-ink-200 text-ink-900 hover:bg-ink-100",
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>

            {/*
             * Mega menu. It hangs from the whole bar rather than its own
             * trigger, so every menu opens at the same place and width. The
             * transparent top padding bridges the gap from the link, so the
             * pointer can travel down into the panel without closing it.
             */}
            <AnimatePresence>
              {activeMenu?.menu && (
                <motion.div
                  key="mega"
                  id="nav-mega"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenuSoon}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMenuSoon();
                  }}
                  onFocus={cancelClose}
                  className="absolute inset-x-0 top-full hidden pt-3 lg:block"
                >
                  <div className="grid grid-cols-12 gap-4 rounded-[var(--radius-lg)] border border-ink-200/70 bg-white p-3 shadow-[0_24px_60px_-20px_rgba(13,12,21,0.35)]">
                    <div className="col-span-4 flex flex-col rounded-[var(--radius-md)] bg-lavender-faint p-6 xl:col-span-3">
                      <span className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink-500">
                        {activeMenu.label}
                      </span>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                        {activeMenu.menu.intro}
                      </p>
                      <Link
                        href={activeMenu.href}
                        onClick={() => setMenu(null)}
                        className="group mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] font-medium text-ink-900"
                      >
                        View all {activeMenu.label.toLowerCase()}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>

                    <ul
                      className={cn(
                        "col-span-8 grid content-start gap-1 py-1 xl:col-span-9",
                        activeMenu.menu.items.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2",
                      )}
                    >
                      {activeMenu.menu.items.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setMenu(null)}
                              className="group flex items-start gap-3.5 rounded-[var(--radius-md)] p-3 outline-none transition-colors duration-200 hover:bg-lavender-faint focus-visible:bg-lavender-faint"
                            >
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-lavender-soft text-ink-700 transition-colors duration-200 group-hover:bg-ink-900 group-hover:text-lavender">
                                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                              </span>
                              <span className="min-w-0 pt-0.5">
                                <span className="block text-[0.9375rem] font-medium leading-snug text-ink-900">
                                  {sub.label}
                                </span>
                                {sub.description && (
                                  <span className="mt-0.5 line-clamp-2 text-[0.8125rem] leading-snug text-ink-500">
                                    {sub.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-white pt-[var(--nav-h)] lg:hidden"
          >
            <div className="brand-grid pointer-events-none absolute inset-0 opacity-60" />

            <div className="container-x relative flex flex-1 flex-col overflow-y-auto pb-10 pt-8">
              <ul className="flex flex-col">
                {mainNav.map((item, i) => {
                  const groupOpen = mobileGroup === item.label;
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: reduced ? 0 : 0.06 + i * 0.045,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-ink-200"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          href={item.href}
                          className="flex-1 py-4 font-display text-3xl tracking-[-0.03em] text-ink-900"
                        >
                          {item.label}
                        </Link>
                        {item.menu ? (
                          <button
                            type="button"
                            aria-expanded={groupOpen}
                            aria-controls={`mobile-group-${i}`}
                            aria-label={`${groupOpen ? "Hide" : "Show"} ${item.label} links`}
                            onClick={() => setMobileGroup(groupOpen ? null : item.label)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-900 transition-colors hover:bg-ink-100"
                          >
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform duration-300",
                                groupOpen && "rotate-180",
                              )}
                              aria-hidden="true"
                            />
                          </button>
                        ) : (
                          <span className="text-xs text-ink-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {item.menu && groupOpen && (
                          <motion.div
                            id={`mobile-group-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <ul className="grid gap-0.5 pb-4">
                              {item.menu.items.map((sub) => {
                                const Icon = sub.icon;
                                return (
                                  <li key={sub.href}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center gap-3 rounded-[var(--radius-sm)] px-2 py-2.5 text-[1rem] text-ink-700 transition-colors hover:bg-lavender-faint hover:text-ink-900"
                                    >
                                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-lavender-soft text-ink-700">
                                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                      </span>
                                      {sub.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-10">
                <TypewriterButton size="lg" className="w-full" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-5 block text-center text-[0.9375rem] text-ink-500"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
