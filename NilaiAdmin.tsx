import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Grade {
  id: number;
  student: string;
  subject: string;
  score: string;
  semester: string;
}

const initialGrades: Grade[] = [
  { id: 1, student: 'Ahmad Zaki', subject: 'Matematika', score: '88', semester: 'Genap' },
  { id: 2, student: 'Budi Santoso', subject: 'Bahasa Inggris', score: '92', semester: 'Genap' },
];

const students = ['Ahmad Zaki', 'Budi Santoso', 'Citra Naufal'];
const subjects = ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Pendidikan Agama', 'IPA'];
const semesters = ['Genap', 'Ganjil'];

export default function NilaiAdmin() {
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [form, setForm] = useState({ student: '', subject: '', score: '', semester: 'Genap' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.student || !form.subject || !form.score) return;

    if (editingId !== null) {
      setGrades(prev => prev.map(item => item.id === editingId ? { ...item, ...form } : item));
      setEditingId(null);
    } else {
      setGrades(prev => [
        ...prev,
        { id: prev.length + 1, student: form.student, subject: form.subject, score: form.score, semester: form.semester },
      ]);
    }

    setForm({ student: '', subject: '', score: '', semester: 'Genap' });
  };

  const handleEdit = (grade: Grade) => {
    setEditingId(grade.id);
    setForm({ student: grade.student, subject: grade.subject, score: grade.score, semester: grade.semester });
  };

  const handleDelete = (id: number) => {
    setGrades(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kelola Nilai Ujian</h1>
          <p className="text-slate-600">Input, edit, dan simpan nilai santri dengan cepat.</p>
        </div>
        <Button onClick={handleSave}>{editingId !== null ? 'Simpan Perubahan' : 'Tambah Nilai'}</Button>
      </div>

      <Card className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="space-y-2 text-sm text-slate-700">
            <span>Santri</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={form.student}
              onChange={e => handleChange('student', e.target.value)}
            >
              <option value="">Pilih santri</option>
              {students.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Mapel</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={form.subject}
              onChange={e => handleChange('subject', e.target.value)}
            >
              <option value="">Pilih mata pelajaran</option>
              {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
            </select>
          </label>
          <Input
            label="Nilai"
            type="number"
            value={form.score}
            onChange={e => handleChange('score', e.target.value)}
            placeholder="Contoh: 92"
          />
          <label className="space-y-2 text-sm text-slate-700">
            <span>Semester</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={form.semester}
              onChange={e => handleChange('semester', e.target.value)}
            >
              {semesters.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </Card>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Santri</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Mapel</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Nilai</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Semester</th>
              <th className="py-3 px-4 text-sm font-semibold text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(grade => (
              <tr key={grade.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">{grade.student}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{grade.subject}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{grade.score}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{grade.semester}</td>
                <td className="py-3 px-4 text-sm text-slate-800 space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEdit(grade)}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(grade.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {grades.length === 0 && <p className="p-6 text-sm text-slate-500">Belum ada nilai santri.</p>}
      </Card>
    </div>
  );
}
