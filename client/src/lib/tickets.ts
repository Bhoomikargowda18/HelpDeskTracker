import type { Ticket, InsertTicket } from "@shared/schema";

const TICKETS_STORAGE_KEY = 'helpdesk_tickets';

export const ticketsService = {
  getTickets: (): Ticket[] => {
    const tickets = localStorage.getItem(TICKETS_STORAGE_KEY);
    return tickets ? JSON.parse(tickets) : [];
  },

  getUserTickets: (userEmail: string): Ticket[] => {
    const allTickets = ticketsService.getTickets();
    return allTickets.filter(ticket => ticket.createdBy === userEmail);
  },

  createTicket: (ticketData: InsertTicket): Ticket => {
    const tickets = ticketsService.getTickets();
    const newTicket: Ticket = {
      id: tickets.length + 1,
      ...ticketData,
      status: 'Open',
      createdAt: new Date(),
    };
    
    tickets.push(newTicket);
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    return newTicket;
  },

  getStats: () => {
    const tickets = ticketsService.getTickets();
    return {
      totalTickets: tickets.length,
      solvedTickets: tickets.filter(t => t.status === 'Resolved').length,
      awaitingApproval: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
    };
  }
};
