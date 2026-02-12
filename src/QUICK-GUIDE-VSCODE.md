# ⚡ QUICK GUIDE: EXPORT KE VSCODE (SIMPLE VERSION)

**🎯 Tujuan:** Pindahkan aplikasi dari Figma Make ke VSCode dan sambungkan ke database SQLite

---

## 📥 DOWNLOAD FILE DARI FIGMA MAKE

### **Option 1: Download ZIP (Recommended)**
1. Di Figma Make, klik tombol **"Export"** atau **"Download"**
2. Save ZIP file ke komputer
3. Extract ke folder: `megaperabot-frontend`

### **Option 2: Copy Manual**
Copy semua file dari Figma Make ke folder lokal Anda

---

## 🚀 SETUP DI VSCODE (3 LANGKAH MUDAH)

### **LANGKAH 1: Setup Frontend**

```bash
# 1. Buka folder di VSCode
cd megaperabot-frontend
code .

# 2. Jalankan setup script
bash setup-vscode.sh

# Atau manual:
# - Buat package.json (sudah ada di script)
# - npm install
# - Fix import react-router-dom
```

**PENTING:** Script akan otomatis:
- ✅ Buat `package.json`
- ✅ Fix semua import `react-router` → `react-router-dom`
- ✅ Install dependencies

---

### **LANGKAH 2: Generate Backend**

```bash
# Di folder yang sama dengan megaperabot-frontend
bash generate-backend.sh
```

**Output:** Folder baru `megaperabot-backend/` akan dibuat dengan 11 files!

```
📁 megaperabot-backend/
├── server.js
├── package.json
├── .env
├── config/database.js
├── middleware/cors.js
└── routes/ (5 files)
```

**Install backend:**
```bash
cd megaperabot-backend
npm install
```

---

### **LANGKAH 3: Copy Database**

Copy file `megaperabot.db` dari DB Browser ke folder `megaperabot-backend/`

```bash
# Windows
copy "C:\path\to\megaperabot.db" "megaperabot-backend\megaperabot.db"

# Mac/Linux
cp /path/to/megaperabot.db megaperabot-backend/megaperabot.db
```

---

## ▶️ JALANKAN APLIKASI

### **Cara 1: Start Manual (2 Terminal)**

**Terminal 1 - Backend:**
```bash
cd megaperabot-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd megaperabot-frontend
npm run dev
```

### **Cara 2: Start Otomatis (1 Command)**

```bash
# Di folder root (yang ada megaperabot-frontend & megaperabot-backend)
bash start-all.sh
```

---

## 🔗 CONNECT FRONTEND KE BACKEND

**Edit file: `services/api.ts` atau `src/services/api.ts`**

**Baris 7 - Ubah ini:**
```typescript
const USE_MOCK_DATA = true;  // ❌ Mock mode
```

**Menjadi:**
```typescript
const USE_MOCK_DATA = false;  // ✅ Production mode
```

**Save** → Refresh browser → Frontend sekarang pakai **database SQLite**! 🎉

---

## ✅ TEST APLIKASI

1. **Open browser:** http://localhost:5173
2. **Login:** `megaperabot` / `admin123`
3. **Cek Dashboard** - Data harus dari database!
4. **Test fitur:**
   - Create new order
   - Restock product
   - View sales report

---

## 🎯 STRUKTUR FOLDER FINAL

```
📁 Desktop/ (atau folder kerja Anda)
│
├── 📁 megaperabot-frontend/     ← Frontend React (Port 5173)
│   ├── App.tsx
│   ├── package.json
│   ├── services/api.ts          ← USE_MOCK_DATA = false
│   └── ...
│
└── 📁 megaperabot-backend/      ← Backend Node.js (Port 3001)
    ├── server.js
    ├── megaperabot.db           ← DATABASE SQLITE
    ├── package.json
    └── ...
```

---

## 🔧 TROUBLESHOOTING CEPAT

### **1. Backend error "Cannot find module"**
```bash
cd megaperabot-backend
rm -rf node_modules
npm install
```

### **2. Frontend CORS error**
Cek file `megaperabot-backend/.env`:
```
CORS_ORIGINS=http://localhost:5173
```

### **3. Database tidak ditemukan**
Pastikan `megaperabot.db` ada di folder backend:
```bash
ls -la megaperabot-backend/megaperabot.db
```

### **4. Port sudah dipakai**
Edit `megaperabot-backend/.env`:
```
PORT=3002  # Ganti port
```

Dan update frontend `services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3002/api';
```

---

## 📋 CHECKLIST

**Sebelum mulai:**
- [ ] Download/copy semua file dari Figma Make
- [ ] VSCode sudah terinstall
- [ ] Node.js sudah terinstall (`node --version`)
- [ ] File `megaperabot.db` sudah siap

**Setup Frontend:**
- [ ] Folder frontend dibuka di VSCode
- [ ] `package.json` sudah dibuat
- [ ] Dependencies terinstall (`node_modules/` ada)
- [ ] Import pakai `react-router-dom` (bukan `react-router`)

**Setup Backend:**
- [ ] Script `generate-backend.sh` sudah dijalankan
- [ ] Folder `megaperabot-backend/` terbuat
- [ ] Dependencies terinstall
- [ ] Database `.db` sudah dicopy

**Testing:**
- [ ] Backend jalan di `http://localhost:3001`
- [ ] Frontend jalan di `http://localhost:5173`
- [ ] `USE_MOCK_DATA = false` di `api.ts`
- [ ] Login berhasil
- [ ] Data muncul dari database

---

## 🎉 SELESAI!

**Frontend:** http://localhost:5173  
**Backend:** http://localhost:3001  
**Database:** SQLite (megaperabot.db)

**Login:**
- Admin: `megaperabot` / `admin123`
- Karyawan Toko: `karyawan01` / `toko123`
- Karyawan Gudang: `staffgudang01` / `gudang123`

---

## 📞 BUTUH BANTUAN?

**Common Issues:**
1. **"Module not found"** → `npm install` ulang
2. **"CORS error"** → Cek `.env` backend
3. **"Database locked"** → Tutup DB Browser
4. **"Port in use"** → Ubah port di `.env`

**Files Penting:**
- `generate-backend.sh` - Script buat backend
- `setup-vscode.sh` - Script setup frontend
- `start-all.sh` - Start frontend + backend sekaligus
- `CARA-EXPORT-KE-VSCODE.md` - Panduan lengkap detail

---

**Good luck! 🚀**
