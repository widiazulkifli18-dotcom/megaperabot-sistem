# 🚀 MEGA PERABOT - Setup Lengkap

Panduan setup lengkap untuk sistem MEGA PERABOT (Frontend + Backend).

## 📁 Struktur Project

```
megaperabot/
├── backend/               # Node.js + Express + SQLite
│   ├── database-sqlite.sql
│   ├── server-sqlite.js
│   ├── init-db.js
│   ├── package.json
│   └── README.md
│
└── frontend/             # React + Vite (Figma Make)
    ├── src/
    ├── components/
    ├── pages/
    └── ...
```

---

## 🔧 SETUP BACKEND

### 1. Masuk ke folder backend
```bash
cd /Users/user/Documents/megaperabot/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize database
```bash
npm run init-db
```

Output yang benar:
```
🗑️  Old database removed
✅ New database created: /Users/user/Documents/megaperabot/backend/megaperabot.db
✅ Database initialized successfully!
📊 Users: 3
📦 Products: 5
🎉 Database ready to use!
```

### 4. Jalankan backend server
```bash
npm start
```

Output:
```
🚀 ====================================
🚀  MEGA PERABOT Backend API
🚀  Server: http://localhost:3001
🚀  Database: /Users/user/.../megaperabot.db
🚀 ====================================
```

✅ **Backend siap!** Jangan tutup terminal ini.

---

## 🎨 SETUP FRONTEND

### 1. Buka terminal baru, masuk ke folder frontend
```bash
cd /Users/user/Documents/megaperabot/frontend
```

### 2. Install dependencies (jika belum)
```bash
npm install
```

### 3. Jalankan frontend
```bash
npm run dev
```

Output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ **Frontend siap!**

---

## 🧪 TESTING

### 1. Buka browser
```
http://localhost:5173
```

### 2. Login dengan akun test

**Admin:**
- Username: `admin`
- Password: `admin123`

**Karyawan Toko:**
- Username: `toko`
- Password: `toko123`

**Karyawan Gudang:**
- Username: `gudang`
- Password: `gudang123`

### 3. Cek koneksi database
Setelah login, dashboard harus menampilkan:
- ✅ Total Produk: 5
- ✅ Data produk dari database
- ✅ Statistik penjualan

---

## 🔍 TROUBLESHOOTING

### ❌ Error: "Tidak dapat terhubung ke server"

**Cek backend:**
```bash
# Di terminal backend, cek apakah ada error
# Pastikan muncul: "Server: http://localhost:3001"
```

**Test manual:**
```bash
# Buka browser atau curl
curl http://localhost:3001/api/health

# Harus return:
# {"status":"ok","database":"connected","timestamp":"..."}
```

### ❌ Error: "Login gagal"

**Cek database:**
```bash
cd backend
npm run init-db    # Re-initialize
npm start          # Restart server
```

### ❌ Dashboard kosong / No data

**Cek console browser:**
- Tekan `F12` (Windows) atau `Cmd+Option+I` (Mac)
- Lihat tab Console untuk error
- Lihat tab Network untuk failed requests

**Test API:**
```bash
# Test products endpoint
curl http://localhost:3001/api/products

# Harus return array produk
```

### ❌ Port 3001 sudah digunakan

**Ganti port backend:**

Edit `backend/server-sqlite.js`:
```javascript
const PORT = 3002;  // Ganti ke port lain
```

Edit `frontend/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3002/api';  // Sesuaikan
```

---

## 📊 ALUR DATA

```
[SQLite Database]
      ↓
[Backend API - localhost:3001]
      ↓
[Frontend React - localhost:5173]
      ↓
[Browser]
```

### Contoh Flow: Login

1. User input username/password di frontend
2. Frontend kirim POST ke `http://localhost:3001/api/auth/login`
3. Backend cek database SQLite
4. Backend return user data
5. Frontend simpan di localStorage dan redirect ke Dashboard

### Contoh Flow: Dashboard

1. Frontend request `GET /api/products`
2. Backend query `SELECT * FROM products`
3. Backend return JSON data
4. Frontend tampilkan di tabel

---

## 🛠️ Development Tips

### Restart Backend (jika ada perubahan)
```bash
# Ctrl+C untuk stop
npm start
```

### Restart Frontend (jika ada perubahan code)
Vite auto-reload, tapi jika stuck:
```bash
# Ctrl+C untuk stop
npm run dev
```

### Reset Database
```bash
cd backend
rm megaperabot.db
npm run init-db
npm start
```

### Lihat isi Database
```bash
# Install DB Browser for SQLite
# Buka file: backend/megaperabot.db
```

Atau pakai command line:
```bash
cd backend
sqlite3 megaperabot.db

sqlite> .tables
sqlite> SELECT * FROM users;
sqlite> SELECT * FROM products;
sqlite> .quit
```

---

## ✅ CHECKLIST SETUP

- [ ] Backend installed (`npm install` di folder backend)
- [ ] Database initialized (`npm run init-db`)
- [ ] Backend running di localhost:3001
- [ ] Frontend installed (`npm install` di folder frontend)
- [ ] Frontend running di localhost:5173
- [ ] Bisa login dengan akun `admin` / `admin123`
- [ ] Dashboard menampilkan data dari database
- [ ] Tidak ada error di browser console

---

## 📞 Support

Jika masih ada masalah, screenshot:
1. Terminal backend (error message)
2. Terminal frontend (error message)
3. Browser console (F12 → Console tab)
4. Browser network tab (F12 → Network tab)

---

**Happy Coding! 🚀**
