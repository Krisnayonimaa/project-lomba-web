# ARCHITECTURE — Struktur kode dan kontrak API

## 1. Stack

| Bagian | Pilihan |
|---|---|
| Aplikasi | Next.js 16.4.6 (App Router), React 19.3.0, JavaScript |
| Tampilan | Tailwind CSS 4.3.3, shadcn/ui (tombol, kartu), ikon lucide-react, grafik Recharts 3.11.0 |
| API | Route handler Next.js di `src/app/api/*` |
| Database | MongoDB Atlas (M0) dengan Mongoose |
| Validasi | Zod (klien dan server) |
| Auth | bcrypt, sesi lewat cookie httpOnly |
| AI | Model AI free tier, dipanggil hanya dari server, dengan fallback template |
| Penerapan | VPS, Docker Compose, Nginx Proxy Manager (HTTPS) |

Satu repo, satu proyek Next.js, satu container aplikasi. Alasannya: tim kecil dan waktu 4 minggu.

## 2. Struktur folder

```
src/
├── app/
│   ├── (publik)/            # 01 landing, 02 masuk, 15 data prodi
│   ├── (siswa)/             # 03–13, 16, 18 (wajib login siswa)
│   ├── ortu/[token]/        # 17 halaman orang tua, hanya-baca
│   ├── admin/               # 14 dashboard admin (wajib role admin)
│   ├── api/                 # route handler, lihat bagian 3
│   ├── layout.js
│   └── globals.css
├── components/
│   ├── ui/                  # komponen dasar (button, card, ...)
│   └── ...                  # komponen fitur (KartuZona, StressTrendChart, ...)
└── lib/
    ├── db.js                # koneksi Mongoose (satu koneksi dipakai ulang)
    ├── auth.js              # sesi, cek peran
    ├── models/              # skema Mongoose, lihat docs/DATABASE.md
    ├── validasi/            # skema Zod
    ├── zona/                # mesin zona, tanpa import dari components/ atau app/
    ├── ai/                  # filter PII, penyusun konteks, fallback template
    └── utils.js
```

Saat ini repo baru berisi `src/app/{layout.js,page.js,globals.css}`, `src/components/StressTrendChart.jsx`, `src/components/ui/{button,card}.jsx`, dan `src/lib/utils.js`. Folder lain dibuat saat fiturnya dikerjakan.

## 3. Kontrak API

Semua input divalidasi Zod. Respons galat berbentuk `{ "error": "pesan untuk manusia" }` dengan status HTTP yang sesuai (400, 401, 403, 404, 429, 500).

| Endpoint | Metode | Akses | Fungsi |
|---|---|---|---|
| `/api/auth/daftar`, `/api/auth/masuk`, `/api/auth/keluar` | `POST` | Publik | Daftar, login, logout. Rate limit di masuk. |
| `/api/prodi` | `GET` | Publik | 133 prodi, keketatan, riwayat 2021–2025. Di-cache. |
| `/api/profile` | `GET`, `PUT` | Pemilik | Profil berlabel jalur (layar 05) |
| `/api/zone/calculate` | `POST` | Pemilik | Mesin zona: zona tiap jalur, cek mapel TKA, validator pilihan, skenario F3 |
| `/api/ai/konsul` | `POST` | Pemilik, rate limit | Filter PII, konteks dari mesin zona, panggil AI, fallback template |
| `/api/checkin` | `POST`, `GET` | Pemilik | Check-in 3 pertanyaan, tahap sebelum/sesudah |
| `/api/share-parent` | `POST`, `DELETE` | Pemilik | Buat atau cabut tautan orang tua |
| `/api/share-parent/[token]` | `GET` | Pemegang token | Ringkasan hanya-baca (layar 17) |
| `/api/account` | `DELETE` | Pemilik | Hapus akun dan semua data privat |
| `/api/admin/aggregates` | `GET` | Admin | Angka agregat saja |
| `/api/admin/public-data` | `POST`, `PUT` | Admin | Kelola prodi, aturan jalur, mapel TKA, roadmap |

## 4. Mesin zona (`src/lib/zona/`)

Fungsi murni tanpa AI dan tanpa akses jaringan. Aturan dan ambang dibaca dari koleksi `aturan_jalur`, jadi admin bisa mengubahnya tanpa ubah kode.

Urutan proses:
1. **Validasi input.** Isian estimasi ditandai `is_estimasi`.
2. **Gerbang syarat.**
   - Tidak eligible: SNBP ditutup.
   - Bukan lulusan 2024–2026: SNBT ditutup.
   - Lolos SNBP: SNBT dan Mandiri ditutup.
3. **Pita siswa.**

   | Ukuran | Kuat | Sedang | Kurang |
   |---|---|---|---|
   | Rata rapor sem 1–5 (SNBP) | ≥ 90 | 85–89,9 | < 85 |
   | Rata 7 subtes UTBK (SNBT) | ≥ 650 | 550–649 | < 550 |

4. **Keketatan prodi.** `daya_tampung_2026 / peminat_2025 × 100`.
   - ≤ 5: ketat.
   - 5–30: moderat.
   - ≥ 30: longgar.
   - Tanpa peminat: data terbatas.
5. **Matriks zona.**

   | Keketatan | Kuat | Sedang | Kurang |
   |---|---|---|---|
   | Longgar | Aman | Aman | Realistis |
   | Moderat | Aman | Realistis | Menantang |
   | Ketat | Realistis | Menantang | Menantang |

6. **Catatan pendamping.** Catatan tidak mengubah zona:
   - Kecocokan mapel TKA: 2/2, 1/2, 0/2.
   - Saran konsistensi rapor × TKA.
   - Label estimasi.
   - Pengingat portofolio.
7. **Saran.**
   - Urutkan prodi dari zona paling longgar.
   - Rencana B: prodi serumpun di 3 PTN dengan zona lebih longgar.
   - Jalankan validator pilihan.
   - Susun skenario F3.

Mandiri tidak diberi zona. Hasilnya: skema yang cocok dengan data siswa dan tautan resmi PTN.

Contoh acuan tes: S1 Teknologi Informasi UNUD.
- SNBP: 40 ÷ 476 = 8,40%, moderat. Rapor 89,5 masuk pita sedang, jadi zona **Realistis**.
- SNBT: 99 ÷ 599 = 16,53%, moderat. UTBK 625 masuk pita sedang, jadi zona **Realistis** (estimasi).

## 5. Alur Bot Konsul AI

1. Browser mengirim pertanyaan ke `POST /api/ai/konsul`.
2. Cek sesi dan rate limit: maks. 10 pesan per sesi.
3. Filter PII: buang `nama_siswa`, `email`, `nisn`, `nama_sekolah`, `alamat`, `ip_address`.
4. Penyusun konteks: zona, keketatan, daya tampung, kategori pita, status mapel TKA, aturan lockout, juknis Mandiri. Instruksi sistem: jawab hanya dari konteks, nada tenang, tanpa kata diagnosis.
5. Panggil model AI dengan timeout 6 detik. Gagal (429, timeout): jawab dari template.
6. Catat jumlah panggilan, fallback, dan latensi ke `ai_usage_aggregates`. Isi chat tidak disimpan.
7. Tampilkan jawaban dengan sumber dan label "perkiraan".
