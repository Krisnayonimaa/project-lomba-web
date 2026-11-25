# AGENTS.md — Aturan main UniPath

Berkas ini dibaca pertama oleh manusia dan AI sebelum mengubah kode. Isinya konteks global dan aturan kerja. Rincian ada di folder `docs/`.

## Konteks proyek

- **Produk:** UniPath (*Universitas Path*), web app pemandu jalur masuk PTN (SNBP, SNBT, Mandiri) dan prodi di UNUD, Undiksha, dan PNB untuk siswa kelas XII di Bali.
- **Lomba:** TECHCOMFEST 2027, Web Application Competition, Sub-Tema 3: *Smart Lifestyle & Digital Wellbeing*.
- **Tim:** Krisna (frontend), Satria (backend dan frontend), Dika (UI/UX dan pengujian).
- **Batas pengumpulan karya:** 18 Desember 2026, 23.59 WIB. Bekukan fitur 9 Desember 2026.
- **Demo VPS:** `http://157.20.96.193:3000/`.

## Peta dokumen

| Berkas | Isi | Tahap |
|---|---|---|
| `TASKS.md` | Checklist pengerjaan aktif | Semua |
| `CHANGELOG.md` | Riwayat perubahan dan perbaikan bug | Semua |
| `docs/PRD.md` | Tujuan produk dan batasan fitur | Perencanaan |
| `docs/SPECS.md` | Alur siswa, alur admin, penanganan error | Analisis |
| `docs/ARCHITECTURE.md` | Struktur kode, kontrak API, mesin zona | Desain |
| `docs/DATABASE.md` | Skema koleksi dan aturan keamanan | Desain |
| `docs/TEST_PLAN.md` | Skenario pengujian wajib | Pengujian |
| `docs/DEPLOY.md` | Panduan rilis dan environment | Penerapan |

Sumber riset dan desain (di luar repo): folder kerja tim `data-techcomfest27` (`system_Design.md`, `flowchart(new).md`, `tech-stack.md`, `fitur-baru.md`, `data/data_prodi.csv`, `data/roadmap_langkah.csv`). Visualisasi alur: https://unipath-visualisasi.netlify.app

## Aturan kerja

1. **Bahasa.** Teks antarmuka, dokumen, dan pesan commit memakai Bahasa Indonesia. Nama variabel dan fungsi boleh bahasa Inggris atau Indonesia, asal konsisten dalam satu berkas.
2. **Branch.** Tiap orang bekerja di branch sendiri (`krisna`, `satria`, `dika`). Jangan push langsung ke `main`. Gabungkan ke `main` lewat pull request yang dibaca minimal satu anggota lain.
3. **Selesai satu langkah:** centang butirnya di `TASKS.md`. Ada perubahan perilaku atau perbaikan bug: tambah satu baris di `CHANGELOG.md`.
4. **Bahasa pemrograman.** JavaScript (bukan TypeScript), Next.js App Router, Tailwind CSS. Jangan menambah dependensi tanpa alasan yang ditulis di PR.
5. **Tanpa template.** Rulebook melarang template halaman, template dashboard, dan website builder. Logo, ikon, dan font disediakan sendiri dengan lisensi yang jelas.
6. **Mesin zona deterministik.** Zona dihitung dengan aturan tetap di server (`docs/ARCHITECTURE.md`). AI tidak boleh menghitung zona atau mengarang angka. AI hanya menjelaskan hasil.
7. **Privasi (F7).**
   - Data privat (biodata, nilai, check-in) hanya bisa dibaca pemilik akun.
   - Admin hanya menerima angka agregat.
   - Nama, email, NISN, nama sekolah, alamat, dan IP tidak pernah dikirim ke layanan AI.
8. **Jujur soal data.** Tiap angka tampil dengan sumber dan tahun. Zona selalu diberi label "perkiraan". Data yang tidak ada ditandai "data terbatas", tidak ditebak.
9. **Bahasa yang menenangkan.** Tidak ada kata diagnosis, gangguan, atau klaim klinis. Zona menantang tidak boleh terasa seperti vonis gagal.
10. **Rahasia.** Jangan commit `.env`, kunci API, atau string koneksi MongoDB. Simpan di environment server (`docs/DEPLOY.md`).
11. **Kode yang dibantu AI.** Penulis commit harus memahami dan bisa menjelaskan kode itu ke juri.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
