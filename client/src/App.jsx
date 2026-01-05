import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { StudentDashboard, ShopkeeperDashboard } from './pages/Dashboards';
import RunnerDashboard from './pages/runner/RunnerDashboard';
import ShopMenu from './pages/student/ShopMenu';
import Cart from './pages/student/Cart';
import StudentOrders from './pages/student/StudentOrders';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Or forbidden page
  }

  return children;
};

// Redirect based on role if at /
const RoleRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Landing />;

  if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
  if (user.role === 'runner') return <Navigate to="/runner/dashboard" replace />;
  if (user.role === 'shopkeeper') return <Navigate to="/shopkeeper/dashboard" replace />;

  return <div>Unknown Role</div>;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RoleRedirect />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />

            <Route path="student/shop/:id" element={
              <ProtectedRoute allowedRoles={['student']}>
                <ShopMenu />
              </ProtectedRoute>
            } />

            <Route path="student/cart" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Cart />
              </ProtectedRoute>
            } />

            <Route path="student/orders" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentOrders />
              </ProtectedRoute>
            } />

            <Route path="runner/dashboard" element={
              <ProtectedRoute allowedRoles={['runner']}>
                <RunnerDashboard />
              </ProtectedRoute>
            } />

            <Route path="shopkeeper/dashboard" element={
              <ProtectedRoute allowedRoles={['shopkeeper']}>
                <ShopkeeperDashboard />
              </ProtectedRoute>
            } />

          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
