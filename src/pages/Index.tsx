import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LeadListing } from "@/components/LeadListing";
import { LeadDetails } from "@/components/LeadDetails";
import { Dashboard } from "@/components/Dashboard";
import { Lead } from "@/types/lead";
import { mockLeads } from "@/data/mockData";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<string>("leads");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
  };

  const handleBackToListing = () => {
    setSelectedLead(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedLead(null);
  };

  const renderContent = () => {
    if (selectedLead) {
      return (
        <LeadDetails 
          lead={selectedLead}
          onBack={handleBackToListing}
          onUpdateLead={handleUpdateLead}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
      default:
        return <LeadListing onViewLead={handleViewLead} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
