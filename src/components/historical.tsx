import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { HistoricalChart } from "./historical-chart";
import { getHistorical } from "@/lib/data";
import { TrendingDown, TrendingUp } from "lucide-react";

export async function Historical() {
  const historical = await getHistorical();

  const highTemps = historical.observations
    .map((o) => o.imperial.tempHigh)
    .slice(0, 3);
  const lowTemps = historical.observations
    .map((o) => o.imperial.tempLow)
    .slice(0, 3);

  const averageHighTemp =
    highTemps.reduce((sum, temp) => sum + temp, 0) / highTemps.length;
  const averageLowTemp =
    lowTemps.reduce((sum, temp) => sum + temp, 0) / lowTemps.length;

  const percentageChange =
    ((averageHighTemp - averageLowTemp) / averageLowTemp) * 100;

  return (
    <Card className="col-span-1 md:col-span-4">
      <CardHeader>
        <CardTitle>Backcast</CardTitle>
        <CardDescription>See into the past.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <HistoricalChart data={historical} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {percentageChange < 0 ? (
                <>
                  Trending down by {percentageChange.toFixed(2)}%{" "}
                  <TrendingDown className="h-4 w-4" />
                </>
              ) : (
                <>
                  Trending up by {percentageChange.toFixed(2)}%{" "}
                  <TrendingUp className="h-4 w-4" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Past 7 days
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
