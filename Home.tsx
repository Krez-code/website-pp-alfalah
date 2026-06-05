import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ArrowRight, CalendarDays, FileText, Globe2, Smile, Star, Users, Award, BookOpen, ChevronDown, Play, Quote, TrendingUp } from 'lucide-react';
import heroImage from '../assets/images/santri.jpg';
import pengasuhPhoto from '../assets/images/pengasuh.jpg';
import { Landmark } from "lucide-react";

const stats = [
  { label: 'Santri Aktif', value: '1.245+', icon: <Users className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500' },
  { label: 'Ustadz & Guru', value: '89+', icon: <Award className="h-6 w-6" />, color: 'from-purple-500 to-pink-500' },
  { label: 'Program Unggulan', value: '15+', icon: <BookOpen className="h-6 w-6" />, color: 'from-orange-500 to-yellow-500' },
  { label: 'Alumni', value: '2.350+', icon: <TrendingUp className="h-6 w-6" />, color: 'from-green-500 to-emerald-500' },
];

const programs = [
  { title: "Tahfidz Qur'an", desc: "Program menghafal Al-Quran dengan metode yang menyenangkan dan efektif", icon: <BookOpen className="h-8 w-8" />, color: 'from-emerald-500 to-teal-500' },
  { title: "Bahasa Arab & Inggris", desc: "Kemampuan berbahasa asing untuk persiapan dunia global", icon: <Globe2 className="h-8 w-8" />, color: 'from-blue-500 to-indigo-500' },
  { title: "Kitab Kuning", desc: "Pembelajaran kitab kuning dengan metode tradisional dan modern", icon: <FileText className="h-8 w-8" />, color: 'from-amber-500 to-orange-500' },
  { title: "Sains & Teknologi", desc: "Pendidikan STEM terintegrasi dengan nilai-nilai Islam", icon: <Award className="h-8 w-8" />, color: 'from-purple-500 to-violet-500' },
  { title: "Leadership", desc: "Pelatihan kepemimpinan dan karakter building yang berkelanjutan", icon: <Users className="h-8 w-8" />, color: 'from-rose-500 to-pink-500' },
  { title: "Kepesantrenan", desc: "Pembentukan akhlak mulia dan kepribadian muslim yang seutuhnya", icon: <Smile className="h-8 w-8" />, color: 'from-cyan-500 to-blue-500' },
];

const news = [
  { title: 'Santri Juara Lomba Tahfidz Regional', date: '12 Mei 2026', category: 'Prestasi', image: '🏆' },
  { title: 'Wisuda Tahfidz Angkatan 5', date: '28 April 2026', category: 'Kegiatan', image: '🎓' },
  { title: 'Pembukaan Program Haflah dan Seminar', date: '04 Maret 2026', category: 'Acara', image: '📚' },
];

const agenda = [
  { title: 'Pengajian Santri', date: '10 Juni 2026', type: 'Pengajian', time: '08:00 - 10:00', color: 'bg-blue-500' },
  { title: 'Ujian Tengah Semester', date: '18 Juni 2026', type: 'Ujian', time: '07:30 - 12:00', color: 'bg-orange-500' },
  { title: 'Kunjungan Wali Santri', date: '25 Juni 2026', type: 'Wali Santri', time: '09:00 - 11:00', color: 'bg-purple-500' },
];

const testimonials = [
  { quote: "Pelayanan sangat memuaskan, santri kami berkembang baik secara akademik maupun akhlak.", name: 'Bapak Ahmad', role: 'Wali Santri', rating: 5 },
  { quote: "Fasilitas modern dan pengasuhan yang terstruktur membuat anak nyaman belajar.", name: 'Ibu Siti', role: 'Wali Santri', rating: 5 },
  { quote: "Sistem monitoring yang transparan memudahkan kami memantau perkembangan anak.", name: 'Mawar Putri', role: 'Wali Santri', rating: 5 },
];

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Semua');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-950">
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/20"
                >
                  <Star className="h-4 w-4 fill-current" />
                  <span>Sistem Akademik Premium 2026</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
                >
                  Mencetak Generasi{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Qurani
                  </span>
                  , Berakhlak Mulia
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed"
                >
                  Program pesantren terintegrasi dengan pendidikan Qur'ani, akademik unggulan, dan fasilitas modern yang mendukung santri meraih prestasi dunia dan akhirat.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button as="a" href="/pendaftaran" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                    Daftar Santri Baru
                  </Button>
                  <Button as="a" href="/login" variant="outline" size="lg" icon={<Play className="h-5 w-5" />}>
                    Login Santri
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <Card className="flex items-center gap-4 group hover:scale-105">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Globe2 size={28} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Lingkungan Islami</p>
                      <p className="text-sm text-slate-600">Suasana belajar ramah</p>
                    </div>
                  </Card>
                  <Card className="flex items-center gap-4 group hover:scale-105">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <CalendarDays size={28} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Agenda Dinamis</p>
                      <p className="text-sm text-slate-600">Kalender akademik lengkap</p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ y: y1, opacity: opacity1 }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-3xl" />
                  <div className="relative rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
                    <img
                      src={heroImage}
                      alt="Santri belajar di pesantren"
                      className="w-full h-[400px] lg:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold text-white">Aktivitas Harian Santri</h3>
                        <p className="mt-2 text-sm text-white/90">Dokumentasi langsung dari lingkungan pesantren Al-Falah</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="gradient" className="text-center group hover:scale-105 cursor-pointer">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profil" className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Sambutan Pengasuh"
              subtitle="Selamat datang di sistem informasi pesantren modern kami, tempat tumbuh generasi Qurani yang inspiratif."
            />
            <div className="grid gap-8 lg:grid-cols-[320px_1fr] items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <img
                  alt="Pengasuh"
                  src={pengasuhPhoto}
                  className="relative h-64 w-64 lg:h-80 lg:w-80 rounded-full object-cover border-8 border-white shadow-2xl mx-auto"
                />
                <div className="absolute bottom-4 right-4 h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <Landmark className="h-10 w-10 text-primary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 lg:p-10">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">KH. Ahmad Falahuddin</h3>
                      <p className="text-primary font-medium">Pengasuh dan Pembimbing Utama</p>
                    </div>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-base leading-relaxed text-slate-600">
                        Assalamu'alaikum warahmatullahi wabarakatuh. Kami hadir untuk mendidik generasi Qurani yang berprestasi, berakhlak mulia, dan siap berkontribusi bagi bangsa. Sistem digital ini mendukung transparansi, monitoring, dan komunikasi dengan wali santri secara profesional.
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                        <p className="text-2xl font-bold text-primary">15+</p>
                        <p className="text-sm text-slate-600">Tahun Pengalaman</p>
                      </div>
                      <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5">
                        <p className="text-2xl font-bold text-primary">1000+</p>
                        <p className="text-sm text-slate-600">Alumni Sukses</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="program" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Program Unggulan"
              subtitle="Program terintegrasi untuk pengembangan hafalan, bahasa, kitab kuning, sains, dan karakter."
              badge="Program"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="gradient" className="group h-full hover:scale-105 cursor-pointer">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${program.color} text-white shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {program.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{program.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Pelajari lebih lanjut</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* News & Agenda Section */}
        <section id="news" className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionTitle title="Berita Terbaru" subtitle="Informasi terbaru dari kegiatan pesantren, prestasi santri, dan event internal." />
                <div className="space-y-4">
                  {news.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card variant="default" className="group cursor-pointer hover:scale-[1.02]">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                {item.category}
                              </span>
                              <span className="text-xs text-slate-500">{item.date}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors duration-200">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-2">Lihat detail berita terbaru seputar pengembangan pesantren.</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionTitle title="Agenda Terdekat" subtitle="Agenda pondok dan kegiatan penting yang akan datang." />
                <div className="space-y-4">
                  {agenda.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card variant="default" className="group cursor-pointer hover:scale-[1.02]">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg`}>
                            <CalendarDays size={28} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors duration-200">
                              {item.title}
                            </h3>
                            <p className="text-sm text-primary font-medium mt-1">{item.type}</p>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {item.date} • {item.time}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section id="Testimoni" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Testimoni Wali Santri"
              subtitle="Pengalaman wali santri dengan sistem monitoring dan layanan pesantren modern."
              badge="Testimoni"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-[3rem] blur-2xl" />
              <Card variant="glass" className="relative overflow-hidden p-8 lg:p-12">
                <div className="absolute top-8 left-8 text-8xl text-primary/10">
                  <Quote className="h-24 w-24" />
                </div>

                <div className="relative">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto"
                  >
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-xl lg:text-2xl font-medium text-slate-900 leading-relaxed mb-8">
                      "{testimonials[testimonialIndex].quote}"
                    </p>
                    <div>
                      <p className="font-bold text-slate-900">{testimonials[testimonialIndex].name}</p>
                      <p className="text-sm text-primary">{testimonials[testimonialIndex].role}</p>
                    </div>
                  </motion.div>

                  <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => setTestimonialIndex(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === testimonialIndex
                            ? 'w-12 bg-gradient-to-r from-primary to-secondary'
                            : 'w-3 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="kontak" className="py-20 bg-gradient-to-br from-primary via-primary to-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Siap Bergabung dengan Kami?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Daftarkan putra Anda sekarang dan berikan pendidikan terbaik untuk masa depan yang gemilang.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  as="a"
                  href="/pendaftaran"
                  size="lg"
                  className="bg-white text-primary hover:bg-slate-100"
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  Daftar Sekarang
                </Button>
                <Button
                  as="a"
                  href="/agenda"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Lihat Agenda
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Al-Falah</span>
                </div>
                <p className="text-sm leading-relaxed max-w-md">
                  Pesantren modern yang berkomitmen mencetak generasi Qurani, berakhlak mulia, dan berprestasi di bidang akademik maupun teknologi.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Menu</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-primary transition-colors">Beranda</a></li>
                  <li><a href="/gallery" className="hover:text-primary transition-colors">Galeri</a></li>
                  <li><a href="/agenda" className="hover:text-primary transition-colors">Agenda</a></li>
                  <li><a href="/pendaftaran" className="hover:text-primary transition-colors">Pendaftaran</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Kontak</h4>
                <ul className="space-y-2 text-sm">
                  <li>info@al-falah.sch.id</li>
                  <li>+62 812 3456 7890</li>
                  <li>Jl. Pesantren No. 123</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; 2026 Pesantren Al-Falah. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
