
import React, { useState, useEffect } from 'react';
import { UserRole, User } from './types';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import RealTimeChart from './components/RealTimeChart';
import LandingPage from './components/LandingPage';
import SensorManagement from './components/SensorManagement';
import UserManagement from './components/UserManagement';
import ReportManagement from './components/ReportManagement';
import SystemSettings from './components/SystemSettings';
import MonitoringAnalysis from './components/MonitoringAnalysis';
import MediaDisplay from './components/MediaDisplay';
import DataMap from './components/DataMap';
import ExportPage from './components/ExportPage';
import TechnicalMonitoring from './components/TechnicalMonitoring';
import MaintenanceLog from './components/MaintenanceLog';
import RepairHistory from './components/RepairHistory';
import ExportModal from './components/ExportModal';
import AddSensorModal from './components/AddSensorModal';
import MassCalibrationModal from './components/MassCalibrationModal';
import MaintenanceReportModal from './components/MaintenanceReportModal';
import SensorNavigationModal from './components/SensorNavigationModal';
import { MOCK_SENSORS } from './constants';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  ArrowLeft, AlertTriangle, CheckCircle2, Fingerprint, 
  Mail, Lock, User as UserIcon, ChevronRight, Shield, 
  Microscope, Wrench, Eye, BookOpen, Presentation,
  Droplets, HelpCircle, ArrowRight, Info, Map as MapIcon,
  LineChart as LineChartIcon, Download, Plus, Settings, History, Bell,
  UserPlus, Settings2, Wifi, Battery, MapPin, Activity,
  ClipboardList, Navigation2, RefreshCw, Flame, CloudRain,
  ShieldCheck, Leaf, Heart, AlertCircle
} from 'lucide-react';

type ViewState = 'landing' | 'auth';

