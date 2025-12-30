import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.ITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
  "https://hvsxhbkrkabewwljjjqi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2c3hoYmtya2FiZXd3bGpqanFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTA2MDgsImV4cCI6MjA4MDE4NjYwOH0.HuIjFkPN4tI9eg6DVzZV0kxyqG9gVQNXm-kpQpWtfr8"
);






