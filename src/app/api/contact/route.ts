import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

type ValidationFieldError = { path: string; message: string }

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const data = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    }

    const violations: { propertyPath: string; title: string }[] = []
    if (!data.name) violations.push({ propertyPath: 'name', title: 'Name is required' })
    if (!data.email) violations.push({ propertyPath: 'email', title: 'Email is required' })
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      violations.push({ propertyPath: 'email', title: 'Invalid email format' })
    }
    if (!data.phone) violations.push({ propertyPath: 'phone', title: 'Phone is required' })
    if (!data.message) violations.push({ propertyPath: 'message', title: 'Message is required' })

    if (violations.length > 0) {
      return NextResponse.json(
        { message: 'Validation failed', violations },
        { status: 400 },
      )
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

    const err =
      error && typeof error === 'object' && 'data' in error
        ? (error as { data?: { errors?: ValidationFieldError[] } }).data
        : null
    const errors: ValidationFieldError[] = err?.errors ?? []

    if (errors.length > 0) {
      const violations = errors.map((item) => ({
        propertyPath: item.path,
        title: item.message,
      }))
      return NextResponse.json(
        { message: 'Validation failed', violations },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
