import { LoginCredentials, Product } from '../types';

// Backend API base URL - sesuaikan dengan backend VS Code Anda
const API_BASE_URL = 'http://localhost:3001/api';

// Development mode - set true untuk pakai mock data (tanpa backend)
const USE_MOCK_DATA = true; // ✅ UBAH JADI true UNTUK FIGMA MAKE (no backend)

// Mock users sesuai database SQLite
const MOCK_USERS = [
  { id: 1, username: 'megaperabot', password: 'admin123', fullName: 'Administrator MEGA PERABOT', role: 'Admin' },
  { id: 2, username: 'karyawan01', password: 'toko123', fullName: 'Budi Santoso (Karyawan Toko)', role: 'Karyawan Toko' },
  { id: 3, username: 'staffgudang01', password: 'gudang123', fullName: 'Siti Rahayu (Staff Gudang)', role: 'Karyawan Gudang' },
];

// Mock products - 5 fast moving items dari database SQLite
const MOCK_PRODUCTS: Product[] = [
  { 
    kode_barang: 'PK0018', 
    nama_barang: 'KESET BIASA', 
    kategori: 'Alat Kebersihan', 
    pemasok: 'PT Dialogue Home', 
    harga_beli: 4500, 
    harga_jual: 10000, 
    stok_awal: 63,
    stok_akhir: 28, 
    jumlah_terjual: 35, 
    penjualan: 350000, 
    keuntungan: 192500 
  },
  { 
    kode_barang: 'PK0034', 
    nama_barang: 'PEL BIASA NO BRAND', 
    kategori: 'Alat Kebersihan', 
    pemasok: 'PT Dialogue Home', 
    harga_beli: 11000, 
    harga_jual: 20000, 
    stok_awal: 45,
    stok_akhir: 14, 
    jumlah_terjual: 31, 
    penjualan: 620000, 
    keuntungan: 279000 
  },
  { 
    kode_barang: 'PK0033', 
    nama_barang: 'PEL NAGOYA KECIL', 
    kategori: 'Alat Kebersihan', 
    pemasok: 'Toko Maju Jaya', 
    harga_beli: 20000, 
    harga_jual: 35000, 
    stok_awal: 38,
    stok_akhir: 10, 
    jumlah_terjual: 28, 
    penjualan: 980000, 
    keuntungan: 420000 
  },
  { 
    kode_barang: 'PK0007', 
    nama_barang: 'KAIN LAP BIASA', 
    kategori: 'Alat Kebersihan', 
    pemasok: 'Toko Maju Jaya', 
    harga_beli: 2000, 
    harga_jual: 5000, 
    stok_awal: 60,
    stok_akhir: 34, 
    jumlah_terjual: 26, 
    penjualan: 130000, 
    keuntungan: 78000 
  },
  { 
    kode_barang: 'PK0030', 
    nama_barang: 'PEL NAGATA KECIL', 
    kategori: 'Alat Kebersihan', 
    pemasok: 'Toko Maju Jaya', 
    harga_beli: 56000, 
    harga_jual: 75000, 
    stok_awal: 20,
    stok_akhir: 3, 
    jumlah_terjual: 17, 
    penjualan: 1275000, 
    keuntungan: 323000 
  },
];

// ✅ INIT localStorage with default data if empty
if (!localStorage.getItem('megaperabot_products')) {
  localStorage.setItem('megaperabot_products', JSON.stringify(MOCK_PRODUCTS));
  console.log('✅ localStorage initialized with default products');
}

