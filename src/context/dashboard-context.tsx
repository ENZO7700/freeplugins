'use client';

import * as React from 'react';
import type { Plugin } from '@/components/plugin-list';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export interface Order {
    id: string;
    date: string; // Should be ISO string
    items: Plugin[];
    total: number;
    userId: string;
}

interface DashboardContextType {
  purchasedPlugins: Plugin[];
  orderHistory: Order[];
  loading: boolean;
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [purchasedPlugins, setPurchasedPlugins] = React.useState<Plugin[]>([]);
  const [orderHistory, setOrderHistory] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    if (user) {
      setLoading(true);
      
      const q = query(
        collection(db, "orders"), 
        where("userId", "==", user.uid),
        orderBy("orderDate", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders: Order[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            orders.push({
                id: doc.id,
                userId: data.userId,
                // Firestore timestamp to ISO string
                date: data.orderDate.toDate().toISOString(),
                items: data.items,
                total: data.total
            });
        });

        setOrderHistory(orders);

        const allPlugins = orders.flatMap((order: Order) => order.items);
        const uniquePlugins = allPlugins.filter((plugin: Plugin, index: number, self: Plugin[]) =>
            index === self.findIndex((p) => p.slug === plugin.slug)
        );
        setPurchasedPlugins(uniquePlugins);
        setLoading(false);

      }, (error) => {
          console.error("Failed to fetch dashboard data from Firestore", error);
          setOrderHistory([]);
          setPurchasedPlugins([]);
          setLoading(false);
      });

      return () => unsubscribe();

    } else {
        // Clear data if user logs out
        setOrderHistory([]);
        setPurchasedPlugins([]);
        setLoading(false);
    }
  }, [user]);

  const value = {
    purchasedPlugins,
    orderHistory,
    loading
  };

  // We remove addOrder from here, because orders are now added directly in the checkout page.
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
