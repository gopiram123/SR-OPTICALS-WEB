import React from 'react';
import { ShieldCheck, Glasses, UserCheck, MessageCircle } from 'lucide-react';
import { HomepageConfig } from '../../types';

interface WhyChooseUsSectionProps {
  items: HomepageConfig['whyChooseUs'];
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ items }) => {
  // Map icon string to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'shieldcheck':
      case 'shield':
        return <ShieldCheck className="w-6 h-6 text-gold-500" />;
      case 'glasses':
        return <Glasses className="w-6 h-6 text-gold-500" />;
      case 'usercheck':
      case 'user':
        return <UserCheck className="w-6 h-6 text-gold-500" />;
      case 'messagecircle':
      case 'message':
      default:
        return <MessageCircle className="w-6 h-6 text-gold-500" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            The SR OPTICALS Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-2">
            Why Choose Us
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Dedicated ophthalmic standards, premium materials, and transparent personal guidance.
          </p>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center mb-6 shadow-sm">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
