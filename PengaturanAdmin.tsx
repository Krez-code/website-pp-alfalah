import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function PengaturanAdmin() {
  const [settings, setSettings] = useState({
    schoolName: 'Pesantren Modern Al-Falah',
    academicYear: '2025/2026',
    contactEmail: 'info@al-falah.id',
    contactPhone: '081234567890',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
        <p className="text-slate-600">Sesuaikan informasi sekolah dan kontak pesantren.</p>
      </div>

      <Card className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <Input
            label="Nama Sekolah"
            value={settings.schoolName}
            onChange={e => handleChange('schoolName', e.target.value)}
          />
          <Input
            label="Tahun Ajaran"
            value={settings.academicYear}
            onChange={e => handleChange('academicYear', e.target.value)}
          />
          <Input
            label="Email Kontak"
            type="email"
            value={settings.contactEmail}
            onChange={e => handleChange('contactEmail', e.target.value)}
          />
          <Input
            label="Telepon Kontak"
            value={settings.contactPhone}
            onChange={e => handleChange('contactPhone', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500">Perubahan akan disimpan secara lokal pada halaman ini.</span>
          <Button onClick={handleSave}>Simpan Pengaturan</Button>
        </div>
        {saved && <p className="text-sm text-emerald-700">Pengaturan berhasil disimpan.</p>}
      </Card>
    </div>
  );
}
