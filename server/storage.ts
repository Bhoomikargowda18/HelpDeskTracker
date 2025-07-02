import { users, tickets, userLogs, type User, type InsertUser, type Ticket, type InsertTicket, type UserLog } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Ticket operations
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getTickets(): Promise<Ticket[]>;
  getUserTickets(email: string): Promise<Ticket[]>;
  updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined>;
  
  // User log operations
  createUserLog(log: Partial<UserLog>): Promise<UserLog>;
  getUserLogs(): Promise<UserLog[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  // Ticket operations
  async createTicket(ticketData: InsertTicket): Promise<Ticket> {
    const [ticket] = await db
      .insert(tickets)
      .values(ticketData)
      .returning();
    return ticket;
  }

  async getTickets(): Promise<Ticket[]> {
    return await db.select().from(tickets).orderBy(desc(tickets.createdAt));
  }

  async getUserTickets(email: string): Promise<Ticket[]> {
    return await db.select().from(tickets).where(eq(tickets.createdBy, email)).orderBy(desc(tickets.createdAt));
  }

  async updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket | undefined> {
    const [ticket] = await db
      .update(tickets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(tickets.id, id))
      .returning();
    return ticket || undefined;
  }

  // User log operations
  async createUserLog(logData: Partial<UserLog>): Promise<UserLog> {
    const [log] = await db
      .insert(userLogs)
      .values(logData as any)
      .returning();
    return log;
  }

  async getUserLogs(): Promise<UserLog[]> {
    return await db.select().from(userLogs).orderBy(desc(userLogs.createdAt));
  }
}

export const storage = new DatabaseStorage();
