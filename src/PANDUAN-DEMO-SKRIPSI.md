# 🎓 PANDUAN LENGKAP DEMO SKRIPSI MEGA PERABOT

**Sistem Informasi Manajemen Stok dan Pemesanan MEGA PERABOT**  
*Perancangan Sistem untuk Meningkatkan Efisiensi Operasional Toko Peralatan Rumah Tangga*

---

## 📋 RINGKASAN SISTEM

### **Data Sistem:**
- ✅ **5 Produk Fast Moving** (berdasarkan analisis 3 bulan):
  - PK0018 - KESET BIASA
  - PK0034 - PEL BIASA NO BRAND
  - PK0033 - PEL NAGOYA KECIL
  - PK0006 - KAIN LAP BIASA
  - PK0030 - PEL NAGATA KECIL
  
- ✅ **96 Transaksi** (Oktober - Desember 2025)
- ✅ **2 Pemasok**: PT Dialogue Home, Toko Maju Jaya
- ✅ **3 User Roles**:
  - Admin: megaperabot / admin123
  - Karyawan Toko: karyawan01 / toko123
  - Karyawan Gudang: staffgudang01 / gudang123

### **Arsitektur Sistem:**
```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Frontend      │ ───► │   Backend API    │ ───► │  Database       │
│   (React)       │      │   (Node.js)      │      │  (SQLite)       │
│   Figma Make    │      │   VSCode         │      │  DB Browser     │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

---

## 🚀 CARA MENJALANKAN DEMO

### **OPSI A: DEMO TANPA BACKEND (RECOMMENDED untuk presentasi)**

**Keuntungan:**
- ✅ Langsung jalan tanpa setup
- ✅ Tidak perlu backend/database
- ✅ Data sudah lengkap (96 transaksi)
- ✅ Cocok untuk demo presentasi

**Cara Menggunakan:**
1. **Buka aplikasi di Figma Make** (sudah jalan!)
2. **Login dengan salah satu akun:**
   - **Admin**: `megaperabot` / `admin123`
   - **Karyawan Toko**: `karyawan01` / `toko123`
   - **Karyawan Gudang**: `staffgudang01` / `gudang123`

3. **Fitur yang tersedia:**
   - ✅ Dashboard dengan statistik real-time
   - ✅ Data produk 5 fast moving items
   - ✅ History 96 transaksi (Oktober-Desember 2025)
   - ✅ Form pesanan baru
   - ✅ Form restock
   - ✅ Form pesanan pemasok
   - ✅ Pencarian produk

**Mode yang aktif:** `USE_MOCK_DATA = true` (sudah diset di `/services/api.ts`)

**Untuk mengubah ke mode real backend:** Edit file `/services/api.ts` baris 7:
```javascript
const USE_MOCK_DATA = false; // Ubah dari true ke false
```

---

### **OPSI B: DEMO DENGAN BACKEND + DATABASE**

**Keuntungan:**
- ✅ Full integration dengan database SQLite
- ✅ Data persistent (tidak hilang saat refresh)
- ✅ Testing API endpoints
- ✅ Cocok untuk demo teknis

#### **STEP 1: Generate Backend (OTOMATIS dengan script)**

**Di folder Figma Make ini**, jalankan script generate backend:

```bash
# Jalankan script
bash generate-backend.sh
```

**Output:**
```
✅ Folder structure created
✅ package.json created
✅ .env created
✅ server.js created
✅ config/database.js created
✅ middleware/cors.js created
✅ routes/auth.js created
✅ routes/products.js created
✅ routes/transactions.js created
✅ routes/supplierOrders.js created
✅ routes/restock.js created
✅ README.md created

