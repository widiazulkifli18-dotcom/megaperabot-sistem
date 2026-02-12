// Type Definitions untuk MEGA PERABOT System

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'Admin' | 'Karyawan Gudang' | 'Karyawan Toko';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Product {
  kode_barang: string;
  nama_barang: string;
  kategori: string;
  stok_akhir: number;
  harga_beli: number;
  harga_jual: number;
  pemasok: string;
  jumlah_terjual: number;
  penjualan: number;
  keuntungan: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  totalProfit: number;
  totalOrders: number;
  lowStockProducts: number;
}
