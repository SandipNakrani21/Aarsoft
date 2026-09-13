"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav, site } from "@/data/site";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";


export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /* Every page opens on the Deep Black ground, so start there and measure. */
  const [overDark, setOverDark] = useState(true);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

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

  /* Close the mobile menu whenever the route changes. */
  useEffect(() => setOpen(false), [pathname]);

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

  /* Escape closes the menu. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Light text whenever the ground behind the bar is dark, docked or not. */
  const lightText = overDark;

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
              "relative flex h-[var(--nav-h)] items-center justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled
                ? "nav-gloss -mx-3 rounded-full px-3 sm:-mx-5 sm:px-5 md:-mx-7 md:px-7"
                : "border border-transparent bg-transparent",
            )}
          >
            <Logo dark={lightText} />

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  data-text={item.label}
                  className={cn(
                    "link-gradient relative rounded-[var(--radius-sm)] px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                    lightText
                      ? isActive(item.href)
                        ? "text-white"
                        : "text-ink-300 hover:text-white"
                      : isActive(item.href)
                        ? "text-ink-900"
                        : "text-ink-500 hover:text-ink-900",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId={reduced ? undefined : "nav-active"}
                      aria-hidden="true"
                      className="bg-gradient-primary absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Wrapper handles the breakpoint: `hidden` on the button itself
                would lose to the `inline-flex` in the button base styles. */}
            <span className="hidden sm:block">
              <ButtonLink href="/contact" variant={lightText ? "onDark" : "primary"}>
                Let&apos;s Talk
                <ArrowIcon />
              </ButtonLink>
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
          </div>
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
                {mainNav.map((item, i) => (
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
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-4 font-display text-3xl tracking-[-0.03em] text-ink-900"
                    >
                      {item.label}
                      <span className="text-xs text-ink-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Let&apos;s Talk
                  <ArrowIcon />
                </ButtonLink>
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
