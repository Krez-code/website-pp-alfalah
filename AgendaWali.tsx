import { Card } from '../../components/ui/Card';

const agenda = [
  { id: 1, title: 'Ujian Tengah Semester', date: '18 Jun 2026', location: 'Ruang Aula' },
  { id: 2, title: 'Kajian Santri', date: '20 Jun 2026', location: 'Masjid Putih' },
  { id: 3, title: 'Rapat Wali Santri', date: '25 Jun 2026', location: 'Ruang Pertemuan' },
];

export default function AgendaWali() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Agenda</h1>
        <p className="text-slate-600">Agenda kegiatan pesantren yang akan datang.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agenda.map(item => (
          <Card key={item.id} className="space-y-3">
            <p className="text-sm font-medium text-slate-500">{item.date}</p>
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="text-sm text-slate-600">Lokasi: {item.location}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
