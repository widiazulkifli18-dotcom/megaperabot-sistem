import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { History, Search, Edit, Trash2 } from 'lucide-react';

interface Transaction {
  date: string;
  kode_barang: string;
  nama_barang: string;
  qty: number;
  status: string;
  payment: string;
}

export function SalesHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const transactions: Transaction[] = [
    { date: '03-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '03-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 2, status: 'Selesai', payment: 'QRIS' },
    { date: '04-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '04-10-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '06-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '07-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 3, status: 'Selesai', payment: 'Tunai' },
    { date: '08-10-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '10-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '11-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '12-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '12-10-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '12-10-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '15-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '16-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '17-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '17-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '18-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '18-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '18-10-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '19-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '20-10-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '21-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '21-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '21-10-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '22-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '23-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '23-10-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '24-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '24-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '25-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 3, status: 'Selesai', payment: 'Tunai' },
    { date: '26-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '26-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '27-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '27-10-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 2, status: 'Selesai', payment: 'QRIS' },
    { date: '28-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '29-10-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '29-10-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '29-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '30-10-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '31-10-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '01-11-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '02-11-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '02-11-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '03-11-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'QRIS' },
    { date: '04-11-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 2, status: 'Selesai', payment: 'QRIS' },
    { date: '05-11-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '07-11-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '08-11-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '12-11-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '17-11-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '18-11-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '19-11-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '20-11-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '20-11-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '23-11-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '25-11-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '28-11-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 4, status: 'Selesai', payment: 'QRIS' },
    { date: '28-11-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '29-11-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '30-11-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '01-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '02-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '05-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '05-12-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '05-12-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '07-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '08-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '08-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '10-12-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '11-12-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '12-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '12-12-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'SMS' },
    { date: '13-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '14-12-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '15-12-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 2, status: 'Selesai', payment: 'QRIS' },
    { date: '16-12-2025', kode_barang: 'PK0006', nama_barang: 'KAIN LAP BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '17-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '19-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '19-12-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '20-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '20-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '20-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '22-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '22-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '23-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '23-12-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '24-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '25-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '25-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 3, status: 'Selesai', payment: 'QRIS' },
    { date: '26-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 2, status: 'Selesai', payment: 'Tunai' },
    { date: '26-12-2025', kode_barang: 'PK0033', nama_barang: 'PEL NAGOYA KECIL', qty: 1, status: 'Selesai', payment: 'SMS' },
    { date: '27-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '27-12-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '28-12-2025', kode_barang: 'PK0030', nama_barang: 'PEL NAGATA KECIL', qty: 1, status: 'Selesai', payment: 'QRIS' },
    { date: '29-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '30-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '31-12-2025', kode_barang: 'PK0018', nama_barang: 'KESET BIASA', qty: 1, status: 'Selesai', payment: 'Tunai' },
    { date: '31-12-2025', kode_barang: 'PK0034', nama_barang: 'PEL BIASA NO BRAND', qty: 2, status: 'Selesai', payment: 'QRIS' },
  ];

  const filteredTransactions = transactions.filter(t =>
    t.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.kode_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.date.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Riwayat Penjualan</h2>
        <p className="text-gray-600 mt-1">Periode: Oktober - Desember 2025</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Data Transaksi Penjualan
          </CardTitle>
          <CardDescription>Riwayat lengkap transaksi penjualan 3 bulan terakhir</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Kode Barang</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nama Barang</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Qty</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Payment</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{transaction.kode_barang}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.nama_barang}</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">{transaction.qty}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className="bg-green-500">🟢 {transaction.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-900">{transaction.payment}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Tidak ada data transaksi
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
