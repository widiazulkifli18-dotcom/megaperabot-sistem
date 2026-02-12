# 📚 PANDUAN LENGKAP - SISTEM MANAJEMEN STOK MEGA PERABOT
## Perancangan Sistem Informasi untuk Meningkatkan Efisiensi Operasional Toko Peralatan Rumah Tangga

---

## 🎯 ARSITEKTUR SISTEM (3-TIER ARCHITECTURE)

```
┌─────────────────────────────────────────────────────────────┐
│           SISTEM MEGA PERABOT - FULL STACK                   │
└─────────────────────────────────────────────────────────────┘

[TIER 1] DATABASE LAYER
├─ Tool: DB Browser for SQLite
├─ File: /Users/user/Documents/megaperabot/backend/megaperabot.db
├─ Fungsi: Data Persistence
└─ Tabel: products, users, orders, restock_history
         ↕️ SQL Queries (SELECT, INSERT, UPDATE, DELETE)

[TIER 2] BACKEND API LAYER (Business Logic)
├─ Framework: Node.js + Express.js
├─ URL: http://localhost:3001/api
├─ File: /Users/user/Documents/megaperabot/backend/server-sqlite.js
├─ Fungsi: REST API, Validation, CRUD Operations
└─ Endpoints: /auth/login, /products, /orders, /restock
         ↕️ HTTP REST API (JSON Format)

[TIER 3] FRONTEND LAYER (Presentation)
├─ Framework: React + TypeScript (Figma Make)
├─ URL: http://localhost:5173 (atau Figma preview)
├─ Fungsi: User Interface, User Experience
└─ Pages: Login, Dashboard, Pesanan Baru, Restock, Pesanan Pemasok
         ↕️ User Interaction

[USER] Browser
└─ Chrome, Safari, Firefox, Edge
```

---

## ✅ CHECKLIST - VERIFIKASI SISTEM SUDAH BENAR

### **1. DATABASE (DB Browser for SQLite)** ✅

**Lokasi:**
```
/Users/user/Documents/megaperabot/backend/megaperabot.db
```

**Cara Cek di Terminal:**
```bash
cd /Users/user/Documents/megaperabot/backend
sqlite3 megaperabot.db "SELECT COUNT(*) as total FROM products;"
```

**Harus muncul:** angka > 0 (contoh: 50)

**Cara Cek di DB Browser:**
1. Buka DB Browser for SQLite
2. Open Database → pilih `megaperabot.db`
3. Tab "Browse Data"
4. Pilih tabel "products"
5. Harus ada data produk (Keset, Pel, dll.)

---

### **2. BACKEND API (VS Code - Express.js)** ✅

**Lokasi:**
```
/Users/user/Documents/megaperabot/backend/server-sqlite.js
```

**Cara Jalankan:**
```bash
# Terminal 1 (Backend)
cd /Users/user/Documents/megaperabot/backend
npm start
```

**Harus Muncul:**
```
🚀 ========================================
🚀 MEGA PERABOT Backend Server
🚀 Server running on http://localhost:3001
🚀 ========================================
📋 Endpoints:
   GET  /api/health
   POST /api/auth/login
   GET  /api/products
   GET  /api/dashboard/stats
   POST /api/orders
   POST /api/restock
🚀 ========================================
✅ Database connected: .../megaperabot.db
```

**Cara Test Manual:**

1. **Health Check**
   ```bash
   curl http://localhost:3001/api/health
   ```
   Response: `{"status":"ok","database":"connected"}`

2. **Get Products**
   ```bash
   curl http://localhost:3001/api/products
   ```
   Response: Array of products (JSON)

3. **Test Login**
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```
   Response: `{"success":true,"user":{...}}`

---

### **3. FRONTEND UI/UX (Figma Make)** ✅

**URL:** Di browser Figma Make preview

**Cara Akses:**
1. Buka Figma Make di browser
2. Lihat preview aplikasi
3. Akan muncul halaman Login

**Struktur Aplikasi:**
```
├─ Login Page (/login)
│  └─ Form login dengan username & password
│
├─ Dashboard (/)
│  ├─ Statistik real-time (Total Produk, Penjualan, Keuntungan)
│  ├─ Tabel produk dengan status stok
│  └─ Chart penjualan
│
├─ Pesanan Baru (/new-order) - Khusus Karyawan Toko
│  ├─ Pilih produk
│  ├─ Input jumlah
│  └─ Buat pesanan (update stok otomatis)
│
├─ Restock (/restock) - Khusus Karyawan Gudang
│  ├─ Pilih produk
│  ├─ Input jumlah restock
│  └─ Simpan (update stok otomatis)
│
└─ Pesanan Pemasok (/supplier-orders) - Khusus Admin
   ├─ Pilih pemasok
   ├─ Pilih produk
   └─ Buat pesanan ke supplier
