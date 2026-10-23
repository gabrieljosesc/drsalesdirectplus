import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dr Sales Direct+ — Peptides Wholesale",
    template: "%s | Dr Sales Direct+",
  },
  description:
    "A dedicated research-peptide collection from Dr. Sales Direct. Documented purity, wholesale pricing. Research use only.",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Dr Sales Direct+",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <div className="page-glow" aria-hidden />
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster position="top-right" richColors />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
