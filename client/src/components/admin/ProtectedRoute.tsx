import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Glasses } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-950 flex flex-col items-center justify-center p-6 text-white">
        <div className="w-16 h-16 rounded-3xl bg-brand-900 border border-gold-500/30 flex items-center justify-center animate-pulse mb-4 shadow-xl">
          <Glasses className="w-8 h-8 text-gold-400" />
        </div>
        <h2 className="font-serif text-lg font-bold text-cream-100">SR OPTICALS Admin</h2>
        <p className="text-xs text-neutral-400 mt-1">Verifying administrator credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
