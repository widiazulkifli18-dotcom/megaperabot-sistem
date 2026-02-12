# ✅ CHECKLIST: Fix "Failed to fetch" Error

Ikuti checklist ini **step-by-step** untuk fix error koneksi backend:

---

## 📋 PRE-REQUISITES

```
[ ] Node.js terinstall (cek: node -v)
[ ] Sudah download project dari Figma Make
[ ] Sudah extract file ZIP
[ ] Sudah buka folder di VSCode
```

**Kalau semua ✅ → Lanjut ke Setup Backend**

---

## 🔧 SETUP BACKEND

### **Windows User:**

```
[ ] Buka Command Prompt atau PowerShell
[ ] cd backend
[ ] npm install (tunggu sampai selesai)
[ ] npm run init-db
[ ] npm start
[ ] Muncul "Server: http://localhost:3001" ← WAJIB!
```

### **Mac/Linux User:**

```
[ ] Buka Terminal
[ ] cd backend
[ ] npm install (tunggu sampai selesai)
[ ] npm run init-db
[ ] npm start
[ ] Muncul "Server: http://localhost:3001" ← WAJIB!
```

**Kalau muncul error:**
- ❌ "Cannot find module" → npm install lagi
- ❌ "SQLITE_CANTOPEN" → npm run init-db lagi
- ❌ "Port 3001 in use" → Double-click `kill-port-3001.bat` (Windows) atau `./kill-port-3001.sh` (Mac/Linux)

**Kalau backend jalan ✅ → Lanjut ke Test Backend**

---

## 🧪 TEST BACKEND

```
[ ] Buka browser (Chrome/Firefox/Edge)
[ ] Ketik: http://localhost:3001/api/health
[ ] Harus muncul: {"status":"ok","database":"connected"}
[ ] Ketik: http://localhost:3001/api/products
[ ] Harus muncul: [{"kode_barang":"PK0018",...},...]
```

**Kalau kedua test berhasil ✅ → Backend TERSAMBUNG! Lanjut ke Setup Frontend**

**Kalau gagal ❌ → Kembali ke Setup Backend, pastikan terminal menunjukkan "Server running"**

---

## 🎨 SETUP FRONTEND

### **Buka Terminal BARU** (jangan tutup terminal backend!)

### **Windows User:**

```
[ ] Buka Command Prompt atau PowerShell BARU
[ ] Pastikan di root project (bukan di folder backend)
[ ] npm install (tunggu sampai selesai)
[ ] npm run dev
[ ] Muncul "Local: http://localhost:3000/" ← WAJIB!
```

### **Mac/Linux User:**

```
[ ] Buka Terminal BARU
[ ] Pastikan di root project (bukan di folder backend)
[ ] npm install (tunggu sampai selesai)
[ ] npm run dev
[ ] Muncul "Local: http://localhost:3000/" ← WAJIB!
```

**Kalau frontend jalan ✅ → Lanjut ke Test Frontend**

---

## 🌐 TEST FRONTEND

```
[ ] Buka browser
[ ] Ketik: http://localhost:3000
[ ] Halaman login MEGA PERABOT muncul
[ ] Form username & password terlihat
```

**Kalau halaman login muncul ✅ → Lanjut ke Test Login**

---

## 🔑 TEST LOGIN

```
[ ] Di halaman login, ketik:
    Username: megaperabot
    Password: admin123
[ ] Klik tombol "Login"
[ ] Tidak ada error "Failed to fetch" ← PENTING!
[ ] Redirect ke Dashboard
[ ] Dashboard menampilkan:
    - Total Produk: 5
    - Total Penjualan: Rp xxx
    - Total Keuntungan: Rp xxx
    - Grafik penjualan
```

**Kalau login berhasil & dashboard muncul ✅ → SELESAI! 🎉**

**Kalau masih "Failed to fetch" ❌ → Lihat Troubleshooting di bawah**

