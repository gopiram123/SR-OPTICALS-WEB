import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, Glasses, Clock, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getHomepageConfig, getStorePhotos } from '../services/api';
import { HomepageConfig, StorePhoto } from '../types';
import { initialHomepageConfig, initialStorePhotos } from '../services/mockData';

export const AboutPage: React.FC = () => {
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();
  const [config, setConfig] = useState<HomepageConfig>(initialHomepageConfig);
  const [photos, setPhotos] = useState<StorePhoto[]>(initialStorePhotos);

  useEffect(() => {
    getHomepageConfig().then(setConfig);
    getStorePhotos().then(setPhotos);
  }, []);

  const values = [
    {
      icon: Award,
      title: "Precision Ophthalmic Science",
      desc: "Every lens we recommend undergoes rigorous digital curvature analysis and computerised optical alignment."
    },
    {
      icon: Glasses,
      title: "Bespoke Frame Curation",
      desc: "We hand-select each frame from world-class artisanal workshops, focusing on lightweight aerospace titanium and organic acetates."
    },
    {
      icon: Heart,
      title: "Patient-Centred Optical Care",
      desc: "No rush, no sales quotas. We take the time to understand your visual environment—whether you work on digital screens or drive long distances."
    }
  ];

  return (
    <div className="min-h-screen bg-cream-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            About Our Brand & Studio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950">
            Precision Optics. Timeless Elegance.
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Welcome to {shopInfo.shopName}. We believe eyewear is not merely a medical necessity, but an intimate extension of personal presence and confidence.
          </p>
        </div>

        {/* Our Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-neutral-200/90 shadow-luxury">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
              Our Heritage & Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
              {config.aboutSnippet.heading || "Your Vision, Our Priority"}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {config.aboutSnippet.description}
            </p>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              From high-prescription single-vision lenses and digital progressive solutions to anti-fatigue office lenses, our dispensing opticians match optical precision with impeccable facial aesthetics.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200 text-center min-w-[140px]">
                <span className="font-serif text-3xl font-bold text-brand-950 block">500+</span>
                <span className="text-xs font-medium text-neutral-500">Curated Frames</span>
              </div>
              <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200 text-center min-w-[140px]">
                <span className="font-serif text-3xl font-bold text-brand-950 block">100%</span>
                <span className="text-xs font-medium text-neutral-500">Genuine Materials</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-neutral-200 aspect-[4/3]">
              <img
                src={config.aboutSnippet.imageUrl}
                alt={`${shopInfo.shopName} showroom interior`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* What We Offer (Our Pillars) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
              What We Offer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-2">
              Optical Standards Without Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card hover:shadow-luxury transition-all space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center text-gold-400">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    {v.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Store Gallery */}
        {photos.length > 0 && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
                Experience In Person
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-2">
                Our Optical Boutique
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map((item, idx) => (
                <div key={idx} className="rounded-3xl overflow-hidden aspect-[4/3] shadow-card border border-neutral-200">
                  <img src={item.url} alt={item.caption || "Boutique"} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visit & Connect CTA */}
        <div className="bg-brand-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-500/20 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Experience the {shopInfo.shopName} Difference
            </h3>
            <p className="text-sm text-cream-300">
              Visit our boutique in {shopInfo.address.city} for personalized frame styling and expert lens recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Store Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
