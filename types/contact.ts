export interface ContactFormData {
  nameSurname: string;
  company: string;
  email: string;
  projectDetails: string;
  services: string[];
}

export interface FormErrors {
  nameSurname?: string;
  email?: string;
  projectDetails?: string;
  services?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  errors?: FormErrors;
  emailId?: string;
  error?: string;
}