import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SectionTitle } from '../components/ui/SectionTitle';

const schemas = [
  z.object({
    fullName: z.string().min(3),
    nik: z.string().min(10),
    nisn: z.string().min(8),
    birthPlace: z.string().min(2),
    birthDate: z.string().min(10),
    gender: z.enum(['Laki-laki', 'Perempuan']),
    address: z.string().min(10),
  }),
  z.object({
    fatherName: z.string().min(3),
    motherName: z.string().min(3),
    phone: z.string().min(10),
    fatherJob: z.string().min(2),
    motherJob: z.string().min(2),
  }),
  z.object({
    schoolOrigin: z.string().min(3),
    educationLevel: z.string().min(2),
  }),
  z.object({
    kk: z.instanceof(FileList).refine((files) => files.length > 0, 'Upload Kartu Keluarga.'),
    birthCertificate: z.instanceof(FileList).refine((files) => files.length > 0, 'Upload Akta Kelahiran.'),
    parentIdCard: z.instanceof(FileList).refine((files) => files.length > 0, 'Upload KTP Orang Tua.'),
    photo: z.instanceof(FileList).refine((files) => files.length > 0, 'Upload Pas Foto.'),
  }),
];

type FormModel = z.infer<typeof schemas[number]> &
  Record<string, any>;

export default function Pendaftaran() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormModel>({ resolver: zodResolver(schemas[step]) as any });

  const data = watch();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (data.photo?.length) {
      const url = URL.createObjectURL(data.photo[0]);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPhotoPreview(null);
  }, [data.photo]);

  const stepLabels = ['Data Santri', 'Data Orang Tua', 'Data Pendidikan', 'Upload Berkas', 'Verifikasi'];

  const onSubmit = async (payload: FormModel) => {
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/pendaftaran`, {
        method: 'POST',
        body: formData,
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stepProgress = useMemo(() => Math.round(((step + 1) / stepLabels.length) * 100), [step]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <SectionTitle title="Pendaftaran Santri Baru" subtitle="Lengkapi data pendaftaran dalam lima langkah mudah untuk bergabung dengan pesantren modern kami." />

        <div className="mb-8 overflow-hidden rounded-[32px] bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-slate-700">Langkah {step + 1} dari {stepLabels.length}</p>
            <p className="text-sm text-slate-500">Progress {stepProgress}%</p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${stepProgress}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {step === 0 && (
            <Card className="space-y-6 rounded-[32px] p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <Input label="Nama Lengkap" {...register('fullName')} error={errors.fullName?.message as string} />
                <Input label="NIK" {...register('nik')} error={errors.nik?.message as string} />
                <Input label="NISN" {...register('nisn')} error={errors.nisn?.message as string} />
                <Input label="Tempat Lahir" {...register('birthPlace')} error={errors.birthPlace?.message as string} />
                <Input label="Tanggal Lahir" type="date" {...register('birthDate')} error={errors.birthDate?.message as string} />
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Jenis Kelamin</label>
                  <select className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" {...register('gender')}>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <Input label="Alamat" {...register('address')} error={errors.address?.message as string} />
                </div>
              </div>
            </Card>
          )}

          {step === 1 && (
            <Card className="space-y-6 rounded-[32px] p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <Input label="Nama Ayah" {...register('fatherName')} error={errors.fatherName?.message as string} />
                <Input label="Nama Ibu" {...register('motherName')} error={errors.motherName?.message as string} />
                <Input label="Nomor HP" type="tel" {...register('phone')} error={errors.phone?.message as string} />
                <Input label="Pekerjaan Ayah" {...register('fatherJob')} error={errors.fatherJob?.message as string} />
                <Input label="Pekerjaan Ibu" {...register('motherJob')} error={errors.motherJob?.message as string} />
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="space-y-6 rounded-[32px] p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <Input label="Sekolah Asal" {...register('schoolOrigin')} error={errors.schoolOrigin?.message as string} />
                <Input label="Jenjang Pendidikan" {...register('educationLevel')} error={errors.educationLevel?.message as string} />
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="space-y-6 rounded-[32px] p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Kartu Keluarga</label>
                  <input type="file" {...register('kk')} className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                  <p className="mt-2 text-xs text-red-600">{errors.kk?.message as string}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Akta Kelahiran</label>
                  <input type="file" {...register('birthCertificate')} className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                  <p className="mt-2 text-xs text-red-600">{errors.birthCertificate?.message as string}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">KTP Orang Tua</label>
                  <input type="file" {...register('parentIdCard')} className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                  <p className="mt-2 text-xs text-red-600">{errors.parentIdCard?.message as string}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Pas Foto</label>
                  <input type="file" {...register('photo')} className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                  <p className="mt-2 text-xs text-red-600">{errors.photo?.message as string}</p>
                  {photoPreview && (
                    <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Preview Pas Foto</p>
                      <img src={photoPreview} alt="Preview Pas Foto" className="h-48 w-full rounded-3xl object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {step === 4 && (
            <Card className="space-y-6 rounded-[32px] p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-950">Ringkasan Data</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <p><span className="font-semibold">Nama:</span> {data.fullName || '-'}</p>
                    <p><span className="font-semibold">NIK:</span> {data.nik || '-'}</p>
                    <p><span className="font-semibold">Sekolah:</span> {data.schoolOrigin || '-'}</p>
                    <p><span className="font-semibold">Jenjang:</span> {data.educationLevel || '-'}</p>
                  </div>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-950">Upload Berkas</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <p>Kartu Keluarga: {data.kk?.[0]?.name || 'Belum terunggah'}</p>
                    <p>Akta Kelahiran: {data.birthCertificate?.[0]?.name || 'Belum terunggah'}</p>
                    <p>KTP Orang Tua: {data.parentIdCard?.[0]?.name || 'Belum terunggah'}</p>
                    <p>Pas Foto: {data.photo?.[0]?.name || 'Belum terunggah'}</p>
                  </div>
                  {photoPreview && (
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Preview Pas Foto</p>
                      <img src={photoPreview} alt="Preview Pas Foto" className="h-48 w-full rounded-3xl object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {step > 0 && (
              <Button type="button" variant="ghost" className="rounded-full border border-slate-200 text-slate-700" onClick={() => setStep((prev) => prev - 1)}>
                Kembali
              </Button>
            )}
            <Button type="submit" className="rounded-full">
              {step === 4 ? 'Simpan Pendaftaran' : 'Lanjutkan'}
            </Button>
          </div>

          {submitted && (
            <div className="rounded-[32px] border border-green-200 bg-green-50 p-6 text-green-900">
              Pendaftaran berhasil disimpan. Cek email dan informasi selanjutnya di dashboard.
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
