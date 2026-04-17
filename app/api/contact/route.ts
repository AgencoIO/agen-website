import { NextRequest, NextResponse } from 'next/server'

const RECIPIENTS = [
  'samratshakya5@gmail.com',
  'angirathnepali@gmail.com',
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message, service } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      // Fallback: log the submission if Resend isn't configured
      console.log('=== NEW CONTACT FORM SUBMISSION ===')
      console.log(`Name: ${name}`)
      console.log(`Email: ${email}`)
      console.log(`Company: ${company || 'N/A'}`)
      console.log(`Phone: ${phone || 'N/A'}`)
      console.log(`Service: ${service || 'N/A'}`)
      console.log(`Message: ${message}`)
      console.log('===================================')

      return NextResponse.json({
        success: true,
        message: 'Form submitted successfully (logged — email not configured).',
      })
    }

    // Send email via Resend
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 12px;">
          New Consultation Request
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; color: #111; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
            <td style="padding: 8px 0; color: #111;">
              <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Company</td>
            <td style="padding: 8px 0; color: #111;">${company}</td>
          </tr>` : ''}
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Phone</td>
            <td style="padding: 8px 0; color: #111;">${phone}</td>
          </tr>` : ''}
          ${service ? `
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Service</td>
            <td style="padding: 8px 0; color: #111;">${service}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="color: #666; margin: 0 0 8px 0; font-size: 13px;">Message</p>
          <p style="color: #111; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          Sent from Agenco Contact Form
        </p>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Agenco <onboarding@resend.dev>',
        to: RECIPIENTS,
        subject: `New Consultation Request from ${name}`,
        html: emailHtml,
        reply_to: email,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error('Resend API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Your consultation request has been sent successfully!',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
