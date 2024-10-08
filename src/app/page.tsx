import { CurrentConditions } from "@/components/current-conditions";
import { DailyForecast } from "@/components/daily-forecast";
import { Moo } from "@/components/moo";
import { Precipitation } from "@/components/precipitation";
import { Temperature } from "@/components/temperature";
import { Wind } from "@/components/wind";

export default async function HomePage() {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cowlesville</h2>
        <Moo />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <CurrentConditions />
      </div>
      <DailyForecast />
      <div className="grid gap-4 md:grid-cols-3">
        <Temperature />
        <Precipitation />
        <Wind />
      </div>
    </main>
  );
}