```

---

## 🔄 ALUR DATA (DATA FLOW)

### **Contoh: Proses Login**

```
1. User Input (Frontend)
   └─ Username: admin
   └─ Password: admin123

2. Frontend kirim ke Backend
   POST http://localhost:3001/api/auth/login
   Body: {"username":"admin","password":"admin123"}
   ↓
3. Backend validasi di Database
   Query: SELECT * FROM users WHERE username='admin' AND password='admin123'
   ↓
4. Database return data user
   Result: {user_id:1, username:'admin', role:'Admin', full_name:'Administrator'}
   ↓
5. Backend kirim response ke Frontend
   Response: {"success":true, "user":{...}}
   ↓
6. Frontend simpan session & redirect
   localStorage.setItem('user', JSON.stringify(user))
   navigate('/') → Dashboard
```

### **Contoh: Proses Restock Produk**

```
1. User pilih produk (Frontend)
   └─ Produk: KESET BIASA (PK0018)
   └─ Stok sekarang: 28 unit
   └─ Input restock: 50 unit

2. Frontend kirim ke Backend
   POST http://localhost:3001/api/restock
   Body: {"kode_barang":"PK0018","quantity":50}
   ↓
3. Backend update Database
   Query: UPDATE products 
          SET stok_akhir = stok_akhir + 50, 
              stok_masuk = stok_masuk + 50 
          WHERE kode_barang = 'PK0018'
   ↓
4. Database update berhasil
   Stok baru: 28 + 50 = 78 unit
   ↓
5. Backend kirim response
   Response: {"success":true,"message":"Restock berhasil"}
   ↓
6. Frontend refresh data
   GET /api/products → Ambil data terbaru
   Tampilkan stok baru: 78 unit
```

---

## 🚀 CARA MENJALANKAN SISTEM LENGKAP

### **LANGKAH 1: Jalankan Backend**

```bash
# Terminal 1 - Backend
cd /Users/user/Documents/megaperabot/backend
npm start
```

**Status:** Backend berjalan di http://localhost:3001 ✅

**JANGAN TUTUP TERMINAL INI!**

---

### **LANGKAH 2: Buka Frontend di Browser**

1. **Buka Figma Make** di browser
2. **Lihat preview** aplikasi
3. **Atau** buka link preview (biasanya muncul di Figma Make)

**Status:** Frontend terbuka di browser ✅

---

### **LANGKAH 3: Test Login**

Di halaman Login, coba salah satu akun:

**ADMIN (Akses Penuh):**
- Username: `admin`
- Password: `admin123`
- Akses: Dashboard, Pesanan Pemasok

**KARYAWAN TOKO:**
- Username: `toko`
- Password: `toko123`
- Akses: Dashboard, Pesanan Baru

**KARYAWAN GUDANG:**
- Username: `gudang`
- Password: `gudang123`
- Akses: Dashboard, Restock

---

### **LANGKAH 4: Test Fitur**

**A. Test Dashboard:**
1. Login sebagai admin
2. Lihat statistik: Total Produk, Penjualan, Keuntungan
3. Lihat tabel produk dengan status stok

**B. Test Pesanan Baru (Karyawan Toko):**
1. Login sebagai `toko`
2. Klik menu "Pesanan Baru"
3. Pilih produk: KESET BIASA
4. Input jumlah: 5
5. Klik "Buat Pesanan"
6. Stok otomatis berkurang 5 unit

**C. Test Restock (Karyawan Gudang):**
1. Login sebagai `gudang`
2. Klik menu "Restock"
3. Pilih produk: KESET BIASA
4. Input jumlah: 20
5. Klik "Simpan Restock"
6. Stok otomatis bertambah 20 unit

**D. Verifikasi di Database:**
```bash
# Cek stok produk di database
cd /Users/user/Documents/megaperabot/backend
sqlite3 megaperabot.db "SELECT kode_barang, nama_barang, stok_akhir FROM products WHERE kode_barang='PK0018';"
```

---

## 🐛 TROUBLESHOOTING

### **Error: "Tidak dapat terhubung ke server"**

**Penyebab:** Backend tidak jalan atau CORS error

**Solusi:**

1. **Cek backend jalan:**
   ```bash
   curl http://localhost:3001/api/health
   ```
   Harus return: `{"status":"ok"}`

2. **Pastikan CORS sudah diinstall:**
   ```bash
   cd /Users/user/Documents/megaperabot/backend
   npm install cors
   ```

3. **Restart backend:**
   ```bash
   # Stop: Ctrl+C
   npm start
   ```

4. **Test dari browser:**
   Buka: http://localhost:3001/api/health
   Harus muncul JSON response

---

### **Error: "Username atau password salah"**

**Penyebab:** Data user di database salah atau tidak ada

**Solusi:**

```bash
# Cek data user di database
cd /Users/user/Documents/megaperabot/backend
sqlite3 megaperabot.db "SELECT * FROM users;"
```

Harus ada user:
- admin / admin123 / Admin
- toko / toko123 / Karyawan Toko
- gudang / gudang123 / Karyawan Gudang

Kalau tidak ada, jalankan:
```bash
node init-db.js
```

---

### **Error: Browser Console menunjukkan CORS error**

**Penyebab:** Backend tidak mengizinkan request dari frontend

**Solusi:**

Pastikan `server-sqlite.js` ada code ini:

```javascript
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 📊 UNTUK PENULISAN SKRIPSI

