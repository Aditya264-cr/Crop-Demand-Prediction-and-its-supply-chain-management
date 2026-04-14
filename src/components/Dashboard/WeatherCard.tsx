import React from 'react';
import { CloudSun, CloudRain, Sun, Wind, Droplets, Zap } from 'lucide-react';
import { WeatherData } from '../../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const conditionIcons: Record<string, any> = {
  'Sunny': Sun,
  'Cloudy': CloudSun,
  'Rain': CloudRain,
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const Icon = conditionIcons[weather.condition] || Sun;

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-3xl text-white shadow-xl shadow-green-900/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-green-100 font-bold uppercase tracking-widest text-xs mb-1">Current Weather</p>
            <h3 className="text-5xl font-black mt-1">{weather.temp}°C</h3>
            <p className="text-sm font-medium opacity-90 mt-2 flex items-center gap-2">
              {weather.condition} <span className="w-1 h-1 bg-white/40 rounded-full"></span> Humidity {weather.humidity}%
            </p>
          </div>
          <Icon size={64} className="text-green-200 drop-shadow-lg" />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {weather.forecast.slice(1, 5).map((day, i) => {
            const DayIcon = conditionIcons[day.condition] || Sun;
            return (
              <div key={i} className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center border border-white/10">
                <p className="text-[10px] font-black uppercase opacity-70 mb-2">{day.day}</p>
                <DayIcon size={20} className="mx-auto mb-2" />
                <p className="text-sm font-bold">{day.temp}°</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white/15 backdrop-blur-xl p-4 rounded-2xl border border-white/20">
          <p className="text-xs font-black flex items-center gap-2 uppercase tracking-wider mb-2">
            <Zap size={14} className="text-yellow-300" /> 
            AI Weather Insight
          </p>
          <p className="text-xs text-green-50 leading-relaxed font-medium">
            {weather.insight}
          </p>
        </div>
      </div>
    </div>
  );
};