const viewerTrendData = [
  { time: 'Sen', tmat: -32 },
  { time: 'Sel', tmat: -35 },
  { time: 'Rab', tmat: -38 },
  { time: 'Kam', tmat: -45 },
  { time: 'Jum', tmat: -42 },
  { time: 'Sab', tmat: -39 },
  { time: 'Min', tmat: -37 },
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Modal States
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddSensorModalOpen, setIsAddSensorModalOpen] = useState(false);
  const [isMassCalibrationModalOpen, setIsMassCalibrationModalOpen] = useState(false);
  const [isMaintenanceReportModalOpen, setIsMaintenanceReportModalOpen] = useState(false);
  const [isSensorNavigationModalOpen, setIsSensorNavigationModalOpen] = useState(false);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.ADMIN);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const DB_KEY = 'aptmat_user_registry_v2';

  useEffect(() => {
    const session = localStorage.getItem('aptmat_active_session');
    if (session) {
      const user = JSON.parse(session);
      setCurrentUser(user);
      handleDefaultTab(user.role);
    }
  }, []);

  const handleDefaultTab = (role: UserRole) => {
    if (role === UserRole.PENELITI) setActiveTab('dashboard_peneliti');
    else if (role === UserRole.TEKNISI) setActiveTab('dashboard_teknisi');
    else if (role === UserRole.VIEWER) setActiveTab('viewer_home');
    else setActiveTab('dashboard');
  };

  const getUsersFromDB = (): User[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveUserToDB = (user: User) => {
    const users = getUsersFromDB();
    if (users.find(u => u.email === user.email || u.name === user.name)) {
      throw new Error('Nama atau Email sudah terdaftar.');
    }
    users.push(user);
    localStorage.setItem(DB_KEY, JSON.stringify(users));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      try {
        if (!email || !password || !name) throw new Error('Harap lengkapi semua bidang.');
        const newUser: User = { 
          id: `user_${Date.now()}`, 
          name, 
          email, 
          role: selectedRole, 
          password 
        };
        saveUserToDB(newUser);
        setSuccess('Akun berhasil didaftarkan! Silakan login sekarang.');
        setIsLoginMode(true);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const isMasterAdmin = (email === 'admin' || email === 'admin@aptmat.id') && password === 'admin' && selectedRole === UserRole.ADMIN;
      
      if (isMasterAdmin) {
        const adminUser = { id: 'master', name: 'Administrator', email: 'admin@aptmat.id', role: UserRole.ADMIN };
        setCurrentUser(adminUser);
        localStorage.setItem('aptmat_active_session', JSON.stringify(adminUser));
        setActiveTab('dashboard');
        setLoading(false);
        return;
      }

      const users = getUsersFromDB();
      const foundUser = users.find(u => 
        (u.email === email || u.name === email) && 
        u.password === password && 
        u.role === selectedRole
      );

      if (foundUser) {
        setCurrentUser(foundUser);
        localStorage.setItem('aptmat_active_session', JSON.stringify(foundUser));
        handleDefaultTab(foundUser.role);
      } else {
        setError('Login gagal. Periksa kembali Role, Nama/Email, dan Sandi Anda.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aptmat_active_session');
    setView('landing');
    setActiveTab('dashboard');
  };

  const renderModuleContent = () => {
    switch (activeTab) {
      // ==========================================
      // MODUL DASHBOARD VIEWER
      // ==========================================
      case 'viewer_home':
        return (
          <div className="animate-in fade-in duration-500 space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight">Beranda Publik</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Pantau kondisi kesehatan lahan gambut di wilayah Anda.</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sistem Real-Time Online</span>
              </div>
            </div>
            
            <DashboardStats />
            
            <div className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-8">
                  <div className="bg-[#111d1a] p-8 rounded-[40px] border border-white/5 shadow-2xl">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                           <ShieldCheck size={24} />
                        </div>
                        <div>
                           <h3 className="font-black text-white text-lg tracking-tight uppercase">Status Sektor Utama</h3>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Berdasarkan rata-rata sensor wilayah</p>
                        </div>
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl group hover:bg-emerald-500/10 transition-all">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-black text-white">Sektor A (Utara)</span>
                              <CheckCircle2 size={20} className="text-emerald-500" />
                           </div>
                           <p className="text-xs text-slate-400 leading-relaxed font-medium">Tinggi air tanah stabil di kisaran -35cm. Kondisi gambut lembap dan aman dari risiko api.</p>
                        </div>
                        <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-3xl group hover:bg-orange-500/10 transition-all">
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-black text-white">Sektor B (Pesisir)</span>
                              <AlertTriangle size={20} className="text-orange-500" />
                           </div>
                           <p className="text-xs text-slate-400 leading-relaxed font-medium">Terdeteksi penurunan air tanah hingga -42cm. Memerlukan pengawasan untuk mencegah kekeringan.</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#10b981]/10 p-8 rounded-[40px] border border-[#10b981]/20 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-20 h-20 bg-[#10b981] rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
                        <Leaf size={40} className="text-slate-900" />
                     </div>
                     <div className="flex-1 text-center md:text-left">
                        <h4 className="text-lg font-black text-white mb-2 uppercase">Gambut Basah, Rakyat Sejahtera</h4>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">Tahukah Anda? Menjaga gambut tetap basah dapat mencegah kebakaran lahan dan emisi gas rumah kaca yang masif.</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="bg-[#111d1a] p-8 rounded-[40px] border border-white/5 shadow-2xl">
                     <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Indikator Keamanan</h3>
                     <div className="space-y-6">
                        <div className="flex gap-4">
                           <div className="w-1.5 h-16 bg-emerald-500 rounded-full"></div>
                           <div>
                              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Normal (Aman)</p>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Air &gt; -40cm. Gambut sehat, risiko kebakaran sangat minim.</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-1.5 h-16 bg-orange-500 rounded-full"></div>
                           <div>
                              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Waspada (Siaga)</p>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Air -41 s/d -60cm. Gambut mulai kering, waspada potensi api.</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-1.5 h-16 bg-red-500 rounded-full"></div>
                           <div>
                              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Bahaya (Kritis)</p>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Air &lt; -60cm. Kondisi sangat rentan terbakar. Segera lapor petugas.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        );

      case 'viewer_chart':
        return (
          <div className="animate-in fade-in duration-500 space-y-8 pb-12">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight uppercase">Analisis Grafik Air Tanah</h2>
              <p className="text-slate-500 font-medium text-sm mt-1">Melihat riwayat fluktuasi air tanah untuk memahami kondisi lingkungan terkini.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
               {/* Chart Area */}
               <div className="lg:col-span-8 bg-[#111d1a] p-10 rounded-[40px] border border-white/5 shadow-2xl">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="font-black text-lg text-white tracking-tight uppercase">Tren 7 Hari Terakhir</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Rata-rata tinggi muka air tanah (cm)</p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-white">-37 cm</p>
                       <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Status: Aman</p>
                    </div>
                  </div>
                  
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={viewerTrendData}>
                        <defs>
                          <linearGradient id="colorTmat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#475569', fontSize: 10, fontWeight: '900', letterSpacing: '0.1em'}} 
                          dy={15}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#475569', fontSize: 10, fontWeight: '900'}}
                          domain={[-70, 0]}
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ background: '#111d1a', border: '1px solid #ffffff10', borderRadius: '16px' }}
                          itemStyle={{ color: '#10b981', fontWeight: '900' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="tmat" 
                          stroke="#10b981" 
                          strokeWidth={5} 
                          fillOpacity={1} 
                          fill="url(#colorTmat)" 
                          dot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
                          activeDot={{ r: 8, strokeWidth: 3, stroke: '#111d1a' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Stats & Insight */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-[#111d1a] p-8 rounded-[40px] border border-white/5 shadow-2xl">
                     <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Insight Lingkungan</h3>
                     <div className="space-y-6">
                        <div className="p-5 bg-white/5 rounded-3xl flex items-start gap-4 border border-white/5">
                           <CloudRain size={20} className="text-blue-500 mt-1" />
                           <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase">Efek Curah Hujan</p>
                              <p className="text-xs text-slate-300 font-bold leading-relaxed mt-1">Kenaikan air 3cm dalam 2 hari terakhir disebabkan oleh intensitas hujan sedang di wilayah Utara.</p>
                           </div>
                        </div>
                        <div className="p-5 bg-white/5 rounded-3xl flex items-start gap-4 border border-white/5">
                           <Flame size={20} className="text-red-500 mt-1" />
                           <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase">Risiko Kebakaran</p>
                              <p className="text-xs text-slate-300 font-bold leading-relaxed mt-1">Saat ini risiko <span className="text-emerald-500">Rendah</span>. Lahan masih cukup basah untuk mematikan percikan api secara alami.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-emerald-500 p-8 rounded-[40px] shadow-2xl shadow-emerald-500/10">
                     <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">Pencapaian Wilayah</p>
                     <h4 className="text-2xl font-black text-slate-900 leading-tight">92% Waktu dalam Kondisi Aman</h4>
                     <p className="text-xs text-slate-800 font-bold mt-4 leading-relaxed">Berkat upaya pengelolaan air yang baik, wilayah ini berhasil menjaga tingkat kelembapan gambut secara konsisten bulan ini.</p>
                  </div>
               </div>
            </div>
          </div>
        );

      // ==========================================
      // MODUL INFORMASI VIEWER (DIREVISI)
      // ==========================================
      case 'viewer_info':
        return (
          <div className="animate-in fade-in duration-500 space-y-12 pb-20 max-w-6xl mx-auto">
            {/* Header Informasi */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-2">
                 <BookOpen size={14} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Pusat Bantuan & Edukasi</span>
              </div>
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Panduan Lahan Gambut</h2>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Informasi esensial mengenai ekosistem gambut dan cara membaca data Tinggi Muka Air Tanah.</p>
            </div>

            {/* Bagian 1: Pengetahuan Dasar */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-[#111d1a] p-10 rounded-[48px] border border-white/5 shadow-2xl space-y-6 group hover:border-emerald-500/20 transition-all">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-[24px] flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all">
                     <Droplets size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Mengenal TMAT</h3>
                  <p className="text-slate-400 font-medium text-base leading-relaxed">
                     <strong className="text-white">Tinggi Muka Air Tanah (TMAT)</strong> adalah indikator utama kesehatan lahan gambut. TMAT mengukur jarak antara permukaan tanah dengan air di bawahnya. 
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                     Lahan gambut yang sehat harus tetap basah sepanjang tahun. Jika air surut terlalu jauh ke dalam tanah, gambut akan mengering, menjadi rapuh, dan sangat rentan terhadap kebakaran yang sulit dipadamkan.
                  </p>
               </div>

               <div className="bg-[#111d1a] p-10 rounded-[48px] border border-white/5 shadow-2xl space-y-6 group hover:border-blue-500/20 transition-all">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-[24px] flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                     <Presentation size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Cara Membaca Data</h3>
                  <p className="text-slate-400 font-medium text-base leading-relaxed">
                     Data disajikan dalam angka negatif (cm). Semakin mendekati nol, berarti air semakin dekat dengan permukaan tanah (basah).
                  </p>
                  <div className="space-y-4 pt-2">
                     <div className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-1" size={18} />
                        <p className="text-xs text-slate-300 font-bold"><span className="text-white">Nilai Rendah (0 s/d -40cm):</span> Gambut dalam kondisi basah sempurna dan aman.</p>
                     </div>
                     <div className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={18} />
                        <p className="text-xs text-slate-300 font-bold"><span className="text-white">Nilai Tinggi (&lt; -60cm):</span> Gambut sangat kering dan berisiko tinggi terbakar.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bagian 2: Indikator Keamanan (Grid Rapi) */}
            <div className="bg-[#111d1a] p-10 lg:p-14 rounded-[56px] border border-white/5 shadow-2xl">
               <div className="text-center mb-12">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Tabel Referensi</h3>
                  <h4 className="text-3xl font-black text-white uppercase tracking-tight">Tingkat Bahaya Kebakaran Lahan</h4>
               </div>
               <div className="grid md:grid-cols-3 gap-10">
                  <div className="space-y-6 text-center">
                     <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-500/30">
                        <ShieldCheck className="text-emerald-500" size={32} />
                     </div>
                     <div>
                        <p className="text-xl font-black text-emerald-500 uppercase tracking-widest mb-2">Aman</p>
                        <p className="text-sm font-black text-white mb-2">0 s/d -40 cm</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Gambut basah. Ekosistem stabil, karbon tersimpan dengan baik, dan tidak ada risiko kebakaran.</p>
                     </div>
                  </div>
                  <div className="space-y-6 text-center">
                     <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-orange-500/30">
                        <AlertCircle className="text-orange-500" size={32} />
                     </div>
                     <div>
                        <p className="text-xl font-black text-orange-500 uppercase tracking-widest mb-2">Waspada</p>
                        <p className="text-sm font-black text-white mb-2">-41 s/d -60 cm</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Gambut mulai mengering. Diperlukan pemantauan intensif dan penutupan kanal air jika memungkinkan.</p>
                     </div>
                  </div>
                  <div className="space-y-6 text-center">
                     <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-red-500/30">
                        <Flame className="text-red-500" size={32} />
                     </div>
                     <div>
                        <p className="text-xl font-black text-red-500 uppercase tracking-widest mb-2">Kritis</p>
                        <p className="text-sm font-black text-white mb-2">Di bawah -60 cm</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Bahaya besar. Gambut sangat mudah terbakar dan sulit dipadamkan. Segera hubungi petugas pemadam.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bagian 3: Dampak Lingkungan */}
            <div className="grid lg:grid-cols-3 gap-8">
               {[
                  { icon: <Heart className="text-pink-500" />, title: 'Biodiversitas', desc: 'Menjaga habitat flora dan fauna langka yang hanya hidup di lahan gambut basah.' },
                  { icon: <CloudRain className="text-blue-500" />, title: 'Iklim Mikro', desc: 'Membantu mendinginkan suhu udara sekitar melalui proses penguapan air alami.' },
                  { icon: <Leaf className="text-emerald-500" />, title: 'Ekonomi Lokal', desc: 'Masyarakat dapat berkebun dengan aman tanpa takut gagal panen akibat kebakaran.' }
               ].map((item, i) => (
                  <div key={i} className="bg-white/[0.02] p-8 rounded-[40px] border border-white/5 flex items-start gap-6 group hover:bg-white/5 transition-all">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <div className="space-y-2">
                        <h5 className="text-sm font-black text-white uppercase tracking-widest">{item.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* Banner Call to Action */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-10 lg:p-14 rounded-[56px] shadow-2xl shadow-emerald-500/20 flex flex-col lg:flex-row items-center gap-10">
               <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[32px] flex items-center justify-center text-white flex-shrink-0">
                  <HelpCircle size={48} />
               </div>
               <div className="flex-1 text-center lg:text-left space-y-4">
                  <h4 className="text-3xl font-black text-slate-900 leading-none">Menemukan Data Yang Mencurigakan?</h4>
                  <p className="text-slate-900/70 font-bold text-base">Jika Anda melihat indikator "Kritis" di wilayah pemukiman Anda, jangan ragu untuk menghubungi tim pengelola wilayah terdekat.</p>
               </div>
               <button className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl flex items-center gap-4 whitespace-nowrap">
                  Lapor Kondisi Wilayah <ArrowRight size={18} />
               </button>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="animate-in fade-in duration-500 space-y-8 pb-10">
            {/* Header Ringkasan Sistem */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">Ringkasan Sistem</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Pemantauan real-time Tinggi Muka Air Tanah Gambut.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsExportModalOpen(true)}
                  className="bg-[#111d1a] border border-white/10 text-slate-300 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
                >
                  <Download size={14} /> Ekspor Laporan
                </button>
                <button 
                  onClick={() => setIsAddSensorModalOpen(true)}
                  className="bg-emerald-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Plus size={16} /> Tambah Sensor
                </button>
              </div>
            </div>

            {/* Row 1: Metrik Utama */}
            <DashboardStats />

            {/* Row 2: Grafik & Aksi Cepat */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RealTimeChart />
              </div>
              <div className="bg-[#111d1a] p-8 rounded-[32px] border border-white/5 flex flex-col h-full shadow-2xl">
                <h3 className="font-black text-white text-base tracking-tight mb-8">Aksi Cepat</h3>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="bg-[#1a2b27] hover:bg-[#203631] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all border border-white/5 group"
                  >
                    <UserPlus size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Tambah Pengguna</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="bg-[#1a2b27] hover:bg-[#203631] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all border border-white/5 group"
                  >
                    <Settings2 size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Konfigurasi</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('reports_admin')}
                    className="bg-[#1a2b27] hover:bg-[#203631] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all border border-white/5 group"
                  >
                    <History size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Lihat Log</span>
                  </button>
                  <button 
                    className="bg-[#1a2b27] hover:bg-[#203631] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all border border-white/5 group"
                  >
                    <Bell size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Notifikasi</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Data Sensor Terkini & Audit Log */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#111d1a] rounded-[32px] border border-white/5 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-black text-white text-base tracking-tight uppercase">Data Sensor Terkini</h3>
                  <button onClick={() => setActiveTab('sensors')} className="text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:underline">Lihat Semua</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] font-bold">
                    <thead className="text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                      <tr>
                        <th className="px-8 py-5">ID Sensor</th>
                        <th className="px-8 py-5">Lokasi</th>
                        <th className="px-8 py-5">TMAT</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-white/5">
                      {MOCK_SENSORS.map((sensor) => (
                        <tr key={sensor.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-5 text-white font-black">{sensor.id}</td>
                          <td className="px-8 py-5 text-slate-400">{sensor.name}</td>
                          <td className={`px-8 py-5 font-black ${sensor.status === 'warning' ? 'text-orange-500' : 'text-slate-300'}`}>
                            {sensor.lastRead} <span className="text-[9px] font-bold opacity-50 ml-1">cm</span>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              sensor.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                              sensor.status === 'warning' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                              'bg-red-500/10 text-red-500 border border-red-500/20'
                            }`}>
                              {sensor.status === 'active' ? 'Online' : sensor.status === 'warning' ? 'Peringatan' : 'Offline'}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-slate-500">{sensor.lastUpdate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#111d1a] p-8 rounded-[32px] border border-white/5 shadow-2xl">
                <h3 className="font-black text-white text-base tracking-tight uppercase mb-8">Log Audit Aktivitas</h3>
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-white/5">
                  {[
                    { title: 'Konfigurasi Sistem Diperbarui', desc: 'Mengubah laju pengambilan sampel Sektor A menjadi 15m.', time: '10:42 WIB - ADMIN', color: 'bg-emerald-500' },
                    { title: 'Pengguna Baru Ditambahkan', desc: 'Peran Analis diberikan kepada b.wijaya@aptmat.id', time: '09:15 WIB - ADMIN', color: 'bg-blue-500' },
                    { title: 'Peringatan Batas Terpicu', desc: 'Sensor SNS-011 turun di bawah -50cm.', time: 'KEMARIN - SISTEM', color: 'bg-orange-500' },
                    { title: 'Laporan Mingguan Dibuat', desc: 'Pembuatan otomatis berhasil.', time: 'KEMARIN - SISTEM', color: 'bg-slate-700' },
                  ].map((log, i) => (
                    <div key={i} className="relative pl-8 group">
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-lg ${log.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      </div>
                      <p className="text-xs font-black text-white leading-tight">{log.title}</p>
                      <p className="text-[10px] text-slate-500 font-bold mt-1 leading-relaxed">{log.desc}</p>
                      <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-2">{log.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // DASHBOARD PENELITI
      case 'dashboard_peneliti':
        return (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight">Dashboard Analitik</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Insight cepat dan pemantauan tren utama TMAT.</p>
              </div>
            </div>
            <DashboardStats />
            <RealTimeChart />
          </div>
        );

      case 'users': return <UserManagement users={getUsersFromDB()} />;
      case 'sensors':
      case 'sensors_teknisi':
        return (
          <SensorManagement 
            onAddSensor={() => setIsAddSensorModalOpen(true)}
            onExport={() => setIsExportModalOpen(true)}
            onMassCalibrate={() => setIsMassCalibrationModalOpen(true)}
          />
        );
      case 'analysis_admin':
      case 'analysis_peneliti': return <MonitoringAnalysis />;
      case 'media': return <MediaDisplay />;
      case 'reports_admin':
      case 'reports_peneliti': return <ReportManagement />;
      case 'settings': return <SystemSettings />;
      case 'data_map': return <DataMap />;
      case 'viewer_map': return <DataMap />;
      case 'export_peneliti': return <ExportPage />;
      case 'tech_monitoring': return <TechnicalMonitoring />;
      case 'maintenance': return <MaintenanceLog />;
      case 'repair_history': return <RepairHistory />;

      default:
        return (
          <div className="animate-in slide-in-from-bottom-10 duration-500 text-center py-40">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Modul Sedang Dikembangkan</h2>
          </div>
        );
    }
  };

  if (view === 'landing' && !currentUser) return <LandingPage onLoginClick={() => setView('auth')} />;

  if (view === 'auth' && !currentUser) {
    return (
      <div className="min-h-screen bg-[#05110d] flex flex-col items-center justify-center p-6 font-inter selection:bg-emerald-500/30">
        <button onClick={() => setView('landing')} className="absolute top-10 left-10 text-slate-500 flex items-center gap-3 hover:text-white transition-all z-[100] font-black text-[10px] uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
          <ArrowLeft size={14} /> Beranda
        </button>

        <div className="max-w-xl w-full relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="bg-[#111d1a] rounded-[48px] p-10 lg:p-14 shadow-2xl border border-white/5 relative overflow-hidden text-center">
            <div className="bg-[#10b981] w-20 h-20 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20 transform hover:rotate-6 transition-all">
              <Fingerprint className="text-[#05110d]" size={40} />
            </div>
            
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">
              {isLoginMode ? 'Portal Akses' : 'Daftar Akun Baru'}
            </h1>
            <p className="text-slate-500 font-bold text-sm tracking-wide mb-10">
              Sistem Monitoring Tinggi Muka Air Tanah (AP-TMAT)
            </p>

            {error && <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl text-[11px] font-black flex items-center gap-4 text-left"><AlertTriangle size={18} /> {error}</div>}
            {success && <div className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl text-[11px] font-black flex items-center gap-4 text-left"><CheckCircle2 size={18} /> {success}</div>}
            
            <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="space-y-6 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-[0.2em]">Otoritas / Hak Akses</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { role: UserRole.ADMIN, icon: <Shield size={14}/>, label: 'Admin' },
                    { role: UserRole.PENELITI, icon: <Microscope size={14}/>, label: 'Peneliti' },
                    { role: UserRole.TEKNISI, icon: <Wrench size={14}/>, label: 'Teknisi' },
                    { role: UserRole.VIEWER, icon: <Eye size={14}/>, label: 'Viewer' }
                  ].map((r) => (
                    <button 
                      key={r.role} 
                      type="button" 
                      onClick={() => setSelectedRole(r.role)} 
                      className={`flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-widest ${selectedRole === r.role ? 'bg-[#10b981] border-emerald-500 text-[#05110d]' : 'bg-[#0a110f] border-white/5 text-slate-600 hover:text-white'}`}
                    >
                      {r.icon} {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {!isLoginMode && (
                <div className="relative group">
                  <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-[#0a110f] border border-white/5 font-bold text-white outline-none focus:border-emerald-500/50 transition-all" placeholder="Nama Lengkap" required />
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-[#0a110f] border border-white/5 font-bold text-white outline-none focus:border-emerald-500/50 transition-all" placeholder="Email / Username" required />
              </div>

              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-[#0a110f] border border-white/5 font-bold text-white outline-none focus:border-emerald-500/50 transition-all" placeholder="Kata Sandi" required />
              </div>

              <button type="submit" disabled={loading} className="w-full mt-6 bg-[#10b981] text-[#05110d] font-black py-6 rounded-[24px] shadow-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-4">
                {loading ? <div className="w-6 h-6 border-4 border-[#05110d]/20 border-t-[#05110d] rounded-full animate-spin"></div> : <><span className="uppercase tracking-[0.2em] text-xs">{isLoginMode ? 'Masuk Sistem' : 'Daftar Akun'}</span><ChevronRight size={18} /></>}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5">
              <button 
                type="button" 
                onClick={() => { setIsLoginMode(!isLoginMode); setError(''); setSuccess(''); }} 
                className="text-emerald-500 font-black text-xs uppercase tracking-widest hover:text-emerald-400 transition-all"
              >
                {isLoginMode ? 'Belum terdaftar? Buat Akun' : 'Sudah punya akun? Masuk'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return (
      <div className="min-h-screen bg-[#05110d] font-inter">
        <Sidebar currentUser={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        <main className="pl-64 min-h-screen">
          <div className="p-8 max-w-[1600px] mx-auto">
            {renderModuleContent()}
          </div>
        </main>
        <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
        <AddSensorModal isOpen={isAddSensorModalOpen} onClose={() => setIsAddSensorModalOpen(false)} />
        <MassCalibrationModal isOpen={isMassCalibrationModalOpen} onClose={() => setIsMassCalibrationModalOpen(false)} />
        <MaintenanceReportModal isOpen={isMaintenanceReportModalOpen} onClose={() => setIsMaintenanceReportModalOpen(false)} />
        <SensorNavigationModal isOpen={isSensorNavigationModalOpen} onClose={() => setIsSensorNavigationModalOpen(false)} />
      </div>
    );
  }

  return null;
};

export default App;
