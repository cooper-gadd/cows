import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HistoricalChart } from "./historical-chart";
import { getHistorical } from "@/lib/data";

export async function Historical() {
  const today = new Date();
  const historical = await getHistorical({ date: today });

  return (
    <Card className="col-span-1 md:col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <HistoricalChart data={historical} />
      </CardContent>
    </Card>
  );
}
