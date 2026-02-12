# 🏪 MEGA PERABOT - Sistem Manajemen Stok

Sistem manajemen stok dan pemesanan dengan arsitektur 3-tier:
- **Database:** SQLite (megaperabot.db)
- **Backend:** Node.js + Express (Port 3001)
- **Frontend:** React + TypeScript + Vite (Port 3000)

---

## 🚀 Quick Start (Auto)

### **Windows:**
```bash
# Double-click file ini:
start.bat
```

### **Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Browser akan otomatis buka http://localhost:3000**

---

## 🛠️ Manual Setup (Jika Script Gagal)

### **Step 1: Setup Backend**

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run init-db
npm start
```

**Tunggu sampai muncul:**
```
🚀  Server: http://localhost:3001
```

### **Step 2: Setup Frontend**

```bash
# Terminal 2 - Frontend (terminal baru)
npm install
npm run dev
```

**Tunggu sampai muncul:**
```
➜  Local: http://localhost:3000/
```

### **Step 3: Test & Login**

1. **Test Backend:**
   ```
   http://localhost:3001/api/health
   ```
   Harus return: `{"status":"ok","database":"connected"}`

2. **Buka Aplikasi:**
   ```
   http://localhost:3000
   ```

3. **Login dengan akun demo:**
   | Role | Username | Password |
   |------|----------|----------|
   | Admin | `megaperabot` | `admin123` |
   | Karyawan Toko | `karyawan01` | `toko123` |
   | Karyawan Gudang | `staffgudang01` | `gudang123` |

---

## 🚨 Troubleshooting Error

### **Error: "Failed to fetch"**

**Penyebab:** Backend belum jalan

**Solusi Cepat:**
```bash
cd backend
npm start
```

**Baca:** `QUICK-FIX.md` untuk solusi detail

---

### **Error: "Cannot find module 'express'"**

**Solusi:**
```bash
cd backend
npm install
```

---

### **Error: "SQLITE_CANTOPEN"**

**Solusi:**
```bash
cd backend
npm run init-db
```

---

### **Error: "Port 3001 already in use"**

**Solusi Windows:**
```powershell
taskkill /F /IM node.exe
```

**Solusi Mac/Linux:**
```bash
lsof -ti:3001 | xargs kill -9
```

Kemudian jalankan backend lagi: `npm start`

---

## 📁 Struktur Project

```
mega-perabot/
├── backend/                      # Backend API
│   ├── server-sqlite.js         # Express server
│   ├── init-db.js               # Database initialization
│   ├── database-sqlite.sql      # Database schema
│   ├── package.json             # Backend dependencies
│   ├── test-connection.js       # Test script
│   └── megaperabot.db          # SQLite database (auto-generated)
├── src/                         # Frontend source
│   ├── pages/                   # Halaman utama
│   │   ├── Login.tsx           # Halaman login
│   │   ├── Dashboard.tsx       # Dashboard statistik
│   │   ├── NewOrder.tsx        # Form pesanan baru
│   │   ├── Restock.tsx         # Form restock
│   │   └── SupplierOrder.tsx   # Form pesanan pemasok
│   ├── components/             # Komponen reusable
│   ├── services/               # API services
│   │   └── api.ts             # API client
│   └── types/                 # TypeScript types
├── start.bat                   # Auto-start (Windows)
├── start.sh                    # Auto-start (Mac/Linux)
├── QUICK-FIX.md               # Solusi cepat error
├── TROUBLESHOOTING-KONEKSI.md # Troubleshooting lengkap
├── PANDUAN-SETUP-LENGKAP.md   # Panduan komprehensif
└── package.json               # Frontend dependencies
```

---

## 🧪 Testing Backend

```bash
cd backend
npm test
```

**Output yang benar:**
```
✅ Backend is running!
   Status Code: 200
   Response: { "status": "ok", "database": "connected" }

