# 🚨 TROUBLESHOOTING: "Failed to fetch" Error

## Error yang Anda Alami

```
❌ API Call Error: TypeError: Failed to fetch
Login error: Error: Tidak dapat terhubung ke server. 
Pastikan backend sudah berjalan di http://localhost:3001
```

## Penyebab Error

Error ini terjadi karena **frontend tidak bisa connect ke backend**. Kemungkinan:

1. ❌ Backend belum jalan
2. ❌ Backend error saat startup
3. ❌ Port 3001 sudah dipakai aplikasi lain
4. ❌ Database belum diinisialisasi

---

## ✅ SOLUSI STEP-BY-STEP

### **STEP 1: Cek Apakah Backend Jalan**

#### A. Lihat Terminal Backend

Buka terminal tempat Anda jalankan `npm start` di folder backend.

**Output BENAR (Backend Jalan):**
```bash
✅ Connected to SQLite database: /path/to/backend/megaperabot.db

🚀 ====================================
🚀  MEGA PERABOT Backend API
🚀  Server: http://localhost:3001
🚀  Database: /path/to/backend/megaperabot.db
🚀 ====================================
```

**Output SALAH (Backend Error):**
```bash
❌ Error connecting to database: SQLITE_CANTOPEN: unable to open database file
# atau
Error: Cannot find module 'express'
# atau
Error: listen EADDRINUSE: address already in use :::3001
```

#### B. Test Backend dengan Script

Di terminal backend, jalankan:

```bash
npm test
```

**Output BENAR:**
```
✅ Backend is running!
   Status Code: 200
   Response: {
     "status": "ok",
     "database": "connected",
     "timestamp": "2026-02-12T..."
   }

🎉 BACKEND CONNECTION: SUCCESS!
```

**Output SALAH:**
```
❌ BACKEND CONNECTION: FAILED!
   Error: connect ECONNREFUSED 127.0.0.1:3001
```

---

### **STEP 2: Fix Backend (Jika Belum Jalan)**

#### **Fix 1: Backend Belum Dijalankan**

```bash
# Pastikan Anda di folder backend
cd backend

# Jalankan backend
npm start
```

**Tunggu sampai muncul:**
```
🚀  Server: http://localhost:3001
```

✅ **Backend sekarang jalan!**

---

#### **Fix 2: Error "Cannot find module 'express'"**

**Penyebab:** Dependencies belum diinstall

**Solusi:**
```bash
# Di folder backend
npm install
```

**Tunggu sampai selesai:**
```
added 50 packages, and audited 51 packages in 10s
```

**Kemudian jalankan lagi:**
```bash
npm start
```

---

#### **Fix 3: Error "SQLITE_CANTOPEN: unable to open database file"**

**Penyebab:** Database belum diinisialisasi atau file `megaperabot.db` tidak ada

**Solusi:**
```bash
# Di folder backend
npm run init-db
```

**Output yang benar:**
```
✅ New database created: /path/to/backend/megaperabot.db
✅ Database initialized successfully!
📊 Users: 3
📦 Products: 5
🎉 Database ready to use!
```

**Kemudian jalankan backend:**
```bash
npm start
```

---

#### **Fix 4: Error "EADDRINUSE: address already in use :::3001"**

**Penyebab:** Port 3001 sudah dipakai aplikasi lain (mungkin backend masih jalan dari sebelumnya)

**Solusi 1 (Recommended): Matikan proses yang pakai port 3001**

**Windows:**
```powershell
# Cari proses yang pakai port 3001
netstat -ano | findstr :3001

# Output contoh:
# TCP    0.0.0.0:3001    0.0.0.0:0    LISTENING    12345

# Matikan proses (ganti 12345 dengan PID yang muncul)
taskkill /PID 12345 /F
```

**Mac/Linux:**
```bash
# Cari dan matikan proses yang pakai port 3001
lsof -ti:3001 | xargs kill -9
```

**Kemudian jalankan backend lagi:**
```bash
npm start
```

**Solusi 2 (Alternatif): Ganti port backend**

1. Edit file `backend/server-sqlite.js` baris 7:
   ```javascript
   const PORT = 3002; // Ganti ke 3002
   ```

2. Edit file `services/api.ts` baris 4:
   ```typescript
   const API_BASE_URL = 'http://localhost:3002/api'; // Ganti ke 3002
   ```

3. Restart backend dan frontend

---

### **STEP 3: Test Backend di Browser**

Buka browser (Chrome/Firefox/Edge) dan ketik:

```
http://localhost:3001/api/health
```

