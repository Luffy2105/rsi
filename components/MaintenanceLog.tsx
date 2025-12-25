
import React from 'react';
import { 
  Wrench, ClipboardCheck, Plus, History, 
  MapPin, User, Save, Camera, AlertCircle 
} from 'lucide-react';

const MaintenanceLog: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">Pemeliharaan Lapangan</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Input laporan kunjungan fisik dan pantau aktivitas teknisi di wilayah tugas.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Field Input Form */}
        <div className="lg:col-span-7 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase">Input Hasil Lapangan</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">ID Sensor Diperiksa</label>
              <select className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50">
                <option>SNS-042 (Sektor A)</option>
                <option>SNS-043 (Sektor A)</option>
                <option>SNS-011 (Sektor B)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Kondisi Fisik</label>
              <select className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50">
                <option>Normal (Baik)</option>
                <option>Korosi Ringan</option>
                <option>Panel Surya Kotor</option>
                <option>Rusak/Vandalisme</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tindakan Diambil</label>
              <textarea rows={3} placeholder="Ceritakan apa yang dikerjakan di lapangan..." className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 resize-none"></textarea>
            </div>
            <div className="md:col-span-2">
               <button className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center justify-center gap-3 transition-all border-dashed">
                 <Camera size={18} /> Unggah Foto Bukti (Opsional)
               </button>
            </div>
          </div>

          <button className="w-full bg-emerald-500 text-slate-900 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl flex items-center justify-center gap-3">
            <Save size={18} /> Simpan Laporan Aktivitas
          </button>
        </div>

        {/* Activity Log List */}
        <div className="lg:col-span-5 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
           <h3 className="text-lg font-black text-white tracking-tight uppercase flex items-center gap-3">
             <History size={20} className="text-slate-500" /> Log Aktivitas
           </h3>
           <div className="space-y-6">
              {[
                { tech: 'Budi Santoso', action: 'Pembersihan Panel SNS-042', time: '10:45 WIB', loc: 'Sektor A' },
                { tech: 'Budi Santoso', action: 'Ganti Baterai SNS-011', time: '08:20 WIB', loc: 'Sektor B' },
                { tech: 'Andi Wijaya', action: 'Kalibrasi Sensor SNS-043', time: 'Kemarin', loc: 'Sektor A' },
              ].map((log, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 group hover:bg-white/5 transition-all">
                   <div className="flex justify-between items-start">
                      <p className="text-xs font-black text-white group-hover:text-emerald-500 transition-colors">{log.action}</p>
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{log.time}</span>
                   </div>
                   <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      <div className="flex items-center gap-1"><User size={12}/> {log.tech}</div>
                      <div className="flex items-center gap-1"><MapPin size={12}/> {log.loc}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceLog;
