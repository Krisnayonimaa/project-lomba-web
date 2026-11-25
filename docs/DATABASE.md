# DATABASE — Skema koleksi dan aturan keamanan

Database: MongoDB Atlas (paket M0) dengan Mongoose. Koleksi dibagi dua zona akses.

## 1. Daftar koleksi

| No | Koleksi | Zona | Baca | Tulis | Isi utama |
|---|---|---|---|---|---|
| 1 | `users` | Privat | Pemilik | Pemilik | `email`, `username`, `password_hash` (bcrypt), `role: student \| admin`, `consent_f7_at` |
| 2 | `profiles` | Privat | Pemilik saja (admin dilarang) | Pemilik | sekolah, rapor, TKA, UTBK, prestasi, minat |
| 3 | `portfolios` | Privat | Pemilik, token orang tua aktif | Pemilik | pilihan SNBP (maks. 2), SNBT (maks. 4), Mandiri; zona hasil hitung; hasil validasi |
| 4 | `checkins` | Privat | Pemilik (admin hanya `$avg`) | Pemilik | `tahap: SEBELUM \| SESUDAH`, 3 skor 1–5 |
| 5 | `share_links` | Privat terkontrol | Pemilik, pemegang token | Pemilik | `token_acak` (32 karakter hex), `bagian_dibagikan`, `is_revoked`, `kedaluwarsa_at` |
| 6 | `prodi` | Publik | Semua | Admin | 133 prodi, daya tampung 2026, peminat 2025, keketatan, riwayat 2021–2025, skema Mandiri, tautan PTN |
| 7 | `mapel_pendukung_tka` | Publik | Semua | Admin | Pemetaan prodi ke maks. 2 mapel pendukung (Kepmendikdasmen 102/M/2025) |
| 8 | `aturan_jalur` | Publik | Semua | Admin | Batas pilihan, aturan provinsi, matriks vokasi/D3, lockout, skema Mandiri, ambang pita, matriks zona |
| 9 | `roadmap_langkah` | Publik | Semua | Admin | 71 baris langkah dan berkas per jalur |
| 10 | `ai_usage_aggregates` | Agregat | Admin | Server | Hitungan harian tanpa data pribadi: panggilan AI, fallback, simulasi, delta check-in |

## 2. Skema `profiles` (ringkas)

```json
{
  "user_id": "ObjectId (unik, ref users)",
  "sekolah": {
    "provinsi_kode": "501",
    "jenis": "SMA | SMK_3_TAHUN | SMK_4_TAHUN | MA",
    "akreditasi": "A | B | C",
    "pakai_erapor": true,
    "status_eligible": "ELIGIBLE | TIDAK_ELIGIBLE | BELUM_TAHU",
    "tahun_lulus": 2026
  },
  "rapor_snbp": {
    "rata_sem_1_5": 89.5,
    "nilai_mapel_pendukung": [{ "nama_mapel": "Matematika Lanjut", "nilai_rata": 91 }],
    "prestasi": [{ "judul": "OSN", "tingkat": "PROVINSI" }],
    "siap_portofolio_seni_olahraga": false
  },
  "tka_kemendikdasmen": {
    "memiliki_nilai_tka": true,
    "is_estimasi": false,
    "mapel_wajib": { "bahasa_indonesia": 650, "matematika": 670, "bahasa_inggris": 640 },
    "mapel_pilihan": [{ "nama_mapel": "Fisika", "skor": 630 }]
  },
  "utbk_snbt": {
    "is_estimasi_tryout": true,
    "subtes_7": { "pu": 640, "ppu": 610, "pbm": 620, "pk": 650, "lbi": 630, "lbe": 600, "pm": 625 }
  },
  "minat": { "rumpun_minat": ["Teknik dan komputer"], "ptn_diutamakan": ["UNUD", "PNB"] },
  "updated_at": "ISODate"
}
```

Rentang yang divalidasi:
- Rapor 0–100.
- TKA 200–800.
- Skor UTBK per subtes sesuai skala IRT.
- Maks. 3 prestasi.
- Maks. 2 mapel pendukung.

## 3. Aturan keamanan

1. **Kepemilikan.** Setiap query koleksi privat wajib menyaring `user_id` dari sesi, bukan dari body request.
2. **Admin.**
   - Endpoint admin hanya memakai pipeline agregat (`$group`, `$count`, `$avg`) pada koleksi privat.
   - Admin tidak punya endpoint yang mengembalikan dokumen satu siswa.
3. **Kata sandi.** Simpan hanya `password_hash` (bcrypt). Jangan pernah mengembalikan `password_hash` di respons API.
4. **Sesi.** Cookie `httpOnly`, `secure` (di produksi), `sameSite=lax`.
5. **Token orang tua.**
   - Token acak 32 karakter hex, bisa dicabut, punya tanggal kedaluwarsa.
   - Halaman 17 hanya menampilkan bagian yang dibagikan.
6. **Hapus akun.** Hapus dokumen milik pengguna di `users`, `profiles`, `portfolios`, `checkins`, dan `share_links`.
7. **AI.** Data dari koleksi privat yang dikirim ke AI hanya kategori (pita, zona). Angka mentah dan identitas tidak dikirim.
8. **Indeks.**
   - Unik: `users.email`, `profiles.user_id`, `share_links.token_acak`.
   - Pencarian: `prodi.ptn` dan `prodi.nama_prodi`.
9. **Koneksi.** `MONGODB_URI` hanya di environment server. Akses jaringan Atlas dibatasi ke IP VPS.

## 4. Data awal

- `data_prodi.csv`: 133 baris, digabung dari 6 berkas JSON API resmi SNPMB 2026.
- `roadmap_langkah.csv`: 71 baris (SNBP 13, SNBT 15, Mandiri UNUD 22, Mandiri Undiksha 20, Mandiri PNB 1).

Kedua berkas ada di folder kerja tim `data-techcomfest27/data/`. Impor dengan skrip satu kali (`scripts/seed.js`, belum dibuat).
