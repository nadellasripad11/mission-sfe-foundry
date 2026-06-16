import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Verify this is a cron request (you can add auth headers later)
    const authHeader = req.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Get signups from the last 7 days
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: signups, error: queryError } = await supabase
      .from('signups')
      .select('*')
      .gte('created_at', oneWeekAgo)
      .order('created_at', { ascending: false });

    if (queryError) {
      console.error('Query error:', queryError);
      throw queryError;
    }

    if (!signups || signups.length === 0) {
      console.log('No signups this week');
      return NextResponse.json({ message: 'No signups this week' });
    }

    // Send weekly summary email
    const signupsList = signups
      .map((signup: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${signup.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${signup.email}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; font-size: 12px;">${new Date(signup.created_at).toLocaleDateString()}</td>
        </tr>
      `)
      .join('');

    await resend.emails.send({
      from: 'SFE Foundry <onboarding@resend.dev>',
      to: 'sfefoundery@gmail.com',
      subject: `📊 SFE Foundry Weekly Summary - ${signups.length} new signups`,
      html: `
        <h2>Weekly Signup Summary 📊</h2>
        <p><strong>Total signups this week:</strong> ${signups.length}</p>

        <table style="width: 100%; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th style="padding: 10px; text-align: left;">Name</th>
              <th style="padding: 10px; text-align: left;">Email</th>
              <th style="padding: 10px; text-align: left;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${signupsList}
          </tbody>
        </table>

        <p style="margin-top: 20px; color: #666; font-size: 12px;">This is an automated weekly summary from SFE Foundry</p>
      `
    });

    return NextResponse.json({
      message: 'Weekly summary sent',
      count: signups.length
    });
  } catch (error) {
    console.error('Weekly summary error:', error);
    return NextResponse.json(
      { error: 'Failed to send summary' },
      { status: 500 }
    );
  }
}
