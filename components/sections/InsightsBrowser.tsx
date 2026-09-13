"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { categories, posts, type Category } from "@/data/insights";
import { formatDate, cn } from "@/lib/utils";

/** Category filtering and text search over the article list. */
export function InsightsBrowser() {
  const [active, setActive] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = active === "All" || post.category === active;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 border-y border-ink-200 py-5 lg:flex-row lg:items-center lg:justify-between">
        <ul
          className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:pb-0"
          role="list"
        >
          {(["All", ...categories] as const).map((category) => {
            const isActive = active === category;
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={cn(
                    /* A pill has a background, so it takes the gradient there rather than on the text. */
                    "btn-gradient relative isolate whitespace-nowrap rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300",
                    isActive ? "text-white" : "text-ink-500 hover:text-ink-900",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduced ? undefined : "insight-pill"}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-ink-900"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span className="relative">{category}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative lg:w-72">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            aria-hidden="true"
          />
          <label htmlFor="insight-search" className="sr-only">
            Search articles
          </label>
          <input
            id="insight-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-[var(--radius-sm)] border border-ink-200 bg-white py-2.5 pl-10 pr-9 text-[1.125rem] text-ink-900 placeholder:text-ink-300 transition-colors duration-200 hover:border-ink-300 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-lavender"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-ink-400 transition-colors hover:text-ink-900 link-gradient"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Result count, announced to assistive tech */}
      <p role="status" className="mt-6 text-[0.875rem] text-ink-400">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {active !== "All" && ` in ${active}`}
        {query && ` matching “${query}”`}
      </p>

      {filtered.length === 0 ? (
        <div className="hairline mt-8 rounded-[var(--radius-lg)] p-12 text-center">
          <p className="font-display text-2xl text-ink-900">No articles found.</p>
          <p className="mt-2.5 text-[1.125rem] text-ink-500">
            Try a different category, or clear the search.
          </p>
          <button
            type="button"
            onClick={() => {
              setActive("All");
              setQuery("");
            }}
            className="mt-6 rounded-[var(--radius-sm)] border border-ink-200 px-4 py-2.5 text-[1.125rem] font-medium text-ink-900 transition-colors hover:border-ink-900"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((post) => (
              <motion.li
                key={post.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className=""
              >
                <Link
                  href={`/insights/${post.slug}`}
                  className="card-box group flex h-full flex-col p-7"
                >
                  <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-ink-400">
                    {post.category}
                  </span>

                  <h3 className="mt-5 font-display text-2xl leading-tight tracking-[-0.025em] text-ink-900">
                    {post.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[1.125rem] leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>

                  <span className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-100 pt-5 text-[0.875rem] text-ink-400">
                    <span>{post.author}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} min read</span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
