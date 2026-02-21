import { NextResponse } from "next/server"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "careers@usenubis.com"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, role, links, motivation } = body

        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing")
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
        }

        // 1. Send application to hello@usenubis.com
        const adminRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: `Nubis Careers <${FROM_EMAIL}>`,
                to: "hello@usenubis.com",
                subject: `New Application: ${role} - ${name}`,
                html: `
          <h1>New Talent Identified</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Portfolio/Links:</strong> ${links}</p>
          <hr />
          <h3>Motivation:</h3>
          <p>${motivation}</p>
        `,
            }),
        })

        // 2. Send confirmation to applicant
        await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: `Nubis Cloud <${FROM_EMAIL}>`,
                to: email,
                subject: `Nubis Careers: Application Received`,
                html: `
          <div style="font-family: monospace; color: #000; padding: 20px;">
            <h2 style="text-transform: uppercase; border-bottom: 2px solid #000;">// APPLICATION_ACKNOWLEDGED</h2>
            <p>Hello ${name},</p>
            <p>We've received your application for the <strong>${role}</strong> position.</p>
            <p>Our engineering team will review your profile and the provided materials. If there's a match with our current roadmap, someone from our systems team will reach out for a technical sync.</p>
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
        console.error("Apply API Error:", err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
