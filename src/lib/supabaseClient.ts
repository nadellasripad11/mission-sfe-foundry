import { createClient } from '@supabase/supabase-js';

// Browser-side Supabase client (anon key is public and safe to expose).
// Handles email/password auth, OAuth (Google/Apple/GitHub), and session persistence.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
