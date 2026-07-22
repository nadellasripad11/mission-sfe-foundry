import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getIp } from '../../../../lib/rateLimit';

export async function POST(req: NextRequest) {
  // 5 attempts per IP per 15 minutes
  if (!rateLimit(`adm-auth:${getIp(req)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const PASSCODE = process.env.ADMIN_PASSCODE;
  if (!PASSCODE) return NextResponse.json({ error: 'Not configured.' }, { status: 503 });

  let code: unknown;
  try { ({ code } = await req.json()); } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Code required.' }, { status: 400 });
  }

  if (code !== PASSCODE) {
    return NextResponse.json({ error: 'Incorrect passcode.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('adm-session', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('adm-session');
  return res;
}
