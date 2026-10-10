import type { Post } from "./insights";
export type { Category } from "./insights";
/** Type-only projection; article bodies never enter the browser listing bundle. */
export type ArticleSummary = Pick<Post, "slug" | "title" | "excerpt" | "category" | "date" | "author" | "readingTime">;
