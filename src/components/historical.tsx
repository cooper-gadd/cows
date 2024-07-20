import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { HistoricalChart } from "./historical-chart";
import { getHistorical } from "@/lib/data";

export async function Historical() {
  const historical = await getHistorical();

  return (
    <Card className="col-span-1 md:col-span-4">
      <CardHeader>
        <CardTitle>Backcast</CardTitle>
        <CardDescription>See into the past.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <HistoricalChart data={historical} />
      </CardContent>
    </Card>
  );
}
