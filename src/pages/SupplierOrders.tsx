import { useState, useEffect } from 'react';
import { productsAPI, ordersAPI } from '../services/api';
import { Product, OrderItem } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Truck, Trash2, Plus, Search, CheckCircle } from 'lucide-react';
import { useToast, ToastContainer } from '../hooks/useToast';

interface SupplierOrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export function SupplierOrders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<SupplierOrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState('');
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

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.kode_barang === product.kode_barang);
    if (existing) {
      setCart(cart.map(item =>
        item.product.kode_barang === product.kode_barang
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * product.harga_beli }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1, subtotal: product.harga_beli }]);
    }
    toast.success(`${product.nama_barang} ditambahkan ke pesanan`);
  };

  const removeFromCart = (kode_barang: string) => {
    setCart(cart.filter(item => item.product.kode_barang !== kode_barang));
  };

  const updateQuantity = (kode_barang: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map(item =>
      item.product.kode_barang === kode_barang
        ? { ...item, quantity, subtotal: quantity * item.product.harga_beli }
        : item
    ));
  };

  const getTotalAmount = () => cart.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Pesanan masih kosong!');
      return;
    }

    setIsSubmitting(true);
    try {
      await ordersAPI.createSupplierOrder({
        items: cart,
        totalAmount: getTotalAmount(),
        notes,
        orderDate: new Date().toISOString(),
      });
      toast.success('Pesanan ke pemasok berhasil dibuat!');
      setCart([]);
      setNotes('');
    } catch (error) {
      toast.error('Gagal membuat pesanan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Pesanan ke Pemasok</h2>
        <p className="text-gray-600 mt-1">Buat pesanan untuk restok barang dari pemasok</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pilih Produk</CardTitle>
            <CardDescription>Cari dan tambahkan produk untuk dipesan dari pemasok</CardDescription>
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
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.nama_barang}</p>
                    <p className="text-sm text-gray-600">{product.kode_barang}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{formatRupiah(product.harga_beli)}</Badge>
                      <Badge variant="outline" className="text-xs">
                        Pemasok: {product.pemasok}
                      </Badge>
                      <Badge className={product.stok_akhir < 50 ? 'bg-orange-500' : 'bg-green-500'}>
                        Stok: {product.stok_akhir}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tambah
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Pesanan ({cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan untuk pesanan..."
                />
              </div>

              <div className="space-y-2 max-h-[250px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.kode_barang} className="p-2 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 pr-2">
                        <p className="text-sm font-medium text-gray-900">{item.product.nama_barang}</p>
                        <p className="text-xs text-gray-600">{formatRupiah(item.product.harga_beli)}/unit</p>
                        <p className="text-xs text-blue-600">{item.product.pemasok}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.kode_barang)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.kode_barang, parseInt(e.target.value))}
                        className="w-20 h-8 text-sm"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        = {formatRupiah(item.subtotal)}
                      </span>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Truck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Pesanan kosong</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-900">Total Biaya:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatRupiah(getTotalAmount())}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Memproses...' : 'Buat Pesanan'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}
