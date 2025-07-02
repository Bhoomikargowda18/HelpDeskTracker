import { authService } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      setLocation("/login");
    }
  }, [setLocation]);

  if (!authService.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
