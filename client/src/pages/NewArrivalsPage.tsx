import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, DATA_CHANGED_EVENT } from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/products/ProductCard';

export const NewArrivalsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const all = await getProducts();
      setProducts(all.filter(p => p.isNew));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener(DATA_CHANGED_EVENT, loadData);
    return () => window.removeEventListener(DATA_CHANGED_EVENT, loadData);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/10 text-brand-900 text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Seasonal Additions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
            New Arrivals
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl">
            Explore our freshest optical silhouettes, newly glazed high-index lenses, and modern statement frames straight from international eyewear ateliers.
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-md mx-auto">
            <p className="text-neutral-600 text-sm mb-4">No new arrivals currently listed.</p>
            <Link
              to="/collections"
              className="px-6 py-2.5 rounded-full bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider"
            >
              Browse All Collections
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
