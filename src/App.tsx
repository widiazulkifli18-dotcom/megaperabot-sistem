import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Unauthorized } from './pages/Unauthorized';
import { Dashboard } from './pages/Dashboard';
import { NewOrder } from './pages/NewOrder';
import { Restock } from './pages/Restock';
import { SupplierOrders } from './pages/SupplierOrders';
import { StockMonitoring } from './pages/StockMonitoring';
import { UserManagement } from './pages/UserManagement';
import { SalesReport } from './pages/SalesReport';
import { SalesHistory } from './pages/SalesHistory';
import { ProductManagement } from './pages/ProductManagement';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Karyawan Gudang', 'Karyawan Toko']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-order"
              element={
                <ProtectedRoute allowedRoles={['Karyawan Toko']}>
                  <NewOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restock"
              element={
                <ProtectedRoute allowedRoles={['Karyawan Gudang']}>
                  <Restock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier-orders"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <SupplierOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock-monitoring"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Karyawan Gudang']}>
                  <StockMonitoring />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales-report"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <SalesReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales-history"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Karyawan Toko']}>
                  <SalesHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-management"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <ProductManagement />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}