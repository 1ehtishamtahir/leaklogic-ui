"use client";

import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface RevenueChartProps {
  data: Array<{ month: string; value: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="month" 
          stroke="#52525B" 
          tick={{ fill: '#71717A', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          stroke="#52525B" 
          tick={{ fill: '#71717A', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 'dataMax + 1000']}
        />
        <Tooltip 
          contentStyle={{
            background: 'rgba(24, 24, 27, 0.95)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '8px',
            color: '#fff',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="url(#lineGradient)" 
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface DonutChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <PieChart width={240} height={240}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
}
