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
  const chartData = data.observations.map((observation) => {
    const obsDate = new Date(observation.obsTimeLocal);
    return {
      obsTimeLocal: obsDate.toLocaleDateString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      tempAvg: observation.imperial.tempAvg,
    };
  });

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
          tickFormatter={(value: string) => value.replace(value, "")}
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
