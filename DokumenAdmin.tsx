import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface DocumentItem {
  id: number;
  title: string;
  type: string;
  status: string;
  uploaded: string;
}

const initialDocuments: DocumentItem[] = [
  { id: 1, title: 'Surat Izin Pulang', type: 'PDF', status: 'Tersedia', uploaded: '12 Juni 2026' },
  { id: 2, title: 'Bukti Pembayaran', type: 'PDF', status: 'Tersedia', uploaded: '10 Juni 2026' },
];

export default function DokumenAdmin() {
  const [documents] = useState<DocumentItem[]>(initialDocuments);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dokumen</h1>
        <p className="text-slate-600">Kelola dokumen penting dan unduhan untuk santri.</p>
      </div>

      <Card className="overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
          <p className="text-slate-600">Dokumen yang sudah diunggah dan tersedia untuk diunduh.</p>
          <Button variant="secondary">Unggah Dokumen</Button>
        </div>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Judul</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Tipe</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{doc.title}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{doc.type}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{doc.status}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{doc.uploaded}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {documents.length === 0 && <p className="p-6 text-sm text-slate-500">Belum ada dokumen.</p>}
      </Card>
    </div>
  );
}
