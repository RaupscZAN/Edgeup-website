// Add new type for enquirer role
export type EnquirerRole = 'individual' | 'institution' | 'partner';

// Update FormSubmission interface
export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  institution: string;
  submittedAt: string;
  isRead: boolean;
  role: EnquirerRole;
  status: 'new' | 'contacted' | 'in_progress' | 'closed';
  notes?: string;
  followUpDate?: string;
  assignedTo?: string;
}