import { Lead, LeadStats } from "@/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    source: "Website",
    interestedVehicle: "Honda Accord 2024",
    budget: "$25,000 - $30,000",
    notes: "Interested in hybrid model. Prefers financing options.",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    priority: "High"
  },
  {
    id: "2", 
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 234-5678",
    status: "Contacted",
    source: "Facebook Ad",
    interestedVehicle: "Toyota RAV4 2024",
    budget: "$30,000 - $35,000",
    notes: "Looking for SUV for family. Wants test drive this weekend.",
    assignedTo: "Mike Chen",
    createdAt: "2024-01-14T14:20:00Z",
    lastContactDate: "2024-01-15T09:00:00Z",
    priority: "High"
  },
  {
    id: "3",
    name: "Robert Wilson",
    email: "robert.wilson@email.com", 
    phone: "+1 (555) 345-6789",
    status: "Qualified",
    source: "Google Ad",
    interestedVehicle: "BMW X5 2024",
    budget: "$50,000+",
    notes: "Pre-approved for financing. Ready to purchase within 2 weeks.",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-13T11:15:00Z",
    lastContactDate: "2024-01-14T16:30:00Z",
    priority: "High"
  },
  {
    id: "4",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 456-7890", 
    status: "Follow Up Required",
    source: "Referral",
    interestedVehicle: "Mercedes C-Class 2024",
    budget: "$40,000 - $45,000",
    notes: "Needs to discuss with spouse. Schedule follow-up call next week.",
    assignedTo: "Tom Rodriguez",
    createdAt: "2024-01-12T13:45:00Z",
    lastContactDate: "2024-01-13T10:15:00Z",
    priority: "Medium"
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 567-8901",
    status: "Not Interested", 
    source: "Twitter",
    interestedVehicle: "Ford F-150 2024",
    budget: "$35,000 - $40,000",
    notes: "Decided to keep current vehicle for another year.",
    assignedTo: "Mike Chen",
    createdAt: "2024-01-11T09:30:00Z",
    lastContactDate: "2024-01-12T14:00:00Z",
    priority: "Low"
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@email.com",
    phone: "+1 (555) 678-9012",
    status: "Sale Completed",
    source: "Website",
    interestedVehicle: "Nissan Altima 2024",
    budget: "$28,000 - $32,000",
    notes: "Purchased Nissan Altima SL. Very satisfied customer.",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-10T15:20:00Z",
    lastContactDate: "2024-01-11T11:30:00Z", 
    priority: "High"
  }
];

export const mockStats: LeadStats = {
  total: 6,
  new: 1,
  contacted: 1,
  qualified: 1,
  notInterested: 1,
  completed: 1
};