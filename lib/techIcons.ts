import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Activity,
  BarChart3,
  BrainCircuit,
  Code2,
  FileCode2,
  GitBranch,
  LayoutGrid,
  ListOrdered,
  MousePointerClick,
  Palette,
  ScanSearch,
  Sparkles,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

/**
 * Logo or icon for each technology named in the site data.
 *
 * Named products use their official mark from `public/tech`. Practices with
 * no brand mark (REST APIs, CI/CD, WCAG…) get a line icon instead, so a
 * product is never shown with someone else's logo. Anything not listed
 * falls back to a generic code icon.
 */
export type TechMark = { logo: string } | { icon: LucideIcon };

const LOGOS: Record<string, string> = {
  ".NET": "dot-net-original",
  "ASP.NET Core": "dotnetcore-original",
  "Node.js": "nodejs-original",
  TypeScript: "typescript-original",
  PostgreSQL: "postgresql-original",
  "SQL Server": "microsoftsqlserver-original",
  Docker: "docker-original",
  Azure: "azure-original",
  AWS: "amazonwebservices-original-wordmark",
  React: "react-original",
  "React Native": "react-original",
  "Next.js": "nextjs-original",
  Angular: "angular-original",
  HTML: "html5-original",
  CSS: "css3-original",
  Vercel: "vercel-original",
  Firebase: "firebase-original",
  Python: "python-original",
  Figma: "figma-original",
  Git: "git-original",
  OpenAPI: "openapi-original",
};

const ICONS: Record<string, LucideIcon> = {
  "REST APIs": Webhook,
  Webhooks: Webhook,
  "CI/CD": GitBranch,
  "AI APIs": Sparkles,
  "Machine Learning": BrainCircuit,
  "Vector search": ScanSearch,
  Automation: Workflow,
  Analytics: BarChart3,
  "Design tokens": Palette,
  Prototyping: MousePointerClick,
  WCAG: Accessibility,
  "Usability testing": Users,
  "Design systems": LayoutGrid,
  "Infrastructure as code": FileCode2,
  Monitoring: Activity,
  "Message queues": ListOrdered,
};

export function techMark(name: string): TechMark {
  const logo = LOGOS[name];
  if (logo) return { logo: `/tech/${logo}.svg` };
  return { icon: ICONS[name] ?? Code2 };
}
