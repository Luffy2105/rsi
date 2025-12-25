
import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Bell, 
  FileText, 
  Download, 
  UploadCloud, 
  RefreshCw, 
  Save, 
  History, 
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isEmailNotify, setIsEmailNotify] = useState(true);
  const [isSmsNotify, setIsSmsNotify] = useState(false);
  const [isWeeklyReport, setIsWeeklyReport] = useState(true);
  const [reportFormat, setReportFormat] = useState<'pdf' | 'excel'>('pdf');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Pengaturan Sistem</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola konfigurasi global, pencadangan data, dan preferensi notifikasi.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
            <History size={14} /> Log Perubahan
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-emerald-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />} 
            {isSaving ? 'Menyimpan...' : 'Simpan Konfigurasi'}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-500 animate-in slide-in-from-top-2">
          <CheckCircle2 size={18} />
          <p className="text-xs font-black uppercase tracking-widest">Konfigurasi sistem berhasil diperbarui secara global.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-8">
          
          {/* General Settings */}
          <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Settings size={20} />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase">Pengaturan Umum</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nama Sistem</label>
                <input 
                  defaultValue="AP-TMAT Dashboard Monitoring" 
                  className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Zona Waktu</label>
                  <div className="relative">
                    <select className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                      <option>WIB (UTC+7)</option>
                      <option>WITA (UTC+8)</option>
                      <option>WIT (UTC+9)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bahasa</label>
                  <div className="relative">
                    <select className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                      <option>Bahasa Indonesia</option>
                      <option>English (US)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight">Mode Pemeliharaan</h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Nonaktifkan akses pengguna umum sementara.</p>
                </div>
                <button 
                  onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isMaintenanceMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isMaintenanceMode ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 border border-orange-500/20">
                <Bell size={20} />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase">Notifikasi & Ambang Batas</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ambang Batas Bahaya TMAT</label>
                <span className="text-red-500 font-black text-xs">-40 cm</span>
              </div>
              <div className="relative">
                <input type="range" min="-100" max="0" defaultValue="-40" className="w-full h-1 bg-[#0a110f] rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                <p className="text-[9px] text-slate-600 font-bold mt-3 uppercase tracking-widest italic">Peringatan akan dikirim jika sensor mendeteksi tinggi muka air di bawah nilai ini.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-300">Notifikasi Email Admin</span>
                  </div>
                  <button 
                    onClick={() => setIsEmailNotify(!isEmailNotify)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${isEmailNotify ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isEmailNotify ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-300">Peringatan SMS / WhatsApp</span>
                  </div>
                  <button 
                    onClick={() => setIsSmsNotify(!isSmsNotify)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${isSmsNotify ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isSmsNotify ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Kontak Darurat</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    defaultValue="emergency@aptmat.id" 
                    className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Backup & Recovery */}
          <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Database size={20} />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase">Pencadangan & Pemulihan</h3>
            </div>

            <div className="bg-[#0a110f] p-6 rounded-3xl border border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight">Cadangan Terakhir</h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">23 Oktober 2023, 02:00 WIB</p>
                </div>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Sukses</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/5 border border-white/10 text-slate-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2">
                  <Download size={14} /> Unduh
                </button>
                <button className="bg-emerald-500 text-slate-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10">
                  <RefreshCw size={14} /> Cadangkan Sekarang
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pulihkan Data (Restore)</label>
              <div className="border-2 border-dashed border-white/10 rounded-[24px] p-10 text-center hover:border-emerald-500/30 transition-all cursor-pointer group">
                <UploadCloud className="mx-auto text-slate-600 mb-4 group-hover:text-emerald-500 transition-colors" size={32} />
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Klik untuk unggah atau seret file</p>
                <p className="text-[9px] text-slate-600 font-bold mt-2 uppercase tracking-widest">SQL, JSON, atau CSV (MAX. 50MB)</p>
              </div>
            </div>
          </div>

          {/* Report Settings */}
          <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20">
                <FileText size={20} />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase">Pengaturan Laporan</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight">Laporan Mingguan Otomatis</h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Kirim ringkasan setiap Senin 08:00 WIB.</p>
                </div>
                <button 
                  onClick={() => setIsWeeklyReport(!isWeeklyReport)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isWeeklyReport ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isWeeklyReport ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Format Default Laporan</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setReportFormat('pdf')}
                    className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${reportFormat === 'pdf' ? 'bg-[#0a110f] border-emerald-500/50 text-white' : 'bg-[#0a110f] border-white/5 text-slate-500'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${reportFormat === 'pdf' ? 'border-emerald-500' : 'border-slate-700'}`}>
                      {reportFormat === 'pdf' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Dokumen PDF</span>
                  </button>
                  <button 
                    onClick={() => setReportFormat('excel')}
                    className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${reportFormat === 'excel' ? 'bg-[#0a110f] border-emerald-500/50 text-white' : 'bg-[#0a110f] border-white/5 text-slate-500'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${reportFormat === 'excel' ? 'border-emerald-500' : 'border-slate-700'}`}>
                      {reportFormat === 'excel' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Excel (.xlsx)</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Daftar Penerima (Dipisahkan koma)</label>
                <textarea 
                  defaultValue="manajer@aptmat.id, kepala.lapangan@aptmat.id" 
                  rows={3}
                  className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 resize-none transition-all"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
