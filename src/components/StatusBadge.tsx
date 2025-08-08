import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/types/lead";

interface StatusBadgeProps {
  status: LeadStatus;
}

const getStatusVariant = (status: LeadStatus) => {
  switch (status) {
    case 'New':
      return 'default';
    case 'Contacted':
      return 'secondary';
    case 'Qualified':
      return 'success';
    case 'Not Interested':
      return 'destructive';
    case 'Sale Completed':
      return 'success';
    case 'Follow Up Required':
      return 'warning';
    default:
      return 'default';
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge variant={getStatusVariant(status) as any} className="font-medium">
      {status}
    </Badge>
  );
};