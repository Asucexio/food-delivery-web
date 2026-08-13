"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email && password.length >= 6) {
      setUser({
        id: "user_1",
        name: email.split("@")[0],
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split("@")[0])}&background=ef4444&color=fff`,
        addresses: [
          {
            id: "addr_1",
            label: "Home",
            street: "123 Main Street, Apt 4B",
            city: "New York, NY",
            zip: "10001",
            isDefault: true,
          },
        ],
      });
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (name && email && password.length >= 6) {
      setUser({
        id: "user_1",
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ef4444&color=fff`,
        addresses: [],
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    setUser((prev) => {
      if (!prev) return null;
      const newAddress: Address = {
        ...address,
        id: `addr_${Date.now()}`,
      };
      return {
        ...prev,
        addresses: [...prev.addresses, newAddress],
      };
    });
  }, []);

  const isAuthenticated = !!user;

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    addAddress,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
