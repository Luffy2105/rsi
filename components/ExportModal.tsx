
import React from 'react';
import { X, FileSpreadsheet, FileText, Code, Download, Calendar } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#111d1a] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-black text-white tracking-tight">Ekspor Laporan</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Format Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Format Ekspor</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'csv', label: 'CSV', icon: <FileSpreadsheet size={20} /> },
                { id: 'pdf', label: 'PDF', icon: <FileText size={20} /> },
                { id: 'json', label: 'JSON', icon: <Code size={20} /> },
              ].map((format) => (
                <button 
                  key={format.id}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${
                    format.id === 'csv' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                      : 'bg-white/[0.03] border-white/5 text-slate-500 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="mb-2">{format.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Periode Data</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <p className="absolute left-4 top-[-8px] bg-[#111d1a] px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest z-10">Mulai</p>
                <input 
                  type="date" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50" 
                />
              </div>
              <div className="relative">
                <p className="absolute left-4 top-[-8px] bg-[#111d1a] px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest z-10">Selesai</p>
                <input 
                  type="date" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 px-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50" 
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Detail Laporan</label>
            <div className="space-y-3">
              {[
                { id: 'sensor', label: 'Data Sensor', desc: 'Tinggi muka air dan kelembaban tanah.', active: true },
                { id: 'trend', label: 'Analisis Tren', desc: 'Termasuk grafik dan prediksi visual.', active: false },
              ].map((item) => (
                <div 
                  key={item.id}
                  className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${item.active ? 'bg-emerald-500 border-emerald-500 text-[#111d1a]' : 'border-white/10'}`}>
                    {item.active && <X size={14} className="rotate-45" />}
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{item.label}</p>
                    <p className="text-[10px] text-slate-500 font-bold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 flex items-center justify-end gap-6 bg-white/[0.02]">
          <button 
            onClick={onClose}
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
          >
            Batal
          </button>
          <button className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2">
            <Download size={16} /> Ekspor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
