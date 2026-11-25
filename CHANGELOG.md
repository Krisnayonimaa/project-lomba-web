# CHANGELOG.md — Riwayat perubahan

Format: tanggal, branch, lalu ringkasan. Baru di atas. Kategori: **Tambah**, **Ubah**, **Perbaiki**, **Hapus**.

## 2026-11-25 · satria

- **Tambah:** struktur dokumen proyek: `TASKS.md`, `CHANGELOG.md`, dan `docs/` (`PRD.md`, `SPECS.md`, `ARCHITECTURE.md`, `DATABASE.md`, `TEST_PLAN.md`, `DEPLOY.md`).
- **Ubah:** `AGENTS.md` kini memuat konteks UniPath, peta dokumen, dan aturan kerja. Blok aturan Next.js tetap ada.

## Sebelum 2026-11-25 · krisna → main

- **Tambah:** setup shadcn/ui dengan komponen tombol dan kartu.
- **Tambah:** komponen uji grafik `StressTrendChart.jsx` dengan data dummy (Recharts).
- **Tambah:** setup awal Next.js 16 dengan JavaScript dan Tailwind 4.

## Bug yang diketahui, belum diperbaiki

- `src/components/StressTrendChart.jsx`: kelas `text-slade-800` salah ketik (seharusnya `text-slate-800`).
- `src/app/layout.js`: judul masih "Create Next App" dan `lang="en"`.
- `README.md` berenkode UTF-16 dan hanya berisi judul.
- Demo VPS berjalan dengan `next dev`, bukan build produksi.
