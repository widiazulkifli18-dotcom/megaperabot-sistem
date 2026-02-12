# 🚀 PANDUAN SETUP LENGKAP - MEGA PERABOT
## Step-by-Step dari Awal Sampai Jalan

---

## 📋 PERSIAPAN AWAL

### Yang Anda Butuhkan:
- ✅ VSCode sudah terinstall
- ✅ Node.js sudah terinstall (cek: `node --version`)
- ✅ DB Browser for SQLite (opsional, untuk lihat data)

---

## 🗂️ STEP 1: DOWNLOAD PROJECT KE VSCODE

### 1.1 Download dari Figma Make

Di Figma Make, klik **Export to VSCode** atau **Download ZIP**

### 1.2 Ekstrak dan Buka di VSCode

```bash
# Ekstrak file ZIP
unzip mega-perabot.zip

# Buka di VSCode
cd mega-perabot
code .
```

Struktur folder yang benar:
```
mega-perabot/
├── backend/                 ← Folder backend
│   ├── server-sqlite.js     ← ✅ Ada
│   ├── package.json         ← ✅ Ada
│   ├── init-db.js           ← ✅ Ada
│   ├── database-sqlite.sql  ← ✅ BARU! Harus ada
│   └── README.md
├── src/                     ← Frontend React
│   ├── pages/
│   ├── components/
│   └── services/
├── package.json             ← Frontend package.json
└── vite.config.ts
```

---

## 🔧 STEP 2: SETUP BACKEND

### 2.1 Buka Terminal di VSCode

Klik menu: **Terminal** → **New Terminal** (atau tekan `Ctrl + ~`)

### 2.2 Masuk ke Folder Backend

```bash
cd backend
```

Terminal Anda sekarang harus menunjukkan:
```
.../mega-perabot/backend $
```

### 2.3 Install Dependencies Backend

```bash
npm install
```

**Tunggu sampai selesai!** Anda akan lihat:
```
added 50 packages, and audited 51 packages in 5s
```

### 2.4 Inisialisasi Database

```bash
npm run init-db
```

**Output yang benar:**
```
🗑️  Old database removed (kalau ada database lama)
✅ New database created: /path/to/backend/megaperabot.db
✅ Database initialized successfully!
📊 Users: 3
📦 Products: 5
🎉 Database ready to use!
💡 Run: npm start
```

**⚠️ Kalau ada ERROR:**

#### Error: "Cannot find module 'sqlite3'"
```bash
npm install sqlite3 --save
```

#### Error: "ENOENT: no such file or directory 'database-sqlite.sql'"
**Solusi:** Copy file `database-sqlite.sql` yang saya buat ke folder backend!

File `database-sqlite.sql` harus ada di folder `backend/`

### 2.5 Jalankan Backend Server

```bash
npm start
```

**Output yang benar:**
```
🚀 ====================================
🚀  MEGA PERABOT Backend API
🚀  Server: http://localhost:3001
🚀  Database: /path/to/backend/megaperabot.db
🚀 ====================================

✅ Connected to SQLite database
```

**✅ Backend JALAN!** Jangan tutup terminal ini!

---

## 🎨 STEP 3: SETUP FRONTEND

### 3.1 Buka Terminal BARU

Klik **+** di panel terminal untuk buka terminal baru

### 3.2 Pastikan di Root Project (bukan di folder backend)

```bash
# Kalau masih di backend, keluar dulu
cd ..

# Sekarang di root project
pwd
# Output: /path/to/mega-perabot
```

### 3.3 Install Dependencies Frontend

```bash
npm install
```

**Tunggu sampai selesai!** Ini akan install React, Vite, Tailwind, dll.

### 3.4 Jalankan Frontend

```bash
npm run dev
```

**Output yang benar:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**✅ Frontend JALAN!**

---

## 🔗 STEP 4: TEST KONEKSI

### 4.1 Test Backend API

Buka browser, akses:
```
http://localhost:3001/api/health
```

