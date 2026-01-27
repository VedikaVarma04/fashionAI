import { createClient } from "@supabase/supabase-js";

// Configure these via Vite environment variables.
// Create a `.env` file in the project root with:
// VITE_SUPABASE_URL=your_supabase_url
// VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This helps surface misconfiguration issues early in development.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase URL or anon key is missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

