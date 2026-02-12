import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { api } from '../services/api';
import type { Product } from '../types';

interface ProductFormData {
  kode_barang: string;
  nama_barang: string;
  kategori: string;
  harga_beli: number;
  harga_jual: number;
  stok_akhir: number;
  pemasok: string;
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
    kode_barang: '',
    nama_barang: '',
    kategori: 'Alat Kebersihan',
    harga_beli: 0,
    harga_jual: 0,
    stok_akhir: 0,
    pemasok: '',
  });

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.products.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Gagal memuat data produk');
    } finally {
      setLoading(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.kode_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.pemasok.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || product.kategori === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.kategori)));

  // Reset form
  const resetForm = () => {
    setFormData({
      kode_barang: '',
      nama_barang: '',
      kategori: 'Alat Kebersihan',
      harga_beli: 0,
      harga_jual: 0,
      stok_akhir: 0,
      pemasok: '',
    });
  };

  // Handle add product
  const handleAddProduct = async () => {
    try {
      // Validasi
      if (!formData.kode_barang || !formData.nama_barang) {
        toast.error('Kode barang dan nama barang harus diisi!');
        return;
      }

      if (formData.harga_beli <= 0 || formData.harga_jual <= 0) {
        toast.error('Harga beli dan harga jual harus lebih dari 0!');
        return;
      }

      if (formData.harga_jual <= formData.harga_beli) {
        toast.error('Harga jual harus lebih tinggi dari harga beli!');
        return;
      }

      await api.products.create(formData);
      toast.success('Produk berhasil ditambahkan!');
      setIsAddDialogOpen(false);
      resetForm();
      loadProducts();
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Gagal menambahkan produk');
    }
  };

  // Handle edit product
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      kode_barang: product.kode_barang,
      nama_barang: product.nama_barang,
      kategori: product.kategori,
      harga_beli: product.harga_beli,
      harga_jual: product.harga_jual,
      stok_akhir: product.stok_akhir,
      pemasok: product.pemasok,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      // Validasi
      if (!formData.nama_barang) {
        toast.error('Nama barang harus diisi!');
        return;
      }

      if (formData.harga_beli <= 0 || formData.harga_jual <= 0) {
        toast.error('Harga beli dan harga jual harus lebih dari 0!');
        return;
      }

      if (formData.harga_jual <= formData.harga_beli) {
        toast.error('Harga jual harus lebih tinggi dari harga beli!');
        return;
      }

      await api.products.update(selectedProduct.kode_barang, formData);
      toast.success('Produk berhasil diperbarui!');
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      resetForm();
      loadProducts();
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error(error.message || 'Gagal memperbarui produk');
    }
  };

  // Handle delete product
  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await api.products.delete(selectedProduct.kode_barang);
      toast.success('Produk berhasil dihapus!');
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      loadProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Gagal menghapus produk');
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Get stock status
  const getStockStatus = (stok: number) => {
    if (stok === 0) return { label: 'Habis', variant: 'destructive' as const };
    if (stok < 10) return { label: 'Stok Rendah', variant: 'warning' as const };
    return { label: 'Tersedia', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Produk</h1>
          <p className="text-gray-600 mt-1">Tambah, edit, atau hapus produk dalam sistem</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Stok Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.stok_akhir >= 10).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Stok Rendah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {products.filter(p => p.stok_akhir > 0 && p.stok_akhir < 10).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Stok Habis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stok_akhir === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Pencarian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari produk (nama, kode, atau pemasok)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
          <CardDescription>
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Memuat data...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Tidak ada produk ditemukan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Barang</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Harga Beli</TableHead>
                    <TableHead>Harga Jual</TableHead>
                    <TableHead>Pemasok</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stok_akhir);
                    return (
                      <TableRow key={product.kode_barang}>
                        <TableCell className="font-mono">{product.kode_barang}</TableCell>
                        <TableCell className="font-medium">{product.nama_barang}</TableCell>
                        <TableCell>{product.kategori}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${
                            product.stok_akhir === 0 ? 'text-red-600' :
                            product.stok_akhir < 10 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {product.stok_akhir}
                          </span>
                        </TableCell>
                        <TableCell>{formatCurrency(product.harga_beli)}</TableCell>
                        <TableCell>{formatCurrency(product.harga_jual)}</TableCell>
                        <TableCell>{product.pemasok}</TableCell>
                        <TableCell>
                          <Badge variant={stockStatus.variant}>
                            {stockStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditClick(product)}
                              className="gap-1"
                            >
                              <Edit className="w-3 h-3" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(product)}
                              className="gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Produk Baru</DialogTitle>
            <DialogDescription>
              Masukkan informasi produk baru yang akan ditambahkan ke sistem
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-kode">Kode Barang *</Label>
              <Input
                id="add-kode"
                placeholder="Contoh: PK0001"
                value={formData.kode_barang}
                onChange={(e) => setFormData({ ...formData, kode_barang: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-nama">Nama Produk *</Label>
              <Input
                id="add-nama"
                placeholder="Contoh: Sapu Lidi"
                value={formData.nama_barang}
                onChange={(e) => setFormData({ ...formData, nama_barang: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-kategori">Kategori *</Label>
              <Select 
                value={formData.kategori} 
                onValueChange={(value) => setFormData({ ...formData, kategori: value })}
              >
                <SelectTrigger id="add-kategori">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alat Kebersihan">Alat Kebersihan</SelectItem>
                  <SelectItem value="Peralatan Dapur">Peralatan Dapur</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Elektronik">Elektronik</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-pemasok">Pemasok *</Label>
              <Input
                id="add-pemasok"
                placeholder="Contoh: PT Dialogue Home"
                value={formData.pemasok}
                onChange={(e) => setFormData({ ...formData, pemasok: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-harga-beli">Harga Beli (Rp) *</Label>
              <Input
                id="add-harga-beli"
                type="number"
                min="0"
                placeholder="0"
                value={formData.harga_beli || ''}
                onChange={(e) => setFormData({ ...formData, harga_beli: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-harga-jual">Harga Jual (Rp) *</Label>
              <Input
                id="add-harga-jual"
                type="number"
                min="0"
                placeholder="0"
                value={formData.harga_jual || ''}
                onChange={(e) => setFormData({ ...formData, harga_jual: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="add-stok">Stok Awal *</Label>
              <Input
                id="add-stok"
                type="number"
                min="0"
                placeholder="0"
                value={formData.stok_akhir || ''}
                onChange={(e) => setFormData({ ...formData, stok_akhir: Number(e.target.value) })}
              />
            </div>
            {formData.harga_beli > 0 && formData.harga_jual > 0 && (
              <div className="col-span-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Margin Keuntungan:</strong> {formatCurrency(formData.harga_jual - formData.harga_beli)} 
                  ({((formData.harga_jual - formData.harga_beli) / formData.harga_beli * 100).toFixed(1)}%)
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              resetForm();
            }}>
              Batal
            </Button>
            <Button onClick={handleAddProduct}>
              Tambah Produk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
            <DialogDescription>
              Perbarui informasi produk {selectedProduct?.nama_barang}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label>Kode Barang</Label>
              <Input value={formData.kode_barang} disabled className="bg-gray-100" />
              <p className="text-xs text-gray-500">Kode barang tidak dapat diubah</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-nama">Nama Produk *</Label>
              <Input
                id="edit-nama"
                value={formData.nama_barang}
                onChange={(e) => setFormData({ ...formData, nama_barang: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-kategori">Kategori *</Label>
              <Select 
                value={formData.kategori} 
                onValueChange={(value) => setFormData({ ...formData, kategori: value })}
              >
                <SelectTrigger id="edit-kategori">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alat Kebersihan">Alat Kebersihan</SelectItem>
                  <SelectItem value="Peralatan Dapur">Peralatan Dapur</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Elektronik">Elektronik</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-pemasok">Pemasok *</Label>
              <Input
                id="edit-pemasok"
                value={formData.pemasok}
                onChange={(e) => setFormData({ ...formData, pemasok: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-harga-beli">Harga Beli (Rp) *</Label>
              <Input
                id="edit-harga-beli"
                type="number"
                min="0"
                value={formData.harga_beli || ''}
                onChange={(e) => setFormData({ ...formData, harga_beli: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-harga-jual">Harga Jual (Rp) *</Label>
              <Input
                id="edit-harga-jual"
                type="number"
                min="0"
                value={formData.harga_jual || ''}
                onChange={(e) => setFormData({ ...formData, harga_jual: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-stok">Stok Saat Ini</Label>
              <Input
                id="edit-stok"
                type="number"
                min="0"
                value={formData.stok_akhir || ''}
                onChange={(e) => setFormData({ ...formData, stok_akhir: Number(e.target.value) })}
              />
              <p className="text-xs text-gray-500">
                Gunakan menu Restock untuk menambah stok secara resmi dengan pencatatan
              </p>
            </div>
            {formData.harga_beli > 0 && formData.harga_jual > 0 && (
              <div className="col-span-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Margin Keuntungan:</strong> {formatCurrency(formData.harga_jual - formData.harga_beli)} 
                  ({((formData.harga_jual - formData.harga_beli) / formData.harga_beli * 100).toFixed(1)}%)
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setSelectedProduct(null);
              resetForm();
            }}>
              Batal
            </Button>
            <Button onClick={handleUpdateProduct}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda yakin ingin menghapus produk <strong>{selectedProduct?.nama_barang}</strong> ({selectedProduct?.kode_barang})?
              <br /><br />
              <span className="text-red-600 font-semibold">
                Tindakan ini tidak dapat dibatalkan!
              </span>
              <br /><br />
              Semua data penjualan dan transaksi terkait produk ini akan tetap tersimpan, 
              namun produk tidak akan muncul lagi di daftar produk aktif.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsDeleteDialogOpen(false);
              setSelectedProduct(null);
            }}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus Produk
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}