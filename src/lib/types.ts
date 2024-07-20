export type CurrentConditions = {
  observations: {
    stationID: string;
    obsTimeUtc: string;
    obsTimeLocal: string;
    neighborhood: string;
    softwareType: string;
    country: string;
    solarRadiation: null | number;
    lon: number;
    realtimeFrequency: null | number;
    epoch: number;
    lat: number;
    uv: number;
    winddir: number;
    humidity: number;
    qcStatus: number;
    imperial: {
      temp: number;
      heatIndex: number;
      dewpt: number;
      windChill: number;
      windSpeed: number;
      windGust: number;
      pressure: number;
      precipRate: number;
      precipTotal: number;
      elev: number;
    };
  }[];
};

export type DailyForecast = {
  calendarDayTemperatureMax: number[];
  calendarDayTemperatureMin: number[];
  dayOfWeek: string[];
  expirationTimeUtc: number[];
  moonPhase: string[];
  moonPhaseCode: string[];
  moonPhaseDay: number[];
  moonriseTimeLocal: string[];
  moonriseTimeUtc: number[];
  moonsetTimeLocal: string[];
  moonsetTimeUtc: (number | null)[];
  narrative: string[];
  qpf: number[];
  qpfSnow: number[];
  sunriseTimeLocal: string[];
  sunriseTimeUtc: number[];
  sunsetTimeLocal: string[];
  sunsetTimeUtc: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  validTimeLocal: string[];
  validTimeUtc: number[];
  daypart: {
    cloudCover: number[];
    dayOrNight: string[];
    daypartName: string[];
    iconCode: number[];
    iconCodeExtend: number[];
    narrative: string[];
    precipChance: number[];
    precipType: string[];
    qpf: number[];
    qpfSnow: number[];
    qualifierCode: (string | null)[];
    qualifierPhrase: (string | null)[];
    relativeHumidity: number[];
    snowRange: string[];
    temperature: number[];
    temperatureHeatIndex: number[];
    temperatureWindChill: number[];
    thunderCategory: string[];
    thunderIndex: number[];
    uvDescription: string[];
    uvIndex: number[];
    windDirection: number[];
    windDirectionCardinal: string[];
    windPhrase: string[];
    windSpeed: number[];
    wxPhraseLong: string[];
    wxPhraseShort: string[];
  }[];
};

export type Historical = {
  observations: {
    stationID: string;
    tz: string;
    obsTimeUtc: string;
    obsTimeLocal: string;
    epoch: number;
    lat: number;
    lon: number;
    solarRadiationHigh: number | null;
    uvHigh: number;
    winddirAvg: number;
    humidityHigh: number;
    humidityLow: number;
    humidityAvg: number;
    qcStatus: number;
    imperial: {
      tempHigh: number;
      tempLow: number;
      tempAvg: number;
      windspeedHigh: number;
      windspeedLow: number;
      windspeedAvg: number;
      windgustHigh: number;
      windgustLow: number;
      windgustAvg: number;
      dewptHigh: number;
      dewptLow: number;
      dewptAvg: number;
      windchillHigh: number;
      windchillLow: number;
      windchillAvg: number;
      heatindexHigh: number;
      heatindexLow: number;
      heatindexAvg: number;
      pressureMax: number;
      pressureMin: number;
      pressureTrend: number;
      precipRate: number;
      precipTotal: number;
    };
  }[];
};
