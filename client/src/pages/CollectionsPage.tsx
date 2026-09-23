import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, RotateCcw, SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { getProducts, getCategories, DATA_CHANGED_EVENT } from '../services/api';
import { Product, Category } from '../types';
import { ProductCard } from '../components/products/ProductCard';

export const CollectionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States initialized from URL params
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [selectedStyle, setSelectedStyle] = useState<string>(searchParams.get('style') || 'All');
  const [selectedFrameType, setSelectedFrameType] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState<boolean>(searchParams.get('new') === 'true');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state if URL search query changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const sty = searchParams.get('style');
    if (sty) setSelectedStyle(sty);

    const srch = searchParams.get('search');
    if (srch !== null) setSearchQuery(srch);

    const isNew = searchParams.get('new');
    if (isNew === 'true') setNewArrivalsOnly(true);
  }, [searchParams]);

  const loadData = async () => {
    try {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener(DATA_CHANGED_EVENT, handleUpdate);
    return () => window.removeEventListener(DATA_CHANGED_EVENT, handleUpdate);
  }, []);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStyle('All');
    setSelectedFrameType('All');
    setSelectedMaterial('All');
    setInStockOnly(false);
    setNewArrivalsOnly(false);
    setSearchQuery('');
    setMaxPrice(6000);
    setSortBy('newest');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.style.toLowerCase().includes(q) ||
          item.material.toLowerCase().includes(q) ||
          item.colour.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Style
      if (selectedStyle !== 'All' && item.style !== selectedStyle) {
        return false;
      }

      // Frame Type
      if (selectedFrameType !== 'All' && item.frameType !== selectedFrameType) {
        return false;
      }

      // Material
      if (selectedMaterial !== 'All' && item.material !== selectedMaterial) {
        return false;
      }

      // Stock
      if (inStockOnly && item.availability === 'Out of Stock') {
        return false;
      }

      // New Arrivals
      if (newArrivalsOnly && !item.isNew) {
        return false;
      }

      // Price
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); // default newest
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedStyle,
    selectedFrameType,
    selectedMaterial,
    inStockOnly,
    newArrivalsOnly,
    maxPrice,
    sortBy
  ]);

  const styleOptions = ['All', 'Classic', 'Modern', 'Premium', 'Everyday'];
  const frameTypeOptions = ['All', 'Full Rim', 'Half Rim', 'Rimless'];
  const materialOptions = ['All', 'Acetate', 'Titanium', 'Metal', 'TR90'];

  return (
    <div className="min-h-screen bg-cream-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-neutral-200/90 pb-8 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            Catalog & Discovery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-1">
            Eyewear Collections
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl">
            Browse our complete range of precision ophthalmic frames and sunglasses. Connect directly on WhatsApp or call our shop for prescription fittings.
          </p>
        </div>

        {/* Top Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-sm mb-8">
          
          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search frames by name, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-cream-100 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-800"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Sheet Trigger */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-4 py-2 rounded-xl bg-cream-200 border border-neutral-300 text-neutral-800 text-xs font-semibold flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Results Count */}
            <span className="text-xs font-medium text-neutral-500">
              Showing <span className="font-bold text-neutral-900">{filteredProducts.length}</span> frames
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 hidden sm:inline font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-cream-100 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none focus:border-brand-800"
              >
                <option value="newest">Featured & Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filter */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-card space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h3 className="font-serif font-bold text-base text-neutral-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-800" />
                  <span>Refine Frames</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-gold-700 hover:text-gold-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2.5">
                  Category
                </label>
                <div className="flex flex-col space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-brand-900 text-gold-300'
                        : 'text-neutral-600 hover:bg-cream-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-brand-900 text-gold-300'
                          : 'text-neutral-600 hover:bg-cream-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2.5">
                  Aesthetic Style
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {styleOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStyle(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedStyle === st
                          ? 'bg-brand-900 text-gold-300'
                          : 'bg-cream-200 text-neutral-700 hover:bg-cream-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Structure */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2.5">
                  Frame Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {frameTypeOptions.map((ft) => (
                    <button
                      key={ft}
                      onClick={() => setSelectedFrameType(ft)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedFrameType === ft
                          ? 'bg-brand-900 text-gold-300'
                          : 'bg-cream-200 text-neutral-700 hover:bg-cream-300'
                      }`}
                    >
                      {ft}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2.5">
                  Material
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {materialOptions.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedMaterial === mat
                          ? 'bg-brand-900 text-gold-300'
                          : 'bg-cream-200 text-neutral-700 hover:bg-cream-300'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-neutral-700 mb-2">
                  <span className="uppercase tracking-wider text-neutral-500">Max Price</span>
                  <span className="font-serif text-brand-950 text-sm">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="6000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-900 cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-neutral-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-brand-900 focus:ring-brand-900 w-4 h-4"
                  />
                  <span>In Stock Only</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-neutral-700">
                  <input
                    type="checkbox"
                    checked={newArrivalsOnly}
                    onChange={(e) => setNewArrivalsOnly(e.target.checked)}
                    className="rounded text-brand-900 focus:ring-brand-900 w-4 h-4"
                  />
                  <span>New Releases Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid (4 cols on desktop where appropriate, 3 tablet, 2 mobile) */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200/90 shadow-card max-w-lg mx-auto my-12">
                <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                  We couldn't find any optical frames matching your active filter criteria. Try adjusting filters or search terms.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 rounded-full bg-brand-900 text-gold-300 font-semibold text-xs uppercase tracking-wider hover:bg-brand-950 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>

        {/* Mobile Filter Slide-Over Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
                  <h3 className="font-serif font-bold text-lg text-neutral-900">Filter Eyewear</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['All', ...categories.map(c => c.name)].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            selectedCategory === cat
                              ? 'bg-brand-900 text-gold-300'
                              : 'bg-cream-200 text-neutral-700'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                      Style
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {styleOptions.map((st) => (
                        <button
                          key={st}
                          onClick={() => setSelectedStyle(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            selectedStyle === st
                              ? 'bg-brand-900 text-gold-300'
                              : 'bg-cream-200 text-neutral-700'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-neutral-700 mb-2">
                      <span>Max Price</span>
                      <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="1500"
                      max="6000"
                      step="250"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-brand-900"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-xl border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