**Harus muncul:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-02-04T..."
}
```

### 4.2 Test Get Products

```
http://localhost:3001/api/products
```

**Harus muncul array data produk:**
```json
[
  {
    "kode_barang": "PK0018",
    "nama_barang": "KESET BIASA",
    "kategori": "Alat Kebersihan",
    "stok_akhir": 28,
    ...
  },
  ...
]
```

### 4.3 Test Frontend Login

Buka browser:
```
http://localhost:3000
```

**Login dengan:**
- Username: `megaperabot`
- Password: `admin123`

**Kalau berhasil masuk Dashboard → KONEKSI SUKSES!** 🎉

---

## 🗂️ STEP 5: VERIFIKASI DATABASE (OPSIONAL)

### Cara 1: Pakai DB Browser for SQLite

1. Buka **DB Browser for SQLite**
2. Klik **Open Database**
3. Pilih file: `backend/megaperabot.db`
4. Klik tab **Browse Data**
5. Pilih tabel: `users` atau `products`
6. Lihat datanya!

### Cara 2: Pakai SQLite CLI di Terminal

```bash
cd backend
sqlite3 megaperabot.db

# Di dalam SQLite prompt:
.tables                    # Lihat semua tabel
SELECT * FROM users;       # Lihat data users
SELECT * FROM products;    # Lihat data products
.exit                      # Keluar
```

---

## 📊 STRUKTUR LENGKAP SETELAH SETUP

```
mega-perabot/
├── backend/
│   ├── megaperabot.db          ← ✅ Database file (auto-generated)
│   ├── database-sqlite.sql     ← ✅ SQL schema
│   ├── server-sqlite.js        ← ✅ Backend API
│   ├── init-db.js              ← ✅ Database initializer
│   ├── package.json            ← ✅ Backend dependencies
│   ├── package-lock.json       ← ✅ Auto-generated
│   ├── node_modules/           ← ✅ Auto-generated
│   └── README.md
│
├── src/
│   ├── pages/
│   │   ├── Login.tsx           ← ✅ Halaman login
│   │   ├── Dashboard.tsx       ← ✅ Dashboard utama
│   │   ├── NewOrder.tsx        ← ✅ Form pesanan baru
│   │   ├── Restock.tsx         ← ✅ Form restock
│   │   └── ...
│   ├── components/
│   ├── services/
│   │   └── api.ts              ← ✅ API calls (USE_MOCK_DATA = false)
│   └── ...
│
├── package.json                ← ✅ Frontend dependencies
├── vite.config.ts              ← ✅ Vite config
└── node_modules/               ← ✅ Auto-generated
```

---

## ✅ CHECKLIST FINAL

Pastikan semua ini ✅:

### Backend:
- [ ] Folder `backend/` ada
- [ ] File `backend/package.json` ada
- [ ] File `backend/database-sqlite.sql` ada ← **PENTING!**
- [ ] File `backend/megaperabot.db` ada (auto-generated saat init-db)
- [ ] Terminal 1: `npm start` di folder backend → jalan di port 3001
- [ ] Test: `http://localhost:3001/api/health` → return JSON

### Frontend:
- [ ] File `src/services/api.ts` → `USE_MOCK_DATA = false`
- [ ] Terminal 2: `npm run dev` di root project → jalan di port 3000
- [ ] Test: `http://localhost:3000` → halaman login muncul
- [ ] Login berhasil dengan `megaperabot` / `admin123`

---

## 🚨 TROUBLESHOOTING LENGKAP

### ❌ Error: "npm: command not found"
**Penyebab:** Node.js belum terinstall

**Solusi:**
1. Download Node.js dari: https://nodejs.org/
2. Install versi LTS
3. Restart terminal
4. Cek: `node --version` dan `npm --version`

---

### ❌ Error: "ENOENT: no such file or directory 'database-sqlite.sql'"
**Penyebab:** File SQL belum ada di folder backend

**Solusi:**
1. Pastikan file `database-sqlite.sql` ada di folder `backend/`
2. Kalau belum ada, copy dari Figma Make
3. Atau buat manual dengan isi SQL yang saya berikan

---