---

## 🛠️ TROUBLESHOOTING

### **Masih Error "Failed to fetch"?**

Cek satu per satu:

```
[ ] Terminal backend masih jalan (tidak di-close)
[ ] Terminal backend menunjukkan "Server: http://localhost:3001"
[ ] Browser test: localhost:3001/api/health berhasil
[ ] Browser test: localhost:3001/api/products berhasil
[ ] Terminal frontend jalan
[ ] Browser console (F12) tidak ada CORS error
```

**Kalau ada yang ❌ → Fix yang ❌ dulu, baru test login lagi**

---

### **Backend Tidak Jalan?**

```
[ ] Stop backend (Ctrl+C)
[ ] cd backend
[ ] rm megaperabot.db (hapus database lama)
[ ] npm run init-db (buat database baru)
[ ] npm start
[ ] Test lagi: localhost:3001/api/health
```

---

### **Port 3001 Already in Use?**

**Windows:**
```
[ ] Double-click file: kill-port-3001.bat
[ ] Tunggu sampai selesai
[ ] Jalankan backend lagi: cd backend && npm start
```

**Mac/Linux:**
```
[ ] chmod +x kill-port-3001.sh
[ ] ./kill-port-3001.sh
[ ] Jalankan backend lagi: cd backend && npm start
```

---

## 🎯 FINAL CHECKLIST

**Sistem berjalan sempurna jika:**

```
✅ Terminal backend: "🚀 Server: http://localhost:3001"
✅ Terminal frontend: "➜ Local: http://localhost:3000/"
✅ Browser: localhost:3001/api/health → {"status":"ok"}
✅ Browser: localhost:3001/api/products → [...array...]
✅ Browser: localhost:3000 → Halaman login muncul
✅ Login: megaperabot/admin123 → Berhasil masuk dashboard
✅ Dashboard: Menampilkan data real dari database
✅ Menu navigasi: Dashboard, Pesanan Baru, Restock, dll
```

**Kalau semua ✅ → SELESAI! Sistem siap digunakan! 🎉**

---

## 📚 FILE BANTUAN

| File | Kapan Digunakan |
|------|-----------------|
| `QUICK-FIX.md` | Error "Failed to fetch" (solusi cepat 5 menit) |
| `TROUBLESHOOTING-KONEKSI.md` | Troubleshooting detail + solusi lengkap |
| `PANDUAN-SETUP-LENGKAP.md` | Tutorial setup dari awal + penjelasan |
| `start.bat` (Windows) | Auto-start backend & frontend |
| `start.sh` (Mac/Linux) | Auto-start backend & frontend |
| `kill-port-3001.bat` | Fix error "Port 3001 in use" (Windows) |
| `kill-port-3001.sh` | Fix error "Port 3001 in use" (Mac/Linux) |
| `backend/test-connection.js` | Test koneksi backend |

---

## 💡 TIPS

1. **Selalu start backend dulu, baru frontend**
2. **Jangan tutup terminal backend saat frontend jalan**
3. **Test backend di browser dulu (localhost:3001/api/health) sebelum test frontend**
4. **Kalau ada perubahan kode, restart backend & frontend (Ctrl+C lalu start lagi)**
5. **Hard refresh browser (Ctrl+Shift+R) kalau UI tidak update**

---

## 🆘 MASIH BUTUH BANTUAN?

Screenshot 4 hal ini:

1. **Terminal Backend** (keseluruhan output setelah npm start)
2. **Terminal Frontend** (keseluruhan output setelah npm run dev)
3. **Browser Console** (F12 → Console tab → screenshot error)
4. **Browser Network** (F12 → Network tab → screenshot request yang failed)

Kirim screenshot + error message untuk bantuan lebih lanjut!

---

**Dibuat untuk membantu troubleshooting MEGA PERABOT**  
**Ikuti checklist ini step-by-step sampai semua ✅**
