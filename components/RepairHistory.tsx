
import React from 'react';
import { History, FileText, Search, Download, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

const RepairHistory: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Riwayat Perbaikan</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Arsip lengkap histori pemeliharaan dan laporan teknis perangkat.</p>
        </div>
        <div className="relative min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input type="text" placeholder="Cari ID Sensor atau teknisi..." className="w-full bg-[#111d1a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50" />
        </div>
      </div>

      <div className="bg-[#111d1a] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-[11px] font-bold">
          <thead className="text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
            <tr>
              <th className="px-10 py-6">ID Sensor</th>
              <th className="px-10 py-6">Jenis Perbaikan</th>
              <th className="px-10 py-6">Tanggal Selesai</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6">Laporan</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 divide-y divide-white/5">
            {[
              { id: 'SNS-089', task: 'Penggantian Modul GSM', date: '20 Okt 2023', status: 'Selesai', color: 'emerald' },
              { id: 'SNS-011', task: 'Perbaikan Sirkuit Pengisi Daya', date: '18 Okt 2023', status: 'Selesai', color: 'emerald' },
              { id: 'SNS-042', task: 'Pembersihan & Inspeksi Rutin', date: '15 Okt 2023', status: 'Selesai', color: 'emerald' },
              { id: 'SNS-005', task: 'Kalibrasi Ulang Sensor', date: '12 Okt 2023', status: 'Pending', color: 'orange' },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-10 py-6 text-white font-black">{item.id}</td>
                <td className="px-10 py-6">{item.task}</td>
                <td className="px-10 py-6 text-slate-500">{item.date}</td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    {item.status === 'Selesai' ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Clock size={12} className="text-orange-500" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Selesai' ? 'text-emerald-500' : 'text-orange-500'}`}>{item.status}</span>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                    <FileText size={14} /> <span className="text-[9px] uppercase tracking-widest">Lihat PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepairHistory;
