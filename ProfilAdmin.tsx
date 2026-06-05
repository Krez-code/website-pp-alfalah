import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface StudentProfile {
  id: number;
  fullName: string;
  nisn: string;
  kelas: string;
  wali: string;
}

const initialProfiles: StudentProfile[] = [
  { id: 1, fullName: 'Ahmad Zaki', nisn: '1234567890', kelas: '5A', wali: 'Bapak Ahmad' },
  { id: 2, fullName: 'Budi Santoso', nisn: '0987654321', kelas: '6B', wali: 'Ibu Siti' },
];

export default function ProfilAdmin() {
  const [profiles, setProfiles] = useState<StudentProfile[]>(initialProfiles);
  const [form, setForm] = useState({ fullName: '', nisn: '', kelas: '', wali: '' });

  const handleAdd = () => {
    if (!form.fullName || !form.nisn || !form.kelas) return;
    setProfiles(prev => [
      ...prev,
      {
        id: prev.length + 1,
        fullName: form.fullName,
        nisn: form.nisn,
        kelas: form.kelas,
        wali: form.wali || 'Belum diisi',
      },
    ]);
    setForm({ fullName: '', nisn: '', kelas: '', wali: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profil Santri</h1>
        <p className="text-slate-600">Tambah dan kelola data profil santri pesantren.</p>
      </div>

      <Card className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-4">
          <Input
            label="Nama Santri"
            value={form.fullName}
            onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Contoh: Ahmad Zaki"
          />
          <Input
            label="NISN"
            value={form.nisn}
            onChange={e => setForm(prev => ({ ...prev, nisn: e.target.value }))}
            placeholder="Contoh: 1234567890"
          />
          <Input
            label="Kelas"
            value={form.kelas}
            onChange={e => setForm(prev => ({ ...prev, kelas: e.target.value }))}
            placeholder="Contoh: 5A"
          />
          <Input
            label="Nama Wali"
            value={form.wali}
            onChange={e => setForm(prev => ({ ...prev, wali: e.target.value }))}
            placeholder="Contoh: Bapak Ahmad"
          />
        </div>
        <Button onClick={handleAdd}>Tambah Santri</Button>
      </Card>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Nama</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">NISN</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Kelas</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Wali</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(student => (
              <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{student.fullName}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{student.nisn}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{student.kelas}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{student.wali}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {profiles.length === 0 && <p className="p-6 text-sm text-slate-500">Belum ada data santri.</p>}
      </Card>
    </div>
  );
}
