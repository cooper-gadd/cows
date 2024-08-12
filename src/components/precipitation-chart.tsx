"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type Historical } from "@/lib/types";

interface Observation {
  obsTimeLocal: string;
  imperial: {
    precipTotal: number;
  };
}

interface AggregatedData {
  obsTimeLocal: string;
  precipTotal: number;
}

function aggregateMaxByDay(observations: Observation[]): AggregatedData[] {
  const grouped: Record<string, AggregatedData> = observations.reduce(
    (acc, observation) => {
      const obsDate = new Date(observation.obsTimeLocal).toLocaleDateString(
        "en-US",
      );

      if (!acc[obsDate]) {
        acc[obsDate] = {
          obsTimeLocal: obsDate,
          precipTotal: observation.imperial.precipTotal,
        };
      } else {
        acc[obsDate].precipTotal = Math.max(
          acc[obsDate].precipTotal,
          observation.imperial.precipTotal,
        );
      }

      return acc;
    },
    {} as Record<string, AggregatedData>,
  );

  return Object.values(grouped);
}

export function PrecipitationChart({ data }: { data: Historical }) {
  const maxDataByDay = aggregateMaxByDay(data.observations);

  const chartConfig = {
    precipTotal: {
      label: "Total",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={maxDataByDay}>
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
        <Bar dataKey="precipTotal" fill="var(--color-precipTotal)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