### ❌ Error: "EADDRINUSE: address already in use :::3001"
**Penyebab:** Port 3001 sudah dipakai aplikasi lain

**Solusi 1 - Matikan aplikasi yang pakai port 3001:**
```bash
# Mac/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

**Solusi 2 - Ganti port backend:**

Edit `backend/server-sqlite.js` baris 7:
```javascript
const PORT = 3002; // Ganti dari 3001 ke 3002
```

Jangan lupa update frontend `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3002/api';
```

---

### ❌ Error: "Cannot find module 'express'"
**Penyebab:** Dependencies belum terinstall

**Solusi:**
```bash
cd backend
npm install
```

---

### ❌ Login Gagal: "Username atau password salah"
**Penyebab:** Database belum diinisialisasi

**Solusi:**
```bash
cd backend
npm run init-db
npm start
```

Cek di browser: `http://localhost:3001/api/products`
Kalau return data → database OK!

---

### ❌ Frontend: "Failed to fetch"
**Penyebab:** Backend belum jalan atau CORS error

**Cek:**
1. Backend jalan di `http://localhost:3001`? (lihat terminal 1)
2. Buka Developer Tools (F12) → Console → lihat error message
3. Pastikan `USE_MOCK_DATA = false` di `src/services/api.ts`

---

### ❌ Terminal Error: "Missing script: start"
**Penyebab:** File `package.json` tidak lengkap

**Solusi:**

Cek `backend/package.json` harus ada:
```json
{
  "scripts": {
    "start": "node server-sqlite.js",
    "dev": "nodemon server-sqlite.js",
    "init-db": "node init-db.js"
  }
}
```

Kalau belum ada, copy file `package.json` yang saya buat!

---

## 🎯 CARA MENJALANKAN SETELAH SETUP SELESAI

**Setiap kali mau jalankan aplikasi:**

### Terminal 1 - Backend:
```bash
cd backend
npm start
```
Tunggu sampai muncul: `✅ Connected to SQLite database`

### Terminal 2 - Frontend:
```bash
# Di root project (bukan di folder backend)
npm run dev
```
Tunggu sampai muncul: `Local: http://localhost:3000/`

### Buka Browser:
```
http://localhost:3000
```

**Login:**
- Username: `megaperabot`
- Password: `admin123`

---

## 🎉 SELESAI!

Sistem MEGA PERABOT sudah **FULLY FUNCTIONAL**!

**Apa yang bisa dilakukan:**
- ✅ Login dengan 3 role berbeda (Admin, Toko, Gudang)
- ✅ Lihat Dashboard dengan statistik real-time
- ✅ Buat Pesanan Baru (mengurangi stok otomatis)
- ✅ Restock Barang (menambah stok)
- ✅ Lihat Riwayat Penjualan
- ✅ Monitoring Stok
- ✅ Data disimpan ke SQLite database

---

## 📚 FILE-FILE PENTING

| File | Fungsi |
|------|--------|
| `backend/server-sqlite.js` | Backend API server |
| `backend/database-sqlite.sql` | Schema database |
| `backend/megaperabot.db` | Database file (auto-generated) |
| `src/services/api.ts` | API calls dari frontend |
| `src/pages/Login.tsx` | Halaman login |
| `src/pages/Dashboard.tsx` | Dashboard utama |

---

## 💡 TIPS

1. **Backup Database Berkala:**
   ```bash
   cp backend/megaperabot.db backend/megaperabot.db.backup
   ```

2. **Reset Database (Kalau Data Rusak):**
   ```bash
   cd backend
   npm run init-db
   ```

3. **Lihat Log Backend:**
   Semua request akan muncul di terminal backend

4. **Development Mode (pakai Mock Data):**
   Edit `src/services/api.ts`:
   ```typescript
   const USE_MOCK_DATA = true; // Pakai mock data
   ```

---

**Butuh bantuan?** Lihat file:
- `/backend/README.md` - Dokumentasi backend
- `/CARA-SAMBUNG-DATABASE.md` - Troubleshooting koneksi

**SELAMAT! Sistem Anda sudah siap digunakan!** 🚀
