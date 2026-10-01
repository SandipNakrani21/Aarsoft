import { cn } from "@/lib/utils";

type Node = { x: number; y: number; r: number; accent?: boolean; delay: number };

const nodes: Node[] = [
  { x: 60, y: 150, r: 3.5, delay: 0 },
  { x: 140, y: 70, r: 5, accent: true, delay: 0.6 },
  { x: 150, y: 235, r: 4, delay: 1.2 },
  { x: 250, y: 130, r: 6, delay: 0.3 },
  { x: 262, y: 300, r: 3.5, delay: 1.8 },
  { x: 360, y: 60, r: 4, delay: 0.9 },
  { x: 372, y: 215, r: 5, accent: true, delay: 1.5 },
  { x: 468, y: 148, r: 3.5, delay: 2.1 },
  { x: 455, y: 290, r: 4, delay: 0.45 },
  { x: 545, y: 95, r: 5, delay: 1.05 },
  { x: 560, y: 245, r: 3.5, accent: true, delay: 1.65 },
];

const links: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [3, 6],
  [4, 6],
  [5, 7],
  [6, 7],
  [6, 8],
  [7, 9],
  [7, 10],
  [8, 10],
];

/**
 * Abstract network of connected nodes — the brand pattern expressed as a
 * data flow. Connections carry a slow travelling dash; nodes pulse at
 * staggered intervals. All of it stops under reduced motion.
 */
export function NodeNetwork({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const lineColor =
    tone === "dark" ? "rgba(193, 184, 255, 0.32)" : "rgba(13, 12, 21, 0.14)";
  const flowColor = tone === "dark" ? "var(--color-gold)" : "var(--color-lavender)";

  return (
    <svg
      viewBox="0 0 620 360"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      {links.map(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={lineColor}
              strokeWidth="1"
            />
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={flowColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="3 210"
              opacity="0.85"
              className="node-flow"
              style={{
                animation: `dash-flow ${11 + (i % 5) * 2.5}s linear infinite`,
                animationDelay: `${i * 0.55}s`,
              }}
            />
          </g>
        );
      })}

      {nodes.map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r * 3.2}
            fill={node.accent ? "var(--color-gold)" : "var(--color-lavender)"}
            opacity="0.1"
            style={{
              transformOrigin: `${node.x}px ${node.y}px`,
              animation: "node-pulse 4.5s ease-in-out infinite",
              animationDelay: `${node.delay}s`,
            }}
          />
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.accent ? "var(--color-gold)" : "var(--color-lavender)"}
            opacity={tone === "dark" ? 0.95 : 0.8}
          />
        </g>
      ))}
    </svg>
  );
}
