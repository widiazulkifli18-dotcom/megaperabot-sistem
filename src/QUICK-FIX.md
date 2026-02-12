# 🚨 QUICK FIX: "Failed to fetch" Error

## Error Anda
```
❌ API Call Error: TypeError: Failed to fetch
❌ Login error: Tidak dapat terhubung ke server
```

## Penyebab
**Backend belum jalan!** Frontend tidak bisa connect ke `http://localhost:3001`

---

## ✅ SOLUSI CEPAT (5 Menit)

### **Windows User:**

1. **Double-click file `start.bat`** di root project
2. Tunggu sampai 2 terminal terbuka (Backend & Frontend)
3. Browser akan otomatis buka `http://localhost:3000`
4. Login: `megaperabot` / `admin123`

✅ **SELESAI!**

---

### **Mac/Linux User:**

```bash
# 1. Beri permission
chmod +x start.sh

# 2. Jalankan script
./start.sh
```

✅ **SELESAI!**

---

## ⚙️ CARA MANUAL (Jika Script Error)

### **Terminal 1 - Backend:**

```bash
cd backend
npm install
npm run init-db
npm start
```

**Tunggu sampai muncul:**
```
🚀  Server: http://localhost:3001
```

✅ **Backend jalan!**

---

### **Terminal 2 - Frontend:**

```bash
# (Buka terminal baru)
npm install
npm run dev
```

**Tunggu sampai muncul:**
```
➜  Local: http://localhost:3000/
```

✅ **Frontend jalan!**

---

## 🧪 Test Backend (WAJIB!)

**Test 1: Buka browser**
```
http://localhost:3001/api/health
```

**Harus muncul:**
```json
{"status":"ok","database":"connected"}
```

**Test 2: Buka browser**
```
http://localhost:3001/api/products
```

**Harus muncul array 5 produk**

✅ **Kalau kedua test berhasil → Backend tersambung!**

---

## 🔍 Troubleshooting Cepat

| Gejala | Penyebab | Fix |
|--------|----------|-----|
| "Failed to fetch" | Backend tidak jalan | `cd backend && npm start` |
| "Cannot find module" | Dependencies belum install | `npm install` |
| "SQLITE_CANTOPEN" | Database tidak ada | `npm run init-db` |
| "Port 3001 in use" | Backend sudah jalan | Matikan: `lsof -ti:3001 \| xargs kill -9` (Mac) atau `taskkill /F /IM node.exe` (Windows) |

---

## 📊 Checklist Sebelum Login

```
[ ] Backend jalan (terminal menunjukkan "Server running on 3001")
[ ] Frontend jalan (terminal menunjukkan "Local: localhost:3000")
[ ] Test health: localhost:3001/api/health → return JSON ✅
[ ] Test products: localhost:3001/api/products → return array ✅
[ ] Buka frontend: localhost:3000 → halaman login muncul ✅
```

**Kalau semua ✅ → Lanjut login!**

---

## 🎯 Urutan Start yang Benar

```
1. Backend dulu  → npm start (di folder backend)
2. Frontend kedua → npm run dev (di root project)
3. Buka browser  → http://localhost:3000
```

**❌ SALAH:** Frontend dulu baru backend → Error "Failed to fetch"  
**✅ BENAR:** Backend dulu baru frontend → Login berhasil

---

## 💡 Tips

1. **Jangan tutup terminal backend** saat frontend jalan
2. **Restart kedua terminal** kalau ada perubahan kode backend
3. **Hard refresh browser** (Ctrl+Shift+R) kalau frontend tidak update
4. **Cek console browser** (F12) untuk lihat error detail

---

## 🆘 Masih Error?

**Jalankan test script:**
```bash
cd backend
npm test
```

**Kalau muncul "SUCCESS" → Backend OK**  
**Kalau muncul "FAILED" → Screenshot dan kirim ke saya!**

---

## 📞 Langkah Berikutnya

Setelah fix error ini:

1. Baca **TROUBLESHOOTING-KONEKSI.md** untuk detail lengkap
2. Baca **PANDUAN-SETUP-LENGKAP.md** untuk tutorial komprehensif
3. Cek **backend/README.md** untuk dokumentasi API

---

**🎉 Selamat! Sistem MEGA PERABOT siap digunakan!**
