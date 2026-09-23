import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ products }) => {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-200/50 border-y border-cream-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/10 text-brand-900 text-xs font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Fresh Releases</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
              Latest Additions
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              Recently crafted arrivals combining cutting-edge featherweight materials with contemporary optical silhouettes.
            </p>
          </div>

          <Link
            to="/new-arrivals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-cream-100 border border-neutral-300 text-neutral-900 text-xs font-bold uppercase tracking-wider transition-all shadow-sm group shrink-0"
          >
            <span>View All New Frames</span>
            <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
