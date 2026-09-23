import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Phone,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { getProductById, getProducts } from '../services/api';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    setIsLoading(true);
    getProductById(id).then((data: Product | null) => {
      setProduct(data);
      setSelectedImageIndex(0);
      if (data) {
        getProducts().then((all: Product[]) => {
          const related = all
            .filter((p: Product) => p.id !== data.id && (p.category === data.category || p.style === data.style))
            .slice(0, 4);
          setRelatedProducts(related);
        });
      }
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-neutral-600">Loading eyewear details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center py-20">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-neutral-200 shadow-card">
          <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Eyewear Not Found</h2>
          <p className="text-sm text-neutral-600 mb-6">
            The frame you are looking for may have been removed or updated in our inventory.
          </p>
          <Link
            to="/collections"
            className="px-6 py-3 rounded-full bg-brand-900 text-gold-300 font-semibold text-xs uppercase tracking-wider"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const specifications = [
    { label: "Category", value: product.category },
    { label: "Gender Profile", value: product.gender },
    { label: "Frame Style", value: product.style },
    { label: "Frame Construction", value: product.frameType },
    { label: "Primary Material", value: product.material },
    { label: "Colour Finish", value: product.colour },
    { label: "Frame Dimensions", value: product.dimensions || "Standard Precision Fit (52-18-140)" },
    { label: "Stock SKU / Model", value: product.sku || `SRO-${product.id.slice(-4).toUpperCase()}` },
  ];

  return (
    <div className="min-h-screen bg-cream-100 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous</span>
          </button>
        </div>

        {/* Main Product Details Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-luxury overflow-hidden p-6 sm:p-10 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Image Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Primary Active Image Display */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200/80 p-6 flex items-center justify-center border border-neutral-200">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={`${product.name} frame view`}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                      New Release
                    </span>
                  )}
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                    product.availability === 'Out of Stock'
                      ? 'bg-neutral-800 text-white border-neutral-800'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {product.availability}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-sm transition-all ${
                    isSaved
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-white/90 text-neutral-700 hover:text-rose-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 transition-transform active:scale-125 ${isSaved ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden bg-cream-200 p-2 border-2 transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-brand-900 shadow-sm'
                          : 'border-transparent hover:border-neutral-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badge Bar */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-brand-800 shrink-0" />
                  <span>100% Genuine Optical Frame</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                  <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Custom Lens Glazing Available</span>
                </div>
              </div>

            </div>

            {/* Right Details & Enquiry Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span>{product.category} • {product.gender}</span>
                  <span className="text-gold-700 font-bold uppercase tracking-wider">{product.style}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-4 py-2 border-y border-neutral-100">
                  <div>
                    <span className="text-[11px] text-neutral-400 block -mb-0.5">Showroom Price</span>
                    <span className="font-serif text-3xl font-bold text-brand-950">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500">
                    (Frame only • Lens pricing tailored to prescription)
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Description & Craft
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specifications List */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 bg-cream-100 p-4 rounded-2xl border border-neutral-200/80 text-xs">
                    {specifications.map((spec, i) => (
                      <div key={i} className="space-y-0.5">
                        <span className="text-neutral-500 block text-[11px]">{spec.label}</span>
                        <span className="font-semibold text-neutral-900 block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons: WhatsApp & Call (Strictly NO Cart/Checkout) */}
              <div className="space-y-3 pt-6 border-t border-neutral-200">
                
                <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center gap-3 text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Ready to purchase or try this frame? Contact our store directly via WhatsApp or phone.</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* WhatsApp Enquiry Button */}
                  <a
                    href={getWhatsAppUrl(product.name, product.sku)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>WhatsApp Enquiry</span>
                  </a>

                  {/* Call Shop Button */}
                  <a
                    href={getCallUrl()}
                    className="flex-1 py-4 px-6 rounded-2xl border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-gold-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Shop</span>
                  </a>
                </div>

                {/* In-store assistance disclaimer */}
                <p className="text-[11px] text-center text-neutral-500">
                  In-store trials, eye examinations, and personalized frame fittings available at our {shopInfo.address.city} boutique.
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">You May Also Admire</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950">Related Frames</h2>
              </div>
              <Link
                to="/collections"
                className="text-xs font-bold uppercase tracking-wider text-brand-900 hover:underline"
              >
                View Full Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
