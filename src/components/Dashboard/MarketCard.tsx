import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Crop } from '../../types';
import { cn } from '../../lib/utils';

interface MarketCardProps {
  crop: Crop;
  onClick?: () => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ crop, onClick }) => {
  const isUp = crop.trend === 'up';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-green-100 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors">{crop.name}</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Demand Index: {crop.demandIndex}/100</p>
        </div>
        <div className={cn(
          "flex items-center px-2.5 py-1 rounded-full text-xs font-bold",
          isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
          {isUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {crop.priceChange > 0 ? '+' : ''}{crop.priceChange}%
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-black text-gray-900">₹{crop.currentPrice.toLocaleString()}</p>
          <p className="text-xs text-gray-400 font-medium">per quintal</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={cn(
            "text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter",
            crop.prediction.includes('Buy') ? "bg-blue-100 text-blue-700" : 
            crop.prediction.includes('Sell') ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
          )}>
            {crop.prediction}
          </span>
          <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl transition-all shadow-sm group-hover:scale-110">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
