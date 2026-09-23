import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';

interface CategoriesSectionProps {
  categories: Category[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const visibleCategories = categories.filter(c => c.isVisible);

  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            Curated Lines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-2">
            Find Your Style
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-3 leading-relaxed">
            Engineered comfort meets distinguished aesthetics. Explore dedicated categories tailored for every age, expression, and optical need.
          </p>
        </div>

        {/* 4-Card Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {visibleCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/collections?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-card hover:shadow-luxury-hover transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Luxury Overlay */}
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-300">
                <img
                  src={cat.imageUrl}
                  alt={`${cat.name} eyewear collection`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-1">
                    Collection
                  </span>
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white mb-2">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-cream-300/80 line-clamp-2 mb-4 font-normal">
                      {cat.description}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-300 group-hover:text-white transition-colors">
                    <span>View Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
