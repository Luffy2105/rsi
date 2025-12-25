
import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend 
} from 'recharts';
import { 
  TrendingUp, Zap, AlertCircle, Droplets, Thermometer, 
  CloudRain, Wind, Compass, ChevronDown, Filter, Search,
  Download, BrainCircuit
} from 'lucide-react';

const analyticsData = [
  { name: '01 Jan', sektorA: -32, sektorB: -40, curahHujan: 12 },
  { name: '02 Jan', sektorA: -35, sektorB: -38, curahHujan: 5 },
  { name: '03 Jan', sektorA: -30, sektorB: -42, curahHujan: 18 },
  { name: '04 Jan', sektorA: -28, sektorB: -45, curahHujan: 25 },
  { name: '05 Jan', sektorA: -33, sektorB: -41, curahHujan: 2 },
  { name: '06 Jan', sektorA: -38, sektorB: -39, curahHujan: 0 },
  { name: '07 Jan', sektorA: -42, sektorB: -44, curahHujan: 0 },
];

const riskData = [
  { subject: 'Kekeringan', A: 80, B: 60, fullMark: 100 },
  { subject: 'Kebakaran', A: 90, B: 50, fullMark: 100 },
  { subject: 'Evaporasi', A: 70, B: 85, fullMark: 100 },
  { subject: 'Anomali', A: 40, B: 30, fullMark: 100 },
  { subject: 'Konektivitas', A: 95, B: 90, fullMark: 100 },
];

const MonitoringAnalysis: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Monitoring & Analisis</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Analisis mendalam korelasi antar variabel lingkungan dan prediksi risiko.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
            <Download size={14} /> Unduh Dataset
          </button>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Analisis Real-time Aktif</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Deep Chart */}
        <div className="lg:col-span-2 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Korelasi TMAT & Curah Hujan</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Data historis 7 hari terakhir per sektor.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TMAT Sektor A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TMAT Sektor B</span>
              </div>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}} />
                <Tooltip contentStyle={{ background: '#111d1a', border: '1px solid #ffffff10', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="sektorA" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorA)" />
                <Area type="monotone" dataKey="sektorB" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorB)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Radar */}
        <div className="bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h3 className="text-lg font-black text-white tracking-tight uppercase">Radar Metrik Risiko</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Sektor A vs Standar Keamanan</p>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 9, fontWeight: '900'}} />
                <Radar name="Sektor A" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Radar name="Sektor B" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-8">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Skor Kekeringan</p>
                <p className="text-xl font-black text-emerald-500 mt-1">High (80)</p>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Risiko Api</p>
                <p className="text-xl font-black text-orange-500 mt-1">Extreme (90)</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* AI Insight Panel */}
        <div className="bg-[#111d1a] p-10 rounded-[40px] border border-emerald-500/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
            <BrainCircuit size={100} className="text-emerald-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-emerald-500" size={24} />
              <h3 className="text-xl font-black text-white tracking-tight uppercase">Prediksi AI (7 Hari)</h3>
            </div>
            <div className="space-y-6">
              <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                "Berdasarkan pola curah hujan rendah dan evaporasi tinggi, TMAT Sektor A diprediksi akan turun ke <span className="text-red-500 font-black">-55cm</span> dalam 3 hari ke depan. Disarankan aktivasi pembasahan lahan."
              </p>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[9px] font-black text-emerald-500 uppercase tracking-widest">92% Confidence</div>
                <div className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest">Model: TMAT-v2.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Factors */}
        <div className="lg:col-span-2 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl">
          <h3 className="text-lg font-black text-white tracking-tight uppercase mb-8">Faktor Lingkungan Sekunder</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Suhu Rata-rata', val: '32.4°C', icon: <Thermometer className="text-orange-500" />, change: '+0.5%' },
              { label: 'Kelembaban Udara', val: '65%', icon: <Droplets className="text-blue-500" />, change: '-2.1%' },
              { label: 'Kecepatan Angin', val: '12 km/h', icon: <Wind className="text-slate-400" />, change: 'Stabil' },
              { label: 'Curah Hujan (Okt)', val: '120 mm', icon: <CloudRain className="text-indigo-400" />, change: '-15%' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 group hover:border-emerald-500/30 transition-all">
                <div className="mb-4">{item.icon}</div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h4 className="text-2xl font-black text-white tracking-tighter">{item.val}</h4>
                  <span className="text-[9px] font-bold text-slate-500">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringAnalysis;
