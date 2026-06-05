import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const documents = [
  { id: 1, title: 'Raport Semester 2', type: 'PDF', size: '2.3 MB', date: '10 Juni 2026' },
  { id: 2, title: 'Jadwal Ujian', type: 'PDF', size: '856 KB', date: '8 Juni 2026' },
];

export default function DokumenWali() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dokumen</h1>
          <p className="text-slate-600">Unduh dokumen anak santri Anda.</p>
        </div>
        <Button variant="secondary">Minta Dokumen Baru</Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Judul</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Tipe</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Ukuran</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Tanggal</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{doc.title}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{doc.type}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{doc.size}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{doc.date}</td>
                <td className="py-3 px-4 text-sm text-slate-800">
                  <Button variant="outline" size="sm">Download</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