**Hasil BENAR (Backend Jalan):**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-02-12T10:30:00.000Z"
}
```

**Hasil SALAH (Backend Tidak Jalan):**
```
This site can't be reached
localhost refused to connect
ERR_CONNECTION_REFUSED
```

→ Kembali ke STEP 2

---

### **STEP 4: Test API Products**

Kalau health check berhasil, test endpoint lain:

```
http://localhost:3001/api/products
```

**Hasil BENAR:**
```json
[
  {
    "kode_barang": "PK0018",
    "nama_barang": "KESET BIASA",
    "kategori": "Alat Kebersihan",
    "stok_akhir": 28,
    "harga_jual": 10000,
    ...
  },
  ...
]
```

Kalau muncul array produk → **Backend tersambung dengan database!** ✅

---

### **STEP 5: Restart Frontend**

Setelah backend jalan, restart frontend:

1. Di terminal frontend (yang jalan `npm run dev`), tekan **Ctrl+C**
2. Jalankan lagi:
   ```bash
   npm run dev
   ```

3. Buka browser: `http://localhost:3000`
4. Coba login dengan: `megaperabot` / `admin123`

✅ **Kalau berhasil login → SELESAI!**

---

## 🔍 Checklist Lengkap

Gunakan checklist ini untuk troubleshooting:

```
[ ] Backend sudah di-install: cd backend && npm install
[ ] Database sudah diinisialisasi: npm run init-db
[ ] File megaperabot.db ada di folder backend
[ ] Backend jalan: npm start (muncul "Server running on 3001")
[ ] Terminal backend tidak ada error
[ ] Test connection: npm test (return SUCCESS)
[ ] Browser test: localhost:3001/api/health (return JSON)
[ ] Browser test: localhost:3001/api/products (return array)
[ ] Frontend sudah di-install: npm install (di root project)
[ ] Frontend jalan: npm run dev (muncul "Local: localhost:3000")
[ ] Browser: localhost:3000 (halaman login muncul)
[ ] Login berhasil dengan megaperabot / admin123
```

**Kalau semua ✅ → Aplikasi berjalan sempurna!**

---

## 🔥 Quick Fix Commands

**Start dari awal (Reset semua):**

```bash
# 1. Stop semua terminal (Ctrl+C di setiap terminal)

# 2. Backend setup
cd backend
rm -f megaperabot.db    # Hapus database lama (optional)
npm install             # Install dependencies
npm run init-db         # Inisialisasi database baru
npm start               # Jalankan backend

# 3. Frontend setup (terminal baru)
cd ..                   # Keluar dari folder backend
npm install             # Install dependencies frontend
npm run dev             # Jalankan frontend

# 4. Test
# Browser: http://localhost:3001/api/health
# Browser: http://localhost:3000
# Login: megaperabot / admin123
```

---

## 📊 Diagram Flow Troubleshooting

```
Frontend (localhost:3000)
         |
         | fetch()
         |
         ▼
Backend (localhost:3001/api/...)  ← Cek ini dulu!
         |
         | SQL query
         |
         ▼
Database (megaperabot.db)  ← Cek ini juga!
```

**Error "Failed to fetch" = Panah pertama terputus!**

Solusinya:
1. Pastikan backend jalan (localhost:3001 bisa diakses)
2. Pastikan database ada (file megaperabot.db)
3. Restart backend dan frontend

---

## 💬 Pesan Error Umum & Solusinya

| Error Message | Penyebab | Solusi |
|--------------|----------|--------|
| `Failed to fetch` | Backend tidak jalan | `cd backend && npm start` |
| `ECONNREFUSED` | Port 3001 tidak terbuka | Pastikan backend jalan |
| `Cannot find module` | Dependencies belum install | `npm install` di folder backend |
| `SQLITE_CANTOPEN` | Database file tidak ada | `npm run init-db` |
| `EADDRINUSE` | Port 3001 sudah dipakai | Kill process atau ganti port |
| `CORS error` | CORS tidak dikonfigurasi | Sudah dihandle di server-sqlite.js |
| `404 Not Found` | Endpoint salah | Cek URL di api.ts |

---

## 🆘 Masih Error?

Jika masih error setelah ikuti semua step di atas, **screenshot hal berikut:**

1. **Terminal Backend** (keseluruhan output setelah `npm start`)
2. **Terminal Frontend** (keseluruhan output setelah `npm run dev`)
3. **Browser Console** (tekan F12 → tab Console → screenshot error merah)
4. **Browser Network** (tekan F12 → tab Network → refresh halaman → screenshot request yang failed)

Kirim screenshot tersebut untuk troubleshooting lebih lanjut!

---

## ✅ Verifikasi Akhir

Kalau semua sudah fix, Anda harus bisa:

1. ✅ Buka http://localhost:3001/api/health → return JSON
2. ✅ Buka http://localhost:3001/api/products → return array 5 produk
3. ✅ Buka http://localhost:3000 → halaman login muncul
4. ✅ Login dengan megaperabot/admin123 → masuk dashboard
5. ✅ Dashboard menampilkan data dari database (Total Produk: 5, dll)
6. ✅ Klik "Pesanan Baru" → form muncul dengan dropdown produk
7. ✅ Submit pesanan → stok berkurang di database

**🎉 SISTEM BERJALAN SEMPURNA!**
