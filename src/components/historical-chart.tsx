"use client";

import { type Historical } from "@/lib/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

function formatObservationTime(obsTimeLocal: string) {
  const date = new Date(obsTimeLocal);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (minutes >= 30) {
    date.setHours(hours + 1);
  }

  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toLocaleString("en-US", { hour: "numeric", hour12: true });
}

export function HistoricalChart({ data }: { data: Historical }) {
  const chartData =
    data?.observations.map((observation, index, arr) => {
      const isLast = index === arr.length - 1;
      return {
        obsTimeLocal: isLast
          ? "Now"
          : formatObservationTime(observation.obsTimeLocal),
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
