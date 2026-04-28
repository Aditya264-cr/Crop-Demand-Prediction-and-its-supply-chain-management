import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  ArrowRight, 
  AlertCircle,
  Zap,
  ArrowUpRight,
  Waves
} from 'lucide-react';
import { WEATHER, CROPS } from '../data/mockData';
import { cn } from '../lib/utils';

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'Morning';
  if (hour >= 11 && hour < 16) return 'Day';
  if (hour >= 16 && hour < 20) return 'Evening';
  return 'Night';
};

const themeMap: Record<string, Record<string, any>> = {
  'Sunny': {
    Morning: {
      gradient: 'from-[#6dd5ed] via-[#2193b0] to-[#FFD700]',
      accent: 'bg-white/20 text-white shadow-[0_0_20px_rgba(109,213,237,0.4)]',
      card: 'bg-white/20 backdrop-blur-3xl border-white/30',
      text: 'text-white',
      subtext: 'text-white/80',
      icon: Sun,
      animation: { rotate: [0, 360], transition: { duration: 40, repeat: Infinity, ease: "linear" } }
    },
    Day: {
      gradient: 'from-[#FF8C00] via-[#FFA500] to-[#FFD700]',
      accent: 'bg-white/30 text-white shadow-[0_0_20px_rgba(255,165,0,0.3)]',
      card: 'bg-white/20 backdrop-blur-3xl border-white/30',
      text: 'text-white',
      subtext: 'text-white/80',
      icon: Sun,
      animation: { rotate: [0, 360], transition: { duration: 30, repeat: Infinity, ease: "linear" } }
    },
    Evening: {
      gradient: 'from-[#ee0979] via-[#ff6a00] to-[#f42f2b]',
      accent: 'bg-orange-950/20 text-orange-100 shadow-[0_0_20px_rgba(238,9,121,0.3)]',
      card: 'bg-black/10 backdrop-blur-3xl border-white/10',
      text: 'text-white',
      subtext: 'text-orange-100/70',
      icon: Sun,
      animation: { rotate: [0, 360], transition: { duration: 50, repeat: Infinity, ease: "linear" } }
    },
    Night: {
      gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
      accent: 'bg-indigo-500/20 text-indigo-100 shadow-[0_0_20px_rgba(48,43,99,0.3)]',
      card: 'bg-black/30 backdrop-blur-3xl border-white/10',
      text: 'text-white',
      subtext: 'text-indigo-100/70',
      icon: Sun,
      animation: { rotate: [0, 360], transition: { duration: 60, repeat: Infinity, ease: "linear" } }
    }
  },
  'Rain': {
    Morning: {
      gradient: 'from-[#3a6186] to-[#89253e]',
      accent: 'bg-white/10 text-white shadow-[0_0_20px_rgba(137,37,62,0.2)]',
      card: 'bg-white/10 backdrop-blur-3xl border-white/20',
      text: 'text-white',
      subtext: 'text-white/70',
      icon: CloudRain,
      animation: { y: [0, 15, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
    },
    Day: {
      gradient: 'from-[#0F2027] via-[#203A43] to-[#2C5364]',
      accent: 'bg-blue-500/20 text-blue-200 shadow-[0_0_20px_rgba(0,0,255,0.2)]',
      card: 'bg-black/20 backdrop-blur-3xl border-white/10',
      text: 'text-white',
      subtext: 'text-blue-100/70',
      icon: CloudRain,
      animation: { y: [0, 15, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
    },
    Evening: {
      gradient: 'from-[#4B79A1] to-[#283E51]',
      accent: 'bg-blue-900/40 text-blue-100',
      card: 'bg-black/40 backdrop-blur-3xl border-white/5',
      text: 'text-white',
      subtext: 'text-blue-200/60',
      icon: CloudRain,
      animation: { y: [0, 10, 0], transition: { duration: 5, repeat: Infinity } }
    },
    Night: {
      gradient: 'from-[#000000] to-[#434343]',
      accent: 'bg-white/5 text-gray-400',
      card: 'bg-black/60 backdrop-blur-3xl border-white/10',
      text: 'text-white',
      subtext: 'text-gray-500',
      icon: CloudRain,
      animation: { y: [0, 5, 0], transition: { duration: 6, repeat: Infinity } }
    }
  },
  'Cloudy': {
    Morning: {
      gradient: 'from-[#eef2f3] to-[#8e9eab]',
      accent: 'bg-slate-200/50 text-slate-700',
      card: 'bg-white/20 backdrop-blur-2xl border-white/30',
      text: 'text-slate-900',
      subtext: 'text-slate-600',
      icon: Cloud,
      animation: { x: [-10, 10, -10], transition: { duration: 12, repeat: Infinity } }
    },
    Day: {
      gradient: 'from-[#5D4157] to-[#A8CABA]',
      accent: 'bg-white/20 text-white',
      card: 'bg-white/10 backdrop-blur-3xl border-white/20',
      text: 'text-white',
      subtext: 'text-white/70',
      icon: Cloud,
      animation: { x: [-20, 20, -20], transition: { duration: 15, repeat: Infinity } }
    },
    Evening: {
      gradient: 'from-[#6441A5] to-[#2a0845]',
      accent: 'bg-purple-950/20 text-purple-100',
      card: 'bg-black/20 backdrop-blur-[40px] border-white/10',
      text: 'text-white',
      subtext: 'text-purple-100/70',
      icon: Cloud,
      animation: { x: [-30, 30, -30], transition: { duration: 20, repeat: Infinity } }
    },
    Night: {
      gradient: 'from-[#141E30] to-[#243B55]',
      accent: 'bg-blue-900/20 text-blue-100',
      card: 'bg-black/40 backdrop-blur-3xl border-white/5',
      text: 'text-white',
      subtext: 'text-blue-300/50',
      icon: Cloud,
      animation: { x: [-15, 15, -15], transition: { duration: 25, repeat: Infinity } }
    }
  }
};

export const WeatherIntel: React.FC = () => {
  const timeOfDay = getTimeOfDay();
  const currentCondition = WEATHER.condition as keyof typeof themeMap;
  const theme = (themeMap[currentCondition] || themeMap['Sunny'])[timeOfDay];
  const Icon = theme.icon;

  return (
    <div className="min-h-full -m-8 p-8 overflow-hidden relative selection:bg-white/30">
      {/* Ambient Animated Background */}
      <motion.div 
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute inset-0 transition-colors duration-1000 bg-[length:200%_200%] bg-gradient-to-br -z-10",
          theme.gradient
        )}
      />

      {/* Dynamic Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            ...theme.animation,
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            ...theme.animation.transition
          }}
          className="absolute -top-20 -right-20 opacity-40 blur-md"
        >
          <Icon size={500} />
        </motion.div>
        
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-15%] w-[80%] h-[80%] bg-white rounded-full blur-[160px]"
        />

        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.1, 0.3, 0.1],
            x: [0, -50, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[180px]"
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Interactive Smart Advisory Banner */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "p-1 rounded-[44px] bg-gradient-to-r backdrop-blur-3xl border border-white/30 shadow-2xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
            theme.gradient
          )}
        >
          <div className="p-8 md:p-10 flex flex-col lg:flex-row items-center gap-10 bg-white/10 backdrop-blur-sm">
            <div className="relative shrink-0">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white/20 blur-2xl rounded-full"
              />
              <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-inner relative z-10 text-white">
                <Zap size={44} className="drop-shadow-lg" fill="currentColor" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                  AI Context Advisory
                </span>
                <span className="text-white/80 text-sm font-bold flex items-center gap-2">
                  <Waves size={14} /> Based on {CROPS[0].name} soil sensors
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Rain predicted in 48h. <br className="hidden md:block" />
                <span className="opacity-80">Hold irrigation to prevent nutrient leaching.</span>
              </h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-white text-green-700 rounded-2xl font-black text-sm shadow-xl shadow-black/10 hover:scale-105 transition-all flex items-center gap-3">
                  Update Automation <ArrowUpRight size={18} />
                </button>
                <button className="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-2xl font-black text-sm hover:bg-white/20 backdrop-blur-md transition-all">
                  Dismiss Advice
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Weather Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <header className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-md border border-white/20")}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {timeOfDay} Context Active
              </motion.div>
              <div className="space-y-1">
                <h1 className={cn("text-8xl font-black tracking-tighter leading-none flex items-start gap-1", theme.text)}>
                  {WEATHER.temp}
                  <span className="text-3xl font-medium mt-4 opacity-40">°c</span>
                </h1>
                <p className={cn("text-xl font-bold flex items-center gap-3", theme.subtext)}>
                  <Icon size={28} /> {WEATHER.condition}
                </p>
                <p className={cn("text-sm font-semibold opacity-60", theme.text)}>Nashik Agriculture Hub</p>
              </div>
            </header>

            <div className={cn("p-6 rounded-[32px] border space-y-6", theme.card)}>
              <StatItem icon={<Droplets />} label="Humidity" value={`${WEATHER.humidity}%`} theme={theme} />
              <StatItem icon={<Wind />} label="Wind" value="14 km/h" theme={theme} />
              <StatItem icon={<Thermometer />} label="Dew Pt" value="22°" theme={theme} />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            {/* Ambient 7-Day Vision */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-4">
                <h4 className={cn("text-[10px] font-black uppercase tracking-[0.3em]", theme.text)}>Adaptive 7-Day Forecast</h4>
                <button className={cn("text-xs font-bold underline underline-offset-4", theme.subtext)}>View Detailed Radar</button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {WEATHER.forecast.map((day, i) => {
                  const conditionThemes = themeMap[day.condition] || themeMap['Sunny'];
                  const dayTheme = conditionThemes['Day'] || Object.values(conditionThemes)[0];
                  const DayIcon = dayTheme.icon;
                  const isToday = i === 0;

                  return (
                    <motion.div 
                      key={day.day}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                      className={cn(
                        "relative p-6 rounded-[32px] border text-center space-y-5 transition-all overflow-hidden backdrop-blur-md",
                        isToday ? "bg-white shadow-[0_20px_40px_rgba(255,255,255,0.3)] border-white scale-110 z-20" : theme.card
                      )}
                    >
                      {isToday && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-[8px] font-black text-black rounded-b-xl uppercase tracking-widest shadow-sm">
                          Today
                        </div>
                      )}
                      <p className={cn("text-[10px] font-black tracking-[0.2em] uppercase opacity-60", isToday ? "text-gray-400" : theme.text)}>{day.day}</p>
                      <motion.div 
                        animate={{ 
                          y: [0, -8, 0],
                          scale: [1, 1.15, 1],
                          rotate: isToday ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ 
                          duration: 4 + i, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className={cn("mx-auto", isToday ? "text-green-500" : theme.text)}
                      >
                        <DayIcon size={40} strokeWidth={2.5} />
                      </motion.div>
                      <div>
                        <p className={cn("text-3xl font-black tracking-tighter", isToday ? "text-gray-900" : theme.text)}>{day.temp}°</p>
                        <p className={cn("text-[10px] font-bold opacity-60 truncate uppercase", isToday ? "text-gray-500" : theme.text)}>{day.condition}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sub-context: Crop Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("p-8 rounded-[40px] border relative overflow-hidden", theme.card)}>
                <h4 className={cn("text-lg font-black mb-4", theme.text)}>Agricultural Impacts</h4>
                <div className="space-y-4">
                  {CROPS.slice(0, 3).map((crop) => (
                    <div key={crop.id} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className={cn("font-bold text-sm", theme.text)}>{crop.name}</p>
                        <p className={cn("text-[10px] opacity-60", theme.text)}>Water stress likely</p>
                      </div>
                      <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase text-white bg-white/20")}>
                        Critical
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn("p-8 rounded-[40px] border flex flex-col justify-between", theme.card)}>
                <div className="space-y-4">
                  <h4 className={cn("text-lg font-black", theme.text)}>Regional Wind Index</h4>
                  <div className="flex items-end gap-2 text-white">
                    <span className="text-5xl font-black">14</span>
                    <span className="text-xl font-bold opacity-60 mb-2">km/h</span>
                  </div>
                  <p className={cn("text-xs font-medium leading-relaxed opacity-70", theme.text)}>
                    Stable conditions for drone-based chemical spraying operations till 14:00.
                  </p>
                </div>
                <button className={cn("mt-6 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", theme.accent, "hover:brightness-110")}>
                  Full Wind Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, theme }: { icon: React.ReactNode, label: string, value: string, theme: any }) => (
  <div className="flex items-center gap-4 group">
    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", theme.accent)}>
      {icon}
    </div>
    <div>
      <p className={cn("text-2xl font-black", theme.text)}>{value}</p>
      <p className={cn("text-[10px] font-bold uppercase opacity-50 tracking-widest", theme.text)}>{label}</p>
    </div>
  </div>
);

