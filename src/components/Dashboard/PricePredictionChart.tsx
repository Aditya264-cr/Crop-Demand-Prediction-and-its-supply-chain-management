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
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white border-dashed"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Demand Forecast</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-100"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">AI Confidence Range</span>
          </div>
          <select className="bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all">
            <option>Next 7 Days</option>
            <option>Next 30 Days</option>
          </select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 40, left: 10, bottom: 10 }}>
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
            <YAxis 
              yAxisId="left"
              hide={false}
              domain={['auto', 'auto']} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#16a34a', fontSize: 10, fontWeight: 700 }}
              label={{ value: 'Price (₹)', angle: -90, position: 'insideLeft', fill: '#16a34a', fontSize: 10, fontWeight: 800, offset: 10 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              hide={false}
              domain={[0, 100]} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#3b82f6', fontSize: 10, fontWeight: 700 }}
              label={{ value: 'Demand %', angle: 90, position: 'insideRight', fill: '#3b82f6', fontSize: 10, fontWeight: 800, offset: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: 700, fontSize: '12px' }}
              labelStyle={{ fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}
              formatter={(value: any, name: string, props: any) => {
                if (name === 'demand') {
                  const dataItem = props.payload;
                  return [`${value}% (Range: ${dataItem.demandRangeLow}-${dataItem.demandRangeHigh})`, 'Demand'];
                }
                if (name === 'price') return [`₹${value}`, 'Price'];
                return [value, name];
              }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="price" 
              name="price"
              stroke="#16a34a" 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={4}
              animationDuration={1500}
            />
            <Area
              yAxisId="right"
              type="monotone"
              name="demandRange"
              stroke="none"
              fill="#3b82f6"
              fillOpacity={0.05}
              dataKey={(d: any) => [d.demandRangeLow, d.demandRangeHigh]}
              animationDuration={2000}
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="demand" 
              name="demand"
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
