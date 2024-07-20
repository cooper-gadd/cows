"use client";

import { type Historical } from "@/lib/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function HistoricalChart({ data }: { data: Historical }) {
  const chartData =
    data?.observations.map((observation) => {
      return {
        obsTimeLocal: new Date(observation.obsTimeLocal).getDate(),
        tempHigh: observation.imperial.tempHigh,
        tempLow: observation.imperial.tempLow,
      };
    }) || [];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="obsTimeLocal"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°`}
        />
        <Bar
          dataKey="tempHigh"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="tempLow"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
