import { useState } from "react";
import { Lead, LeadStatus } from "@/types/lead";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, Calendar, User, Car, DollarSign, Globe, FileText, Save, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LeadDetailsProps {
  lead: Lead;
  onBack: () => void;
  onUpdateLead: (updatedLead: Lead) => void;
}

export const LeadDetails = ({ lead, onBack, onUpdateLead }: LeadDetailsProps) => {
  const [currentLead, setCurrentLead] = useState<Lead>(lead);
  const [newNote, setNewNote] = useState("");
  const { toast } = useToast();

  const handleStatusChange = (newStatus: LeadStatus) => {
    const updatedLead = {
      ...currentLead,
      status: newStatus,
      lastContactDate: new Date().toISOString()
    };
    setCurrentLead(updatedLead);
    onUpdateLead(updatedLead);
    
    toast({
      title: "Status Updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const updatedLead = {
      ...currentLead,
      notes: currentLead.notes + `\n\n[${new Date().toLocaleString()}] ${newNote}`,
      lastContactDate: new Date().toISOString()
    };
    setCurrentLead(updatedLead);
    setNewNote("");
    onUpdateLead(updatedLead);
    
    toast({
      title: "Note Added",
      description: "Your note has been saved successfully",
    });
  };

  const statusOptions: LeadStatus[] = ["New", "Contacted", "Qualified", "Not Interested", "Sale Completed", "Follow Up Required"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listing
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lead Details</h2>
          <p className="text-muted-foreground">
            Complete information and management for {currentLead.name}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lead Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                <div className="flex items-center gap-2">
                  <StatusBadge status={currentLead.status} />
                  <Badge variant="outline" className="text-xs">
                    {currentLead.priority} Priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-lg font-semibold">{currentLead.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned To</label>
                  <p className="text-lg">{currentLead.assignedTo}</p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm">{currentLead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-sm">{currentLead.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle & Budget Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Interest & Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Interested Vehicle</label>
                    <p className="font-semibold">{currentLead.interestedVehicle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                    <p className="font-semibold text-success">{currentLead.budget}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Lead Source</label>
                  <p className="text-sm">{currentLead.source}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notes & Communication History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Existing Notes</label>
                <div className="p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                  {currentLead.notes || "No notes available"}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Add New Note</label>
                <Textarea
                  placeholder="Enter your notes about this lead..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Management & Timeline */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Lead Status Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Current Status
                </label>
                <Select value={currentLead.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">Lead Created</p>
                    <p className="text-muted-foreground">
                      {new Date(currentLead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {currentLead.lastContactDate && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    <div>
                      <p className="font-medium">Last Contact</p>
                      <p className="text-muted-foreground">
                        {new Date(currentLead.lastContactDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Customer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};