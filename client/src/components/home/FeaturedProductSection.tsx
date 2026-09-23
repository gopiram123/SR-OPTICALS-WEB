import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface FeaturedProductSectionProps {
  product?: Product | null;
}

export const FeaturedProductSection: React.FC<FeaturedProductSectionProps> = ({ product }) => {
  const { getWhatsAppUrl } = useShop();

  if (!product) return null;

  const keyFeatures = [
    { label: "Material", value: product.material },
    { label: "Frame Structure", value: product.frameType },
    { label: "Colour Finish", value: product.colour },
    { label: "Fit / Dimensions", value: product.dimensions || "Universal Ergonomic Fit" }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-cream-100 rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold-300/40 shadow-luxury relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white p-6 sm:p-8 flex items-center justify-center border border-neutral-200/80 shadow-card">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                    Masterpiece Selection
                  </span>
                </div>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-gold-700 uppercase">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>Featured Eyewear Spotlight</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-neutral-500">
                  Category: {product.category} • {product.gender} • {product.style} Style
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-brand-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md font-semibold">
                  {product.availability}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Feature Matrix */}
              <div className="grid grid-cols-2 gap-3 py-2 border-y border-cream-300/80">
                {keyFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <Check className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-500 block">{item.label}</span>
                      <span className="font-semibold text-neutral-900">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={getWhatsAppUrl(product.name, product.sku)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Enquiry</span>
                </a>

                <Link
                  to={`/product/${product.id}`}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
