
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Download, 
  Search, 
  Plus, 
  ChevronDown, 
  FileSpreadsheet, 
  Code, 
  TrendingUp,
  Filter,
  ArrowRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const trendData = [
  { name: 'SEN', sektorA: -35, sektorB: -42 },
  { name: 'SEL', sektorA: -30, sektorB: -40 },
  { name: 'RAB', sektorA: -45, sektorB: -48 },
  { name: 'KAM', sektorA: -38, sektorB: -45 },
  { name: 'JUM', sektorA: -52, sektorB: -55 },
  { name: 'SAB', sektorA: -25, sektorB: -35 },
  { name: 'MIN', sektorA: -40, sektorB: -42 },
];

const archiveData = [
  { name: 'Laporan_Harian_SektorA.pdf', type: 'Harian', period: '13 Okt 2023', created: '14 Okt 2023, 08:00', icon: <FileText size={16} className="text-red-400" /> },
  { name: 'Rekap_Mingguan_W40.csv', type: 'Mingguan', period: '01 Okt - 07 Okt 2023', created: '08 Okt 2023, 09:15', icon: <FileSpreadsheet size={16} className="text-emerald-400" /> },
  { name: 'Analisis_Musiman_Q3.json', type: 'Kustom', period: 'Jul - Sep 2023', created: '01 Okt 2023, 14:30', icon: <Code size={16} className="text-orange-400" /> },
  { name: 'Laporan_Bulanan_September.pdf', type: 'Bulanan', period: 'September 2023', created: '01 Okt 2023, 08:00', icon: <FileText size={16} className="text-red-400" /> },
];

const ReportManagement: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Pusat Laporan & Analisis</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola laporan otomatis, ekspor data, dan analisis tren musiman.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="bg-[#111d1a] border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-3">
              Oktober 2023 <ChevronDown size={14} />
            </button>
          </div>
          <button className="bg-emerald-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <Plus size={16} /> Buat Laporan Baru
          </button>
        </div>
      </div>

      {/* Quick Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Laporan Harian', date: '14 Oktober 2023', status: 'Siap', icon: <Calendar className="text-blue-400" />, statusColor: 'text-emerald-500' },
          { title: 'Laporan Mingguan', date: 'Minggu ke-41 (Okt)', status: 'Siap', icon: <FileSpreadsheet className="text-emerald-400" />, statusColor: 'text-emerald-500' },
          { title: 'Laporan Bulanan', date: 'Periode: September 2023', status: 'Arsip', icon: <FileText className="text-orange-400" />, statusColor: 'text-purple-400' },
        ].map((card, i) => (
          <div key={i} className="bg-[#111d1a] p-8 rounded-3xl border border-white/5 relative group transition-all hover:border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-base font-black text-white tracking-tight">{card.title}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{card.date}</p>
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${card.statusColor}`}>{card.status}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button className="bg-[#0a110f] border border-white/5 hover:border-emerald-500/30 py-3 rounded-xl flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest group/btn">
                <FileText size={12} className="group-hover/btn:text-red-400" /> PDF
              </button>
              <button className="bg-[#0a110f] border border-white/5 hover:border-emerald-500/30 py-3 rounded-xl flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest group/btn">
                <FileSpreadsheet size={12} className="group-hover/btn:text-emerald-400" /> CSV
              </button>
              <button className="bg-[#0a110f] border border-white/5 hover:border-emerald-500/30 py-3 rounded-xl flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest group/btn">
                <Code size={12} className="group-hover/btn:text-orange-400" /> JSON
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mid Section: Chart & Custom Export */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Comparison Chart */}
        <div className="lg:col-span-8 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Analisis Tren & Perbandingan</h3>
              <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Fluktuasi TMAT: Sektor A vs Sektor B (7 Hari)</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sektor A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sektor B</span>
              </div>
            </div>
          </div>

          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: '900', letterSpacing: '0.1em'}} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}}
                  domain={[-60, 0]}
                />
                <Tooltip 
                  contentStyle={{ background: '#111d1a', border: '1px solid #ffffff10', borderRadius: '16px' }}
                  itemStyle={{ fontWeight: 'black', fontSize: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sektorA" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 4, stroke: '#111d1a' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sektorB" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  strokeDasharray="8 8"
                  dot={{ r: 6, fill: '#3b82f6', strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 4, stroke: '#111d1a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Custom Export Form */}
        <div className="lg:col-span-4 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Ekspor Kustom</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Konfigurasi parameter data spesifik.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Lokasi Sensor</label>
              <div className="relative">
                <select className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                  <option>Semua Sektor</option>
                  <option>Sektor A</option>
                  <option>Sektor B</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rentang Waktu</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input type="date" className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-4 text-[10px] font-bold text-white outline-none focus:border-emerald-500/50" />
                </div>
                <div className="relative">
                  <input type="date" className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-4 text-[10px] font-bold text-white outline-none focus:border-emerald-500/50" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Format File</label>
              <div className="flex items-center gap-6 p-4 bg-[#0a110f] rounded-2xl border border-white/5">
                {['PDF', 'CSV', 'JSON'].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="format" 
                      checked={selectedFormat === fmt.toLowerCase()}
                      onChange={() => setSelectedFormat(fmt.toLowerCase())}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selectedFormat === fmt.toLowerCase() ? 'border-emerald-500 bg-emerald-500' : 'border-slate-700'}`}>
                      {selectedFormat === fmt.toLowerCase() && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${selectedFormat === fmt.toLowerCase() ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{fmt}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-emerald-500 text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-3 active:scale-[0.98]">
              <Download size={16} /> Unduh Data
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Table: Archive */}
      <div className="bg-[#111d1a] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-black text-white tracking-tight">Arsip Laporan</h3>
          <div className="relative min-w-[320px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Cari laporan..." 
              className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-3.5 pl-14 pr-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold">
            <thead className="text-slate-500 uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-10 py-6">Nama Laporan</th>
                <th className="px-10 py-6">Tipe</th>
                <th className="px-10 py-6">Periode</th>
                <th className="px-10 py-6">Tanggal Dibuat</th>
                <th className="px-10 py-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-white/5">
              {archiveData.map((item, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white/5 rounded-xl">
                        {item.icon}
                      </div>
                      <span className="text-sm font-black text-white group-hover:text-emerald-500 transition-colors cursor-pointer">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/5 text-slate-400 border border-white/5`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-slate-400">
                    {item.period}
                  </td>
                  <td className="px-10 py-6 text-slate-500 font-medium">
                    {item.created}
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-3 hover:bg-emerald-500/10 rounded-xl text-slate-500 hover:text-emerald-500 transition-all">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
            Menampilkan <span className="text-white">1-4</span> dari <span className="text-white">28</span> laporan
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg text-slate-500 hover:text-white transition-all disabled:opacity-20">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-900 text-[10px] font-black shadow-lg shadow-emerald-500/20">1</button>
            <button className="w-8 h-8 rounded-lg text-slate-500 text-[10px] font-black hover:text-white transition-all">2</button>
            <button className="w-8 h-8 rounded-lg text-slate-500 text-[10px] font-black hover:text-white transition-all">3</button>
            <button className="p-2 rounded-lg text-slate-500 hover:text-white transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;
