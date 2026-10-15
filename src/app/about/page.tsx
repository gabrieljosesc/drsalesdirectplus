import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FlaskConical, Truck, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dr Sales Direct+ is the dedicated peptide line of Dr. Sales Direct, a medical wholesale supplier established in 2012.",
};

const POINTS = [
  {
    icon: BadgeCheck,
    title: "Established 2012",
    desc: "Dr Sales Direct+ is the dedicated peptide line of Dr. Sales Direct, a wholesale supplier serving licensed professionals for over a decade.",
  },
  {
    icon: FlaskConical,
    title: "Research-Grade Material",
    desc: "High-purity peptides supplied in lyophilized form, with documented testing behind our quality approach. Research use only.",
  },
  {
    icon: Truck,
    title: "Wholesale, Delivered",
    desc: "Tiered volume pricing on every product and fast, tracked shipping — your first order ships free.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="max-w-2xl py-12 lg:py-16">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">
          About
        </p>
        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
          PEPTIDES,
          <br />
          <span className="text-brand-gradient">DONE RIGHT.</span>
        </h1>
        <p className="mt-6 text-lg text-foreground/70">
          Dr Sales Direct+ exists for one purpose: a clean, focused home for
          our peptide collection — backed by the same sourcing, testing, and
          service standards our customers have trusted since 2012.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {POINTS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass rounded-3xl p-7">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-coral/15 to-violet/20">
              <Icon className="h-5 w-5 text-rose" />
            </span>
            <h2 className="text-base font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/65">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/peptides"
          className="btn-brand-gradient inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet/30 transition-transform hover:scale-[1.02]"
        >
          Explore Peptides
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/60">
            <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
