import type { User } from "@shared/schema";

const AUTH_STORAGE_KEY = 'helpdesk_user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const authService = {
  login: (email: string, password: string): User | null => {
    // Simple validation - in real app, this would be API call
    if (email && password) {
      const user: User = {
        id: 1,
        email: email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'Support Agent'
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    return null;
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
  }
};
