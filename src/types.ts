export interface Crop {
  id: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  demandIndex: number;
  trend: 'up' | 'down' | 'stable';
  prediction: string;
  harvestTime: string;
}

export interface Market {
  id: string;
  name: string;
  distance: number;
  location: string;
  cropPrices: Record<string, number>;
  gain?: number;
  coordinates: { x: number; y: number; lat: number; lng: number };
}

export interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
  forecast: { day: string; temp: number; condition: string }[];
  insight: string;
}

export interface PriceHistory {
  day: string;
  price: number;
  demand: number;
  demandRangeHigh?: number;
  demandRangeLow?: number;
}
