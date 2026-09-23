import React, { useState, useEffect } from 'react';
import { Sparkles, Check, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getProducts, updateProduct } from '../../services/api';
import { Product } from '../../types';

export const AdminNewArrivalsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    const data = await getProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleNewArrival = async (p: Product) => {
    try {
      await updateProduct(p.id, { isNew: !p.isNew });
      load();
    } catch (e) {
      console.error(e);
    }
  };

  const newArrivals = products.filter(p => p.isNew);
  const otherProducts = products.filter(p => !p.isNew);

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Curation</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
            New Arrivals Showcase Manager
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Toggle which eyewear models appear in the "Latest Additions" section on the homepage and the dedicated New Arrivals page.
          </p>
        </div>

        {/* Currently Active New Arrivals */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-serif font-bold text-lg text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Active New Arrivals ({newArrivals.length})</span>
            </h3>
            <span className="text-xs text-neutral-400">Showing on customer website</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newArrivals.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.images[0]} alt={p.name} className="w-12 h-10 object-contain rounded-lg bg-white p-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-neutral-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-neutral-500">{p.category} • ₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleNewArrival(p)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-neutral-300 text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}

            {newArrivals.length === 0 && (
              <p className="text-xs text-neutral-400 p-4">No products are currently marked as New Arrivals.</p>
            )}
          </div>
        </div>

        {/* Available Products to Add */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-card space-y-4">
          <div className="pb-3 border-b border-neutral-100">
            <h3 className="font-serif font-bold text-lg text-neutral-900">
              Other Catalog Eyewear ({otherProducts.length})
            </h3>
            <p className="text-xs text-neutral-500">Tap "Add to New Arrivals" to feature a frame.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProducts.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-cream-100 border border-neutral-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.images[0]} alt={p.name} className="w-12 h-10 object-contain rounded-lg bg-white p-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-neutral-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-neutral-500">{p.category} • ₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleNewArrival(p)}
                  className="px-3 py-1.5 rounded-lg bg-brand-900 text-gold-300 text-[11px] font-bold hover:bg-brand-950 transition-colors shrink-0"
                >
                  Feature as New
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
