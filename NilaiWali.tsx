import { Card } from '../../components/ui/Card';

const grades = [
  { id: 1, subject: 'Matematika', score: '88', remark: 'Baik' },
  { id: 2, subject: 'Bahasa Arab', score: '91', remark: 'Baik' },
  { id: 3, subject: 'Tahfidz Qur\'an', score: '95', remark: 'Sangat Baik' },
];

export default function NilaiWali() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Nilai Anak</h1>
        <p className="text-slate-600">Lihat ringkasan nilai anak Anda.</p>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Mata Pelajaran</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Nilai</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(item => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{item.subject}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{item.score}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
