# 🚀 Setup Aplikasi MEGA PERABOT di Localhost

## 📋 Prerequisites
- Node.js versi 16 atau lebih tinggi
- npm atau yarn
- Backend sudah running di http://localhost:3001

## 🔧 Langkah-Langkah Setup

### 1️⃣ Download/Export Semua File dari Figma Make

Pastikan semua file dan folder ini ada di komputer Anda:

```
megaperabot-frontend/
├── components/
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       └── (semua file UI components)
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── NewOrder.tsx
│   ├── Restock.tsx
│   ├── SupplierOrders.tsx
│   └── Unauthorized.tsx
├── services/
│   └── api.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tsconfig.node.json
```

### 2️⃣ Install Dependencies

Buka terminal, masuk ke folder frontend, dan jalankan:

```bash
cd /Users/user/Documents/megaperabot/frontend
npm install
```

Tunggu hingga selesai (akan download ~300-500 MB dependencies).

### 3️⃣ Jalankan Backend (Terminal 1)

```bash
cd /Users/user/Documents/megaperabot/backend
npm start
```

Pastikan muncul:
```
🚀  Server: http://localhost:3001
✅ Connected to SQLite database
```

### 4️⃣ Jalankan Frontend (Terminal 2)

Buka terminal baru:

```bash
cd /Users/user/Documents/megaperabot/frontend
npm run dev
```

Akan muncul:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5️⃣ Buka Browser

Browser akan otomatis terbuka di `http://localhost:5173`

Atau buka manual:
- Chrome: `http://localhost:5173`
- Safari: `http://localhost:5173`
- Firefox: `http://localhost:5173`

### 6️⃣ Login

Gunakan salah satu akun:

**Admin:**
- Username: `admin`
- Password: `admin123`

**Karyawan Toko:**
- Username: `toko`
- Password: `toko123`

**Karyawan Gudang:**
- Username: `gudang`
- Password: `gudang123`

## 🔥 Troubleshooting

### Problem: "Port 5173 already in use"

Solusi:
```bash
# Kill process di port 5173
lsof -ti:5173 | xargs kill -9

# Atau gunakan port lain
npm run dev -- --port 3000
```

### Problem: "Cannot connect to backend"

Solusi:
1. Cek backend masih running di http://localhost:3001
2. Test manual: buka browser → `http://localhost:3001/api/health`
3. Harus return: `{"status":"ok","database":"connected"}`

### Problem: Dependencies error

Solusi:
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 URL Akses

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health

## 🎯 Untuk Skripsi

Struktur lengkap:

```
Database SQLite (DB Browser)
    ↕️ SQL Queries
Backend API (http://localhost:3001)
    ↕️ REST API (JSON)
Frontend React (http://localhost:5173)
    ↕️ HTTP
Browser (User Interface)
```

---

**✅ Setup Complete!** Aplikasi siap digunakan untuk pengembangan dan testing skripsi.
