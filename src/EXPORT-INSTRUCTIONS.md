# 📦 Cara Export dari Figma Make ke Localhost

## 🎯 OPSI 1: Download Langsung dari Figma Make (TERCEPAT)

### Langkah 1: Export Code

1. **Di Figma Make**, cari tombol **"Download"** atau **"Export"**
2. Pilih **"Download Code"** atau **"Export as ZIP"**
3. Save file ZIP ke komputer
4. Extract ZIP ke folder: `/Users/user/Documents/megaperabot/frontend`

### Langkah 2: Jalankan

```bash
cd /Users/user/Documents/megaperabot/frontend
npm install
npm run dev
```

Browser otomatis buka di `http://localhost:5173` ✅

---

## 🎯 OPSI 2: Copy Manual Satu-Per-Satu (JIKA OPSI 1 TIDAK ADA)

### Struktur Folder yang Harus Dibuat:

```bash
# Buat folder utama
mkdir -p /Users/user/Documents/megaperabot/frontend

# Buat semua subfolder
cd /Users/user/Documents/megaperabot/frontend
mkdir -p components/ui
mkdir -p components/figma
mkdir -p context
mkdir -p pages
mkdir -p services
mkdir -p styles
mkdir -p types
```

### File-File yang Harus Di-Copy:

Dari Figma Make, copy isi file ini **satu-per-satu** ke folder yang sesuai:

#### **Root Files:**
- `App.tsx` → `/Users/user/Documents/megaperabot/frontend/App.tsx`
- `main.tsx` → `/Users/user/Documents/megaperabot/frontend/main.tsx`
- `index.html` → `/Users/user/Documents/megaperabot/frontend/index.html`
- `package.json` → `/Users/user/Documents/megaperabot/frontend/package.json`
- `vite.config.ts` → `/Users/user/Documents/megaperabot/frontend/vite.config.ts`
- `tsconfig.json` → `/Users/user/Documents/megaperabot/frontend/tsconfig.json`
- `tsconfig.node.json` → `/Users/user/Documents/megaperabot/frontend/tsconfig.node.json`

#### **Components:**
- `components/Layout.tsx`
- `components/ProtectedRoute.tsx`
- `components/figma/ImageWithFallback.tsx`
- `components/ui/*.tsx` (semua 50+ file)

#### **Context:**
- `context/AuthContext.tsx`

#### **Pages:**
- `pages/Dashboard.tsx`
- `pages/Login.tsx`
- `pages/NewOrder.tsx`
- `pages/Restock.tsx`
- `pages/SupplierOrders.tsx`
- `pages/Unauthorized.tsx`

#### **Services:**
- `services/api.ts`

#### **Styles:**
- `styles/globals.css`

#### **Types:**
- `types/index.ts`

### Setelah Semua File Di-Copy:

```bash
cd /Users/user/Documents/megaperabot/frontend
npm install
npm run dev
```

---

## 🎯 OPSI 3: Gunakan Git (PALING RAPI)

Jika Figma Make punya opsi **"Push to GitHub"**:

1. Push code ke GitHub repository
2. Clone di lokal:

```bash
cd /Users/user/Documents/megaperabot
git clone https://github.com/your-username/megaperabot-frontend.git frontend
cd frontend
npm install
npm run dev
```

---

## ✅ Verifikasi Setup Berhasil

Setelah `npm run dev`, harus muncul:

```
  VITE v6.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Buka browser: `http://localhost:5173` → Halaman Login muncul ✅

---

## 🆘 Jika Ada Masalah

### Error: "Cannot find module 'react'"

```bash
npm install
```

### Error: "Port 5173 already in use"

```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Error: "Failed to fetch from API"

Cek backend:
```bash
# Terminal lain
cd /Users/user/Documents/megaperabot/backend
npm start
```

Browser test: `http://localhost:3001/api/health`

---

**Pilih OPSI 1 jika tersedia** (paling mudah)!
