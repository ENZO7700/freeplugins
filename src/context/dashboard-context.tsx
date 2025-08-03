'use client';

import * as React from 'react';
import type { Plugin } from '@/components/plugin-list';
import { useAuth } from './auth-context';

export interface Order {
    id: string;
    date: string;
    items: Plugin[];
    total: number;
}

interface DashboardContextType {
  purchasedPlugins: Plugin[];
  orderHistory: Order[];
  addOrder: (order: Order) => void;
  loading: boolean;
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [purchasedPlugins, setPurchasedPlugins] = React.useState<Plugin[]>([]);
  const [orderHistory, setOrderHistory] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // Load data from localStorage when user changes
  React.useEffect(() => {
    if (user) {
        setLoading(true);
        try {
            const historyData = localStorage.getItem(`orderHistory_${user.uid}`);
            const savedHistory = historyData ? JSON.parse(historyData) : [];
            setOrderHistory(savedHistory);

            const allPlugins = savedHistory.flatMap((order: Order) => order.items);
            // Remove duplicates
            const uniquePlugins = allPlugins.filter((plugin: Plugin, index: number, self: Plugin[]) =>
                index === self.findIndex((p) => (
                    p.slug === plugin.slug
                ))
            );
            setPurchasedPlugins(uniquePlugins);
        } catch (error) {
            console.error("Failed to parse dashboard data from localStorage", error);
            setOrderHistory([]);
            setPurchasedPlugins([]);
        } finally {
            setLoading(false);
        }
    } else {
        // Clear data if user logs out
        setOrderHistory([]);
        setPurchasedPlugins([]);
        setLoading(false);
    }
  }, [user]);

  const addOrder = (order: Order) => {
    if (!user) return;

    const newHistory = [...orderHistory, order];
    setOrderHistory(newHistory);
    localStorage.setItem(`orderHistory_${user.uid}`, JSON.stringify(newHistory));

    // Update purchased plugins list
    const allPlugins = newHistory.flatMap(o => o.items);
    const uniquePlugins = allPlugins.filter((plugin, index, self) =>
        index === self.findIndex((p) => p.slug === plugin.slug)
    );
    setPurchasedPlugins(uniquePlugins);
  };

  const value = {
    purchasedPlugins,
    orderHistory,
    addOrder,
    loading
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
