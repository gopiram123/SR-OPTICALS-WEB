import React from 'react';
import { Link } from 'react-router-dom';
import { Glasses, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-cream-100 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center bg-white p-10 sm:p-12 rounded-3xl border border-neutral-200/90 shadow-luxury space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-brand-900 text-gold-400 flex items-center justify-center mx-auto shadow-sm">
          <Glasses className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">404 Error</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
            Vision Blurred
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The page or optical catalog view you are seeking cannot be found. Let us guide you back to our curated showroom.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 px-5 rounded-full bg-brand-900 text-gold-300 hover:bg-brand-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/collections"
            className="flex-1 py-3 px-5 rounded-full border border-neutral-300 hover:bg-cream-100 text-neutral-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <span>Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
