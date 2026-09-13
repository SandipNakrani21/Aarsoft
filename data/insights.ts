/**
 * Sample editorial content. Replace `posts` with real articles — the page
 * derives categories, the featured item and reading time from this array.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  authorRole: string;
  date: string;
  readingTime: number;
  featured?: boolean;
  /** Body paragraphs. Headings start with "## ". */
  body: string[];
};

export type Category =
  | "Technology"
  | "AI"
  | "Software Development"
  | "Business"
  | "UI/UX"
  | "Cloud"
  | "Engineering";

export const categories: Category[] = [
  "Technology",
  "AI",
  "Software Development",
  "Business",
  "UI/UX",
  "Cloud",
  "Engineering",
];

export const posts: Post[] = [
  {
    slug: "choosing-build-versus-buy",
    title: "Build or Buy: The Question Behind the Question",
    excerpt:
      "The decision is rarely about features. It is about which parts of your process are genuinely worth owning.",
    category: "Business",
    author: "Aarsoft Editorial",
    authorRole: "Engineering team",
    date: "2026-08-18",
    readingTime: 7,
    featured: true,
    body: [
      "Every few years a business hits the same fork. The tool that got you here is straining, and someone asks whether to configure a platform or build something of your own.",
      "The feature comparison is the wrong place to start. Platforms win feature lists almost by definition, because they serve a thousand customers and you are one of them.",
      "## Start with what differentiates you",
      "Some of your process is generic. Payroll, accounting and email are solved problems, and building your own would be a poor use of engineering time.",
      "Other parts are the reason customers choose you. If your scheduling logic, your pricing model or your quality process is genuinely different from your competitors, forcing it into a vendor's template flattens the thing that made it valuable.",
      "## Count the cost of the workaround",
      "The honest comparison is not licence cost against build cost. It is licence cost plus configuration plus the permanent tax of every workaround, against build cost plus maintenance.",
      "Workarounds are easy to underestimate because they are paid in small amounts by many people. A five-minute manual step, done forty times a day, is a full-time role.",
      "## A practical test",
      "Ask which parts of the process you would explain with pride to a customer. Those are worth owning. The rest should be bought, configured once, and forgotten about.",
    ],
  },
  {
    slug: "where-to-start-with-ai",
    title: "Where to Actually Start With AI in Your Business",
    excerpt:
      "Most AI pilots stall for the same reason: they started with the technology instead of a process that costs real money.",
    category: "AI",
    author: "Aarsoft Editorial",
    authorRole: "Engineering team",
    date: "2026-07-30",
    readingTime: 6,
    body: [
      "The pattern is familiar. A team runs an AI pilot, the demo impresses everyone, and eighteen months later nothing is in production.",
      "The failure is almost never the model. It is that the pilot was never attached to a process with a measurable cost.",
      "## Pick a workflow you can measure",
      "Find something your team does repeatedly where you can state the current cost in hours or in errors. Invoice matching, first-line support triage, document classification.",
      "If you cannot state the current cost, you will not be able to prove the improvement, and the project will die at the next budget review.",
      "## Ground it in your own data",
      "General knowledge is not your advantage. Your contracts, your tickets and your product documentation are. A system that retrieves from your own sources and cites them is both more useful and easier to trust.",
      "## Keep a human in the loop",
      "Anything with a consequence needs review. That is not a limitation to engineer away. It is what makes the system deployable in a business that carries real risk.",
      "## Measure from day one",
      "Track accuracy against a fixed evaluation set and track running cost per task. Without both numbers you are guessing, and the next investment decision becomes an argument about opinions.",
    ],
  },
  {
    slug: "core-web-vitals-are-an-engineering-problem",
    title: "Core Web Vitals Are an Engineering Problem, Not a Marketing One",
    excerpt:
      "Page speed is decided by architecture. No amount of late-stage optimisation fixes a decision made in week one.",
    category: "Engineering",
    author: "Aarsoft Editorial",
    authorRole: "Engineering team",
    date: "2026-07-11",
    readingTime: 5,
    body: [
      "Performance work usually arrives late, as a ticket with a Lighthouse screenshot attached. By then the expensive decisions have already been made.",
      "## Rendering strategy is the first decision",
      "Whether a page is static, server-rendered or client-rendered determines the floor on how fast it can possibly be. Everything after that is optimisation within a limit you already set.",
      "## Ship less JavaScript",
      "The most reliable performance improvement is code that never reaches the browser. Interactive islands in otherwise static pages remove whole categories of work.",
      "## Reserve space for everything",
      "Layout shift comes from content arriving without a reserved box. Explicit dimensions on images, embeds and dynamic regions eliminate most of it.",
      "## Measure real users",
      "Lab scores are a development tool. Field data from real devices on real networks is what your customers experience, and the two often disagree.",
    ],
  },
  {
    slug: "design-systems-that-survive",
    title: "Design Systems That Survive Contact With Engineering",
    excerpt:
      "A component library only holds if design and engineering share the same source of truth. Most do not.",
    category: "UI/UX",
    author: "Aarsoft Editorial",
    authorRole: "Design team",
    date: "2026-06-24",
    readingTime: 6,
    body: [
      "Design systems fail quietly. Six months after launch, half the screens use components that exist nowhere in the library.",
      "## Tokens before components",
      "Colour, spacing and type scale need to exist as named values used by both the design tool and the code. If a hex value is typed into a component, the system has already started to drift.",
      "## Document the decision, not just the component",
      "A component page that shows props but not when to use it leaves the hardest question unanswered, and that is where inconsistency starts.",
      "## Make the system the easy path",
      "If using the library is slower than building something bespoke, people will build something bespoke. Adoption is a developer-experience problem more than a governance one.",
      "## Accessibility belongs in the component",
      "Focus states, contrast and keyboard behaviour solved once inside the component are solved everywhere. Left to each screen, they are solved nowhere.",
    ],
  },
  {
    slug: "modernising-legacy-without-a-rewrite",
    title: "Modernising a Legacy System Without a Big-Bang Rewrite",
    excerpt:
      "The full rewrite is the most tempting and the most dangerous option. There is a slower path that usually works.",
    category: "Software Development",
    author: "Aarsoft Editorial",
    authorRole: "Engineering team",
    date: "2026-06-05",
    readingTime: 7,
    body: [
      "Every ageing system eventually produces the same proposal: replace it entirely, in one project, over eighteen months.",
      "The appeal is obvious. So is the risk, because the old system keeps running the business while the new one is late.",
      "## Put a boundary in front of it",
      "An interface layer in front of the legacy system lets new work target a modern contract immediately, even while the implementation behind it is unchanged.",
      "## Replace one capability at a time",
      "Move a single bounded capability behind that interface. Run both, compare outputs, then switch traffic. Repeat. Each step is individually reversible.",
      "## Migrate data deliberately",
      "Data migration is its own workstream, not a task at the end. Mapping, cleansing, trial runs and reconciliation deserve the same rigour as the application work.",
      "## Accept a longer timeline",
      "Incremental replacement usually takes longer in total. It also keeps the business running throughout, which is the only comparison that matters.",
    ],
  },
  {
    slug: "cloud-cost-is-an-architecture-decision",
    title: "Cloud Cost Is an Architecture Decision",
    excerpt:
      "Cloud bills grow quietly. By the time finance asks about it, the answer is usually structural.",
    category: "Cloud",
    author: "Aarsoft Editorial",
    authorRole: "Platform team",
    date: "2026-05-19",
    readingTime: 5,
    body: [
      "Cloud spend rarely spikes. It drifts upward, a resource at a time, until it appears on a finance review.",
      "## Attribute everything",
      "Tag by service, environment and team from the beginning. A bill nobody can attribute is a bill nobody can reduce.",
      "## Right-size on evidence",
      "Most over-provisioning is a guess made under deadline pressure and never revisited. Actual utilisation data usually shows significant headroom.",
      "## Watch data transfer",
      "Compute is visible and gets scrutinised. Egress and cross-zone traffic are invisible and frequently larger.",
      "## Turn off what nobody uses",
      "Non-production environments running through nights and weekends are the easiest saving available, and the most commonly missed.",
    ],
  },
  {
    slug: "integration-failures-should-be-loud",
    title: "Your Integrations Should Fail Loudly",
    excerpt:
      "The worst integration failure is the silent one, discovered by a customer three days later.",
    category: "Technology",
    author: "Aarsoft Editorial",
    authorRole: "Engineering team",
    date: "2026-05-02",
    readingTime: 5,
    body: [
      "An overnight job fails at two in the morning. Nothing alerts. At midday a customer asks why their order has not shipped.",
      "## Idempotency first",
      "Operations that can safely run twice make retries trivial. Without that property, every retry strategy carries a risk of duplication.",
      "## Retry with backoff, then stop",
      "Transient failures resolve with a retry. Permanent ones do not, and retrying them forever hides the problem instead of surfacing it.",
      "## Dead-letter everything",
      "Anything unrecoverable goes to a queue a person actually reviews. Messages that vanish are the ones that become customer incidents.",
      "## Alert on impact",
      "Alert when the business outcome fails, not when a server metric moves. The second produces noise, and noise trains people to ignore alerts.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const featuredPost = posts.find((p) => p.featured) ?? posts[0];
