'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { apiClient, clearAuth, onAuthEvent, setAuthToken } from '../services/apiClient';
import { endpoints } from '../constants/endpoint';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: User, expiresIn?: number) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;
  const [loading, setLoading] = useState(true);

  // Restore session on page refresh
  useEffect(() => {
    async function restoreSession() {
      try {
        const res = await apiClient.post(endpoints.auth.refresh);

        const { accessToken, expiresIn, user } = res.data.data;

        setAuthToken(accessToken, expiresIn);
        setUser(user);
      } catch {
        clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  // Listen to auth events
  useEffect(() => {
    return onAuthEvent((event) => {
      if (event.type === 'logout') {
        setUser(null);
      }
    });
  }, []);

  // Called after successful login
  const login = (token: string, user: User, expiresIn?: number) => {
    setAuthToken(token, expiresIn);
    setUser(user);
  };

  // Logout
  const logout = async () => {
    try {
      await apiClient.post(endpoints.auth.logout);
    } catch {}

    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
