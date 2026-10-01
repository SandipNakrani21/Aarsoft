"use client";

import { useEffect, useState } from "react";

/*
 * One signal: "the intro loader has started revealing the page".
 *
 * The hero and the navigation hold their entrance until it fires, so the
 * load sequence plays as the page is uncovered rather than unseen behind
 * the loader. Every path is bounded: the loader fires it on exit, and any
 * listener fires it on its own after `FAILSAFE_MS`, so content can never be
 * left waiting on a loader that failed to run. After the first page it
 * stays set, so client-side navigations animate immediately.
 */

const FAILSAFE_MS = 3000;

let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function useIntroDone(): boolean {
  const [ready, setReady] = useState(done);

  useEffect(() => {
    if (done) {
      setReady(true);
      return;
    }
    const listener = () => setReady(true);
    listeners.add(listener);
    const failsafe = window.setTimeout(markIntroDone, FAILSAFE_MS);
    return () => {
      listeners.delete(listener);
      window.clearTimeout(failsafe);
    };
  }, []);

  return ready;
}
