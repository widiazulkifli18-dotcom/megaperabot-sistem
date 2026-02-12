import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { Product } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, RefreshCw, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';

export function SalesReport() {
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

  const totalSales = products.reduce((sum, p) => sum + p.penjualan, 0);
  const totalProfit = products.reduce((sum, p) => sum + p.keuntungan, 0);
  const totalUnits = products.reduce((sum, p) => sum + p.jumlah_terjual, 0);

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
          <h2 className="text-3xl font-bold text-gray-900">Laporan Penjualan</h2>
          <p className="text-gray-600 mt-1">Periode: Oktober - Desember 2025</p>
        </div>
        <Button onClick={loadProducts} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center justify-between">
              <span>Total Penjualan</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(totalSales)}</div>
            <p className="text-xs text-gray-500 mt-1">{totalUnits} unit terjual</p>
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
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(totalProfit)}</div>
            <p className="text-xs text-gray-500 mt-1">Profit margin</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center justify-between">
              <span>Rata-rata per Unit</span>
              <FileText className="w-5 h-5 text-blue-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatRupiah(totalUnits > 0 ? totalProfit / totalUnits : 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Keuntungan per unit</p>
          </CardContent>
        </Card>
      </div>

      {/* Detail Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Detail Laporan per Produk
          </CardTitle>
          <CardDescription>Rincian penjualan dan keuntungan setiap produk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kode</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nama Barang</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Unit Terjual</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Harga Beli</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Harga Jual</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Total Penjualan</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Keuntungan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.kode_barang} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.kode_barang}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{product.nama_barang}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{product.jumlah_terjual}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{formatRupiah(product.harga_beli)}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{formatRupiah(product.harga_jual)}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-green-600">
                      {formatRupiah(product.penjualan)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-amber-600">
                      {formatRupiah(product.keuntungan)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td colSpan={2} className="px-4 py-3 text-sm text-gray-900">TOTAL</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{totalUnits}</td>
                  <td colSpan={2}></td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">{formatRupiah(totalSales)}</td>
                  <td className="px-4 py-3 text-sm text-right text-amber-600">{formatRupiah(totalProfit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
