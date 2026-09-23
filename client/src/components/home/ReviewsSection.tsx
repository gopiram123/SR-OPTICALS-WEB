import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { Review } from '../../types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const visibleReviews = reviews.filter(r => r.isVisible);

  if (visibleReviews.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-200/40 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-2">
            Customer Experiences
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Read what our patrons share regarding their frame fits, eye testing, and optical care.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-neutral-700 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-neutral-900 text-sm">
                    {rev.customerName}
                  </h4>
                  <p className="text-[11px] text-neutral-400">{rev.date}</p>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
