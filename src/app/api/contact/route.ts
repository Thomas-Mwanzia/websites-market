import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json()

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Send Admin Notification
        await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: ['hello@websitesarena.com'], // Or support@websitesarena.com if configured
            replyTo: email,
            subject: `New Contact Form Message: ${subject}`,
            html: `
                <h1>New Contact Message</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
                    ${message}
                </blockquote>
            `
        })

        // Send User Confirmation
        await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: [email],
            subject: 'We received your message - Websites Arena',
            html: `
                <h1>Message Received</h1>
                <p>Hi ${name},</p>
                <p>Thanks for contacting us. We've received your message regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
                <p>Best regards,<br>The Websites Arena Team</p>
            `
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
