import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

interface SuratItem {
  id: number;
  tanggal: string;
  keterangan: string;
  status: string;
}

const initialSuratList: SuratItem[] = [
  { id: 1, tanggal: '15 Jun 2026', keterangan: 'Izin pulang karena ada kegiatan keluarga.', status: 'Disetujui' },
  { id: 2, tanggal: '20 Jun 2026', keterangan: 'Izin tidak hadir ujian karena sakit.', status: 'Menunggu' },
];

export default function SuratIzinSantri() {
  const [suratList] = useState<SuratItem[]>(initialSuratList);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDownloadPdf = async (surat: SuratItem) => {
    setLoadingId(surat.id);
    try {
      const qrUrl = `${window.location.origin}/dashboard/admin/surat`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, {
        margin: 2,
        width: 160,
        color: { dark: '#000000', light: '#ffffff' },
      });

      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      pdf.setFontSize(20);
      pdf.text('SURAT IZIN SANTRI', 40, 60);
      pdf.setFontSize(12);
      pdf.text(`Tanggal Surat : ${surat.tanggal}`, 40, 100);
      pdf.text(`Status Surat  : ${surat.status}`, 40, 120);
      pdf.text('Keterangan   :', 40, 160);
      pdf.setFontSize(11);
      const keteranganLines = pdf.splitTextToSize(surat.keterangan, 500);
      pdf.text(keteranganLines, 40, 180);

      pdf.addImage(qrDataUrl, 'JPEG', 40, 260, 140, 140);
      pdf.setFontSize(10);
      pdf.text('Scan kode QR untuk membuka dashboard izin admin dan menyetujui permohonan.', 40, 420, { maxWidth: 500 });

      pdf.save(`surat-izin-${surat.id}.pdf`);
    } catch (error) {
      console.error('Gagal membuat PDF surat izin:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surat Izin</h1>
          <p className="text-slate-600">Buat dan unduh surat izin untuk dicetak. Setiap PDF berisi kode QR menuju dashboard izin admin.</p>
        </div>
        <Button variant="secondary">
          <Plus className="h-4 w-4 mr-2" /> Buat Izin
        </Button>
      </div>

      <Card>
        {suratList.length === 0 ? (
          <p className="text-slate-500">Belum ada surat izin.</p>
        ) : (
          <ul className="space-y-4">
            {suratList.map((surat) => (
              <li key={surat.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Tanggal: {surat.tanggal}</p>
                    <h2 className="text-lg font-semibold text-slate-900">{surat.keterangan}</h2>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${surat.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {surat.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadPdf(surat)}
                      disabled={loadingId === surat.id}
                    >
                      <Download className="h-4 w-4" />
                      {loadingId === surat.id ? 'Membuat PDF...' : 'Download PDF'}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
