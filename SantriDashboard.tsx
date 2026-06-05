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
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  FileText,
  Download,
  Eye,
  Bell,
  ChevronRight,
  Star,
  TrendingUp,
  Award,
  CreditCard,
  BadgeCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function SantriDashboard() {
  const paymentData = useMemo(
    () => ({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
      datasets: [
        {
          label: 'Pembayaran SPP',
          data: [120, 90, 140, 130, 150, 160],
          backgroundColor: 'rgba(15, 107, 75, 0.8)',
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    }),
    [],
  );

  const scoreData = useMemo(
    () => ({
      labels: ['Ulangan', 'UTS', 'UAS', 'Semester'],
      datasets: [
        {
          label: 'Nilai Rata-rata',
          data: [84, 88, 91, 93],
          borderColor: 'rgb(15, 107, 75)',
          backgroundColor: 'rgba(15, 107, 75, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: 'rgb(15, 107, 75)',
        },
      ],
    }),
    [],
  );

  const attendanceData = useMemo(
    () => ({
      labels: ['Hadir', 'Terlambat', 'Izin', 'Absen'],
      datasets: [
        {
          data: [85, 5, 7, 3],
          backgroundColor: [
            'rgba(15, 107, 75, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderWidth: 0,
        },
      ],
    }),
    [],
  );

  const quickStats = [
    { label: 'Tagihan Bulan Ini', value: 'Rp 3.000.000', status: 'Tunggakan Rp 750.000', icon: <CreditCard className="h-6 w-6" />, color: 'from-amber-500 to-orange-500' },
    { label: 'Rata-rata Nilai', value: '89', status: 'Naik 3 poin', icon: <TrendingUp className="h-6 w-6" />, color: 'from-blue-500 to-indigo-500' },
    { label: 'Kehadiran', value: '95%', status: 'Sangat Baik', icon: <Award className="h-6 w-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Poin Keaktifan', value: '1.250', status: 'Level 5', icon: <Star className="h-6 w-6" />, color: 'from-purple-500 to-pink-500' },
  ];

  const upcomingEvents = [
    { title: 'Kajian Fiqh', date: '10 Jun 2026', time: '08:00 - 10:00', location: 'Masjid Utama', color: 'bg-blue-500' },
    { title: 'Ujian Tengah Semester', date: '18 Jun 2026', time: '07:30 - 12:00', location: 'Ruang Aula', color: 'bg-red-500' },
    { title: 'Kunjungan Wali Santri', date: '25 Jun 2026', time: '09:00 - 11:00', location: 'Lapangan', color: 'bg-purple-500' },
  ];

  const announcements = [
    { title: 'Pendaftaran ujian semester ditutup 15 Juni 2026', type: 'info' },
    { title: 'Pelatihan leadership untuk pengurus santri', type: 'info' },
    { title: 'Jadwal ujian semester sudah dirilis', type: 'warning' },
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
  {/* Header */}
  <motion.div variants={item} className="flex flex-col gap-4">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Dashboard Santri
        </h1>
        <p className="text-slate-600">
          Selamat datang, Ahmad. Pantau perkembangan akademik dan administrasi Anda.
        </p>
      </div>
      <Button variant="outline" icon={<Bell className="h-4 w-4" />}>
        Notifikasi (3)
      </Button>
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
        </div>
        <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
        <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
        <p className="text-xs text-slate-500">{stat.status}</p>
      </Card>
    ))}
  </motion.div>

  {/* Charts Row 1 */}
  <motion.div variants={item} className="grid gap-6 xl:grid-cols-3">
    <Card variant="default" className="xl:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Perkembangan</p>
          <h3 className="text-xl font-bold text-slate-900">Grafik Nilai Akademik</h3>
        </div>
        <Button variant="ghost" size="sm">Detail</Button>
      </div>
      <div className="h-72">
        <Line
          data={scoreData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                beginAtZero: false,
                min: 70,
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
        <p className="text-sm font-medium text-slate-600 mb-1">Kehadiran</p>
        <h3 className="text-xl font-bold text-slate-900">Status Bulan Ini</h3>
      </div>
      <div className="h-56 flex items-center justify-center">
        <Doughnut
          data={attendanceData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { padding: 12, usePointStyle: true, pointStyle: 'circle', font: { size: 11 } }
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
          <p className="text-sm font-medium text-slate-600 mb-1">Pembayaran SPP</p>
          <h3 className="text-xl font-bold text-slate-900">Riwayat 6 Bulan</h3>
        </div>
      </div>
      <div className="h-64">
        <Bar
          data={paymentData}
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Agenda</p>
          <h3 className="text-xl font-bold text-slate-900">Kegiatan Berikutnya</h3>
        </div>
      </div>
      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer group"
          >
            <div className={`h-10 w-10 rounded-lg ${event.color} flex items-center justify-center text-white flex-shrink-0`}>
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-primary transition-colors">
                {event.title}
              </p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>

  {/* Bottom Row */}
  <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
    <Card variant="default">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Informasi</p>
          <h3 className="text-xl font-bold text-slate-900">Pengumuman</h3>
        </div>
        <Button variant="ghost" size="sm">
          Semua
        </Button>
      </div>
      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">
                  {announcement.title}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>

    <Card variant="default">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Dokumen</p>
          <h3 className="text-xl font-bold text-slate-900">Download Cepat</h3>
        </div>
      </div>
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                Surat Izin Pulang
              </p>
              <p className="text-xs text-slate-500">PDF - 2.4 MB</p>
            </div>
          </div>
          <Download className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                Bukti Pembayaran
              </p>
              <p className="text-xs text-slate-500">PDF - 1.1 MB</p>
            </div>
          </div>
          <Download className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                Jadwal Ujian
              </p>
              <p className="text-xs text-slate-500">PDF - 856 KB</p>
            </div>
          </div>
          <Download className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
        </motion.button>
      </div>
    </Card>
  </motion.div>
</motion.div>
);
}
