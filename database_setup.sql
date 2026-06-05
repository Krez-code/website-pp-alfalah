-- Setup Database MySQL untuk Pesantren Al-Falah
-- Jalankan perintah berikut di MySQL

CREATE DATABASE IF NOT EXISTS pesantren;
USE pesantren;

-- Buat user baru (opsional, jika ingin user khusus)
-- CREATE USER 'pesantren_user'@'localhost' IDENTIFIED BY 'password_anda';
-- GRANT ALL PRIVILEGES ON pesantren.* TO 'pesantren_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Setelah database dibuat, jalankan:
-- npx prisma migrate dev --name init
-- node prisma/seed-mysql.js