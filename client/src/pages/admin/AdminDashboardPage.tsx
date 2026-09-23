import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Glasses,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Award,
  Grid,
  Plus,
  Store,
  Sliders,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getProducts, getCategories, getReviews, getStorePhotos } from '../../services/api';
import { Product, Category, Review, StorePhoto } from '../../types';
import { useShop } from '../../context/ShopContext';

export const AdminDashboardPage: React.FC = () => {
  const { shopInfo } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [storePhotos, setStorePhotos] = useState<StorePhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts(),
      getCategories(),
      getReviews(false),
      getStorePhotos()
    ]).then(([p, c, r, ph]) => {
      setProducts(p);
      setCategories(c);
      setReviews(r);
      setStorePhotos(ph);
      setIsLoading(false);
    });
  }, []);

  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.availability !== 'Out of Stock').length;
  const outOfStock = products.filter(p => p.availability === 'Out of Stock').length;
  const newArrivalsCount = products.filter(p => p.isNew).length;
  const featuredCount = products.filter(p => p.isFeatured).length;

  const statCards = [
    {
      title: 'Total Eyewear',
      value: totalProducts,
      icon: Glasses,
      color: 'bg-brand-900 text-gold-300',
      desc: 'Active optical frames in database'
    },
    {
      title: 'In Stock & Ready',
      value: availableProducts,
      icon: CheckCircle2,
      color: 'bg-emerald-800 text-emerald-100',
      desc: 'Available for immediate try-on'
    },
    {
      title: 'Out of Stock',
      value: outOfStock,
      icon: AlertOctagon,
      color: 'bg-rose-800 text-rose-100',
      desc: 'Marked as sold out'
    },
    {
      title: 'New Arrivals',
      value: newArrivalsCount,
      icon: Sparkles,
      color: 'bg-indigo-800 text-indigo-100',
      desc: 'Featured in latest additions'
    },
    {
      title: 'Featured Masterpieces',
      value: featuredCount,
      icon: Award,
      color: 'bg-amber-800 text-amber-100',
      desc: 'Spotlighted on homepage'
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: Grid,
      color: 'bg-teal-800 text-teal-100',
      desc: 'Active product classifications'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Overview & Analytics
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Store Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Welcome back to {shopInfo.shopName}. All changes made here automatically sync to the public catalogue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="px-5 py-2.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Manage Products</span>
            </Link>
          </div>
        </div>

        {/* 6 Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-card flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-neutral-500 block uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <span className="font-serif text-3xl font-bold text-neutral-950 block mt-1">
                    {isLoading ? '...' : stat.value}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    {stat.desc}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} shadow-sm shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-neutral-900">
            Store Management Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/products"
              className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-gold-400 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
                  <Glasses className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-brand-900">
                  Inventory & Products
                </h3>
                <p className="text-xs text-neutral-500">
                  Add frames, update prices, manage stock and photography.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-900 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/admin/homepage"
              className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-gold-400 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-brand-900">
                  Homepage Manager
                </h3>
                <p className="text-xs text-neutral-500">
                  Customize hero banner, featured frame, and value pillars.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-900 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Customize</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/admin/store-info"
              className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-gold-400 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-brand-900">
                  Shop Information
                </h3>
                <p className="text-xs text-neutral-500">
                  Update phone, WhatsApp number, opening hours & address.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-900 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Update</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/admin/reviews"
              className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-gold-400 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-brand-900">
                  Customer Reviews
                </h3>
                <p className="text-xs text-neutral-500">
                  Moderate customer feedback and toggle public visibility.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-900 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Moderate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Recent Products Snapshot */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="font-serif font-bold text-lg text-neutral-900">
              Recently Managed Frames
            </h3>
            <Link
              to="/admin/products"
              className="text-xs font-bold uppercase tracking-wider text-brand-900 hover:underline"
            >
              View All ({totalProducts}) →
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-12 h-10 object-contain rounded-lg bg-cream-200 p-1 border border-neutral-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{p.name}</h4>
                    <p className="text-xs text-neutral-500">
                      {p.category} • {p.style} • {p.frameType}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif font-bold text-sm text-brand-950 block">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    p.availability === 'Out of Stock'
                      ? 'bg-neutral-200 text-neutral-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {p.availability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
