import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, TrendingUp, Sparkles, AlertTriangle, Map as MapIcon, Clock, Info, CloudSun } from 'lucide-react';
import { motion } from 'motion/react';
import { PricePredictionChart } from '../components/Dashboard/PricePredictionChart';
import { CROPS, PRICE_HISTORY, MARKETS, WEATHER } from '../data/mockData';
import { getAgriInsights } from '../services/geminiService';
import { cn } from '../lib/utils';
import { Crop } from '../types';

import { MarketMap } from '../components/Dashboard/MarketMap';

interface CropDetailProps {
  cropId: string;
  onBack: () => void;
}

export const CropDetail: React.FC<CropDetailProps> = ({ cropId, onBack }) => {
  const [aiInsight, setAiInsight] = useState<{
    summary: string;
    weatherFactor: string;
    demandFactor: string;
    actionableTip: string;
  }>({
    summary: "Analyzing crop specific data...",
    weatherFactor: "Checking weather patterns...",
    demandFactor: "Evaluating market demand...",
    actionableTip: "Please wait..."
  });
  const crop = CROPS.find(c => c.id === cropId) || CROPS[0];

  useEffect(() => {
    const fetchInsight = async () => {
      const insight = await getAgriInsights(`Detailed analysis for ${crop.name}. Current price: ${crop.currentPrice}, Demand: ${crop.demandIndex}. Trend is ${crop.trend}. Weather: ${WEATHER.condition}, ${WEATHER.temp}C.`);
      setAiInsight(insight);
    };
    fetchInsight();
    window.scrollTo(0, 0);
  }, [cropId]);

  // Filter markets that have this crop
  const relevantMarkets = MARKETS.filter(m => m.cropPrices[crop.name] || m.cropPrices['Wheat']); // Fallback for mock data

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white rounded-xl transition-all text-gray-500 hover:text-green-600 border border-transparent hover:border-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">{crop.name} Details</h1>
          <p className="text-gray-500 font-medium">Comprehensive market analysis and AI predictions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts & Insights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Stats Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current Price</p>
              <p className="text-3xl font-black text-gray-900">₹{crop.currentPrice}</p>
              <p className={cn(
                "text-sm font-bold flex items-center gap-1 mt-1",
                crop.priceChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                {crop.priceChange > 0 ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
                {crop.priceChange}%
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Demand Index</p>
              <p className="text-3xl font-black text-gray-900">{crop.demandIndex}/100</p>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full" 
                  style={{ width: `${crop.demandIndex}%` }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Harvest Window</p>
              <p className="text-3xl font-black text-gray-900">{crop.harvestTime}</p>
              <p className="text-xs text-gray-400 font-bold mt-1 uppercase">Estimated</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">AI Signal</p>
              <span className={cn(
                "inline-block px-3 py-1 rounded-lg text-sm font-black uppercase tracking-tighter mt-1",
                crop.prediction.includes('Buy') ? "bg-blue-100 text-blue-700" : 
                crop.prediction.includes('Sell') ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"
              )}>
                {crop.prediction}
              </span>
            </div>
          </div>

          {/* AI Insight Banner */}
          <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Sparkles size={160} className="text-green-600" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-green-700 font-black text-xs uppercase tracking-widest mb-6">
                <Sparkles size={18} />
                AgriSense AI Intelligence Report
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-tight mb-2">
                    {aiInsight.summary}
                  </p>
                  <div className="h-1 w-20 bg-green-500 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <CloudSun size={14} /> Weather Influence
                    </p>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {aiInsight.weatherFactor}
                    </p>
                  </div>
                  <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <TrendingUp size={14} /> Demand Dynamics
                    </p>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {aiInsight.demandFactor}
                    </p>
                  </div>
                </div>

                <div className="bg-green-600 p-5 rounded-2xl text-white shadow-lg shadow-green-100">
                  <p className="text-[10px] font-black text-green-100 uppercase tracking-widest mb-1">Actionable Strategy</p>
                  <p className="text-lg font-bold">
                    {aiInsight.actionableTip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <PricePredictionChart data={PRICE_HISTORY} cropName={crop.name} />
        </div>

        {/* Right Column - Recommendations */}
        <div className="space-y-8">
          {/* Selling Strategy Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-green-600" size={24} />
              Recommended Selling Time
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="font-black text-gray-900">Optimal Window</p>
                  <p className="text-sm text-gray-500 font-medium">Nov 22 - Nov 28, 2026</p>
                  <p className="text-xs text-green-600 font-bold mt-1">Expected 8% price surge</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                <AlertTriangle className="text-orange-600 shrink-0" size={20} />
                <p className="text-xs text-orange-800 font-bold leading-relaxed">
                  Avoid selling before Nov 18 due to temporary supply glut in regional mandis.
                </p>
              </div>
            </div>
          </div>

          {/* Market Map Visualization */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <MapIcon className="text-blue-600" size={24} />
                Regional Market Map
              </h3>
            </div>
            
            <MarketMap markets={relevantMarkets} cropName={crop.name} />

            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-xs text-blue-800 font-bold leading-relaxed flex items-center gap-2">
                <Info size={16} className="shrink-0" />
                Click on a pin to see real-time prices and start navigation to the mandi.
              </p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={80} />
            </div>
            <h4 className="text-lg font-black mb-4 relative z-10">Pro Tip</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed relative z-10">
              Crops stored in dry conditions for an extra 48 hours after harvest show 12% higher demand in premium export markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
