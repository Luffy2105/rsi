
import React, { useState } from 'react';
import { X, Search, MapPin, Navigation2, Signal, Battery, ChevronRight, Activity } from 'lucide-react';
import { MOCK_SENSORS } from '../constants';

interface SensorNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SensorNavigationModal: React.FC<SensorNavigationModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [navigatingTo, setNavigatingTo] = useState<any>(null);

  if (!isOpen) return null;

  const filteredSensors = MOCK_SENSORS.filter(s => 
    s.id.toLowerCase().includes(search.toLowerCase()) || 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-[#111d1a] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row h-[600px]">
        {/* Left: Sensor List */}
        <div className="w-full md:w-1/2 border-r border-white/5 flex flex-col">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Cari Sensor</h3>
            <button onClick={onClose} className="md:hidden text-slate-500"><X size={20} /></button>
          </div>
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="ID atau Nama Sektor..." 
                className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {filteredSensors.map(s => (
              <button 
                key={s.id}
                onClick={() => setNavigatingTo(s)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${navigatingTo?.id === s.id ? 'bg-emerald-500 border-emerald-500' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'}`}
              >
                <div className="flex justify-between items-start mb-2">
                   <p className={`text-xs font-black ${navigatingTo?.id === s.id ? 'text-slate-900' : 'text-white'}`}>{s.id}</p>
                   <MapPin size={14} className={navigatingTo?.id === s.id ? 'text-slate-900' : 'text-slate-500'} />
                </div>
                <p className={`text-[10px] font-bold ${navigatingTo?.id === s.id ? 'text-slate-800' : 'text-slate-500'}`}>{s.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Navigation View */}
        <div className="flex-1 bg-[#0a110f] p-8 flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-base font-black text-white uppercase tracking-tight">Detail Navigasi</h3>
              <button onClick={onClose} className="hidden md:block text-slate-500 hover:text-white"><X size={24} /></button>
           </div>

           {navigatingTo ? (
             <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4">
                <div className="bg-[#111d1a] p-6 rounded-3xl border border-white/5 mb-8">
                   <div className="flex items-center gap-5 mb-6">
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                         <Navigation2 size={28} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Titik Tujuan</p>
                         <p className="text-xl font-black text-white">{navigatingTo.id}</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-slate-600 uppercase">Koordinat Lintang</p>
                         <p className="text-sm font-bold text-slate-300">{navigatingTo.latitude}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-slate-600 uppercase">Koordinat Bujur</p>
                         <p className="text-sm font-bold text-slate-300">{navigatingTo.longitude}</p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Signal className="text-emerald-500 mb-2" size={16} />
                      <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Status Sinyal</p>
                      <p className="text-xs font-black text-white">4G LTE (Kuat)</p>
                   </div>
                   <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <Battery className="text-orange-500 mb-2" size={16} />
                      <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Daya Baterai</p>
                      <p className="text-xs font-black text-white">{navigatingTo.battery}%</p>
                   </div>
                </div>

                <div className="mt-auto space-y-4">
                   <button className="w-full bg-emerald-500 text-slate-900 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl flex items-center justify-center gap-3">
                      <Navigation2 size={18} fill="currentColor" /> Buka di Google Maps
                   </button>
                   <button className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center justify-center gap-3 transition-all">
                      <Activity size={18} /> Ping Perangkat Lapangan
                   </button>
                </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-700">
                   <MapPin size={40} />
                </div>
                <div>
                   <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Pilih Sensor</p>
                   <p className="text-xs font-medium text-slate-600 mt-2">Gunakan daftar di sebelah kiri untuk<br/>memulai navigasi navigasi.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SensorNavigationModal;
