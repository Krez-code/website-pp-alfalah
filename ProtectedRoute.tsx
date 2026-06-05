import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const token = localStorage.getItem('pesantren_token');
  const userRole = localStorage.getItem('pesantren_role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole) {
      return <Navigate to="/login" replace />;
    }
    const normalizedRole = userRole.toLowerCase();
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());
    if (!normalizedAllowed.includes(normalizedRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
