import { useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  Users,
  GraduationCap,
  CreditCard,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Download,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Award,
  BookOpen,
  Clock,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const financeData = useMemo(
    () => ({
      labels: ['SPP', 'Ujian', 'Jabog', 'Donasi'],
      datasets: [
        {
          data: [42, 18, 22, 18],
          backgroundColor: [
            'rgba(15, 107, 75, 0.8)',
            'rgba(27, 138, 90, 0.8)',
            'rgba(52, 211, 153, 0.8)',
            'rgba(167, 243, 208, 0.8)',
          ],
          borderColor: [
            'rgb(15, 107, 75)',
            'rgb(27, 138, 90)',
            'rgb(52, 211, 153)',
            'rgb(167, 243, 208)',
          ],
          borderWidth: 2,
        },
      ],
    }),
    [],
  );

  const studentGrowth = useMemo(
    () => ({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
      datasets: [
        {
          label: 'Santri Baru',
          data: [35, 42, 48, 56, 63, 72],
          borderColor: 'rgb(15, 107, 75)',
          backgroundColor: 'rgba(15, 107, 75, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgb(15, 107, 75)',
        },
      ],
    }),
    [],
  );

  const gradeDistribution = useMemo(
    () => ({
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          data: [30, 45, 20, 5],
          backgroundColor: [
            'rgba(15, 107, 75, 0.8)',
            'rgba(27, 138, 90, 0.8)',
            'rgba(52, 211, 153, 0.8)',
            'rgba(167, 243, 208, 0.8)',
          ],
          borderWidth: 0,
        },
      ],
    }),
    [],
  );

  const quickStats = [
    { label: 'Total Santri', value: '1.245', change: '+12%', trend: 'up', icon: <Users className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Guru', value: '89', change: '+3', trend: 'up', icon: <GraduationCap className="h-6 w-6" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Pembayaran', value: 'Rp 125.750.000', change: '+8%', trend: 'up', icon: <CreditCard className="h-6 w-6" />, color: 'from-emerald-500 to-teal-500' },
    { label: 'Kehadiran', value: '94%', change: '-2%', trend: 'down', icon: <Activity className="h-6 w-6" />, color: 'from-orange-500 to-yellow-500' },
  ];

  const recentActivities = [
    { user: 'Ahmad Santoso', action: 'membayar SPP', time: '2 menit lalu', type: 'payment' },
    { user: 'Budi Santoso', action: 'menyerahkan nilai UTS', time: '15 menit lalu', type: 'grade' },
    { user: 'Admin', action: 'mengumumkan kegiatan', time: '1 jam lalu', type: 'announcement' },
    { user: 'Wali Santri', action: 'menyetujui izin', time: '2 jam lalu', type: 'permission' },
    { user: 'Guru Fiqh', action: 'menginput kehadiran', time: '3 jam lalu', type: 'attendance' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
<motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="space-y-8"
>
  {/* Header Section */}
  <motion.div variants={item} className="flex flex-col gap-6">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Dashboard Admin
        </h1>
        <p className="text-slate-600">
          Selamat datang, Admin. Berikut adalah ringkasan aktivitas pesantren hari ini.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" icon={<Download className="h-4 w-4" />}>
          Export Data
        </Button>
        <Button icon={<Plus className="h-4 w-4" />}>
          Tambah Santri
        </Button>
      </div>
    </div>
  </motion.div>

  {/* Quick Stats */}
  <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {quickStats.map((stat, index) => (
      <Card key={stat.label} variant="default" className="group hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {stat.icon}
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {stat.change}
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
      </Card>
    ))}
  </motion.div>

  {/* Charts Row 1 */}
  <motion.div variants={item} className="grid gap-6 xl:grid-cols-3">
    <Card variant="default" className="xl:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Pertumbuhan Santri</p>
          <h3 className="text-xl font-bold text-slate-900">Statistik Pendaftaran</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Minggu</Button>
          <Button variant="ghost" size="sm" className="bg-slate-100">Bulan</Button>
          <Button variant="ghost" size="sm">Tahun</Button>
        </div>
      </div>
      <div className="h-80">
        <Line
          data={studentGrowth}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { color: 'rgb(100, 116, 139)' }
              },
              x: {
                grid: { display: false },
                ticks: { color: 'rgb(100, 116, 139)' }
              }
            },
          }}
        />
      </div>
    </Card>

    <Card variant="default">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-600 mb-1">Distribusi Pembayaran</p>
        <h3 className="text-xl font-bold text-slate-900">Keuangan</h3>
      </div>
      <div className="h-64 flex items-center justify-center">
        <Doughnut
          data={financeData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' }
              },
            },
          }}
        />
      </div>
    </Card>
  </motion.div>

  {/* Charts Row 2 */}
  <motion.div variants={item} className="grid gap-6 lg:grid-cols-3">
    <Card variant="default" className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Nilai Rata-rata</p>
          <h3 className="text-xl font-bold text-slate-900">Performa Akademik</h3>
        </div>
      </div>
      <div className="h-64">
        <Bar
          data={{
            labels: ['Tahfidz', 'Bahasa', 'Kitab', 'Sains', 'Math'],
            datasets: [
              {
                label: 'Rata-rata Nilai',
                data: [85, 78, 82, 88, 90],
                backgroundColor: 'rgba(15, 107, 75, 0.8)',
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { color: 'rgb(100, 116, 139)' }
              },
              x: {
                grid: { display: false },
                ticks: { color: 'rgb(100, 116, 139)' }
              }
            },
          }}
        />
      </div>
    </Card>

    <Card variant="default">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-600 mb-1">Status Kehadiran</p>
        <h3 className="text-xl font-bold text-slate-900">Hari Ini</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-green-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Hadir</p>
              <p className="text-xs text-slate-600">1.178 Santri</p>
            </div>
          </div>
          <p className="text-lg font-bold text-green-600">94.6%</p>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-red-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-500 flex items-center justify-center text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Terlambat</p>
              <p className="text-xs text-slate-600">38 Santri</p>
            </div>
          </div>
          <p className="text-lg font-bold text-red-600">3.0%</p>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500 flex items-center justify-center text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Izin</p>
              <p className="text-xs text-slate-600">29 Santri</p>
            </div>
          </div>
          <p className="text-lg font-bold text-yellow-600">2.3%</p>
        </div>
      </div>
    </Card>
  </motion.div>

  {/* Bottom Row */}
  <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
    {/* Recent Activity */}
    <Card variant="default">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Aktivitas Terbaru</p>
          <h3 className="text-xl font-bold text-slate-900">Log Aktivitas</h3>
        </div>
        <Button variant="ghost" size="sm">
          Lihat Semua
        </Button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-200"
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
              activity.type === 'payment' ? 'bg-green-500' :
              activity.type === 'grade' ? 'bg-blue-500' :
              activity.type === 'announcement' ? 'bg-purple-500' :
              activity.type === 'permission' ? 'bg-orange-500' :
              'bg-slate-500'
            }`}>
              {activity.type === 'payment' ? <CreditCard className="h-5 w-5" /> :
               activity.type === 'grade' ? <BookOpen className="h-5 w-5" /> :
               activity.type === 'announcement' ? <Bell className="h-5 w-5" /> :
               activity.type === 'permission' ? <Shield className="h-5 w-5" /> :
               <Clock className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-slate-900">{activity.user}</span>
                <span className="text-slate-600"> {activity.action}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>

    {/* Quick Actions */}
    <Card variant="default">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-600 mb-1">Menu Cepat</p>
        <h3 className="text-xl font-bold text-slate-900">Aksi Admin</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Users className="h-6 w-6" />
          <span>Kelola Santri</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <GraduationCap className="h-6 w-6" />
          <span>Data Guru</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <CreditCard className="h-6 w-6" />
          <span>Keuangan</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Calendar className="h-6 w-6" />
          <span>Agenda</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <FileText className="h-6 w-6" />
          <span>Laporan</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <Settings className="h-6 w-6" />
          <span>Pengaturan</span>
        </Button>
      </div>
    </Card>
  </motion.div>
</motion.div>
);
}
