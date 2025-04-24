// actions/contact.ts
'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormEmail } from '@/components/emails/contact-form-email'
import { db } from '@/db'

// Initialize Resend (email service)
const resend = new Resend(process.env.RESEND_API_KEY)

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

interface FormState {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Validate form data
    const validatedFields = contactSchema.safeParse({
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    })

    // Return errors if validation fails
    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors
      return {
        success: false,
        message: 'Please fix the errors below',
        errors
      }
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'Pensieve Contact <contact@pensieve.com>',
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `New Contact: ${validatedFields.data.subject}`,
      react: ContactFormEmail({
        ...validatedFields.data,
        date: new Date().toLocaleString()
      })
    })

    if (error) {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      }
    }

    // Save to database
    await db.contactSubmission.create({
      data: {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        email: validatedFields.data.email,
        subject: validatedFields.data.subject,
        message: validatedFields.data.message
      }
    })

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    }
  }
}