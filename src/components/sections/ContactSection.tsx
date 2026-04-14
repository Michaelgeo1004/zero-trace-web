import { site } from "@/content/site";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  const { contact, contactSection } = site;

  return (
    <section
      id="contact"
      className="mode-section-alt scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="mode-text font-display text-3xl md:text-4xl">
              {contactSection.title}
            </h2>
            <p className="mode-muted mt-4 leading-relaxed">
              {contactSection.lead}
            </p>
            <ul className="mode-muted mt-8 space-y-3 text-sm">
              <li>
                <span className="mode-accent">Email · </span>
                <Link
                  href={`mailto:${contact.email}`}
                  className="mode-text underline-offset-4 hover:underline"
                >
                  {contact.email}
                </Link>
              </li>
              <li>
                <span className="mode-accent">Phone · </span>
                {contact.phone}
              </li>
              <li>
                <span className="mode-accent">City · </span>
                {contact.city}
              </li>
              <li>
                <span className="mode-accent">Instagram · </span>
                {contact.instagram}
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mode-surface rounded-2xl border p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
