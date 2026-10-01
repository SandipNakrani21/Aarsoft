import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Building,
  CloudCog,
  PenTool,
  Database,
  MonitorSmartphone,
  Server,
  Compass,
  Cog,
  Rocket,
  Eye,
  Factory,
  GitBranch,
  Globe2,
  HeartHandshake,
  Layers3,
  Lightbulb,
  Package,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Truck,
  Users2,
  Wrench,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Industries — the sectors Aarsoft actually builds for                */
/* ------------------------------------------------------------------ */

export type Industry = {
  name: string;
  icon: LucideIcon;
  description: string;
};

export const industries: Industry[] = [
  {
    name: "Manufacturing",
    icon: Factory,
    description:
      "Operational workflows, inventory and production coordination brought into one system.",
  },
  {
    name: "Travel & Hospitality",
    icon: Plane,
    description:
      "Booking, itinerary and guest workflows built for seamless customer journeys.",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description:
      "Scheduling, patient management and reporting designed around complex care workflows.",
  },
  {
    name: "E-commerce",
    icon: Package,
    description:
      "Product, orders, inventory and payments connected across the customer experience.",
  },
  {
    name: "Logistics",
    icon: Truck,
    description:
      "Real-time tracking and operational visibility across shipments and fleets.",
  },
  {
    name: "Care Services",
    icon: HeartHandshake,
    description:
      "Shift scheduling, attendance and coordination for care teams in the field.",
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  number: string;
  title: string;
  /** Drawn inside the step badge in the process section. */
  icon: LucideIcon;
  description: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    icon: Compass,
    description: "Understand the business, users and objectives.",
    detail:
      "Workshops with the people who do the work. We map the current process, the constraints and the outcome that actually matters.",
  },
  {
    number: "02",
    title: "Define",
    icon: Lightbulb,
    description: "Create the product strategy and technical direction.",
    detail:
      "Scope, architecture and delivery plan, written down. You approve what gets built before anyone writes code.",
  },
  {
    number: "03",
    title: "Design",
    icon: PenTool,
    description: "Build the UX, UI and interaction system.",
    detail:
      "Prototypes tested with real users, then a component system that keeps every screen consistent and buildable.",
  },
  {
    number: "04",
    title: "Develop",
    icon: Cog,
    description: "Engineer the product using modern technologies.",
    detail:
      "Agile delivery in short increments with working software at the end of each one, backed by automated testing.",
  },
  {
    number: "05",
    title: "Launch & Scale",
    icon: Rocket,
    description: "Deploy, monitor, improve and scale.",
    detail:
      "Staged rollout, monitoring wired in, and continued support as the product and the business grow.",
  },
];

/* ------------------------------------------------------------------ */
/* Why businesses choose Aarsoft                                       */
/* ------------------------------------------------------------------ */

export type Differentiator = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const differentiators: Differentiator[] = [
  {
    title: "Long-Term Engineering Experience",
    icon: Compass,
    description:
      "Over a decade of building software for real businesses, since 2014.",
  },
  {
    title: "Complex Software Capability",
    icon: Layers3,
    description:
      "Comfortable with intricate workflows, deep integrations and systems that have to scale.",
  },
  {
    title: "End-to-End Development",
    icon: Wrench,
    description:
      "From product thinking and design through build, launch and ongoing support.",
  },
  {
    title: "International & Indian Client Experience",
    icon: Globe2,
    description:
      "Delivering across time zones for global and local teams, in 9 countries.",
  },
  {
    title: "Flexible Engagement Models",
    icon: Users2,
    description:
      "Project delivery, dedicated teams or a long-term engineering partnership.",
  },
  {
    title: "Quality-Focused Engineering",
    icon: ShieldCheck,
    description:
      "Agile delivery with a strong focus on maintainable, well-tested code.",
  },
];

/* ------------------------------------------------------------------ */
/* Values                                                              */
/* ------------------------------------------------------------------ */

export const values: { title: string; icon: LucideIcon; description: string }[] = [
  {
    title: "Ownership",
    icon: Target,
    description:
      "We take responsibility for outcomes, not just for the tickets we were assigned.",
  },
  {
    title: "Transparency",
    icon: Eye,
    description:
      "Clear scope, clear status, clear cost. You hear about a problem from us first.",
  },
  {
    title: "Quality",
    icon: Sparkles,
    description:
      "Quality lives in the details nobody sees: the tests, the naming, the error handling.",
  },
  {
    title: "Partnership",
    icon: HeartHandshake,
    description:
      "Most of our work comes from clients returning. That shapes how we build the first release.",
  },
  {
    title: "Continuous Improvement",
    icon: Lightbulb,
    description:
      "Every project ends with a retrospective, and those lessons go into the next one.",
  },
  {
    title: "Trust",
    icon: Building,
    description:
      "Software people adopt and rely on daily, because it was built to be understood.",
  },
];

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/*                                                                     */
/* Company-supplied figures. These are published claims, so keep them   */
/* in step with whatever the business states elsewhere.                 */
/* ------------------------------------------------------------------ */

export type Stat = {
  value: string;
  /** Numeric portion for the count-up animation, when one exists. */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "278+", countTo: 278, suffix: "+", label: "Happy Clients" },
  { value: "860+", countTo: 860, suffix: "+", label: "Projects Delivered" },
  { value: "50+", countTo: 50, suffix: "+", label: "Members" },
  { value: "12+", countTo: 12, suffix: "+", label: "Years of Experience" },
];

/* ------------------------------------------------------------------ */
/* Technology stack                                                    */
/* ------------------------------------------------------------------ */

