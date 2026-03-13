"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  visitors: number;
};

export function DashboardChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            allowDecimals={false} // Чтобы не было 1.5 посетителей
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            cursor={{ stroke: "#f3f4f6", strokeWidth: 2 }}
            labelStyle={{
              color: "#374151",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            name="Посетители"
            stroke="var(--gold, #d4af37)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#fff",
              strokeWidth: 2,
              stroke: "var(--gold, #d4af37)",
            }}
            activeDot={{ r: 6, fill: "var(--gold, #d4af37)", stroke: "#fff" }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
