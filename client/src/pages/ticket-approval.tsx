import { CheckCircle } from "lucide-react";

export default function TicketApproval() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="text-gray-400 h-12 w-12" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Approval</h2>
      <p className="text-gray-600">
        This section is under development. Ticket approval functionality will be implemented here.
      </p>
    </div>
  );
}
