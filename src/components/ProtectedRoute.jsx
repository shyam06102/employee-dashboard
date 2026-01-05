import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}