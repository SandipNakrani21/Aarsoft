"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useIntroDone } from "@/lib/intro";
import { CONSENT_KEY, readStorage, writeStorage, type Consent } from "@/lib/visit";
import { EASE_OUT } from "@/lib/motion";

/* A beat after the loader clears, so the page lands before the notice does. */
const DELAY_MS = 700;

/**
 * Cookie notice, bottom-left, asked once per browser.
 *
 * It waits for whichever loader is running to reveal the page, then slides
 * in. Accepting or declining stores the choice (lib/visit.ts) and it does not
 * come back. Declining is as easy as accepting. It is a non-modal region, so
 * the page stays fully usable while it is showing.
 */
export function CookieConsent() {
  const introDone = useIntroDone();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!introDone || readStorage(CONSENT_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  const choose = (value: Consent) => {
    writeStorage(CONSENT_KEY, JSON.stringify({ value, at: new Date().toISOString() }));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          aria-labelledby="cookie-title"
          aria-describedby="cookie-body"
          className="fixed bottom-4 left-4 right-4 z-[80] rounded-[var(--radius-lg)] border border-ink-200 bg-white p-5 shadow-[0_24px_60px_-20px_rgba(13,12,21,0.35)] sm:bottom-6 sm:left-6 sm:right-auto sm:w-[25rem] sm:p-6"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--color-lavender-soft)" }}
            >
              <Cookie className="h-5 w-5 text-ink-900" strokeWidth={1.6} />
            </span>
            <div>
              <h2 id="cookie-title" className="text-lg font-semibold tracking-[-0.01em] text-ink-900">
                We value your privacy
              </h2>
              <p id="cookie-body" className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500">
                We use cookies to keep this site working and to understand how it is used, so we
                can improve it. Read our{" "}
                <Link href="/privacy" className="font-medium text-ink-900 underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button variant="secondary" className="w-full" onClick={() => choose("declined")}>
              Decline
            </Button>
            <Button className="w-full" onClick={() => choose("accepted")}>
              Accept all
            </Button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
