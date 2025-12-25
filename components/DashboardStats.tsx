
import React from 'react';
import { Signal, CheckCircle2, AlertTriangle, Droplets } from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Sensor */}
      <div className="bg-[#111d1a] p-6 rounded-2xl border border-white/5 relative group transition-all">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Sensor</p>
          <Signal size={16} className="text-emerald-500/50" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-white tracking-tighter">142</h3>
          <span className="text-[10px] font-bold text-emerald-500">+2%</span>
        </div>
      </div>

      {/* Sensor Aktif */}
      <div className="bg-[#111d1a] p-6 rounded-2xl border border-white/5 relative group transition-all">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sensor Aktif</p>
          <CheckCircle2 size={16} className="text-emerald-500/50" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-white tracking-tighter">138</h3>
          <span className="text-[10px] font-bold text-emerald-500">+1%</span>
        </div>
      </div>

      {/* Masalah Koneksi */}
      <div className="bg-[#111d1a] p-6 rounded-2xl border border-white/5 relative group transition-all">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Masalah Koneksi</p>
          <AlertTriangle size={16} className="text-orange-500/50" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-white tracking-tighter">4</h3>
          <span className="text-[10px] font-bold text-orange-500">Perlu Perhatian</span>
        </div>
      </div>

      {/* Rata-rata TMAT */}
      <div className="bg-[#111d1a] p-6 rounded-2xl border border-white/5 relative group transition-all">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rata-rata TMAT</p>
          <Droplets size={16} className="text-blue-500/50" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-white tracking-tighter">-40 cm</h3>
          <span className="text-[10px] font-bold text-red-500">-5%</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
