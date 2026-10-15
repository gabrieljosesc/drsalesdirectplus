import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
        <div className="page-glow" aria-hidden />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
