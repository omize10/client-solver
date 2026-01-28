import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
const LEADS_FILE_PATH = path.join(process.cwd(), 'data', 'leads.json');

async function getLeads() {
    try {
        const data = await fs.readFile(LEADS_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

async function saveLeads(leads: any[]) {
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leads, null, 2));
}

export async function GET() {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, phone } = body;

        if (!email || !phone) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const leads = await getLeads();
        const newLead = {
            id: Date.now().toString(),
            email,
            phone,
            date: new Date().toISOString(),
            status: 'Interested',
        };
        leads.push(newLead);
        await saveLeads(leads);

        // Send Email 1: Confirmation to Client
        try {
            await resend.emails.send({
                from: 'Client Solver <onboarding@resend.dev>',
                to: [email],
                subject: 'Complete Your Discovery Booking',
                html: `
                    <div style="font-family: sans-serif; color: #102a43; line-height: 1.6;">
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

        // Send Email 2: Internal Notification
        try {
            const internalEmails = [
                process.env.INTERNAL_EMAIL_1,
                process.env.INTERNAL_EMAIL_2
            ].filter(Boolean) as string[];

            await resend.emails.send({
                from: 'Client Solver Dashboard <onboarding@resend.dev>',
                to: internalEmails.length > 0 ? internalEmails : ['altufebrahim@gmail.com', 'omarkebrahim@gmail.com'],
                subject: `New Lead: ${email}`,
                html: `
                    <div style="font-family: sans-serif; color: #102a43;">
                        <h2>New Prospect Captured</h2>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Phone:</strong> ${phone}</li>
                            <li><strong>Captured At:</strong> ${new Date().toLocaleString()}</li>
                        </ul>
                        <p><a href="http://localhost:3000/admin">View in Admin Dashboard</a></p>
                    </div>
                `,
            });
        } catch (emailErr) {
            console.error('Failed to send internal notification email:', emailErr);
        }

        return NextResponse.json({ success: true, lead: newLead });
    } catch (e) {
        console.error('API Error:', e);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
