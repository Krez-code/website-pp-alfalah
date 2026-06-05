import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';

const schedule = [
  { type: 'Agenda Harian', title: 'Kajian Fiqh Santri', date: 'Senin, 10 Juni 2026', time: '08:00 - 10:00', location: 'Masjid Utama' },
  { type: 'Jadwal Ujian', title: 'Ujian Akhir Semester', date: 'Kamis, 18 Juni 2026', time: '07:30 - 12:00', location: 'Ruang Aula' },
  { type: 'Agenda Bulanan', title: 'Peringatan Isra Mi`raj', date: 'Sabtu, 22 Juni 2026', time: '09:00 - 11:00', location: 'Lapangan Tengah' },
  { type: 'Pengajian', title: 'Pengajian Santri Putri', date: 'Rabu, 14 Juni 2026', time: '16:00 - 17:30', location: 'Gedung Serbaguna' },
];

const tabItems = ['Semua', 'Hari Ini', 'Ujian', 'Liburan', 'Pengajian', 'Haflah', 'Wali Santri'];

export default function Agenda() {
  const [selected, setSelected] = useState('Semua');

  const filtered = selected === 'Semua' ? schedule : schedule.filter((item) => item.type.toLowerCase().includes(selected.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <SectionTitle title="Agenda Pondok" subtitle="Kalender kegiatan harian, ujian, pengajian, dan acara penting untuk santri dan wali santri." />

        <div className="mb-8 flex flex-wrap gap-3">
          {tabItems.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelected(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${selected === tab ? 'bg-primary text-white' : 'bg-white text-slate-700 shadow-soft'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((item) => (
            <Card key={item.title} className="rounded-[32px] border border-slate-200 p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/10 text-secondary">
                  <CalendarDays size={28} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-secondary">{item.type}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2"><Clock3 size={16} /> {item.time}</p>
                <p className="flex items-center gap-2"><MapPin size={16} /> {item.location}</p>
                <p className="mt-4 text-sm text-slate-500">Detail agenda terbaru akan terus diperbarui berdasarkan kalender akademik dan event pesantren.</p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
