import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Read-only access to the main Dr Sales Direct catalog (single source of
 * truth for the peptide line — names, prices, photos stay in sync with the
 * store automatically). Server-side only; the key never reaches the browser.
 */
export type CatalogPeptide = {
  slug: string;
  title: string;
  base_price: number;
  image: string | null;
};

/**
 * Product pages live ON THIS SITE (client requirement: ad traffic must never
 * be redirected to the main Dr Sales Direct website).
 */
export function storeUrl(slug: string): string {
  return `/peptides/${slug}`;
}

export async function fetchPeptides(): Promise<CatalogPeptide[]> {
  // The catalog lives in the same Supabase project as the store, so the main
  // credentials are the source of truth; the CATALOG_* pair is a fallback
  // from before the sites shared a database.
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.CATALOG_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.CATALOG_SUPABASE_SERVICE_KEY;
  if (!url || !key) return [];

  const db = createClient(url, key, { auth: { persistSession: false } });
  const { data: cat } = await db
    .from("categories")
    .select("id")
    .eq("slug", "peptides")
    .single();
  if (!cat) return [];

  const { data } = await db
    .from("products")
    .select("slug, title, base_price, images:product_images(url, sort_order)")
    .eq("category_id", cat.id)
    .eq("is_active", true)
    .eq("is_dose_primary", true)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("title");

  return (data ?? []).map((p) => ({
    slug: p.slug,
    title: p.title,
    base_price: Number(p.base_price),
    image:
      (p.images ?? []).sort((a, b) => a.sort_order - b.sort_order)[0]?.url ??
      null,
  }));
}
