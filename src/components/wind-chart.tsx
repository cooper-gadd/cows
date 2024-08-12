"use client";

import { type Historical } from "@/lib/types";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function WindChart({ data }: { data: Historical }) {
  const chartData = data.observations.map((observation) => {
    const obsDate = new Date(observation.obsTimeLocal);
    return {
      obsTimeLocal: obsDate.toLocaleDateString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      windspeedHigh: observation.imperial.windspeedHigh,
    };
  });

  const chartConfig = {
    windspeedHigh: {
      label: "Speed",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
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
        <Line
          dataKey="windspeedHigh"
          type="natural"
          stroke="var(--color-windspeedHigh)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
