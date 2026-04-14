import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './pages/Home';
import { Market } from './pages/Market';
import { CropDetail } from './pages/CropDetail';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { TrendingUp, Truck, CloudSun } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    setActiveTab('market');
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSelectedCropId(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Home onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} />;
      case 'knowledge':
        return <KnowledgeHub onNavigate={handleNavigate} />;
      case 'market':
        if (selectedCropId) {
          return <CropDetail cropId={selectedCropId} onBack={() => setSelectedCropId(null)} />;
        }
        return <Market onSelectCrop={setSelectedCropId} />;
      case 'weather':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <CloudSun size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Weather Intelligence</h2>
            <p className="text-gray-500 max-w-md">Advanced 15-day forecasts with AI-driven harvesting recommendations.</p>
            <button 
              onClick={() => handleNavigate('dashboard')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              View Forecast
            </button>
          </div>
        );
      case 'supply':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <Truck size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Supply Chain Optimizer</h2>
            <p className="text-gray-500 max-w-md">Find the best mandi to sell your crops based on distance and real-time price comparison.</p>
            <button 
              onClick={() => handleNavigate('dashboard')}
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
            >
              Optimize Now
            </button>
          </div>
        );
      default:
        return <Home onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans selection:bg-green-100 selection:text-green-900">
      <Sidebar activeTab={activeTab} setActiveTab={handleNavigate} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
