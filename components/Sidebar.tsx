
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { UserRole, User } from '../types';
import { Waves, LogOut } from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, activeTab, setActiveTab, onLogout }) => {
  const filteredItems = NAVIGATION_ITEMS.filter(item => item.roles.includes(currentUser.role));

  return (
    <aside className="w-64 bg-[#0a110f] h-screen fixed left-0 top-0 text-slate-400 flex flex-col z-50 border-r border-white/5">
      {/* Brand Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-[#10b981] p-2 rounded-xl shadow-lg shadow-emerald-500/20">
          <Waves className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-black text-white text-base tracking-tight leading-none">AP-TMAT</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Konsol {currentUser.role.toLowerCase()}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-[#111d1a] text-[#10b981] shadow-inner' 
                : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={activeTab === item.id ? 'text-[#10b981]' : 'text-slate-500 group-hover:text-white'}>
              {item.icon}
            </span>
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-4 mt-auto border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 group hover:bg-white/10 transition-all cursor-pointer">
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`} 
              className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" 
              alt="Avatar"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0a110f] rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-white truncate uppercase tracking-tighter">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 truncate font-bold">{currentUser.email}</p>
          </div>
          <button onClick={onLogout} className="text-slate-500 hover:text-red-400 p-1">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
