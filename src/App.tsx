import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './pages/Home';
import { Market } from './pages/Market';
import { CropDetail } from './pages/CropDetail';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { TrendingUp, Truck, CloudSun, LogIn, Bell, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { auth, googleProvider } from './lib/firebase';
import { onAuthStateChanged, User, signInWithPopup } from 'firebase/auth';
import { CROPS as initialCrops } from './data/mockData';
import { Crop } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { WeatherIntel } from './pages/WeatherIntel';
import { ColdChainOptimizer } from './pages/ColdChainOptimizer';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [alerts, setAlerts] = useState<{ id: string; cropName: string; oldPrice: number; newPrice: number; type: 'up' | 'down' }[]>([]);
  
  const cropsRef = useRef(crops);
  cropsRef.current = crops;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Simulate real-time price changes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      // Randomly select 1-2 crops to update
      const numToUpdate = Math.floor(Math.random() * 2) + 1;
      const indicesToUpdate = Array.from({ length: initialCrops.length }, (_, i) => i)
        .sort(() => Math.random() - 0.5)
        .slice(0, numToUpdate);

      setCrops(prevCrops => {
        const newCrops = [...prevCrops];
        indicesToUpdate.forEach(index => {
          const crop = newCrops[index];
          const oldPrice = crop.currentPrice;
          
          // Generate a fluctuation between -3% and +3%
          const changePercent = (Math.random() * 6 - 3) / 100;
          const priceDiff = Math.round(oldPrice * changePercent);
          
          // Only update if it's a non-zero change
          if (priceDiff !== 0) {
            const newPrice = oldPrice + priceDiff;
            const newPriceChange = parseFloat((((newPrice - initialCrops[index].currentPrice) / initialCrops[index].currentPrice) * 100).toFixed(1));
            
            newCrops[index] = {
              ...crop,
              currentPrice: newPrice,
              priceChange: newPriceChange,
              trend: priceDiff > 0 ? 'up' : 'down'
            };

            // Trigger alert for significant changes (e.g., > 1.5%)
            if (Math.abs(changePercent) > 0.015) {
              const alertId = Math.random().toString(36).substring(7);
              setAlerts(prev => [{
                id: alertId,
                cropName: crop.name,
                oldPrice,
                newPrice,
                type: priceDiff > 0 ? 'up' : 'down'
              }, ...prev].slice(0, 3));

              // Auto-remove alert after 5 seconds
              setTimeout(() => {
                setAlerts(prev => prev.filter(a => a.id !== alertId));
              }, 5000);
            }
          }
        });
        return newCrops;
      });
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [user]);

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    setActiveTab('market');
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSelectedCropId(null);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Home onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} crops={crops} />;
      case 'knowledge':
        return <KnowledgeHub onNavigate={handleNavigate} />;
      case 'market':
        if (selectedCropId) {
          return <CropDetail cropId={selectedCropId} onBack={() => setSelectedCropId(null)} />;
        }
        return <Market onSelectCrop={setSelectedCropId} crops={crops} />;
      case 'weather':
        return <WeatherIntel />;
      case 'supply':
        return <ColdChainOptimizer />;
      default:
        return <Home onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} crops={crops} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-green-100">
          <TrendingUp size={40} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Welcome to AgriSense</h1>
        <p className="text-gray-500 max-w-md mb-8 font-medium">
          The AI-powered intelligence platform for modern farmers. Sign in to access real-time market insights and weather intelligence.
        </p>
        <button 
          onClick={handleLogin}
          className="flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-2xl font-black shadow-lg border border-gray-100 hover:bg-gray-50 transition-all"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans selection:bg-green-100 selection:text-green-900 relative overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={handleNavigate} user={user} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>

      {/* Real-time Alerts Overlay */}
      <div className="fixed top-20 right-8 z-[100] pointer-events-none space-y-4 max-w-xs w-full">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.8 }}
              className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex gap-4 items-center overflow-hidden"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                alert.type === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                {alert.type === 'up' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Price Alert</p>
                  <button 
                    onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="font-bold text-gray-900 text-sm truncate">{alert.cropName} price fluctuation</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400 line-through">₹{alert.oldPrice}</span>
                  <span className={cn(
                    "text-sm font-black",
                    alert.type === 'up' ? "text-green-600" : "text-red-600"
                  )}>₹{alert.newPrice}</span>
                </div>
              </div>
              {/* Progress bar for timer */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: "linear" }}
                className={cn(
                  "absolute bottom-0 left-0 h-1",
                  alert.type === 'up' ? "bg-green-500" : "bg-red-500"
                )}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

