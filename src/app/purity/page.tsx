import type { Metadata } from "next";
import { Search, BarChart3, FileText, Download } from "lucide-react";
import coas from "@/data/coas.json";

export const metadata: Metadata = {
  title: "Purity & Reliability",
  description:
    "Quality, verified. Our approach to peptide quality is supported by documented product testing.",
};

const PILLARS = [
  {
    icon: Search,
    title: "Identity Confirmed",
    desc: "Testing confirms the intended compound.",
  },
  {
    icon: BarChart3,
    title: "Purity Verified",
    desc: "Measured purity is compared against the required specification.",
  },
  {
    icon: FileText,
    title: "Result Documented",
    desc: "Testing results provide a record of the product's analyzed quality.",
  },
];

export default function PurityPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-8">
      <div className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        {/* Left: headline */}
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">
            Purity &amp; Reliability
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            QUALITY,
            <br />
            <span className="text-brand-gradient">VERIFIED.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-foreground/70">
            Confidence comes from knowing what&apos;s inside. Our approach to
            quality is supported by documented product testing.
          </p>
        </div>

        {/* Right: sample batch result */}
        <div className="glass rounded-3xl p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/55">
            Real Product. Documented Results.
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
            SEMAGLUTIDE <span className="font-semibold text-foreground/70">5 MG</span>
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-foreground/10 py-5 sm:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Identity</p>
              <p className="mt-1 text-sm font-bold text-violet">Confirmed</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Purity</p>
              <p className="mt-1 text-2xl font-extrabold text-brand-gradient leading-none">99.73%</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Specification</p>
              <p className="mt-1 text-sm font-bold">&gt;99%</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Result</p>
              <p className="mt-1 text-sm font-bold">Conforms</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-foreground/70">
            This Semaglutide 5 mg batch was tested to confirm both its identity
            and purity. The analysis confirmed the compound as Semaglutide and
            measured 99.73% purity, meeting its greater-than-99% specification.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Testing provides documented confirmation of what the product
            contains, giving researchers greater confidence in the material
            they receive.
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="glass grid gap-6 rounded-3xl px-6 py-8 md:grid-cols-4 md:items-center md:px-10">
        {PILLARS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral/15 to-violet/20">
              <Icon className="h-5 w-5 text-rose" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/60">{desc}</p>
            </div>
          </div>
        ))}
        <p className="text-sm font-extrabold uppercase leading-snug tracking-wide md:text-right">
          Purity isn&apos;t just a claim.
          <br />
          <span className="text-brand-gradient">It&apos;s measured.</span>
        </p>
      </div>

      {/* Certificates of Analysis library */}
      <div className="py-14">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            CERTIFICATES OF <span className="text-brand-gradient">ANALYSIS.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/65">
            Third-party lab reports for our peptide batches — open any
            certificate to view or download the full PDF.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coas.map((group) => (
            <div key={group.product} className="glass rounded-3xl p-5">
              <h3 className="text-sm font-bold text-foreground">{group.product}</h3>
              <ul className="mt-3 space-y-1.5">
                {group.files.map((f) => (
                  <li key={f.url}>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2 text-xs text-foreground/65 transition-colors hover:text-rose"
                    >
                      <Download className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-violet group-hover:text-rose" />
                      <span className="underline-offset-2 group-hover:underline">{f.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-foreground/50">
          Certificates are provided per batch; the certificate for your batch is also
          linked on each product page. For research use only.
        </p>
      </div>
    </section>
  );
}