// Mock transactions - 96 transaksi Oktober - Desember 2025
const MOCK_TRANSACTIONS = [
  // Oktober 2025 - 35 transaksi
  { id: 1, kode: 'TRX-20251001-0001', tanggal: '2025-10-01', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 2, kode: 'TRX-20251001-0002', tanggal: '2025-10-01', produk: 'PEL BIASA NO BRAND', quantity: 1, harga: 20000, subtotal: 20000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 3, kode: 'TRX-20251002-0001', tanggal: '2025-10-02', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 4, kode: 'TRX-20251002-0002', tanggal: '2025-10-02', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 5, kode: 'TRX-20251003-0001', tanggal: '2025-10-03', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 6, kode: 'TRX-20251003-0002', tanggal: '2025-10-03', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 7, kode: 'TRX-20251004-0001', tanggal: '2025-10-04', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 8, kode: 'TRX-20251005-0001', tanggal: '2025-10-05', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 9, kode: 'TRX-20251005-0002', tanggal: '2025-10-05', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 10, kode: 'TRX-20251006-0001', tanggal: '2025-10-06', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 11, kode: 'TRX-20251007-0001', tanggal: '2025-10-07', produk: 'PEL NAGATA KECIL', quantity: 2, harga: 75000, subtotal: 150000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 12, kode: 'TRX-20251008-0001', tanggal: '2025-10-08', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 13, kode: 'TRX-20251009-0001', tanggal: '2025-10-09', produk: 'PEL BIASA NO BRAND', quantity: 1, harga: 20000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 14, kode: 'TRX-20251010-0001', tanggal: '2025-10-10', produk: 'KAIN LAP BIASA', quantity: 4, harga: 5000, subtotal: 20000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 15, kode: 'TRX-20251011-0001', tanggal: '2025-10-11', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 16, kode: 'TRX-20251012-0001', tanggal: '2025-10-12', produk: 'PEL NAGOYA KECIL', quantity: 2, harga: 35000, subtotal: 70000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 17, kode: 'TRX-20251013-0001', tanggal: '2025-10-13', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 18, kode: 'TRX-20251014-0001', tanggal: '2025-10-14', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 19, kode: 'TRX-20251015-0001', tanggal: '2025-10-15', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 20, kode: 'TRX-20251016-0001', tanggal: '2025-10-16', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 21, kode: 'TRX-20251017-0001', tanggal: '2025-10-17', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 22, kode: 'TRX-20251018-0001', tanggal: '2025-10-18', produk: 'PEL NAGATA KECIL', quantity: 2, harga: 75000, subtotal: 150000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 23, kode: 'TRX-20251019-0001', tanggal: '2025-10-19', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 24, kode: 'TRX-20251020-0001', tanggal: '2025-10-20', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 25, kode: 'TRX-20251021-0001', tanggal: '2025-10-21', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 26, kode: 'TRX-20251022-0001', tanggal: '2025-10-22', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 27, kode: 'TRX-20251023-0001', tanggal: '2025-10-23', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 28, kode: 'TRX-20251024-0001', tanggal: '2025-10-24', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 29, kode: 'TRX-20251025-0001', tanggal: '2025-10-25', produk: 'PEL BIASA NO BRAND', quantity: 3, harga: 20000, subtotal: 60000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 30, kode: 'TRX-20251026-0001', tanggal: '2025-10-26', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 31, kode: 'TRX-20251027-0001', tanggal: '2025-10-27', produk: 'KESET BIASA', quantity: 4, harga: 10000, subtotal: 40000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 32, kode: 'TRX-20251028-0001', tanggal: '2025-10-28', produk: 'PEL NAGOYA KECIL', quantity: 2, harga: 35000, subtotal: 70000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 33, kode: 'TRX-20251029-0001', tanggal: '2025-10-29', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 34, kode: 'TRX-20251030-0001', tanggal: '2025-10-30', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 35, kode: 'TRX-20251031-0001', tanggal: '2025-10-31', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  
  // November 2025 - 30 transaksi
  { id: 36, kode: 'TRX-20251101-0001', tanggal: '2025-11-01', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 37, kode: 'TRX-20251102-0001', tanggal: '2025-11-02', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 38, kode: 'TRX-20251103-0001', tanggal: '2025-11-03', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 39, kode: 'TRX-20251104-0001', tanggal: '2025-11-04', produk: 'PEL NAGATA KECIL', quantity: 2, harga: 75000, subtotal: 150000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 40, kode: 'TRX-20251105-0001', tanggal: '2025-11-05', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 41, kode: 'TRX-20251106-0001', tanggal: '2025-11-06', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 42, kode: 'TRX-20251107-0001', tanggal: '2025-11-07', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 43, kode: 'TRX-20251108-0001', tanggal: '2025-11-08', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 44, kode: 'TRX-20251109-0001', tanggal: '2025-11-09', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 45, kode: 'TRX-20251110-0001', tanggal: '2025-11-10', produk: 'PEL BIASA NO BRAND', quantity: 3, harga: 20000, subtotal: 60000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 46, kode: 'TRX-20251111-0001', tanggal: '2025-11-11', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 47, kode: 'TRX-20251112-0001', tanggal: '2025-11-12', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 48, kode: 'TRX-20251113-0001', tanggal: '2025-11-13', produk: 'PEL NAGOYA KECIL', quantity: 2, harga: 35000, subtotal: 70000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 49, kode: 'TRX-20251114-0001', tanggal: '2025-11-14', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 50, kode: 'TRX-20251115-0001', tanggal: '2025-11-15', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 51, kode: 'TRX-20251116-0001', tanggal: '2025-11-16', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 52, kode: 'TRX-20251117-0001', tanggal: '2025-11-17', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 53, kode: 'TRX-20251118-0001', tanggal: '2025-11-18', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 54, kode: 'TRX-20251119-0001', tanggal: '2025-11-19', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 55, kode: 'TRX-20251120-0001', tanggal: '2025-11-20', produk: 'PEL NAGATA KECIL', quantity: 2, harga: 75000, subtotal: 150000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 56, kode: 'TRX-20251121-0001', tanggal: '2025-11-21', produk: 'PEL BIASA NO BRAND', quantity: 3, harga: 20000, subtotal: 60000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 57, kode: 'TRX-20251122-0001', tanggal: '2025-11-22', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 58, kode: 'TRX-20251123-0001', tanggal: '2025-11-23', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 59, kode: 'TRX-20251124-0001', tanggal: '2025-11-24', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 60, kode: 'TRX-20251125-0001', tanggal: '2025-11-25', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 61, kode: 'TRX-20251126-0001', tanggal: '2025-11-26', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 62, kode: 'TRX-20251127-0001', tanggal: '2025-11-27', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 63, kode: 'TRX-20251128-0001', tanggal: '2025-11-28', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 64, kode: 'TRX-20251129-0001', tanggal: '2025-11-29', produk: 'PEL NAGOYA KECIL', quantity: 2, harga: 35000, subtotal: 70000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 65, kode: 'TRX-20251130-0001', tanggal: '2025-11-30', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Cash', kasir: 'Budi Santoso' },
  
  // Desember 2025 - 31 transaksi
  { id: 66, kode: 'TRX-20251201-0001', tanggal: '2025-12-01', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 67, kode: 'TRX-20251202-0001', tanggal: '2025-12-02', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 68, kode: 'TRX-20251203-0001', tanggal: '2025-12-03', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 69, kode: 'TRX-20251204-0001', tanggal: '2025-12-04', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 70, kode: 'TRX-20251205-0001', tanggal: '2025-12-05', produk: 'PEL NAGATA KECIL', quantity: 2, harga: 75000, subtotal: 150000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 71, kode: 'TRX-20251206-0001', tanggal: '2025-12-06', produk: 'PEL BIASA NO BRAND', quantity: 3, harga: 20000, subtotal: 60000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 72, kode: 'TRX-20251207-0001', tanggal: '2025-12-07', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 73, kode: 'TRX-20251208-0001', tanggal: '2025-12-08', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 74, kode: 'TRX-20251209-0001', tanggal: '2025-12-09', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 75, kode: 'TRX-20251210-0001', tanggal: '2025-12-10', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 76, kode: 'TRX-20251211-0001', tanggal: '2025-12-11', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 77, kode: 'TRX-20251212-0001', tanggal: '2025-12-12', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 78, kode: 'TRX-20251213-0001', tanggal: '2025-12-13', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 79, kode: 'TRX-20251214-0001', tanggal: '2025-12-14', produk: 'PEL NAGOYA KECIL', quantity: 2, harga: 35000, subtotal: 70000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 80, kode: 'TRX-20251215-0001', tanggal: '2025-12-15', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 81, kode: 'TRX-20251216-0001', tanggal: '2025-12-16', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 82, kode: 'TRX-20251217-0001', tanggal: '2025-12-17', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 83, kode: 'TRX-20251218-0001', tanggal: '2025-12-18', produk: 'KAIN LAP BIASA', quantity: 3, harga: 5000, subtotal: 15000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 84, kode: 'TRX-20251219-0001', tanggal: '2025-12-19', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 85, kode: 'TRX-20251220-0001', tanggal: '2025-12-20', produk: 'PEL NAGATA KECIL', quantity: 2, harga: 75000, subtotal: 150000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 86, kode: 'TRX-20251221-0001', tanggal: '2025-12-21', produk: 'PEL BIASA NO BRAND', quantity: 3, harga: 20000, subtotal: 60000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 87, kode: 'TRX-20251222-0001', tanggal: '2025-12-22', produk: 'KESET BIASA', quantity: 2, harga: 10000, subtotal: 20000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 88, kode: 'TRX-20251223-0001', tanggal: '2025-12-23', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 89, kode: 'TRX-20251224-0001', tanggal: '2025-12-24', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 90, kode: 'TRX-20251225-0001', tanggal: '2025-12-25', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 91, kode: 'TRX-20251226-0001', tanggal: '2025-12-26', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 92, kode: 'TRX-20251227-0001', tanggal: '2025-12-27', produk: 'KESET BIASA', quantity: 3, harga: 10000, subtotal: 30000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
  { id: 93, kode: 'TRX-20251228-0001', tanggal: '2025-12-28', produk: 'KAIN LAP BIASA', quantity: 2, harga: 5000, subtotal: 10000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 94, kode: 'TRX-20251229-0001', tanggal: '2025-12-29', produk: 'PEL NAGOYA KECIL', quantity: 1, harga: 35000, subtotal: 35000, metode: 'QRIS', kasir: 'Budi Santoso' },
  { id: 95, kode: 'TRX-20251230-0001', tanggal: '2025-12-30', produk: 'PEL NAGATA KECIL', quantity: 1, harga: 75000, subtotal: 75000, metode: 'Cash', kasir: 'Budi Santoso' },
  { id: 96, kode: 'TRX-20251231-0001', tanggal: '2025-12-31', produk: 'PEL BIASA NO BRAND', quantity: 2, harga: 20000, subtotal: 40000, metode: 'Transfer Bank', kasir: 'Budi Santoso' },
];

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Jika mode development, return mock data
  if (USE_MOCK_DATA) {
    console.log('🟡 DEVELOPMENT MODE: Using mock data for', endpoint);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockApiResponse(endpoint, options) as T;
  }

  // Production mode - call real backend
  try {
    console.log('🔵 API Call:', `${API_BASE_URL}${endpoint}`, options);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      mode: 'cors',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    console.log('🔵 Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ API Response:', data);
    return data;
  } catch (error) {
    console.error('❌ API Call Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend sudah berjalan di http://localhost:3001');
    }
    throw error;
  }
}

// Mock API responses for development
function mockApiResponse(endpoint: string, options?: RequestInit): any {
  const method = options?.method || 'GET';
  
  // Login
  if (endpoint === '/auth/login' && method === 'POST') {
    const body = JSON.parse(options?.body as string);
    const user = MOCK_USERS.find(u => u.username === body.username && u.password === body.password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    throw new Error('Username atau password salah');
  }
  
  // Get all products
  if (endpoint === '/products' && method === 'GET') {
    // Try to get from localStorage first, fallback to MOCK_PRODUCTS
    const stored = localStorage.getItem('megaperabot_products');
    return stored ? JSON.parse(stored) : MOCK_PRODUCTS;
  }
  
  // Get product by code
  if (endpoint.startsWith('/products/') && method === 'GET') {
    const kode = endpoint.split('/')[2];
    const stored = localStorage.getItem('megaperabot_products');
    const products = stored ? JSON.parse(stored) : MOCK_PRODUCTS;
    const product = products.find((p: Product) => p.kode_barang === kode);
    if (product) return product;
    throw new Error('Produk tidak ditemukan');
  }

  // Create product
  if (endpoint === '/products' && method === 'POST') {
    const body = JSON.parse(options?.body as string);
    const stored = localStorage.getItem('megaperabot_products');
    const products = stored ? JSON.parse(stored) : [...MOCK_PRODUCTS];
    
    // Check duplicate
    if (products.find((p: Product) => p.kode_barang === body.kode_barang)) {
      throw new Error('Kode barang sudah digunakan');
    }
    
    // Add new product
    const newProduct = {
      ...body,
      stok_awal: body.stok_akhir || 0,
      jumlah_terjual: 0,
      penjualan: 0,
      keuntungan: 0,
    };
    products.push(newProduct);
    localStorage.setItem('megaperabot_products', JSON.stringify(products));
    
    return { success: true, message: 'Produk berhasil ditambahkan', kode_barang: body.kode_barang };
  }

  // Update product
  if (endpoint.startsWith('/products/') && method === 'PUT') {
    const kode = endpoint.split('/')[2];
    const body = JSON.parse(options?.body as string);
    const stored = localStorage.getItem('megaperabot_products');
    const products = stored ? JSON.parse(stored) : [...MOCK_PRODUCTS];
    
    const index = products.findIndex((p: Product) => p.kode_barang === kode);
    if (index === -1) {
      throw new Error('Produk tidak ditemukan');
    }
    
    // Update product (keep kode_barang, jumlah_terjual, penjualan, keuntungan)
    products[index] = {
      ...products[index],
      ...body,
      kode_barang: kode, // kode tidak boleh diubah
    };
    localStorage.setItem('megaperabot_products', JSON.stringify(products));
    
    return { success: true, message: 'Produk berhasil diperbarui', kode_barang: kode };
  }

  // Delete product
  if (endpoint.startsWith('/products/') && method === 'DELETE') {
    const kode = endpoint.split('/')[2];
    const stored = localStorage.getItem('megaperabot_products');
    const products = stored ? JSON.parse(stored) : [...MOCK_PRODUCTS];
    
    const index = products.findIndex((p: Product) => p.kode_barang === kode);
    if (index === -1) {
      throw new Error('Produk tidak ditemukan');
    }
    
    products.splice(index, 1);
    localStorage.setItem('megaperabot_products', JSON.stringify(products));
    
    return { success: true, message: 'Produk berhasil dihapus', kode_barang: kode };
  }
  
  // Dashboard stats
  if (endpoint === '/dashboard/stats' && method === 'GET') {
    const stored = localStorage.getItem('megaperabot_products');
    const products = stored ? JSON.parse(stored) : MOCK_PRODUCTS;
    return {
      totalProducts: products.length,
      lowStockCount: products.filter((p: Product) => p.stok_akhir < 10).length,
      totalSales: products.reduce((sum: number, p: Product) => sum + (p.penjualan || 0), 0),
      totalProfit: products.reduce((sum: number, p: Product) => sum + (p.keuntungan || 0), 0),
      totalUnitsSold: products.reduce((sum: number, p: Product) => sum + (p.jumlah_terjual || 0), 0),
    };
  }
  
  // Get all transactions
  if (endpoint === '/transactions' && method === 'GET') {
    return MOCK_TRANSACTIONS;
  }
  
  // Get transactions by date range
  if (endpoint.includes('/transactions?') && method === 'GET') {
    // Parse query parameters if needed
    return MOCK_TRANSACTIONS;
  }
  
  // Create order/restock - just return success
  if (method === 'POST') {
    return { success: true, message: 'Data berhasil disimpan (mock)' };
  }
  
  return { success: true };
}

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    return apiCall<{ success: boolean; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    return apiCall<Product[]>('/products');
  },
  
  getByCode: async (kode_barang: string) => {
    return apiCall<Product>(`/products/${kode_barang}`);
  },

  create: async (product: any) => {
    return apiCall<any>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  update: async (kode_barang: string, product: any) => {
    return apiCall<any>(`/products/${kode_barang}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  },

  delete: async (kode_barang: string) => {
    return apiCall<any>(`/products/${kode_barang}`, {
      method: 'DELETE',
    });
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return apiCall<{
      totalProducts: number;
      lowStockCount: number;
      totalSales: number;
      totalProfit: number;
      totalUnitsSold: number;
    }>('/dashboard/stats');
  },
};

// Orders API
export const ordersAPI = {
  createCustomerOrder: async (order: any) => {
    return apiCall<any>('/orders/customer', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },
  
  createSupplierOrder: async (order: any) => {
    return apiCall<any>('/orders/supplier', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },
  
  create: async (order: any) => {
    return apiCall<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },
  
  getAll: async () => {
    return apiCall<any[]>('/orders');
  },
};

// Restock API
export const restockAPI = {
  create: async (restock: any) => {
    return apiCall<any>('/restock', {
      method: 'POST',
      body: JSON.stringify(restock),
    });
  },
  
  getAll: async () => {
    return apiCall<any[]>('/restock');
  },
};

// Suppliers API
export const suppliersAPI = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      return ['PT Dialogue Home', 'Toko Maju Jaya'];
    }
    return apiCall<string[]>('/suppliers');
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      return ['Alat Kebersihan'];
    }
    return apiCall<string[]>('/categories');
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      return MOCK_TRANSACTIONS;
    }
    return apiCall<any[]>('/transactions');
  },
  
  getByDateRange: async (startDate: string, endDate: string) => {
    if (USE_MOCK_DATA) {
      return MOCK_TRANSACTIONS.filter(t => {
        return t.tanggal >= startDate && t.tanggal <= endDate;
      });
    }
    return apiCall<any[]>(`/transactions?start=${startDate}&end=${endDate}`);
  },
};

// Export mock data untuk bisa diakses dari komponen lain
export { MOCK_TRANSACTIONS, MOCK_PRODUCTS, MOCK_USERS };

// Export consolidated API object
export const api = {
  auth: authAPI,
  products: productsAPI,
  dashboard: dashboardAPI,
  orders: ordersAPI,
  restock: restockAPI,
  suppliers: suppliersAPI,
  categories: categoriesAPI,
  transactions: transactionsAPI,
};