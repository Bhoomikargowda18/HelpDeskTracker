import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ProtectedRoute } from "@/components/layout/protected-route";

// Pages
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import CreateTicket from "@/pages/create-ticket";
import MyTickets from "@/pages/my-tickets";
import TicketApproval from "@/pages/ticket-approval";
import Performance from "@/pages/performance";
import NotFound from "@/pages/not-found";

const getPageTitle = (pathname: string): string => {
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/create-ticket': 'Create Ticket',
    '/my-tickets': 'My Tickets',
    '/ticket-approval': 'Ticket Approval',
    '/performance': 'Performance',
  };
  return titles[pathname] || 'Dashboard';
};

function AppLayout({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Topbar 
          title={getPageTitle(pathname)}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 p-6">
          {children}
        </main>
        
        <footer className="text-center py-3 text-black text-sm font-medium" style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}>
          Footer Area
        </footer>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      <Route path="/dashboard">
        {(params) => (
          <ProtectedRoute>
            <AppLayout pathname="/dashboard">
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/create-ticket">
        {(params) => (
          <ProtectedRoute>
            <AppLayout pathname="/create-ticket">
              <CreateTicket />
            </AppLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/my-tickets">
        {(params) => (
          <ProtectedRoute>
            <AppLayout pathname="/my-tickets">
              <MyTickets />
            </AppLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/ticket-approval">
        {(params) => (
          <ProtectedRoute>
            <AppLayout pathname="/ticket-approval">
              <TicketApproval />
            </AppLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/performance">
        {(params) => (
          <ProtectedRoute>
            <AppLayout pathname="/performance">
              <Performance />
            </AppLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/">
        {(params) => (
          <ProtectedRoute>
            <AppLayout pathname="/dashboard">
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
