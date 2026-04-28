import React from 'react';
import { Search, Filter, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketCard } from '../components/Dashboard/MarketCard';
import { Crop } from '../types';
import { cn } from '../lib/utils';

interface MarketProps {
  onSelectCrop: (cropId: string) => void;
  crops: Crop[];
}

export const Market: React.FC<MarketProps> = ({ onSelectCrop, crops }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Crop Market</h1>
          <p className="text-gray-500 font-medium mt-2">Real-time prices and demand analysis for all major crops.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search crops..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <MarketCard 
            key={crop.id} 
            crop={crop} 
            onClick={() => onSelectCrop(crop.id)} 
          />
        ))}
      </div>

      {/* Market Trends Summary */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Market Trends Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-2">Top Gainer</p>
            <p className="text-xl font-black text-gray-900">{[...crops].sort((a, b) => b.priceChange - a.priceChange)[0].name}</p>
            <p className="text-sm font-bold text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp size={14} /> +{[...crops].sort((a, b) => b.priceChange - a.priceChange)[0].priceChange}%
            </p>
          </div>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-2">Top Loser</p>
            <p className="text-xl font-black text-gray-900">{[...crops].sort((a, b) => a.priceChange - b.priceChange)[0].name}</p>
            <p className="text-sm font-bold text-red-600 flex items-center gap-1 mt-1">
              <TrendingDown size={14} /> {[...crops].sort((a, b) => a.priceChange - b.priceChange)[0].priceChange}%
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2">Highest Demand</p>
            <p className="text-xl font-black text-gray-900">{[...crops].sort((a, b) => b.demandIndex - a.demandIndex)[0].name}</p>
            <p className="text-sm font-bold text-blue-600 mt-1">{[...crops].sort((a, b) => b.demandIndex - a.demandIndex)[0].demandIndex} Index</p>
          </div>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-2">Market Sentiment</p>
            <p className="text-xl font-black text-gray-900">
              {crops.filter(c => c.trend === 'up').length > crops.length / 2 ? 'Bullish' : 'Neutral'}
            </p>
            <p className="text-sm font-bold text-orange-600 mt-1">
              {crops.filter(c => c.trend === 'up').length} Crops Improving
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
