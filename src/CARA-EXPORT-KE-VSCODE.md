# 🚀 PANDUAN LENGKAP: EXPORT KE VSCODE & CONNECT DATABASE

**Tujuan:** Memindahkan aplikasi dari Figma Make ke VSCode dan menghubungkannya dengan database SQLite untuk sistem production-ready.

---

## 📦 STEP 1: EXPORT FRONTEND DARI FIGMA MAKE

### **A. Download Project dari Figma Make**

1. **Di Figma Make**, klik tombol **"Export"** atau **"Download"** di pojok kanan atas
2. Pilih **"Download as ZIP"**
3. Extract file ZIP ke komputer Anda
4. Akan ada folder: `megaperabot-frontend/`

### **B. (ALTERNATIF) Copy Manual Files**

Jika tidak ada tombol export, copy semua file penting ini:

**Frontend Files yang perlu dicopy:**
```
📁 megaperabot-frontend/
├── 📄 index.html
├── 📄 App.tsx
├── 📄 main.tsx
├── 📄 vite.config.ts
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📁 components/
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   └── ui/ (semua file UI components)
├── 📁 pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── NewOrder.tsx
│   ├── Restock.tsx
│   ├── SupplierOrders.tsx
│   ├── StockMonitoring.tsx
│   ├── UserManagement.tsx
│   ├── SalesReport.tsx
│   ├── SalesHistory.tsx
│   └── Unauthorized.tsx
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

## 💻 STEP 2: SETUP FRONTEND DI VSCODE

### **A. Buka Folder di VSCode**

```bash
# Buka Terminal/Command Prompt
cd /path/to/megaperabot-frontend
code .
```

### **B. Buat package.json**

Buat file `package.json` di root folder:

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

### **C. PENTING: Fix React Router untuk VSCode**

**Di VSCode**, kita pakai `react-router-dom` (bukan `react-router`)!

Ganti semua import di file berikut:

**1. `/App.tsx`**
```typescript
// Ganti ini:
import { BrowserRouter, Routes, Route } from 'react-router';

// Menjadi:
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

**2. `/components/ProtectedRoute.tsx`**
```typescript
import { Navigate } from 'react-router-dom';
```

**3. `/components/Layout.tsx`**
```typescript
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
```

**4. `/pages/Login.tsx`**
```typescript
import { useNavigate } from 'react-router-dom';
```

**5. `/pages/Unauthorized.tsx`**
```typescript
import { Link } from 'react-router-dom';
```

### **D. Install Dependencies**

```bash
npm install
```

**Expected output:**
```
✅ added 250+ packages in 30s
```

### **E. Test Frontend (Mode Mock)**

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.0.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Buka browser: **http://localhost:5173**

**Login untuk test:** `megaperabot` / `admin123`

✅ Frontend seharusnya berjalan dengan **mock data**!

---

## 🗄️ STEP 3: GENERATE BACKEND

### **A. Copy Script Generate Backend**

Di folder yang sama dengan `megaperabot-frontend/`, copy file:
- **`generate-backend.sh`** (script yang sudah saya buat)

### **B. Jalankan Script**

```bash
# Di terminal (folder yang sama level dengan megaperabot-frontend)
bash generate-backend.sh
```

**Output:**
```
╔═══════════════════════════════════════════════════════╗
║   MEGA PERABOT - AUTO BACKEND GENERATOR              ║
╠═══════════════════════════════════════════════════════╣
║  📦 Generating backend files...                       ║
╚═══════════════════════════════════════════════════════╝

✅ Folder structure created
✅ package.json created
✅ .env created
✅ server.js created
✅ config/database.js created
✅ middleware/cors.js created
✅ routes/auth.js created
✅ routes/products.js created
✅ routes/transactions.js created
✅ routes/supplierOrders.js created
✅ routes/restock.js created
✅ README.md created

╔═══════════════════════════════════════════════════════╗
║  ✅ BACKEND FILES GENERATED SUCCESSFULLY!            ║
╠═══════════════════════════════════════════════════════╣
║  📁 Location: ./megaperabot-backend/                  ║
╚═══════════════════════════════════════════════════════╝
```

Sekarang struktur folder Anda:
```
📁 Desktop/ (atau folder kerja Anda)
├── 📁 megaperabot-frontend/  ← Frontend React
└── 📁 megaperabot-backend/   ← Backend Node.js (baru dibuat!)
```

