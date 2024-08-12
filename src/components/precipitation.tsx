import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getHistorical } from "@/lib/data";
import { Droplet } from "lucide-react";
import { PrecipitationChart } from "./precipitation-chart";

export async function Precipitation() {
  const historical = await getHistorical();

  const maxPrecip = Math.max(
    ...historical.observations.map((h) => h.imperial.precipTotal),
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
          <Droplet />
        </CardTitle>
        <CardDescription>
          Showing precipitation for the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <PrecipitationChart data={historical} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Precipitation totals reached up to {maxPrecip}″
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
