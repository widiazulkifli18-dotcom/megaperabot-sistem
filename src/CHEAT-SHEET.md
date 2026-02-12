# ⚡ CHEAT SHEET - MEGA PERABOT

## 🎯 PILIH SKENARIO KAMU:

### **A. MAU DEMO PRESENTASI (DI FIGMA MAKE) ⭐**
```
✅ Aplikasi sudah jalan di Figma Make
✅ Login: megaperabot / admin123
✅ Siap demo sekarang!

📖 Baca: PANDUAN-DEMO-SKRIPSI.md
```

---

### **B. MAU DOWNLOAD KE VSCODE**

#### **⚠️ IMPORTANT: Setelah download, 2 hal yang HARUS dilakukan:**

**1. Setup struktur folder `src/`:**
```bash
cd megaperabot-frontend
bash setup-folder-vscode.sh
```

**2. Ubah 5 files routing:**

Ganti `'react-router'` → `'react-router-dom'` di:
- App.tsx
- components/ProtectedRoute.tsx
- components/Layout.tsx
- pages/Login.tsx
- pages/Unauthorized.tsx

**Dan buat package.json** (lihat DOWNLOAD-SIAP-PAKAI.md)

📖 **Detail lengkap:** [DOWNLOAD-SIAP-PAKAI.md](DOWNLOAD-SIAP-PAKAI.md)

---

## 🔐 DEMO ACCOUNTS

```
👑 Admin
megaperabot / admin123

🏪 Karyawan Toko
karyawan01 / toko123

📦 Karyawan Gudang
staffgudang01 / gudang123
```

---

## 🌐 URLS

```
Frontend:     http://localhost:5173
Backend:      http://localhost:3001
API Health:   http://localhost:3001/api/health
```

---

## 📊 MOCK DATA

```
✅ 96 transaksi (Okt-Des 2025)
✅ 5 produk fast moving
✅ Total: Rp 2.470.000
✅ Profit: Rp 944.500
```

---

## 🔧 QUICK FIX

**Error: Module not found**
```bash
rm -rf node_modules
npm install
```

**Error: CORS**
```
Cek megaperabot-backend/.env
CORS_ORIGINS=http://localhost:5173
```

**Error: Database**
```bash
# Copy database ke folder backend
cp megaperabot.db megaperabot-backend/
```

---

## 📚 DOKUMENTASI

| File | Kapan Baca |
|------|------------|
| **SIAP-DOWNLOAD-VSCODE.md** | Download & setup ⭐ |
| **PANDUAN-DEMO-SKRIPSI.md** | Demo presentasi ⭐ |
| **QUICK-GUIDE-VSCODE.md** | Setup detail |
| **README.md** | Overview project |

---

## ✅ FILES YANG SUDAH SIAP VSCODE

```
✅ App.tsx
✅ components/ProtectedRoute.tsx
✅ components/Layout.tsx
✅ pages/Login.tsx
✅ pages/Unauthorized.tsx
✅ package.json
```

**Semua pakai `react-router-dom` ← SIAP VSCode!**

---

## 🚀 ONE-LINER COMMANDS

**Setup frontend:**
```bash
cd megaperabot-frontend && npm install && npm run dev
```

**Setup backend:**
```bash
bash generate-backend.sh && cd megaperabot-backend && npm install && npm start
```

**Setup semua (setelah backend ada):**
```bash
bash start-all.sh
```

---

## 🎓 UNTUK SKRIPSI

**Data penting:**
- 5 produk fast moving (PK0018, PK0034, PK0033, PK0006, PK0030)
- 96 transaksi real (3 bulan)
- Architecture: React + Node.js + SQLite
- 3 user roles dengan RBAC

**Benefit:**
- Efisiensi operasional ⬆️
- Real-time monitoring ✅
- Decision support ✅
- Data analytics ✅

---

## ⚡ SUMMARY

```
1. Download → npm install → npm run dev → JADI! ✅

2. Butuh database? 
   → generate-backend.sh 
   → copy megaperabot.db 
   → npm start
   → JADI! ✅

3. Demo presentasi?
   → Pakai Figma Make langsung
   → JADI! ✅
```

---

**🎉 PILIH SALAH SATU & GO! 🚀**