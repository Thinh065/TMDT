'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Cart } from '../types/cart';
import { mockProducts } from '../data/products';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface CartContextType {
  cart: Cart;
  addToCart: (productId: string, size: number, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: number, color: string) => void;
  updateQuantity: (productId: string, size: number, color: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], totalPrice: 0, totalItems: 0 });

  useEffect(() => {
    // Restore cart from localStorage
    const savedCart = getStorageItem<Cart>('cart', { items: [], totalPrice: 0, totalItems: 0 });
    setCart(savedCart);
  }, []);

  const calculateCartTotals = (items: CartItem[]) => {
    let totalPrice = 0;
    let totalItems = 0;

    items.forEach((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
        totalItems += item.quantity;
      }
    });

    return { totalPrice, totalItems };
  };

  const addToCart = (productId: string, size: number, color: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.items.find(
        (item) => item.productId === productId && item.selectedSize === size && item.selectedColor === color
      );

      let newItems;
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...prev.items, { productId, quantity, selectedSize: size, selectedColor: color }];
      }

      const { totalPrice, totalItems } = calculateCartTotals(newItems);
      const updatedCart = { items: newItems, totalPrice, totalItems };

      setStorageItem('cart', updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string, size: number, color: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter(
        (item) => !(item.productId === productId && item.selectedSize === size && item.selectedColor === color)
      );

      const { totalPrice, totalItems } = calculateCartTotals(newItems);
      const updatedCart = { items: newItems, totalPrice, totalItems };

      setStorageItem('cart', updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId: string, size: number, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        item.productId === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      );

      const { totalPrice, totalItems } = calculateCartTotals(newItems);
      const updatedCart = { items: newItems, totalPrice, totalItems };

      setStorageItem('cart', updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    const emptyCart = { items: [], totalPrice: 0, totalItems: 0 };
    setCart(emptyCart);
    setStorageItem('cart', emptyCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
