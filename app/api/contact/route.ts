import { NextResponse } from "next/server"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "contact@usenubis.com"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, subject, message } = body

        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing")
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
        }

        // 1. Send inquiry to hello@usenubis.com
        const adminRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: `Nubis Contact <${FROM_EMAIL}>`,
                to: "hello@usenubis.com",
                subject: `New Inquiry: ${subject} - ${name}`,
                html: `
          <h1>New General Inquiry</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <h3>Message:</h3>
          <p>${message}</p>
        `,
            }),
        })

        // 2. Send confirmation to sender
        await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: `Nubis Cloud <${FROM_EMAIL}>`,
                to: email,
                subject: `Nubis Support: Inquiry Received`,
                html: `
          <div style="font-family: monospace; color: #000; padding: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 2px solid #000;">// INQUIRY_ACKNOWLEDGED</h2>
            <p>Hello ${name},</p>
            <p>We've received your message regarding <strong>${subject}</strong>.</p>
            <p>Our support team will review your inquiry and get back to you within 24 operational hours.</p>
            <hr style="border: 1px solid #eee;" />
            <p style="font-size: 10px; color: #666;">Engineering over Hype. Built for the Inspectable Cloud.</p>
          </div>
        `,
            }),
        })

        if (!adminRes.ok) {
            const error = await adminRes.json()
            return NextResponse.json({ error }, { status: adminRes.status })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("Contact API Error:", err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
