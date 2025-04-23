// components/emails/contact-form-email.tsx
import React from 'react'

interface ContactFormEmailProps {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  date: string
}

export function ContactFormEmail({
  firstName,
  lastName,
  email,
  subject,
  message,
  date
}: ContactFormEmailProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">New Contact Form Submission</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {firstName} {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Message:</h2>
        <p className="whitespace-pre-line">{message}</p>
      </div>
    </div>
  )
}