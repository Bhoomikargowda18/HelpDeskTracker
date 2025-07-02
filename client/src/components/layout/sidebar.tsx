import { Link, useLocation } from "wouter";
import { 
  Home, 
  CheckCircle, 
  Ticket, 
  BarChart3,
  Database,
  Settings,
  FileText,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authService } from "@/lib/auth";

const regularNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Ticket Approval', href: '/ticket-approval', icon: CheckCircle },
  { name: 'My Tickets', href: '/my-tickets', icon: Ticket },
  { name: 'Performance', href: '/performance', icon: BarChart3 },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Database', href: '/admin/database', icon: Database },
  { name: 'Setting', href: '/admin/settings', icon: Settings },
  { name: 'User Log History', href: '/admin/user-logs', icon: FileText },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gray-300 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-start h-16 px-4" style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}>
          <div className="flex items-center">
            <span className="text-white text-xl font-bold italic">Helpdesk</span>
          </div>
        </div>
        
        <nav className="mt-0">
          <div className="space-y-0">
            {(authService.isAdmin() ? adminNavigation : regularNavigation).map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-black border-b border-gray-400 hover:bg-gray-200 transition-colors duration-150",
                    isActive && "bg-gray-200 border-l-4 border-l-gray-700"
                  )}
                  onClick={() => onClose()}
                >
                  <item.icon className="mr-3 h-5 w-5 text-black" />
                  {item.name}
                </Link>
              );
            })}
            
            {authService.isAdmin() && (
              <div className="mt-4 border-t border-gray-400 pt-4">
                <Link
                  href="/admin/profile"
                  className={cn(
                    "flex items-center px-4 py-3 text-black border-b border-gray-400 hover:bg-gray-200 transition-colors duration-150",
                    location === "/admin/profile" && "bg-gray-200 border-l-4 border-l-gray-700"
                  )}
                  onClick={() => onClose()}
                >
                  <User className="mr-3 h-5 w-5 text-black" />
                  User Profile
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
