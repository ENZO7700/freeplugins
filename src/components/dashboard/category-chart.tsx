
'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Plugin } from '@/components/plugin-list';

interface CategoryChartProps {
  data: Plugin[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

export function CategoryChart({ data: plugins }: CategoryChartProps) {
  const chartData = React.useMemo(() => {
    if (!plugins || plugins.length === 0) return [];

    const categoryCounts = plugins.reduce((acc, plugin) => {
      acc[plugin.category] = (acc[plugin.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [plugins]);

  if (chartData.length === 0) {
    return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
            No category data to display.
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
                background: "hsl(var(--background))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)" 
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
