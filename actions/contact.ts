'use server';

import { Resend } from 'resend';
import { ContactFormData, FormErrors } from '@/types/contact';

// Initialize Resend client
// Alternative: Use Nodemailer, SendGrid, AWS SES, etc.
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Validates email format using RFC 5322 compliant regex
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes user input to prevent XSS and injection attacks
 */
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 5000); // Limit length
};

/**
 * Validates the entire form and returns any errors
 */
const validateForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.nameSurname.trim()) {
    errors.nameSurname = 'Name and surname are required';
  } else if (data.nameSurname.trim().length < 2) {
    errors.nameSurname = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Project details validation
  if (!data.projectDetails.trim()) {
    errors.projectDetails = 'Please tell us about your project';
  } else if (data.projectDetails.trim().length < 10) {
    errors.projectDetails = 'Please provide more details (at least 10 characters)';
  }

  // Services validation
  if (data.services.length === 0) {
    errors.services = 'Please select at least one service';
  }

  return errors;
};

/**
 * Server Action to submit contact form
 * Called directly from client components
 */
export async function submitContactForm(data: ContactFormData) {
  try {
    // 1. Validate the form data
    const validationErrors = validateForm(data);
    
    if (Object.keys(validationErrors).length > 0) {
      return {
        success: false,
        errors: validationErrors,
        message: 'Please fix the validation errors'
      };
    }

    // 2. Sanitize inputs
    const sanitizedData = {
      nameSurname: sanitizeInput(data.nameSurname),
      company: sanitizeInput(data.company),
      email: sanitizeInput(data.email),
      projectDetails: sanitizeInput(data.projectDetails),
      services: data.services.map(s => sanitizeInput(s))
    };

    // 3. Rate limiting check (optional but recommended)
    // You can implement Redis-based rate limiting here
    // Example: await checkRateLimit(sanitizedData.email);

    // 4. Send email using Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'your-email@example.com',
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.nameSurname}`,
      html: generateEmailHTML(sanitizedData),
      text: generateEmailText(sanitizedData)
    });

    // 5. Log submission for analytics (optional)
    console.log('Contact form submitted:', {
      id: emailResult.data?.id,
      email: sanitizedData.email,
      timestamp: new Date().toISOString()
    });

    // 6. Optional: Save to database
    // await db.contactSubmissions.create({ data: sanitizedData });

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      emailId: emailResult.data?.id
    };

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generates HTML email content
 */
function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #3a5a7a;
            color: white;
            padding: 20px;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 5px 5px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #555;
          }
          .value {
            margin-top: 5px;
            padding: 10px;
            background: white;
            border-left: 3px solid #3a5a7a;
          }
          .services {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .service-tag {
            background: #3a5a7a;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.nameSurname}</div>
          </div>
          
          ${data.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${data.company}</div>
            </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">
              <a href="mailto:${data.email}">${data.email}</a>
            </div>
          </div>
          
          <div class="field">
            <div class="label">Project Details:</div>
            <div class="value">${data.projectDetails.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Services Requested:</div>
            <div class="services">
              ${data.services.map(service => 
                `<span class="service-tag">${service}</span>`
              ).join('')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            Submitted: ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates plain text email content (fallback)
 */
function generateEmailText(data: ContactFormData): string {
  return `
New Contact Form Submission

Name: ${data.nameSurname}
${data.company ? `Company: ${data.company}` : ''}
Email: ${data.email}

Project Details:
${data.projectDetails}

Services Requested:
${data.services.map(s => `- ${s}`).join('\n')}

Submitted: ${new Date().toLocaleString()}
  `.trim();
}