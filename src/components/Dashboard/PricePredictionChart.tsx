import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PriceHistory } from '../../types';

interface PricePredictionChartProps {
  data: PriceHistory[];
  cropName: string;
}

export const PricePredictionChart: React.FC<PricePredictionChartProps> = ({ data, cropName }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900">Price Prediction Model</h2>
          <p className="text-sm text-gray-500 font-medium">AI-driven forecasting for {cropName}</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all">
            <option>Next 7 Days</option>
            <option>Next 30 Days</option>
          </select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: 700, fontSize: '12px' }}
              labelStyle={{ fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#16a34a" 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={4}
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="demand" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorDemand)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-50 text-center">
        <div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Confidence</p>
          <p className="text-lg font-black text-green-600">94.2%</p>
        </div>
        <div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Volatility</p>
          <p className="text-lg font-black text-gray-900">Low</p>
        </div>
        <div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">AI Signal</p>
          <p className="text-lg font-black text-blue-600">Accumulate</p>
        </div>
      </div>
    </div>
  );
};
