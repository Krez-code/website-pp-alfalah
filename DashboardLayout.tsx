import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FileText,
  ShieldCheck,
  Users,
  ClipboardList,
  Activity,
  BookOpen,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  LogOut,
  User
} from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'red' | 'yellow' | 'emerald';
}

const menuItemsByRole: Record<string, MenuItem[]> = {
  admin: [
    { label: 'Dashboard', path: '/dashboard/admin', icon: <Home size={20} /> },
    { label: 'Tagihan Keuangan', path: '/dashboard/admin/tagihan', icon: <CreditCard size={20} />, badge: '12', badgeVariant: 'red' as const },
    { label: 'Nilai Ujian', path: '/dashboard/admin/nilai', icon: <BookOpen size={20} />, badge: 'Genap', badgeVariant: 'emerald' as const },
    { label: 'Surat Izin', path: '/dashboard/admin/surat', icon: <ShieldCheck size={20} />, badge: '5 Menunggu', badgeVariant: 'yellow' as const },
    { label: 'Profil Santri', path: '/dashboard/admin/profil', icon: <Users size={20} /> },
    { label: 'Dokumen', path: '/dashboard/admin/dokumen', icon: <FileText size={20} />, badge: '128', badgeVariant: 'emerald' as const },
    { label: 'Pengaturan', path: '/dashboard/admin/pengaturan', icon: <Settings size={20} /> },
  ],
  santri: [
    { label: 'Dashboard', path: '/dashboard/santri', icon: <Home size={20} /> },
    { label: 'Tagihan', path: '/dashboard/santri/tagihan', icon: <CreditCard size={20} />, badge: '3', badgeVariant: 'red' as const },
    { label: 'Nilai Ujian', path: '/dashboard/santri/nilai', icon: <BookOpen size={20} />, badge: 'Genap', badgeVariant: 'emerald' as const },
    { label: 'Surat Izin', path: '/dashboard/santri/surat', icon: <ShieldCheck size={20} />, badge: '2 Aktif', badgeVariant: 'yellow' as const },
    { label: 'Profil', path: '/dashboard/santri/profil', icon: <Users size={20} /> },
    { label: 'Dokumen', path: '/dashboard/santri/dokumen', icon: <FileText size={20} />, badge: '12 File', badgeVariant: 'emerald' as const },
  ],
  wali: [
    { label: 'Dashboard', path: '/dashboard/wali', icon: <Home size={20} /> },
    { label: 'Tagihan Anak', path: '/dashboard/wali/tagihan', icon: <CreditCard size={20} />, badge: '1', badgeVariant: 'red' as const },
    { label: 'Nilai Anak', path: '/dashboard/wali/nilai', icon: <BookOpen size={20} />, badge: 'Genap', badgeVariant: 'emerald' as const },
    { label: 'Agenda', path: '/dashboard/wali/agenda', icon: <ClipboardList size={20} /> },
    { label: 'Profil Anak', path: '/dashboard/wali/profil', icon: <Users size={20} /> },
    { label: 'Dokumen', path: '/dashboard/wali/dokumen', icon: <FileText size={20} />, badge: '8 File', badgeVariant: 'emerald' as const },
  ],
};

interface DashboardLayoutProps {
  role?: 'admin' | 'santri' | 'wali';
}

export default function DashboardLayout({ role = 'santri' }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = menuItemsByRole[role] || menuItemsByRole.santri;

  const roleLabels = {
    admin: 'Admin Dashboard',
    santri: 'Dashboard Santri',
    wali: 'Dashboard Wali',
  };

  const badgeColors = {
    red: 'bg-red-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    emerald: 'bg-emerald-500/10 text-emerald-600',
  };

  const santriInfo = {
    name: 'Ahmad Zaki',
    kelas: 'Kelas 5',
    attendance: 'Hadir',
    photo: '/placeholder-santri.jpg',
  };

  const handleLogout = () => {
    localStorage.removeItem('pesantren_token');
    localStorage.removeItem('pesantren_role');
    navigate('/');
  };

  const SidebarItem = ({ item, isActive }: { item: MenuItem; isActive: boolean }) => (
    <div className="relative group">
      <NavLink
        to={item.path}
        className={() =>
          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
              : 'text-slate-700 hover:bg-slate-50'
          }`
        }
      >
        <span className={`flex-shrink-0 transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary'
        }`}>
          {item.icon}
        </span>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-1 overflow-hidden whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {item.badge && !collapsed && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              isActive ? 'bg-white/20 text-white' : badgeColors[item.badgeVariant || 'emerald']
            }`}
          >
            {item.badge}
          </motion.span>
        )}
      </NavLink>
      {collapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {item.label}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
      >
        <div className="flex items-center justify-between h-16 px-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
          <span className="text-sm font-semibold text-slate-900">
            {roleLabels[role]}
          </span>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="lg:hidden fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <span className="text-lg font-bold text-slate-900">
                  {roleLabels[role]}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-8 w-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="h-4 w-4 text-slate-700" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span className={`flex-shrink-0 text-${location.pathname === item.path ? 'white' : 'slate-500'}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        location.pathname === item.path
                          ? 'bg-white/20 text-white'
                          : badgeColors[item.badgeVariant || 'emerald']
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <img src={santriInfo.photo} alt={santriInfo.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900">{santriInfo.name}</p>
                    <p className="text-xs text-slate-500">{santriInfo.kelas} • {santriInfo.attendance}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-100 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex fixed left-0 top-0 h-screen flex-col bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl z-30"
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-200/60">
          <div className="relative flex-shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900">Al-Falah</span>
                  <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
                    {roleLabels[role]}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SidebarItem item={item} isActive={isActive} />
              </motion.div>
            );
          })}
        </nav>

        {/* User Profile Bottom */}
        <div className="p-4 border-t border-slate-200/60 space-y-3">
          <div className="flex items-center gap-3">
            <img src={santriInfo.photo} alt={santriInfo.name} className="h-10 w-10 rounded-full object-cover" />
            {!collapsed && (
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-900">{santriInfo.name}</p>
                <p className="text-xs text-slate-500">{santriInfo.kelas} • <span className="text-emerald-600">{santriInfo.attendance}</span></p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>

        {/* Collapse Button */}
        <div className="p-4 border-t border-slate-200/60">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center h-10 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`lg:pl-[280px] transition-all duration-300 pt-16 lg:pt-0 ${
          collapsed ? 'lg:pl-[80px]' : ''
        }`}
      >
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
