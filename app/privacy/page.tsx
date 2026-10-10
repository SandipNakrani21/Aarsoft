import { site } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { LegalDocument } from "@/components/sections/LegalDocument";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Aarsoft Technologies collects, uses and protects the information you share through this website.",
  path: "/privacy",
});

const sections = [
  {
    heading: "What this policy covers",
    body: [
      `This policy explains how ${site.name} handles information collected through this website. This page describes the currently implemented website; provider and retention details must be reviewed before online submission is enabled.`,
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "The contact form prepares a draft in your own email app. If you choose to send it, the message includes: your name, work email, company, phone number, the service you are interested in, an optional budget range, and your project description.",
      "The hosting provider may process technical request data to operate and secure the site. No optional analytics or advertising tracker is currently installed.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Enquiry details sent by email are used to respond and discuss potential work. Your email and hosting providers process information needed to deliver messages and operate this website.",
      "We do not sell your information, and we do not share it with third parties for their own marketing.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Messages you send remain in the receiving email system. Contact us about retention or deletion; a formal retention schedule must be confirmed by the business.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask what information we hold about you, ask for it to be corrected, or ask for it to be deleted. Contact us and we will action the request.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This site currently uses no optional analytics or advertising cookies. Necessary browser state may support interface behavior. Optional tracking will require an updated policy and preference controls before activation.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this policy can be sent to ${site.contact.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        lines={["Privacy", "Policy."]}
        description="How we handle the information you share with us through this website."
        breadcrumb={[{ name: "Privacy Policy", href: "/privacy" }]}
      />

      <Section compact className="pt-0">
        <div className="container-x">
          <LegalDocument sections={sections} />
        </div>
      </Section>
    </>
  );
}
