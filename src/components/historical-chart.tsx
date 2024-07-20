"use client";

import { type Historical } from "@/lib/types";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function HistoricalChart({ data }: { data: Historical }) {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const chartData =
    data?.observations
      .map((observation) => {
        const obsDate = new Date(observation.obsTimeLocal);
        return obsDate >= twentyFourHoursAgo
          ? {
              obsTimeLocal: obsDate.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              }),
              tempAvg: observation.imperial.tempAvg,
            }
          : null;
      })
      .filter((entry) => entry !== null) || [];

  const chartConfig = {
    tempAvg: {
      label: "Temperature",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="obsTimeLocal"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value: string) =>
            `${value.includes("6") || value.includes("12") ? value : ""}`
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <defs>
          <linearGradient id="fillTempAvg" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-tempAvg)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-tempAvg)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="tempAvg"
          type="natural"
          fill="url(#fillTempAvg)"
          fillOpacity={0.4}
          stroke="var(--color-tempAvg)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
