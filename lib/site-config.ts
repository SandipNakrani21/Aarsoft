function profile(label: string, href: string | undefined, icon: string) {
  if (!href) return [];
  try {
    const url = new URL(href);
    return url.protocol === "https:" && url.pathname !== "/" ? [{ label, href: url.href, icon }] : [];
  } catch { return []; }
}

const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 78787 82189";
const phoneHref = contactPhone.replace(/[^+0-9]/g, "");
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? `https://wa.me/${phoneHref.replace(/\D/g, "")}`;

export const site = {
  name: "Aarsoft Technologies",
  shortName: "Aarsoft",
  tagline: "Innovating Tomorrow, Delivering Today",
  positioning: "Digital Engineering & Product Development Partner",
  description:
    "Aarsoft helps startups, businesses and agencies turn ideas and complex business requirements into scalable digital products, powerful business applications and intuitive user experiences.",
  /* Resolved at build time in next.config.mjs; see the note there. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  locale: "en_US",

  /*
   * Hero background video. Leave empty to run on the animated backdrop
   * alone; set it to "/hero-background.mp4" once the file is in `public/`.
   * Keeping it empty avoids a 404 on every page load.
   */
  heroVideo: "",

  /* Verified company facts. */
  founded: 2014,
  headquarters: "Surat, India",
  countriesServed: 9,
  globalLocations: 5,
  internationalTeams: ["Canada", "United Kingdom", "Germany"],

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sandipnakrani21@gmail.com",
    careersEmail: process.env.NEXT_PUBLIC_CAREERS_EMAIL ?? "sandipnakrani21@gmail.com",
    phone: contactPhone,
    /* Digits only, for the tel: link. */
    phoneHref,
    whatsappUrl,
    location: "2001–2002, IT Park, Surat",
    workingHours: "09:00 AM – 05:00 PM IST",
  },

  social: [
    ...profile("LinkedIn", process.env.NEXT_PUBLIC_LINKEDIN_URL, "linkedin"),
    ...profile("Instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL, "instagram"),
    ...profile("Facebook", process.env.NEXT_PUBLIC_FACEBOOK_URL, "facebook"),
    ...profile("WhatsApp", whatsappUrl, "whatsapp"),
    ...profile("Twitter", process.env.NEXT_PUBLIC_TWITTER_URL, "twitter"),
  ],
} as const;
