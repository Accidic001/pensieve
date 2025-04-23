// components/contact-form.tsx
'use client'

import { useFormState } from 'react-dom'
import { submitContactForm } from '@/actions/contact'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, {
    success: false,
    message: '',
    errors: {}
  })

  return (
   <> <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input 
            id="first-name" 
            name="first-name" 
            placeholder="John" 
            required 
          />
          {state.errors?.firstName && (
            <p className="text-sm text-red-600">{state.errors.firstName[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input 
            id="last-name" 
            name="last-name" 
            placeholder="Doe" 
            required 
          />
          {state.errors?.lastName && (
            <p className="text-sm text-red-600">{state.errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="john@example.com" 
          required 
        />
        {state.errors?.email && (
          <p className="text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input 
          id="subject" 
          name="subject" 
          placeholder="How can we help?" 
          required 
        />
        {state.errors?.subject && (
          <p className="text-sm text-red-600">{state.errors.subject[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea 
          id="message" 
          name="message" 
          placeholder="Your message here..." 
          rows={5} 
          required 
        />
        {state.errors?.message && (
          <p className="text-sm text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>

      {state.message && (
        <p className={`text-sm ${
          state.success ? 'text-green-600' : 'text-red-600'
        }`}>
          {state.message}
        </p>
      )}
    </form>
    
    </>
  )
}