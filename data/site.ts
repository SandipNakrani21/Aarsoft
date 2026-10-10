import type { NavItem } from "@/data/navigation";
export { site } from "@/lib/site-config";
export { mainNav } from "@/data/navigation";
export type { NavItem, NavLink } from "@/data/navigation";

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
