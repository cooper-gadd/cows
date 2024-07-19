import { getCurrentConditions } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  CircleGauge,
  Droplet,
  Sun,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";

function calculateWindDirection({ degree }: { degree: number }) {
  const directions = [
    "North",
    "North-Northeast",
    "Northeast",
    "East-Northeast",
    "East",
    "East-Southeast",
    "Southeast",
    "South-Southeast",
    "South",
    "South-Southwest",
    "Southwest",
    "West-Southwest",
    "West",
    "West-Northwest",
    "Northwest",
    "North-Northwest",
  ];
  return directions[Math.round(degree / 22.5) % 16];
}

export async function CurrentConditions() {
  const currentConditions = (await getCurrentConditions()).observations[0]!;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentConditions.imperial.temp}°
          </div>
          <p className="text-xs text-muted-foreground">
            Feels like {currentConditions.imperial.heatIndex}°.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
          <Waves className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentConditions.humidity}%
          </div>
          <p className="text-xs text-muted-foreground">
            Dew point is {currentConditions.imperial.dewpt}
            °.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">UV Index</CardTitle>
          <Sun className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentConditions.uv}</div>
          <p className="text-xs text-muted-foreground">
            {currentConditions.uv <= 2
              ? "Low"
              : currentConditions.uv <= 5
                ? "Moderate"
                : currentConditions.uv <= 7
                  ? "High"
                  : currentConditions.uv <= 10
                    ? "Very High"
                    : "Extreme"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wind</CardTitle>
          <Wind className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentConditions.imperial.windSpeed} mph
          </div>
          <p className="text-xs text-muted-foreground">
            {currentConditions.imperial.windChill}°, gusts up to{" "}
            {currentConditions.imperial.windGust} mph from{" "}
            {calculateWindDirection({
              degree: currentConditions.winddir,
            })}
            .
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Precipitation</CardTitle>
          <Droplet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentConditions.imperial.precipTotal}″
          </div>
          <p className="text-xs text-muted-foreground">
            {currentConditions.imperial.precipTotal === 0 &&
              "No precipitation so far today."}
            {currentConditions.imperial.precipTotal > 0 &&
              currentConditions.imperial.precipRate === 0 &&
              "Precipitation has stopped for now."}
            {currentConditions.imperial.precipTotal > 0 &&
              currentConditions.imperial.precipRate > 0 &&
              `Precipitation rate is ${currentConditions.imperial.precipRate}″ per
                    hour`}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pressure</CardTitle>
          <CircleGauge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentConditions.imperial.pressure} inHg
          </div>
          <p className="text-xs text-muted-foreground">
            {currentConditions.imperial.heatIndex >= 30
              ? "High"
              : currentConditions.imperial.heatIndex <= 29.92
                ? "Low"
                : "Normal"}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
