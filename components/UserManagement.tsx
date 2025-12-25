
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Filter, 
  ChevronDown, 
  Edit2, 
  Trash2, 
  Users, 
  Shield, 
  Microscope, 
  Wrench, 
  Eye,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { User, UserRole } from '../types';

interface UserManagementProps {
  users: User[];
}

const UserManagement: React.FC<UserManagementProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Hitung statistik berdasarkan data nyata dari database/registrasi
  const stats = {
    total: users.length,
    admin: users.filter(u => u.role === UserRole.ADMIN).length,
    peneliti: users.filter(u => u.role === UserRole.PENELITI).length,
    teknisi: users.filter(u => u.role === UserRole.TEKNISI).length,
    // FIX: Removed UserRole.PUBLIC as it does not exist in the UserRole enum
    viewer: users.filter(u => u.role === UserRole.VIEWER).length,
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case UserRole.PENELITI: return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case UserRole.TEKNISI: return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case UserRole.VIEWER: return 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Manajemen Pengguna</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola akun, peran, dan hak akses dalam sistem AP-TMAT.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#111d1a] border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2">
            <Download size={14} /> Ekspor Data
          </button>
          <button className="bg-emerald-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <Plus size={16} /> Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Stats Cards - Matching Screenshot Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Pengguna', val: stats.total, sub: '+4 Bulan ini', icon: <Users size={18} />, color: 'text-emerald-500' },
          { label: 'Admin', val: stats.admin, sub: 'Akses Penuh', icon: <Shield size={18} />, color: 'text-purple-500' },
          { label: 'Peneliti', val: stats.peneliti, sub: 'Analisis Data', icon: <Microscope size={18} />, color: 'text-indigo-500' },
          { label: 'Teknisi Lapangan', val: stats.teknisi, sub: 'Aktif di Lapangan', icon: <Wrench size={18} />, color: 'text-blue-500' },
          { label: 'Viewer / Pengamat', val: stats.viewer, sub: 'Akses Baca Saja', icon: <Eye size={18} />, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111d1a] p-6 rounded-2xl border border-white/5 relative group transition-all">
            <div className={`absolute top-6 right-6 opacity-40 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-white tracking-tighter">{stat.val}</h3>
              <p className={`text-[9px] font-bold ${stat.color === 'text-emerald-500' ? 'text-emerald-500' : 'text-slate-500'}`}>
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-[#111d1a] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        {/* Table Filters */}
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="font-black text-white text-base tracking-tight">Daftar Pengguna</h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau email..." 
                className="w-full bg-[#0a110f] border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <button className="bg-[#0a110f] border border-white/10 rounded-xl px-5 py-2.5 text-[10px] font-black text-slate-400 flex items-center gap-3 uppercase tracking-widest hover:text-white transition-all">
              Semua Peran <ChevronDown size={14} />
            </button>
            <button className="bg-[#0a110f] border border-white/10 rounded-xl px-5 py-2.5 text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest hover:text-white transition-all">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold">
            <thead className="text-slate-500 uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-8 py-5">Pengguna</th>
                <th className="px-8 py-5">Peran</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Terakhir Login</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-white/5">
              {filteredUsers.length > 0 ? filteredUsers.map((user, i) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs bg-slate-800 border border-white/10 overflow-hidden`}>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white tracking-tight">{user.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getRoleBadgeStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest text-emerald-500`}>
                        AKTIF
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-medium">
                    Baru saja
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500 font-bold italic">
                    Belum ada pengguna yang terdaftar di database sistem.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Menampilkan <span className="text-white">1</span> sampai <span className="text-white">{filteredUsers.length}</span> dari <span className="text-white">{users.length}</span> hasil
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-900 text-[10px] font-black shadow-lg shadow-emerald-500/20 transition-all">1</button>
            <button className="w-8 h-8 rounded-lg border border-white/5 text-slate-500 text-[10px] font-black hover:text-white hover:bg-white/5 transition-all">2</button>
            <button className="w-8 h-8 rounded-lg border border-white/5 text-slate-500 text-[10px] font-black hover:text-white hover:bg-white/5 transition-all">3</button>
            <div className="px-2"><MoreHorizontal size={14} className="text-slate-600" /></div>
            <button className="w-8 h-8 rounded-lg border border-white/5 text-slate-500 text-[10px] font-black hover:text-white hover:bg-white/5 transition-all">8</button>
            <button className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* System Footer Info */}
      <div className="text-center pt-8">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
          Konsol Admin AP-TMAT v2.4.0 @ 2023
        </p>
      </div>
    </div>
  );
};

export default UserManagement;
