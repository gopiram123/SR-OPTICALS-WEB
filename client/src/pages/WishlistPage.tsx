import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, MessageCircle, Phone, ArrowRight, Glasses } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useShop } from '../context/ShopContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();

  return (
    <div className="min-h-screen bg-cream-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-widest mb-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Saved Eyewear</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
            My Wishlist
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Keep track of frames you love. Contact our optical boutique directly on WhatsApp to check store stock or arrange a try-on.
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="space-y-6">
            
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] rounded-2xl bg-cream-200/80 p-4 mb-4 flex items-center justify-center overflow-hidden">
                      <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label="Remove item from wishlist"
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-neutral-400 hover:text-rose-600 hover:bg-white shadow-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-medium mb-1">
                      <span>{product.category} • {product.gender}</span>
                      <span className="text-gold-700 font-semibold">{product.style}</span>
                    </div>

                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-serif text-lg font-bold text-neutral-900 hover:text-brand-900 truncate">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="font-serif text-xl font-bold text-brand-950 mt-2">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-neutral-100 flex flex-col gap-2">
                    <a
                      href={getWhatsAppUrl(product.name, product.sku)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>WhatsApp Enquiry</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <a
                        href={getCallUrl()}
                        className="flex-1 py-2 rounded-xl border border-neutral-300 text-neutral-800 hover:bg-cream-100 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 py-2 rounded-xl bg-brand-900 hover:bg-brand-950 text-gold-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Enquiry Banner */}
            <div className="bg-brand-950 text-white rounded-3xl p-8 border border-gold-500/20 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">Have questions about your selections?</h3>
                <p className="text-xs sm:text-sm text-cream-300 mt-1">
                  Our opticians can advise on prescription compatibility, frame sizing, and custom lens tinting.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire All on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-neutral-200/90 shadow-card max-w-lg mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6 text-neutral-400">
              <Glasses className="w-10 h-10 text-brand-900" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              My Wishlist is Empty
            </h2>
            <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
              You haven't saved any eyewear to your wishlist yet. Explore our handcrafted collections and tap the heart icon on frames you adore.
            </p>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Explore Eyewear Collections</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
