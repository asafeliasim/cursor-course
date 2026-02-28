import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (typeof window !== "undefined") {
  console.log("[Supabase] client loaded", { url: supabaseUrl ? "set" : "missing", key: supabaseAnonKey ? "set" : "missing" });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);