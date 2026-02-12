# 🚀 CARA MENJALANKAN SISTEM MEGA PERABOT

## 📋 PANDUAN LENGKAP - STEP BY STEP

Sistem ini terdiri dari **2 bagian**:
1. **Backend** (Node.js + Express + SQLite) → Jalan di **VS Code Terminal**
2. **Frontend** (React + TypeScript) → Jalan di **Figma Make Browser**

---

## ⚙️ BAGIAN 1: MENJALANKAN BACKEND

### **STEP 1: Buka Terminal Backend**

Di **VS Code**, buka terminal dan masuk ke folder backend:

```bash
cd /Users/user/Documents/megaperabot/backend
```

---

### **STEP 2: Install Dependencies (Hanya Sekali)**

```bash
npm install
```

**Tunggu sampai selesai** (muncul tulisan "added packages").

---

### **STEP 3: Inisialisasi Database (Hanya Sekali)**

Jalankan script untuk membuat database dan isi data demo:

```bash
node init-database.js
```

**✅ Harus muncul:**
```
🔧 Initializing database...
✅ Database initialized successfully!
📊 Created:
   - 3 demo users (admin, toko, gudang)
   - 15 demo products
✅ Database closed
```

---

### **STEP 4: Jalankan Backend Server**

```bash
npm start
```

**✅ Harus muncul:**
```
🚀 ========================================
🚀 MEGA PERABOT Backend Server
🚀 Server running on http://localhost:3001
🚀 ========================================
✅ Database connected: .../megaperabot.db
```

**🔴 PENTING:**
- **JANGAN TUTUP TERMINAL INI!**
- Backend harus **terus berjalan** selama Anda menggunakan aplikasi
- Kalau terminal ditutup, aplikasi tidak bisa mengakses data

---

### **STEP 5: Test Backend (Opsional)**

**Buka terminal BARU** (jangan tutup yang lama!):

```bash
# Test health check
curl http://localhost:3001/api/health

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test get products
curl http://localhost:3001/api/products
```

**Kalau muncul JSON response** = ✅ Backend berhasil!

---

## 🌐 BAGIAN 2: MENJALANKAN FRONTEND DI FIGMA MAKE

### **STEP 1: Pastikan Backend Sudah Jalan**

✅ Backend harus sudah jalan di `http://localhost:3001` (lihat BAGIAN 1 di atas)

---

### **STEP 2: Buka Browser Test**

1. Buka file **test-backend.html** di browser
2. Klik tombol-tombol test:
   - **Test /api/health** → harus muncul JSON success
   - **Login sebagai Admin** → harus muncul user data
   - **Test /api/products** → harus muncul array produk

**Kalau semua test BERHASIL** = ✅ Siap untuk login di aplikasi!

---

### **STEP 3: Login ke Aplikasi**

Di **Figma Make browser**, refresh halaman dan login dengan:

#### 👨‍💼 **Admin**
- Username: `admin`
- Password: `admin123`
- Akses: **Semua fitur** (Dashboard, Pesanan Pemasok)

#### 🏪 **Karyawan Toko**
- Username: `toko`
- Password: `toko123`
- Akses: **Dashboard, Pesanan Baru**

#### 📦 **Karyawan Gudang**
- Username: `gudang`
- Password: `gudang123`
- Akses: **Dashboard, Restock Barang**

---

## 🔧 TROUBLESHOOTING

### **❌ Error: "Failed to fetch"**

**Penyebab:** Backend tidak jalan atau port salah.

**Solusi:**
1. Pastikan backend jalan di terminal (lihat STEP 4 di BAGIAN 1)
2. Cek di terminal ada tulisan "Server running on http://localhost:3001"
3. Test dengan curl atau buka `test-backend.html`

---

### **❌ Error: "EADDRINUSE: address already in use :::3001"**

**Penyebab:** Port 3001 sudah digunakan proses lain.

**Solusi:**

```bash
# Matikan proses yang menggunakan port 3001
lsof -ti :3001 | xargs kill -9

# Jalankan backend lagi
npm start
```

---

### **❌ Error: "no such table: users" atau "no such table: products"**

**Penyebab:** Database belum diinisialisasi.

**Solusi:**

```bash
# Jalankan inisialisasi database
node init-database.js

# Jalankan backend lagi
npm start
```

---

### **❌ Backend jalan tapi login gagal**

**Penyebab:** Schema database tidak sesuai.

**Solusi:**

1. **Stop backend** (tekan Ctrl+C di terminal)
2. **Hapus database lama:**
   ```bash
   rm megaperabot.db
   ```
3. **Inisialisasi ulang:**
   ```bash
   node init-database.js
   ```
4. **Jalankan backend:**
   ```bash
   npm start
   ```

---

## 📊 STRUKTUR DATABASE

### **Tabel `users`**
```sql
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **Tabel `products`**
```sql
CREATE TABLE products (
  kode_barang TEXT PRIMARY KEY,
  nama_barang TEXT NOT NULL,
  kategori TEXT,
  pemasok TEXT,
  harga_beli REAL DEFAULT 0,
  harga_jual REAL DEFAULT 0,
  stok_awal INTEGER DEFAULT 0,
  stok_masuk INTEGER DEFAULT 0,
  stok_keluar INTEGER DEFAULT 0,
  stok_akhir INTEGER DEFAULT 0,
  jumlah_terjual INTEGER DEFAULT 0,
  penjualan REAL DEFAULT 0,
  keuntungan REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎯 ENDPOINT API YANG TERSEDIA

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login user |
| GET | `/api/products` | Get semua produk |
| GET | `/api/products/:kode_barang` | Get produk by kode |
| GET | `/api/dashboard/stats` | Get statistik dashboard |
| POST | `/api/orders` | Buat pesanan customer |
| POST | `/api/restock` | Restock barang |
| GET | `/api/suppliers` | Get daftar pemasok |
| GET | `/api/categories` | Get daftar kategori |

---

## 📝 WORKFLOW PENGGUNAAN

### **1. Admin:**
- Login → Dashboard → Lihat statistik → Pesanan Pemasok

### **2. Karyawan Toko:**
- Login → Dashboard → Pesanan Baru → Tambah barang ke keranjang → Submit pesanan

### **3. Karyawan Gudang:**
- Login → Dashboard → Restock → Pilih produk → Input jumlah → Submit restock

---

## ✅ CHECKLIST SEBELUM PRESENTASI SKRIPSI

- [ ] Backend berjalan tanpa error
- [ ] Test login semua role berhasil
- [ ] Dashboard menampilkan data dari database
- [ ] Form pesanan berfungsi
- [ ] Form restock berfungsi
- [ ] Role-based access berfungsi (toko tidak bisa akses restock, dll)
- [ ] Data tersimpan di database SQLite
- [ ] Screenshot semua fitur untuk dokumentasi skripsi

---

## 📞 BANTUAN LEBIH LANJUT

Kalau ada error yang tidak tercantum di sini:

1. **Screenshot error** di terminal dan browser
2. **Copy-paste full error message**
3. **Cek apakah backend masih jalan** di terminal
4. **Refresh browser** dan coba lagi

---

© 2026 MEGA PERABOT - Sistem Manajemen Stok dan Pemesanan
