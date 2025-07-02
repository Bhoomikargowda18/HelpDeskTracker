import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">List of Ticket</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Find ticket"
                className="w-64 bg-gray-200"
              />
              <Button variant="ghost" size="icon" className="bg-gray-200">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>Show:</span>
              <select className="border border-gray-300 rounded px-2 py-1 bg-gray-200">
                <option>10</option>
              </select>
              <span>Entries</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-300">
                  <TableHead className="font-bold">Ticket No.</TableHead>
                  <TableHead className="font-bold">Subject</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Support by</TableHead>
                  <TableHead className="font-bold">Date</TableHead>
                  <TableHead className="font-bold">Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.length > 0 ? tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-gray-50 border-b border-gray-200">
                    <TableCell className="font-medium text-blue-600">
                      <Link href="#" className="hover:underline">
                        {String(ticket.id).padStart(4, '0')}
                      </Link>
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`px-3 py-1 rounded text-white text-xs ${
                          ticket.status === 'Open' ? 'bg-green-500' : 
                          ticket.status === 'In Progress' ? 'bg-green-500' : 
                          ticket.status === 'Resolved' ? 'bg-gray-500' : 'bg-blue-600'
                        }`}
                      >
                        {ticket.status === 'Open' ? 'In Progress' : ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-sm">Tech</div>
                        <div className="text-sm">support</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {formatDate(ticket.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex text-yellow-400">
                        {'★★★★☆'.split('').map((star, i) => (
                          <span key={i} className={i < 4 ? 'text-yellow-400' : 'text-gray-300'}>
                            {star}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No tickets found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {tickets.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div>Showing 1 to {tickets.length} of {tickets.length} entries</div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 border rounded">«</button>
                <button className="px-2 py-1 border rounded bg-gray-200">1</button>
                <button className="px-2 py-1 border rounded">»</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
