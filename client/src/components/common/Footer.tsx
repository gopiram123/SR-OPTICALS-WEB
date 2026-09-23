import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight, Globe, Shield } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();

  const currentYear = 2026;

  return (
    <footer className="bg-brand-950 text-cream-200 border-t border-brand-900/60 transition-colors">
      {/* Top Value Banner */}
      <div className="border-b border-brand-900/50 py-10 bg-brand-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-800/80 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-base">Authentic Optical Precision</h4>
                <p className="text-xs text-cream-400 mt-0.5">Certified ophthalmic lenses and genuine designer frames.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-800/80 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-base">Direct Specialist Consultation</h4>
                <p className="text-xs text-cream-400 mt-0.5">Enquire via WhatsApp for custom fits and prescriptions.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-800/80 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-base">Walk-In Store Visits</h4>
                <p className="text-xs text-cream-400 mt-0.5">Comprehensive eye examinations and frame trials.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="12" r="4" />
                  <circle cx="18" cy="12" r="4" />
                  <path d="M10 12h4" />
                  <path d="M2 11l2-2" />
                  <path d="M22 11l-2-2" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white uppercase">
                  {shopInfo.shopName}
                </span>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-gold-400">
                  {shopInfo.tagline || 'Luxury Eyewear & Optics'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-cream-300/80 leading-relaxed max-w-sm">
              Discover expertly handcrafted optical frames, high-index digital precision lenses, and distinguished sunglasses tailored to your lifestyle and prescription.
            </p>

            {/* Social Links (Only displayed if configured by admin) */}
            <div className="flex items-center gap-3 pt-2">
              {shopInfo.socials?.instagram && (
                <a
                  href={shopInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-brand-900 hover:bg-gold-500/20 border border-brand-800 flex items-center justify-center text-cream-300 hover:text-gold-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {shopInfo.socials?.facebook && (
                <a
                  href={shopInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-brand-900 hover:bg-gold-500/20 border border-brand-800 flex items-center justify-center text-cream-300 hover:text-gold-300 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {shopInfo.socials?.google && (
                <a
                  href={shopInfo.socials.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-brand-900 hover:bg-gold-500/20 border border-brand-800 flex items-center justify-center text-cream-300 hover:text-gold-300 transition-colors"
                  aria-label="Google Business"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide uppercase border-b border-brand-800/80 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-cream-300/80 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-cream-300/80 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                  <span>Collections</span>
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-cream-300/80 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                  <span>New Arrivals</span>
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-cream-300/80 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                  <span>My Wishlist</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-300/80 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-300/80 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500/50 group-hover:translate-x-1 transition-transform" />
                  <span>Visit / Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide uppercase border-b border-brand-800/80 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={getCallUrl()}
                className="flex items-center gap-3 text-cream-300/80 hover:text-gold-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{shopInfo.phone}</span>
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-cream-300/80 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {shopInfo.whatsapp}</span>
              </a>

              {shopInfo.email && (
                <a
                  href={`mailto:${shopInfo.email}`}
                  className="flex items-center gap-3 text-cream-300/80 hover:text-gold-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="truncate">{shopInfo.email}</span>
                </a>
              )}

              <div className="flex items-start gap-3 text-cream-300/80 pt-1">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <p className="text-xs leading-relaxed">
                  {shopInfo.address.line1}, {shopInfo.address.line2 && `${shopInfo.address.line2}, `}
                  {shopInfo.address.city}, {shopInfo.address.state} - {shopInfo.address.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Store Hours */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-white text-base tracking-wide uppercase border-b border-brand-800/80 pb-2">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs text-cream-300/80">
              {shopInfo.openingHours.map((schedule, idx) => (
                <div key={idx} className="pb-2 border-b border-brand-900">
                  <p className="font-semibold text-white">{schedule.days}</p>
                  <p className="text-gold-300/90 mt-0.5">{schedule.hours}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Management Bar */}
      <div className="border-t border-brand-900 py-6 bg-brand-950 text-xs text-cream-400/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {shopInfo.shopName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Catalogue & In-Store Enquiry Only</span>
            <span className="text-cream-400/30">•</span>
            <Link to="/admin" className="hover:text-gold-300 transition-colors underline decoration-dotted">
              Store Owner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
