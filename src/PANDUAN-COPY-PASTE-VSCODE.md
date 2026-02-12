# 📋 PANDUAN COPY-PASTE: SIAPKAN FILES UNTUK VSCODE

**🎯 Tujuan:** Supaya pas download dari Figma Make, langsung bisa jalan di VSCode tanpa error!

---

## ⚠️ MASALAH UTAMA

Di **Figma Make** pakai: `'react-router'`  
Di **VSCode** pakai: `'react-router-dom'`  

Jadi **HARUS DIGANTI** sebelum export/download!

---

## 📝 FILES YANG HARUS DIUBAH (5 FILES)

### **FILE 1: `/App.tsx`**

**❌ Yang sekarang (Figma Make):**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router';
```

**✅ Ganti jadi (VSCode Ready):**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

**CARA EDIT:**
1. Buka file `/App.tsx` di Figma Make
2. Baris 1, ganti `'react-router'` → `'react-router-dom'`
3. Save

---

### **FILE 2: `/components/ProtectedRoute.tsx`**

**❌ Yang sekarang:**
```typescript
import { Navigate } from 'react-router';
```

**✅ Ganti jadi:**
```typescript
import { Navigate } from 'react-router-dom';
```

**CARA EDIT:**
1. Buka file `/components/ProtectedRoute.tsx`
2. Baris 2, ganti `'react-router'` → `'react-router-dom'`
3. Save

---

### **FILE 3: `/components/Layout.tsx`**

**❌ Yang sekarang:**
```typescript
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
```

**✅ Ganti jadi:**
```typescript
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
```

**CARA EDIT:**
1. Buka file `/components/Layout.tsx`
2. Baris 1, ganti `'react-router'` → `'react-router-dom'`
3. Save

---

### **FILE 4: `/pages/Login.tsx`**

**❌ Yang sekarang:**
```typescript
import { useNavigate } from 'react-router';
```

**✅ Ganti jadi:**
```typescript
import { useNavigate } from 'react-router-dom';
```

**CARA EDIT:**
1. Buka file `/pages/Login.tsx`
2. Baris 2, ganti `'react-router'` → `'react-router-dom'`
3. Save

---

### **FILE 5: `/pages/Unauthorized.tsx`**

**❌ Yang sekarang:**
```typescript
import { Link } from 'react-router';
```

**✅ Ganti jadi:**
```typescript
import { Link } from 'react-router-dom';
```

**CARA EDIT:**
1. Buka file `/pages/Unauthorized.tsx`
2. Baris 1, ganti `'react-router'` → `'react-router-dom'`
3. Save

---

## ➕ FILE TAMBAHAN: `/package.json`

**Buat file baru:** `/package.json`

**COPY-PASTE INI:**

```json
{
  "name": "megaperabot-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "lucide-react": "^0.460.0",
    "sonner": "^1.7.1",
    "recharts": "^2.15.0",
    "motion": "^11.15.0",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.3",
    "vite": "^6.0.7",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

**CARA BUAT:**
1. Di root folder Figma Make, klik "New File"
2. Nama file: `package.json`
3. Copy-paste code di atas
4. Save

---

## 📦 SETELAH SEMUA DIUBAH

### **DOWNLOAD/EXPORT DARI FIGMA MAKE:**

1. Klik tombol **"Export"** atau **"Download"** di Figma Make
2. Download as ZIP
3. Extract ke folder `megaperabot-frontend`

### **ATAU COPY MANUAL:**

Copy semua file & folder ini:

```
📁 megaperabot-frontend/
├── 📄 index.html
├── 📄 main.tsx
├── 📄 App.tsx                    ← SUDAH DIUBAH ✅
├── 📄 package.json               ← SUDAH DIBUAT ✅
├── 📄 vite.config.ts
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📁 components/
│   ├── Layout.tsx                ← SUDAH DIUBAH ✅
│   ├── ProtectedRoute.tsx        ← SUDAH DIUBAH ✅
│   └── ui/ (semua file)
├── 📁 pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx                 ← SUDAH DIUBAH ✅
│   ├── Unauthorized.tsx          ← SUDAH DIUBAH ✅
│   ├── NewOrder.tsx
│   ├── Restock.tsx
│   ├── SupplierOrders.tsx
│   ├── StockMonitoring.tsx
│   ├── UserManagement.tsx
│   ├── SalesReport.tsx
│   └── SalesHistory.tsx
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

---

## ✅ CHECKLIST SEBELUM DOWNLOAD

**Pastikan sudah edit:**
- [ ] `/App.tsx` → `react-router-dom` ✅
- [ ] `/components/ProtectedRoute.tsx` → `react-router-dom` ✅
- [ ] `/components/Layout.tsx` → `react-router-dom` ✅
- [ ] `/pages/Login.tsx` → `react-router-dom` ✅
- [ ] `/pages/Unauthorized.tsx` → `react-router-dom` ✅
- [ ] `/package.json` → Sudah dibuat ✅

**Kalau sudah semua ✅, BARU DOWNLOAD!**

---

## 🚀 SETELAH DOWNLOAD, DI VSCODE:

```bash
# 1. Extract ZIP & buka di VSCode
cd megaperabot-frontend
code .

# 2. Install dependencies
npm install

# 3. Jalankan
npm run dev

# 4. Buka browser
http://localhost:5173
```

**Login:** `megaperabot` / `admin123`

✅ **Harusnya langsung jalan tanpa error!**

---

## 🔧 KALAU MASIH ERROR

**Error: "Cannot find module 'react-router-dom'"**

**Solusi:**
```bash
npm install react-router-dom
```

**Error: "Cannot find package.json"**

**Solusi:** Buat file `package.json` pakai code di atas

---

## 📋 RINGKASAN

**Yang HARUS diubah di Figma Make SEBELUM download:**

1. **5 files** → Ganti `'react-router'` jadi `'react-router-dom'`:
   - App.tsx
   - components/ProtectedRoute.tsx
   - components/Layout.tsx
   - pages/Login.tsx
   - pages/Unauthorized.tsx

2. **1 file baru** → Buat `package.json`

**Cara ganti:** Cari-replace semua `from 'react-router'` jadi `from 'react-router-dom'`

**Setelah itu BARU download/export!**

---

## 🎯 TIPS CEPAT

**Find & Replace di Figma Make:**

Kalau ada fitur search-replace, pakai ini:
```
Find:    from 'react-router'
Replace: from 'react-router-dom'
```

Apply ke semua file → Save → Download → Jadi! ✅

---

**🎉 Dengan cara ini, pas download langsung siap pakai di VSCode!**
