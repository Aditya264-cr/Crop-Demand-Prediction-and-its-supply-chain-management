import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Info, X } from 'lucide-react';
import { Market } from '../../types';
import { cn } from '../../lib/utils';

interface MarketMapProps {
  markets: Market[];
  cropName: string;
}

export const MarketMap: React.FC<MarketMapProps> = ({ markets, cropName }) => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden group">
      {/* Stylized SVG Map Background */}
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
        <path 
          d="M10,20 Q30,10 50,20 T90,20 T80,60 T40,80 T10,60 Z" 
          fill="none" 
          stroke="#16a34a" 
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#16a34a" strokeWidth="0.1" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#16a34a" strokeWidth="0.1" />
      </svg>

      {/* Map Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-[0.03] pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-green-900"></div>
        ))}
      </div>

      {/* Market Pins */}
      {markets.map((market) => (
        <motion.button
          key={market.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.2, zIndex: 10 }}
          onClick={() => setSelectedMarket(market)}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
          style={{ left: `${market.coordinates.x}%`, top: `${market.coordinates.y}%` }}
        >
          <div className={cn(
            "relative p-2 rounded-full shadow-lg transition-all",
            selectedMarket?.id === market.id ? "bg-green-600 text-white scale-125" : "bg-white text-green-600 hover:bg-green-50"
          )}>
            <MapPin size={20} />
            
            {/* Pulse Effect for Best Market */}
            {(market.gain || 0) > 100 && (
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>
            )}
          </div>
          
          {/* Label */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-100 shadow-sm opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{market.name}</p>
          </div>
        </motion.button>
      ))}

      {/* Market Detail Overlay */}
      <AnimatePresence>
        {selectedMarket && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-2xl z-20"
          >
            <button 
              onClick={() => setSelectedMarket(null)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">{selectedMarket.name}</h4>
                  <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    {selectedMarket.location} • {selectedMarket.distance}km away
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{cropName} Price</p>
                  <p className="text-2xl font-black text-gray-900">₹{selectedMarket.cropPrices[cropName] || selectedMarket.cropPrices['Wheat']}</p>
                  <p className={cn(
                    "text-xs font-black uppercase",
                    (selectedMarket.gain || 0) > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {(selectedMarket.gain || 0) > 0 ? '+' : ''}₹{selectedMarket.gain} Profit
                  </p>
                </div>

                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 shadow-lg shadow-green-200 hover:bg-green-700 transition-all">
                  <Navigation size={18} />
                  Navigate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <p className="text-[10px] font-black text-gray-900 uppercase">Available Mandis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
          <p className="text-[10px] font-black text-gray-900 uppercase">Best Profit Opportunity</p>
        </div>
      </div>
    </div>
  );
};
