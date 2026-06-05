import { Card } from '../../components/ui/Card';

const profile = {
  fullName: 'Ahmad Zaki',
  nisn: '1234567890',
  kelas: '5A',
  gender: 'Laki-laki',
  birthDate: '1 Januari 2008',
  wali: 'Bapak Ahmad',
  address: 'Jalan Merdeka No. 1',
};

export default function ProfilSantri() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profil</h1>
        <p className="text-slate-600">Informasi lengkap profil santri.</p>
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Nama Lengkap</p>
            <p className="text-base font-semibold text-slate-900">{profile.fullName}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">NISN</p>
            <p className="text-base font-semibold text-slate-900">{profile.nisn}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Kelas</p>
            <p className="text-base font-semibold text-slate-900">{profile.kelas}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Jenis Kelamin</p>
            <p className="text-base font-semibold text-slate-900">{profile.gender}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Tanggal Lahir</p>
            <p className="text-base font-semibold text-slate-900">{profile.birthDate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Wali Santri</p>
            <p className="text-base font-semibold text-slate-900">{profile.wali}</p>
          </div>
          <div className="sm:col-span-2 space-y-2">
            <p className="text-sm text-slate-500">Alamat</p>
            <p className="text-base font-semibold text-slate-900">{profile.address}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
