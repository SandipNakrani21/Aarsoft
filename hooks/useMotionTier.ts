"use client";
import { useSyncExternalStore } from "react";
export type MotionTier = "full" | "lite" | "none";
const subscribers = new Set<() => void>();
let queries: MediaQueryList[] = [];
let tier: MotionTier = "lite";
function update() {
  tier = queries[0]?.matches ? "none" : queries[1]?.matches ? "full" : "lite";
  subscribers.forEach(fn => fn());
}
function subscribe(fn: () => void) {
  if (!subscribers.size) {
    queries = [matchMedia("(prefers-reduced-motion: reduce)"), matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)")];
    queries.forEach(q => q.addEventListener("change", update));
    update();
  }
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
    if (!subscribers.size) { queries.forEach(q => q.removeEventListener("change", update)); queries = []; }
  };
}
/** One pair of capability listeners shared by all motion consumers. */
export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, () => tier, () => "lite");
}
