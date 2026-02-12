# 🚀 Quick Guide: Kelola Produk

## ⚡ Super Cepat - 3 Menit Setup

### **1️⃣ Start Backend & Frontend**

**Terminal 1:**
```bash
cd backend
npm start
```
✅ Backend running di `http://localhost:3001`

**Terminal 2:**
```bash
npm run dev
```
✅ Frontend running di `http://localhost:3000`

---

### **2️⃣ Login sebagai Admin**

1. Buka browser: `http://localhost:3000`
2. Login dengan:
   - Username: `megaperabot`
   - Password: `admin123`

---

### **3️⃣ Akses Kelola Produk**

1. Klik menu **"Kelola Produk"** di navigation bar
2. Atau langsung ke: `http://localhost:3000/product-management`

---

## 🎯 Fitur Utama

### ✅ **Tambah Produk Baru**

1. Klik tombol **"+ Tambah Produk"**
2. Isi form:
   - **Kode Barang:** PK0100 *(unik, tidak boleh duplikat)*
   - **Nama Produk:** Sapu Lidi
   - **Kategori:** Alat Kebersihan *(dropdown)*
   - **Pemasok:** PT Dialogue Home
   - **Harga Beli:** 5000 *(Rp)*
   - **Harga Jual:** 10000 *(harus > harga beli)*
   - **Stok Awal:** 50
3. Lihat preview margin: **Rp 5.000 (100%)**
4. Klik **"Tambah Produk"**
5. ✅ Toast notification: **"Produk berhasil ditambahkan!"**

---

### ✏️ **Edit Produk**

1. Cari produk di tabel
2. Klik tombol **"Edit"** di baris produk
3. Ubah data yang diperlukan
   - ⚠️ Kode barang **TIDAK BISA** diubah
4. Klik **"Simpan Perubahan"**
5. ✅ Toast: **"Produk berhasil diperbarui!"**

---

### 🗑️ **Hapus Produk**

1. Cari produk di tabel
2. Klik tombol **"Hapus"** di baris produk
3. Alert dialog muncul dengan warning
4. Konfirmasi dengan klik **"Hapus Produk"**
5. ✅ Toast: **"Produk berhasil dihapus!"**

---

### 🔍 **Search Produk**

1. Ketik di search box:
   - Nama produk (contoh: **KESET**)
   - Kode barang (contoh: **PK0018**)
   - Nama pemasok (contoh: **Dialogue**)
2. Filter otomatis real-time

---

### 🏷️ **Filter by Kategori**

1. Klik dropdown **"Semua Kategori"**
2. Pilih kategori (contoh: **Alat Kebersihan**)
3. Tabel auto-filter

---

## 📊 Dashboard Cards

Melihat statistik produk real-time:

- **Total Produk:** Jumlah semua produk
- **Stok Tersedia:** Produk dengan stok ≥ 10 *(hijau)*
- **Stok Rendah:** Produk dengan stok < 10 *(orange)*
- **Stok Habis:** Produk dengan stok = 0 *(merah)*

---

## 🎨 Visual Indicators

### **Status Badge:**
- 🟢 **Tersedia** - Stok ≥ 10
- 🟠 **Stok Rendah** - Stok < 10
- 🔴 **Habis** - Stok = 0

### **Color-coded Stock Numbers:**
```
Hijau  (≥10) : 28  ← Aman
Orange (<10) : 8   ← Perlu restock
Merah  (=0)  : 0   ← Habis
```

---

## ⚠️ Validasi & Rules

### **Tambah/Edit Produk:**

✅ **Wajib diisi:**
- Kode barang (hanya saat tambah)
- Nama produk
- Harga beli & jual

✅ **Rules:**
- Harga beli > 0
- Harga jual > 0
- **Harga jual HARUS > harga beli**
- Stok ≥ 0

❌ **Error jika:**
- Kode barang duplikat
- Harga jual ≤ harga beli
- Field wajib kosong

---

## 💡 Tips & Tricks

### **1. Lihat Margin Keuntungan:**
Saat isi harga beli & jual, preview otomatis muncul:
```
Margin Keuntungan: Rp 5.000 (100%)
```

