# ✅ CHECKLIST FIX ERROR - MEGA PERABOT

## 🎯 STATUS ERROR SAAT INI

Anda mengalami error:
```
❌ API Call Error: TypeError: Failed to fetch
❌ Login error: Error: Tidak dapat terhubung ke server
```

**Root Cause:** Frontend tidak bisa connect ke backend di `http://localhost:3001`

---

## 📋 LANGKAH PERBAIKAN - IKUTI STEP BY STEP

### ✅ **STEP 1: Pastikan Backend Database Sudah Terisi**

#### Di Terminal VS Code Backend:

```bash
# 1. Masuk ke folder backend
cd /Users/user/Documents/megaperabot/backend

# 2. Stop backend kalau sedang jalan (tekan Ctrl+C)

# 3. Hapus database lama (kalau ada)
rm megaperabot.db

# 4. Buat script inisialisasi database
cat > init-database.js << 'ENDOFFILE'
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'megaperabot.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Initializing database...');

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert demo users
  const users = [
    ['admin', 'admin123', 'Administrator', 'Admin'],
    ['toko', 'toko123', 'Karyawan Toko', 'Karyawan Toko'],
    ['gudang', 'gudang123', 'Karyawan Gudang', 'Karyawan Gudang']
  ];

  const userStmt = db.prepare('INSERT OR IGNORE INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)');
  users.forEach(user => userStmt.run(user));
  userStmt.finalize();

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
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
    )
  `);

  // Insert demo products
  const products = [
    ['P001', 'Panci Set Stainless Steel', 'Peralatan Masak', 'PT Indo Makmur', 150000, 225000, 50, 0, 0, 50, 0, 0, 0],
    ['P002', 'Kompor Gas 2 Tungku', 'Peralatan Masak', 'CV Berkah Jaya', 350000, 525000, 30, 0, 0, 30, 0, 0, 0],
    ['P003', 'Rice Cooker Digital', 'Elektronik', 'PT Maju Sentosa', 400000, 600000, 25, 0, 0, 25, 0, 0, 0],
    ['P004', 'Blender 3in1', 'Elektronik', 'CV Sinar Terang', 250000, 375000, 40, 0, 0, 40, 0, 0, 0],
    ['P005', 'Wajan Anti Lengket 28cm', 'Peralatan Masak', 'PT Indo Makmur', 120000, 180000, 60, 0, 0, 60, 0, 0, 0],
    ['P006', 'Set Pisau Dapur 6pcs', 'Peralatan Masak', 'CV Berkah Jaya', 180000, 270000, 35, 0, 0, 35, 0, 0, 0],
    ['P007', 'Dispenser Air Panas Dingin', 'Elektronik', 'PT Maju Sentosa', 800000, 1200000, 15, 0, 0, 15, 0, 0, 0],
    ['P008', 'Kulkas 2 Pintu', 'Elektronik', 'PT Maju Sentosa', 2500000, 3750000, 10, 0, 0, 10, 0, 0, 0],
    ['P009', 'Microwave Oven', 'Elektronik', 'CV Sinar Terang', 900000, 1350000, 20, 0, 0, 20, 0, 0, 0],
    ['P010', 'Teko Listrik Stainless', 'Elektronik', 'PT Indo Makmur', 150000, 225000, 45, 0, 0, 45, 0, 0, 0],
    ['P011', 'Rak Piring Stainless', 'Peralatan Dapur', 'CV Berkah Jaya', 100000, 150000, 50, 0, 0, 50, 0, 0, 0],
    ['P012', 'Tempat Bumbu 12pcs', 'Peralatan Dapur', 'PT Indo Makmur', 80000, 120000, 55, 0, 0, 55, 0, 0, 0],
    ['P013', 'Toples Kaca Set 5pcs', 'Peralatan Dapur', 'CV Berkah Jaya', 120000, 180000, 40, 0, 0, 40, 0, 0, 0],
    ['P014', 'Talenan Kayu Premium', 'Peralatan Dapur', 'PT Indo Makmur', 60000, 90000, 70, 0, 0, 70, 0, 0, 0],
    ['P015', 'Termos Air 2 Liter', 'Peralatan Dapur', 'CV Sinar Terang', 90000, 135000, 50, 0, 0, 50, 0, 0, 0]
  ];

  const prodStmt = db.prepare(`
    INSERT OR IGNORE INTO products 
    (kode_barang, nama_barang, kategori, pemasok, harga_beli, harga_jual, stok_awal, stok_masuk, stok_keluar, stok_akhir, jumlah_terjual, penjualan, keuntungan) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  products.forEach(product => prodStmt.run(product));
  prodStmt.finalize();

  console.log('✅ Database initialized successfully!');
  console.log('📊 Created:');
  console.log('   - 3 demo users (admin, toko, gudang)');
  console.log('   - 15 demo products');
  
  db.close(() => {
    console.log('✅ Database closed');
    process.exit(0);
  });
});
ENDOFFILE

# 5. Jalankan inisialisasi database
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

### ✅ **STEP 2: Jalankan Backend Server**

```bash
# Di terminal backend yang sama
npm start
```

**✅ Harus muncul:**
```
🚀 ========================================
🚀 MEGA PERABOT Backend Server
🚀 Server running on http://localhost:3001
🚀 ========================================
✅ Database connected: /Users/user/Documents/megaperabot/backend/megaperabot.db
```

**🔴 JANGAN TUTUP TERMINAL INI!**

---

### ✅ **STEP 3: Test Backend di Terminal Baru**

Buka terminal baru (Command+T), lalu:

```bash
# Test 1: Health check
curl http://localhost:3001/api/health

# Test 2: Login admin
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test 3: Get products
curl http://localhost:3001/api/products
```

**✅ Semua harus return JSON data!**

---

### ✅ **STEP 4: Test di Browser dengan File HTML**

1. **Buka file:** `test-backend.html` di browser
2. **Klik tombol:**
   - "Test /api/health" → Harus muncul JSON success ✅
   - "Login sebagai Admin" → Harus muncul user data ✅
   - "Test /api/products" → Harus muncul array produk ✅

**Kalau semua test BERHASIL, lanjut ke STEP 5!**

---

### ✅ **STEP 5: Refresh Frontend di Figma Make**

1. **Di browser Figma Make:**
   - Tekan **F5** atau **Command+R** untuk refresh
   
2. **Login dengan:**
   - Username: `admin`
   - Password: `admin123`

3. **Harus redirect ke Dashboard** dengan data produk dari database!

---

## 🔧 TROUBLESHOOTING

### ❌ **Error: "EADDRINUSE: port 3001 already in use"**

```bash
# Matikan proses yang menggunakan port 3001
lsof -ti :3001 | xargs kill -9

# Jalankan backend lagi
npm start
```

---

### ❌ **Error: "no such table: users"**

Backend berjalan tapi database kosong.

```bash
# Stop backend (Ctrl+C)
# Jalankan init database
node init-database.js
# Start backend lagi
npm start
```

---

### ❌ **curl test gagal / "Connection refused"**

Backend tidak jalan dengan benar.

```bash
# Cek proses backend
ps aux | grep node

# Kalau tidak ada, jalankan:
npm start
```

---

### ❌ **Login di frontend masih error "Failed to fetch"**

Kemungkinan browser security blocking localhost.

**Solusi:**

1. **Pastikan backend jalan** (cek terminal ada tulisan "Server running")
2. **Test dengan curl dulu** (harus berhasil)
3. **Clear browser cache:** 
   - Chrome/Edge: Ctrl+Shift+Del → Clear browsing data
   - Safari: Command+Option+E
4. **Coba browser lain** (Chrome, Firefox, Safari)
5. **Disable browser extensions** (ad blocker, privacy tools)

---

## 📸 SCREENSHOT UNTUK VERIFIKASI

### ✅ **Screenshot 1: Terminal Backend**
Harus ada tulisan:
```
🚀 Server running on http://localhost:3001
✅ Database connected
```

### ✅ **Screenshot 2: Curl Test Login**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "fullName": "Administrator",
    "role": "Admin"
  }
}
```

### ✅ **Screenshot 3: test-backend.html**
Semua test menunjukkan "✅ SUCCESS!"

### ✅ **Screenshot 4: Frontend Login Success**
Dashboard muncul dengan tabel produk dari database

---

## 🆘 JIKA MASIH ERROR

**Kirim screenshot:**
1. ✅ Terminal backend setelah `npm start`
2. ✅ Terminal test setelah `curl` command
3. ✅ Browser console (F12 → Console tab)
4. ✅ Network tab di browser (F12 → Network tab)

---

## 📝 CHECKLIST AKHIR

Sebelum presentasi skripsi, pastikan:

- [ ] Backend berjalan tanpa error
- [ ] Database terisi dengan 3 users dan 15 products
- [ ] Test login semua role (admin, toko, gudang) berhasil
- [ ] Dashboard menampilkan statistik real-time
- [ ] Form pesanan bisa submit
- [ ] Form restock bisa submit
- [ ] Role-based access berfungsi (toko tidak bisa akses restock)
- [ ] Screenshot semua fitur untuk dokumentasi skripsi

---

**Coba sekarang dari STEP 1 dan kirim screenshot hasil tiap step!** 🚀
