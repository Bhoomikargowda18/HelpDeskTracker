import { Menu, Users, Bell, Settings, User, LogOut } from "lucide-react";
import { authService } from "@/lib/auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const [, setLocation] = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    setLocation("/login");
  };

  return (
    <header className="shadow-sm border-b border-gray-200" style={{ backgroundColor: 'hsl(171, 60%, 55%)' }}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-gray-200 mr-4"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-black text-white px-3 py-1 rounded text-sm font-medium">
            EM
          </div>
          <div className="flex items-center bg-black text-white px-3 py-1 rounded text-sm font-medium">
            EN
          </div>
          
          <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
            <Users className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
