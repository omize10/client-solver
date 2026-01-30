import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, leads: data || [] });
  } catch (e) {
    console.error('Failed to fetch leads:', e);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const body = await request.json();
    const { email, phone } = body;

    if (!email || !phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert({
        email,
        phone,
        status: 'Interested',
        source: 'web_form',
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 400 });
    }

    const newLead = data;

    // Send Email 1: Confirmation to Client
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: 'Client Solver <onboarding@resend.dev>',
          to: [email],
          subject: 'Complete Your Discovery Booking',
          html: `
            <div style="font-family: sans-serif; color: #FFFFFF; line-height: 1.6; background-color: #051423; padding: 20px;">
              <h1 style="color: #3e8ed0;">Hey, we noticed you started your application!</h1>
              <p>Just in case you didn't finish booking on the next page, here is the Calendly link again to secure your spot:</p>
              <p style="margin: 30px 0;">
                <a href="https://calendly.com/partnerships-clientsolver"
                   style="background-color: #3e8ed0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                   Book Your Discovery Call
                </a>
              </p>
              <p>Talk soon,<br>The Client Solver Team</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Failed to send client confirmation email:', emailErr);
      }
    }

    // Send Email 2: Internal Notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const internalEmails = [
          process.env.INTERNAL_EMAIL_1,
          process.env.INTERNAL_EMAIL_2
        ].filter(Boolean) as string[];

        await resend.emails.send({
          from: 'Client Solver Dashboard <onboarding@resend.dev>',
          to: internalEmails.length > 0 ? internalEmails : ['altufebrahim@gmail.com', 'omarkebrahim@gmail.com'],
          subject: `New Lead: ${email}`,
          html: `
            <div style="font-family: sans-serif; color: #FFFFFF; background-color: #051423; padding: 20px;">
              <h2 style="color: #3e8ed0;">New Prospect Captured</h2>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Captured At:</strong> ${new Date().toLocaleString()}</li>
              </ul>
              <p><a href="${baseUrl}/admin" style="color: #3e8ed0;">View in Admin Dashboard</a></p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Failed to send internal notification email:', emailErr);
      }
    }

    return NextResponse.json({ success: true, lead: newLead });
  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
