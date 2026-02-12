# 🔧 Backend API Updated - Product Management

## 📋 Summary

Backend SQLite API telah diupdate dengan **3 endpoints baru** untuk fitur Kelola Produk (CRUD operations).

---

## 🆕 NEW API Endpoints

### **1. POST /api/products** - Create Product

Menambahkan produk baru ke database.

**Request Body:**
```json
{
  "kode_barang": "PK0100",
  "nama_barang": "Sapu Lidi",
  "kategori": "Alat Kebersihan",
  "harga_beli": 5000,
  "harga_jual": 10000,
  "stok_akhir": 50,
  "pemasok": "PT Dialogue Home"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Produk berhasil ditambahkan",
  "kode_barang": "PK0100"
}
```

**Response (Error - Duplicate):**
```json
{
  "error": "Kode barang sudah digunakan"
}
```

**Validasi Backend:**
- ✅ Kode barang & nama harus ada
- ✅ Harga beli & jual > 0
- ✅ Check duplicate kode barang
- ✅ Auto-set jumlah_terjual, penjualan, keuntungan = 0

---

### **2. PUT /api/products/:kode_barang** - Update Product

Memperbarui data produk yang sudah ada.

**URL Parameter:**
- `kode_barang` - Primary key produk

**Request Body:**
```json
{
  "nama_barang": "Sapu Lidi Besar",
  "kategori": "Alat Kebersihan",
  "harga_beli": 6000,
  "harga_jual": 12000,
  "stok_akhir": 45,
  "pemasok": "Toko Maju Jaya"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Produk berhasil diperbarui",
  "kode_barang": "PK0100"
}
```

**Response (Error - Not Found):**
```json
{
  "error": "Produk tidak ditemukan"
}
```

**Validasi Backend:**
- ✅ Nama barang harus ada
- ✅ Harga beli & jual > 0
- ✅ Check produk exists
- ⚠️ Kode barang TIDAK BISA diubah (primary key)

---

### **3. DELETE /api/products/:kode_barang** - Delete Product

Menghapus produk dari database.

**URL Parameter:**
- `kode_barang` - Primary key produk

**Response (Success):**
```json
{
  "success": true,
  "message": "Produk berhasil dihapus",
  "kode_barang": "PK0100"
}
```

**Response (Error - Not Found):**
```json
{
  "error": "Produk tidak ditemukan"
}
```

**Validasi Backend:**
- ✅ Check produk exists sebelum delete
- ⚠️ Permanent delete - tidak bisa undo

---

## 📊 Existing Endpoints (Unchanged)

### **GET /api/products** - Get All Products

Mengambil semua produk dari database.

**Response:**
```json
[
  {
    "kode_barang": "PK0018",
    "nama_barang": "KESET BIASA",
    "kategori": "Alat Kebersihan",
    "stok_akhir": 28,
    "harga_beli": 4500,
    "harga_jual": 10000,
    "pemasok": "PT Dialogue Home",
    "jumlah_terjual": 35,
    "penjualan": 350000,
    "keuntungan": 192500
  },
  // ... more products
]
```

### **GET /api/products/:kode_barang** - Get Product by Code

Mengambil detail 1 produk berdasarkan kode.

**Response:**
```json
{
  "kode_barang": "PK0018",
  "nama_barang": "KESET BIASA",
  "kategori": "Alat Kebersihan",
  "stok_akhir": 28,
  "harga_beli": 4500,
  "harga_jual": 10000,
  "pemasok": "PT Dialogue Home",
  "jumlah_terjual": 35,
  "penjualan": 350000,
  "keuntungan": 192500,
  "created_at": "2025-10-01 08:00:00"
}
```

---

## 🔐 Security & Validation

### **Server-Side Validations:**

1. **Required Fields Check**
   - Kode barang (create only)
   - Nama barang
   - Harga beli > 0
   - Harga jual > 0

2. **Business Rules**
   - Duplicate kode barang prevention
   - Product existence check (update/delete)
   - Proper error messages

3. **Database Integrity**
   - Primary key constraints
   - NOT NULL constraints
   - Default values for calculated fields

---

## 📝 Database Schema

Tabel `products` dengan struktur:

```sql
CREATE TABLE products (
  kode_barang TEXT PRIMARY KEY,
  nama_barang TEXT NOT NULL,
  kategori TEXT,
  harga_beli INTEGER NOT NULL,
  harga_jual INTEGER NOT NULL,
  stok_awal INTEGER DEFAULT 0,
  stok_akhir INTEGER DEFAULT 0,
  pemasok TEXT,
  jumlah_terjual INTEGER DEFAULT 0,
  penjualan INTEGER DEFAULT 0,
  keuntungan INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing API with curl

### **Create Product:**
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "kode_barang": "PK0100",
    "nama_barang": "Sapu Lidi",
    "kategori": "Alat Kebersihan",
    "harga_beli": 5000,
    "harga_jual": 10000,
    "stok_akhir": 50,
    "pemasok": "PT Dialogue Home"
  }'
```

### **Update Product:**
```bash
curl -X PUT http://localhost:3001/api/products/PK0100 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_barang": "Sapu Lidi Besar",
    "kategori": "Alat Kebersihan",
    "harga_beli": 6000,
    "harga_jual": 12000,
    "stok_akhir": 45,
    "pemasok": "Toko Maju Jaya"
  }'
```

### **Delete Product:**
```bash
curl -X DELETE http://localhost:3001/api/products/PK0100
```

---

## 🔧 Backend File Modified

**File:** `/backend/server-sqlite.js`

**Lines Added:** ~200 lines

**New Functions:**
1. ✅ POST /api/products - Create handler
2. ✅ PUT /api/products/:kode_barang - Update handler  
3. ✅ DELETE /api/products/:kode_barang - Delete handler

**Features:**
- ✅ Full error handling
- ✅ Validation checks
- ✅ Database transaction safety
- ✅ Proper HTTP status codes
- ✅ Indonesian error messages
- ✅ Console logging untuk debugging

---

## 🚀 Starting Backend

Pastikan backend sudah running:

```bash
cd backend
npm install
node server-sqlite.js
```

**Output Expected:**
```
🚀 Server running on http://localhost:3001
✅ Database connected: mega-perabot.db
```

---

## 📦 Complete API Endpoint List

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:kode` | Get product by code | No |
| **POST** | **`/api/products`** | **Create product** ✨ | **Yes** |
| **PUT** | **`/api/products/:kode`** | **Update product** ✨ | **Yes** |
| **DELETE** | **`/api/products/:kode`** | **Delete product** ✨ | **Yes** |
| POST | `/api/orders/customer` | Create customer order | Yes |
| POST | `/api/orders/supplier` | Create supplier order | Yes |
| POST | `/api/restock` | Create restock | Yes |
| GET | `/api/dashboard/stats` | Get dashboard stats | No |
| GET | `/api/suppliers` | Get all suppliers | No |
| GET | `/api/transactions` | Get all transactions | No |

*✨ = New endpoints*

---

## ✅ Status

**Backend API:** ✅ Complete & Ready  
**Frontend Integration:** ✅ Connected  
**Testing:** ✅ Validated  
**Documentation:** ✅ Complete  

Semua endpoint CRUD produk sudah siap digunakan! 🎉
