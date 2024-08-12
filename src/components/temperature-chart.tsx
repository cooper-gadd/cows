"use client";

import { type Historical } from "@/lib/types";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function TemperatureChart({ data }: { data: Historical }) {
  const chartData = data.observations.map((observation) => {
    const obsDate = new Date(observation.obsTimeLocal);
    return {
      obsTimeLocal: obsDate.toLocaleDateString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      tempLow: observation.imperial.tempLow,
      tempHigh: observation.imperial.tempHigh,
    };
  });

  const chartConfig = {
    tempLow: {
      label: "Low",
      color: "hsl(var(--chart-1))",
    },
    tempHigh: {
      label: "High",
      color: "hsl(var(--chart-5))",
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
          <linearGradient id="fillTempLow" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-tempLow)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-tempLow)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillTempHigh" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-tempHigh)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-tempHigh)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="tempLow"
          type="natural"
          fill="url(#fillTempLow)"
          fillOpacity={0.4}
          stroke="var(--color-tempLow)"
        />
        <Area
          dataKey="tempHigh"
          type="natural"
          fill="url(#fillTempHigh)"
          fillOpacity={0.4}
          stroke="var(--color-tempHigh)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
