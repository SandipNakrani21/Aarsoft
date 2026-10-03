import type { CaseStudy } from "@/data/work";
import { cn } from "@/lib/utils";

/**
 * Abstract product mockups for case studies. Each variant is a simplified
 * fragment of the interface that project would have — enough to read as a
 * real product without pretending to be a screenshot.
 */
export function ProjectVisual({
  variant,
  accent,
  className,
}: {
  variant: CaseStudy["visual"];
  accent: CaseStudy["accent"];
  className?: string;
}) {
  const isDark = accent === "dark";

  const surface = isDark ? "rgba(13,12,21,0.55)" : "rgba(255,255,255,0.78)";
  const line = isDark ? "rgba(193,184,255,0.18)" : "rgba(13,12,21,0.08)";
  const barMuted = isDark ? "rgba(193,184,255,0.3)" : "rgba(13,12,21,0.14)";
  const barStrong =
    accent === "gold" ? "var(--color-gold)" : "var(--color-lavender)";
  const textMuted = isDark ? "rgba(193,184,255,0.55)" : "rgba(13,12,21,0.35)";

  const background =
    accent === "dark"
      ? "var(--gradient-dark)"
      : accent === "gold"
        ? "var(--gradient-gold-fade)"
        : "var(--gradient-lavender-fade)";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden card-shape",
        className,
      )}
      style={{
        background,
        backgroundColor: isDark ? "var(--color-black)" : "var(--color-gray)",
      }}
    >
      {/*
       * Hovering the card zooms the artwork a few percent inside its frame.
       * The root clips, so the zoom never spills over the card's edge.
       */}
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
      <div
        aria-hidden="true"
        className={cn("absolute inset-0", isDark ? "brand-grid-dark" : "brand-grid")}
      />

      {/* Window chrome */}
      <div
        className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-[var(--radius-md)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:inset-x-8 sm:top-8"
        style={{ backgroundColor: surface, border: `1px solid ${line}` }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-3"
          style={{ borderBottom: `1px solid ${line}` }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: barMuted }} />
          <span className="h-2 w-2 rounded-full" style={{ background: barMuted }} />
          <span className="h-2 w-2 rounded-full" style={{ background: barStrong }} />
          <span
            className="ml-3 h-2 w-24 rounded-full"
            style={{ background: barMuted, opacity: 0.6 }}
          />
        </div>

        <div className="p-4 sm:p-5">
          {variant === "crm" && <CrmBody {...{ line, barMuted, barStrong, textMuted }} />}
          {variant === "ops" && <OpsBody {...{ line, barMuted, barStrong }} />}
          {variant === "commerce" && <CommerceBody {...{ line, barMuted, barStrong }} />}
          {variant === "ai" && <AiBody {...{ line, barMuted, barStrong }} />}
        </div>
      </div>
      </div>

      {/* Overlay that deepens the lower edge on hover, grounding the artwork. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(13,12,21,0.14) 0%, rgba(193,184,255,0.08) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}

type BodyProps = {
  line: string;
  barMuted: string;
  barStrong: string;
  textMuted?: string;
};

/* Pipeline board */
function CrmBody({ line, barMuted, barStrong }: BodyProps) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {[3, 2, 4, 1].map((count, col) => (
        <div key={col} className="space-y-2">
          <span
            className="block h-1.5 w-2/3 rounded-full"
            style={{ background: col === 2 ? barStrong : barMuted }}
          />
          {Array.from({ length: count }).map((_, row) => (
            <div
              key={row}
              className="space-y-1.5 rounded-[6px] p-2"
              style={{ border: `1px solid ${line}` }}
            >
              <span
                className="block h-1.5 w-full rounded-full"
                style={{ background: barMuted, opacity: 0.8 }}
              />
              <span
                className="block h-1.5 w-1/2 rounded-full"
                style={{ background: barMuted, opacity: 0.45 }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* Workflow steps with a progress rail */
function OpsBody({ line, barMuted, barStrong }: BodyProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <span
              className="h-5 w-5 shrink-0 rounded-full"
              style={{ background: i <= 2 ? barStrong : barMuted, opacity: i <= 2 ? 1 : 0.45 }}
            />
            {i < 4 && (
              <span
                className="h-px flex-1"
                style={{ background: i < 2 ? barStrong : barMuted, opacity: 0.6 }}
              />
            )}
          </div>
        ))}
      </div>

      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="flex items-center gap-3 rounded-[6px] p-2.5"
          style={{ border: `1px solid ${line}` }}
        >
          <span
            className="h-6 w-6 shrink-0 rounded-[4px]"
            style={{ background: barMuted, opacity: 0.5 }}
          />
          <span className="flex-1 space-y-1.5">
            <span
              className="block h-1.5 rounded-full"
              style={{ background: barMuted, width: `${70 - row * 12}%` }}
            />
            <span
              className="block h-1.5 w-1/3 rounded-full"
              style={{ background: barMuted, opacity: 0.4 }}
            />
          </span>
          <span
            className="h-4 w-12 rounded-full"
            style={{ background: row === 0 ? barStrong : barMuted, opacity: row === 0 ? 0.9 : 0.35 }}
          />
        </div>
      ))}
    </div>
  );
}

/* Catalogue grid plus stock chart */
function CommerceBody({ line, barMuted, barStrong }: BodyProps) {
  const bars = [40, 62, 48, 78, 56, 88, 70];
  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-3 grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="space-y-1.5 rounded-[6px] p-2"
            style={{ border: `1px solid ${line}` }}
          >
            <span
              className="block h-7 w-full rounded-[4px]"
              style={{ background: i === 1 ? barStrong : barMuted, opacity: i === 1 ? 0.8 : 0.3 }}
            />
            <span
              className="block h-1.5 w-3/4 rounded-full"
              style={{ background: barMuted, opacity: 0.6 }}
            />
          </div>
        ))}
      </div>

      <div
        className="col-span-2 flex flex-col justify-end gap-2 rounded-[6px] p-2.5"
        style={{ border: `1px solid ${line}` }}
      >
        <div className="flex h-16 items-end gap-1">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-[2px]"
              style={{
                height: `${h}%`,
                background: i >= bars.length - 2 ? barStrong : barMuted,
                opacity: i >= bars.length - 2 ? 0.95 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Query, answer and citations */
function AiBody({ line, barMuted, barStrong }: BodyProps) {
  return (
    <div className="space-y-3">
      <div
        className="flex items-center gap-2 rounded-[6px] px-3 py-2.5"
        style={{ border: `1px solid ${barStrong}`, opacity: 0.95 }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: barStrong }} />
        <span
          className="h-1.5 flex-1 rounded-full"
          style={{ background: barMuted, opacity: 0.7 }}
        />
      </div>

      <div className="space-y-2 rounded-[6px] p-3" style={{ border: `1px solid ${line}` }}>
        {[100, 92, 76, 84, 48].map((w, i) => (
          <span
            key={i}
            className="block h-1.5 rounded-full"
            style={{ background: barMuted, width: `${w}%`, opacity: 0.55 }}
          />
        ))}
        <div className="flex gap-1.5 pt-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-3.5 w-10 rounded-full"
              style={{ background: barStrong, opacity: 0.35 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
