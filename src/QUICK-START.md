# 🚀 QUICK START GUIDE - MEGA PERABOT

## 📌 3 LANGKAH SEDERHANA UNTUK MENJALANKAN APLIKASI

---

## 🎯 LANGKAH 1: SETUP DATABASE (5 MENIT)

### Di Terminal VS Code:

```bash
# Masuk ke folder backend
cd /Users/user/Documents/megaperabot/backend

# Jalankan script inisialisasi (sudah tersedia)
node init-database.js
```

**✅ Tunggu sampai muncul:**
```
✅ Database initialized successfully!
📊 Created:
   - 3 demo users (admin, toko, gudang)
   - 15 demo products
```

---

## 🎯 LANGKAH 2: START BACKEND (1 MENIT)

### Di Terminal yang sama:

```bash
npm start
```

**✅ Harus muncul:**
```
🚀 MEGA PERABOT Backend Server
🚀 Server running on http://localhost:3001
✅ Database connected
```

**❗ JANGAN TUTUP TERMINAL INI!** Backend harus terus berjalan.

---

## 🎯 LANGKAH 3: LOGIN DI BROWSER (30 DETIK)

### Di Browser Figma Make:

1. **Refresh halaman** (tekan F5 atau Command+R)

2. **Login dengan salah satu akun:**

   **👨‍💼 Admin:**
   - Username: `admin`
   - Password: `admin123`

   **🏪 Karyawan Toko:**
   - Username: `toko`
   - Password: `toko123`

   **📦 Karyawan Gudang:**
   - Username: `gudang`
   - Password: `gudang123`

3. **Seharusnya redirect ke Dashboard** dengan data produk! ✅

---

## ❌ MASALAH UMUM & SOLUSI

### Problem: "Failed to fetch" saat login

**Cek:** Apakah backend jalan? Lihat terminal harus ada "Server running"

**Solusi:**
```bash
# Matikan proses yang crash
killall -9 node

# Start ulang backend
cd /Users/user/Documents/megaperabot/backend
npm start
```

---

### Problem: "Port 3001 already in use"

**Solusi:**
```bash
# Matikan proses di port 3001
lsof -ti :3001 | xargs kill -9

# Start backend lagi
npm start
```

---

### Problem: "No such table: users"

**Solusi:**
```bash
# Stop backend (Ctrl+C)

# Hapus database lama
rm megaperabot.db

# Inisialisasi ulang
node init-database.js

# Start backend
npm start
```

---

## 🧪 TEST BACKEND (OPSIONAL)

Untuk memastikan backend berjalan dengan benar:

### Buka Terminal Baru, lalu:

```bash
# Test 1: Health check
curl http://localhost:3001/api/health

# Test 2: Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Kalau muncul JSON response = Backend OK! ✅**

---

## 📊 STRUKTUR SISTEM

```
┌─────────────────────────────────────────┐
│  FRONTEND (Figma Make Browser)          │
│  - React + TypeScript                   │
│  - Login, Dashboard, Forms              │
└────────────────┬────────────────────────┘
                 │ HTTP API
                 │ (localhost:3001)
┌────────────────▼────────────────────────┐
│  BACKEND (VS Code Terminal)             │
│  - Node.js + Express                    │
│  - REST API Endpoints                   │
└────────────────┬────────────────────────┘
                 │ SQL Queries
┌────────────────▼────────────────────────┐
│  DATABASE (SQLite)                      │
│  - megaperabot.db                       │
│  - Users, Products tables               │
└─────────────────────────────────────────┘
```

---

## 📝 FITUR SISTEM BY ROLE

### 👨‍💼 **Admin (admin/admin123)**
✅ Dashboard dengan statistik
✅ Lihat semua produk
✅ Manage pesanan pemasok (future)

### 🏪 **Karyawan Toko (toko/toko123)**
✅ Dashboard dengan statistik
✅ Buat pesanan customer baru
✅ Kelola shopping cart

### 📦 **Karyawan Gudang (gudang/gudang123)**
✅ Dashboard dengan statistik
✅ Restock barang
✅ Update stok masuk

---

## 📚 FILE DOKUMENTASI LENGKAP

Untuk keperluan skripsi, lihat file:

1. **CARA-MENJALANKAN.md** → Panduan lengkap step by step
2. **DOKUMENTASI-SKRIPSI.md** → Dokumentasi untuk BAB skripsi
3. **FIX-ERRORS-CHECKLIST.md** → Troubleshooting lengkap
4. **test-backend.html** → Tool test backend di browser

---

## 🎓 UNTUK PRESENTASI SKRIPSI

### Demo Flow yang Direkomendasikan:

1. **Tunjukkan backend running** di terminal
2. **Login sebagai Admin** → Tunjukkan dashboard real-time
3. **Login sebagai Toko** → Demo buat pesanan baru
4. **Login sebagai Gudang** → Demo restock barang
5. **Tunjukkan role-based access** (Toko tidak bisa akses Restock)
6. **Highlight efisiensi operasional** dari dokumentasi

---

## ⏱️ ESTIMASI WAKTU

- Setup pertama kali: **~10 menit**
- Startup selanjutnya: **~2 menit** (cukup `npm start`)
- Demo untuk presentasi: **~15 menit**

---

## 📞 NEED HELP?

Jika masih ada error:

1. ✅ **Cek terminal backend** - harus ada "Server running"
2. ✅ **Test dengan curl** - harus return JSON
3. ✅ **Screenshot error** dan cari di FIX-ERRORS-CHECKLIST.md
4. ✅ **Clear browser cache** dan refresh

---

**🎉 SELAMAT! Sistem MEGA PERABOT siap untuk presentasi skripsi!**

© 2026 MEGA PERABOT - Sistem Manajemen Stok dan Pemesanan
