# SPECS — Alur pengguna dan penanganan error

Diagram vertikal tiap alur: https://unipath-visualisasi.netlify.app (tab 1 dan 2).

## 1. Daftar layar

| No | Layar | Akses |
|---|---|---|
| 01 | Landing | Publik |
| 02 | Daftar dan login | Publik |
| 03 | Persetujuan data (F7) | Siswa |
| 04 | Check-in awal dan sesudah (F6) | Siswa |
| 05 | Isi profil berlabel jalur | Siswa |
| 06 | Pilih target prodi | Siswa |
| 07 | Hasil zona, tab SNBP / SNBT / Mandiri | Siswa |
| 07b | Pilih skema Mandiri per PTN | Siswa |
| 08 | Portofolio pilihan dan validator | Siswa |
| 09 | Roadmap per jalur (statis) | Siswa |
| 10 | Bandingkan 3 prodi | Siswa |
| 11 | Rencana B | Siswa |
| 12 | Dashboard siswa | Siswa |
| 13 | Pengaturan akun dan hapus akun | Siswa |
| 14 | Dashboard admin (agregat) | Admin |
| 15 | Data publik 133 prodi | Publik |
| 16 | Simulasi strategi jalur (F3) | Siswa |
| 17 | Halaman orang tua, hanya-baca (F6) | Pemegang tautan |
| 18 | Drawer Bot Konsul AI | Siswa |

## 2. Alur siswa

1. **01 Landing.** Isi: judul, kalimat "alat bantu strategi berbasis data resmi SNPMB 2026, bukan penentu kelulusan", cara kerja 3 langkah, angka kunci dengan sumber, tombol "Mulai cek strategi" dan "Lihat data 133 prodi" (ke 15 tanpa login).
2. **02 Daftar/login.** Email dan kata sandi.
3. **03 Persetujuan.** Menjelaskan data yang disimpan, kegunaannya, data yang tidak dikirim ke AI, dan hak hapus akun. Setuju: lanjut. Tidak setuju: profil tidak disimpan, siswa tetap bisa membuka 01 dan 15.
4. **04 Check-in awal.** 3 pertanyaan skala 1–5: kejelasan arah, tekanan lingkungan, kesiapan memutuskan. Label: "bukan alat diagnosis".
5. **05 Profil.** Enam bagian. Tiap isian berlabel jalur yang memakainya.

   | Bagian | Isian | Dipakai di |
   |---|---|---|
   | A. Sekolah | jenis sekolah, provinsi, akreditasi + e-Rapor, status eligible, tahun lulus | SNBP, SNBT |
   | B. Rapor | rata semester 1–5, nilai maks. 2 mapel pendukung | SNBP |
   | C. TKA | 3 mapel wajib, 2 mapel pilihan, asli atau estimasi | SNBP, Mandiri TKA UNUD |
   | D. UTBK | 7 subtes, resmi atau tryout | SNBT, Mandiri UTBK |
   | E. Prestasi | maks. 3 prestasi, kesiapan portofolio | SNBP, prodi seni/olahraga |
   | F. Minat (opsional) | rumpun minat, PTN yang diutamakan | Saran Rencana B |

6. **06 Target prodi.** Cari dan filter 133 prodi (PTN, jenjang, rumpun).
7. **Server** menjalankan mesin zona (`docs/ARCHITECTURE.md` bagian 4).
8. **07 Hasil.** Zona per jalur dan per prodi, keketatan, cek mapel TKA, peringatan lockout, label "perkiraan". Dari sini siswa bisa ke 18 (Bot Konsul), 11 (Rencana B), 10 (Bandingkan), atau 07b (skema Mandiri).
9. **08 Portofolio.** Validator aturan pilihan.
10. **16 Simulasi F3.** Skenario SNBP → SNBT → Mandiri dan akibat lolos atau tidak lolos.
11. **12 Dashboard.** Check-in sesudah dan pintasan ke 09, 10, 11, 13, 16, 17.

## 3. Alur admin

1. Login di `/admin`. Sesi harus ber-role `admin`.
2. **14 Dashboard agregat:**
   - Delta check-in sebelum vs sesudah.
   - Pemakaian AI: panggilan, kuota, latensi, fallback.
   - Trafik: pengguna, simulasi per jalur, pemakaian F3 dan F6, galat.
3. Kelola data publik: prodi, aturan jalur dan mapel TKA, roadmap dan tautan Mandiri.
4. Admin tidak punya endpoint untuk melihat data satu siswa.

## 4. Penanganan error dan keadaan khusus

| Keadaan | Layar | Perilaku |
|---|---|---|
| Siswa menolak persetujuan data | 03 | Akun tidak menyimpan profil. Siswa tetap bisa membuka 01 dan 15. |
| Isian di luar rentang (rapor > 100, TKA di luar 200–800) | 05 | Validasi Zod di klien dan server. Pesan galat di bawah isian, kalimat biasa, tanpa kode galat. |
| Prodi tanpa riwayat peminat (prodi baru 2026) | 06, 07 | Zona "Data terbatas", tampil kursi 2026, tanpa angka keketatan palsu, tautan ke web resmi PTN. |
| Siswa tidak eligible SNBP | 07, 16 | Tab SNBP ditandai tertutup dengan alasannya, siswa diarahkan ke SNBT. |
| Nilai dari estimasi atau tryout | 05, 07, 17 | Badge "Memakai skor estimasi/tryout" di semua kartu hasil. |
| Kedokteran, Keperawatan, Kebidanan Undiksha di Mandiri | 07b | Skema selain SMBJM CBT dinonaktifkan, banner "Wajib tes SMBJM CBT". |
| Pilihan melanggar aturan SNBP/SNBT | 08 | Peringatan dengan cara memperbaikinya. Pilihan tidak dihapus otomatis. |
| Skenario lolos SNBP | 16 | Kartu SNBT dan Mandiri diberi badge "Jalur tertutup". |
| Kuota AI habis (HTTP 429) atau respons > 6 detik | 07, 18 | Tanpa pesan galat merah. Badge "Mode panduan cepat", jawaban dari template. |
| Batas 10 pesan per sesi tercapai | 18 | Jawaban dari template dengan pesan sopan. |
| Skor tekanan check-in ≥ 4 | 04, 12, 18 | Kartu tenang: saran bicara dengan guru BK atau orang terpercaya, pintasan tautan orang tua. Tanpa istilah diagnosis. |
| Tautan orang tua dicabut atau kedaluwarsa | 17 | "Tautan ringkasan ini sudah tidak aktif atas permintaan pemilik akun." |
| Sesi habis | Semua layar siswa | Arahkan ke 02, lalu kembali ke layar semula setelah login. |
| Galat server atau database | Semua | Halaman galat ramah dengan tombol coba lagi. Detail galat hanya di log server. |
| Hapus akun | 13 | Dialog konfirmasi "ketik HAPUS". Semua data privat dan tautan orang tua dihapus. |
