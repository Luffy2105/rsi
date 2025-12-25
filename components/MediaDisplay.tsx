
import React, { useState } from 'react';
// Added Plus icon to imports
import { 
  MonitorPlay, Camera, Image as ImageIcon, Video, 
  Settings, Maximize, RefreshCw, LayoutGrid, 
  Activity, Signal, Eye, Download, Search,
  ChevronRight,
  Monitor,
  Plus
} from 'lucide-react';

const MediaDisplay: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState('grid');
  const [activeTheme, setActiveTheme] = useState('dark');

  const liveFeeds = [
    { id: 'CAM-01', name: 'Sektor A (Utara)', status: 'Online', battery: '92%', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400' },
    { id: 'CAM-02', name: 'Pusat Menara B', status: 'Online', battery: '45%', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400' },
    { id: 'CAM-03', name: 'Gerbang Sektor C', status: 'Offline', battery: '0%', img: 'https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=400' },
    { id: 'DRONE-01', name: 'Patroli Udara', status: 'Maintenance', battery: '--', img: 'https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Media & Tampilan</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola feed surveillance, galeri dokumentasi, dan konfigurasi display publik.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
            <Settings size={14} /> Pengaturan Video Wall
          </button>
          <button className="bg-emerald-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <MonitorPlay size={16} /> Buka Kiosk Mode
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Surveillance Grid */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <h3 className="text-lg font-black text-white tracking-tight uppercase">Live Surveillance Feed</h3>
               <div className="flex items-center bg-[#111d1a] border border-white/5 rounded-xl p-1">
                  <button 
                    onClick={() => setActiveLayout('grid')}
                    className={`p-2 rounded-lg transition-all ${activeLayout === 'grid' ? 'bg-emerald-500 text-slate-900' : 'text-slate-500 hover:text-white'}`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button 
                    onClick={() => setActiveLayout('single')}
                    className={`p-2 rounded-lg transition-all ${activeLayout === 'single' ? 'bg-emerald-500 text-slate-900' : 'text-slate-500 hover:text-white'}`}
                  >
                    <Maximize size={16} />
                  </button>
               </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <RefreshCw size={14} className="animate-spin-slow" /> Auto-refresh: 5s
            </div>
          </div>

          <div className={`grid gap-6 ${activeLayout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {liveFeeds.map((feed) => (
              <div key={feed.id} className="bg-[#111d1a] rounded-[32px] border border-white/5 overflow-hidden group shadow-2xl">
                <div className="relative aspect-video">
                  <img src={feed.img} className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${feed.status !== 'Online' ? 'grayscale opacity-30' : 'opacity-60 grayscale group-hover:grayscale-0'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111d1a] via-transparent to-transparent"></div>
                  
                  {/* Overlay Info */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      feed.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      feed.status === 'Offline' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      {feed.status}
                    </span>
                    {feed.status === 'Online' && (
                       <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/10 flex items-center gap-2">
                          <Signal size={12} className="text-emerald-500" /> {feed.battery}
                       </div>
                    )}
                  </div>

                  {feed.status !== 'Online' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
                      <Camera size={48} className="opacity-20" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em]">Signal Lost / Connecting...</p>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-xl font-black text-white tracking-tight">{feed.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">ID Perangkat: {feed.id}</p>
                  </div>

                  <button className="absolute bottom-6 right-6 p-4 bg-white/5 hover:bg-emerald-500 hover:text-slate-900 rounded-2xl border border-white/10 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 shadow-2xl">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Options & Stats */}
        <div className="space-y-8">
          {/* Display Configuration */}
          <div className="bg-[#111d1a] p-8 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
            <h3 className="text-base font-black text-white tracking-tight uppercase">Display Kiosk</h3>
            <div className="space-y-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tema Tampilan</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setActiveTheme('dark')}
                      className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${activeTheme === 'dark' ? 'bg-emerald-500 text-slate-900 border-emerald-500' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                    >
                      Dark Mode
                    </button>
                    <button 
                      onClick={() => setActiveTheme('light')}
                      className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${activeTheme === 'light' ? 'bg-emerald-500 text-slate-900 border-emerald-500' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                    >
                      Light Mode
                    </button>
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-tight">Auto-Scroll Data</h4>
                    <p className="text-[9px] text-slate-600 font-bold mt-1">Ganti tab setiap 30 detik.</p>
                  </div>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white"></div>
                  </div>
               </div>

               <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all flex items-center justify-center gap-3">
                 <Monitor size={16} /> Pratinjau Fullscreen
               </button>
            </div>
          </div>

          {/* Documentation Gallery */}
          <div className="bg-[#111d1a] p-8 rounded-[40px] border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-base font-black text-white tracking-tight uppercase">Galeri Dokumentasi</h3>
              <button className="text-emerald-500">
                <Plus size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-[#0a110f] border border-white/5 overflow-hidden group cursor-pointer relative">
                   <img src={`https://images.unsplash.com/photo-${1500382017468 + i}-9049fed747ef?auto=format&fit=crop&q=80&w=150`} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all scale-110 group-hover:scale-100" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Download size={16} className="text-white" />
                   </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-[10px] font-black text-slate-500 hover:text-emerald-500 uppercase tracking-widest transition-all flex items-center justify-center gap-2">
              Lihat Semua Galeri <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDisplay;
