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
    setTouched(new Set(['nameSurname', 'email', 'projectDetails', 'services']));
    setStatus('submitting');
    setStatusMessage('');

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message);

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
      setStatusMessage('Network error. Please try again.');
    }
  };

  const shouldShowError = (fieldName: keyof ContactFormData): boolean => {
    return touched.has(fieldName) && !!errors[fieldName as keyof FormErrors];
  };

  return (
    <div className="fp-comp-contact-form w-full max-w-lg">
      <form
        className="space-y-4"
        aria-label="Contact form"
        onSubmit={(e) => {
          e.preventDefault(); // Stop reload → HTML5 validation still works
          handleSubmit();
        }}
      >
        {/* Name Surname Field */}
        <div>
          <label htmlFor="nameSurname" className="sr-only">Name Surname</label>
          <input
            id="nameSurname"
            name="nameSurname"
            type="text"
            value={formData.nameSurname}
            onChange={handleInputChange}
            onBlur={() => handleBlur('nameSurname')}
            placeholder="Name Surname"
            className="fp-input"
            required
          />
        </div>

        {/* Company (Optional) */}
        <div>
          <label htmlFor="company" className="sr-only">Company</label>
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

        {/* Email */}
        <div>
          <label htmlFor="email" className="sr-only">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            placeholder="E-mail"
            className="fp-input"
            required
          />
        </div>

        {/* Project Details */}
        <div>
          <label htmlFor="projectDetails" className="sr-only">Project details</label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            onBlur={() => handleBlur('projectDetails')}
            placeholder="Tell us about your project"
            rows={3}
            className="fp-input h-[37px] resize-none"
            required
          />
        </div>

        {/* Services */}
        <div>
          <p className="text-white text-[13px] font-medium mb-4">
            Select what services do you need?
          </p>

          <div className="flex flex-wrap gap-x-2 gap-y-2.5">
            {SERVICE_OPTIONS.map((service) => {
              const isSelected = formData.services.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  onBlur={() => handleBlur('services')}
                  className={`px-2.5 py-[5px] rounded-full text-[10px] font-semibold cursor-pointer transition-all duration-400 ${
                    isSelected
                      ? 'bg-white border border-white text-black'
                      : 'bg-transparent text-gray-300 border border-[#E2E3E5] hover:border-gray-300'
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="fp-btn fp-btn-filled-1"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Status */}
        {status === 'success' && (
          <div className="p-4 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg">
            <p className="text-green-300 text-center text-sm">
              {statusMessage}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4">
            <p className="text-red-300 text-center text-sm">
              {statusMessage}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
