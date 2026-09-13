import { site } from "@/data/site";
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
      `This policy explains how ${site.name} handles information collected through this website. It is a general-purpose template and should be reviewed by a qualified adviser before you rely on it.`,
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "When you submit the contact form we collect the details you provide: your name, work email, company, phone number, the service you are interested in, an optional budget range, and your project description.",
      "We also collect basic technical information that your browser sends automatically, such as the pages you visit and the approximate region you are in.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Enquiry details are used only to respond to your enquiry and to discuss potential work. Technical information is used to understand how the site is used and to improve it.",
      "We do not sell your information, and we do not share it with third parties for their own marketing.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiry records are kept for as long as needed to respond and to maintain a record of the conversation, then removed on a routine schedule.",
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
      "This site is built to work without advertising or tracking cookies. If analytics are added later, this policy will be updated to say what is collected and how to opt out.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this policy can be sent to ${site.contact.email}. This address is a placeholder until confirmed.`,
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
