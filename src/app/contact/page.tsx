import type { Metadata } from "next";
import { Phone, Printer, Mail, Clock } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about our peptide collection or ordering? The Dr Sales Direct+ team is here to help.",
};

const DETAILS = [
  { icon: Phone, label: "Call", value: "+1 855-843-4782" },
  { icon: Printer, label: "Fax", value: "+1 844-611-8975" },
  { icon: Mail, label: "Email", value: "info@drsalesdirectplus.com" },
  { icon: Clock, label: "Business Hours", value: "Monday–Friday\n9:00 AM–6:00 PM EST" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:py-16">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Contact
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            LET&apos;S
            <br />
            <span className="text-brand-gradient">CONNECT.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/70">
            Questions about our peptide collection or ordering? Our team is
            here to help.
          </p>

          {/* auto-rows-fr + items-start keeps all four tiles top-aligned even
              when a value wraps to two lines (business hours, long email) */}
          <div className="mt-10 grid max-w-lg auto-rows-fr grid-cols-1 items-start gap-x-8 gap-y-7 sm:grid-cols-2">
            {DETAILS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex h-full items-start gap-3.5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral/15 to-violet/20">
                  <Icon className="h-5 w-5 text-rose" />
                </span>
                <div>
                  <p className="pt-0.5 text-[11px] font-semibold uppercase leading-none tracking-wider text-foreground/50">
                    {label}
                  </p>
                  <p className="mt-1.5 whitespace-pre-line text-base font-semibold leading-snug text-foreground">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
