import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { WeatherCard } from '../components/Dashboard/WeatherCard';
import { MarketCard } from '../components/Dashboard/MarketCard';
import { PricePredictionChart } from '../components/Dashboard/PricePredictionChart';
import { CROPS, PRICE_HISTORY, MARKETS, WEATHER } from '../data/mockData';
import { getAgriInsights } from '../services/geminiService';
import { cn } from '../lib/utils';

interface HomeProps {
  onNavigate: (tab: string) => void;
  onSelectCrop: (cropId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectCrop }) => {
  const [aiInsight, setAiInsight] = useState<{
    summary: string;
    weatherFactor: string;
    demandFactor: string;
    actionableTip: string;
  }>({
    summary: "Analyzing market trends...",
    weatherFactor: "Checking weather...",
    demandFactor: "Evaluating demand...",
    actionableTip: "Please wait..."
  });

  useEffect(() => {
    const fetchInsight = async () => {
      const insight = await getAgriInsights(`Weather is ${WEATHER.condition}, ${WEATHER.temp}C. Top crop is Wheat at ${CROPS[0].currentPrice}.`);
      setAiInsight(insight);
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Farm Intelligence</h1>
          <div className="flex items-center mt-2 gap-4">
            <p className="text-gray-500 font-medium flex items-center">
              <MapPin size={18} className="mr-2 text-green-600" /> India
            </p>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-orange-50 text-orange-700 px-5 py-3 rounded-2xl border border-orange-100 flex items-center gap-3 shadow-sm"
        >
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Market Alert</p>
            <p className="text-sm font-bold">Wheat prices expected to peak in 3 days</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Insight Banner */}
          <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} className="text-green-600" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-green-700 font-black text-xs uppercase tracking-widest mb-3">
                <Sparkles size={16} />
                AgriSense AI Recommendation
              </div>
              <p className="text-lg font-bold text-gray-800 leading-relaxed">
                "{aiInsight.summary}"
              </p>
              <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                <ArrowRight size={12} /> {aiInsight.actionableTip}
              </p>
            </div>
          </div>

          {/* Quick Insights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Best Crop to Sell</p>
                <p className="text-lg font-black text-gray-900">Wheat</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">High Demand Alert</p>
                <p className="text-lg font-black text-gray-900">Rice (Basmati)</p>
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <PricePredictionChart data={PRICE_HISTORY} cropName="Wheat" />

          {/* Market Watchlist */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">Market Watchlist</h2>
              <button 
                onClick={() => onNavigate('market')}
                className="text-green-600 font-bold text-sm flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CROPS.slice(0, 4).map((crop) => (
                <MarketCard key={crop.id} crop={crop} onClick={() => onSelectCrop(crop.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Weather Card */}
          <WeatherCard weather={WEATHER} />

          {/* Profit Optimizer */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <TrendingUp size={18} />
              </div>
              <h3 className="font-black text-gray-900">Best Markets</h3>
            </div>
            
            <div className="space-y-5">
              {MARKETS.map((mandi, i) => (
                <div key={mandi.id} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors">{mandi.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{mandi.distance}km away</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">₹{mandi.cropPrices['Wheat']}</p>
                    <p className={cn(
                      "text-[10px] font-black uppercase tracking-tighter",
                      (mandi.gain || 0) > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {(mandi.gain || 0) > 0 ? '+' : ''}₹{mandi.gain} profit
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => onNavigate('supply')}
              className="w-full mt-8 py-3 bg-gray-50 hover:bg-green-600 hover:text-white text-gray-600 font-bold rounded-2xl transition-all text-sm"
            >
              Optimize Supply Chain
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Total Value</p>
              <p className="text-xl font-black text-green-900">₹4.2L</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-1">Avg Demand</p>
              <p className="text-xl font-black text-blue-900">82%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
