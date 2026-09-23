import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Glasses,
  Grid,
  Sparkles,
  Sliders,
  Store,
  Camera,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useShop } from '../../context/ShopContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, adminUser, logout, isFirebaseActive } = useAdminAuth();
  const { shopInfo } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-luxury max-w-md text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-900 text-gold-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Protected Store Portal</h2>
          <p className="text-sm text-neutral-600">
            You must authenticate to access the SR OPTICALS Store Management System.
          </p>
          <Link
            to="/admin/login"
            className="inline-block w-full py-3 rounded-xl bg-brand-900 text-gold-300 font-bold text-xs uppercase tracking-wider"
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Glasses },
    { label: 'Categories', path: '/admin/categories', icon: Grid },
    { label: 'New Arrivals', path: '/admin/new-arrivals', icon: Sparkles },
    { label: 'Homepage', path: '/admin/homepage', icon: Sliders },
    { label: 'Store Information', path: '/admin/store-info', icon: Store },
    { label: 'Store Photos', path: '/admin/store-photos', icon: Camera },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-950 text-white border-r border-brand-900 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-brand-900">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center text-gold-300">
              <Glasses className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-wide text-white uppercase block">
                {shopInfo.shopName}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-900 text-gold-300 font-bold shadow-sm'
                    : 'text-cream-300/70 hover:text-white hover:bg-brand-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-cream-400/60'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User info & View Store */}
        <div className="p-4 border-t border-brand-900 space-y-2">
          <div className="px-3 py-2 bg-brand-900/40 rounded-xl text-xs flex items-center justify-between">
            <div className="truncate">
              <p className="font-semibold text-white truncate text-[11px]">{adminUser?.displayName || 'Administrator'}</p>
              <p className="text-[10px] text-cream-400 truncate">{adminUser?.email}</p>
            </div>
            {isFirebaseActive ? (
              <span className="text-[9px] bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                Firebase
              </span>
            ) : (
              <span className="text-[9px] bg-amber-900/80 text-gold-300 px-1.5 py-0.5 rounded font-bold">
                Local DB
              </span>
            )}
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-brand-900/80 hover:bg-brand-900 text-gold-300 text-xs font-semibold transition-colors"
          >
            <span>View Public Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-rose-950/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden bg-brand-950 text-white p-4 border-b border-brand-900 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <Glasses className="w-5 h-5 text-gold-400" />
          <span className="font-serif font-bold text-sm tracking-wide text-white uppercase">
            {shopInfo.shopName} Admin
          </span>
        </Link>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg text-cream-300 hover:bg-brand-900"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileSidebarOpen && (
        <div className="md:hidden bg-brand-950 text-white p-4 space-y-2 border-b border-brand-900">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive ? 'bg-brand-900 text-gold-300' : 'text-cream-300 hover:bg-brand-900/60'
                }`}
              >
                <Icon className="w-4 h-4 text-gold-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-brand-900 flex gap-2">
            <Link
              to="/"
              className="flex-1 py-2 text-center text-xs text-gold-300 bg-brand-900 rounded-lg font-semibold"
            >
              Public Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 text-center text-xs text-rose-300 bg-rose-950/40 rounded-lg font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>

    </div>
  );
};
