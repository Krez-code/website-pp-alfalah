import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function NilaiSantri() {
  return (
<div className="space-y-6">
  <h1 className="text-2xl font-bold text-slate-900">Nilai Ujian</h1>
  <Card>
    <table className="w-full text-sm">
      <thead className="border-b">
        <tr>
          <th className="text-left pb-2">Mata Pelajaran</th>
          <th className="text-left pb-2">Nilai</th>
          <th className="text-left pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-2">Bahasa Arab</td>
          <td className="py-2">88</td>
          <td className="py-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Baik</span></td>
        </tr>
        <tr className="border-b">
          <td className="py-2">Tahfidz Qur'an</td>
          <td className="py-2">92</td>
          <td className="py-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Baik</span></td>
        </tr>
        <tr>
          <td className="py-2">Kitab Kuning</td>
          <td className="py-2">85</td>
          <td className="py-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Cukup</span></td>
        </tr>
      </tbody>
    </table>
  </Card>
</div>
);
}