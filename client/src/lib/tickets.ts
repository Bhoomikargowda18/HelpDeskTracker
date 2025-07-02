import type { Ticket, InsertTicket } from "@shared/schema";

export const ticketsService = {
  getTickets: async (): Promise<Ticket[]> => {
    try {
      const response = await fetch("/api/tickets");
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return [];
    }
  },

  getUserTickets: async (userEmail: string): Promise<Ticket[]> => {
    try {
      const response = await fetch(`/api/tickets/user/${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      return [];
    }
  },

  createTicket: async (ticketData: InsertTicket): Promise<Ticket | null> => {
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error creating ticket:", error);
      return null;
    }
  },

  getStats: async () => {
    const tickets = await ticketsService.getTickets();
    return {
      totalTickets: tickets.length,
      solvedTickets: tickets.filter(t => t.status === 'Resolved').length,
      awaitingApproval: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
    };
  }
};
