import React from 'react';
import { LayoutDashboard, TrendingUp, CloudSun, Truck, BookOpen, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'market', label: 'Crop Market', icon: TrendingUp },
  { id: 'weather', label: 'Weather Intel', icon: CloudSun },
  { id: 'supply', label: 'Supply Chain', icon: Truck },
  { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 text-green-600 font-bold text-2xl">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
            <TrendingUp size={20} />
          </div>
          <span>AgriSense</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              activeTab === item.id
                ? "bg-green-50 text-green-700 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
          <Settings size={20} />
          Settings
        </button>
      </div>
    </aside>
  );
};
