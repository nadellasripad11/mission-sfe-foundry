import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function isAuthed(req: NextRequest) {
  return req.cookies.get('adm-session')?.value === '1';
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Prefer service role key so anon SELECT policies aren't needed
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [signupsRes, viewsRes, eventsRes] = await Promise.all([
    db.from('signups').select('*').order('created_at', { ascending: false }),
    db.from('page_views').select('*').order('created_at', { ascending: false }).limit(500),
    db.from('analytics_events').select('*').order('created_at', { ascending: false }).limit(200),
  ]);

  return NextResponse.json({
    signups: signupsRes.data ?? [],
    pageViews: viewsRes.data ?? [],
    events: eventsRes.data ?? [],
  });
}
