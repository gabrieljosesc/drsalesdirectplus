"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const FIELD =
  "w-full rounded-xl border border-foreground/10 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-foreground/40 focus:border-violet";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(
        "Could not send your message. Please try again or email info@drsalesdirectplus.com."
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-violet" />
        <h2 className="text-xl font-bold">Message sent!</h2>
        <p className="mt-2 text-sm text-foreground/65">
          Thank you — our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-7 md:p-9">
      <h2 className="mb-6 text-xl font-extrabold tracking-wide">GET IN TOUCH</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold">
            Name <span className="text-rose">*</span>
          </label>
          <input id="name" name="name" required placeholder="Your name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">
            Email <span className="text-rose">*</span>
          </label>
          <input id="email" name="email" type="email" required placeholder="your@email.com" className={FIELD} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
            Phone
          </label>
          <input id="phone" name="phone" placeholder="Your phone number" className={FIELD} />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-semibold">
            Subject <span className="text-rose">*</span>
          </label>
          <input id="subject" name="subject" required placeholder="How can we help?" className={FIELD} />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-semibold">
            Message <span className="text-rose">*</span>
          </label>
          <textarea id="message" name="message" required rows={4} placeholder="Your message" className={`${FIELD} resize-none`} />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="btn-brand-gradient mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet/30 transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending…" : "Send Message"} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
