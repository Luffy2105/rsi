
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Settings2, 
  Trash2, 
  Save, 
  Radio, 
  Signal, 
  History, 
  Download, 
  Filter, 
  ChevronDown,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Droplets
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_SENSORS } from '../constants';

interface SensorManagementProps {
  onAddSensor: () => void;
  onExport: () => void;
  onMassCalibrate: () => void;
}

const chartData = [
  { time: '00:00', value: -42 },
  { time: '04:00', value: -40 },
  { time: '08:00', value: -45 },
  { time: '12:00', value: -43 },
  { time: '16:00', value: -38 },
  { time: '20:00', value: -35 },
  { time: '23:59', value: -30 },
];

const SensorManagement: React.FC<SensorManagementProps> = ({ onAddSensor, onExport, onMassCalibrate }) => {
  const [selectedSensor, setSelectedSensor] = useState(MOCK_SENSORS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSensors = MOCK_SENSORS.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Manajemen Sensor</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola inventaris, konfigurasi, dan status perangkat sensor.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onMassCalibrate}
            className="bg-white/5 border border-white/10 text-slate-400 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group"
          >
            <Settings2 size={16} className="group-hover:rotate-90 transition-transform" /> Kalibrasi Massal
          </button>
          <button 
            onClick={onAddSensor}
            className="bg-emerald-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Plus size={16} /> Tambah Sensor
          </button>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Terdaftar', val: '142', sub: 'Unit Perangkat', icon: <History className="text-emerald-500" />, color: 'emerald' },
          { label: 'Beroperasi (Aktif)', val: '138', sub: '97.1% dari total', icon: <CheckCircle2 className="text-emerald-400" />, color: 'emerald' },
          { label: 'Maintenance', val: '3', sub: 'Perlu tindakan', icon: <Settings2 className="text-orange-500" />, color: 'orange' },
          { label: 'Offline/Rusak', val: '1', sub: 'Sektor C (Barat)', icon: <AlertTriangle className="text-red-500" />, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111d1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{stat.val}</h3>
            <p className={`text-[10px] font-bold ${stat.color === 'emerald' ? 'text-emerald-500' : stat.color === 'orange' ? 'text-orange-500' : 'text-red-500'}`}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sensor List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#111d1a] rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[800px]">
            {/* List Header/Search */}
            <div className="p-6 border-b border-white/5 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari ID Sensor atau Lokasi..." 
                  className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-[#0a110f] border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-slate-400 flex items-center justify-between uppercase tracking-widest">
                  Semua Sektor <ChevronDown size={14} />
                </button>
                <button className="bg-[#0a110f] border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-slate-400 flex items-center justify-between uppercase tracking-widest">
                  Semua <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {filteredSensors.map((sensor) => (
                <button
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    selectedSensor.id === sensor.id 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-black text-white">{sensor.id}</span>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                      sensor.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : 
                      sensor.status === 'warning' ? 'bg-orange-500/20 text-orange-500' : 
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {sensor.status === 'active' ? 'Aktif' : sensor.status === 'warning' ? 'Maintenance' : 'Offline'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mb-3">{sensor.name}</p>
                  <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5"><Droplets size={12} className="text-blue-500"/> {sensor.lastRead} cm</div>
                    <div className="flex items-center gap-1.5"><Clock size={12}/> {sensor.lastUpdate}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Config Section */}
          <div className="bg-[#111d1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <Radio size={24} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">{selectedSensor.id}</h3>
                  <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Terakhir sinkronisasi: {selectedSensor.lastUpdate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                  <Trash2 size={14} /> Hapus
                </button>
                <button className="bg-emerald-500 text-slate-900 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2">
                  <Save size={14} /> Simpan Perubahan
                </button>
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Konfigurasi Perangkat</h4>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">ID Sensor</label>
                  <input readOnly value={selectedSensor.id} className="w-full bg-[#0a110f] border border-white/5 rounded-xl py-4 px-6 text-sm font-bold text-slate-500 cursor-not-allowed" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Latitude</label>
                    <input defaultValue={selectedSensor.latitude || '-2.1234'} className="w-full bg-[#0a110f] border border-white/5 rounded-xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Longitude</label>
                    <input defaultValue={selectedSensor.longitude || '114.5678'} className="w-full bg-[#0a110f] border border-white/5 rounded-xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Nama / Lokasi</label>
                  <input defaultValue={selectedSensor.name} className="w-full bg-[#0a110f] border border-white/5 rounded-xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Interval Pengiriman Data</label>
                  <div className="relative">
                    <select className="w-full bg-[#0a110f] border border-white/5 rounded-xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                      <option>5 Menit</option>
                      <option>15 Menit</option>
                      <option>30 Menit</option>
                      <option>1 Jam</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Status Operasional</label>
                  <div className="relative">
                    <select className="w-full bg-[#0a110f] border border-white/5 rounded-xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                      <option>Aktif (Normal)</option>
                      <option>Maintenance</option>
                      <option>Non-Aktif (Offline)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
                <div className="flex flex-col justify-end pb-4">
                  <div className="flex items-center gap-3 text-emerald-500">
                    <Signal size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sinyal: 4G LTE (Kuat)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time TMAT Chart Section */}
          <div className="bg-[#111d1a] rounded-3xl border border-white/5 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-lg font-black text-white tracking-tight">Data TMAT Real-time</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Fluktuasi tinggi muka air 24 jam terakhir.</p>
              </div>
              <div className="flex items-center bg-[#0a110f] rounded-xl p-1 border border-white/5">
                {['24 Jam', '7 Hari', '30 Hari'].map((range) => (
                  <button key={range} className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${range === '24 Jam' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}}
                    domain={[-60, 0]}
                  />
                  <Tooltip 
                    contentStyle={{ background: '#111d1a', border: '1px solid #10b98120', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: '#111d1a' }}
                    activeDot={{ r: 6, fill: '#fff', stroke: '#10b981' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History Footer Section */}
          <div className="bg-[#111d1a] rounded-3xl border border-white/5 p-8 flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Riwayat Pembacaan</h4>
            <button 
              onClick={onExport}
              className="text-emerald-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
            >
              <Download size={16} /> Ekspor CSV
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SensorManagement;
