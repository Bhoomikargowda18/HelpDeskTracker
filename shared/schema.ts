import { pgTable, text, serial, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("Support Agent"), // Support Agent, Admin
  department: text("department").default("Support"),
  specialty: text("specialty"),
  staffId: text("staff_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(), // low, medium, high
  status: text("status").notNull().default("Open"), // Open, In Progress, Resolved
  category: text("category").default("General"),
  type: text("type").default("Support Request"),
  createdBy: text("created_by").notNull(),
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userLogs = pgTable("user_logs", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  staffId: text("staff_id"),
  department: text("department"),
  activity: text("activity").notNull(),
  signInTime: timestamp("sign_in_time"),
  signOutTime: timestamp("sign_out_time"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
  role: true,
  department: true,
  specialty: true,
  staffId: true,
});

export const insertTicketSchema = createInsertSchema(tickets).pick({
  subject: true,
  description: true,
  priority: true,
  category: true,
  type: true,
  createdBy: true,
}).extend({
  priority: z.enum(["low", "medium", "high"]),
});

export const signUpSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
}).extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;
export type UserLog = typeof userLogs.$inferSelect;
export type SignUpData = z.infer<typeof signUpSchema>;
