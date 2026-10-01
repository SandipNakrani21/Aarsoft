export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Splits a headline into balanced lines for the masked text reveal, so a
 * long heading breaks at word boundaries instead of wherever the box ends.
 */
export function splitHeadline(text: string, maxChars = 24): string[] {
  return text.split(" ").reduce<string[]>((lines, word) => {
    const last = lines[lines.length - 1];
    if (last && `${last} ${word}`.length <= maxChars) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
    return lines;
  }, []);
}

/**
 * Splits a headline into exactly two balanced lines, breaking at the word
 * boundary closest to the halfway point. Used for titles that come from data
 * and so cannot be hand-split.
 */
export function splitIntoTwoLines(text: string): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return [text];

  const half = text.length / 2;
  let best = 1;
  let bestDelta = Infinity;

  for (let i = 1; i < words.length; i++) {
    const delta = Math.abs(words.slice(0, i).join(" ").length - half);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = i;
    }
  }

  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** URL-safe anchor id from a label, e.g. "ERP & CRM" -> "erp-crm". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
