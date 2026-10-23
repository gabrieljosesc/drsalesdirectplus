import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, FlaskConical } from "lucide-react";
import { fetchPeptides, storeUrl } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Peptide Collection",
  description:
    "Browse the full Dr Sales Direct research-peptide collection with wholesale pricing. Research use only.",
};

export const dynamic = "force-dynamic";

export default async function PeptidesPage() {
  const peptides = await fetchPeptides();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-8">
      <div className="py-10 text-center md:py-14">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">
          The Collection
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          OUR <span className="text-brand-gradient">PEPTIDES.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          {peptides.length > 0
            ? `${peptides.length} research peptides — many available in multiple strengths, with tiered wholesale pricing on every product page.`
            : "Our research-peptide collection, with tiered wholesale pricing on every product page."}
        </p>
      </div>

      {peptides.length === 0 ? (
        <div className="glass mx-auto max-w-md rounded-3xl p-10 text-center">
          <FlaskConical className="mx-auto mb-4 h-10 w-10 text-violet" />
          <p className="text-foreground/70">
            The collection is loading — please check back in a moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {peptides.map((p) => (
            <a
              key={p.slug}
              href={storeUrl(p.slug)}
              className="glass group flex flex-col rounded-3xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-white">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FlaskConical className="h-10 w-10 text-violet/40" />
                  </div>
                )}
              </div>
              <h2 className="text-sm font-semibold leading-snug text-foreground">
                {p.title}
              </h2>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="text-base font-bold text-foreground">
                  ${p.base_price.toFixed(2)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-rose">
                  View <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-foreground/50">
        Tiered wholesale pricing on every product page. For research use only.
      </p>
    </section>
  );
}
