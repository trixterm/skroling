"use client";

import React, { useState } from 'react';
import { submitContactForm } from '@/actions/contact';
// Importing types. If ContactFormData requires fields not present in this design
// (like services), we will handle that in the state initialization.
import type { ContactFormData, FormErrors } from '@/types/contact';

// Define the specific shape for this form's state, 
// focusing only on the fields visible in the screenshot.
interface MinimalFormData {
  email: string;
  projectDetails: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm2: React.FC = () => {
  // We initialize only the fields required by this specific design.
  // When submitting, we will merge this with default values for the omitted fields 
  // to satisfy the ContactFormData type required by the server action.
  const [formData, setFormData] = useState<MinimalFormData>({
    email: '',
    projectDetails: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [touched, setTouched] = useState<Set<keyof MinimalFormData>>(new Set());

  // Generalized input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field immediately upon user interaction
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Mark field as touched on blur for validation timing
  const handleBlur = (fieldName: keyof MinimalFormData): void => {
    setTouched(prev => new Set(prev).add(fieldName));
  };

  const handleSubmit = async (): Promise<void> => {
    // Mark all visible fields as touched to trigger validation UI if empty
    setTouched(new Set(['email', 'projectDetails']));
    
    // Basic Client-side validation check
    if (!formData.email || !formData.projectDetails) {
        setStatus('error');
        setStatusMessage('Please fill in all required fields.');
        return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      // Construct the full payload expected by the server action.
      // We provide defaults for fields that exist in the original type but are hidden here.
      const payload: ContactFormData = {
        email: formData.email,
        projectDetails: formData.projectDetails,
        nameSurname: 'Anonymous Web User', // Default or Hidden value
        company: '',                         // Optional in original
        services: []                         // Empty array as per original type definition
      };

      const result = await submitContactForm(payload);

      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message || 'Message sent successfully!');

        // Reset form after a delay to show success state
        setTimeout(() => {
          setFormData({
            email: '',
            projectDetails: ''
          });
          setTouched(new Set());
          setStatus('idle');
          setStatusMessage('');
        }, 3000);

      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Something went wrong.');

        if (result.errors) {
          setErrors(result.errors);
        }
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setStatusMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-2xl mt-6 mx-auto">
      <form
        className="flex flex-col gap-y-3"
        aria-label="Simplified contact form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Email Field Container - Matches the top white box in screenshot */}
        <div className="relative group">
          <label htmlFor="email" className="sr-only">Enter your email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            placeholder="Enter your email"
            className={`w-full bg-white rounded-[12px] px-8 py-6 text-gray-800 placeholder-gray-500 outline-none transition-shadow duration-300 focus:ring-2 focus:ring-black/5 ${
                touched.has('email') && errors.email ? 'ring-2 ring-red-300' : ''
            }`}
            required
          />
           {touched.has('email') && errors.email && (
            <span className="absolute right-6 top-6 text-red-500 text-xs font-medium">
              {errors.email}
            </span>
          )}
        </div>

        {/* Message & Submit Container - Matches the bottom large white box in screenshot */}
        <div className={`relative bg-white rounded-3xl p-2 transition-shadow duration-300 focus-within:ring-2 focus-within:ring-black/5 ${
             touched.has('projectDetails') && errors.projectDetails ? 'ring-2 ring-red-300' : ''
        }`}>
          <label htmlFor="projectDetails" className="sr-only">Type your message here</label>
          
          {/* Textarea occupies the top/middle space */}
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            onBlur={() => handleBlur('projectDetails')}
            placeholder="Type your message here"
            rows={5}
            className="w-full bg-transparent px-6 py-4 text-gray-800 placeholder-gray-500 outline-none resize-none"
            required
          />

          {/* Submit Button - Positioned inside the container at bottom right */}
          <div className="flex justify-between items-end px-4 pb-2">
            
            {/* Error Message Area (Left side of footer) */}
            <div className="flex-1 pl-2">
                 {status === 'error' && (
                    <p className="text-red-500 text-sm animate-pulse">{statusMessage}</p>
                 )}
                 {status === 'success' && (
                    <p className="text-green-500 text-sm">{statusMessage}</p>
                 )}
            </div>

            {/* Submit Button (Right side of footer) */}
            <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="bg-[#1a1a1a] text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-black transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ContactForm2;