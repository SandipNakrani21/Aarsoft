/**
 * Central site configuration.
 * Company facts here match the Aarsoft reference site. Replace the
 * placeholder contact details once the real ones are confirmed — every page
 * reads from this single source.
 */

import type { LucideIcon } from "lucide-react";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/company";
import { slugify } from "@/lib/utils";

export const site = {
  name: "Aarsoft Technologies",
  shortName: "Aarsoft",
  tagline: "Innovating Tomorrow, Delivering Today",
  positioning: "Digital Engineering & Product Development Partner",
  description:
    "Aarsoft helps startups, businesses and agencies turn ideas and complex business requirements into scalable digital products, powerful business applications and intuitive user experiences.",
  /* Resolved at build time in next.config.mjs; see the note there. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",

  /*
   * Hero background video. Leave empty to run on the animated backdrop
   * alone; set it to "/hero-background.mp4" once the file is in `public/`.
   * Keeping it empty avoids a 404 on every page load.
   */
  heroVideo: "",

  /* Verified company facts. */
  founded: 2014,
  headquarters: "Ahmedabad, India",
  countriesServed: 9,
  globalLocations: 5,
  internationalTeams: ["Canada", "United Kingdom", "Germany"],

  contact: {
    email: "contactus@aarsoft.com",
    careersEmail: "careers@aarsoft.com",
    phone: "+91 78787 82189",
    /* Digits only, for the tel: link. */
    phoneHref: "+917878782189",
    location: "Ahmedabad, India — working with clients across 9 countries",
    responseTime: "We reply to project enquiries within 1 business day",
  },

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { label: "WhatsApp", href: "https://wa.me/917878782189", icon: "whatsapp" },
    { label: "Twitter", href: "https://twitter.com/", icon: "twitter" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavLink = NavItem & {
  /** Present on items that open a mega menu. */
  menu?: {
    /** One line shown beside the sub-links, explaining the group. */
    intro: string;
    items: (NavItem & { icon: LucideIcon })[];
  };
};

export const mainNav: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    menu: {
      intro: "Engineering, design and cloud capabilities, from first idea to production.",
      items: services.map((s) => ({
        label: s.title,
        href: `/services/${s.slug}`,
        description: s.excerpt,
        icon: s.icon,
      })),
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    menu: {
      intro: "Platforms built around a business outcome, not a technology.",
      items: solutions.map((s) => ({
        label: s.title,
        href: `/solutions#${slugify(s.title)}`,
        description: s.outcomes.slice(0, 2).join(" · "),
        icon: s.icon,
      })),
    },
  },
  {
    label: "Industries",
    href: "/industries",
    menu: {
      intro: "Sector knowledge that shapes the data model, the compliance and the rollout.",
      items: industries.map((i) => ({
        label: i.name,
        href: `/industries#${slugify(i.name)}`,
        description: i.description,
        icon: i.icon,
      })),
    },
  },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Software Development", href: "/services/custom-software-development" },
      { label: "AI Solutions", href: "/services/ai-and-automation" },
      { label: "Cloud", href: "/services/cloud-and-devops" },
      { label: "ERP & CRM", href: "/services/erp-and-crm" },
      { label: "UI/UX", href: "/services/ui-ux-design" },
    ],
  },
  {
    /* The sectors from the industries data; each points at that page. */
    title: "Industries",
    links: [
      { label: "Manufacturing", href: "/industries" },
      { label: "Travel & Hospitality", href: "/industries" },
      { label: "Healthcare", href: "/industries" },
      { label: "E-commerce", href: "/industries" },
      { label: "Logistics", href: "/industries" },
      { label: "Care Services", href: "/industries" },
    ],
  },
  {
    /* Headline picks from the stack; each points at the homepage section. */
    title: "Technologies",
    links: [
      { label: "React & Angular", href: "/#technology" },
      { label: ".NET & Node.js", href: "/#technology" },
      { label: "SQL Databases", href: "/#technology" },
      { label: "Azure & AWS", href: "/#technology" },
      { label: "Docker & CI/CD", href: "/#technology" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
