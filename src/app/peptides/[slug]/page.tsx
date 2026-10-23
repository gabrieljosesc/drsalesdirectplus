import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { Product } from "@/types";
import { getProductCoas } from "@/lib/coa";
import { getDoseSiblings } from "@/lib/peptide-doses";
import ProductDetail from "@/components/products/ProductDetail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("products")
    .select("title, description")
    .eq("slug", slug)
    .single();
  if (!data) return {};
  return { title: data.title, description: data.description?.slice(0, 160) ?? undefined };
}

export default async function PeptideProductPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createAdminClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*), images:product_images(id,url,sort_order)")
    .eq("slug", slug)
    .single();

  // This store carries peptides only; everything else stays on the main site
  if (!product || !product.is_active || product.category?.slug !== "peptides") notFound();

  const doseOptions = await getDoseSiblings(supabase, product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <ProductDetail
        product={{ ...(product as Product), coas: getProductCoas(slug, product.coa_url) }}
        doseOptions={doseOptions}
        productBasePath="/peptides"
      />
    </div>
  );
}