/**
 * A single technology. Named products carry their official logo from
 * `public/tech`; practices with no brand mark (CI/CD, REST APIs) carry a
 * line icon instead.
 */
export type TechItem = {
  name: string;
  logo?: string;
  icon?: LucideIcon;
};

export type TechGroup = {
  category: string;
  icon: LucideIcon;
  /** One line on what this layer is responsible for. */
  summary: string;
  items: TechItem[];
};

export const techStack: TechGroup[] = [
  {
    category: "Frontend",
    icon: MonitorSmartphone,
    summary: "Interfaces that stay fast and accessible as the product grows.",
    items: [
      { name: "React", logo: "/tech/react-original.svg" },
      { name: "Angular", logo: "/tech/angular-original.svg" },
      { name: "TypeScript", logo: "/tech/typescript-original.svg" },
      { name: "HTML", logo: "/tech/html5-original.svg" },
      { name: "CSS", logo: "/tech/css3-original.svg" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    summary: "Services and APIs built to carry real business logic safely.",
    items: [
      { name: ".NET", logo: "/tech/dot-net-original.svg" },
      { name: "ASP.NET Core", logo: "/tech/dotnetcore-original.svg" },
      { name: "Node.js", logo: "/tech/nodejs-original.svg" },
      { name: "Java", logo: "/tech/java-original.svg" },
      { name: "PHP", logo: "/tech/php-original.svg" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    summary: "Data models that stay correct and quick at volume.",
    items: [
      { name: "PostgreSQL", logo: "/tech/postgresql-original.svg" },
      { name: "SQL Server", logo: "/tech/microsoftsqlserver-original.svg" },
      { name: "MySQL", logo: "/tech/mysql-original.svg" },
      { name: "MongoDB", logo: "/tech/mongodb-original.svg" },
      { name: "Redis", logo: "/tech/redis-original.svg" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: CloudCog,
    summary: "Environments and pipelines that make releases uneventful.",
    items: [
      { name: "Azure", logo: "/tech/azure-original.svg" },
      { name: "AWS", logo: "/tech/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", logo: "/tech/docker-original.svg" },
      { name: "GitHub", logo: "/tech/github-original.svg" },
      { name: "Cypress", logo: "/tech/cypressio-original.svg" },
    ],
  },
  {
    category: "AI & Data",
    icon: BrainCircuit,
    summary: "Automation and insight grounded in your own operational data.",
    items: [
      { name: "Python", logo: "/tech/python-original.svg" },
      { name: "TensorFlow", logo: "/tech/tensorflow-original.svg" },
      { name: "PyTorch", logo: "/tech/pytorch-original.svg" },
      { name: "Pandas", logo: "/tech/pandas-original.svg" },
      { name: "Claude", logo: "/tech/claude.svg" },
      { name: "ChatGPT", logo: "/tech/openai.svg" },
      { name: "Copilot", logo: "/tech/githubcopilot.svg" },
    ],
  },
  {
    category: "UI/UX Design & QA",
    icon: PenTool,
    summary: "Interfaces designed around real users, and tested before every release.",
    items: [
      { name: "Figma", logo: "/tech/figma-original.svg" },
      { name: "Adobe XD", logo: "/tech/xd-original.svg" },
      { name: "Selenium", logo: "/tech/selenium-original.svg" },
      { name: "Playwright", logo: "/tech/playwright-original.svg" },
      { name: "Postman", logo: "/tech/postman-original.svg" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/*                                                                     */
/* IMPORTANT: these are representative quotes written to show the tone  */
/* and shape of a real testimonial. They are NOT verified endorsements. */
/* Replace each entry with an approved quote and attribution before the */
/* site goes live, or set this array to [] to hide the section.         */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Sector rather than a company name, since clients are not disclosed. */
  company: string;
  /** Initials used for the avatar. */
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our production, stock and finance numbers finally agree. Month-end went from a week of reconciliation to a report we actually trust.",
    name: "Rajesh Mehta",
    role: "Operations Director",
    company: "Manufacturing client",
    initials: "RM",
  },
  {
    quote:
      "They asked better questions than we did. What shipped solved the problem behind the brief, not just the brief.",
    name: "Sarah Whitfield",
    role: "Head of Digital",
    company: "Travel & hospitality client",
    initials: "SW",
  },
  {
    quote:
      "Dispatch, drivers and the warehouse see the same shipment status now. We stopped finding out about delays from the customer.",
    name: "Daniel Okafor",
    role: "Logistics Manager",
    company: "Logistics client",
    initials: "DO",
  },
];

/* ------------------------------------------------------------------ */
/* Trust strip — technologies we work with, not client or partner claims */
/* ------------------------------------------------------------------ */

export const trustLabels: TechItem[] = [
  { name: "React", logo: "/tech/react-original.svg" },
  { name: "Angular", logo: "/tech/angular-original.svg" },
  { name: ".NET", logo: "/tech/dot-net-original.svg" },
  { name: "ASP.NET Core", logo: "/tech/dotnetcore-original.svg" },
  { name: "Node.js", logo: "/tech/nodejs-original.svg" },
  { name: "PostgreSQL", logo: "/tech/postgresql-original.svg" },
  { name: "SQL Server", logo: "/tech/microsoftsqlserver-original.svg" },
  { name: "Azure", logo: "/tech/azure-original.svg" },
  { name: "AWS", logo: "/tech/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", logo: "/tech/docker-original.svg" },
  { name: "TypeScript", logo: "/tech/typescript-original.svg" },
  // A practice rather than a product, so it takes a line icon instead of a logo.
  { name: "CI/CD", icon: GitBranch },
];
