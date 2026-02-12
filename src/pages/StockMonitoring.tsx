import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { Product } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertTriangle, TrendingUp, Package, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

export function StockMonitoring() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
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

  const criticalStock = products.filter(p => p.stok_akhir < 10);
  const fastMoving = [...products].sort((a, b) => b.jumlah_terjual - a.jumlah_terjual).slice(0, 3);

  const getStockStatus = (stok: number) => {
    if (stok < 5) return { label: 'Kritis', color: 'bg-red-500' };
    if (stok < 10) return { label: 'Kritis', color: 'bg-red-500' };
    if (stok < 20) return { label: 'Terbatas', color: 'bg-amber-500' };
    return { label: 'Normal', color: 'bg-green-500' };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <RefreshCw className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Monitoring Stok</h2>
          <p className="text-gray-600 mt-1">Pantau ketersediaan dan pergerakan stok barang</p>
        </div>
        <Button onClick={loadProducts} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stok Kritis */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Cek Stok Kritis (Stok &lt; 10)
            </CardTitle>
            <CardDescription>Produk yang perlu segera direstock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalStock.map((product) => (
                <div key={product.kode_barang} className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{product.nama_barang}</p>
                      <p className="text-sm text-gray-600">{product.kode_barang}</p>
                    </div>
                    <Badge variant="destructive" className="text-sm">
                      Stok: {product.stok_akhir}
                    </Badge>
                  </div>
                  <p className="text-xs text-red-600">Min: 10</p>
                </div>
              ))}
              {criticalStock.length === 0 && (
                <p className="text-center text-gray-500 py-4">Tidak ada stok kritis</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fast Moving */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Cek Barang Fast Moving
            </CardTitle>
            <CardDescription>Top 3 produk paling laku</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fastMoving.map((product, index) => (
                <div key={product.kode_barang} className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600">#{index + 1}</Badge>
                        <p className="font-semibold text-gray-900">{product.nama_barang}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{product.kode_barang}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-green-600">{product.jumlah_terjual} terjual</p>
                    <p className="text-sm text-gray-600">Stok: {product.stok_akhir}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ketersediaan Barang */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Cek Ketersediaan Barang
          </CardTitle>
          <CardDescription>Status stok semua produk</CardDescription>
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
                {products.map((product) => {
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
