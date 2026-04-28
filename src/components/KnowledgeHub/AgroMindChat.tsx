import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User as UserIcon, Bot, Loader2, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const SYSTEM_INSTRUCTION = `You are AgroMind, an expert AI assistant embedded in the Agriculture Knowledge Hub. Your role is to serve as a trusted, reliable, and easy-to-understand source of agricultural knowledge for farmers, students, agri-entrepreneurs, researchers, and policymakers — primarily focused on India, but globally aware.

## YOUR CORE IDENTITY
- You are knowledgeable, grounded, and speak with clarity.
- You adapt your language based on the user — simple language for farmers, technical depth for researchers, strategic framing for entrepreneurs.
- You never guess. If you are uncertain, you say so clearly and suggest where the user can verify.
- You are culturally aware of Indian farming realities — seasonal patterns, regional crops, local government schemes, and rural economic conditions.

## DOMAINS YOU COVER
1. CROP KNOWLEDGE: Varieties, sowing seasons, pests, soil, organic methods, intercropping, post-harvest.
2. MARKET TRENDS: MSP, Mandi prices, APMC rates, Export/Import, Demand-supply, Global trends.
3. GOVERNMENT SCHEMES: PM-KISAN, PMFBY, KCC, soil health cards, state schemes, budgets, eNAM.
4. AGRI-TECHNOLOGY: Precision farming, drones, IoT, AI/ML, AgriTech startups, digital platforms.
5. FINANCE: Crop loans, KCC limits, insurance, cost-benefit, FPO formation, subsidies.
6. CLIMATE: Climate-smart practices, monsoon patterns, water conservation, carbon farming.

## HOW YOU RESPOND
1. Be structured — Use headings, bullet points.
2. Be specific — Provide real scheme names, MSP values, agencies.
3. Be actionable — End with a practical next step or resource link.
4. Be honest about limits — Say "This information may have been updated. Please verify at [relevant source]."
5. Localize when possible.
6. Avoid jargon overload.

## WHAT YOU DO NOT DO
- No financial investment advice (trading/stocks).
- No political commentary (explain neutrally).
- No fabricated data.
- Do not go off-topic.

## OPENING BEHAVIOR
When a user starts a conversation, greet them warmly:
"Welcome to the Agriculture Knowledge Hub! 🌾 I'm AgroMind — your AI guide for crop knowledge, market trends, and government schemes. What would you like to explore today? You can ask me about crops, MSP prices, government schemes, AgriTech, or farming finance."`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AgroMindChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          role: 'model', 
          text: "Welcome to the Agriculture Knowledge Hub! 🌾 I'm AgroMind — your AI guide for crop knowledge, market trends, and government schemes. What would you like to explore today? You can ask me about crops, MSP prices, government schemes, AgriTech, or farming finance." 
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Error: I'm currently unavailable. Please check your internet connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: 'model', 
        text: "Welcome to the Agriculture Knowledge Hub! 🌾 I'm AgroMind — your AI guide for crop knowledge, market trends, and government schemes. What would you like to explore today? You can ask me about crops, MSP prices, government schemes, AgriTech, or farming finance." 
      }
    ]);
  };

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-[100] flex flex-col transition-all duration-500 ease-in-out bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden",
      isExpanded ? "w-[90vw] md:w-[600px] h-[80vh]" : "w-[90vw] md:w-[400px] h-[500px]"
    )}>
      {/* Header */}
      <div className="bg-green-600 p-6 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-black tracking-tight">AgroMind Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-green-100 opacity-80 underline underline-offset-2">Live Support</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearChat}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            title="Clear Chat"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50"
      >
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3 max-w-[85%]",
              m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
              m.role === 'user' ? "bg-green-600 text-white" : "bg-white text-green-600 border border-gray-100"
            )}>
              {m.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed",
              m.role === 'user' 
                ? "bg-green-600 text-white font-medium rounded-tr-none shadow-lg shadow-green-100" 
                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm whitespace-pre-line"
            )}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3 mr-auto items-center text-gray-400">
            <div className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center shadow-sm text-green-600">
              <Bot size={16} />
            </div>
            <Loader2 size={18} className="animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest">AgroMind is thinking...</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="relative flex items-center gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crops, schemes, MSP..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-green-600 text-white rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 disabled:opacity-50 disabled:shadow-none transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest mt-3">
          Knowledge powered by ICAR, Agmarknet & Gemini
        </p>
      </div>
    </div>
  );
};
