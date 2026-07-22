import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getIp } from '../../../lib/rateLimit';

const ALLOWED_EVENT_TYPES = new Set(['shop_request', 'project_view', 'link_click', 'search']);
const MAX_STRING = 500;

const supabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function POST(req: NextRequest) {
  // 60 events per IP per minute
  if (!rateLimit(`track:${getIp(req)}`, 60, 60_000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { type } = body;
    const db = supabase();

    if (type === 'pageview') {
      const page = typeof body.page === 'string' ? body.page.slice(0, MAX_STRING) : '/';
      const session_id = typeof body.session_id === 'string' ? body.session_id.slice(0, 64) : null;
      const referrer = typeof body.referrer === 'string' ? body.referrer.slice(0, MAX_STRING) : null;
      await db.from('page_views').insert({ page, session_id, referrer });

    } else if (type === 'event') {
      const event_type = typeof body.event_type === 'string' && ALLOWED_EVENT_TYPES.has(body.event_type)
        ? body.event_type : null;
      if (!event_type) return NextResponse.json({ ok: false }, { status: 400 });
      const page = typeof body.page === 'string' ? body.page.slice(0, MAX_STRING) : null;
      // Only store known metadata keys, no freeform injection
      const rawMeta = body.metadata && typeof body.metadata === 'object' ? body.metadata : null;
      const metadata = rawMeta ? {
        product: typeof rawMeta.product === 'string' ? rawMeta.product.slice(0, 200) : undefined,
        category: typeof rawMeta.category === 'string' ? rawMeta.category.slice(0, 100) : undefined,
        price: typeof rawMeta.price === 'string' ? rawMeta.price.slice(0, 50) : undefined,
      } : null;
      await db.from('analytics_events').insert({ event_type, page, metadata });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
