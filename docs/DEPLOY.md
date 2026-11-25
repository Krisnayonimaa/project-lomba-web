# DEPLOY — Panduan rilis dan environment

## 1. Lingkungan

| Lingkungan | Alamat | Cara jalan |
|---|---|---|
| Lokal | `http://localhost:3000` | `npm run dev` |
| Demo VPS (sekarang) | `http://157.20.96.193:3000/` | Masih `next dev`, tanpa HTTPS |
| Produksi (target) | domain HTTPS lewat Nginx Proxy Manager | Docker Compose, `next build` + `next start` |

## 2. Variabel environment

Simpan di `.env.local` (lokal) atau `.env` di VPS. Jangan di-commit. Buat `.env.example` berisi nama variabel tanpa nilai.

| Variabel | Fungsi |
|---|---|
| `MONGODB_URI` | String koneksi MongoDB Atlas |
| `SESSION_SECRET` | Kunci tanda tangan sesi (acak, minimal 32 karakter) |
| `AI_API_KEY` | Kunci model AI free tier |
| `AI_MODEL` | Nama model yang dipakai |
| `AI_TIMEOUT_MS` | Batas waktu panggilan AI, `6000` |
| `NODE_ENV` | `production` di VPS |

## 3. Menjalankan lokal

```bash
git clone https://github.com/Krisnayonimaa/project-lomba-web.git
cd project-lomba-web
git checkout <branch-mu>
npm install
cp .env.example .env.local   # isi nilainya
npm run dev
```

## 4. Rilis ke VPS

1. Gabungkan ke `main` lewat pull request. Tes bagian A di `docs/TEST_PLAN.md` harus lulus.
2. Di VPS:
   ```bash
   cd ~/project-lomba-web
   git pull origin main
   docker compose up -d --build
   docker compose logs -f app   # pastikan "Ready", tanpa galat
   ```
3. Buka situs dari HP dan jaringan lain. Jalankan bagian F di `docs/TEST_PLAN.md`.
4. Tambah satu baris di `CHANGELOG.md`.

Rancangan `docker-compose.yml` (belum dibuat):

```yaml
services:
  app:
    build: .
    env_file: .env
    restart: unless-stopped
    expose: ["3000"]
  npm:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports: ["80:80", "443:443", "81:81"]
    volumes: ["./npm/data:/data", "./npm/letsencrypt:/etc/letsencrypt"]
```

`Dockerfile` memakai multi-stage: `npm ci`, lalu `npm run build`, lalu `npm start` dengan `NODE_ENV=production`. Di Nginx Proxy Manager, arahkan domain ke `app:3000` dan aktifkan sertifikat Let's Encrypt dengan "Force SSL".

## 5. Rollback

```bash
git log --oneline -5             # cari commit terakhir yang sehat
git checkout <commit>
docker compose up -d --build
```

Setelah situs pulih, perbaiki di branch, lalu rilis ulang lewat `main`.

## 6. Keamanan VPS

- Firewall: buka hanya port 22, 80, 443. Port 81 (panel Nginx Proxy Manager) hanya untuk IP tim atau lewat tunnel SSH.
- Login SSH dengan kunci, nonaktifkan login kata sandi root.
- Pembaruan sistem rutin.
- MongoDB Atlas: Network Access hanya untuk IP VPS.

## 7. Sebelum pengumpulan (sebelum 17 Des 2026)

- [ ] Situs berjalan dari build produksi, bukan `next dev`
- [ ] HTTPS aktif
- [ ] Akun demo siswa dan admin siap
- [ ] Tautan dicek dari perangkat lain
- [ ] Cadangan data Atlas aktif
- [ ] Alamat repo yang dikumpulkan sudah dipastikan satu
