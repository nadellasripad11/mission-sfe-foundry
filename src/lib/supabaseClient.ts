import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window !== 'undefined') {
  if (!SUPABASE_URL || !SUPABASE_KEY ||
      SUPABASE_URL === 'https://placeholder.supabase.co' ||
      SUPABASE_KEY === 'placeholder') {
    console.error(
      '❌ Supabase is not configured!\n\n' +
      'To use SFE Foundry, you need to configure Supabase credentials.\n\n' +
      'Steps:\n' +
      '1. Create a .env.local file in the project root\n' +
      '2. Add these variables:\n\n' +
      'NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key\n\n' +
      'Get these values from your Supabase project settings.'
    );
  }
}

// Browser-side Supabase client (anon key is public and safe to expose).
// Handles email/password auth, OAuth (Google/Apple/GitHub), and session persistence.
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_KEY || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
