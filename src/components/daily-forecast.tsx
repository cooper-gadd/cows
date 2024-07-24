import { getDailyForecast } from "@/lib/data";
import {
  Tornado,
  CloudLightning,
  CloudSnow,
  CloudDrizzle,
  CloudRain,
  CloudHail,
  Waves,
  Wind,
  Cloudy,
  CloudMoon,
  CloudSun,
  MoonStar,
  Sun,
  CloudSunRain,
  CloudOff,
  CloudMoonRain,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function getIcon({ code }: { code: number }) {
  switch (code) {
    case 0:
    case 1:
    case 2:
      return <Tornado />;
    case 3:
    case 4:
      return <CloudLightning />;
    case 5:
    case 6:
    case 7:
    case 8:
    case 13:
    case 14:
    case 15:
    case 16:
    case 42:
    case 43:
      return <CloudSnow />;
    case 9:
      return <CloudDrizzle />;
    case 10:
    case 11:
    case 12:
    case 39:
    case 40:
      return <CloudRain />;
    case 17:
    case 18:
    case 35:
      return <CloudHail />;
    case 19:
    case 20:
    case 21:
    case 22:
      return <Waves />;
    case 23:
    case 24:
    case 25:
      return <Wind />;
    case 26:
      return <Cloudy />;
    case 27:
    case 29:
    case 33:
      return <CloudMoon />;
    case 28:
    case 30:
    case 34:
      return <CloudSun />;
    case 31:
      return <MoonStar />;
    case 32:
    case 36:
      return <Sun />;
    case 37:
    case 38:
    case 41:
      return <CloudSunRain />;
    case 44:
      return <CloudOff />;
    case 45:
    case 46:
    case 47:
      return <CloudMoonRain />;
    default:
      return null;
  }
}

export async function DailyForecast() {
  const dailyForecast = await getDailyForecast();

  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
        <CardDescription>See into the future.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Array.from({ length: 6 }, (_, i) => {
            const icon =
              dailyForecast.daypart[0]!.iconCode[i] === null
                ? getIcon({
                    code: dailyForecast.daypart[0]!.iconCode[i + 1]!,
                  })
                : getIcon({
                    code: dailyForecast.daypart[0]!.iconCode[i * 2]!,
                  });

            const day =
              dailyForecast.daypart[0]!.daypartName[i] === null
                ? dailyForecast.daypart[0]!.daypartName[i + 1]
                : dailyForecast.daypart[0]!.daypartName[i * 2];

            const narrative = dailyForecast.narrative[i]!.split(".")[0] + ".";
            const lowTemp = dailyForecast.calendarDayTemperatureMin[i];
            const highTemp = dailyForecast.calendarDayTemperatureMax[i];

            return (
              <div key={i} className="flex items-center">
                <div className="h-9 w-9">{icon}</div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{day}</p>
                  <p className="hidden text-sm text-muted-foreground md:block">
                    {narrative}
                  </p>
                </div>
                <div className="ml-auto flex flex-row font-medium">
                  <p className="text-muted-foreground">{lowTemp}°</p>
                  <span className="mx-1 text-muted-foreground">/</span>
                  <p>{highTemp}°</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
