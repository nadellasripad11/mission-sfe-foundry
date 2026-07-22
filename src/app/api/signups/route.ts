import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getIp } from '../../../lib/rateLimit';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const useSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);

// In-memory fallback (used only when Supabase env vars are missing).
type Account = { email: string; name: string | null; password: string };
const g = globalThis as unknown as { __accts?: Map<string, Account> };
const localStore = g.__accts ?? (g.__accts = new Map<string, Account>());

export async function POST(req: NextRequest) {
  // 10 signup/signin attempts per IP per 15 minutes
  if (!rateLimit(`signups:${getIp(req)}`, 10, 15 * 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a few minutes.' }, { status: 429 });
  }

  try {
    const { mode, email, password, name, reason } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    if (!password || typeof password !== 'string' || String(password).length < 6 || String(password).length > 128) {
      return NextResponse.json({ error: 'Password must be 6–128 characters' }, { status: 400 });
    }
    if (mode === 'signup' && name && String(name).length > 100) {
      return NextResponse.json({ error: 'Name must be 100 characters or fewer' }, { status: 400 });
    }
    if (reason && typeof reason === 'string' && reason.length > 500) {
      return NextResponse.json({ error: 'Reason must be 500 characters or fewer' }, { status: 400 });
    }
    const key = String(email).trim().toLowerCase();
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (() => { try { return new URL(req.url).origin; } catch { return undefined; } })();

    // ─────────────── SIGN IN ───────────────
    if (mode === 'signin') {
      if (useSupabase) {
        const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
        const { data, error } = await supabase.auth.signInWithPassword({ email: key, password });
        if (error) {
          const m = error.message.toLowerCase();
          if (m.includes('not confirmed') || m.includes('not verified')) {
            return NextResponse.json(
              { error: 'Please verify your email first — check your inbox for the confirmation link.' },
              { status: 403 }
            );
          }
          return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
        }
        // Hard block: never let an unverified account in, even if the project
        // setting allowed the password to pass.
        if (!data.user?.email_confirmed_at) {
          await supabase.auth.signOut();
          return NextResponse.json(
            { error: 'Please verify your email first — check your inbox for the confirmation link.' },
            { status: 403 }
          );
        }
        const displayName = data.user?.user_metadata?.name ?? null;
        return NextResponse.json({ success: true, name: displayName });
      }

      const acct = localStore.get(key);
      if (!acct) {
        return NextResponse.json({ error: 'No account found. Please sign up first.' }, { status: 404 });
      }
      if (acct.password !== password) {
        return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
      }
      return NextResponse.json({ success: true, name: acct.name });
    }

    // ─────────────── SIGN UP ───────────────
    if (!name || String(name).trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (useSupabase) {
      const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);
      const { data, error } = await supabase.auth.signUp({
        email: key,
        password,
        options: {
          data: { name, reason: reason || null },
          emailRedirectTo: origin ? `${origin}/` : undefined,
        },
      });

      if (error) {
        const m = error.message.toLowerCase();
        if (m.includes('already') || m.includes('registered')) {
          return NextResponse.json(
            { error: 'This email is already registered. Try signing in instead.' },
            { status: 400 }
          );
        }
        if (m.includes('rate limit')) {
          return NextResponse.json(
            { error: 'Too many sign-ups right now — the email service is rate-limited. Please try again in a bit.' },
            { status: 429 }
          );
        }
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      // Supabase obfuscates existing users: identities = [] means it already existed.
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return NextResponse.json(
          { error: 'This email is already registered. Try signing in instead.' },
          { status: 400 }
        );
      }

      // Best-effort: also store in the signups table for the admin list (ignore failures).
      try {
        await supabase.from('signups').insert({ email: key, name, reason: reason || null });
      } catch {}

      const needsVerification = !data.session;
      return NextResponse.json({
        success: true,
        needsVerification,
        message: needsVerification
          ? 'Account created! Check your email for a verification link to activate your account.'
          : 'Account created! You are signed in.',
      });
    }

    // Local fallback
    if (localStore.has(key)) {
      return NextResponse.json(
        { error: 'This email is already registered. Try signing in instead.' },
        { status: 400 }
      );
    }
    localStore.set(key, { email: key, name, password });
    return NextResponse.json({
      success: true,
      needsVerification: false,
      message: 'Account created! (Local mode — no email sent.)',
    });
  } catch (error) {
    console.error('Auth error:', error);
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
