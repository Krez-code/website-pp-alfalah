import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, Eye, EyeOff, User, Shield, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SectionTitle } from '../components/ui/SectionTitle';
import api from '../lib/api';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', values);
      localStorage.setItem('pesantren_token', response.data.accessToken);
      localStorage.setItem('pesantren_role', response.data.user.role?.toLowerCase());
      const role = response.data.user.role?.toLowerCase();
      if (role === 'admin') navigate('/dashboard/admin');
      else if (role === 'wali_santri') navigate('/dashboard/wali');
      else navigate('/dashboard/santri');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login gagal. Pastikan email dan password benar.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: 'santri', label: 'Santri', icon: <User className="h-8 w-8" />, desc: 'Akses nilai, agenda, dan pembayaran' },
    { id: 'wali', label: 'Wali Santri', icon: <Users className="h-8 w-8" />, desc: 'Monitoring perkembangan putra Anda' },
    { id: 'admin', label: 'Admin', icon: <Shield className="h-8 w-8" />, desc: 'Kelola sistem dan data keseluruhan' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 text-slate-950">
      <Navbar />
      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-20 lg:px-10">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-8"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-1">
                <div className="rounded-[2.3rem] bg-white p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">Al-Falah</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                      Sistem Informasi Pesantren Modern
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Akses dashboard lengkap untuk monitoring akademik, keuangan, dan kegiatan pesantren secara real-time.
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                        <p className="text-2xl font-bold text-primary">1.245+</p>
                        <p className="text-xs text-slate-600 mt-1">Santri Aktif</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                        <p className="text-2xl font-bold text-primary">89+</p>
                        <p className="text-xs text-slate-600 mt-1">Guru & Ustadz</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                        <p className="text-2xl font-bold text-primary">15+</p>
                        <p className="text-xs text-slate-600 mt-1">Program</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {roles.map((role) => (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">{role.label}</p>
                  <p className="text-xs text-slate-600 mt-1">{role.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <Card variant="glass" className="p-8 lg:p-10">
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg mb-4">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <SectionTitle
                    title="Selamat Datang"
                    subtitle="Masuk ke akun Anda untuk mengakses dashboard"
                    className="text-center"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-red-50 border border-red-200"
                    >
                      <p className="text-sm text-red-600 text-center">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Email atau NIS
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        {...register('email')}
                        type="email"
                        className={`w-full rounded-xl border pl-12 pr-4 py-3 text-sm outline-none transition-all duration-200
                          ${errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-slate-300'
                          }
                          bg-white`}
                        placeholder="nama@example.com"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-red-600"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className={`w-full rounded-xl border pl-12 pr-12 py-3 text-sm outline-none transition-all duration-200
                          ${errors.password
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-slate-300'
                          }
                          bg-white`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-red-600"
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="h-5 w-5 rounded border-2 border-slate-300 peer-checked:bg-primary peer-checked:border-primary transition-all duration-200 group-hover:border-primary/50" />
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-600">Ingat saya</span>
                    </label>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Lupa password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Masuk...
                      </span>
                    ) : (
                      'Masuk'
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-500">Atau</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md transition-all duration-200 group">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Santri</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md transition-all duration-200 group">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Wali</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:shadow-md transition-all duration-200 group">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">Admin</span>
                  </button>
                </div>

                <p className="text-center text-sm text-slate-600">
                  Belum punya akun?{' '}
                  <Link to="/pendaftaran" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
