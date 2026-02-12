# 🔌 PANDUAN MENYAMBUNGKAN DATABASE KE FRONTEND

**Status Saat Ini:**
- ✅ Frontend: Jalan di `http://localhost:3000/` (VITE)
- ✅ Backend: Sudah ada di folder `/backend/` (belum jalan)
- ✅ Database: SQLite sudah lengkap di DB Browser
- ⚠️ Koneksi: Frontend pakai MOCK DATA (belum nyambung)

---

## 🎯 LANGKAH-LANGKAH KONEKSI

### **Step 1: Simpan Database ke Folder Backend**

1. Buka **DB Browser for SQLite**
2. Klik menu **File** → **Save Database As...**
3. Simpan dengan nama: `megaperabot.db`
4. Lokasi: **Di dalam folder backend VSCode Anda**

   Contoh struktur folder:
   ```
   mega-perabot-project/
   ├── backend/
   │   ├── megaperabot.db          ← File database harus di sini!
   │   ├── server-sqlite.js        ← Backend API
   │   ├── package.json            ← Dependencies backend
   │   ├── init-db.js              ← Script init database
   │   └── README.md
   ├── src/                        ← Frontend React
   ├── package.json                ← Dependencies frontend
   └── vite.config.ts
   ```

---

### **Step 2: Install Dependencies Backend**

Buka Terminal di VSCode (pastikan di folder **backend**):

```bash
cd backend
npm install
```

Ini akan install packages:
- `express` - Framework web server
- `cors` - Untuk akses dari frontend
- `sqlite3` - Driver database SQLite

---

### **Step 3: Jalankan Backend API**

Di Terminal backend, jalankan:

```bash
npm start
```

**Atau dengan auto-reload:**
```bash
npm run dev
```

**Kalau berhasil**, Anda akan lihat:
```
🚀 ====================================
🚀  MEGA PERABOT Backend API
🚀  Server: http://localhost:3001
🚀  Database: /path/to/backend/megaperabot.db
🚀 ====================================

✅ Connected to SQLite database
```

**Kalau ada error**, cek:
- Apakah file `megaperabot.db` ada di folder backend?
- Apakah port 3001 sudah dipakai aplikasi lain?
- Apakah sudah `npm install`?

---

### **Step 4: Test Backend API (Optional)**

Buka browser, akses URL ini:

```
http://localhost:3001/api/health
```

Kalau berhasil, akan muncul:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-02-04T..."
}
```

**Test Login:**
```
POST http://localhost:3001/api/auth/login
Body: {"username": "megaperabot", "password": "admin123"}
```

---

### **Step 5: Frontend Sudah Tersambung!**

✅ **Frontend sudah diupdate!**

File `/services/api.ts` sudah diubah:
```typescript
const USE_MOCK_DATA = false; // ← Sudah diubah jadi false!
```

Sekarang frontend akan:
- Fetch data dari `http://localhost:3001/api`
- Login menggunakan data dari database SQLite
- CRUD operations langsung ke database

---

## 🔄 ALUR KONEKSI LENGKAP

```
┌─────────────────────────────────────────────────────┐
│  USER: Buka http://localhost:3000                   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  FRONTEND (React + VITE)                            │
│  - Login form                                       │
│  - Dashboard                                        │
│  - Forms pesanan, restock, dll                      │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ fetch('http://localhost:3001/api/auth/login')
                       ▼
┌─────────────────────────────────────────────────────┐
│  BACKEND API (Express.js) - localhost:3001          │
│  - POST /api/auth/login                             │
│  - GET  /api/products                               │
│  - POST /api/orders/customer                        │
│  - POST /api/restock                                │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ db.get("SELECT * FROM users WHERE...")
                       ▼
┌─────────────────────────────────────────────────────┐
│  DATABASE (SQLite) - megaperabot.db                 │
│  - Tabel: users, products, transactions, dll        │
│  - Data real dari database                          │
└─────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST KONEKSI

Cek satu-satu sampai semua ✅:

- [ ] File `megaperabot.db` ada di folder backend
- [ ] Backend sudah `npm install`
- [ ] Backend jalan di `http://localhost:3001` (cek terminal)
- [ ] Test endpoint `http://localhost:3001/api/health` (harus return JSON)
- [ ] Frontend sudah `USE_MOCK_DATA = false` di `/services/api.ts`
- [ ] Frontend reload di browser (Ctrl+R atau Cmd+R)
- [ ] Test login dengan akun: `megaperabot` / `admin123`

---

## 🚨 TROUBLESHOOTING

### **Error: "Cannot find module 'express'"**
**Solusi:**
```bash
cd backend
npm install
```

---

### **Error: "EADDRINUSE: address already in use :::3001"**
**Penyebab:** Port 3001 sudah dipakai aplikasi lain

**Solusi 1:** Matikan aplikasi yang pakai port 3001
```bash
# Mac/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

**Solusi 2:** Ganti port di backend
Edit `/backend/server-sqlite.js` baris 7:
```javascript
const PORT = 3002; // Ganti ke 3002
```

Jangan lupa update frontend `/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3002/api';
```

---

### **Error: "SQLITE_ERROR: no such table: users"**
**Penyebab:** Database belum diinisialisasi

**Solusi:**
```bash
cd backend
npm run init-db
npm start
```

---

### **Error: "Failed to fetch" di Frontend**
**Penyebab:** CORS blocking atau backend belum jalan

**Cek:**
1. Apakah backend jalan di `http://localhost:3001`?
2. Buka Developer Console (F12) di browser, lihat error
3. Pastikan CORS sudah enabled di backend (sudah ada di kode)

---

### **Login Gagal: "Username atau password salah"**
**Penyebab:** Data user belum ada di database

**Solusi:** Cek di DB Browser, tabel `users` harus ada data:
| id | username      | password    | name                     | role   |
|----|---------------|-------------|--------------------------|--------|
| 1  | megaperabot   | admin123    | Administrator            | admin  |
| 2  | karyawan01    | toko123     | Budi Santoso             | toko   |
| 3  | staffgudang01 | gudang123   | Siti Rahayu              | gudang |

Kalau belum ada, jalankan:
```bash
cd backend
npm run init-db
```

---

## 📊 AKUN DEMO

Setelah database terkoneksi, gunakan akun ini:

| Role             | Username      | Password    |
|------------------|---------------|-------------|
| Admin            | megaperabot   | admin123    |
| Karyawan Toko    | karyawan01    | toko123     |
| Karyawan Gudang  | staffgudang01 | gudang123   |

---

## 🎉 SELESAI!

Setelah semua langkah di atas:
1. Backend jalan di `http://localhost:3001` ✅
2. Frontend jalan di `http://localhost:3000` ✅
3. Database tersambung via backend ✅
4. Data real dari SQLite ✅

**Sistem MEGA PERABOT sudah FULLY CONNECTED!** 🚀

---

## 📝 CATATAN PENTING

- **Development Mode:** Kalau mau kembali pakai mock data, ubah `/services/api.ts`:
  ```typescript
  const USE_MOCK_DATA = true; // Kembali ke mock data
  ```

- **Production Deployment:** 
  - Ganti `localhost:3001` dengan URL server production
  - Gunakan HTTPS untuk keamanan
  - Setup proper authentication (JWT token)

- **Backup Database:**
  ```bash
  cp backend/megaperabot.db backend/megaperabot.db.backup
  ```

---

**Butuh bantuan lebih lanjut?** Cek `/backend/README.md` atau dokumentasi lengkap di file lainnya! 📚
