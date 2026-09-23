import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { HomepageConfig, Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface HeroSectionProps {
  config: HomepageConfig['hero'];
  featuredProduct?: Product | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, featuredProduct }) => {
  const { getWhatsAppUrl } = useShop();

  const featurePoints = [
    "Quality Frames",
    "Latest Styles",
    "Easy Enquiry"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-200/90 via-cream-100 to-cream-100 py-12 lg:py-20 border-b border-cream-300/80">
      {/* Subtle luxury geometric background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900 text-gold-300 text-xs font-semibold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{config.badge || "Premium Eyewear Collection"}</span>
            </div>

            {/* Main Heading & Subheading */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.1]">
                {config.heading || "See the Difference"}
              </h1>
              <p className="font-serif text-2xl sm:text-3xl text-brand-800 font-semibold italic">
                {config.subheading || "Find frames that fit your style."}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {config.description || "Discover our latest collection of eyeglasses and sunglasses. Find the perfect frame that fits your style and personality."}
            </p>

            {/* Feature Points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
              {featurePoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                to="/collections"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-200 hover:text-white font-semibold text-sm shadow-luxury hover:shadow-luxury-hover transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>{config.primaryButtonText || "Explore Collection"}</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/new-arrivals"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-cream-200 border border-neutral-300 text-neutral-900 font-semibold text-sm shadow-sm transition-all text-center"
              >
                {config.secondaryButtonText || "New Arrivals"}
              </Link>
            </div>

          </div>

          {/* Right Universal Spectacles Photograph & Floating Product Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Main Spectacles Showcase Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white/90 border border-neutral-200/80 p-3 shadow-luxury">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200/70 relative">
                  <img
                    src={config.imageUrl}
                    alt="Premium handcrafted optical spectacles"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Featured Product Card (Near/Over Hero Image) */}
              {featuredProduct && (
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-gold-300/60 shadow-luxury max-w-xs animate-fadeIn hidden sm:flex items-center gap-3.5">
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-14 h-14 object-contain rounded-xl bg-cream-200 p-1 shrink-0 border border-neutral-200"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-gold-700 tracking-wider uppercase block">
                      Spotlight Frame
                    </span>
                    <Link
                      to={`/product/${featuredProduct.id}`}
                      className="text-xs font-bold text-neutral-900 hover:text-brand-900 truncate block"
                    >
                      {featuredProduct.name}
                    </Link>
                    <p className="text-xs font-serif font-bold text-brand-950 mt-0.5">
                      ₹{featuredProduct.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <a
                    href={getWhatsAppUrl(featuredProduct.name, featuredProduct.sku)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors shrink-0"
                    title="Quick WhatsApp Enquiry"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
