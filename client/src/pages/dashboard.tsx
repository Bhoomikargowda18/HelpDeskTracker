import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Ticket, 
  CheckCircle, 
  Clock, 
  Loader,
  Plus,
  List,
  Check,
  ChartLine,
  Wrench,
  Users,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { ticketsService } from "@/lib/tickets";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    solvedTickets: 0,
    awaitingApproval: 0,
    inProgress: 0,
  });

  useEffect(() => {
    setStats(ticketsService.getStats());
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tickets"
          value={stats.totalTickets}
          icon={Ticket}
          iconBgColor="bg-blue-100"
          iconColor="text-primary"
        />
        <StatsCard
          title="Solved Tickets"
          value={stats.solvedTickets}
          icon={CheckCircle}
          iconBgColor="bg-green-100"
          iconColor="text-accent"
        />
        <StatsCard
          title="Awaiting Approval"
          value={stats.awaitingApproval}
          icon={Clock}
          iconBgColor="bg-yellow-100"
          iconColor="text-warning"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Loader}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Graph Placeholder */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Resolution Trends</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartLine className="h-16 w-16 text-gray-400 mb-2 mx-auto" />
                <p className="text-gray-500">Performance Chart Placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Stats */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wrench className="text-blue-500 mr-3 h-5 w-5" />
                  <span className="text-sm font-medium text-gray-700">Technical Supports</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-sm font-medium text-gray-700">Operation Team</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">4</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Customer Feedback</span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-600">4.2/5</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/create-ticket">
                <Plus className="mr-2 h-4 w-4" />
                Create Ticket
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/my-tickets">
                <List className="mr-2 h-4 w-4" />
                View My Tickets
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/ticket-approval">
                <Check className="mr-2 h-4 w-4" />
                Approve Tickets
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
