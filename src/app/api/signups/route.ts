import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Save to Supabase
    const { error: dbError } = await supabase.from('signups').insert({
      email,
      name,
      reason: reason || null
    });

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'Email already signed up' },
          { status: 400 }
        );
      }
      console.error('Database error:', dbError);
      throw dbError;
    }

    // Send notification email to admin (if key is available)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'SFE Foundry <onboarding@resend.dev>',
          to: 'sfefoundery@gmail.com',
          subject: `New signup: ${name}`,
          html: `
            <h2>New SFE Foundry Signup! 🎉</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${reason ? `<p><strong>Why they're joining:</strong> ${reason}</p>` : ''}
            <p><em>Total signups can be viewed in your dashboard</em></p>
          `
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail signup if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to save signup' },
      { status: 500 }
    );
  }
}
