import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Stores contact-form submissions. Uses this site's own Supabase project when
 * configured (SUPABASE_URL/SUPABASE_SERVICE_KEY); otherwise falls back to the
 * main Dr Sales Direct project's contact_messages table (CATALOG_* env), so
 * messages land in the existing admin inbox either way.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const url = process.env.SUPABASE_URL ?? process.env.CATALOG_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY ?? process.env.CATALOG_SUPABASE_SERVICE_KEY;
    if (!url || !key) {
      console.error("[contact] no Supabase configured; message dropped:", email);
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const db = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await db.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      subject: `[Dr Sales Direct+] ${subject}`,
      message,
    });
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
