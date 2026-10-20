"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// "Peptides" is deliberately not in the nav: the homepage's Explore Peptides
// button is the single entry point to the collection (client feedback).
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Purity & Reliability", href: "/purity" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/mark.png" alt="" width={46} height={46} priority />
        <span className="leading-tight">
          <span className="block text-lg font-bold text-foreground">
            Dr Sales <span className="text-rose">Direct</span>
            <span className="text-coral">+</span>
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground/50">
            Peptides Wholesale
          </span>
        </span>
      </Link>

      <nav className="glass hidden items-center gap-1 rounded-full p-1.5 md:flex">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? "bg-gradient-to-r from-coral/15 to-violet/20 text-foreground shadow-sm"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile: compact row of links */}
      <nav className="flex gap-3 md:hidden">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-[11px] font-semibold uppercase tracking-wide ${
              pathname === l.href ? "text-rose" : "text-foreground/60"
            }`}
          >
            {l.label.replace(" & Reliability", "")}
          </Link>
        ))}
      </nav>
    </header>
  );
}
