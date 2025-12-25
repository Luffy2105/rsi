
import React from 'react';
import { X, Plus, MapPin, Radio, Signal, Database } from 'lucide-react';

interface AddSensorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSensorModal: React.FC<AddSensorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#111d1a] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-500">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Tambah Perangkat</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Registrasi Sensor TMAT Baru</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">ID Sensor unik</label>
              <div className="relative">
                <Radio className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input placeholder="SNS-XXX" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nama Lokasi / Sektor</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input placeholder="Contoh: Sektor A Blok 1" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Koordinat Lintang (Lat)</label>
              <input placeholder="-2.12345" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Koordinat Bujur (Long)</label>
              <input placeholder="114.56789" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
            </div>

            <div className="md:col-span-2 bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl flex items-start gap-5">
              <Signal className="text-emerald-500 mt-1" size={24} />
              <div>
                <p className="text-sm font-black text-emerald-500 mb-1">Verifikasi Jaringan Otomatis</p>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Sistem akan mencoba melakukan handshake pertama saat data koordinat disimpan untuk memastikan sensor terhubung ke gateway terdekat.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 border-t border-white/5 flex items-center justify-end gap-8 bg-white/[0.02]">
          <button 
            onClick={onClose}
            className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
          >
            Batal
          </button>
          <button className="bg-emerald-500 text-slate-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3">
            Simpan Perangkat <Database size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSensorModal;
