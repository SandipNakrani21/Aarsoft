/*
 * What this browser remembers about the visitor, kept in localStorage.
 *
 *  - `VISITED_KEY`  set once the first-visit intro has played. From then on
 *                   refreshes get the lighter route loader instead.
 *  - `CONSENT_KEY`  the visitor's cookie choice, so the notice is asked once.
 *
 * Storage can be unavailable (private mode, blocked site data), so every read
 * and write is guarded; without it the site simply behaves as a first visit.
 */

export const VISITED_KEY = "aarsoft-visited";
export const CONSENT_KEY = "aarsoft-cookie-consent";

/** Set on <html> before first paint by the inline script in the root layout. */
export const VISITED_ATTR = "data-visited";

export type Consent = "accepted" | "declined";

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Nothing to do: the choice just won't persist past this page view.
  }
}

/** True when this browser has seen the intro before (decided before first paint). */
export function isReturningVisit(): boolean {
  return document.documentElement.hasAttribute(VISITED_ATTR);
}

/**
 * Runs in <head> before anything paints, so a returning visitor never sees
 * even one frame of the first-visit intro. Kept tiny and dependency-free.
 */
export const visitedScript = `try{if(localStorage.getItem("${VISITED_KEY}"))document.documentElement.setAttribute("${VISITED_ATTR}","")}catch(e){}`;
