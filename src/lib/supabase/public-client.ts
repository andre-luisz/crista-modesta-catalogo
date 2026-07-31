import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function getPublicSupabaseClient() {
  if (!url || !key) throw new Error("Configure as variáveis públicas do Supabase no .env.local.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
}

export function getImagemPublicaUrl(caminho?: string | null) {
  if (!caminho || !url) return null;
  if (caminho.startsWith("http://") || caminho.startsWith("https://")) return caminho;
  return `${url}/storage/v1/object/public/produtos/${caminho}`;
}
