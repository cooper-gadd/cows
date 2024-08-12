import "server-only";
import { env } from "@/env";
import type { DailyForecast, CurrentConditions, Historical } from "./types";

export async function getCurrentConditions() {
  const res = await fetch(
    `https://api.weather.com/v2/pws/observations/current?stationId=KNYCOWLE10&format=json&units=e&apiKey=${env.API_KEY}`,
    { cache: "no-store" },
  );
  return res.json() as Promise<CurrentConditions>;
}

export async function getDailyForecast() {
  const res = await fetch(
    `https://api.weather.com/v3/wx/forecast/daily/5day?postalKey=14037:US&units=e&language=en-US&format=json&apiKey=${env.API_KEY}`,
    { cache: "no-store" },
  );
  return res.json() as Promise<DailyForecast>;
}

export async function getHistorical() {
  const res = await fetch(
    `https://api.weather.com/v2/pws/observations/hourly/7day?stationId=KNYCOWLE10&format=json&units=e&apiKey=${env.API_KEY}`,
    { cache: "no-store" },
  );
  return res.json() as Promise<Historical>;
}
