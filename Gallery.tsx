import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import santri1 from '../assets/images/santri-1.svg';
import santri2 from '../assets/images/santri-2.svg';
import santri3 from '../assets/images/santri-3.svg';
import santri4 from '../assets/images/santri-4.svg';
import santri5 from '../assets/images/santri-5.svg';
import santri6 from '../assets/images/santri-6.svg';

const categories = ['Semua', 'Kegiatan Belajar', 'Hafalan Qur\'an', 'Wisuda', 'Lomba', 'Kegiatan Harian', 'Asrama', 'Masjid'];

const galleryItems = [
  { id: 1, title: 'Kegiatan Hafalan', category: 'Hafalan Qur\'an', imageUrl: santri1, date: '12 Mei 2026' },
  { id: 2, title: 'Wisuda Tahfidz', category: 'Wisuda', imageUrl: santri2, date: '28 April 2026' },
  { id: 3, title: 'Kunjungan Wali Santri', category: 'Kegiatan Harian', imageUrl: santri3, date: '25 Juni 2026' },
  { id: 4, title: 'Belajar Bahasa Arab', category: 'Kegiatan Belajar', imageUrl: santri4, date: '15 Mei 2026' },
  { id: 5, title: 'Asrama Modern', category: 'Asrama', imageUrl: santri5, date: '10 Juni 2026' },
  { id: 6, title: 'Masjid Pondok', category: 'Masjid', imageUrl: santri6, date: '5 Mei 2026' },
];

export default function Gallery() {
  const [selected, setSelected] = useState('Semua');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (selected === 'Semua' ? galleryItems : galleryItems.filter((item) => item.category === selected)),
    [selected],
  );

  const nextPreview = () => {
    if (previewIndex !== null) {
      setPreviewIndex((previewIndex + 1) % filtered.length);
    }
  };

  const prevPreview = () => {
    if (previewIndex !== null) {
      setPreviewIndex((previewIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <SectionTitle
          title="Galeri Kegiatan"
          subtitle="Dokumentasi kegiatan pondok pesantren modern dengan filter kategori dan pratinjau gambar."
          badge="Galeri"
        />

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selected === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelected(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                variant="default"
                className="group overflow-hidden cursor-pointer p-0 hover:scale-[1.02] transition-all duration-300"
                onClick={() => setPreviewIndex(index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500">{item.date}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Preview Modal */}
        <AnimatePresence>
          {previewIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-6"
              onClick={() => setPreviewIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setPreviewIndex(null)}
                  className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navigation Buttons */}
                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={prevPreview}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextPreview}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Preview */}
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl">
                  <img
                    src={filtered[previewIndex].imageUrl}
                    alt={filtered[previewIndex].title}
                    className="w-full h-[70vh] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {filtered[previewIndex].title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span>{filtered[previewIndex].category}</span>
                      <span>•</span>
                      <span>{filtered[previewIndex].date}</span>
                    </div>
                  </div>
                </div>

                {/* Dots Indicator */}
                {filtered.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {filtered.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setPreviewIndex(index)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          index === previewIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
