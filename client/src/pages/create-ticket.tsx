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
      
      ticketsService.createTicket(ticketData);
      
      toast({
        title: "Success",
        description: "Ticket created successfully!",
      });
      
      setLocation("/my-tickets");
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
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Ticket</h2>
          
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                {...form.register("subject")}
                placeholder="Enter ticket subject"
                className="mt-1"
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={5}
                placeholder="Describe the issue in detail..."
                className="mt-1 resize-vertical"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={form.watch("priority")}
                onValueChange={(value) => form.setValue("priority", value as "low" | "medium" | "high")}
              >
                <SelectTrigger className="mt-1">
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

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setLocation("/dashboard")}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Ticket"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
