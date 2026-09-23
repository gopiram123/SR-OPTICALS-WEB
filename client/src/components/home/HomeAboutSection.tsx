import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import { HomepageConfig } from '../../types';

interface HomeAboutSectionProps {
  snippet: HomepageConfig['aboutSnippet'];
  shopName: string;
}

export const HomeAboutSection: React.FC<HomeAboutSectionProps> = ({ snippet, shopName }) => {
  return (
    <section className="py-16 sm:py-24 bg-cream-200/50 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-luxury bg-white p-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream-300">
                <img
                  src={snippet.imageUrl}
                  alt={`${shopName} store boutique and optical studio`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Experience badge overlay */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-brand-950 text-white p-5 rounded-2xl border border-gold-400/40 shadow-luxury max-w-[200px] hidden sm:block">
              <Award className="w-6 h-6 text-gold-400 mb-2" />
              <p className="font-serif text-lg font-bold text-white">Precision & Care</p>
              <p className="text-[11px] text-cream-300 mt-1">Dedicated to impeccable optical health.</p>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
                Heritage & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
                {snippet.heading || "Your Vision, Our Priority"}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              {snippet.description}
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
