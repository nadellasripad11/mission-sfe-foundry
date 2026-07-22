import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, page, session_id, referrer, metadata } = body;
    const db = supabase();

    if (type === 'pageview') {
      await db.from('page_views').insert({ page: page || '/', session_id: session_id || null, referrer: referrer || null });
    } else if (type === 'event') {
      await db.from('analytics_events').insert({ event_type: body.event_type || 'unknown', page: page || null, metadata: metadata || null });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
