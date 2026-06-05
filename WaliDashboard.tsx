import { useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
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
  Download,
  Eye,
  Bell,
  ChevronRight,
  TrendingUp,
  Award,
  CreditCard,
  FileText,
  BookOpen,
  GraduationCap,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function WaliDashboard() {
  const paymentChart = useMemo(
    () => ({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
      datasets: [
        {
          label: 'Pembayaran Anak',
          data: [130, 140, 135, 150, 155, 160],
          backgroundColor: 'rgba(15, 107, 75, 0.8)',
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    }),
    [],
  );

  const scoreChart = useMemo(
    () => ({
      labels: ['Ulangan', 'UTS', 'UAS', 'Semester'],
      datasets: [
        {
          label: 'Nilai Anak',
          data: [82, 85, 92, 94],
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

  const subjectDistribution = useMemo(
    () => ({
      labels: ['Tahfidz', 'Bahasa', 'Kitab', 'Sains', 'Math'],
      datasets: [
        {
          data: [25, 20, 20, 20, 15],
          backgroundColor: [
            'rgba(15, 107, 75, 0.8)',
            'rgba(27, 138, 90, 0.8)',
            'rgba(52, 211, 153, 0.8)',
            'rgba(167, 243, 208, 0.8)',
            'rgba(209, 250, 229, 0.8)',
          ],
          borderWidth: 0,
        },
      ],
    }),
    [],
  );

  const quickStats = [
    { label: 'Tagihan Bulan Ini', value: 'Rp 3.450.000', status: 'Semester 2', icon: <CreditCard className="h-6 w-6" />, color: 'from-amber-500 to-orange-500' },
    { label: 'Rata-rata Nilai', value: 'A -', status: 'Stabil', icon: <Award className="h-6 w-6" />, color: 'from-blue-500 to-indigo-500' },
    { label: 'Kehadiran', value: '96%', status: 'Sangat Baik', icon: <TrendingUp className="h-6 w-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Prestasi', value: '5', status: 'Bulan ini', icon: <Heart className="h-6 w-6" />, color: 'from-rose-500 to-pink-500' },
  ];

  const childActivities = [
    { activity: 'Menghafal Juz 30', score: 'Sangat Baik', date: '12 Jun 2026', color: 'bg-green-500' },
    { activity: 'Ujian Bahasa Arab', score: '85/100', date: '10 Jun 2026', color: 'bg-blue-500' },
    { activity: 'Lomba Tahfidz', score: 'Juara 2', date: '08 Jun 2026', color: 'bg-yellow-500' },
    { activity: 'Kajian Kitab Kuning', score: 'A', date: '05 Jun 2026', color: 'bg-purple-500' },
  ];

  const upcomingEvents = [
    { title: 'Ujian Tengah Semester', date: '18 Jun 2026', time: '07:30 - 12:00', location: 'Ruang Aula', color: 'bg-red-500' },
    { title: 'Kajian Santri', date: '10 Jun 2026', time: '08:00 - 10:00', location: 'Masjid Utama', color: 'bg-blue-500' },
    { title: 'Kunjungan Wali Santri', date: '25 Jun 2026', time: '09:00 - 11:00', location: 'Lapangan', color: 'bg-purple-500' },
  ];

  const documents = [
    { name: 'Surat Izin Pulang', type: 'PDF', size: '2.4 MB', icon: <FileText className="h-5 w-5" />, color: 'bg-blue-500' },
    { name: 'Bukti Pembayaran', type: 'PDF', size: '1.1 MB', icon: <CreditCard className="h-5 w-5" />, color: 'bg-green-500' },
    { name: 'Jadwal Ujian', type: 'PDF', size: '856 KB', icon: <BookOpen className="h-5 w-5" />, color: 'bg-purple-500' },
    { name: 'Raport Semester', type: 'PDF', size: '3.2 MB', icon: <GraduationCap className="h-5 w-5" />, color: 'bg-orange-500' },
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
          Dashboard Wali Santri
        </h1>
        <p className="text-slate-600">
          Pantau perkembangan putra Anda, pembayaran, dan kegiatan pesantren.
        </p>
      </div>
      <Button variant="outline" icon={<Bell className="h-4 w-4" />}>
        Notifikasi (4)
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
          <p className="text-sm font-medium text-slate-600 mb-1">Riwayat</p>
          <h3 className="text-xl font-bold text-slate-900">Pembayaran 6 Bulan</h3>
        </div>
        <Button variant="ghost" size="sm">Detail</Button>
      </div>
      <div className="h-72">
        <Bar
          data={paymentChart}
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
        <p className="text-sm font-medium text-slate-600 mb-1">Mata Pelajaran</p>
        <h3 className="text-xl font-bold text-slate-900">Distribusi Nilai</h3>
      </div>
      <div className="h-56 flex items-center justify-center">
        <Doughnut
          data={subjectDistribution}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { padding: 10, usePointStyle: true, pointStyle: 'circle', font: { size: 10 } }
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
          <p className="text-sm font-medium text-slate-600 mb-1">Perkembangan</p>
          <h3 className="text-xl font-bold text-slate-900">Grafik Nilai Akademik</h3>
        </div>
      </div>
      <div className="h-64">
        <Line
          data={scoreChart}
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Agenda</p>
          <h3 className="text-xl font-bold text-slate-900">Kegiatan Anak</h3>
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
              <p className="text-xs text-slate-500 mt-1">{event.date}</p>
              <p className="text-xs text-slate-500">{event.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>

  {/* Bottom Row */}
  <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
    {/* Recent Activities */}
    <Card variant="default">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Aktivitas Terbaru</p>
          <h3 className="text-xl font-bold text-slate-900">Kegiatan Putra Anda</h3>
        </div>
        <Button variant="ghost" size="sm">
          Semua
        </Button>
      </div>
      <div className="space-y-3">
        {childActivities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
          >
            <div className={`h-12 w-12 rounded-xl ${activity.color} flex items-center justify-center text-white`}>
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{activity.activity}</p>
              <p className="text-xs text-slate-500 mt-1">Nilai: <span className="font-medium text-primary">{activity.score}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">{activity.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>

    {/* Documents */}
    <Card variant="default">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">Dokumen</p>
          <h3 className="text-xl font-bold text-slate-900">Download Dokumen</h3>
        </div>
        <Button variant="ghost" size="sm">
          Semua
        </Button>
      </div>
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <motion.button
            key={doc.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-lg ${doc.color} flex items-center justify-center text-white`}>
                {doc.icon}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                  {doc.name}
                </p>
                <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <Download className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
          </motion.button>
        ))}
      </div>
    </Card>
  </motion.div>
</motion.div>
);
}
