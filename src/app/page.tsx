import { CurrentConditions } from "@/components/current-conditions";
import { DailyForecast } from "@/components/daily-forecast";
import { Moo } from "@/components/moo";
import { Temperature } from "@/components/temperature";

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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-4">
          <Temperature />
        </div>
        <DailyForecast />
      </div>
    </main>
  );
}
