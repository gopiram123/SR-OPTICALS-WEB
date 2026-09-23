import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Glasses, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useShop } from '../../context/ShopContext';

export const AdminLoginPage: React.FC = () => {
  const { login, isFirebaseActive } = useAdminAuth();
  const { shopInfo } = useShop();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@sropticals.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-brand-950 to-neutral-950 flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      
      {/* Background Ambience */}
      <div className="absolute w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

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
            {shopInfo.shopName} Admin
          </h1>
          <p className="text-xs text-neutral-500">
            Authenticate to manage frames, categories, inventory, and storefront content.
          </p>
        </div>

        {/* Demo Mode Notice */}
        {!isFirebaseActive && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Offline / Demo Admin Mode</span>
            </p>
            <p className="text-[11px] text-amber-800">
              Pre-filled demo credentials: <span className="font-mono font-semibold">admin@sropticals.com</span> / <span className="font-mono font-semibold">admin123</span>
            </p>
          </div>
        )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sropticals.com"
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
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
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
        © 2026 {shopInfo.shopName} Optical Management System. Strictly for authorized shop personnel.
      </p>

    </div>
  );
};
