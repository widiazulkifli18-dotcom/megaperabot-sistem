# MEGA PERABOT Backend API

Backend server untuk sistem manajemen stok MEGA PERABOT menggunakan SQLite database.

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

## 🚀 Instalasi & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
npm run init-db
```

Ini akan:
- Membuat file database `megaperabot.db`
- Menjalankan semua SQL dari `database-sqlite.sql`
- Membuat tabel dan memasukkan data awal

### 3. Jalankan Server
```bash
npm start
```

Atau dengan auto-reload:
```bash
npm run dev
```

Server akan jalan di: **http://localhost:3001**

## 🔑 Akun Default

Setelah database di-initialize, gunakan akun ini untuk login:

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Karyawan Gudang | `gudang` | `gudang123` |
| Karyawan Toko | `toko` | `toko123` |

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
```

### Products
```
GET  /api/products              # Get all products
GET  /api/products/:kode_barang # Get single product
```

### Customer Orders
```
POST /api/orders/customer       # Create new order
GET  /api/orders                # Get all orders
```

### Restock
```
POST /api/restock               # Add stock
GET  /api/restock               # Get restock history
```

### Supplier Orders
```
POST /api/orders/supplier       # Create supplier order
GET  /api/orders/supplier       # Get supplier orders
```

## 🗄️ Database Schema

Database menggunakan SQLite dengan tabel:
- `users` - Data pengguna/karyawan
- `products` - Data produk
- `stock_items` - Status stok
- `customer_orders` - Pesanan pelanggan
- `order_items` - Detail item pesanan
- `restock_entries` - Riwayat restock
- `supplier_orders` - Pesanan ke pemasok

## 🛠️ Troubleshooting

### Database tidak terbuat
```bash
# Cek apakah file SQL ada
ls -la database-sqlite.sql

# Re-initialize database
rm megaperabot.db
npm run init-db
```

### Error "SQLITE_ERROR: no such column"
Database schema tidak match. Jalankan ulang:
```bash
npm run init-db
npm start
```

### Port 3001 sudah digunakan
Edit `server-sqlite.js`:
```javascript
const PORT = 3002; // Ganti port
```

## 📝 Notes

- Database file: `megaperabot.db` (jangan commit ke git)
- Schema: `database-sqlite.sql` (ini yang di-commit)
- Backup database secara berkala

## 🔗 Frontend Integration

Frontend harus connect ke: `http://localhost:3001`

Edit file frontend `services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3001/api';
```

## 📄 License

MIT - MEGA PERABOT © 2026
