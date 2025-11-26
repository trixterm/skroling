"use client";

import React, { useState } from 'react';
import { submitContactForm } from '@/actions/contact';
import type { ContactFormData, FormErrors } from '@/types/contact';

const SERVICE_OPTIONS = [
  'UX/UI Design',
  'Development',
  'Branding design',
  'Full service',
  'Help me decide'
] as const;

type ServiceOption = typeof SERVICE_OPTIONS[number];
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nameSurname: '',
    company: '',
    email: '',
    projectDetails: '',
    services: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [touched, setTouched] = useState<Set<keyof ContactFormData>>(new Set());

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceToggle = (service: ServiceOption): void => {
    setFormData(prev => {
      const isSelected = prev.services.includes(service);
      return {
        ...prev,
        services: isSelected
          ? prev.services.filter(s => s !== service)
          : [...prev.services, service]
      };
    });

    if (errors.services) {
      setErrors(prev => ({ ...prev, services: undefined }));
    }
  };

  const handleBlur = (fieldName: keyof ContactFormData): void => {
    setTouched(prev => new Set(prev).add(fieldName));
  };

  const handleSubmit = async (): Promise<void> => {
    // Mark all fields as touched
    setTouched(new Set(['nameSurname', 'email', 'projectDetails', 'services']));
    
    setStatus('submitting');
    setStatusMessage('');
    
    try {
      // Call Server Action
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            nameSurname: '',
            company: '',
            email: '',
            projectDetails: '',
            services: []
          });
          setTouched(new Set());
          setStatus('idle');
          setStatusMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setStatusMessage(result.message);
        
        if (result.errors) {
          setErrors(result.errors);
        }
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const shouldShowError = (fieldName: keyof ContactFormData): boolean => {
    return touched.has(fieldName) && !!errors[fieldName as keyof FormErrors];
  };

  return (
    <div className="fp-comp-contact-form w-full max-w-lg">
      <div 
        className="space-y-4"
        role="form"
        aria-label="Contact form"
        onKeyDown={handleKeyDown}
      >
        {/* Name Surname Field */}
        <div>
          <label htmlFor="nameSurname" className="sr-only">
            Name Surname
          </label>
          <input
            id="nameSurname"
            name="nameSurname"
            type="text"
            value={formData.nameSurname}
            onChange={handleInputChange}
            onBlur={() => handleBlur('nameSurname')}
            placeholder="Name Surname"
            className="fp-input"
            aria-invalid={shouldShowError('nameSurname')}
            aria-describedby={shouldShowError('nameSurname') ? 'nameSurname-error' : undefined}
            aria-required="true"
          />
          {shouldShowError('nameSurname') && (
            <p id="nameSurname-error" className="mt-1 text-[10px] text-red-300" role="alert">
              {errors.nameSurname}
            </p>
          )}
        </div>

        {/* Company Field (Optional) */}
        <div>
          <label htmlFor="company" className="sr-only">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company (optional)"
            className="fp-input"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            placeholder="E-mail"
            className="fp-input"
            aria-invalid={shouldShowError('email')}
            aria-describedby={shouldShowError('email') ? 'email-error' : undefined}
            aria-required="true"
          />
          {shouldShowError('email') && (
            <p id="email-error" className="mt-1 text-[10px] text-red-300" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Project Details Field */}
        <div>
          <label htmlFor="projectDetails" className="sr-only">
            Tell us about your project
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            onBlur={() => handleBlur('projectDetails')}
            placeholder="Tell us about your project"
            rows={3}
            className="fp-input h-[40px] resize-none"
            aria-invalid={shouldShowError('projectDetails')}
            aria-describedby={shouldShowError('projectDetails') ? 'projectDetails-error' : undefined}
            aria-required="true"
          />
          {shouldShowError('projectDetails') && (
            <p id="projectDetails-error" className="mt-1 text-[10px] text-red-300" role="alert">
              {errors.projectDetails}
            </p>
          )}
        </div>

        {/* Services Selection */}
        <div>
          <div role="group" aria-labelledby="services-label">
            <p id="services-label" className="text-white text-[13px] font-medium mb-4">
              Select what services do you need?
            </p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    onBlur={() => handleBlur('services')}
                    className={`px-[10px] py-[5px] rounded-full text-[10px] font-medium cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-1 border-white text-[#000]'
                        : 'bg-transparent text-gray-300 border-1 border-[#E2E3E5] hover:border-gray-300'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`${service}${isSelected ? ', selected' : ''}`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
            {shouldShowError('services') && (
              <p className="mt-2 text-[10px] text-red-300" role="alert">
                {errors.services}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="fp-btn fp-btn-filled-1"
            aria-busy={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="p-4 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg" role="status">
            <p className="text-green-300 text-center text-sm">
              ✓ {statusMessage}
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="p-4 bg-red-500 bg-opacity-20 border border-red-400 rounded-lg" role="alert">
            <p className="text-red-300 text-center text-sm">
              ✗ {statusMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;