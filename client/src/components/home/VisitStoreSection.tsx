import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import { ShopInfo } from '../../types';
import { useShop } from '../../context/ShopContext';

interface VisitStoreSectionProps {
  shopInfo: ShopInfo;
}

export const VisitStoreSection: React.FC<VisitStoreSectionProps> = ({ shopInfo }) => {
  const { getWhatsAppUrl, getCallUrl } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            Location & Hours
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 mt-2">
            Visit Our Store
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base mt-2">
            Experience our full frame collection in person, try different styles with optician assistance, and receive professional visual consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-cream-100 rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-card flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center text-gold-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-neutral-900 text-base">Store Address</h3>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                    {shopInfo.address.line1}<br />
                    {shopInfo.address.line2 && <>{shopInfo.address.line2}<br /></>}
                    {shopInfo.address.city}, {shopInfo.address.state} — {shopInfo.address.pincode}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center text-gold-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-neutral-900 text-base">Consultation Hours</h3>
                  <div className="text-sm text-neutral-600 mt-1 space-y-1">
                    {shopInfo.openingHours.map((schedule, idx) => (
                      <p key={idx}><span className="font-semibold text-neutral-800">{schedule.days}:</span> {schedule.hours}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center text-gold-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-neutral-900 text-base">Phone & WhatsApp</h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    Call: <a href={getCallUrl()} className="text-brand-900 font-semibold hover:underline">{shopInfo.phone}</a>
                  </p>
                  <p className="text-sm text-neutral-600">
                    WhatsApp: <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">{shopInfo.whatsapp}</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-cream-300">
              <a
                href={shopInfo.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${shopInfo.shopName} ${shopInfo.address.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-5 py-3 rounded-xl bg-brand-900 hover:bg-brand-950 text-gold-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={getCallUrl()}
                className="flex-1 px-5 py-3 rounded-xl border border-neutral-300 hover:bg-cream-200 text-neutral-900 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store</span>
              </a>
            </div>

          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-200/90 shadow-card min-h-[360px] relative bg-cream-200 flex flex-col">
            {shopInfo.mapsEmbedUrl ? (
              <iframe
                title={`${shopInfo.shopName} Location`}
                src={shopInfo.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full flex-1"
              />
            ) : (
              <div className="w-full h-full flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream-200">
                <MapPin className="w-12 h-12 text-brand-900 mb-3" />
                <h4 className="font-serif font-bold text-xl text-neutral-900">{shopInfo.shopName}</h4>
                <p className="text-sm text-neutral-600 mt-1 max-w-sm">
                  {shopInfo.address.line1}, {shopInfo.address.city}
                </p>
                <a
                  href={shopInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-900 text-gold-300 text-xs font-bold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
