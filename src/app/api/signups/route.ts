import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, reason } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.from('signups').insert({
      email,
      name,
      reason: reason || null
    }).select();

    if (error) {
      console.error('Supabase error:', error.message, error.code);
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already signed up' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to save signup', details: error.message },
        { status: 500 }
      );
    }

    console.log('New signup:', { email, name, reason });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to save signup', details: String(error) },
      { status: 500 }
    );
  }
}
