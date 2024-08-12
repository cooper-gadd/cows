import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getHistorical } from "@/lib/data";
import { TemperatureChart } from "./temperature-chart";
import { Thermometer } from "lucide-react";

export async function Temperature() {
  const historical = await getHistorical();

  const maxTemp = Math.max(
    ...historical.observations.map((h) => h.imperial.tempHigh),
  );
  const minTemp = Math.min(
    ...historical.observations.map((h) => h.imperial.tempLow),
  );

  const dates = historical.observations.map((obs) =>
    new Date(obs.obsTimeLocal).getTime(),
  );
  const maxDate = new Date(Math.max(...dates)).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const minDate = new Date(Math.min(...dates)).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Thermometer />
        </CardTitle>
        <CardDescription>
          Showing temperature for the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <TemperatureChart data={historical} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Temperatures range from {minTemp}° to {maxTemp}°
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {minDate} - {maxDate}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
