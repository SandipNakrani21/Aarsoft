import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Layers,
  PenTool,
  Smartphone,
  Workflow,
} from "lucide-react";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Short line used on the homepage grid and cards. */
  excerpt: string;
  icon: LucideIcon;
  /** Service page content. */
  hero: {
    eyebrow: string;
    headline: string;
    intro: string;
  };
  problem: { title: string; body: string; points: string[] };
  solution: { title: string; body: string; points: string[] };
  capabilities: { title: string; description: string }[];
  technology: string[];
  benefits: { title: string; description: string }[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    number: "01",
    title: "Custom Software Development",
    excerpt: "Scalable software engineered around unique business requirements.",
    icon: Code2,
    hero: {
      eyebrow: "Custom Software",
      headline: "Software Built Around How Your Business Actually Works.",
      intro:
        "Off-the-shelf tools force your process into someone else's model. We engineer systems that fit the way your teams already operate, then scale with them.",
    },
    problem: {
      title: "The problem",
      body: "Growing companies outgrow their tools. Work moves into spreadsheets, manual handoffs multiply, and nobody trusts the numbers.",
      points: [
        "Critical processes live in spreadsheets and email threads",
        "Disconnected tools create duplicate, conflicting data",
        "Generic platforms need costly workarounds to fit your process",
        "Engineering effort goes to maintenance instead of progress",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We start with the business outcome, map the real workflow, then build the smallest system that solves it properly and can grow.",
      points: [
        "Discovery workshops that surface the real constraints",
        "A domain model your team recognises and can reason about",
        "Modular architecture so features ship without regressions",
        "Automated tests and CI from the first sprint, not the last",
      ],
    },
    capabilities: [
      {
        title: "Product engineering",
        description: "End-to-end delivery from architecture through release and iteration.",
      },
      {
        title: "Legacy modernisation",
        description: "Incremental replacement of ageing systems without a risky big-bang cutover.",
      },
      {
        title: "Platform architecture",
        description: "Service boundaries, data models and integration patterns designed to scale.",
      },
      {
        title: "Quality engineering",
        description: "Automated testing, code review standards and observability built in.",
      },
    ],
    technology: [".NET", "ASP.NET Core", "Node.js", "TypeScript", "PostgreSQL", "SQL Server", "Docker", "Azure"],
    benefits: [
      { title: "Fits your process", description: "The software adapts to your business, not the reverse." },
      { title: "Lower long-term cost", description: "Clean architecture keeps the cost of change flat as you grow." },
      { title: "You own it", description: "Full source code, documentation and handover. No lock-in." },
      { title: "Built to scale", description: "Designed for the load and team size you expect in three years." },
    ],
    faqs: [
      {
        question: "How long does a custom build usually take?",
        answer:
          "It depends on scope. A focused internal tool can reach production in 6 to 10 weeks. A full platform is typically a phased programme, with a usable first release early and capability added in increments.",
      },
      {
        question: "Can you work with our in-house engineers?",
        answer:
          "Yes. We regularly work as an embedded part of an existing team, sharing the same repository, review process and delivery cadence.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. Source code, infrastructure definitions and documentation are yours, delivered in your own repositories and cloud accounts.",
      },
    ],
  },
  {
    slug: "web-development",
    number: "02",
    title: "Web Development",
    excerpt: "High-performance websites and web applications.",
    icon: Layers,
    hero: {
      eyebrow: "Web Development",
      headline: "Web Experiences That Load Fast and Convert Better.",
      intro:
        "Performance, accessibility and search visibility are engineering decisions. We treat them that way from the first commit.",
    },
    problem: {
      title: "The problem",
      body: "Most business websites are slow, hard to update and invisible to search. Every one of those costs revenue.",
      points: [
        "Slow pages lose visitors before content renders",
        "Content changes require a developer and a deployment",
        "Poor semantics limit search visibility and accessibility",
        "Design breaks down on the devices customers actually use",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We build on modern rendering models, ship only the JavaScript a page needs, and give your team a clear way to manage content.",
      points: [
        "Server rendering and static generation for fast first paint",
        "A component system that keeps every page consistent",
        "Structured data and clean URLs designed for search",
        "Accessible markup validated against WCAG guidance",
      ],
    },
    capabilities: [
      { title: "Marketing websites", description: "Brand-led sites engineered for speed and conversion." },
      { title: "Web applications", description: "Complex, stateful products that stay fast as they grow." },
      { title: "Headless CMS", description: "Content modelling and editor workflows your marketing team can own." },
      { title: "Performance work", description: "Core Web Vitals audits and remediation on existing sites." },
    ],
    technology: ["React", "Next.js", "Angular", "TypeScript", "HTML", "CSS", "REST APIs", "Vercel"],
    benefits: [
      { title: "Faster pages", description: "Measured against Core Web Vitals, not opinion." },
      { title: "Found in search", description: "Semantic structure and metadata built in from the start." },
      { title: "Easy to update", description: "Your team edits content without a release cycle." },
      { title: "Works everywhere", description: "Tested across the full range of real devices." },
    ],
    faqs: [
      {
        question: "Do you redesign existing sites or only build new ones?",
        answer:
          "Both. We often start with an audit of the current site, keep what performs, and rebuild the rest on a modern foundation.",
      },
      {
        question: "Can our marketing team edit content?",
        answer:
          "Yes. We model content so that editors control copy, images and page composition without touching code.",
      },
      {
        question: "How do you handle SEO?",
        answer:
          "Through engineering: semantic headings, clean URLs, metadata, structured data, image optimisation and fast rendering. We do not do keyword stuffing.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    number: "03",
    title: "Mobile App Development",
    excerpt: "Modern iOS and Android experiences.",
    icon: Smartphone,
    hero: {
      eyebrow: "Mobile Apps",
      headline: "Mobile Products People Keep on Their Home Screen.",
      intro:
        "A good mobile app respects the platform, works offline, and does one job exceptionally well. We build for that standard.",
    },
    problem: {
      title: "The problem",
      body: "Many business apps are a website in a shell. They feel slow, ignore platform conventions, and get deleted.",
      points: [
        "Interfaces that ignore iOS and Android conventions",
        "No offline support for users in the field",
        "Release processes that make updates painful",
        "No visibility into crashes or real-world usage",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We design per platform, build on a shared core where it makes sense, and automate the release pipeline from day one.",
      points: [
        "Native-feeling navigation, gestures and typography",
        "Offline-first data sync for unreliable connections",
        "Automated builds and store submission",
        "Crash reporting and analytics wired in before launch",
      ],
    },
    capabilities: [
      { title: "Cross-platform apps", description: "One codebase, genuinely native behaviour on both platforms." },
      { title: "Backend and sync", description: "APIs, offline caching and conflict resolution designed together." },
      { title: "Store release", description: "Submission, review handling and staged rollouts managed for you." },
      { title: "Ongoing iteration", description: "Release trains that ship improvements on a predictable cadence." },
    ],
    technology: ["React Native", "TypeScript", "REST APIs", "Node.js", "Azure", "Firebase", "CI/CD"],
    benefits: [
      { title: "Feels native", description: "Respects the conventions of each platform." },
      { title: "Works offline", description: "Useful even when the connection is not." },
      { title: "Ships reliably", description: "Automated pipelines remove release-day risk." },
      { title: "Measurable", description: "Usage and stability data from the first release." },
    ],
    faqs: [
      {
        question: "Native or cross-platform?",
        answer:
          "We recommend based on the product. Most business apps are well served by a cross-platform core with platform-specific interface work. Hardware-intensive apps may justify fully native.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer: "Yes, including store listings, review responses and phased rollouts.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We monitor crash rates and usage, then work through a prioritised backlog on an agreed release cadence.",
      },
    ],
  },
  {
    slug: "ai-and-automation",
    number: "04",
    title: "AI & Automation",
    excerpt: "AI-powered workflows, intelligent automation and data-driven products.",
    icon: Cpu,
    hero: {
      eyebrow: "AI & Automation",
      headline: "Apply AI Where It Changes the Business Number.",
      intro:
        "The value of AI is not the model. It is the workflow you can remove, the answer you can get in seconds, and the decision you can make with confidence.",
    },
    problem: {
      title: "The problem",
      body: "AI pilots stall because they start with the technology instead of a process that costs real time or money.",
      points: [
        "Teams spend hours on repetitive, rules-based work",
        "Useful information is trapped in documents and tickets",
        "Pilots never connect to the systems staff actually use",
        "No measurement, so nobody can justify the next step",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We pick one workflow with a measurable cost, build the smallest useful version, and prove the result before expanding.",
      points: [
        "Workflow analysis to find the highest-value target",
        "Retrieval over your own documents and data",
        "Human review built into every consequential step",
        "Evaluation and cost tracking from the first release",
      ],
    },
    capabilities: [
      { title: "Intelligent assistants", description: "Assistants grounded in your own content, not general knowledge." },
      { title: "Document processing", description: "Extraction and classification for invoices, contracts and forms." },
      { title: "Workflow automation", description: "Rules and models combined to remove manual handoffs." },
      { title: "Analytics and prediction", description: "Forecasting and anomaly detection on your operational data." },
    ],
    technology: ["AI APIs", "Machine Learning", "Python", "Node.js", "PostgreSQL", "Vector search", "Automation", "Analytics"],
    benefits: [
      { title: "Time returned", description: "Hours of repetitive work removed every week." },
      { title: "Answers in seconds", description: "Institutional knowledge becomes searchable." },
      { title: "Kept accountable", description: "Human review on anything that carries risk." },
      { title: "Measured", description: "Accuracy and running cost tracked from day one." },
    ],
    faqs: [
      {
        question: "Where should we start with AI?",
        answer:
          "With a single workflow where you can measure the current cost in hours or errors. That gives a clear before-and-after and makes the next investment easy to justify.",
      },
      {
        question: "What happens to our data?",
        answer:
          "We design for your data governance requirements, including where data is stored, what is retained and whether it may be used for training. Those decisions are yours.",
      },
      {
        question: "How do you stop the system from being wrong?",
        answer:
          "Grounding in your own sources, citations on answers, evaluation sets, confidence thresholds, and human review on any consequential action.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    number: "05",
    title: "UI/UX Design",
    excerpt: "Research-driven interfaces designed for usability and conversion.",
    icon: PenTool,
    hero: {
      eyebrow: "UI/UX Design",
      headline: "Interfaces That Make Complex Work Feel Simple.",
      intro:
        "Good design is not decoration. It is the difference between a tool people avoid and one they rely on every day.",
    },
    problem: {
      title: "The problem",
      body: "Complex products accumulate screens. Without a system, every new feature makes the last one harder to find.",
      points: [
        "Users need training to complete routine tasks",
        "Each screen solves its problem in a different way",
        "Designs are handed over as pictures, then reinterpreted in code",
        "Accessibility is treated as a late-stage fix",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We research the real task, design the system rather than the screen, and hand over something engineers can build exactly.",
      points: [
        "User interviews and task analysis before any visual work",
        "Prototypes tested with real users, early",
        "A component library shared by design and engineering",
        "Contrast, focus and keyboard behaviour specified, not assumed",
      ],
    },
    capabilities: [
      { title: "Product design", description: "End-to-end design for complex, data-heavy applications." },
      { title: "Design systems", description: "Tokens, components and documentation that keep products consistent." },
      { title: "User research", description: "Interviews, usability testing and task analysis." },
      { title: "Accessibility review", description: "WCAG audits with prioritised, practical remediation." },
    ],
    technology: ["Figma", "Design tokens", "Prototyping", "WCAG", "Usability testing", "Design systems"],
    benefits: [
      { title: "Less training", description: "Interfaces people understand without a manual." },
      { title: "Consistent", description: "One system across every screen and platform." },
      { title: "Buildable", description: "Handover that engineers can implement precisely." },
      { title: "Accessible", description: "Usable by keyboard, screen reader and low vision users." },
    ],
    faqs: [
      {
        question: "Do you design without building?",
        answer:
          "Yes. Design is available as a standalone engagement, delivered with a component library and specifications your own team can build from.",
      },
      {
        question: "How much research is involved?",
        answer:
          "Enough to de-risk the decisions that matter. For most projects that means a focused round of interviews and one or two usability tests per major flow.",
      },
      {
        question: "Can you work with our existing brand?",
        answer:
          "Yes. We extend an existing brand into a product design system rather than replacing it.",
      },
    ],
  },
  {
    slug: "cloud-and-devops",
    number: "06",
    title: "Cloud & DevOps",
    excerpt: "Secure, scalable cloud infrastructure and deployment pipelines.",
    icon: Cloud,
    hero: {
      eyebrow: "Cloud & DevOps",
      headline: "Infrastructure That Stays Boring Under Pressure.",
      intro:
        "Releases should be uneventful. We build the pipelines, environments and monitoring that make deployment a non-event.",
    },
    problem: {
      title: "The problem",
      body: "Manual deployments and unclear environments turn every release into an incident waiting to happen.",
      points: [
        "Releases are manual, slow and scheduled for late evenings",
        "Environments drift, so it works in staging and fails in production",
        "Cloud spend grows without anyone able to explain it",
        "Problems are reported by customers before monitoring catches them",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We define infrastructure as code, automate the path to production, and instrument the system so you see problems first.",
      points: [
        "Reproducible environments defined in version control",
        "Automated build, test and deployment pipelines",
        "Logging, metrics and alerting tied to real user impact",
        "Cost visibility and right-sizing as a routine practice",
      ],
    },
    capabilities: [
      { title: "Cloud architecture", description: "Environment design, networking and security on Azure or AWS." },
      { title: "CI/CD pipelines", description: "Automated delivery from commit to production." },
      { title: "Containers", description: "Docker and orchestration for consistent, portable workloads." },
      { title: "Observability", description: "Logging, tracing and alerting that surface issues early." },
    ],
    technology: ["Azure", "AWS", "Docker", "Git", "CI/CD", "Infrastructure as code", "Monitoring"],
    benefits: [
      { title: "Ship more often", description: "Deployment becomes routine instead of an event." },
      { title: "Fewer incidents", description: "Consistent environments remove a whole class of failure." },
      { title: "Recover faster", description: "Automated rollback and clear runbooks." },
      { title: "Controlled cost", description: "Spend that is visible, attributed and reviewed." },
    ],
    faqs: [
      {
        question: "Azure or AWS?",
        answer:
          "Either. We recommend based on your existing estate, team skills and commercial agreements rather than a default preference.",
      },
      {
        question: "Can you improve an existing setup?",
        answer:
          "Yes. Most engagements start with an audit of the current pipeline and environments, then prioritised improvements.",
      },
      {
        question: "Do you provide ongoing support?",
        answer:
          "Yes, under an agreed support arrangement with defined response expectations.",
      },
    ],
  },
  {
    slug: "erp-and-crm",
    number: "07",
    title: "ERP & CRM",
    excerpt: "Business platforms that connect teams, customers and operations.",
    icon: Boxes,
    hero: {
      eyebrow: "ERP & CRM",
      headline: "One System of Record Your Whole Company Trusts.",
      intro:
        "When sales, operations and finance each keep their own version of the truth, decisions slow down. We connect them.",
    },
    problem: {
      title: "The problem",
      body: "Departments adopt their own tools. The data diverges, reconciliation becomes a job, and reporting becomes an argument.",
      points: [
        "The same customer exists three times, with three addresses",
        "Month-end reporting depends on manual reconciliation",
        "Teams cannot see status outside their own department",
        "Generic platforms require expensive customisation to fit",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We model the business properly, migrate data carefully, and roll out in stages so operations never stop.",
      points: [
        "A shared domain model agreed across departments",
        "Data migration with validation and reconciliation",
        "Role-based access that reflects real responsibilities",
        "Phased rollout with training and parallel running",
      ],
    },
    capabilities: [
      { title: "Custom ERP", description: "Inventory, procurement, production and finance modules built to fit." },
      { title: "Custom CRM", description: "Pipeline, activity and account management around your sales process." },
      { title: "Data migration", description: "Cleansing, mapping and validated cutover from legacy systems." },
      { title: "Reporting", description: "Operational dashboards built on a single source of truth." },
    ],
    technology: [".NET", "ASP.NET Core", "SQL Server", "PostgreSQL", "React", "Angular", "REST APIs", "Azure"],
    benefits: [
      { title: "One source of truth", description: "Every team works from the same record." },
      { title: "Faster close", description: "Reporting that does not depend on spreadsheets." },
      { title: "Fits your process", description: "Built around how you work, not a vendor's template." },
      { title: "Safe rollout", description: "Staged migration with a tested fallback." },
    ],
    faqs: [
      {
        question: "Build custom or configure an existing platform?",
        answer:
          "We assess honestly. If a configured platform covers most of your needs, that is usually the better commercial decision. Custom makes sense when your process is a genuine differentiator.",
      },
      {
        question: "How risky is data migration?",
        answer:
          "It is the highest-risk part, so we treat it as its own workstream: mapping, cleansing, repeated trial migrations and reconciliation before any cutover.",
      },
      {
        question: "Will it integrate with our accounting system?",
        answer:
          "Yes. Integration with finance, payroll and other existing systems is part of the design rather than an afterthought.",
      },
    ],
  },
  {
    slug: "api-and-system-integration",
    number: "08",
    title: "API & System Integration",
    excerpt: "Reliable integrations connecting modern and legacy systems.",
    icon: Workflow,
    hero: {
      eyebrow: "Integration",
      headline: "Make Your Systems Talk to Each Other. Reliably.",
      intro:
        "Most operational pain is not inside a system. It is in the gap between two of them, currently bridged by a person and a spreadsheet.",
    },
    problem: {
      title: "The problem",
      body: "Point-to-point integrations accumulate quietly until nobody can change anything without breaking something else.",
      points: [
        "Staff re-key the same data into two systems",
        "Overnight jobs fail silently and are noticed at midday",
        "Legacy systems have no modern interface",
        "No single view of what integrates with what",
      ],
    },
    solution: {
      title: "How we approach it",
      body: "We map the data flows, design contracts that can evolve, and build in retries, monitoring and clear failure handling.",
      points: [
        "Versioned API contracts documented for consumers",
        "Idempotent operations and automatic retry with backoff",
        "Dead-letter handling so nothing disappears silently",
        "Monitoring and alerting on every integration path",
      ],
    },
    capabilities: [
      { title: "API design", description: "REST APIs designed to be versioned, documented and consumed." },
      { title: "Legacy bridging", description: "Modern interfaces in front of systems you cannot replace yet." },
      { title: "Third-party integration", description: "Payment, logistics, messaging and accounting providers." },
      { title: "Event pipelines", description: "Queues and event-driven flows that decouple your systems." },
    ],
    technology: ["REST APIs", "Node.js", ".NET", "Webhooks", "Message queues", "Azure", "Docker", "OpenAPI"],
    benefits: [
      { title: "No re-keying", description: "Data moves automatically between systems." },
      { title: "Fails loudly", description: "Problems alert your team, not your customers." },
      { title: "Safe to change", description: "Versioned contracts let systems evolve independently." },
      { title: "Visible", description: "Documented flows anyone on the team can follow." },
    ],
    faqs: [
      {
        question: "Our legacy system has no API. Is it still possible?",
        answer:
          "Usually yes. Depending on the system we can work through its database, file exchange, or a service layer built in front of it.",
      },
      {
        question: "How do you handle failures?",
        answer:
          "Idempotent operations, automatic retry with backoff, dead-letter queues for anything unrecoverable, and alerting so your team knows before your customers do.",
      },
      {
        question: "Do you document the integrations?",
        answer:
          "Yes. Contracts, flow diagrams and runbooks are part of delivery, not an optional extra.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
