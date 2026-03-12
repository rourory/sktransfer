// app/admin/(dashboard)/chart.client.tsx
"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockData =[
  { name: "Пн", visitors: 120 },
  { name: "Вт", visitors: 180 },
  { name: "Ср", visitors: 150 },
  { name: "Чт", visitors: 210 },
  { name: "Пт", visitors: 280 },
  { name: "Сб", visitors: 350 },
  { name: "Вс", visitors: 310 },
]

export function DashboardChart() {
  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="visitors" 
            name="Посетители"
            stroke="var(--gold, #d4af37)" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: 'var(--gold, #d4af37)' }}
            activeDot={{ r: 6, fill: 'var(--gold, #d4af37)', stroke: '#fff' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}