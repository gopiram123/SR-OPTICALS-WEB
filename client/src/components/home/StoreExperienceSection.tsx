import React from 'react';
import { Camera } from 'lucide-react';
import { StorePhoto } from '../../types';

interface StoreExperienceSectionProps {
  photos: StorePhoto[];
}

export const StoreExperienceSection: React.FC<StoreExperienceSectionProps> = ({ photos }) => {
  if (photos.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/10 text-brand-900 text-xs font-bold tracking-widest uppercase mb-2">
            <Camera className="w-3.5 h-3.5 text-gold-600" />
            <span>Showroom Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
            Store Experience
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Step into our contemporary boutique where cutting-edge ophthalmic instrumentation meets hospitable personal styling.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-card hover:shadow-luxury transition-all duration-300 aspect-[4/3] sm:aspect-square flex flex-col justify-end"
            >
              <img
                src={item.url}
                alt={item.caption || "SR OPTICALS store interior"}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {item.caption && (
                <div className="relative z-10 p-5 text-white">
                  <p className="text-xs font-medium text-cream-200 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
