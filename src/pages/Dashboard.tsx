import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { productsAPI, Product } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart, 
  AlertTriangle,
  RefreshCw,
  Database,
  TrendingDown,
  Box,
  Truck
} from 'lucide-react';
import { Search } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  totalSales: number;
  totalProfit: number;
  totalUnitsSold: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockCount: 0,
    totalSales: 0,
    totalProfit: 0,
    totalUnitsSold: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const productsData = await productsAPI.getAll();
      setProducts(productsData);

      // Calculate stats
      const totalSales = productsData.reduce((sum, p) => sum + (p.penjualan || 0), 0);
      const totalProfit = productsData.reduce((sum, p) => sum + (p.keuntungan || 0), 0);
      const totalUnitsSold = productsData.reduce((sum, p) => sum + (p.jumlah_terjual || 0), 0);
      const lowStock = productsData.filter(p => (p.stok_akhir || 0) < 10).length;

      setStats({
        totalProducts: productsData.length,
        totalSales,
        totalProfit,
        totalUnitsSold,
        lowStockCount: lowStock,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Gagal memuat data. Pastikan backend sudah berjalan di http://localhost:3001');
    } finally {
      setIsLoading(false);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const lowStockProducts = products.filter(p => p.stok_akhir < 10);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 mx-auto animate-spin mb-4" />
          <p className="text-gray-600">Memuat data dari database...</p>
        </div>
      </div>
    );
  }

  // Dashboard untuk Admin
  if (user?.role === 'Admin') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Admin</h2>
            <p className="text-gray-600 mt-1">Selamat datang, {user?.fullName}! 👋</p>
          </div>
          <Button onClick={loadData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Total Produk</span>
                <Package className="w-5 h-5 text-blue-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500 mt-1">Item tersedia</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Total Penjualan</span>
                <DollarSign className="w-5 h-5 text-green-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatRupiah(stats.totalSales)}</div>
              <p className="text-xs text-gray-500 mt-1">Revenue keseluruhan</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Total Keuntungan</span>
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatRupiah(stats.totalProfit)}</div>
              <p className="text-xs text-gray-500 mt-1">Profit bersih</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Barang Terjual</span>
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalUnitsSold}</div>
              <p className="text-xs text-gray-500 mt-1">Unit terjual</p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Warning */}
        {stats.lowStockCount > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Peringatan Stok Menipis!</strong> {stats.lowStockCount} produk memiliki stok di bawah 10 unit.
            </AlertDescription>
          </Alert>
        )}

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Produk Real-time
            </CardTitle>
            <CardDescription>
              Monitoring stok barang dan informasi pemasok
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kode</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nama Barang</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pemasok</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Stok</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Harga Beli</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Harga Jual</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.kode_barang} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.kode_barang}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.pemasok}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        <span className={product.stok_akhir < 5 ? 'text-red-600' : product.stok_akhir < 10 ? 'text-amber-600' : 'text-gray-900'}>
                          {product.stok_akhir}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{formatRupiah(product.harga_beli)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatRupiah(product.harga_jual)}</td>
                      <td className="px-4 py-3 text-center">
                        {product.stok_akhir < 5 ? (
                          <Badge variant="destructive">Kritis</Badge>
                        ) : product.stok_akhir < 10 ? (
                          <Badge className="bg-amber-500 hover:bg-amber-600">Rendah</Badge>
                        ) : (
                          <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard untuk Karyawan Gudang
  if (user?.role === 'Karyawan Gudang') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Gudang</h2>
            <p className="text-gray-600 mt-1">Selamat datang, {user?.fullName}! 👋</p>
          </div>
          <Button onClick={loadData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards for Warehouse */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Produk Terjual</span>
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalUnitsSold}</div>
              <p className="text-xs text-gray-500 mt-1">Unit terjual bulan ini</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Produk Tersedia</span>
                <Box className="w-5 h-5 text-green-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500 mt-1">Jenis produk aktif</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center justify-between">
                <span>Produk Masuk</span>
                <Truck className="w-5 h-5 text-blue-600" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">Restock bulan ini</p>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Warning */}
        {stats.lowStockCount > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Peringatan Stok Menipis!</strong> {stats.lowStockCount} produk memiliki stok di bawah 10 unit.
            </AlertDescription>
          </Alert>
        )}

        {/* Low Stock Products Detail */}
        {lowStockProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Produk Stok Menipis
              </CardTitle>
              <CardDescription>
                Produk dengan stok di bawah 10 unit yang perlu segera direstock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div key={product.kode_barang} className="flex items-center justify-between p-3 border rounded-lg bg-amber-50">
                    <div>
                      <p className="font-medium text-gray-900">{product.nama_barang}</p>
                      <p className="text-sm text-gray-600">{product.kode_barang} • Pemasok: {product.pemasok}</p>
                    </div>
                    <Badge variant="destructive" className="text-lg">
                      {product.stok_akhir} unit
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Monitoring Stok Barang
            </CardTitle>
            <CardDescription>
              Data stok real-time dari gudang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kode</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nama Barang</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Pemasok</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Stok</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Terjual</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.kode_barang} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.kode_barang}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.pemasok}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        <span className={product.stok_akhir < 5 ? 'text-red-600' : product.stok_akhir < 10 ? 'text-amber-600' : 'text-gray-900'}>
                          {product.stok_akhir}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{product.jumlah_terjual} unit</td>
                      <td className="px-4 py-3 text-center">
                        {product.stok_akhir < 5 ? (
                          <Badge variant="destructive">Kritis</Badge>
                        ) : product.stok_akhir < 10 ? (
                          <Badge className="bg-amber-500 hover:bg-amber-600">Rendah</Badge>
                        ) : (
                          <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Cek Ketersediaan Stok Barang */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Cek Ketersediaan Stok Barang
                </CardTitle>
                <CardDescription className="mt-1">
                  Status ketersediaan stok semua produk di gudang
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari barang..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kode</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nama Barang</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Stok Tersedia</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products
                    .filter(product => 
                      product.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      product.kode_barang.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product) => {
                      const getStockStatus = (stok: number) => {
                        if (stok < 5) return { label: 'Kritis', color: 'bg-red-500' };
                        if (stok < 10) return { label: 'Kritis', color: 'bg-red-500' };
                        if (stok < 20) return { label: 'Terbatas', color: 'bg-amber-500' };
                        return { label: 'Normal', color: 'bg-green-500' };
                      };
                      const status = getStockStatus(product.stok_akhir);
                      return (
                        <tr key={product.kode_barang} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.kode_barang}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{product.stok_akhir}</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className={status.color}>{status.label}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {products.filter(product => 
                product.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.kode_barang.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada barang ditemukan
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard untuk Karyawan Toko
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Toko</h2>
          <p className="text-gray-600 mt-1">Selamat datang, {user?.fullName}! 👋</p>
        </div>
        <Button onClick={loadData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center justify-between">
              <span>Total Produk</span>
              <Package className="w-5 h-5 text-blue-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">Item tersedia</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center justify-between">
              <span>Total Penjualan</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(stats.totalSales)}</div>
            <p className="text-xs text-gray-500 mt-1">Periode: Okt-Des 2025</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center justify-between">
              <span>Total Keuntungan</span>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(stats.totalProfit)}</div>
            <p className="text-xs text-gray-500 mt-1">Periode: Okt-Des 2025</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center justify-between">
              <span>Barang Terjual</span>
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.totalUnitsSold}</div>
            <p className="text-xs text-gray-500 mt-1">Unit terjual</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Warning */}
      {stats.lowStockCount > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Peringatan Stok Menipis!</strong> {stats.lowStockCount} produk memiliki stok di bawah 10 unit.
          </AlertDescription>
        </Alert>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Produk & Ketersediaan Stok
          </CardTitle>
          <CardDescription>
            Informasi produk untuk penjualan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kode</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nama Barang</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Stok</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Harga Jual</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Terjual</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.kode_barang} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.kode_barang}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                      <span className={product.stok_akhir < 5 ? 'text-red-600' : product.stok_akhir < 10 ? 'text-amber-600' : 'text-gray-900'}>
                        {product.stok_akhir}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatRupiah(product.harga_jual)}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{product.jumlah_terjual} unit</td>
                    <td className="px-4 py-3 text-center">
                      {product.stok_akhir < 5 ? (
                        <Badge variant="destructive">Kritis</Badge>
                      ) : product.stok_akhir < 10 ? (
                        <Badge className="bg-amber-500 hover:bg-amber-600">Rendah</Badge>
                      ) : (
                        <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}