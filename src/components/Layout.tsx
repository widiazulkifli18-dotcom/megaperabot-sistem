import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Truck, 
  LogOut,
  Store,
  User,
  BarChart3,
  Users,
  FileText,
  History
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { 
      to: '/', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      roles: ['Admin', 'Karyawan Gudang', 'Karyawan Toko'] 
    },
    { 
      to: '/new-order', 
      label: 'Pesanan Baru', 
      icon: ShoppingCart, 
      roles: ['Karyawan Toko'] 
    },
    { 
      to: '/sales-history', 
      label: 'Riwayat Penjualan', 
      icon: History, 
      roles: ['Karyawan Toko'] 
    },
    { 
      to: '/restock', 
      label: 'Restock', 
      icon: Package, 
      roles: ['Karyawan Gudang'] 
    },
    { 
      to: '/product-management', 
      label: 'Kelola Produk', 
      icon: Package, 
      roles: ['Admin'] 
    },
    { 
      to: '/stock-monitoring', 
      label: 'Monitoring Stok', 
      icon: BarChart3, 
      roles: ['Admin', 'Karyawan Gudang'] // ✅ Fixed: Tambah Karyawan Gudang
    },
    { 
      to: '/supplier-orders', 
      label: 'Pesanan Pemasok', 
      icon: Truck, 
      roles: ['Admin'] 
    },
    { 
      to: '/user-management', 
      label: 'Kelola Akun', 
      icon: Users, 
      roles: ['Admin'] 
    },
    { 
      to: '/sales-report', 
      label: 'Laporan Penjualan', 
      icon: FileText, 
      roles: ['Admin'] 
    },
  ].filter(link => user && link.roles.includes(user.role));

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-blue-100 text-blue-700';
      case 'Karyawan Toko':
        return 'bg-green-100 text-green-700';
      case 'Karyawan Gudang':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MEGA PERABOT</h1>
                <p className="text-blue-100 text-sm">Sistem Manajemen Stok & Pemesanan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-semibold">{user?.fullName}</p>
                <p className="text-blue-100 text-sm">{user?.role}</p>
              </div>
              <Avatar className="hidden md:flex">
                <AvatarFallback className="bg-blue-500 text-white">
                  {user?.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap
                    ${isActive 
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }
                  `}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role || '')}`}>
              {user?.role}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}