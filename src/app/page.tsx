import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[72vh] w-full max-w-7xl items-center px-4 md:px-8">
      <div className="max-w-2xl py-16">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">
          Peptides
        </p>
        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
          DISCOVER
          <br />
          <span className="text-brand-gradient">PEPTIDES.</span>
        </h1>
        <p className="mt-6 text-lg text-foreground/70 md:text-xl">
          A dedicated peptide collection from Dr. Sales Direct.
        </p>
        <Link
          href="/peptides"
          className="btn-brand-gradient mt-9 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet/30 transition-transform hover:scale-[1.02]"
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
