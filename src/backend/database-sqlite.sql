-- ============================================
-- DATABASE SCHEMA MEGA PERABOT
-- SQLite Database for Inventory Management
-- ============================================

-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'toko', 'gudang')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default users
INSERT INTO users (username, password, name, role) VALUES
('megaperabot', 'admin123', 'Administrator MEGA PERABOT', 'admin'),
('karyawan01', 'toko123', 'Budi Santoso (Karyawan Toko)', 'toko'),
('staffgudang01', 'gudang123', 'Siti Rahayu (Staff Gudang)', 'gudang');

-- ==================== PRODUCTS TABLE ====================
CREATE TABLE IF NOT EXISTS products (
    kode_barang TEXT PRIMARY KEY,
    nama_barang TEXT NOT NULL,
    kategori TEXT NOT NULL,
    pemasok TEXT NOT NULL,
    harga_beli REAL NOT NULL DEFAULT 0,
    harga_jual REAL NOT NULL DEFAULT 0,
    stok_awal INTEGER NOT NULL DEFAULT 0,
    stok_masuk INTEGER NOT NULL DEFAULT 0,
    stok_keluar INTEGER NOT NULL DEFAULT 0,
    stok_akhir INTEGER NOT NULL DEFAULT 0,
    jumlah_terjual INTEGER NOT NULL DEFAULT 0,
    penjualan REAL NOT NULL DEFAULT 0,
    keuntungan REAL NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert 5 fast moving products
INSERT INTO products (kode_barang, nama_barang, kategori, pemasok, harga_beli, harga_jual, stok_awal, stok_akhir, jumlah_terjual, penjualan, keuntungan) VALUES
('PK0018', 'KESET BIASA', 'Alat Kebersihan', 'PT Dialogue Home', 4500, 10000, 63, 28, 35, 350000, 192500),
('PK0034', 'PEL BIASA NO BRAND', 'Alat Kebersihan', 'PT Dialogue Home', 11000, 20000, 41, 15, 26, 520000, 234000),
('PK0033', 'PEL NAGOYA KECIL', 'Alat Kebersihan', 'Toko Maju Jaya', 20000, 35000, 21, 8, 13, 455000, 195000),
('PK0006', 'KAIN LAP BIASA', 'Alat Kebersihan', 'Toko Maju Jaya', 2000, 5000, 53, 34, 19, 95000, 57000),
('PK0030', 'PEL NAGATA KECIL', 'Alat Kebersihan', 'Toko Maju Jaya', 56000, 75000, 17, 3, 14, 1050000, 266000);

-- ==================== STOCK ITEMS TABLE ====================
CREATE TABLE IF NOT EXISTS stock_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kode_barang TEXT NOT NULL,
    nama_barang TEXT NOT NULL,
    kategori TEXT NOT NULL,
    stok_tersedia INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL CHECK(status IN ('Tersedia', 'Stok Rendah', 'Habis')),
    lokasi_gudang TEXT DEFAULT 'Gudang Utama',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kode_barang) REFERENCES products(kode_barang)
);

-- Insert stock items
INSERT INTO stock_items (kode_barang, nama_barang, kategori, stok_tersedia, status) VALUES
('PK0018', 'KESET BIASA', 'Alat Kebersihan', 28, 'Tersedia'),
('PK0034', 'PEL BIASA NO BRAND', 'Alat Kebersihan', 15, 'Tersedia'),
('PK0033', 'PEL NAGOYA KECIL', 'Alat Kebersihan', 8, 'Stok Rendah'),
('PK0006', 'KAIN LAP BIASA', 'Alat Kebersihan', 34, 'Tersedia'),
('PK0030', 'PEL NAGATA KECIL', 'Alat Kebersihan', 3, 'Stok Rendah');

-- ==================== CUSTOMER ORDERS TABLE ====================
CREATE TABLE IF NOT EXISTS customer_orders (
    id TEXT PRIMARY KEY,
    total_pembayaran REAL NOT NULL,
    metode_pembayaran TEXT NOT NULL,
    tanggal DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ORDER ITEMS TABLE ====================
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    kode_barang TEXT NOT NULL,
    nama_barang TEXT NOT NULL,
    jumlah INTEGER NOT NULL,
    harga REAL NOT NULL,
    subtotal REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES customer_orders(id),
    FOREIGN KEY (kode_barang) REFERENCES products(kode_barang)
);

-- ==================== RESTOCK ENTRIES TABLE ====================
CREATE TABLE IF NOT EXISTS restock_entries (
    id TEXT PRIMARY KEY,
    kode_barang TEXT NOT NULL,
    nama_barang TEXT NOT NULL,
    jumlah_masuk INTEGER NOT NULL,
    harga_beli REAL NOT NULL,
    tanggal_penerimaan DATE NOT NULL,
    pemasok TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kode_barang) REFERENCES products(kode_barang)
);

-- ==================== SUPPLIER ORDERS TABLE ====================
CREATE TABLE IF NOT EXISTS supplier_orders (
    id TEXT PRIMARY KEY,
    pemasok TEXT NOT NULL,
    kode_barang TEXT NOT NULL,
    nama_barang TEXT NOT NULL,
    jumlah_pesanan INTEGER NOT NULL,
    harga_satuan REAL NOT NULL,
    total_harga REAL NOT NULL,
    tanggal_pemesanan DATE NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Diterima', 'Dibatalkan')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kode_barang) REFERENCES products(kode_barang)
);

-- ==================== INDEXES FOR PERFORMANCE ====================
CREATE INDEX IF NOT EXISTS idx_products_kategori ON products(kategori);
CREATE INDEX IF NOT EXISTS idx_products_pemasok ON products(pemasok);
CREATE INDEX IF NOT EXISTS idx_stock_items_status ON stock_items(status);
CREATE INDEX IF NOT EXISTS idx_customer_orders_tanggal ON customer_orders(tanggal);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_restock_tanggal ON restock_entries(tanggal_penerimaan);
CREATE INDEX IF NOT EXISTS idx_supplier_orders_status ON supplier_orders(status);
