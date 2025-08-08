import { useState } from "react";
import { Lead } from "@/types/lead";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Phone, Mail, Calendar, User } from "lucide-react";
import { mockLeads } from "@/data/mockData";

interface LeadListingProps {
  onViewLead: (lead: Lead) => void;
}

export const LeadListing = ({ onViewLead }: LeadListingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.interestedVehicle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["all", "New", "Contacted", "Qualified", "Follow Up Required", "Not Interested", "Sale Completed"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lead Listing</h2>
          <p className="text-muted-foreground">
            Manage and track all customer leads in one place
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Leads: <span className="font-semibold text-foreground">{filteredLeads.length}</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads by name, email, or vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="capitalize"
                >
                  {status === "all" ? "All Status" : status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{lead.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={lead.status} />
                    <Badge variant="outline" className="text-xs">
                      {lead.priority} Priority
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {lead.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {lead.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3 w-3" />
                  Assigned to: {lead.assignedTo}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Vehicle:</span> {lead.interestedVehicle}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Budget:</span> {lead.budget}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Source:</span> {lead.source}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(lead.createdAt).toLocaleDateString()}
                </div>
                <Button size="sm" onClick={() => onViewLead(lead)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No leads found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};