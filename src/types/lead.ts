export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  interestedVehicle: string;
  budget: string;
  notes: string;
  assignedTo: string;
  createdAt: string;
  lastContactDate?: string;
  priority: 'High' | 'Medium' | 'Low';
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Not Interested' | 'Sale Completed' | 'Follow Up Required';

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  notInterested: number;
  completed: number;
}