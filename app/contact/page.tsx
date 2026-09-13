import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Aarsoft Technologies. Send a short brief and we will come back with an honest view of scope, approach and timelines.",
  path: "/contact",
  keywords: ["contact software company", "start a project", "software development enquiry"],
});

const faqs = [
  {
    question: "What happens after I send an enquiry?",
    answer:
      "A person reads it. If it is something we can help with, we come back with questions and suggest a call. If it is not a good fit, we say so and point you somewhere more useful.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "Within one business day for project enquiries. If your timeline is urgent, say so in the project details and we will prioritise it.",
  },
  {
    question: "Do I need a detailed specification first?",
    answer:
      "No. A clear description of the problem is more useful than a premature specification. Defining the solution is part of what we do.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, before any detailed discussion if you prefer. Mention it in your enquiry and we will send ours or review yours.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes. We work with clients internationally and arrange overlap hours with your team's working day.",
  },
];

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "Best for project enquiries",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.contact.phone,
    href: `tel:${site.contact.phoneHref}`,
    note: "Mon to Fri, business hours",
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.contact.location,
    note: "Remote-friendly delivery",
  },
  {
    icon: Clock,
    label: "Response time",
    value: site.contact.responseTime,
    note: "Monday to Friday",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <JsonLd data={faqSchema(faqs)} />

      <PageHero
        eyebrow="Contact"
        lines={["Let's Build", "Something Meaningful."]}
        gradientLines={[1]}
        description="Tell us what you are trying to achieve. We will come back with an honest view of the scope, the approach and where the risks are."
        breadcrumb={[{ name: "Contact", href: "/contact" }]}
      />

      <Section compact className="pt-0">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Channels */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <RevealGroup as="ul" stagger={0.08} className="space-y-px">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    const content = (
                      <>
                        <span
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-sm)] transition-colors duration-300"
                          style={{ background: "var(--color-lavender-soft)" }}
                        >
                          <Icon
                            className="h-7 w-7 text-ink-900"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.8125rem] uppercase tracking-[0.16em] text-ink-400">
                            {channel.label}
                          </span>
                          <span className="mt-1.5 block break-words text-[1.125rem] text-ink-900">
                            {channel.value}
                          </span>
                          <span className="mt-1 block text-[0.9375rem] text-ink-400">
                            {channel.note}
                          </span>
                        </span>
                      </>
                    );

                    return (
                      <RevealItem
                        as="li"
                        key={channel.label}
                        className="border-t border-ink-200 last:border-b"
                      >
                        {channel.href ? (
                          <a
                            href={channel.href}
                            className="group flex items-start gap-4 py-6 transition-opacity hover:opacity-80"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 py-6">{content}</div>
                        )}
                      </RevealItem>
                    );
                  })}
                </RevealGroup>

                <Reveal delay={0.2}>
                  <div
                    className="dark-section relative mt-8 overflow-hidden rounded-[var(--radius-lg)] p-8"
                    style={{ backgroundColor: "var(--color-black)" }}
                  >
                    <div aria-hidden="true" className="brand-grid-dark absolute inset-0" />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-[70px]"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                    <p className="relative text-[0.8125rem] uppercase tracking-[0.16em] text-lavender">
                      Looking for a role?
                    </p>
                    <p className="relative mt-4 text-[1.125rem] leading-relaxed text-ink-300">
                      Career enquiries go to{" "}
                      <a
                        href={`mailto:${site.contact.careersEmail}`}
                        className="text-white underline decoration-lavender decoration-2 underline-offset-4 transition-colors hover:decoration-gold"
                      >
                        {site.contact.careersEmail}
                      </a>
                      , or see our open roles.
                    </p>
                  </div>
                </Reveal>

              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" id="faq">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="FAQ"
                  lines={["Before You", "Get in Touch."]}
                  narrow
                  description="The questions we are asked most often."
                />
              </div>
            </div>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
