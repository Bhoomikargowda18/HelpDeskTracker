import { apiRequest } from "@/lib/queryClient";
import type { User, SignUpData } from "@shared/schema";

const AUTH_STORAGE_KEY = 'helpdesk_user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        return null;
      }
      
      const user = await response.json();
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },

  signUp: async (signUpData: SignUpData): Promise<User | null> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signUpData),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        return null;
      }
      
      const user = await response.json();
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Sign up error:", error);
      return null;
    }
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'Admin';
  }
};
