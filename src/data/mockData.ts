import { Crop, Market, PriceHistory, WeatherData } from '../types';

export const CROPS: Crop[] = [
  { id: '1', name: 'Wheat', currentPrice: 2150, priceChange: 2.5, demandIndex: 85, trend: 'up', prediction: 'Strong Buy', harvestTime: '15 Days' },
  { id: '2', name: 'Rice (Basmati)', currentPrice: 4200, priceChange: -1.2, demandIndex: 92, trend: 'down', prediction: 'Hold', harvestTime: '30 Days' },
  { id: '3', name: 'Maize', currentPrice: 1850, priceChange: 0.8, demandIndex: 60, trend: 'stable', prediction: 'Sell', harvestTime: '5 Days' },
  { id: '4', name: 'Soybean', currentPrice: 5400, priceChange: 5.4, demandIndex: 78, trend: 'up', prediction: 'Strong Buy', harvestTime: '12 Days' },
  { id: '5', name: 'Cotton', currentPrice: 6200, priceChange: 1.1, demandIndex: 45, trend: 'stable', prediction: 'Hold', harvestTime: '20 Days' },
];

export const PRICE_HISTORY: PriceHistory[] = [
  { day: 'Mon', price: 2100, demand: 70, demandRangeHigh: 75, demandRangeLow: 65 },
  { day: 'Tue', price: 2120, demand: 75, demandRangeHigh: 82, demandRangeLow: 68 },
  { day: 'Wed', price: 2110, demand: 82, demandRangeHigh: 88, demandRangeLow: 76 },
  { day: 'Thu', price: 2150, demand: 85, demandRangeHigh: 92, demandRangeLow: 78 },
  { day: 'Fri', price: 2180, demand: 88, demandRangeHigh: 95, demandRangeLow: 81 },
  { day: 'Sat', price: 2200, demand: 90, demandRangeHigh: 98, demandRangeLow: 82 },
  { day: 'Sun', price: 2250, demand: 95, demandRangeHigh: 100, demandRangeLow: 90 },
];

export const MARKETS: Market[] = [
  { id: 'm1', name: 'Pimpalgaon Mandi', distance: 12, location: 'Nashik', cropPrices: { 'Wheat': 2250, 'Rice': 4100 }, gain: 120, coordinates: { x: 35, y: 45, lat: 20.1667, lng: 73.9833 } },
  { id: 'm2', name: 'Nashik APMC', distance: 18, location: 'Nashik', cropPrices: { 'Wheat': 2190, 'Rice': 4250 }, gain: 60, coordinates: { x: 55, y: 30, lat: 19.9975, lng: 73.7898 } },
  { id: 'm3', name: 'Lasalgaon Market', distance: 42, location: 'Lasalgaon', cropPrices: { 'Wheat': 2100, 'Rice': 4000 }, gain: -30, coordinates: { x: 75, y: 65, lat: 20.1333, lng: 74.2333 } },
];

export const WEATHER: WeatherData = {
  temp: 28,
  humidity: 42,
  condition: 'Sunny',
  forecast: [
    { day: 'Mon', temp: 28, condition: 'Sunny' },
    { day: 'Tue', temp: 29, condition: 'Sunny' },
    { day: 'Wed', temp: 27, condition: 'Cloudy' },
    { day: 'Thu', temp: 25, condition: 'Rain' },
    { day: 'Fri', temp: 26, condition: 'Cloudy' },
    { day: 'Sat', temp: 28, condition: 'Sunny' },
    { day: 'Sun', temp: 30, condition: 'Sunny' },
  ],
  insight: 'Dry soil conditions expected for 5 days. Ideal for Wheat harvesting before evening showers on Thursday.'
};
