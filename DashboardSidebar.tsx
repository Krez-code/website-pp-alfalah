import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, ShieldCheck, Users, ClipboardList, Activity, BookOpen, CreditCard } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
  { label: 'Tagihan Keuangan', path: '/dashboard/tagihan', icon: <CreditCard size={18} /> },
  { label: 'Nilai Ujian', path: '/dashboard/nilai', icon: <BookOpen size={18} /> },
  { label: 'Surat Izin Pulang', path: '/dashboard/surat-izin', icon: <ShieldCheck size={18} /> },
  { label: 'Profil', path: '/dashboard/profil', icon: <Users size={18} /> },
  { label: 'Download Dokumen', path: '/dashboard/dokumen', icon: <FileText size={18} /> },
  { label: 'Logout', path: '/login', icon: <Activity size={18} /> },
];

export default function DashboardSidebar() {
  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-48px)] w-72 flex-col gap-4 rounded-[36px] border border-slate-200 bg-white p-6 shadow-soft xl:flex">
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Menu</p>
        <p className="text-2xl font-semibold text-slate-950">Panel Santri</p>
      </div>
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-3xl px-5 py-4 text-sm font-medium transition ${
                isActive ? 'bg-primary text-white shadow-soft' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
