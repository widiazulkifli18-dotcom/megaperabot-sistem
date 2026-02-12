# 🎯 CHEAT SHEET DEMO SKRIPSI

**Quick Reference untuk Presentasi & Sidang**

---

## 🔐 LOGIN CREDENTIALS (HAFAL INI!)

```
┌──────────────────┬─────────────────┬──────────────┐
│ Role             │ Username        │ Password     │
├──────────────────┼─────────────────┼──────────────┤
│ Admin            │ megaperabot     │ admin123     │
│ Karyawan Toko    │ karyawan01      │ toko123      │
│ Karyawan Gudang  │ staffgudang01   │ gudang123    │
└──────────────────┴─────────────────┴──────────────┘
```

---

## ⚡ DEMO FLOW (15 MENIT)

### **1. Opening (2 min)**
```
✅ Buka: https://megaperabot-sistem.vercel.app
✅ Jelaskan: "Sistem berbasis web untuk efisiensi operasional"
✅ Tunjukkan: Halaman login professional
```

### **2. Admin Dashboard (3 min)**
```
✅ Login: megaperabot / admin123
✅ Tunjukkan: 4 dashboard cards
   - Total Produk: 5
   - Stok Tersedia: 3
   - Stok Rendah: 1
   - Stok Habis: 1
✅ Jelaskan: Real-time stats
✅ Tunjukkan: Tabel produk dengan color coding
```

### **3. Kelola Produk - HIGHLIGHT! (5 min)** ⭐

**A. Tambah Produk (2 min)**
```
✅ Klik: "+ Tambah Produk"
✅ Isi form:
   Kode:       PK0999
   Nama:       Demo Sidang
   Kategori:   Alat Kebersihan
   Pemasok:    PT Dialogue Home
   Harga Beli: 5000
   Harga Jual: 10000  ← Tunjukkan margin preview!
   Stok:       100

✅ Klik: "Tambah Produk"
✅ Toast: "Produk berhasil ditambahkan!" ✅
✅ Produk muncul di tabel!
```

**B. Search (1 min)**
```
✅ Ketik search: "KESET"
✅ Tunjukkan: Real-time filtering
```

**C. Edit (1 min)**
```
✅ Klik: Edit pada "Demo Sidang"
✅ Ubah harga jual: 12000
✅ Tunjukkan: Margin berubah
✅ Simpan
✅ Toast: "Produk berhasil diperbarui!" ✅
```

**D. Hapus (1 min)**
```
✅ Klik: Hapus pada "Demo Sidang"
✅ Tunjukkan: Confirmation dialog
✅ Konfirmasi
✅ Toast: "Produk berhasil dihapus!" ✅
```

### **4. Transaksi Karyawan Toko (3 min)**
```
✅ Logout Admin
✅ Login: karyawan01 / toko123
✅ Klik: "Pesanan Baru"
✅ Pilih produk: KESET BIASA
✅ Qty: 2
✅ Tambah ke keranjang
✅ Pilih metode: Cash
✅ Proses Transaksi
✅ Toast: "Transaksi berhasil!" ✅
```

### **5. Restock Karyawan Gudang (2 min)**
```
✅ Logout Toko
✅ Login: staffgudang01 / gudang123
✅ Klik: "Restock"
✅ Pilih produk: KESET BIASA
✅ Jumlah: 20
✅ Pemasok: PT Dialogue Home
✅ Simpan
✅ Toast: "Restock berhasil!" ✅
```

### **6. Verifikasi Real-time Update (1 min)**
```
✅ Logout Gudang
✅ Login kembali Admin
✅ Klik: "Kelola Produk"
✅ Tunjukkan: Stok KESET berubah!
   - Awal: 28
   - Terjual: -2 (transaksi toko)
   - Restock: +20 (gudang)
   - Akhir: 46 ✅
✅ Status berubah: "Tersedia" (hijau)
```

---

## 💡 KEY POINTS TO EMPHASIZE

### **Efisiensi Operasional:**
```
"Sistem ini meningkatkan efisiensi:
- Waktu transaksi: 3-5 menit → 30-60 detik ✅
- Cek stok: 5-10 menit → <30 detik ✅
- Laporan: 2-3 jam → 2-5 menit ✅
- Kerugian stockout: Rp 2-3 juta/bulan → Berkurang ✅"
```

### **Fitur Kelola Produk:**
```
"Fitur ini penting untuk skalabilitas:
- Dari 5 fast-moving items → 900+ SKU ✅
- CRUD tanpa coding ✅
- Search & filter real-time ✅
- Validation otomatis ✅"
```

### **Real-time Synchronization:**
```
"Semua perubahan langsung sinkron:
- Admin tambah produk → Toko bisa jual ✅
- Toko input transaksi → Stok berkurang ✅
- Gudang restock → Stok bertambah ✅"
```

### **Technology Stack:**
```
"Teknologi modern:
- Frontend: React.js + TypeScript ✅
- Styling: Tailwind CSS v4 ✅
- State: localStorage (persistent) ✅
- Deployment: Vercel (cloud) ✅"
```

---

## 🎨 VISUAL INDICATORS

### **Color Coding Status Stok:**
```
🟢 Hijau  = Stok ≥ 10  (Aman)
🟠 Orange = Stok < 10  (Rendah)
🔴 Merah  = Stok = 0   (Habis)

"Visual ini memudahkan Admin untuk quick decision-making"
```

