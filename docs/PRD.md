# PRD — Tujuan produk dan batasan fitur

## Masalah

Siswa kelas XII bingung dan cemas memilih jalur masuk PTN (SNBP, SNBT, Mandiri) dan prodi. Aturan tiap jalur berbeda, kuotanya berbeda, dan lulus SNBP menutup jalur lain (*lockout*). Nilai minimal lulus tidak diumumkan, jadi siswa sering menebak.

## Tujuan

1. Siswa bisa melihat posisi kesiapannya dibanding tingkat persaingan tiap prodi target, per jalur.
2. Siswa bisa menyusun pilihan yang sah menurut aturan dan punya Rencana B.
3. Kebingungan siswa turun. Diukur dengan check-in sebelum dan sesudah memakai aplikasi (Sub-Tema 3: digital wellbeing).

## Pengguna

| Pengguna | Kebutuhan | Perangkat |
|---|---|---|
| Siswa kelas XII SMA/SMK di Bali (17–18 tahun) | Memilih jalur dan prodi dengan tenang | HP (mobile-first, 390 px) |
| Orang tua / wali | Membaca rencana anak tanpa akun | HP, lewat tautan hanya-baca |
| Admin tim | Memperbarui data publik, memantau angka agregat | Desktop |

## Cakupan

- **PTN:** UNUD (54 prodi), Undiksha (52), PNB (27). Total 133 prodi dari API resmi SNPMB 2026.
- **Jalur:** SNBP dan SNBT (dengan zona), Mandiri (skema dan tautan resmi, tanpa zona).
- **Aturan seleksi:** referensi 2026. Aturan 2027 belum terbit, jadi semua aturan disimpan sebagai data yang bisa diubah admin.

## Fitur

| Kode | Fitur | Status |
|---|---|---|
| Inti | Profil berlabel jalur, hasil zona 3 tab, portofolio pilihan dan validator, roadmap statis, bandingkan prodi, Rencana B, data publik 133 prodi | Wajib |
| F3 | Simulasi strategi jalur: 3 skenario berdampingan dan efek lockout | Wajib (P0) |
| F6 | Check-in kebingungan (sebelum dan sesudah) dan halaman orang tua hanya-baca | Wajib (P0, versi minimal) |
| F7 | Privasi by design: data privat terpisah, AI anonim, hapus akun | Wajib, dasar semua fitur |
| AI | Penjelasan zona dan Bot Konsul (model AI free tier) dengan fallback template | Wajib |
| Admin | Dashboard agregat dan kelola data publik | Wajib |
| F1, F2, F5, F8 | Checklist berkas, kalender tenggat, biaya/KIP-K, prospek lulusan | Ditunda |

## Di luar cakupan

- Persentase peluang lulus atau passing grade. Datanya tidak diumumkan, jadi UniPath tidak boleh mengklaimnya.
- Pengingat otomatis (email, notifikasi).
- PTN di luar tiga PTN di atas.
- Diagnosis psikologis dalam bentuk apa pun.

## Kriteria berhasil (untuk penilaian)

- Tautan publik hidup, HTTPS, tanpa bug atau error fatal saat juri menilai.
- Halaman publik cepat dimuat; layar siswa nyaman di HP.
- Tiap angka punya sumber dan tahun.
- Delta check-in agregat tampil di dashboard admin.
- Kode sumber bisa ditunjukkan dan dijelaskan tiap anggota.

## Tanggal

| Tanggal | Agenda |
|---|---|
| 27 Nov 2026 | Desain layar selesai |
| 5 Des 2026 | Database, login, kerangka API |
| 8 Des 2026 | Halaman siswa, dashboard, mesin zona dan tes |
| 9 Des 2026 | Bekukan fitur |
| 18 Des 2026, 23.59 WIB | Batas pengumpulan karya |