### **2. Sort Tabel:**
Klik header kolom untuk sort (ascending/descending)

### **3. Kombinasi Search + Filter:**
Gunakan keduanya bersamaan untuk hasil lebih spesifik:
- Search: "PEL"
- Filter: "Alat Kebersihan"
- Result: Hanya produk PEL di kategori Alat Kebersihan

### **4. Stok Manual vs Restock:**
- **Edit Produk:** Update stok manual (untuk koreksi)
- **Menu Restock:** Tambah stok resmi dengan pencatatan

---

## 🚨 Troubleshooting

### **Error: "Failed to fetch"**
```
Solusi:
1. Pastikan backend running di http://localhost:3001
2. Check terminal backend, pastikan no error
3. Refresh browser (Ctrl+R)
```

### **Error: "Kode barang sudah digunakan"**
```
Solusi:
1. Ganti kode barang dengan yang unik
2. Check tabel untuk lihat kode yang sudah ada
```

### **Error: "Harga jual harus lebih tinggi dari harga beli"**
```
Solusi:
1. Pastikan harga_jual > harga_beli
2. Contoh BENAR: Beli=5000, Jual=10000
3. Contoh SALAH: Beli=10000, Jual=5000
```

### **Data tidak muncul di tabel**
```
Solusi:
1. Check console browser (F12)
2. Pastikan tidak ada error API
3. Reload halaman
4. Check database: SELECT * FROM products;
```

---

## 🎓 Test Scenario

### **Complete Flow Test:**

1. **Login Admin** ✅
   - megaperabot / admin123

2. **Tambah Produk** ✅
   - Kode: PK0999
   - Nama: Test Product
   - Beli: 1000, Jual: 2000
   - Stok: 100

3. **Search Produk** ✅
   - Ketik "Test Product"
   - Should appear in table

4. **Edit Produk** ✅
   - Ubah nama jadi "Test Product Updated"
   - Ubah harga jual jadi 2500

5. **Hapus Produk** ✅
   - Konfirmasi delete
   - Should disappear from table

**Expected:** Semua step berhasil tanpa error! 🎉

---

## 📚 Files Reference

**Frontend:**
- `/pages/ProductManagement.tsx` - Main page
- `/components/Layout.tsx` - Navigation menu
- `/App.tsx` - Routing
- `/services/api.ts` - API calls

**Backend:**
- `/backend/server-sqlite.js` - API endpoints
- `/backend/mega-perabot.db` - SQLite database

**Documentation:**
- `/FITUR-KELOLA-PRODUK.md` - Full features
- `/BACKEND-API-UPDATED.md` - API docs
- `/QUICK-GUIDE-KELOLA-PRODUK.md` - This file

---

## ⏱️ Estimated Time

| Task | Time |
|------|------|
| Setup (start backend+frontend) | 1 min |
| Login | 30 sec |
| Tambah 1 produk | 1 min |
| Edit 1 produk | 30 sec |
| Hapus 1 produk | 20 sec |
| Search/Filter | 10 sec |

**Total untuk full test:** ~3-5 menit

---

## ✅ Checklist

Sebelum demo/presentasi:

- [ ] Backend running di localhost:3001
- [ ] Frontend running di localhost:3000
- [ ] Login berhasil sebagai Admin
- [ ] Halaman Kelola Produk terbuka
- [ ] Test tambah produk baru
- [ ] Test edit produk
- [ ] Test search
- [ ] Test filter
- [ ] Test hapus produk
- [ ] Toast notifications muncul
- [ ] No error di console

**Jika semua ✅, siap demo!** 🎉

---

## 🎯 Key Features Highlight (untuk demo)

1. **Full CRUD** - Create, Read, Update, Delete
2. **Real-time Search** - Instant filtering
3. **Smart Validation** - Prevent errors
4. **Professional UI** - Clean & intuitive
5. **Toast Notifications** - Instant feedback
6. **Responsive Design** - Works on any screen
7. **Dashboard Stats** - Real-time metrics
8. **Margin Calculator** - Auto-calculate profit

---

**Need help? Check documentation files atau tanya saya! 😊**

Good luck with your demo! 🚀
