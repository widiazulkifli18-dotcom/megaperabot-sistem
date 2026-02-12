import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Users, Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  username: string;
  role: string;
  status: string;
}

export function UserManagement() {
  const [users] = useState<User[]>([
    { id: 1, username: 'megaperabot', role: 'Admin', status: 'Aktif' },
    { id: 2, username: 'staffgudang01', role: 'Karyawan Gudang', status: 'Aktif' },
    { id: 3, username: 'karyawan01', role: 'Karyawan Toko', status: 'Aktif' },
  ]);

  const handleEdit = (userId: number) => {
    alert(`Edit user ID: ${userId}`);
  };

  const handleDelete = (userId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      alert(`Delete user ID: ${userId}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Kelola Akun Pengguna</h2>
        <p className="text-gray-600 mt-1">Manajemen user dan hak akses sistem</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Daftar Pengguna
          </CardTitle>
          <CardDescription>Kelola akun pengguna sistem MEGA PERABOT</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Username</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{user.role}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className="bg-green-500">{user.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(user.id)}
                          className="h-8"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        {user.role !== 'Admin' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                            className="h-8"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Hapus
                          </Button>
                        )}
                      </div>
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
