'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Restore favorites from localStorage
    const savedFavorites = getStorageItem<string[]>('favorites', []);
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) return prev;
      const updated = [...prev, productId];
      setStorageItem('favorites', updated);
      return updated;
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((id) => id !== productId);
      setStorageItem('favorites', updated);
      return updated;
    });
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    setStorageItem('favorites', []);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
