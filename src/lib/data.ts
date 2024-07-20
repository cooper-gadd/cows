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

export async function getHistorical({ date }: { date: Date }) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;
  console.log(formattedDate);

  const res = await fetch(
    `https://api.weather.com/v2/pws/history/hourly?stationId=KNYCOWLE10&format=json&units=e&date=${formattedDate}&apiKey=${env.API_KEY}`,
    { cache: "no-store" },
  );
  return res.json() as Promise<Historical>;
}
