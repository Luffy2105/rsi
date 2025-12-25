
import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, MapPin, Table as TableIcon, Layers, ChevronDown, Download, Radio, Signal, Info, X } from 'lucide-react';
import { MOCK_SENSORS } from '../constants';

declare const L: any; // Global Leaflet from index.html

const DataMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  // Initialize Map
  useEffect(() => {
    if (viewMode === 'map' && typeof L !== 'undefined' && !mapRef.current) {
      const indonesiaBounds = L.latLngBounds(
        L.latLng(-11.5, 94.5),
        L.latLng(6.5, 141.5)
      );

      mapRef.current = L.map('interactive-map', {
        zoomControl: false,
        attributionControl: false,
        maxBounds: indonesiaBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 4,
        worldCopyJump: false
      }).setView([-2.5, 118], 5);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        noWrap: true,
        bounds: indonesiaBounds
      }).addTo(mapRef.current);

      // Add Markers
      MOCK_SENSORS.forEach(sensor => {
        const markerColor = sensor.status === 'active' ? '#10b981' : sensor.status === 'warning' ? '#f59e0b' : '#ef4444';
        const lat = sensor.latitude || -2.5;
        const lng = sensor.longitude || 118;
        
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
              <div style="position: absolute; width: 32px; height: 32px; background-color: ${markerColor}; opacity: 0.2; border-radius: 50%;"></div>
              <div style="width: 14px; height: 14px; background-color: ${markerColor}; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([lat, lng], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="padding: 12px; min-width: 180px; font-family: 'Inter', sans-serif;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${markerColor};"></div>
                <p style="margin: 0; font-weight: 900; font-size: 13px; color: #0f172a;">${sensor.id}</p>
              </div>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: #64748b; font-weight: 600;">${sensor.name}</p>
              <div style="background: #f8fafc; padding: 10px; border-radius: 12px; border: 1px solid #f1f5f9;">
                <p style="margin: 0 0 4px 0; font-size: 9px; color: #94a3b8; font-weight: 900; text-transform: uppercase;">Pembacaan TMAT</p>
                <p style="margin: 0; font-size: 16px; font-weight: 900; color: ${markerColor};">${sensor.lastRead} cm</p>
              </div>
            </div>
          `);
        
        markersRef.current[sensor.id] = marker;

        marker.on('click', () => {
          setSelectedSensor(sensor);
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [viewMode]);

  // Handle Search Input & Suggestions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value.length > 0) {
      const filtered = MOCK_SENSORS.filter(s => 
        s.id.toLowerCase().includes(value.toLowerCase()) || 
        s.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSensor = (sensor: any) => {
    setSearch(sensor.id);
    setShowSuggestions(false);
    setSelectedSensor(sensor);
    
    if (mapRef.current && sensor.latitude && sensor.longitude) {
      mapRef.current.flyTo([sensor.latitude, sensor.longitude], 12, {
        animate: true,
        duration: 1.5
      });
      
      // Open popup manually
      setTimeout(() => {
        if (markersRef.current[sensor.id]) {
          markersRef.current[sensor.id].openPopup();
        }
      }, 1600);
    }
  };

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Data & Peta Interaktif</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Eksplorasi spasial dan akses raw data sensor lapangan secara presisi.</p>
        </div>
        <div className="flex bg-[#111d1a] border border-white/10 p-1.5 rounded-2xl shadow-xl">
          <button 
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-emerald-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <Layers size={14} /> Tampilan Peta
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-emerald-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            <TableIcon size={14} /> Tabel Data
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 h-[750px]">
        {/* Sidebar Controls */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-[#111d1a] p-8 rounded-[40px] border border-white/5 shadow-2xl space-y-8 flex-1">
            <div className="relative">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Cari ID Sensor</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Ketik ID (Contoh: SNS-042)"
                  className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50 transition-all"
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={() => search.length > 0 && setShowSuggestions(true)}
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-[#1a2b27] border border-white/10 rounded-2xl shadow-2xl z-[1000] overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-white/5 bg-white/[0.02]">
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Saran ID Sensor</p>
                    </div>
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => selectSensor(s)}
                        className="w-full text-left p-4 hover:bg-emerald-500 group transition-all flex items-center justify-between border-b border-white/5 last:border-0"
                      >
                        <div>
                          <p className="text-xs font-black text-white group-hover:text-slate-900">{s.id}</p>
                          <p className="text-[10px] text-slate-500 font-bold group-hover:text-slate-800">{s.name}</p>
                        </div>
                        <MapPin size={14} className="text-emerald-500 group-hover:text-slate-900" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Filter Sektor</h3>
              <div className="relative">
                <select className="w-full bg-[#0a110f] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-emerald-500/50 appearance-none">
                  <option>Semua Wilayah</option>
                  <option>Sektor A - Utara</option>
                  <option>Sektor B - Pesisir</option>
                  <option>Sektor C - Barat</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Informasi Sensor Terpilih</h3>
              {selectedSensor ? (
                <div className="bg-[#0a110f] p-6 rounded-3xl border border-emerald-500/20 space-y-5 animate-in slide-in-from-left-4">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                        <Radio size={20} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-white">{selectedSensor.id}</p>
                        <p className="text-[10px] text-slate-500 font-bold">{selectedSensor.status === 'active' ? 'Operasional' : 'Maintenance'}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase">TMAT</p>
                        <p className="text-sm font-black text-white">{selectedSensor.lastRead} cm</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase">Baterai</p>
                        <p className="text-sm font-black text-white">{selectedSensor.battery}%</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedSensor(null)} className="w-full text-center text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest pt-2">Tutup Detail</button>
                </div>
              ) : (
                <div className="p-10 border-2 border-dashed border-white/5 rounded-3xl text-center">
                  <Info size={24} className="text-slate-700 mx-auto mb-3" />
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">Pilih sensor di peta atau cari ID untuk melihat detail.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-[#111d1a] p-6 rounded-[32px] border border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Engine</span>
             </div>
             <div className="text-[10px] font-bold text-slate-500 italic">v2.4.0</div>
          </div>
        </div>

        {/* Display Area */}
        <div className="lg:col-span-3 bg-[#111d1a] rounded-[48px] border border-white/5 shadow-2xl overflow-hidden relative group">
          {viewMode === 'map' ? (
            <div className="w-full h-full relative">
              <div id="interactive-map" className="w-full h-full grayscale contrast-[1.1] brightness-[0.85] opacity-90"></div>
              
              {/* Overlay Peta */}
              <div className="absolute top-8 left-8 z-[500] pointer-events-none">
                 <div className="bg-[#0a110f]/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4">
                    <Signal size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Sistem Monitoring Aktif</span>
                 </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-10 right-10 z-[500] flex flex-col gap-3">
                 <button onClick={zoomIn} className="w-12 h-12 bg-white text-slate-900 rounded-2xl shadow-2xl font-black text-xl hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95">+</button>
                 <button onClick={zoomOut} className="w-12 h-12 bg-white text-slate-900 rounded-2xl shadow-2xl font-black text-xl hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95">-</button>
              </div>

              {/* Legend Box */}
              <div className="absolute bottom-10 left-10 z-[500]">
                 <div className="bg-[#0a110f]/80 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Normal (0 s/d -40cm)</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Waspada (-40 s/d -60cm)</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Kritis ( &lt; -60cm)</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight uppercase">Tabel Inventaris Raw Data</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Total data tersedia: {MOCK_SENSORS.length} unit perangkat</p>
                </div>
                <button className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-900 transition-all">
                  <Download size={16} /> Ekspor Dataset
                </button>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-[11px] font-bold">
                  <thead className="text-slate-500 uppercase tracking-widest border-b border-white/5 sticky top-0 bg-[#111d1a] z-10">
                    <tr>
                      <th className="px-10 py-6">ID Sensor</th>
                      <th className="px-10 py-6">Nama Lokasi</th>
                      <th className="px-10 py-6">TMAT (cm)</th>
                      <th className="px-10 py-6">Status Perangkat</th>
                      <th className="px-10 py-6">Koordinat Spasial</th>
                      <th className="px-10 py-6">Baterai</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-white/5">
                    {MOCK_SENSORS.map((s, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => { setViewMode('map'); selectSensor(s); }}>
                        <td className="px-10 py-6 text-white font-black group-hover:text-emerald-500">{s.id}</td>
                        <td className="px-10 py-6 text-slate-500 font-medium">{s.name}</td>
                        <td className="px-10 py-6">
                           <span className={`text-base font-black ${s.status === 'warning' ? 'text-orange-500' : 'text-emerald-500'}`}>{s.lastRead}</span>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            s.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                          }`}>
                            {s.status === 'active' ? 'Operasional' : 'Maintenance'}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-slate-600 font-mono text-[10px]">
                           {s.latitude.toFixed(4)}, {s.longitude.toFixed(4)}
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className={`h-full ${s.battery > 30 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${s.battery}%` }}></div>
                            </div>
                            <span className="text-[10px] font-black">{s.battery}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataMap;