### **Toast Notifications:**
```
✅ Hijau  = Success
❌ Merah  = Error
⚠️ Kuning = Warning

"Instant feedback untuk setiap action"
```

---

## 📊 DATA DEMO

### **5 Fast-Moving Items:**
```
PK0018 - KESET BIASA           (28 stok)  🟢
PK0034 - PEL BIASA NO BRAND    (15 stok)  🟢
PK0033 - PEL NAGOYA KECIL      (8 stok)   🟠
PK0006 - KAIN LAP BIASA        (34 stok)  🟢
PK0030 - PEL NAGATA KECIL      (3 stok)   🔴
```

### **Kontribusi Penjualan:**
```
"Kelima produk ini berkontribusi 30-40% dari total penjualan
meskipun hanya <1% dari 900+ SKU yang ada di toko"
```

---

## 🔥 ANTICIPATE QUESTIONS

### **Q: "Apakah data tersimpan permanen?"**
```
A: "Saat ini menggunakan localStorage untuk prototype.
    Untuk production, akan menggunakan database PostgreSQL
    atau MySQL yang di-host di cloud."
```

### **Q: "Bagaimana keamanan data?"**
```
A: "Sistem menggunakan:
    - Role-based access control (3 roles) ✅
    - Password authentication ✅
    - HTTPS encryption (Vercel) ✅
    - Future: JWT tokens untuk API security"
```

### **Q: "Apakah bisa multi-user concurrent?"**
```
A: "Prototype saat ini single-user (localStorage).
    Untuk production dengan backend real-time,
    akan support multi-user dengan websockets."
```

### **Q: "Bagaimana dengan mobile?"**
```
A: "Sistem fully responsive, bisa diakses dari:
    - Desktop browser ✅
    - Tablet ✅
    - Smartphone ✅
    [Tunjukkan di HP atau resize browser]"
```

### **Q: "Biaya deployment?"**
```
A: "Saat ini GRATIS menggunakan:
    - Vercel Free Tier (frontend)
    - localStorage (data)
    
    Untuk production penuh:
    - Railway/Render: ~$5-10/month (backend)
    - PostgreSQL: ~$0-5/month (database)
    Total: ~$10-15/month"
```

---

## ⚠️ BACKUP PLAN

### **Jika Internet Mati:**
```
1. Ada screenshot lengkap di laptop
2. Ada video demo di folder backup
3. Bisa jelaskan dari screenshot
```

### **Jika Vercel Down:**
```
1. Jalankan localhost:
   npm run dev
2. Demo dari local
3. Jelaskan proses deployment
```

### **Jika Browser Crash:**
```
1. Refresh page (Ctrl+R)
2. Data masih ada (localStorage)
3. Login ulang → Continue demo
```

---

## ✅ FINAL CHECKLIST

**30 Menit Sebelum Presentasi:**
- [ ] Laptop charged 100%
- [ ] Internet stable (test speed)
- [ ] Browser updated (Chrome/Edge)
- [ ] Clear browser cache
- [ ] Test login semua role
- [ ] Vercel URL accessible
- [ ] Mobile phone ready (responsive demo)
- [ ] Screenshot backup ready
- [ ] Water bottle ready 😅

**5 Menit Sebelum:**
- [ ] Open Vercel URL
- [ ] Test login Admin
- [ ] Navigate to Kelola Produk
- [ ] Keep focused & calm 🧘

---

## 🎤 SCRIPT PEMBUKA

```
"Selamat pagi/siang Bapak/Ibu Dosen Penguji,

Saya Widia Zulfitri, NIM 0101524718, Program Studi Teknik Industri.

Hari ini saya akan mempresentasikan skripsi saya yang berjudul:
'Perancang Sistem Informasi Manajemen Stok dan Pemesanan untuk
Meningkatkan Efisiensi Operasional Toko Peralatan Rumah Tangga'

Studi kasus pada MEGA PERABOT, Depok.

Sistem yang telah saya kembangkan dapat diakses secara online
melalui URL: https://megaperabot-sistem.vercel.app

Mari saya demonstrasikan cara kerja sistem ini..."

[Mulai demo!]
```

---

## 🎤 SCRIPT PENUTUP

```
"Dari demonstrasi yang telah saya tunjukkan, sistem ini berhasil:

1. Meningkatkan efisiensi waktu proses operasional ✅
2. Menyediakan data real-time untuk pengambilan keputusan ✅
3. Mengurangi kerugian akibat stockout produk fast-moving ✅
4. Skalabel untuk mengelola ratusan hingga ribuan produk ✅

Sistem ini telah di-deploy ke production menggunakan platform
cloud Vercel dan siap untuk diimplementasikan di MEGA PERABOT.

Terima kasih atas perhatiannya. Saya siap menjawab pertanyaan."

[Tunggu pertanyaan dengan percaya diri! 💪]
```

---

## 💪 MOTIVASI

```
"You got this! 🎓

Sistem sudah perfect ✅
Demo sudah lancar ✅
Documentation lengkap ✅

Just breathe, stay calm, and show them what you've built!

This is YOUR moment to shine! ✨"
```

---

**Good luck with your thesis defense! 🍀🎓**

*You're going to do AMAZING! 🌟*

---

**Cheat Sheet Version:** 1.0  
**Last Updated:** 12 Februari 2026  
**Status:** Ready for Sidang! 🎯
