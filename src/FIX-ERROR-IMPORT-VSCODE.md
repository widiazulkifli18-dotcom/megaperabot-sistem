# 🔧 FIX ERROR: Failed to resolve import

## ❌ ERROR YANG KAMU DAPAT:

```
Failed to resolve import "./context/AuthContext" from "src/App.tsx"
```

**PENYEBAB:**
- Download dari Figma Make = struktur **FLAT** (tidak ada folder `src/`)
- VSCode pakai Vite = butuh folder **`src/`**
- Import path jadi salah!

---

## ✅ SOLUSI CEPAT (5 MENIT)

### **STEP 1: Pindahkan Semua ke Folder `src/`**

Struktur sekarang:
```
📁 megaperabot/frontend/
├── App.tsx              ❌ SALAH di sini
├── main.tsx             ❌ SALAH di sini
├── components/          ❌ SALAH di sini
├── pages/               ❌ SALAH di sini
├── context/             ❌ SALAH di sini
└── index.html           ✅ TETAP di sini
```

**HARUS jadi:**
```
📁 megaperabot/frontend/
├── index.html           ✅ TETAP di sini
├── package.json         ✅ TETAP di sini
├── vite.config.ts       ✅ TETAP di sini
└── src/                 ✅ BUAT FOLDER INI!
    ├── App.tsx          ✅ PINDAH ke sini
    ├── main.tsx         ✅ PINDAH ke sini
    ├── components/      ✅ PINDAH ke sini
    ├── pages/           ✅ PINDAH ke sini
    ├── context/         ✅ PINDAH ke sini
    ├── services/        ✅ PINDAH ke sini
    ├── types/           ✅ PINDAH ke sini
    ├── hooks/           ✅ PINDAH ke sini
    └── styles/          ✅ PINDAH ke sini
```

---

### **STEP 2: Jalankan Command Ini**

**Di terminal VSCode (folder `frontend/`):**

```bash
# 1. Buat folder src
mkdir src

# 2. Pindahkan SEMUA file & folder ke src/ (kecuali index.html, package.json, vite.config.ts, node_modules)
mv App.tsx main.tsx components pages context services types hooks styles src/

# 3. Restart dev server
npm run dev
```

---

### **STEP 3: Fix index.html**

**Edit file `index.html` di root:**

Cari baris ini:
```html
<script type="module" src="/main.tsx"></script>
```

**Ubah jadi:**
```html
<script type="module" src="/src/main.tsx"></script>
```

---

### **STEP 4: Test**

```bash
npm run dev
```

**Buka:** http://localhost:5173  
**Login:** megaperabot / admin123

✅ **HARUSNYA JALAN!**

---

## 🔧 ALTERNATIF: Manual Move (Kalau Command Gagal)

**Di VSCode:**

1. **Buat folder baru:** Klik kanan → New Folder → `src`

2. **Drag & drop semua ini ke dalam `src/`:**
   - App.tsx
   - main.tsx
   - Folder: components
   - Folder: pages
   - Folder: context
   - Folder: services
   - Folder: types
   - Folder: hooks
   - Folder: styles

3. **JANGAN pindahkan:**
   - ❌ index.html (tetap di root)
   - ❌ package.json (tetap di root)
   - ❌ vite.config.ts (tetap di root)
   - ❌ node_modules (tetap di root)
   - ❌ tsconfig.json (tetap di root)

4. **Edit `index.html`:** Ubah `/main.tsx` → `/src/main.tsx`

5. **Restart:** `npm run dev`

---

## 📋 CHECKLIST FINAL

**Struktur folder setelah fix:**

```
📁 megaperabot/frontend/
├── 📄 index.html                    ← Di ROOT
├── 📄 package.json                  ← Di ROOT
├── 📄 vite.config.ts                ← Di ROOT
├── 📄 tsconfig.json                 ← Di ROOT
├── 📁 node_modules/                 ← Di ROOT
└── 📁 src/                          ← SEMUA KODE DI SINI
    ├── 📄 App.tsx
    ├── 📄 main.tsx
    ├── 📁 components/
    │   ├── Layout.tsx
    │   ├── ProtectedRoute.tsx
    │   └── ui/
    ├── 📁 pages/
    │   ├── Dashboard.tsx
    │   ├── Login.tsx
    │   └── ...
    ├── 📁 context/
    │   └── AuthContext.tsx
    ├── 📁 services/
    │   └── api.ts
    ├── 📁 types/
    │   └── index.ts
    ├── 📁 hooks/
    │   └── useToast.tsx
    └── 📁 styles/
        └── globals.css
```

**Cek:**
- [ ] Semua file kode ada di dalam `src/`
- [ ] `index.html` tetap di root
- [ ] `index.html` sudah pakai `/src/main.tsx`
- [ ] `npm run dev` jalan tanpa error

---

## 🚀 SETELAH FIX

### **Frontend Ready:**
```bash
cd frontend
npm run dev
# Open: http://localhost:5173
```

### **Backend (Opsional):**

Kalau mau pakai database (bukan mock):

```bash
# Terminal baru
cd backend
npm install
npm start
# Running: http://localhost:3001
```

**Lalu edit `src/services/api.ts`:**
```typescript
const USE_MOCK_DATA = false; // Line 7
```

---

## ⚠️ TROUBLESHOOTING

### **Error: ENOENT: no such file or directory**
```bash
# File masih ada di luar src/
# Manual move: drag-drop ke src/ di VSCode
```

### **Error: Cannot find module**
```bash
# Install ulang
rm -rf node_modules package-lock.json
npm install
```

### **Masih Error Import:**
```bash
# Restart VSCode
# Cmd/Ctrl + Shift + P → "Reload Window"
```

---

## 📝 QUICK COMMAND RECAP

```bash
# Di folder frontend/
mkdir src
mv App.tsx main.tsx components pages context services types hooks styles src/

# Edit index.html: /main.tsx → /src/main.tsx

npm run dev
```

---

## ✅ SELESAI!

**Setelah fix:**
- ✅ Frontend jalan di http://localhost:5173
- ✅ Login pakai megaperabot / admin123
- ✅ Mock data 96 transaksi
- ✅ Siap pakai!

**Kalau mau backend:**
- Generate backend: `bash generate-backend.sh`
- Start: `cd backend && npm start`
- Update api.ts: `USE_MOCK_DATA = false`

---

**🎉 COBA LAGI SEKARANG!**
