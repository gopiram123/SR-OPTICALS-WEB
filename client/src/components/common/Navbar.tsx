import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useWishlist } from '../../context/WishlistContext';
import { getProducts } from '../../services/api';
import { Product } from '../../types';

export const Navbar: React.FC = () => {
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // Load product index for instant search
  useEffect(() => {
    getProducts().then(setAllProducts).catch(console.error);
  }, []);

  // Handle outside click for search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products on typing
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const q = searchTerm.toLowerCase().trim();
    const matches = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.colour.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 6);

    setSearchResults(matches);
    setShowDropdown(true);
    setIsSearching(false);
  }, [searchTerm, allProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowDropdown(false);
      navigate(`/collections?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-cream-300 transition-all duration-200">
      {/* Top micro-announcement banner */}
      <div className="bg-brand-950 text-gold-300 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-4">
        <span>✨ Welcome to {shopInfo.shopName} — Handcrafted Precision Optics</span>
        <span className="hidden md:inline text-gold-400/40">•</span>
        <span className="hidden md:inline">For Enquiries: <a href={getCallUrl()} className="text-white hover:underline ml-1">{shopInfo.phone}</a></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-gold-400 group-hover:bg-brand-950 transition-colors shadow-sm">
              {/* Luxury Spectacles SVG Glyph */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="12" r="4" />
                <circle cx="18" cy="12" r="4" />
                <path d="M10 12h4" />
                <path d="M2 11l2-2" />
                <path d="M22 11l-2-2" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-950 uppercase group-hover:text-brand-800 transition-colors">
                {shopInfo.shopName}
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-gold-700 -mt-1">
                Luxury Eyewear
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-brand-900 bg-brand-50 font-semibold'
                    : 'text-neutral-700 hover:text-brand-900 hover:bg-cream-200/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* YouTube-Style Prominent Search Bar (Desktop) */}
          <div ref={searchRef} className="hidden md:flex relative flex-1 max-w-md mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  placeholder="Search frames, sunglasses, lenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-neutral-300 rounded-l-full text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all shadow-sm"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => { setSearchTerm(''); setSearchResults([]); }}
                    className="absolute right-3 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                aria-label="Search"
                className="px-5 py-2.5 bg-cream-200 hover:bg-cream-300 border border-l-0 border-neutral-300 rounded-r-full text-neutral-700 transition-colors flex items-center justify-center shrink-0"
              >
                <Search className="w-4 h-4 text-neutral-600" />
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-luxury border border-neutral-200 overflow-hidden z-50 animate-fadeIn">
                {searchResults.length > 0 ? (
                  <div className="py-2 divide-y divide-neutral-100">
                    <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Matching Products
                    </div>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream-100 transition-colors"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-10 object-cover rounded-lg border border-neutral-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {product.category} • {product.style} • ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-2.5 text-xs font-semibold text-brand-800 hover:bg-brand-50 transition-colors"
                    >
                      View all results for "{searchTerm}" →
                    </button>
                  </div>
                ) : searchTerm.trim() ? (
                  <div className="p-6 text-center text-sm text-neutral-500">
                    No matching eyewear found for "{searchTerm}"
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Action Icons (Wishlist & Mobile Toggles) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2.5 rounded-full text-neutral-700 hover:bg-cream-200 transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link with Live Counter */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-neutral-700 hover:text-brand-900 hover:bg-cream-200 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 text-neutral-700 hover:text-red-500 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-900 text-gold-300 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Direct WhatsApp Quick Enquiry (Desktop) */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900 text-gold-300 hover:bg-brand-950 text-xs font-semibold tracking-wide transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-neutral-800 hover:bg-cream-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Field (Collapsible) */}
        {mobileSearchOpen && (
          <div className="md:hidden py-3 border-t border-cream-300 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search eyewear, sunglasses, lenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className="flex-1 px-4 py-2 bg-white border border-neutral-300 rounded-full text-sm focus:outline-none focus:border-brand-800"
              />
              <button
                type="submit"
                className="p-2.5 bg-brand-900 text-white rounded-full hover:bg-brand-950 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-white/95 backdrop-blur-md px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-brand-900 bg-brand-50 font-semibold'
                    : 'text-neutral-800 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </a>
            <a
              href={getCallUrl()}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-cream-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Shop: {shopInfo.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
