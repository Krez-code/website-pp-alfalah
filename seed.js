import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  const santriRole = await prisma.role.upsert({
    where: { name: 'santri' },
    update: {},
    create: { name: 'santri' },
  });

  const waliRole = await prisma.role.upsert({
    where: { name: 'wali_santri' },
    update: {},
    create: { name: 'wali_santri' },
  });

  const password = await bcrypt.hash('Admin123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@al-falah.id' },
    update: {},
    create: {
      fullName: 'Admin Pesantren',
      email: 'admin@al-falah.id',
      password,
      phone: '081234567890',
      roleId: adminRole.id,
    },
  });

  const wali1 = await prisma.waliSantri.create({
    data: {
      fullName: 'Bapak Ahmad',
      phone: '081298765432',
      job: 'Pedagang',
      address: 'Desa Sukamakmur',
    },
  });

  const santri1 = await prisma.santri.create({
    data: {
      fullName: 'Ahmad Zaki',
      nik: '3201012001010001',
      nisn: '1234567890',
      birthPlace: 'Bandung',
      birthDate: new Date('2008-01-01'),
      gender: 'Laki-laki',
      address: 'Jalan Merdeka No. 1',
      photoUrl: '/placeholder-santri.jpg',
      waliSantriId: wali1.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'zaki@santri.id' },
    update: {},
    create: {
      fullName: 'Ahmad Zaki',
      email: 'zaki@santri.id',
      password: await bcrypt.hash('Zaki1234!', 10),
      roleId: santriRole.id,
      santriId: santri1.id,
    },
  });

  const wali2 = await prisma.waliSantri.create({
    data: {
      fullName: 'Ibu Siti',
      phone: '081212345678',
      job: 'Ibu Rumah Tangga',
      address: 'Desa Mekarsari',
    },
  });

  await prisma.user.upsert({
    where: { email: 'wali@santri.id' },
    update: {},
    create: {
      fullName: 'Ibu Siti',
      email: 'wali@santri.id',
      password: await bcrypt.hash('Wali1234!', 10),
      roleId: waliRole.id,
      waliSantriId: wali2.id,
    },
  });

  const agendaItems = [
    { title: 'Kajian Santri', description: 'Pengajian pagi bersama seluruh santri', type: 'Pengajian', date: new Date(), startTime: '08:00', endTime: '10:00', location: 'Masjid Putih' },
    { title: 'Ujian Akhir Semester', description: 'Ujian akhir untuk semua kelas', type: 'Ujian', date: new Date(new Date().setDate(new Date().getDate() + 7)), startTime: '07:30', endTime: '12:00', location: 'Ruang Aula' },
  ];

  await prisma.agenda.createMany({ data: agendaItems });

  await prisma.gallery.createMany({
    data: [
      { category: "Hafalan Qur'an", title: 'Hafalan Santri', imageUrl: '/gallery/hafalan-1.jpg' },
      { category: 'Kegiatan Belajar', title: 'Kelas Bahasa Arab', imageUrl: '/gallery/kegiatan-1.jpg' },
      { category: 'Wisuda', title: 'Wisuda Tahfidz', imageUrl: '/gallery/wisuda-1.jpg' },
    ],
  });

  await prisma.setting.createMany({ data: [
    { key: 'schoolName', value: 'Pesantren Modern Al-Falah' },
    { key: 'heroSubtitle', value: 'Pendidikan islam terintegrasi untuk generasi qurani berakhlak mulia.' },
  ] });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });