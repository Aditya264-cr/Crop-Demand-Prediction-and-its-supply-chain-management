import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, X } from 'lucide-react';
import { Market } from '../../types';
import { cn } from '../../lib/utils';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MarketMapProps {
  markets: Market[];
  cropName: string;
}

// Component to handle map centering
const RecenterMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng], 11);
  }, [lat, lng, map]);
  return null;
};

export const MarketMap: React.FC<MarketMapProps> = ({ markets, cropName }) => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  // Default center based on first market or Nashik
  const center: [number, number] = markets.length > 0 
    ? [markets[0].coordinates.lat, markets[0].coordinates.lng] 
    : [19.9975, 73.7898];

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden group z-0">
      <MapContainer 
        center={center} 
        zoom={10} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markets.map((market) => (
          <Marker 
            key={market.id} 
            position={[market.coordinates.lat, market.coordinates.lng]}
            eventHandlers={{
              click: () => setSelectedMarket(market),
            }}
          >
            <Popup>
              <div className="p-1">
                <p className="font-black text-gray-900 text-xs uppercase">{market.name}</p>
                <p className="text-[10px] text-gray-500">{market.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedMarket && (
          <RecenterMap lat={selectedMarket.coordinates.lat} lng={selectedMarket.coordinates.lng} />
        )}
      </MapContainer>

      {/* Market Detail Overlay */}
      <AnimatePresence>
        {selectedMarket && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-2xl z-[1000]"
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
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm pointer-events-none z-[1000]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
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
