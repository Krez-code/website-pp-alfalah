import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface SuratRequest {
  id: number;
  student: string;
  date: string;
  reason: string;
  status: 'Menunggu' | 'Disetujui' | 'Ditolak';
}

const initialRequests: SuratRequest[] = [
  { id: 1, student: 'Ahmad Zaki', date: '12 Juni 2026', reason: 'Izin pulang sakit', status: 'Menunggu' },
  { id: 2, student: 'Budi Santoso', date: '10 Juni 2026', reason: 'Izin tidak hadir ujian', status: 'Disetujui' },
];

export default function SuratAdmin() {
  const [requests, setRequests] = useState<SuratRequest[]>(initialRequests);

  const updateStatus = (id: number, status: SuratRequest['status']) => {
    setRequests(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Surat Izin</h1>
        <p className="text-slate-600">Kelola permintaan surat izin santri pesantren.</p>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Santri</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Tanggal</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Alasan</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{request.student}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{request.date}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{request.reason}</td>
                <td className="py-3 px-4 text-sm font-semibold text-slate-900">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${request.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-700' : request.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-800 space-x-2">
                  <Button size="sm" variant="secondary" onClick={() => updateStatus(request.id, 'Disetujui')}>Setujui</Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, 'Ditolak')}>Tolak</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && <p className="p-6 text-sm text-slate-500">Tidak ada permintaan surat izin.</p>}
      </Card>
    </div>
  );
}
