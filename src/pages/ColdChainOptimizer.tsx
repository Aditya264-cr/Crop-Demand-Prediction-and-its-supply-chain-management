import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Snowflake, 
  ShieldCheck, 
  AlertTriangle,
  Package,
  Calendar,
  X,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';

// Mock data for temperature fluctuations
const tempHistory = [
  { time: '00:00', temp: 4.2 },
  { time: '04:00', temp: 3.9 },
  { time: '08:00', temp: 4.5 },
  { time: '12:00', temp: 5.1 },
  { time: '16:00', temp: 4.8 },
  { time: '20:00', temp: 4.3 },
  { time: '23:59', temp: 4.1 },
];

const facilities = [
  { id: 1, name: 'FreshGuard Nashik Central', distance: '4.2 km', capacity: '85%', type: 'CA Storage', price: '₹12/kg/mo' },
  { id: 2, name: 'Northern Cold Logistics', distance: '8.7 km', capacity: '40%', type: 'Deep Freeze', price: '₹15/kg/mo' },
  { id: 3, name: 'Siddhi Agro Cold Chain', distance: '12.5 km', capacity: '92%', type: 'Chilled Room', price: '₹10/kg/mo' },
];

export const ColdChainOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState({
    temp: 4.2,
    humidity: 88,
    ethylene: 0.12
  });
  const [alerts, setAlerts] = useState<{ id: string; type: 'warning' | 'critical'; message: string; metric: string }[]>([]);
  const [bookingFacility, setBookingFacility] = useState<typeof facilities[0] | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Real-time metric simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newTemp = parseFloat((prev.temp + (Math.random() * 0.4 - 0.2)).toFixed(1));
        const newHumidity = Math.min(100, Math.max(0, prev.humidity + Math.floor(Math.random() * 3 - 1)));
        const newEthylene = parseFloat((prev.ethylene + (Math.random() * 0.04 - 0.01)).toFixed(2));

        // Logical Alert Triggering
        const newAlerts = [...alerts];
        
        if (newTemp > 6.5 && !alerts.find(a => a.metric === 'temp')) {
          newAlerts.push({ id: 'temp-' + Date.now(), type: 'critical', message: 'Temperature breach detected!', metric: 'temp' });
        }
        if (newEthylene > 0.3 && !alerts.find(a => a.metric === 'ethylene')) {
          newAlerts.push({ id: 'eth-' + Date.now(), type: 'warning', message: 'High Ethylene levels rising.', metric: 'ethylene' });
        }

        return { temp: newTemp, humidity: newHumidity, ethylene: Math.max(0, newEthylene) };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [alerts]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleBook = (facility: typeof facilities[0]) => {
    setBookingFacility(facility);
  };

  const confirmBooking = () => {
    setBookingSuccess(true);
    setBookingFacility(null);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      {/* Real-time Alerts Overlay */}
      <div className="fixed top-24 right-8 z-50 pointer-events-none space-y-3 w-80">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ x: 50, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 50, opacity: 0, scale: 0.9 }}
              className={cn(
                "pointer-events-auto p-4 rounded-2xl shadow-2xl border flex gap-3 items-start backdrop-blur-md",
                alert.type === 'critical' ? "bg-red-500/90 border-red-400 text-white" : "bg-amber-500/90 border-amber-400 text-white"
              )}
            >
              <AlertTriangle className="shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{alert.type} Alert</p>
                <p className="text-sm font-bold">{alert.message}</p>
              </div>
              <button onClick={() => removeAlert(alert.id)} className="opacity-60 hover:opacity-100">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Smart Cold Chain</h1>
          <p className="text-gray-500 font-medium">IoT-driven storage optimization for your harvest.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-black text-green-700 uppercase tracking-widest">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Health Card */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              label="Temperature" 
              value={`${metrics.temp}°C`} 
              status={metrics.temp > 6 ? "Critical" : "Optimal"} 
              icon={<Thermometer size={20} />} 
              color={metrics.temp > 6 ? "red" : "green"} 
              subValue="Range: 2°C - 6°C"
            />
            <MetricCard 
              label="Humidity" 
              value={`${metrics.humidity}%`} 
              status="Optimal" 
              icon={<Droplets size={20} />} 
              color="blue" 
              subValue="Critical Threshold: 95%"
            />
            <MetricCard 
              label="Ethylene Levels" 
              value={`${metrics.ethylene} ppm`} 
              status={metrics.ethylene > 0.3 ? "Warning" : "Optimal"} 
              icon={<Wind size={20} />} 
              color={metrics.ethylene > 0.3 ? "amber" : "green"} 
              subValue="High ripening speed"
            />
          </div>

          {/* Temperature Chart */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-black text-gray-900">Temperature Stability</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Last 24 Hours Metrics</p>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                <span className="text-[10px] font-black text-gray-500 uppercase">Live Feed</span>
              </div>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tempHistory}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis 
                    hide 
                    domain={['dataMin - 1', 'dataMax + 1']} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorTemp)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Shelf Life & Nearby Storage */}
        <div className="lg:col-span-4 space-y-8">
          {/* Shelf Life Predictor */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-[40px] text-white shadow-xl shadow-green-100 relative overflow-hidden group">
            <motion.div 
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -right-4 -top-4 text-white/10"
            >
              <Snowflake size={160} />
            </motion.div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-100">AI Shelf-Life Engine</span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-green-100">Estimated Preservation</p>
                <div className="flex items-end gap-2 mt-1">
                  <h2 className="text-6xl font-black tracking-tighter">14</h2>
                  <p className="text-xl font-bold mb-2">Days</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <p className="text-xs font-bold text-green-50 leading-relaxed">
                  Excellent retention. {metrics.ethylene > 0.2 ? 'Ethylene levels rising faster than expected.' : 'Ethylene levels rising slowly—maintain current gas scrubbers.'}
                </p>
              </div>
            </div>
          </div>

          {/* Nearby Storage */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2">Optimal Storage Nearby</h3>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div 
                  key={facility.id}
                  className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-green-200 transition-all group flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-gray-900 group-hover:text-green-600 transition-colors">{facility.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {facility.distance} • {facility.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900">{facility.price}</p>
                      <p className="text-[10px] font-bold text-gray-400">Available</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", parseInt(facility.capacity) > 80 ? "bg-red-400" : "bg-green-500")}
                        style={{ width: facility.capacity }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 shrink-0">{facility.capacity} Full</span>
                  </div>

                  <button 
                    onClick={() => handleBook(facility)}
                    className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl text-xs font-black hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Reserve Space <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingFacility && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingFacility(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <Package size={24} />
                  </div>
                  <button onClick={() => setBookingFacility(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-gray-900">Confirm Booking</h3>
                  <p className="text-gray-500 font-medium">You are reserving space at {bookingFacility.name}.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="text-gray-500 font-bold text-sm">Rate</span>
                    <span className="text-gray-900 font-black">{bookingFacility.price}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="text-gray-500 font-bold text-sm">Processing Fee</span>
                    <span className="text-gray-900 font-black">₹49</span>
                  </div>
                </div>

                <button 
                  onClick={confirmBooking}
                  className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-green-700 transition-all"
                >
                  Confirm & Pay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] bg-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-green-200"
          >
            <CheckCircle2 size={24} />
            Storage Booked Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  status: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'amber' | 'red';
  subValue?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, status, icon, color, subValue }) => {
  const colorMap = {
    green: 'bg-green-50 text-green-600 border-green-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-red-50 text-red-600 border-red-100 animate-pulse',
  };

  return (
    <div className={cn(
      "bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow",
      color === 'red' && "border-red-200 ring-2 ring-red-50"
    )}>
      <div className="flex justify-between items-start">
        <div className={cn("p-3 rounded-2xl flex items-center justify-center", colorMap[color])}>
          {icon}
        </div>
        <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter border", colorMap[color])}>
          {status}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</h4>
        <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
        {subValue && (
          <p className="text-[10px] font-bold text-gray-400 mt-2 flex items-center gap-1 italic">
             {subValue}
          </p>
        )}
      </div>
    </div>
  );
};
