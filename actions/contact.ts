'use server';

import { Resend } from 'resend';
import type { ContactFormData, FormErrors, SubmissionResponse } from '@/types/contact';

export async function submitContactForm(input: ContactFormData): Promise<SubmissionResponse> {
  const fail = (message: string): SubmissionResponse => ({ success: false, message });
  if (!input || typeof input !== 'object') return fail('Please check the form and try again.');
  const fields = ['nameSurname', 'company', 'email', 'projectDetails'] as const;
  if (fields.some(key => typeof input[key] !== 'string') || !Array.isArray(input.services) || input.services.length > 10 || input.services.some(s => typeof s !== 'string' || s.length > 100)) {
    return fail('Please check the form and try again.');
  }
  const data = { ...input, nameSurname: input.nameSurname.trim(), company: input.company.trim(), email: input.email.trim(), projectDetails: input.projectDetails.trim() };
  const errors: FormErrors = {};
  if (data.nameSurname.length < 2 || data.nameSurname.length > 150) errors.nameSurname = 'Please enter your name (2–150 characters).';
  if (!/^[^\s@<>"\r\n]+@[^\s@<>"\r\n]+\.[^\s@<>"\r\n]+$/.test(data.email) || data.email.length > 254) errors.email = 'Please enter a valid email address.';
  if (data.projectDetails.length < 10 || data.projectDetails.length > 5000) errors.projectDetails = 'Please use 10–5000 characters for your project details.';
  if (!data.services.length) errors.services = 'Please select at least one service.';
  if (data.company.length > 200) return fail('Please shorten the company name.');
  if (Object.keys(errors).length) return {success:false, message:'Please check the highlighted fields.', errors};
  const {RESEND_API_KEY, EMAIL_FROM, EMAIL_TO} = process.env;
  if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) return fail('The form is temporarily unavailable. Please email hello@skroling.dev.');
  try {
    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: data.email,
      subject: 'New studio enquiry — Skroling',
      text: `Name: ${data.nameSurname}\nCompany: ${data.company || 'Not provided'}\nEmail: ${data.email}\nServices: ${data.services.join(', ')}\n\n${data.projectDetails}`,
    });
    if (result.error || !result.data?.id) return fail('Your message could not be sent. Please try again or email hello@skroling.dev.');
    return { success:true, message:'Thank you! Your message has been sent.', emailId:result.data.id };
  } catch {
    return fail('Your message could not be sent. Please try again or email hello@skroling.dev.');
  }
}
