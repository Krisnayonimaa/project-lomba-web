# TEST_PLAN — Skenario pengujian wajib

Bagian A dijalankan sebagai tes otomatis. Bagian B–F diuji manual sebelum bekukan fitur (9 Des) dan sebelum pengumpulan. Catat hasil (lulus/gagal, tanggal, penguji) di tabel bagian G.

## A. Mesin zona (tes otomatis, `src/lib/zona/`)

| ID | Masukan | Hasil yang diharapkan |
|---|---|---|
| Z1 | Keketatan 35%, rapor 92 | Aman |
| Z2 | Keketatan 35%, rapor 80 | Realistis |
| Z3 | Keketatan 8,40%, rapor 89,5 (S1 TI UNUD, SNBP) | Realistis |
| Z4 | Keketatan 8,40%, rapor 84,9 | Menantang |
| Z5 | Keketatan 4%, rapor 95 | Realistis |
| Z6 | Keketatan 4%, rapor 87 | Menantang |
| Z7 | Keketatan 16,53%, UTBK 625 tryout (S1 TI UNUD, SNBT) | Realistis + label estimasi |
| Z8 | Prodi tanpa peminat 2025 | Data terbatas, tanpa angka keketatan |
| Z9 | Batas pita tepat: rapor 90 → kuat, 85 → sedang, 84,99 → kurang; UTBK 650 → kuat, 550 → sedang | Sesuai ambang |
| Z10 | Batas keketatan tepat: 5% dan 30% | 5% ketat, 30% longgar |
| Z11 | Status tidak eligible | SNBP tertutup, zona SNBP tidak dihitung |
| Z12 | Mapel pilihan TKA 2 dari 2 cocok / 1 / 0 | Catatan 2/2, 1/2, 0/2; zona tidak berubah |
| Z13 | Jalur Mandiri | Tidak ada zona; daftar skema dan tautan resmi |

## B. Validator pilihan dan F3

| ID | Skenario | Hasil |
|---|---|---|
| V1 | SNBP 3 prodi | Ditolak, maks. 2 |
| V2 | SNBP 2 prodi, keduanya di luar provinsi sekolah | Peringatan: minimal 1 di PTN seprovinsi |
| V3 | SNBT 3 prodi vokasi tanpa D3 | Peringatan: minimal 1 D3 |
| V4 | SNBT 4 prodi: 2 akademik + 2 vokasi dengan 1 D3 | Sah |
| V5 | Simulasi: lolos SNBP | SNBT dan Mandiri ditandai tertutup |
| V6 | Undiksha Kedokteran di Mandiri | Hanya skema SMBJM CBT yang aktif |

## C. Auth dan privasi (F7)

| ID | Skenario | Hasil |
|---|---|---|
| P1 | Siswa A memanggil `/api/profile` dengan sesi siswa B | Hanya data B yang kembali (`user_id` dari sesi) |
| P2 | Tanpa login memanggil endpoint siswa | 401 |
| P3 | Siswa memanggil `/api/admin/*` | 403 |
| P4 | Respons `/api/admin/aggregates` | Hanya angka, tanpa nama, email, atau nilai per siswa |
| P5 | Payload ke AI (log server di mode uji) | Tidak memuat nama, email, NISN, sekolah, alamat, IP |
| P6 | Hapus akun lalu login lagi | Gagal; semua dokumen privat terhapus |
| P7 | Buka tautan orang tua yang dicabut | Pesan "sudah tidak aktif", tanpa data |
| P8 | Login salah berulang | Rate limit aktif (429) |
| P9 | Respons API mana pun | Tidak pernah berisi `password_hash` |

## D. AI dan fallback

| ID | Skenario | Hasil |
|---|---|---|
| A1 | Kunci API AI dikosongkan | Jawaban dari template, tanpa pesan galat merah |
| A2 | Respons AI lebih dari 6 detik | Fallback template |
| A3 | Pesan ke-11 dalam satu sesi | Jawaban template dengan pesan batas |
| A4 | Jawaban AI | Angka sama dengan hasil mesin zona; tanpa kata diagnosis |

## E. Tampilan dan alur

| ID | Skenario | Hasil |
|---|---|---|
| U1 | Alur penuh 01 → 12 di HP 390 px | Tanpa scroll horizontal, tombol mudah diketuk |
| U2 | Tablet 834 px dan desktop 1440 px | Tata letak rapi |
| U3 | Isian rapor 120 | Pesan galat jelas di bawah isian |
| U4 | Zona dibedakan | Ada ikon dan label, tidak hanya warna |
| U5 | Kontras teks | Minimal 4,5:1 |
| U6 | Tiap angka di layar hasil | Ada sumber dan tahun |

## F. Kinerja dan penerapan

| ID | Skenario | Hasil |
|---|---|---|
| K1 | Lighthouse landing di mode HP | Performance ≥ 80 |
| K2 | Situs produksi | `next build` + `next start`, bukan `next dev` |
| K3 | HTTPS | Sertifikat valid, HTTP dialihkan ke HTTPS |
| K4 | Buka dari perangkat dan jaringan lain | Berjalan |
| K5 | Akun demo | Bisa login dan menampilkan hasil contoh |

## G. Catatan hasil

| Tanggal | Penguji | ID | Hasil | Catatan |
|---|---|---|---|---|
| | | | | |
