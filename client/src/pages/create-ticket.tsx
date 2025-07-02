import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTicketSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ticketsService } from "@/lib/tickets";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import type { InsertTicket } from "@shared/schema";

const createTicketSchema = insertTicketSchema.omit({ createdBy: true });

export default function CreateTicket() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const user = authService.getCurrentUser();

  const form = useForm<Omit<InsertTicket, 'createdBy'>>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "medium",
    },
  });

  const handleSubmit = async (data: Omit<InsertTicket, 'createdBy'>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a ticket.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const ticketData: InsertTicket = {
        ...data,
        createdBy: user.email,
      };
      
      const createdTicket = await ticketsService.createTicket(ticketData);
      
      if (createdTicket) {
        toast({
          title: "Success",
          description: "Ticket created successfully!",
        });
        setLocation("/my-tickets");
      } else {
        toast({
          title: "Error",
          description: "Failed to create ticket. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md border-2 border-blue-400 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Ticket</h2>
        
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ticketNo" className="text-gray-700 font-medium">Ticket No.</Label>
              <Input
                id="ticketNo"
                value="Auto-generated"
                disabled
                className="mt-1 bg-gray-200 text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-gray-700 font-medium">Date:</Label>
              <Input
                id="date"
                value={new Date().toLocaleDateString()}
                disabled
                className="mt-1 bg-gray-200 text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">Name:</Label>
              <Input
                id="name"
                value={user?.name || ""}
                disabled
                className="mt-1 bg-gray-200 text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="department" className="text-gray-700 font-medium">Department:</Label>
              <Input
                id="department"
                value="Support"
                disabled
                className="mt-1 bg-gray-200 text-gray-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subject" className="text-gray-700 font-medium">Subject:</Label>
            <Input
              id="subject"
              {...form.register("subject")}
              placeholder=""
              className="mt-1 bg-gray-200"
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category" className="text-gray-700 font-medium">Category:</Label>
              <Input
                id="category"
                value="General"
                disabled
                className="mt-1 bg-gray-200 text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-gray-700 font-medium">Type:</Label>
              <Input
                id="type"
                value="Support Request"
                disabled
                className="mt-1 bg-gray-200 text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="priority" className="text-gray-700 font-medium">Priority:</Label>
              <Select
                value={form.watch("priority")}
                onValueChange={(value) => form.setValue("priority", value as "low" | "medium" | "high")}
              >
                <SelectTrigger className="mt-1 bg-gray-200">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.priority && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.priority.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium">Description:</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={5}
                placeholder=""
                className="mt-1 bg-gray-200 resize-vertical"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 text-white font-medium rounded"
              style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}
            >
              {isSubmitting ? "Creating..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
