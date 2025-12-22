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

        // Admin notification email template
        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 24px;">� New Project Submission</h1>
                </div>
                <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #2563eb;">Website URL:</td>
                            <td style="padding: 12px 0;"><a href="${url}" target="_blank" style="color: #2563eb; text-decoration: none;">${url}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #2563eb;">Asking Price:</td>
                            <td style="padding: 12px 0;">$${price}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #2563eb;">Tech Stack:</td>
                            <td style="padding: 12px 0;">${techStack}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #2563eb;">Seller Email:</td>
                            <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 12px 0; font-weight: bold; color: #2563eb;">Payout Method:</td>
                            <td style="padding: 12px 0;">${payoutMethod}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <h3 style="color: #2563eb; margin-top: 0;">Project Description:</h3>
                        <p style="line-height: 1.6; color: #666;">${description}</p>
                    </div>
                </div>
                <div style="background: #f3f4f6; padding: 15px 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666;">
                    <p style="margin: 0;">Review and approve this submission in your admin dashboard</p>
                </div>
            </div>
        `;

        // Seller confirmation email template
        const sellerEmailHtml = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 24px;">✓ Submission Received</h1>
                </div>
                <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
                    <p style="font-size: 16px; line-height: 1.6;">Hi there,</p>
                    <p style="line-height: 1.6; color: #666;">
                        Thank you for submitting your website to <strong>Websites Arena</strong>! We've received your submission and our team will review it shortly.
                    </p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #2563eb;">Submission Details:</h3>
                        <p style="margin: 8px 0;"><strong>Website:</strong> ${url}</p>
                        <p style="margin: 8px 0;"><strong>Asking Price:</strong> $${price}</p>
                        <p style="margin: 8px 0;"><strong>Tech Stack:</strong> ${techStack}</p>
                    </div>

                    <h3 style="color: #2563eb; margin-top: 24px;">What's Next?</h3>
                    <ol style="line-height: 1.8; color: #666;">
                        <li><strong>Review Process (24-48 hours):</strong> Our team will evaluate your project's code quality, design, and potential.</li>
                        <li><strong>Approval Notification:</strong> We'll email you with the status and any feedback.</li>
                        <li><strong>Live on Marketplace:</strong> Once approved, your listing goes live to thousands of buyers.</li>
                        <li><strong>Get Paid:</strong> When your site sells, you keep 85% of the profit.</li>
                    </ol>

                    <p style="margin-top: 20px; color: #666;">
                        If you have any questions in the meantime, feel free to reply to this email or contact us at <a href="mailto:hello@websitesarena.com" style="color: #2563eb; text-decoration: none;">hello@websitesarena.com</a>
                    </p>
                </div>
                <div style="background: #f3f4f6; padding: 15px 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px; color: #666;">
                    <p style="margin: 0;">© 2025 Websites Arena. All rights reserved.</p>
                </div>
            </div>
        `;

        // Send admin notification
        const adminEmail = await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: ['hello@websitesarena.com'],
            replyTo: email,
            subject: `New Project Submission: ${url}`,
            html: adminEmailHtml,
        });

        if (adminEmail.error) {
            console.error('Admin email error:', adminEmail.error);
            return NextResponse.json({ error: adminEmail.error }, { status: 500 });
        }

        // Send seller confirmation
        const sellerEmail = await resend.emails.send({
            from: 'Websites Arena <hello@websitesarena.com>',
            to: [email],
            subject: 'Submission Received - Websites Arena',
            html: sellerEmailHtml,
        });

        if (sellerEmail.error) {
            console.error('Seller email error:', sellerEmail.error);
            return NextResponse.json({ error: sellerEmail.error }, { status: 500 });
        }

        return NextResponse.json({
            adminEmail: adminEmail.data,
            sellerEmail: sellerEmail.data,
            message: 'Emails sent successfully'
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