### **C. Install Backend Dependencies**

```bash
cd megaperabot-backend
npm install
```

**Expected output:**
```
✅ added 50+ packages in 10s
```

---

## 🗄️ STEP 4: SETUP DATABASE SQLITE

### **A. Copy Database File**

Copy file `megaperabot.db` dari DB Browser ke folder `megaperabot-backend/`

**Cara 1: Manual Copy**
```bash
# Windows
copy "C:\path\to\megaperabot.db" "megaperabot-backend\megaperabot.db"

# Mac/Linux
cp /path/to/megaperabot.db megaperabot-backend/megaperabot.db
```

**Cara 2: Jika belum punya database, buat baru:**

Buat file `init-database.js` di folder `megaperabot-backend/`:

```javascript
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./megaperabot.db');

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('Admin', 'Karyawan Toko', 'Karyawan Gudang'))
    )
  `);

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      kode_barang TEXT UNIQUE NOT NULL,
      nama_barang TEXT NOT NULL,
      kategori TEXT NOT NULL,
      pemasok TEXT NOT NULL,
      harga_beli INTEGER NOT NULL,
      harga_jual INTEGER NOT NULL,
      stok_awal INTEGER DEFAULT 0,
      stok_akhir INTEGER DEFAULT 0
    )
  `);

  // Create transactions table
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_code TEXT UNIQUE NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      payment_method TEXT NOT NULL CHECK(payment_method IN ('Cash', 'QRIS', 'Transfer Bank')),
      transaction_date DATE NOT NULL,
      created_by INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(product_id),
      FOREIGN KEY (created_by) REFERENCES users(user_id)
    )
  `);

  // Insert demo users
  db.run(`
    INSERT OR IGNORE INTO users (username, password, name, role) VALUES
    ('megaperabot', 'admin123', 'Administrator MEGA PERABOT', 'Admin'),
    ('karyawan01', 'toko123', 'Budi Santoso (Karyawan Toko)', 'Karyawan Toko'),
    ('staffgudang01', 'gudang123', 'Siti Rahayu (Staff Gudang)', 'Karyawan Gudang')
  `);

  // Insert demo products (5 fast moving items)
  db.run(`
    INSERT OR IGNORE INTO products (kode_barang, nama_barang, kategori, pemasok, harga_beli, harga_jual, stok_awal, stok_akhir) VALUES
    ('PK0018', 'KESET BIASA', 'Alat Kebersihan', 'PT Dialogue Home', 4500, 10000, 63, 28),
    ('PK0034', 'PEL BIASA NO BRAND', 'Alat Kebersihan', 'PT Dialogue Home', 11000, 20000, 41, 15),
    ('PK0033', 'PEL NAGOYA KECIL', 'Alat Kebersihan', 'Toko Maju Jaya', 20000, 35000, 21, 8),
    ('PK0006', 'KAIN LAP BIASA', 'Alat Kebersihan', 'Toko Maju Jaya', 2000, 5000, 53, 34),
    ('PK0030', 'PEL NAGATA KECIL', 'Alat Kebersihan', 'Toko Maju Jaya', 56000, 75000, 17, 3)
  `);

  console.log('✅ Database initialized successfully!');
});

db.close();
```

Jalankan:
```bash
node init-database.js
```

### **B. Verify Database**

```bash
# Cek apakah file ada
ls -la megaperabot.db

# Atau di Windows
dir megaperabot.db
```

**Expected output:**
```
-rw-r--r--  1 user  staff  20480 Feb  3 10:00 megaperabot.db
```

---

## 🚀 STEP 5: JALANKAN BACKEND

```bash
# Di folder megaperabot-backend
npm start
```

**Expected output:**
```
╔═══════════════════════════════════════════════════════╗
║         MEGA PERABOT - BACKEND API SERVER            ║
╠═══════════════════════════════════════════════════════╣
║  ✅ Server running on: http://localhost:3001         ║
║  ✅ Environment: DEVELOPMENT                          ║
║  ✅ Connected to SQLite database                      ║
║  ✅ API Prefix: /api                                  ║
╚═══════════════════════════════════════════════════════╝
```

### **Test API:**

Buka browser: **http://localhost:3001/api/health**

**Expected response:**
```json
{
  "status": "OK",
  "message": "MEGA PERABOT API is running",
  "timestamp": "2025-02-03T..."
}
```

✅ Backend berhasil jalan!

---

## 🔗 STEP 6: CONNECT FRONTEND KE BACKEND

### **A. Update Frontend Config**

Edit file `megaperabot-frontend/src/services/api.ts`:

**Baris 7 - Ubah mode:**
```typescript
// Ganti ini:
const USE_MOCK_DATA = true;

