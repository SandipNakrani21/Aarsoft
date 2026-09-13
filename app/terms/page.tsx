import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { LegalDocument } from "@/components/sections/LegalDocument";

export const metadata = buildMetadata({
  title: "Terms",
  description:
    "The terms that apply to your use of the Aarsoft Technologies website and the content published on it.",
  path: "/terms",
});

const sections = [
  {
    heading: "Using this website",
    body: [
      `By using this website you accept these terms. They apply to the site itself and not to any separate agreement for services, which is governed by its own contract with ${site.name}.`,
    ],
  },
  {
    heading: "Content on this site",
    body: [
      "The content here is provided for general information. It does not constitute professional advice, and decisions about your own systems should be based on advice specific to your situation.",
      "Projects described under Work are demonstration builds created to illustrate our approach. They are not client engagements, and the capabilities listed are not claimed business results.",
      "Testimonials shown are sample content with placeholder names and companies unless explicitly marked otherwise.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      `The design, text, graphics and code of this website belong to ${site.name} unless stated otherwise. You may not reproduce substantial parts of it without permission.`,
      "Third-party names and technologies mentioned belong to their respective owners. Mention of a technology does not imply a partnership, certification or endorsement.",
    ],
  },
  {
    heading: "Availability",
    body: [
      "We aim to keep the site available and accurate, but we do not guarantee uninterrupted access or that every detail is current at all times.",
    ],
  },
  {
    heading: "External links",
    body: [
      "Links to other websites are provided for convenience. We are not responsible for their content or their handling of your information.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "These terms may be updated. The version published here is the one that applies from the date it appears.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about these terms can be sent to ${site.contact.email}. This address is a placeholder until confirmed.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        lines={["Terms", "of Use."]}
        description="The terms that apply to this website and the content published on it."
        breadcrumb={[{ name: "Terms", href: "/terms" }]}
      />

      <Section compact className="pt-0">
        <div className="container-x">
          <LegalDocument sections={sections} />
        </div>
      </Section>
    </>
  );
}
