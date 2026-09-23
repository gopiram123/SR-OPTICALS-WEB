import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail, Navigation, ExternalLink, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getStorePhotos } from '../services/api';
import { StorePhoto } from '../types';

export const ContactPage: React.FC = () => {
  const { shopInfo, getWhatsAppUrl, getCallUrl } = useShop();
  const [storePhotos, setStorePhotos] = useState<StorePhoto[]>([]);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');

  useEffect(() => {
    getStorePhotos().then(setStorePhotos);
  }, []);

  const handleCustomWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const rawNumber = shopInfo.whatsapp.replace(/[^0-9]/g, '');
    const text = `Hello ${shopInfo.shopName}, my name is ${enquiryName.trim() || 'a customer'}.\n\nEnquiry: ${enquiryMessage.trim() || 'I would like to enquire about eyewear availability and eye examinations.'}`;
    window.open(`https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold-700">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-950">
            Visit Our Store & Connect
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            Have questions about frame dimensions, lens materials, or eye exams? Our optical team is available via WhatsApp, phone, or in-person visit.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Phone */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center text-gold-400">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-900">Phone Support</h3>
              <p className="text-sm text-neutral-600">
                Call our boutique during operating hours for immediate assistance.
              </p>
              <p className="text-base font-bold text-brand-950 font-serif">{shopInfo.phone}</p>
            </div>
            <div className="pt-6">
              <a
                href={getCallUrl()}
                className="w-full py-3 rounded-full border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-gold-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store Now</span>
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-900">WhatsApp Concierge</h3>
              <p className="text-sm text-neutral-600">
                Send us photos of your prescription, ask for frame availability, or request price details.
              </p>
              <p className="text-base font-bold text-emerald-800 font-serif">{shopInfo.whatsapp}</p>
            </div>
            <div className="pt-6">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center text-gold-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-900">Store Boutique</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {shopInfo.address.line1}<br />
                {shopInfo.address.line2 && <>{shopInfo.address.line2}<br /></>}
                {shopInfo.address.city}, {shopInfo.address.state} - {shopInfo.address.pincode}
              </p>
              <div className="text-xs text-neutral-500 pt-1">
                {shopInfo.openingHours.map((h, i) => (
                  <p key={i}><span className="font-semibold text-neutral-800">{h.days}:</span> {h.hours}</p>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <a
                href={shopInfo.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(`${shopInfo.shopName} ${shopInfo.address.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>View on Map</span>
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Map & Direct Enquiry Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Quick WhatsApp Message Composer */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Send an Instant Enquiry</h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6">
              Compose your query below and click "Send via WhatsApp". Your message will automatically launch in WhatsApp with our optical experts.
            </p>

            <form onSubmit={handleCustomWhatsAppEnquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Patel"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Message / Eyewear Enquiry
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ask about frame suitability, prescription lens pricing, or appointment slots..."
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Right: Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-200/90 shadow-card min-h-[380px] bg-cream-200">
            {shopInfo.mapsEmbedUrl ? (
              <iframe
                title="Google Maps Location"
                src={shopInfo.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-cream-200 min-h-[380px]">
                <MapPin className="w-12 h-12 text-brand-900 mb-3" />
                <h4 className="font-serif font-bold text-xl text-neutral-900">{shopInfo.shopName}</h4>
                <p className="text-sm text-neutral-600 mt-1 max-w-sm">
                  {shopInfo.address.line1}, {shopInfo.address.city}
                </p>
                <a
                  href={shopInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-900 text-gold-300 text-xs font-bold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