// Menjadi:
const USE_MOCK_DATA = false; // ← MATIKAN MOCK DATA!
```

**Baris 4 - Pastikan URL backend benar:**
```typescript
const API_BASE_URL = 'http://localhost:3001/api';
```

### **B. Restart Frontend**

```bash
# Di terminal frontend
cd megaperabot-frontend
npm run dev
```

---

## ✅ STEP 7: TEST FULL INTEGRATION

### **A. Open 2 Terminals di VSCode**

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

### **B. Test Login**

1. Buka browser: **http://localhost:5173**
2. Login dengan: `megaperabot` / `admin123`
3. Dashboard harus menampilkan data dari **database SQLite**!

### **C. Test Features**

✅ **Dashboard** - Lihat statistik real-time  
✅ **Stock Monitoring** - Data dari database  
✅ **New Order** - Buat transaksi baru → cek database  
✅ **Restock** - Update stok → cek database  
✅ **Supplier Orders** - Buat pesanan pemasok  
✅ **Sales Report** - Lihat transaksi dari database  

---

## 📁 STRUKTUR FOLDER FINAL

```
📁 Desktop/ (atau folder kerja Anda)
│
├── 📁 megaperabot-frontend/
│   ├── 📁 src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 context/
│   │   ├── 📁 services/
│   │   │   └── api.ts (USE_MOCK_DATA = false)
│   │   └── 📁 types/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── 📁 megaperabot-backend/
    ├── server.js
    ├── package.json
    ├── .env
    ├── megaperabot.db  ← DATABASE SQLITE
    ├── 📁 config/
    │   └── database.js
    ├── 📁 middleware/
    │   └── cors.js
    └── 📁 routes/
        ├── auth.js
        ├── products.js
        ├── transactions.js
        ├── supplierOrders.js
        └── restock.js
```

---

## 🔧 TROUBLESHOOTING

### **Problem 1: Backend error "Cannot find module 'express'"**

**Solusi:**
```bash
cd megaperabot-backend
rm -rf node_modules package-lock.json
npm install
```

### **Problem 2: Frontend CORS error**

**Solusi:** Cek `.env` di backend:
```
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### **Problem 3: Database error "SQLITE_CANTOPEN"**

**Solusi:** Pastikan file `megaperabot.db` ada di folder backend:
```bash
ls -la megaperabot-backend/megaperabot.db
```

### **Problem 4: Port 3001 sudah dipakai**

**Solusi:** Ubah port di `.env`:
```
PORT=3002
```
Dan update frontend `api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3002/api';
```

---

## 🎯 QUICK START (Ringkasan)

```bash
# 1. Generate backend
bash generate-backend.sh

# 2. Install backend
cd megaperabot-backend
npm install

# 3. Copy database
cp /path/to/megaperabot.db .

# 4. Start backend
npm start

# 5. Install frontend (di terminal baru)
cd ../megaperabot-frontend
npm install

# 6. Update api.ts: USE_MOCK_DATA = false

# 7. Start frontend
npm run dev

# 8. Open browser: http://localhost:5173
# 9. Login: megaperabot / admin123
```

---

## ✅ CHECKLIST

**Backend:**
- [ ] Script generate backend sudah jalan
- [ ] Dependencies terinstall (`node_modules/` ada)
- [ ] Database `.db` file sudah dicopy
- [ ] Server jalan di `http://localhost:3001`
- [ ] Endpoint `/api/health` response OK

**Frontend:**
- [ ] Dependencies terinstall
- [ ] Import pakai `react-router-dom` (bukan `react-router`)
- [ ] `USE_MOCK_DATA = false` di `api.ts`
- [ ] Dev server jalan di `http://localhost:5173`
- [ ] Login berhasil
- [ ] Data muncul dari database

---

**🎉 SELAMAT! Sistem MEGA PERABOT sudah terhubung ke database SQLite! 🎉**

**Next Steps:**
- Deploy ke production (Vercel + Railway/Render untuk backend)
- Tambah fitur export Excel/PDF
- Implementasi real authentication (JWT)
- Backup database otomatis

---

**Good luck! 🚀**
