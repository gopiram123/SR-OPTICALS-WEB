import React from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FinalCtaSection: React.FC = () => {
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();

  return (
    <section className="py-20 bg-brand-950 text-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Direct Optical Concierge</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Found Something You Like?
        </h2>

        <p className="text-base sm:text-lg text-cream-300 max-w-xl mx-auto leading-relaxed">
          Want to know the price or availability? Contact {shopInfo.shopName}. Our optical specialists are ready to guide your frame fit and prescription lens choices.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-3 group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={getCallUrl()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-3"
          >
            <Phone className="w-5 h-5 text-gold-400" />
            <span>Call Us: {shopInfo.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
