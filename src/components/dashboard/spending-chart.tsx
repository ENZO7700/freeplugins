
'use client';

import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Order } from '@/context/dashboard-context';

interface SpendingChartProps {
  data: Order[];
}

export function SpendingChart({ data: orders }: SpendingChartProps) {
  const chartData = React.useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const monthlySpending = orders.reduce((acc, order) => {
      const month = new Date(order.date).toLocaleString('default', { month: 'short', year: '2-digit' });
      acc[month] = (acc[month] || 0) + order.total;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(monthlySpending).map(([name, total]) => ({
      name,
      total,
    })).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [orders]);

   if (chartData.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
            No spending data to display.
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
            <BarChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 20,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    contentStyle={{ 
                        background: "hsl(var(--background))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)" 
                    }}
                />
                <Legend wrapperStyle={{fontSize: "14px"}}/>
                <Bar dataKey="total" fill="hsl(var(--primary))" name="Total Spent ($)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