📁 Location: ./megaperabot-backend/
```

#### **STEP 2: Install Dependencies**

```bash
cd megaperabot-backend
npm install
```

#### **STEP 3: Copy Database**

Copy file `megaperabot.db` dari DB Browser ke folder `megaperabot-backend/`

```bash
# Atau jika sudah ada database di folder lain:
cp /path/to/megaperabot.db ./megaperabot.db
```

#### **STEP 4: Jalankan Backend**

```bash
npm start
```

**Expected Output:**
```
╔═══════════════════════════════════════════════════════╗
║         MEGA PERABOT - BACKEND API SERVER            ║
╠═══════════════════════════════════════════════════════╣
║  ✅ Server running on: http://localhost:3001         ║
║  ✅ Environment: DEVELOPMENT                          ║
║  ✅ Database: ./megaperabot.db                        ║
║  ✅ API Prefix: /api                                  ║
╠═══════════════════════════════════════════════════════╣
║  Available Endpoints:                                 ║
║  • POST   /api/auth/login                             ║
║  • GET    /api/products                               ║
║  • GET    /api/transactions                           ║
║  • POST   /api/transactions                           ║
║  • GET    /api/supplier-orders                        ║
║  • POST   /api/supplier-orders                        ║
║  • POST   /api/restock                                ║
╚═══════════════════════════════════════════════════════╝
```

#### **STEP 5: Update Frontend ke Mode Production**

Edit `/services/api.ts` baris 7:
```javascript
const USE_MOCK_DATA = false; // Ubah dari true ke false
```

#### **STEP 6: Test API**

Buka browser: http://localhost:3001/api/health

**Expected response:**
```json
{
  "status": "OK",
  "message": "MEGA PERABOT API is running",
  "timestamp": "2025-02-03T..."
}
```

---

## 🎯 SKENARIO DEMO untuk PRESENTASI SKRIPSI

### **DEMO 1: Login & Dashboard (2 menit)**

1. **Tampilkan halaman login**
   - Jelaskan 3 role pengguna
   - Login sebagai **Admin** (`megaperabot` / `admin123`)

2. **Dashboard Admin**
   - Tampilkan statistik:
     - Total 5 Produk
     - 2 Produk Low Stock (< 10)
     - Total Penjualan: Rp 2.470.000
     - Total Profit: Rp 944.500
     - Total 107 Unit Terjual
   - Jelaskan fast moving items

### **DEMO 2: Monitoring Stok (1 menit)**

1. **Klik menu "Stock Monitoring"**
   - Tampilkan tabel 5 produk
   - Highlight produk low stock (PEL NAGOYA KECIL: 8 unit, PEL NAGATA KECIL: 3 unit)
   - Jelaskan fitur pencarian

### **DEMO 3: Laporan Penjualan (2 menit)**

1. **Klik menu "Sales Report"**
   - Tampilkan data 96 transaksi
   - Filter by date: Oktober - Desember 2025
   - Jelaskan metode pembayaran: Cash, QRIS, Transfer Bank

### **DEMO 4: Pesanan Baru - Karyawan Toko (2 menit)**

1. **Logout sebagai Admin**
2. **Login sebagai Karyawan Toko** (`karyawan01` / `toko123`)
3. **Klik "New Order"**
   - Pilih produk: KESET BIASA
   - Quantity: 2
   - Payment: Cash
   - Submit → Berhasil!
   - Tampilkan notifikasi sukses

### **DEMO 5: Restock - Karyawan Gudang (2 menit)**

1. **Logout sebagai Karyawan Toko**
2. **Login sebagai Karyawan Gudang** (`staffgudang01` / `gudang123`)
3. **Klik "Restock"**
   - Pilih produk: PEL NAGATA KECIL (stok rendah!)
   - Quantity: 20
   - Notes: "Restock urgent - stok hampir habis"
   - Submit → Berhasil!

### **DEMO 6: Pesanan Pemasok - Admin (2 menit)**

1. **Logout sebagai Karyawan Gudang**
2. **Login kembali sebagai Admin**
3. **Klik "Supplier Orders"**
   - Create new order
   - Product: PEL NAGOYA KECIL
   - Quantity: 50
   - Supplier: Toko Maju Jaya
   - Submit → Berhasil!

---

## 📊 DATA untuk PEMBAHASAN SKRIPSI

### **Analisis Fast Moving Items (3 bulan):**

| Kode | Produk | Terjual | Penjualan | Profit | Pemasok |
|------|--------|---------|-----------|--------|---------|
| PK0018 | KESET BIASA | 35 | Rp 350.000 | Rp 192.500 | PT Dialogue Home |
| PK0034 | PEL BIASA NO BRAND | 26 | Rp 520.000 | Rp 234.000 | PT Dialogue Home |
| PK0033 | PEL NAGOYA KECIL | 13 | Rp 455.000 | Rp 195.000 | Toko Maju Jaya |
| PK0006 | KAIN LAP BIASA | 19 | Rp 95.000 | Rp 57.000 | Toko Maju Jaya |
| PK0030 | PEL NAGATA KECIL | 14 | Rp 1.050.000 | Rp 266.000 | Toko Maju Jaya |

**Total:** 107 unit, Rp 2.470.000 penjualan, Rp 944.500 profit

### **Distribusi Transaksi:**
- Oktober 2025: 35 transaksi
- November 2025: 30 transaksi
- Desember 2025: 31 transaksi
- **Total: 96 transaksi**

### **Metode Pembayaran:**
- Cash: ~40%
- QRIS: ~30%
- Transfer Bank: ~30%

---

## 🔧 TROUBLESHOOTING

### **Problem 1: Backend tidak konek**
**Solusi:** Gunakan mode mock data (OPSI A)
```javascript
// Di /services/api.ts
const USE_MOCK_DATA = true;
```

### **Problem 2: Database error**
**Solusi:** Pastikan `megaperabot.db` ada di folder backend
```bash
ls -la megaperabot.db
```

### **Problem 3: CORS error**
**Solusi:** Sudah dihandle di backend, tapi pastikan frontend URL ada di `.env`:
```
CORS_ORIGINS=http://localhost:5173,https://v0.app,https://figma.com
```

### **Problem 4: Port 3001 sudah dipakai**
**Solusi:** Ubah port di `.env`:
```
PORT=3002
```
Dan update di frontend `/services/api.ts`:
```javascript
const API_BASE_URL = 'http://localhost:3002/api';
```

---

## ✅ CHECKLIST PERSIAPAN DEMO

**Sebelum Presentasi:**
- [ ] Test login semua role (Admin, Toko, Gudang)
- [ ] Cek data produk tampil semua (5 items)
- [ ] Cek transaksi 96 data muncul
- [ ] Test form pesanan baru
- [ ] Test form restock
- [ ] Test form pesanan pemasok
- [ ] Test fitur pencarian
- [ ] Screenshot untuk backup slide

**Backup Plan:**
- [ ] Siapkan screenshot semua halaman
- [ ] Print data transaksi (96 rows)
- [ ] Backup database `.db` file
- [ ] Video recording demo (optional)

---

## 🎓 POIN PEMBAHASAN SKRIPSI

### **1. Latar Belakang**
- Toko MEGA PERABOT masih manual (Excel/tulis tangan)
- Kesulitan tracking stok & pesanan
- Butuh sistem terintegrasi

### **2. Tujuan**
- Meningkatkan efisiensi operasional
- Mempermudah monitoring stok
- Mempercepat proses pesanan
- Menyediakan laporan real-time

### **3. Metodologi**
- Analisis data transaksi 3 bulan
- Identifikasi 5 fast moving items
- Perancangan sistem 3-tier architecture
- Implementasi berbasis web (React + Node.js + SQLite)

### **4. Hasil & Manfaat**
- ✅ Dashboard real-time
- ✅ 3 role user dengan akses berbeda
- ✅ Otomasi pencatatan transaksi
- ✅ Alert low stock
- ✅ Laporan penjualan otomatis
- ✅ Tracking pesanan pemasok

### **5. Kesimpulan**
- Sistem berhasil meningkatkan efisiensi
- Mengurangi human error
- Mempercepat pengambilan keputusan
- Siap untuk implementasi

---

## 📞 SUPPORT

Jika ada masalah saat demo:
1. **Gunakan mode mock data** (paling aman untuk presentasi)
2. **Restart backend** jika error
3. **Refresh browser** jika UI tidak update
4. **Gunakan screenshot backup** jika sistem down

---

**🎉 SUKSES untuk DEMO SKRIPSI Anda! 🎉**

**Tips Terakhir:**
- Latihan demo 2-3x sebelum presentasi
- Siapkan penjelasan untuk setiap fitur
- Highlight benefit untuk MEGA PERABOT
- Tunjukkan data 96 transaksi sebagai bukti sistem sudah siap pakai

**Good luck! 🚀**
