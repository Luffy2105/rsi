
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Radio, 
  BarChart3, 
  MonitorPlay, 
  FileStack, 
  ShieldCheck,
  Map,
  Download,
  Wrench,
  History,
  Activity,
  Home,
  MapPin,
  LineChart,
  Info
} from 'lucide-react';
import { UserRole } from './types';

export const NAVIGATION_ITEMS = [
  // MENU ADMIN SISTEM (TETAP 7 MENU)
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: <LayoutDashboard size={20} />, 
    roles: [UserRole.ADMIN] 
  },
  { 
    id: 'users', 
    label: 'Pengguna & Akses', 
    icon: <Users size={20} />, 
    roles: [UserRole.ADMIN] 
  },
  { 
    id: 'sensors', 
    label: 'Manajemen Sensor', 
    icon: <Radio size={20} />, 
    roles: [UserRole.ADMIN] 
  },
  { 
    id: 'analysis_admin', 
    label: 'Monitoring & Analisis', 
    icon: <BarChart3 size={20} />, 
    roles: [UserRole.ADMIN] 
  },
  { 
    id: 'media', 
    label: 'Media & Tampilan', 
    icon: <MonitorPlay size={20} />, 
    roles: [UserRole.ADMIN] 
  },
  { 
    id: 'reports_admin', 
    label: 'Laporan & Data', 
    icon: <FileStack size={20} />, 
    roles: [UserRole.ADMIN] 
  },
  { 
    id: 'settings', 
    label: 'Pengaturan Sistem', 
    icon: <ShieldCheck size={20} />, 
    roles: [UserRole.ADMIN] 
  },

  // MENU PENELITI (TETAP 5 MENU)
  { 
    id: 'dashboard_peneliti', 
    label: 'Dashboard Analitik', 
    icon: <LayoutDashboard size={20} />, 
    roles: [UserRole.PENELITI] 
  },
  { 
    id: 'data_map', 
    label: 'Data & Peta', 
    icon: <Map size={20} />, 
    roles: [UserRole.PENELITI] 
  },
  { 
    id: 'analysis_peneliti', 
    label: 'Analisis', 
    icon: <BarChart3 size={20} />, 
    roles: [UserRole.PENELITI] 
  },
  { 
    id: 'reports_peneliti', 
    label: 'Laporan', 
    icon: <FileStack size={20} />, 
    roles: [UserRole.PENELITI] 
  },
  { 
    id: 'export_peneliti', 
    label: 'Ekspor Data', 
    icon: <Download size={20} />, 
    roles: [UserRole.PENELITI] 
  },

  // MENU TEKNISI (TETAP 5 MENU)
  { 
    id: 'dashboard_teknisi', 
    label: 'Dashboard Teknisi', 
    icon: <LayoutDashboard size={20} />, 
    roles: [UserRole.TEKNISI] 
  },
  { 
    id: 'sensors_teknisi', 
    label: 'Sensor', 
    icon: <Radio size={20} />, 
    roles: [UserRole.TEKNISI] 
  },
  { 
    id: 'tech_monitoring', 
    label: 'Monitoring Teknis', 
    icon: <Activity size={20} />, 
    roles: [UserRole.TEKNISI] 
  },
  { 
    id: 'maintenance', 
    label: 'Pemeliharaan', 
    icon: <Wrench size={20} />, 
    roles: [UserRole.TEKNISI] 
  },
  { 
    id: 'repair_history', 
    label: 'Riwayat', 
    icon: <History size={20} />, 
    roles: [UserRole.TEKNISI] 
  },

  // MENU VIEWER (4 MENU SESUAI GAMBAR)
  { 
    id: 'viewer_home', 
    label: 'Beranda', 
    icon: <Home size={20} />, 
    roles: [UserRole.VIEWER] 
  },
  { 
    id: 'viewer_map', 
    label: 'Peta Sensor', 
    icon: <MapPin size={20} />, 
    roles: [UserRole.VIEWER] 
  },
  { 
    id: 'viewer_chart', 
    label: 'Grafik TMAT', 
    icon: <LineChart size={20} />, 
    roles: [UserRole.VIEWER] 
  },
  { 
    id: 'viewer_info', 
    label: 'Informasi', 
    icon: <Info size={20} />, 
    roles: [UserRole.VIEWER] 
  }
];

export const MOCK_SENSORS: any[] = [
  { id: 'SNS-042', name: 'Sektor A, Blok Utara', latitude: -2.3167, longitude: 114.0361, status: 'active', lastRead: -38, battery: 85, lastUpdate: '2 mnt lalu' },
  { id: 'SNS-043', name: 'Sektor A, Blok Timur', latitude: -2.3200, longitude: 114.0400, status: 'active', lastRead: -42, battery: 78, lastUpdate: '5 mnt lalu' },
  { id: 'SNS-011', name: 'Sektor B, Pusat', latitude: 1.4800, longitude: 102.1200, status: 'warning', lastRead: -55, battery: 12, lastUpdate: '12 mnt lalu' },
  { id: 'SNS-089', name: 'Sektor C, Barat', latitude: -1.5800, longitude: 103.6200, status: 'inactive', lastRead: '--', battery: 0, lastUpdate: '4 jam lalu' },
];
