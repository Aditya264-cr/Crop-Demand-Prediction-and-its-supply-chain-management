import React from 'react';
import { BookOpen, Lightbulb, GraduationCap, ArrowRight, Bot } from 'lucide-react';
import { AgroMindChat } from '../components/KnowledgeHub/AgroMindChat';

const tips = [
  {
    title: "Precision Irrigation",
    desc: "Reduce water usage by 30% using sensor-based drip systems.",
    icon: Lightbulb,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Soil Health AI",
    desc: "How AI analyzes nitrogen levels from satellite imagery.",
    icon: GraduationCap,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Market Timing",
    desc: "Understanding the 10-day price cycle for Rabi crops.",
    icon: BookOpen,
    color: "bg-orange-50 text-orange-600"
  }
];

interface KnowledgeHubProps {
  onNavigate: (tab: string) => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Farmer Knowledge Hub</h1>
        <p className="text-gray-500 font-medium mt-2">Learn scientific farming and AI-driven techniques.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group cursor-pointer">
            <div className={`w-14 h-14 ${tip.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <tip.icon size={28} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">{tip.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-6">{tip.desc}</p>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-green-600 font-bold text-sm group-hover:gap-3 transition-all"
            >
              Read Guide <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-green-600 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <GraduationCap size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-4">New: AI Pest Detection</h2>
          <p className="text-green-50 text-lg font-medium mb-8 opacity-90">
            Upload a photo of your crop leaves and our AI will identify pests and recommend organic treatments instantly.
          </p>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-white text-green-700 px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-green-50 transition-all"
          >
            Try AI Detection
          </button>
        </div>
      </div>

      {/* AI Assistant Hook */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 shrink-0">
          <Bot size={40} />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-2xl font-black text-gray-900">Talk to AgroMind</h3>
          <p className="text-gray-500 font-medium">Your personal AI expert for crops, market trends, and government schemes.</p>
        </div>
        <button 
          className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center gap-2"
          onClick={() => {
            // The chat is already visible or will be toggled by this potentially
            // For now it's always visible as a floating component in this page
          }}
        >
          Ask Question
        </button>
      </div>

      <AgroMindChat />
    </div>
  );
};
