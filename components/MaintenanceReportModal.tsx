
import React, { useState } from 'react';
import { X, ClipboardCheck, Camera, Save, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MOCK_SENSORS } from '../constants';

interface MaintenanceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MaintenanceReportModal: React.FC<MaintenanceReportModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#111d1a] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-500">
              <ClipboardCheck size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Laporan Pemeliharaan</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Input Cepat Hasil Kunjungan Lapangan</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-20 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
               <CheckCircle2 size={40} className="text-slate-900" />
            </div>
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Laporan Terkirim!</h4>
            <p className="text-slate-500 font-bold text-sm">Data pemeliharaan telah disinkronkan ke pusat.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pilih Sensor</label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                  {MOCK_SENSORS.map(s => (
                    <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Status Fisik Unit</label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                  <option>Operasional (Normal)</option>
                  <option>Korosi Ringan</option>
                  <option>Panel Surya Kotor</option>
                  <option>Kerusakan Eksternal</option>
                  <option>Unit Hilang/Vandalisme</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Detail Tindakan</label>
                <textarea 
                  required
                  placeholder="Ceritakan apa yang dilakukan (misal: pembersihan panel, ganti baterai...)" 
                  rows={3} 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-6 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                <AlertTriangle className="text-emerald-500 flex-shrink-0" size={24} />
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Pastikan koordinat sensor tidak berubah. Jika ada pergeseran unit, laporkan ke Admin melalui modul manajemen sensor.</p>
              </div>
            </div>

            <div className="flex gap-4">
               <button type="button" className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center justify-center gap-3 transition-all border-dashed">
                 <Camera size={20} /> Ambil Foto Bukti
               </button>
               <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-emerald-500 text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3"
               >
                 {isSubmitting ? 'Mengirim...' : 'Simpan Laporan'} <Save size={18} />
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MaintenanceReportModal;