🎉 BACKEND CONNECTION: SUCCESS!
```

---

## 📊 Data Produk (5 Fast Moving Items)

| Kode | Nama Produk | Kategori | Stok | Harga |
|------|-------------|----------|------|-------|
| PK0018 | KESET BIASA | Alat Kebersihan | 28 | Rp 10.000 |
| PK0034 | PEL BIASA NO BRAND | Alat Kebersihan | 15 | Rp 20.000 |
| PK0033 | PEL NAGOYA KECIL | Alat Kebersihan | 22 | Rp 35.000 |
| PK0006 | KAIN LAP BIASA | Alat Kebersihan | 43 | Rp 8.000 |
| PK0030 | PEL NAGATA KECIL | Alat Kebersihan | 18 | Rp 32.000 |

**Pemasok:**
- PT Dialogue Home
- Toko Maju Jaya

---

## 🔑 Role & Permission

### **Admin (megaperabot)**
- ✅ Dashboard (semua statistik)
- ✅ Pesanan Baru (buat pesanan customer)
- ✅ Restock (tambah stok dari gudang)
- ✅ Pesanan Pemasok (order dari supplier)

### **Karyawan Toko (karyawan01)**
- ✅ Dashboard (statistik terbatas)
- ✅ Pesanan Baru (buat pesanan customer)
- ❌ Restock
- ❌ Pesanan Pemasok

### **Karyawan Gudang (staffgudang01)**
- ✅ Dashboard (statistik stok)
- ❌ Pesanan Baru
- ✅ Restock (tambah stok)
- ✅ Pesanan Pemasok (order dari supplier)

---

## 🌐 API Endpoints

### **Auth**
- `POST /api/auth/login` - Login user

### **Products**
- `GET /api/products` - Get semua produk
- `GET /api/products/:kode_barang` - Get produk by kode

### **Customer Orders**
- `POST /api/orders/customer` - Buat pesanan customer
- `GET /api/orders` - Get semua pesanan

### **Restock**
- `POST /api/restock` - Restock produk
- `GET /api/restock` - Get history restock

### **Supplier Orders**
- `POST /api/orders/supplier` - Buat pesanan ke supplier
- `GET /api/orders/supplier` - Get semua pesanan supplier

### **Health Check**
- `GET /api/health` - Cek status backend & database

**Detail API:** Lihat `backend/README.md`

---

## 🎯 Fitur Utama

1. **Authentication & Authorization**
   - Login dengan role-based access
   - Session management

2. **Dashboard Real-time**
   - Total produk, penjualan, keuntungan
   - Grafik penjualan per produk
   - Top selling products

3. **Pesanan Baru (Customer Order)**
   - Pilih produk dari dropdown
   - Input quantity
   - Otomatis kurangi stok
   - Update penjualan & keuntungan

4. **Restock**
   - Tambah stok produk
   - Log history restock
   - Update status stok (Tersedia/Stok Rendah/Habis)

5. **Pesanan Pemasok**
   - Order produk dari supplier
   - Track status pesanan

---

## 📚 Dokumentasi Lengkap

| File | Deskripsi |
|------|-----------|
| `QUICK-FIX.md` | ⚡ Solusi cepat error "Failed to fetch" |
| `TROUBLESHOOTING-KONEKSI.md` | 🔧 Troubleshooting lengkap |
| `PANDUAN-SETUP-LENGKAP.md` | 📖 Tutorial setup komprehensif |
| `CHECKLIST-SETUP.md` | ✅ Checklist step-by-step |
| `CARA-SAMBUNG-DATABASE.md` | 💾 Penjelasan koneksi database |
| `backend/README.md` | 🌐 Dokumentasi API backend |

---

## 💻 Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Recharts (grafik)
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- SQLite3
- CORS enabled

---

## 🛑 Stop Server

**Windows:**
- Tutup terminal backend dan frontend
- Atau: `Ctrl+C` di masing-masing terminal

**Mac/Linux:**
```bash
# Kill all node processes
killall node
```

---

## 🔄 Reset Database

```bash
cd backend
rm megaperabot.db        # Hapus database
npm run init-db          # Buat database baru
npm start                # Restart backend
```

---

## 📞 Bantuan Lebih Lanjut

**Jika masih ada error:**

1. Baca file `QUICK-FIX.md` untuk solusi cepat
2. Baca file `TROUBLESHOOTING-KONEKSI.md` untuk troubleshooting detail
3. Screenshot error dan terminal output

**Checklist sebelum bertanya:**
- [ ] Node.js sudah terinstall (`node -v`)
- [ ] Backend sudah diinstall (`cd backend && npm install`)
- [ ] Database sudah diinisialisasi (`npm run init-db`)
- [ ] Backend jalan (`npm start`)
- [ ] Test health check berhasil (`localhost:3001/api/health`)
- [ ] Frontend sudah diinstall (`npm install`)
- [ ] Frontend jalan (`npm run dev`)

---

## 🎉 Verifikasi Sukses

**Sistem berjalan sempurna jika:**

✅ Backend terminal menunjukkan: `🚀 Server: http://localhost:3001`  
✅ Frontend terminal menunjukkan: `➜ Local: http://localhost:3000/`  
✅ Browser test: `localhost:3001/api/health` return JSON  
✅ Browser test: `localhost:3001/api/products` return array  
✅ Halaman login muncul di `localhost:3000`  
✅ Login berhasil dengan `megaperabot` / `admin123`  
✅ Dashboard menampilkan data (Total Produk: 5)  
✅ Pesanan baru bisa dibuat dan stok berkurang  

---

**Dibuat dengan ❤️ untuk MEGA PERABOT**  
**Version 1.0 - February 2026**
