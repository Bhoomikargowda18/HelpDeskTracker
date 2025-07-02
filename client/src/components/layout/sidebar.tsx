import { Link, useLocation } from "wouter";
import { 
  Home, 
  CheckCircle, 
  Ticket, 
  BarChart3,
  Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Ticket Approval', href: '/ticket-approval', icon: CheckCircle },
  { name: 'My Tickets', href: '/my-tickets', icon: Ticket },
  { name: 'Performance', href: '/performance', icon: BarChart3 },
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
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-center h-16 px-4 bg-primary">
          <div className="flex items-center">
            <Headphones className="text-white text-xl mr-2" />
            <span className="text-white text-lg font-semibold">Helpdesk</span>
          </div>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150",
                    isActive && "bg-blue-50 text-primary"
                  )}
                  onClick={() => onClose()}
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
