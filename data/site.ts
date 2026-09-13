/**
 * Central site configuration.
 * Company facts here match the Aarsoft reference site. Replace the
 * placeholder contact details once the real ones are confirmed — every page
 * reads from this single source.
 */

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

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
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
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
