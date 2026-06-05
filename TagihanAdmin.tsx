import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Invoice {
  id: number;
  student: string;
  amount: string;
  dueDate: string;
  status: string;
  note: string;
}

const initialInvoices: Invoice[] = [
  { id: 1, student: 'Ahmad Zaki', amount: 'Rp 3.450.000', dueDate: '30 Juni 2026', status: 'Belum Lunas', note: 'SPP semester 2' },
  { id: 2, student: 'Budi Santoso', amount: 'Rp 3.450.000', dueDate: '30 Juni 2026', status: 'Dibayar', note: 'SPP semester 2' },
];

export default function TagihanAdmin() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: '', amount: '', dueDate: '', note: '' });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleAddInvoice = () => {
    if (!form.student || !form.amount || !form.dueDate) return;
    setInvoices(prev => [
      ...prev,
      {
        id: prev.length + 1,
        student: form.student,
        amount: form.amount,
        dueDate: form.dueDate,
        status: 'Belum Lunas',
        note: form.note || 'Tagihan baru',
      },
    ]);
    setForm({ student: '', amount: '', dueDate: '', note: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Tagihan</h1>
          <p className="text-slate-600">Tambah dan pantau tagihan santri pesantren.</p>
        </div>
        <Button onClick={() => setShowForm(prev => !prev)}>{showForm ? 'Tutup Form' : 'Tambah Tagihan'}</Button>
      </div>

      {showForm && (
        <Card className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nama Santri"
              value={form.student}
              onChange={e => handleChange('student', e.target.value)}
              placeholder="Contoh: Ahmad Zaki"
              required
            />
            <Input
              label="Jumlah Tagihan"
              value={form.amount}
              onChange={e => handleChange('amount', e.target.value)}
              placeholder="Contoh: Rp 3.450.000"
              required
            />
            <Input
              label="Tanggal Jatuh Tempo"
              type="date"
              value={form.dueDate}
              onChange={e => handleChange('dueDate', e.target.value)}
              required
            />
            <Input
              label="Keterangan"
              value={form.note}
              onChange={e => handleChange('note', e.target.value)}
              placeholder="SPP, Pondok, dll."
            />
          </div>
          <Button onClick={handleAddInvoice}>Simpan Tagihan</Button>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Santri</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Jumlah</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Jatuh Tempo</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{invoice.student}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{invoice.amount}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{invoice.dueDate}</td>
                <td className="py-3 px-4 text-sm font-semibold text-slate-900">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${invoice.status === 'Dibayar' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-800">{invoice.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && <p className="p-6 text-sm text-slate-500">Belum ada data tagihan.</p>}
      </Card>
    </div>
  );
}
