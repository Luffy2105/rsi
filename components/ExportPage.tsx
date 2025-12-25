
import React from 'react';
import { Download, FileSpreadsheet, FileText, Code, CheckCircle2, Calendar, Search } from 'lucide-react';

const ExportPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight">Ekspor Data Kustom</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Unduh dataset penelitian dalam format standar untuk analisis offline.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">1. Konfigurasi Dataset</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rentang Waktu</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                    <input type="date" className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50" />
                  </div>
                  <span className="text-slate-700">-</span>
                  <div className="relative flex-1">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                    <input type="date" className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sektor Target</label>
                <select className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50">
                  <option>Seluruh Sektor Indonesia</option>
                  <option>Sektor A - Gambut Tropis</option>
                  <option>Sektor B - Lahan Pesisir</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-widest">2. Pilih Format Output</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Excel Worksheet', sub: '.xlsx (Recommended)', icon: <FileSpreadsheet className="text-emerald-500" /> },
                { label: 'Comma Separated', sub: '.csv (Raw Data)', icon: <Download className="text-blue-500" /> },
                { label: 'PDF Report', sub: '.pdf (Visualized)', icon: <FileText className="text-red-500" /> },
              ].map((fmt, i) => (
                <button key={i} className={`p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all text-left group`}>
                  <div className="mb-4">{fmt.icon}</div>
                  <p className="text-xs font-black text-white group-hover:text-emerald-500">{fmt.label}</p>
                  <p className="text-[10px] text-slate-600 font-bold mt-1">{fmt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-emerald-500 text-slate-900 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-[0.98]">
            <Download size={18} /> Generate & Unduh Dataset
          </button>
        </div>

        <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
           <h3 className="text-sm font-black text-white uppercase tracking-widest">Riwayat Ekspor</h3>
           <div className="space-y-4">
              {[
                { file: 'Dataset_Q3_SektorA.xlsx', date: '22 Okt 2023', size: '12.4 MB' },
                { file: 'Raw_Logs_Oct_W2.csv', date: '15 Okt 2023', size: '4.1 MB' },
                { file: 'Monthly_Summary.pdf', date: '01 Okt 2023', size: '2.8 MB' },
              ].map((log, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                   <div>
                      <p className="text-[11px] font-black text-white group-hover:text-emerald-500">{log.file}</p>
                      <p className="text-[9px] text-slate-600 font-bold mt-1 uppercase tracking-widest">{log.date} • {log.size}</p>
                   </div>
                   <button className="text-slate-600 hover:text-white transition-colors">
                      <Download size={16} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
