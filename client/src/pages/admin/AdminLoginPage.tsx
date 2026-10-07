import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Glasses, Lock, Mail, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useShop } from '../../context/ShopContext';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdminAuth();
  const { shopInfo } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Preserve redirect destination
  const fromLocation = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      await login(email.trim(), password);
      navigate(fromLocation, { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMsg = 'Authentication failed. Please verify your credentials.';

      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password' || err?.code === 'auth/user-not-found') {
        errorMsg = 'Invalid admin email or password.';
      } else if (err?.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Please wait a few minutes and try again.';
      } else if (err?.code === 'auth/network-request-failed') {
        errorMsg = 'Network error. Please check your internet connection.';
      } else if (err?.message) {
        errorMsg = err.message;
      }

      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-brand-950 to-neutral-950 flex flex-col justify-center items-center p-4 sm:p-6 select-none relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[400px] h-[400px] bg-brand-800/20 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gold-500/20 relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-900 text-gold-300 flex items-center justify-center mx-auto shadow-md">
            <Glasses className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-700 block">
            Store Owner Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950">
            {shopInfo.shopName || 'SR OPTICALS'} Admin
          </h1>
          <p className="text-xs text-neutral-500">
            Secure administrator sign-in for store inventory, catalog curation, and boutique settings.
          </p>
        </div>

        {/* Security Notice */}
        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[11px] text-neutral-600 flex items-center gap-2">
          <Shield className="w-4 h-4 text-gold-700 shrink-0" />
          <span>Restricted to authorized store personnel only.</span>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@sropticals.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying Admin Credentials...</span>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-100 text-center">
          <Link to="/" className="text-xs text-neutral-500 hover:text-brand-900 font-medium">
            ← Return to Public Website
          </Link>
        </div>

      </div>

      <p className="text-cream-400/50 text-xs mt-6 text-center">
        © 2026 {shopInfo.shopName || 'SR OPTICALS'}. Precision Optical Care & Frame Boutique.
      </p>

    </div>
  );
};
