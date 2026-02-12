# 🚀 MULAI DISINI - PANDUAN DOWNLOAD & PAKAI

## ✅ APLIKASI SUDAH 100% SIAP VSCODE!

**Saya sudah ubah semua file supaya siap VSCode!**  
**Tinggal download → setup folder → npm install → npm run dev → JADI!**

---

## 📥 3 LANGKAH MUDAH:

### **1️⃣ DOWNLOAD & EXTRACT**
- Download ZIP dari Figma Make
- Extract ke folder `megaperabot-frontend`

### **2️⃣ SETUP FOLDER (Pilih salah satu)**

**OPSI A: Otomatis pakai Script ⭐ (RECOMMENDED)**
```bash
cd megaperabot-frontend
bash setup-folder-vscode.sh
```

**OPSI B: Manual (kalau script gagal)**
```bash
cd megaperabot-frontend
mkdir src
mv App.tsx main.tsx components pages context services types hooks styles src/
```

Lalu **edit `index.html`**, ubah baris terakhir:
```html
<!-- Dari: -->
<script type="module" src="/main.tsx"></script>

<!-- Jadi: -->
<script type="module" src="/src/main.tsx"></script>
```

### **3️⃣ INSTALL & RUN**
```bash
npm install
npm run dev
```

**Buka:** http://localhost:5173  
**Login:** `megaperabot` / `admin123`

✅ **JADI!** 🎉

---

## 📋 QUICK RECAP:

```bash
# 1. Extract ZIP ke folder megaperabot-frontend

# 2. Setup struktur (pilih salah satu)
cd megaperabot-frontend
bash setup-folder-vscode.sh    # Otomatis ⭐

# ATAU manual:
mkdir src
mv App.tsx main.tsx components pages context services types hooks styles src/
# Edit index.html: /main.tsx → /src/main.tsx

# 3. Install & Run
npm install
npm run dev

# 4. Buka browser
http://localhost:5173

# 5. Login
megaperabot / admin123
```

---

## ✅ STRUKTUR FOLDER FINAL:

```
📁 megaperabot-frontend/
├── 📄 index.html           ← Root (edit: /src/main.tsx)
├── 📄 package.json         ← Root
├── 📄 vite.config.ts       ← Root
└── 📁 src/                 ← Semua kode di sini
    ├── 📄 App.tsx
    ├── 📄 main.tsx
    ├── 📁 components/
    ├── 📁 pages/
    └── ...
```

---

## 🎯 AKUN DEMO:

```
👑 Admin
Username: megaperabot
Password: admin123

🏪 Karyawan Toko
Username: karyawan01
Password: toko123

📦 Karyawan Gudang
Username: staffgudang01
Password: gudang123
```

---

## 📚 DOKUMENTASI LENGKAP:

| File | Untuk Apa |
|------|-----------|
| **MULAI-DISINI.md** | Panduan super simple ⭐ |
| **DOWNLOAD-SIAP-PAKAI.md** | Detail lengkap download |
| **CHEAT-SHEET.md** | Quick reference |
| **PANDUAN-DEMO-SKRIPSI.md** | Skenario demo presentasi |

---

## 🔧 TROUBLESHOOTING:

**Error: Cannot find module**
```bash
# Cek struktur folder: semua kode harus di src/
ls src/
```

**Error: Failed to resolve**
```bash
# Cek index.html: harus /src/main.tsx
grep "main.tsx" index.html
```

**Port 5173 sudah dipakai**
```bash
# Matikan aplikasi lain atau ubah port di vite.config.ts
```

---

## ✅ YANG SUDAH SAYA UBAH:

1. ✅ 5 files routing: `react-router` → `react-router-dom`
2. ✅ `package.json` sudah dibuat dengan dependencies lengkap
3. ✅ Script `setup-folder-vscode.sh` untuk setup otomatis

**Semua SIAP VSCODE! Tinggal download & setup folder!**

---

## 🎉 SELAMAT!

**Aplikasi MEGA PERABOT siap dipakai!**

**Mock data:**
- 96 transaksi (Okt-Des 2025)
- 5 produk fast moving
- Total penjualan: Rp 2.470.000

**Fitur:**
- Dashboard real-time
- Pesanan baru
- Restock
- Laporan penjualan
- User management
- Dan lainnya!

---

**🚀 DOWNLOAD SEKARANG & LANGSUNG PAKAI!**

**Kalau ada masalah, baca:** DOWNLOAD-SIAP-PAKAI.md
