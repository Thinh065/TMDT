'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore user from localStorage
    const savedUser = getStorageItem<User | null>('user', null);
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  const adminAccount = {
    email: 'trannhatthinh2004',
    password: 'TNKzero9',
    name: 'Tran Thinh',
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email và mật khẩu là bắt buộc');
    }

    const isAdmin = email === adminAccount.email && password === adminAccount.password;
    const newUser: User = {
      id: isAdmin ? 'admin-1' : `user-${Date.now()}`,
      email,
      name: isAdmin ? adminAccount.name : email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    setStorageItem('user', newUser);
  };

  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    setStorageItem('user', newUser);
  };

  const logout = () => {
    setUser(null);
    removeStorageItem('user');
    removeStorageItem('cart');
    removeStorageItem('favorites');
    removeStorageItem('orders');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      setStorageItem('user', updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
