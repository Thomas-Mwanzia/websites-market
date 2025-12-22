import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // Lazy-load Resend instance to avoid build-time errors
        const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

        const body = await request.json();
        const { url, price, techStack, description, email, payoutMethod, payoutDetails } = body;

        const { data, error } = await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: ['hello@websitesarena.com'], // Sending to admin
            replyTo: email, // Allow replying directly to the seller
            subject: `New Project Submission: ${url}`,
            html: `
        <h1>New Project Submission</h1>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Asking Price:</strong> $${price}</p>
        <p><strong>Tech Stack:</strong> ${techStack}</p>
        <p><strong>Contact Email:</strong> ${email}</p>
        <p><strong>Payout Method:</strong> ${payoutMethod}</p>
        <p><strong>Payout Details:</strong> ${payoutDetails}</p>
        <br />
        <h3>Description:</h3>
        <p>${description}</p>
      `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
