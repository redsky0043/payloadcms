import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const data = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'form-submissions',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    })

    const contactEmail = process.env.CONTACT_EMAIL
    const fromEmail = process.env.CONTACT_FROM ?? 'onboarding@resend.dev'

    if (resend && contactEmail) {
      await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        subject: `Contact form: ${data.name}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
