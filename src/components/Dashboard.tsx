import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, TrendingUp, Target, Phone, Mail, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { mockLeads, mockStats } from "@/data/mockData";
import { Lead } from "@/types/lead";

export const Dashboard = () => {
  const totalRevenue = mockLeads
    .filter(lead => lead.status === "Sale Completed")
    .reduce((sum, lead) => {
      const budget = lead.budget.replace(/[\$,\-\+]/g, '').split(' ')[0];
      return sum + (parseInt(budget) || 30000);
    }, 0);

  const conversionRate = Math.round((mockStats.completed / mockStats.total) * 100);
  
  const recentActivities = mockLeads
    .filter(lead => lead.lastContactDate)
    .sort((a, b) => new Date(b.lastContactDate!).getTime() - new Date(a.lastContactDate!).getTime())
    .slice(0, 5);

  const topSalesAgents = ['Sarah Johnson', 'Mike Chen', 'Tom Rodriguez']
    .map(agent => ({
      name: agent,
      leads: mockLeads.filter(lead => lead.assignedTo === agent).length,
      sales: mockLeads.filter(lead => lead.assignedTo === agent && lead.status === "Sale Completed").length
    }))
    .sort((a, b) => b.sales - a.sales);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500';
      case 'Contacted': return 'bg-yellow-500';
      case 'Qualified': return 'bg-green-500';
      case 'Not Interested': return 'bg-red-500';
      case 'Sale Completed': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of lead performance and sales analytics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-success">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-success">
                <ArrowUp className="h-3 w-3 mr-1" />
                +2.3%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-success">
                <ArrowUp className="h-3 w-3 mr-1" />
                +18%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.total - mockStats.completed - mockStats.notInterested}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center text-warning">
                <ArrowDown className="h-3 w-3 mr-1" />
                -5%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lead Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries({
                'New': mockStats.new,
                'Contacted': mockStats.contacted,
                'Qualified': mockStats.qualified,
                'Not Interested': mockStats.notInterested,
                'Sale Completed': mockStats.completed
              }).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(status)}`} />
                    <span className="text-sm font-medium">{status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{count}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((count / mockStats.total) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Sales Agents */}
        <Card>
          <CardHeader>
            <CardTitle>Top Sales Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSalesAgents.map((agent, index) => (
                <div key={agent.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{agent.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{agent.sales} Sales</div>
                    <div className="text-xs text-muted-foreground">{agent.leads} Total Leads</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                    {lead.status === 'Contacted' ? (
                      <Phone className="h-4 w-4" />
                    ) : lead.status === 'Sale Completed' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Status updated to: {lead.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(lead.lastContactDate!).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};