### **BAB 3: PERANCANGAN SISTEM**

**3.1 Arsitektur Sistem**

Sistem Manajemen Stok MEGA PERABOT menggunakan **arsitektur 3-Tier** yang terdiri dari:

1. **Data Layer (Database)**
   - DBMS: SQLite 3
   - Tool: DB Browser for SQLite
   - Fungsi: Menyimpan data persistent (produk, user, transaksi)

2. **Business Logic Layer (Backend API)**
   - Framework: Node.js + Express.js
   - Port: http://localhost:3001
   - Fungsi: REST API, autentikasi, validasi, CRUD operations

3. **Presentation Layer (Frontend)**
   - Framework: React + TypeScript
   - Port: http://localhost:5173
   - Fungsi: User Interface, interaksi dengan user

**3.2 Database Schema**

Tabel utama:
- `products`: Data produk (kode_barang, nama_barang, stok, harga, dll.)
- `users`: Data pengguna (username, password, role, full_name)
- `orders`: Data pesanan pelanggan
- `restock_history`: History restock produk

**3.3 API Endpoints**

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| POST | /api/auth/login | Autentikasi user |
| GET | /api/products | Ambil semua produk |
| GET | /api/dashboard/stats | Ambil statistik dashboard |
| POST | /api/orders | Buat pesanan baru |
| POST | /api/restock | Restock produk |

**3.4 Role-Based Access Control**

| Role | Akses Halaman |
|------|---------------|
| Admin | Dashboard, Pesanan Pemasok |
| Karyawan Toko | Dashboard, Pesanan Baru |
| Karyawan Gudang | Dashboard, Restock |

---

## ✅ KESIMPULAN

Sistem MEGA PERABOT berhasil mengintegrasikan:
- ✅ **Database SQLite** (persistensi data)
- ✅ **Backend API Express.js** (business logic)
- ✅ **Frontend React** (user interface)

Semua komponen **SALING TERHUBUNG** dan berfungsi dengan baik untuk:
- Mengelola stok produk
- Mencatat transaksi penjualan
- Melakukan restock otomatis
- Menampilkan laporan real-time

---

## 📞 DUKUNGAN

Jika ada error atau pertanyaan, cek:
1. Backend masih jalan: http://localhost:3001/api/health
2. Browser console (F12) untuk error log
3. Terminal backend untuk server log

---

**© 2026 MEGA PERABOT - Sistem Manajemen Stok & Pemesanan**
