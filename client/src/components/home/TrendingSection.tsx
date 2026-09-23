import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { Product } from '../../types';

interface TrendingSectionProps {
  eyeglassesProduct?: Product | null;
  sunglassesProduct?: Product | null;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  eyeglassesProduct,
  sunglassesProduct
}) => {
  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-800 text-xs font-bold tracking-widest uppercase mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
            Trending Collections
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Our most requested ophthalmic frames and high-protection sunwear of the season.
          </p>
        </div>

        {/* Dual Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Popular Eyeglasses */}
          <div className="group relative rounded-3xl overflow-hidden bg-brand-950 text-white shadow-luxury min-h-[420px] flex flex-col justify-between p-8 sm:p-10 border border-brand-900">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-700">
              <img
                src={eyeglassesProduct?.images[0] || "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80"}
                alt="Popular Eyeglasses"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent" />

            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-gold-300 font-bold">
                Ophthalmic Precision
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Popular Eyeglasses
              </h3>
            </div>

            <div className="relative z-10 space-y-4 pt-12">
              <p className="text-sm text-cream-300 max-w-md leading-relaxed">
                {eyeglassesProduct?.description || "Engineered for crystal-clear optical acuity and everyday luxury. Features anti-fatigue geometry and lightweight titanium accents."}
              </p>
              <div>
                <Link
                  to="/collections?category=Men"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-500 text-brand-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
                >
                  <span>Explore Eyeglasses</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Sunglasses */}
          <div className="group relative rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-luxury min-h-[420px] flex flex-col justify-between p-8 sm:p-10 border border-neutral-800">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-700">
              <img
                src={sunglassesProduct?.images[0] || "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80"}
                alt="Popular Sunglasses"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-gold-300 font-bold">
                UV400 Polarized Protection
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Popular Sunglasses
              </h3>
            </div>

            <div className="relative z-10 space-y-4 pt-12">
              <p className="text-sm text-cream-300 max-w-md leading-relaxed">
                {sunglassesProduct?.description || "Superior optical clarity and maximum UV protection matched with sculpted luxury styling for outdoor distinction."}
              </p>
              <div>
                <Link
                  to="/collections?style=Premium"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-cream-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md group/btn"
                >
                  <span>Explore Sunglasses</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
