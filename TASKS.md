# TASKS.md — Checklist pengerjaan

Centang butir saat selesai, lalu tulis perubahan penting di `CHANGELOG.md`. Format: `- [ ] Tugas (pemilik, target)`.

## 0. Fondasi

- [x] Setup Next.js, JavaScript, Tailwind (Krisna)
- [x] Pasang shadcn/ui: komponen tombol dan kartu (Krisna)
- [x] Uji grafik Recharts dengan data dummy (Krisna)
- [x] Struktur dokumen proyek: `AGENTS.md`, `TASKS.md`, `CHANGELOG.md`, `docs/` (Satria, 25 Nov)
- [ ] Tanya panitia: apakah library komponen (shadcn/ui) termasuk "template" yang dilarang (Semua)
- [ ] Perbaiki `README.md` (saat ini UTF-16 dan hanya judul) (Satria)
- [ ] `src/app/layout.js`: judul "UniPath", `lang="id"` (Krisna)
- [ ] `StressTrendChart.jsx`: perbaiki `text-slade-800` menjadi `text-slate-800`; nama zona ikut token (Aman, Realistis, Menantang, Data terbatas) (Krisna)

## 1. Desain (Dika, 27 Nov)

- [x] Wireframe 18 layar ukuran mobile, tablet, desktop di Figma
- [x] Prototipe yang bisa diklik (alur siswa, admin, orang tua)
- [ ] Desain visual final dengan logo UniPath dan token warna

## 2. Backend (Satria, 5 Des)

- [ ] Koneksi MongoDB Atlas dengan Mongoose (`src/lib/db.js`)
- [ ] Model 10 koleksi sesuai `docs/DATABASE.md`
- [ ] Impor `data_prodi.csv` (133 prodi) dan `roadmap_langkah.csv` (71 baris)
- [ ] Daftar, login, logout: bcrypt, cookie httpOnly, validasi Zod
- [ ] Rate limit di login dan `/api/ai/konsul`
- [ ] Middleware peran: siswa, admin
- [ ] `GET /api/prodi`, `GET/PUT /api/profile`, `POST/GET /api/checkin`
- [ ] `DELETE /api/account` (hapus seluruh data privat)
- [ ] `POST/DELETE/GET /api/share-parent` (tautan orang tua F6)
- [ ] `GET /api/admin/aggregates`, `POST/PUT /api/admin/public-data`

## 3. Mesin zona (data dan backend, 8 Des)

- [ ] Modul `src/lib/zona/` terpisah dari tampilan
- [ ] Pita rapor, pita UTBK, keketatan, matriks zona, data terbatas
- [ ] Cek mapel TKA (cocok 2/2, 1/2, 0/2) dan saran konsistensi rapor × TKA
- [ ] Validator pilihan SNBP (2, minimal 1 seprovinsi) dan SNBT (matriks vokasi/D3)
- [ ] Skenario lockout F3
- [ ] Saran Rencana B serumpun
- [ ] Tes otomatis semua kasus di `docs/TEST_PLAN.md` bagian A
- [ ] `POST /api/zone/calculate`

## 4. Halaman (Krisna dan Satria, 8 Des)

- [ ] Publik: 01 Landing, 02 Daftar/login, 15 Data publik prodi
- [ ] Onboarding: 03 Persetujuan, 04 Check-in, 05 Profil, 06 Target prodi
- [ ] Hasil: 07 Hasil zona, 07b Skema Mandiri, 08 Portofolio, 16 Simulasi F3
- [ ] Lanjutan: 09 Roadmap, 10 Bandingkan, 11 Rencana B, 12 Dashboard, 13 Pengaturan
- [ ] 17 Halaman orang tua (hanya-baca)
- [ ] 14 Dashboard admin
- [ ] 18 Drawer Bot Konsul AI dan fallback template

## 5. Rilis (9–17 Des)

- [ ] Bekukan fitur (Semua, 9 Des)
- [ ] Jalankan `docs/TEST_PLAN.md` penuh, catat hasilnya (Dika)
- [ ] Docker Compose, `next build` dan `next start`, HTTPS lewat Nginx Proxy Manager (Satria)
- [ ] Akun demo dengan data contoh (Satria)
- [ ] Video demo (Dika, 9–14 Des)
- [ ] Cek tautan publik dari perangkat lain, kumpulkan karya (Semua, sebelum 17 Des)
