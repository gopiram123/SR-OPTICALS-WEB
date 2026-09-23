import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getWhatsAppUrl } = useShop();

  const isSaved = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/90 hover:border-gold-400/50 shadow-card hover:shadow-luxury-hover transition-all duration-300 flex flex-col">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-cream-200/60 overflow-hidden flex items-center justify-center p-4">
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-brand-900 text-gold-300 text-[10px] font-bold tracking-wider uppercase rounded-md shadow-sm">
              New Arrival
            </span>
          )}
          {product.availability === 'Out of Stock' ? (
            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 text-[10px] font-semibold rounded-md">
              Sold Out
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-semibold rounded-md">
              In Stock
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isSaved
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-neutral-600 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isSaved ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Style Meta */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-medium">
            <span>{product.category} • {product.gender}</span>
            <span className="text-gold-700 font-semibold">{product.style}</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group/title">
            <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 line-clamp-1 group-hover/title:text-brand-800 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Key Specs Pills */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2 py-0.5 bg-cream-200 text-neutral-700 text-[11px] rounded-md font-medium">
              {product.frameType}
            </span>
            <span className="px-2 py-0.5 bg-cream-200 text-neutral-700 text-[11px] rounded-md font-medium">
              {product.material}
            </span>
          </div>
        </div>

        {/* Price & Actions Row */}
        <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-neutral-400 block -mb-0.5">Price</span>
            <span className="font-serif text-base sm:text-lg font-bold text-brand-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Enquiry */}
            <a
              href={getWhatsAppUrl(product.name, product.sku)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Enquire</span>
            </a>

            {/* View Details Link */}
            <Link
              to={`/product/${product.id}`}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-gold-300 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span className="hidden sm:inline">Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
