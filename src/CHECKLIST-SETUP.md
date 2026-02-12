# ✅ CHECKLIST SETUP MEGA PERABOT
## Ikuti urutan ini step-by-step!

---

## 📦 STEP 1: PERSIAPAN FILE

Di VSCode, pastikan file-file ini ADA:

### Folder Backend:
```
backend/
├── ✅ server-sqlite.js       (Backend API)
├── ✅ package.json            (Dependencies backend)
├── ✅ init-db.js              (Database initializer)
├── ✅ database-sqlite.sql    (SQL schema) ← PENTING!
└── ✅ README.md
```

**⚠️ KALAU FILE `database-sqlite.sql` TIDAK ADA:**
- Copy dari Figma Make, ATAU
- Buat file baru `backend/database-sqlite.sql` dan isi dengan SQL yang saya berikan

---

## 🔧 STEP 2: INSTALL BACKEND

Buka Terminal di VSCode:

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Install dependencies
npm install

# 3. Inisialisasi database
npm run init-db

# 4. Jalankan backend
npm start
```

**✅ Sukses kalau muncul:**
```
🚀  Server: http://localhost:3001
✅ Connected to SQLite database
```

**❌ Error "Missing script"?**
→ File `package.json` kurang lengkap, copy dari Figma Make!

**❌ Error "Cannot find database-sqlite.sql"?**
→ File SQL belum ada, buat dulu file `backend/database-sqlite.sql`!

---

## 🎨 STEP 3: INSTALL FRONTEND

Buka Terminal BARU (jangan tutup terminal backend):

```bash
# 1. Keluar dari folder backend (kalau masih di sana)
cd ..

# 2. Install dependencies frontend
npm install

# 3. Jalankan frontend
npm run dev
```

**✅ Sukses kalau muncul:**
```
➜  Local:   http://localhost:3000/
```

---

## 🧪 STEP 4: TEST KONEKSI

### Test 1: Backend Health Check
Buka browser:
```
http://localhost:3001/api/health
```
**Harus return:** `{"status": "ok", "database": "connected"}`

### Test 2: Get Products
```
http://localhost:3001/api/products
```
**Harus return:** Array data produk (5 items)

### Test 3: Login Frontend
```
http://localhost:3000
```
**Login dengan:**
- Username: `megaperabot`
- Password: `admin123`

**✅ Kalau berhasil masuk Dashboard → KONEKSI SUKSES!**

---

## 📂 STEP 5: VERIFIKASI FILE DATABASE

Cek apakah file database terbuat:

```bash
cd backend
ls -la
```

**Harus ada file:** `megaperabot.db` (ukuran > 0 KB)

**Isi database:**
```bash
# Cara 1: Pakai DB Browser for SQLite
# Buka file: backend/megaperabot.db

# Cara 2: Pakai SQLite CLI
sqlite3 megaperabot.db
.tables
SELECT * FROM users;
.exit
```

**Harus ada 3 users:**
1. megaperabot (admin)
2. karyawan01 (toko)
3. staffgudang01 (gudang)

**Harus ada 5 products:**
1. PK0018 - KESET BIASA
2. PK0034 - PEL BIASA NO BRAND
3. PK0033 - PEL NAGOYA KECIL
4. PK0006 - KAIN LAP BIASA
5. PK0030 - PEL NAGATA KECIL

---

## 🚀 STEP 6: JALANKAN APLIKASI

**Setiap kali mau jalankan:**

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

### Terminal 2 - Frontend:
```bash
npm run dev
```

### Browser:
```
http://localhost:3000
```

---

## 🔍 TROUBLESHOOTING CEPAT

| Error | Solusi |
|-------|--------|
| `npm: command not found` | Install Node.js dari nodejs.org |
| `ENOENT: database-sqlite.sql` | Buat file SQL di folder backend |
| `Missing script: start` | Cek package.json, harus ada scripts |
| `EADDRINUSE: port 3001` | Port sudah dipakai, matikan atau ganti port |
| `Cannot find module 'express'` | Jalankan `npm install` di folder backend |
| Login gagal | Database belum init, jalankan `npm run init-db` |
| `Failed to fetch` | Backend belum jalan, atau CORS error |

---

## 📋 CHECKLIST FINAL

Centang semua sebelum demo/presentasi:

### Pre-Setup:
- [ ] Node.js terinstall (`node --version`)
- [ ] VSCode terbuka
- [ ] Project sudah di-extract dari ZIP

### Backend:
- [ ] File `backend/database-sqlite.sql` ada
- [ ] File `backend/package.json` ada
- [ ] `cd backend && npm install` sukses
- [ ] `npm run init-db` sukses (muncul "Database ready")
- [ ] File `backend/megaperabot.db` terbuat (cek dengan `ls`)
- [ ] `npm start` sukses (muncul "Server running")
- [ ] Test `http://localhost:3001/api/health` → return JSON

### Frontend:
- [ ] `npm install` sukses (di root project)
- [ ] File `src/services/api.ts` → `USE_MOCK_DATA = false`
- [ ] `npm run dev` sukses
- [ ] Browser buka `http://localhost:3000`
- [ ] Halaman login muncul

### Koneksi:
- [ ] Login dengan `megaperabot` / `admin123` berhasil
- [ ] Dashboard muncul dengan data dari database
- [ ] Buat pesanan baru → stok berkurang
- [ ] Restock → stok bertambah

**✅ SEMUA CHECKLIST HIJAU = SISTEM SIAP PAKAI!**

---

## 🎯 FILE PENTING YANG HARUS ADA

**Di Folder Backend (4 file wajib):**
1. ✅ `server-sqlite.js` - Backend server
2. ✅ `package.json` - Dependencies
3. ✅ `init-db.js` - Database setup
4. ✅ `database-sqlite.sql` - SQL schema ← **PALING PENTING!**

**Di Root Project:**
1. ✅ `package.json` - Frontend dependencies
2. ✅ `src/services/api.ts` - API configuration

---

## 💡 TIPS SUKSES

1. **Baca Error Message dengan Teliti**
   - Error di terminal backend? Cek backend
   - Error di browser console? Cek frontend

2. **Jalankan Backend Dulu, Baru Frontend**
   - Backend harus jalan di port 3001
   - Frontend baru bisa connect

3. **Cek Port yang Benar**
   - Backend: `localhost:3001`
   - Frontend: `localhost:3000`

4. **Kalau Bingung, Reset Database**
   ```bash
   cd backend
   npm run init-db
   npm start
   ```

---

## 📞 BANTUAN TAMBAHAN

Lihat file dokumentasi lengkap:
- **Setup Detail:** `/PANDUAN-SETUP-LENGKAP.md`
- **Koneksi Database:** `/CARA-SAMBUNG-DATABASE.md`
- **Backend Docs:** `/backend/README.md`

---

**SELAMAT! Ikuti checklist ini step-by-step dan sistem pasti jalan!** 🎉
