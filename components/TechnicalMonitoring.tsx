
import React from 'react';
import { 
  Battery, Signal, Zap, Clock, AlertTriangle, 
  ArrowUpRight, BarChart, Wifi, RefreshCw 
} from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_SENSORS } from '../constants';

const TechnicalMonitoring: React.FC = () => {
  const batteryData = MOCK_SENSORS.map(s => ({ name: s.id, val: s.battery || 0 }));

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">Monitoring Teknis</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Status mendalam kesehatan infrastruktur IoT dan transmisi data.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Battery Health Chart */}
        <div className="lg:col-span-2 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase">Distribusi Daya Baterai</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Level baterai seluruh unit aktif (%).</p>
            </div>
            <Battery className="text-emerald-500" size={24} />
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={batteryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ background: '#111d1a', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                <Bar dataKey="val" radius={[8, 8, 0, 0]}>
                  {batteryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.val < 20 ? '#ef4444' : entry.val < 50 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Connectivity Quick Stats */}
        <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
          <h3 className="text-lg font-black text-white tracking-tight uppercase">Status Konektivitas</h3>
          <div className="space-y-6">
            {[
              { label: 'Sinyal Kuat', count: 124, icon: <Wifi className="text-emerald-500" />, color: 'emerald' },
              { label: 'Sinyal Lemah', count: 12, icon: <Wifi className="text-orange-500 opacity-60" />, color: 'orange' },
              { label: 'Latency Tinggi', count: 6, icon: <Clock className="text-red-500" />, color: 'red' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  {stat.icon}
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{stat.label}</span>
                </div>
                <span className="text-xl font-black text-white">{stat.count}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
             <div className="flex items-center gap-2 mb-2">
                <RefreshCw size={14} className="text-emerald-500 animate-spin-slow" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sinkronisasi Frekuensi</span>
             </div>
             <p className="text-[11px] text-slate-400 font-bold">Rata-rata frekuensi pengiriman data saat ini adalah <span className="text-white">15 menit/siklus</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalMonitoring;
