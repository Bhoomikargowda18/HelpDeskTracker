import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ticketsService } from "@/lib/tickets";
import { authService } from "@/lib/auth";
import type { Ticket } from "@shared/schema";

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setTickets(ticketsService.getUserTickets(user.email));
    }
  }, [user]);

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Resolved':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Inbox className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-6">You haven't created any tickets yet.</p>
          <Button asChild>
            <Link href="/create-ticket">
              <Plus className="mr-2 h-4 w-4" />
              Create your first ticket
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Tickets</h2>
              <Button asChild>
                <Link href="/create-ticket">
                  <Plus className="mr-2 h-4 w-4" />
                  New Ticket
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      #{String(ticket.id).padStart(3, '0')}
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityVariant(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatDate(ticket.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
