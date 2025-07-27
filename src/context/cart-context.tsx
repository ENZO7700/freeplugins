'use client';

import * as React from 'react';
import type { Plugin } from '@/components/plugin-list';

interface CartContextType {
  cart: Plugin[];
  addToCart: (plugin: Plugin) => void;
  removeFromCart: (slug: string) => void;
  total: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<Plugin[]>([]);

  const addToCart = (plugin: Plugin) => {
    setCart(prevCart => {
      // Prevent adding the same item multiple times
      if (prevCart.find(item => item.slug === plugin.slug)) {
        return prevCart;
      }
      return [...prevCart, plugin];
    });
  };

  const removeFromCart = (slug: string) => {
    setCart(prevCart => prevCart.filter(item => item.slug !== slug));
  };

  const total = React.useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return acc + price;
    }, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
