
import React, { useEffect, useRef } from 'react';
import { 
  Waves, 
  Search, 
  MapPin, 
  Radio, 
  Droplets, 
  AlertTriangle, 
  Globe, 
  TrendingUp, 
  Calendar,
  Plus,
  Minus,
  Settings,
  ChevronRight
} from 'lucide-react';
import { MOCK_SENSORS } from '../constants';

interface LandingPageProps {
  onLoginClick: () => void;
}

declare const L: any; // Global Leaflet from index.html

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof L !== 'undefined' && !mapRef.current) {
      const indonesiaBounds = L.latLngBounds(
        L.latLng(-11.5, 94.5),
        L.latLng(6.5, 141.5)
      );

      mapRef.current = L.map('map-container', {
        zoomControl: false,
        attributionControl: false,
        maxBounds: indonesiaBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 5,
        worldCopyJump: false
      }).setView([-2.5, 118], 5);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        noWrap: true,
        bounds: indonesiaBounds
      }).addTo(mapRef.current);

      MOCK_SENSORS.forEach(sensor => {
        const markerColor = sensor.status === 'active' ? '#10b981' : '#f59e0b';
        const pulseClass = sensor.status === 'active' ? 'animate-pulse' : '';
        const lat = sensor.latitude || -2.5;
        const lng = sensor.longitude || 118;
        
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
              <div style="position: absolute; width: 32px; height: 32px; background-color: ${markerColor}; opacity: 0.2; border-radius: 50%;" class="${pulseClass}"></div>
              <div style="width: 16px; height: 16px; background-color: ${markerColor}; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        L.marker([lat, lng], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="padding: 12px; min-width: 150px; font-family: 'Inter', sans-serif;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${markerColor};"></div>
                <p style="margin: 0; font-weight: 900; font-size: 12px; color: #0f172a;">${sensor.id}</p>
              </div>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; font-weight: 600;">${sensor.name}</p>
              <div style="background: #f8fafc; padding: 8px; border-radius: 8px; border: 1px solid #f1f5f9;">
                <p style="margin: 0 0 4px 0; font-size: 9px; color: #94a3b8; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">TMA Tanah</p>
                <p style="margin: 0; font-size: 14px; font-weight: 900; color: #059669;">${sensor.lastRead} cm</p>
              </div>
            </div>
          `);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#05110d] text-white min-h-screen font-inter selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Decorative Atmospheric Blobs */}
      <div className="hidden 2xl:block fixed top-0 left-[-10%] w-[40%] h-[60%] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="hidden 2xl:block fixed bottom-0 right-[-10%] w-[40%] h-[60%] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-[1000] bg-[#05110d]/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 lg:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <Waves className="text-slate-900" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">AP-TMAT</span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-400 transition-colors">Beranda</button>
            <button onClick={() => scrollToSection('peta')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-400 transition-colors">Peta Sebaran</button>
            <button onClick={() => scrollToSection('tentang')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-400 transition-colors">Sistem</button>
            <button onClick={() => scrollToSection('berita')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-400 transition-colors">Berita</button>
            <button onClick={onLoginClick} className="bg-emerald-500 text-slate-900 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10">Portal Akses</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 lg:pt-60 pb-32 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">IoT Infrastructure v3.0</span>
            </div>
            <h1 className="text-6xl lg:text-[100px] font-black mb-8 leading-[0.9] tracking-tighter">
              Pemantauan <span className="text-emerald-500">Gambut</span> Presisi Tinggi.
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl mb-12 leading-relaxed font-medium max-w-2xl">
              Sistem analisis Tinggi Muka Air Tanah (TMAT) terpadu untuk konservasi lahan gambut Indonesia berbasis kecerdasan buatan dan IoT.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => scrollToSection('peta')}
                className="bg-emerald-500 text-slate-900 px-12 py-5 rounded-[24px] font-black hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 text-sm uppercase tracking-widest"
              >
                Eksplorasi Peta <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('tentang')}
                className="bg-white/5 border border-white/10 px-12 py-5 rounded-[24px] font-black hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
              >
                Pelajari Data
              </button>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-8 pt-12 border-t border-white/5 max-w-lg">
              <div>
                <p className="text-3xl font-black text-white">142+</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sensor Aktif</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Monitoring</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">98%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Akurasi Data</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative group animate-in fade-in slide-in-from-right duration-1000 hidden lg:block">
            <div className="relative aspect-[4/5] bg-emerald-950/20 rounded-[80px] overflow-hidden border border-emerald-500/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                alt="Peatland"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05110d] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                    <Radio className="text-slate-900" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">SNS-042 Online</p>
                    <p className="text-lg font-black text-white">Sektor A, Blok Utara</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tinggi Muka Air</p>
                    <p className="text-3xl font-black text-white">-38.4 cm</p>
                  </div>
                  <div className="text-right">
                    <div className="h-10 w-24 bg-emerald-500/10 rounded-lg flex items-end gap-1 px-3 py-2">
                       <div className="w-full bg-emerald-500 h-[40%] rounded-sm"></div>
                       <div className="w-full bg-emerald-500 h-[60%] rounded-sm"></div>
                       <div className="w-full bg-emerald-500 h-[30%] rounded-sm"></div>
                       <div className="w-full bg-emerald-500 h-[80%] rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Decorative Card */}
            <div className="absolute -top-12 -right-12 bg-[#0a110f] border border-white/10 p-6 rounded-[32px] shadow-2xl animate-bounce-slow">
              <Globe className="text-emerald-500 mb-2" size={32} />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cloud Sync</p>
            </div>
          </div>
        </div>
      </section>

      {/* Peta Section */}
      <section id="peta" className="px-6 lg:px-12 mb-40">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-5xl lg:text-6xl font-black mb-6 tracking-tighter">Sebaran Geografis</h2>
              <p className="text-slate-500 font-medium text-lg max-w-xl">Monitor setiap titik pengamatan secara real-time melalui peta interaktif kami yang terintegrasi dengan jaringan IoT global.</p>
            </div>
            <div className="flex gap-4">
               <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">138 Aktif</span>
               </div>
               <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">4 Perbaikan</span>
               </div>
            </div>
          </div>
          
          <div className="bg-[#111d1a] rounded-[80px] p-4 h-[800px] relative overflow-hidden shadow-2xl border border-white/5">
            <div id="map-container" className="w-full h-full rounded-[68px] grayscale contrast-125 opacity-80 brightness-75"></div>
            
            <div className="absolute top-12 left-12 z-[500] w-full max-w-sm">
              <div className="bg-[#0a110f]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="Cari lokasi atau ID sensor..." 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-white outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-12 right-12 z-[500]">
              <div className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-2xl text-xs font-black flex items-center gap-3 shadow-2xl shadow-emerald-500/20 uppercase tracking-[0.2em]">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div> Live Monitoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="tentang" className="px-6 lg:px-12 mb-40 bg-white/[0.02] py-40 border-y border-white/5">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-4 gap-12">
          {[
            { 
              title: 'Integrasi IoT', 
              desc: 'Penerimaan data otomatis dari lokasi terpencil melalui gateway GSM mandiri.', 
              icon: <Radio className="text-emerald-400" />,
              count: '01'
            },
            { 
              title: 'Skalabilitas', 
              desc: 'Mampu menangani ribuan titik sensor di seluruh kepulauan Indonesia secara simultan.', 
              icon: <Globe className="text-emerald-400" />,
              count: '02'
            },
            { 
              title: 'Analisis AI', 
              desc: 'Prediksi risiko kebakaran dan kekeringan menggunakan model pembelajaran mesin.', 
              icon: <TrendingUp className="text-emerald-400" />,
              count: '03'
            },
            { 
              title: 'Mitigasi Dini', 
              desc: 'Sistem peringatan otomatis melalui SMS dan Email untuk aksi cepat di lapangan.', 
              icon: <AlertTriangle className="text-emerald-400" />,
              count: '04'
            },
          ].map((feature, i) => (
            <div key={i} className="group p-12 rounded-[48px] border border-transparent hover:border-emerald-500/20 hover:bg-[#111d1a]/50 transition-all">
              <p className="text-6xl font-black text-white/5 mb-8 group-hover:text-emerald-500/10 transition-colors">{feature.count}</p>
              <div className="bg-emerald-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-10 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all transform group-hover:-translate-y-2">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-black mb-6">{feature.title}</h4>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section id="berita" className="px-6 lg:px-12 mb-40">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter">Wawasan & Berita</h2>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2 hover:gap-4 transition-all">
              Lihat Semua Artikel <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { cat: 'RISET', title: 'Dampak Perubahan Iklim pada Lahan Gambut Tropis Indonesia', date: '20 Jan 2024', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800' },
              { cat: 'TEKNIS', title: 'Optimalisasi Konsumsi Baterai Sensor IoT di Area Minim Sinyal', date: '15 Jan 2024', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
              { cat: 'BERITA', title: 'Kolaborasi AP-TMAT dengan Komunitas Masyarakat Peduli Api', date: '10 Jan 2024', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800' },
            ].map((news, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-[60px] overflow-hidden mb-10 border border-white/10 relative shadow-2xl">
                  <img src={news.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" alt={news.title} />
                  <div className="absolute top-8 left-8">
                    <span className="bg-emerald-500 text-slate-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">{news.cat}</span>
                  </div>
                </div>
                <div className="px-4">
                  <h4 className="text-3xl font-black mb-6 group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">{news.title}</h4>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    <Calendar size={14} className="text-emerald-500" /> {news.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030a08] pt-40 pb-20 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-emerald-500 p-2 rounded-xl">
                <Waves className="text-slate-900" size={32} />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase">AP-TMAT</span>
            </div>
            <p className="text-slate-500 text-xl leading-relaxed max-w-md font-medium mb-12">
              Membangun kedaulatan data lingkungan untuk masa depan ekosistem gambut yang berkelanjutan di Indonesia.
            </p>
            <div className="flex gap-6">
               {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(s => (
                 <a key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">{s}</a>
               ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-2 gap-12">
            <div>
              <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Navigasi</h5>
              <ul className="space-y-6">
                <li><button onClick={() => scrollToSection('tentang')} className="text-slate-500 font-bold hover:text-emerald-500 transition-colors">Sistem IoT</button></li>
                <li><button onClick={() => scrollToSection('peta')} className="text-slate-500 font-bold hover:text-emerald-500 transition-colors">Peta Terintegrasi</button></li>
                <li><button onClick={() => scrollToSection('berita')} className="text-slate-500 font-bold hover:text-emerald-500 transition-colors">Wawasan Data</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Hubungi Kami</h5>
              <ul className="space-y-6">
                <li className="text-slate-500 font-bold">Email: support@aptmat.id</li>
                <li className="text-slate-500 font-bold">Tel: +62 21 5550 442</li>
                <li className="text-slate-500 font-bold">Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">
            © 2025 AP-TMAT PROJECT. PEATLAND CONSERVATION TECHNOLOGY.
          </div>
          <div className="flex gap-12">
             <a href="#" className="text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
