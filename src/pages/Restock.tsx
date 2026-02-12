import { useState, useEffect } from 'react';
import { productsAPI, restockAPI } from '../services/api';
import { Product } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Package, Search, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast, ToastContainer } from '../hooks/useToast';

export function Restock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, toasts } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      toast.error('Gagal memuat data produk');
    }
  };

  const filteredProducts = products.filter(p =>
    p.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.kode_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(p => p.stok_akhir < 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    setIsSubmitting(true);
    try {
      await restockAPI.create({
        kode_barang: selectedProduct.kode_barang,
        quantity: parseInt(quantity),
      });
      toast.success(`Restock ${selectedProduct.nama_barang} berhasil!`);
      setSelectedProduct(null);
      setQuantity('');
      loadProducts(); // Reload to get updated stock
    } catch (error) {
      toast.error('Gagal melakukan restock');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Restock Barang</h2>
        <p className="text-gray-600 mt-1">Tambah stok barang dari gudang</p>
      </div>

      {lowStockProducts.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <AlertTriangle className="w-5 h-5" />
              Produk Stok Rendah
            </CardTitle>
            <CardDescription>
              {lowStockProducts.length} produk perlu direstock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div
                  key={product.kode_barang}
                  className="flex items-center justify-between p-3 bg-white border border-amber-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.nama_barang}</p>
                    <p className="text-sm text-gray-600">{product.kode_barang}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Stok: {product.stok_akhir}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Restock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Pilih Produk</CardTitle>
            <CardDescription>Cari produk yang akan direstock</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.kode_barang}
                  className={`
                    flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all
                    ${selectedProduct?.kode_barang === product.kode_barang
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                    }
                  `}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.nama_barang}</p>
                    <p className="text-sm text-gray-600">{product.kode_barang}</p>
                    <p className="text-sm text-gray-600 mt-1">Pemasok: {product.pemasok}</p>
                  </div>
                  <Badge className={product.stok_akhir < 10 ? 'bg-red-500' : 'bg-green-500'}>
                    Stok: {product.stok_akhir}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Restock Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Form Restock
            </CardTitle>
            <CardDescription>
              {selectedProduct ? 'Masukkan jumlah restock' : 'Pilih produk terlebih dahulu'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedProduct ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-600">Produk yang dipilih:</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedProduct.nama_barang}</p>
                  <p className="text-sm text-gray-600">{selectedProduct.kode_barang}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Stok Saat Ini</p>
                      <p className="text-lg font-bold text-gray-900">{selectedProduct.stok_akhir}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Pemasok</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProduct.pemasok}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="quantity">Jumlah Restock</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Masukkan jumlah"
                    required
                  />
                </div>

                {quantity && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-gray-600">Stok setelah restock:</p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedProduct.stok_akhir + parseInt(quantity)}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedProduct(null);
                      setQuantity('');
                    }}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !quantity}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Memproses...' : 'Restock'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Package className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p>Pilih produk dari daftar di samping</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}