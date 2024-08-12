import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getHistorical } from "@/lib/data";
import { Wind as WindIcon } from "lucide-react";
import { WindChart } from "./wind-chart";

export async function Wind() {
  const historical = await getHistorical();

  const maxPrecip = Math.max(
    ...historical.observations.map((h) => h.imperial.windspeedHigh),
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
          <WindIcon />
        </CardTitle>
        <CardDescription>
          Showing wind speed for the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <WindChart data={historical} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Wind speed reached up to {maxPrecip} mph
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
