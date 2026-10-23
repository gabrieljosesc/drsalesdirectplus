"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";

// "Peptides" is deliberately not in the nav: the homepage's Explore Peptides
// button is the single entry point to the collection (client feedback).
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Purity & Reliability", href: "/purity" },
  { label: "Contact", href: "/contact" },
];

function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2 text-foreground/70 hover:text-foreground">
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-4 md:px-8">
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

      <div className="hidden items-center gap-2 md:flex">
        <nav className="glass flex items-center gap-1 rounded-full p-1.5">
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
        <div className="glass flex items-center rounded-full p-1">
          <Link href="/account/orders" aria-label="Account" className="rounded-full p-2 text-foreground/70 hover:text-foreground">
            <User className="h-5 w-5" />
          </Link>
          <CartLink />
        </div>
      </div>

      {/* Mobile: centered glass pill under the logo */}
      <nav className="glass flex items-center justify-center gap-1 rounded-full p-1 md:hidden">
        <Link href="/account/orders" aria-label="Account" className="rounded-full p-1.5 text-foreground/70">
          <User className="h-4 w-4" />
        </Link>
        <CartLink />
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${
              pathname === l.href
                ? "bg-gradient-to-r from-coral/15 to-violet/20 text-foreground"
                : "text-foreground/60"
            }`}
          >
            {l.label.replace(" & Reliability", "")}
          </Link>
        ))}
      </nav>
    </header>
  );
}
