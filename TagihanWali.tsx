import { Card } from '../../components/ui/Card';

const invoices = [
  { id: 1, child: 'Ahmad Zaki', amount: 'Rp 3.450.000', due: '30 Juni 2026', status: 'Belum Lunas' },
  { id: 2, child: 'Ahmad Zaki', amount: 'Rp 1.200.000', due: '15 Juli 2026', status: 'Belum Lunas' },
];

export default function TagihanWali() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tagihan Anak</h1>
        <p className="text-slate-600">Pantau tagihan anak santri Anda.</p>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Nama Anak</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Jumlah</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Jatuh Tempo</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(item => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{item.child}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{item.amount}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{item.due}</td>
                <td className="py-3 px-4 text-sm text-slate-800">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Belum Lunas' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
