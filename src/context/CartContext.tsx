"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isRental: boolean;
  isByDozen?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, isByDozen: boolean) => void;
  updateQuantity: (id: number, isByDozen: boolean, newQuantity: number) => void; // Added for +/- controls
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // LocalStorage Persist Load
  useEffect(() => {
    const savedCart = localStorage.getItem('dina_catering_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed parsing cart layout tokens:", e);
      }
    }
  }, []);

  // LocalStorage Persist Sync
  useEffect(() => {
    localStorage.setItem('dina_catering_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === newItem.id && (item.isByDozen || false) === (newItem.isByDozen || false)
      );
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += newItem.quantity;
        return updatedCart;
      }
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (id: number, isByDozen: boolean) => {
    setCart((prevCart) => 
      prevCart.filter(item => !(item.id === id && (item.isByDozen || false) === isByDozen))
    );
  };

  // NEW: Dynamic handler to scale quantities up/down inline
  const updateQuantity = (id: number, isByDozen: boolean, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id, isByDozen);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && (item.isByDozen || false) === isByDozen
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be executed within a CartProvider tier");
  return context;
}
