import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Phone, MessageCircle, Mail, MapPin, Clock, Globe, Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getShopInfo, updateShopInfo } from '../../services/api';
import { ShopInfo } from '../../types';
import { initialShopInfo } from '../../services/mockData';

export const AdminStoreInfoPage: React.FC = () => {
  const [shopInfo, setShopInfo] = useState<ShopInfo>(initialShopInfo);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getShopInfo().then(setShopInfo);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateShopInfo(shopInfo);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Failed to update shop details.');
    }
  };

  const handleAddSchedule = () => {
    setShopInfo({
      ...shopInfo,
      openingHours: [
        ...shopInfo.openingHours,
        { days: 'Special Hours', hours: '10:00 AM – 06:00 PM' }
      ]
    });
  };

  const handleRemoveSchedule = (idx: number) => {
    setShopInfo({
      ...shopInfo,
      openingHours: shopInfo.openingHours.filter((_, i) => i !== idx)
    });
  };

  const handleUpdateSchedule = (idx: number, field: 'days' | 'hours', value: string) => {
    const updated = [...shopInfo.openingHours];
    updated[idx] = { ...updated[idx], [field]: value };
    setShopInfo({ ...shopInfo, openingHours: updated });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Business Profile</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Shop Information Management
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Manage your store name, phone, WhatsApp enquiry number, physical boutique address, and operating hours.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'Saved Successfully!' : 'Save Store Details'}</span>
          </button>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Store contact information updated. Changes are immediately live across all website buttons and links.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Brand Identity & Basic Contacts */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-5">
            <div className="border-b border-neutral-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-neutral-900">Brand Identity & Contacts</h3>
              <p className="text-xs text-neutral-500">Shop name and primary communication channels</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Shop Name *
                </label>
                <input
                  type="text"
                  required
                  value={shopInfo.shopName}
                  onChange={(e) => setShopInfo({ ...shopInfo, shopName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={shopInfo.tagline || ''}
                  onChange={(e) => setShopInfo({ ...shopInfo, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  placeholder="e.g. Precision Optics & Handcrafted Luxury Frames"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Phone Number (Calls & tel: links) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={shopInfo.phone}
                    onChange={(e) => setShopInfo({ ...shopInfo, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  />
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  WhatsApp Number (Customer Enquiry Target) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={shopInfo.whatsapp}
                    onChange={(e) => setShopInfo({ ...shopInfo, whatsapp: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900 font-semibold text-emerald-800"
                  />
                  <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
                </div>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  Include country code, e.g. +91 98765 43210
                </span>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Official Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={shopInfo.email}
                    onChange={(e) => setShopInfo({ ...shopInfo, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Physical Address & Maps */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-5">
            <div className="border-b border-neutral-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-neutral-900">Physical Boutique Location & Map</h3>
              <p className="text-xs text-neutral-500">Displayed in footer, contact page, and visit store section</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  required
                  value={shopInfo.address.line1}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    address: { ...shopInfo.address, line1: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={shopInfo.address.line2 || ''}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    address: { ...shopInfo.address, line2: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={shopInfo.address.city}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    address: { ...shopInfo.address, city: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={shopInfo.address.state}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    address: { ...shopInfo.address, state: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  PIN / Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={shopInfo.address.pincode}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    address: { ...shopInfo.address, pincode: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Google Maps URL (Open in Maps link)
                </label>
                <input
                  type="url"
                  value={shopInfo.mapsUrl}
                  onChange={(e) => setShopInfo({ ...shopInfo, mapsUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Google Maps Embed Iframe URL
                </label>
                <input
                  type="text"
                  value={shopInfo.mapsEmbedUrl}
                  onChange={(e) => setShopInfo({ ...shopInfo, mapsEmbedUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
            </div>
          </div>

          {/* Opening Hours Schedule */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-neutral-900">Weekly Operating Hours</h3>
                <p className="text-xs text-neutral-500">Configure consultation and showroom walk-in schedule</p>
              </div>
              <button
                type="button"
                onClick={handleAddSchedule}
                className="px-3 py-1.5 rounded-lg bg-cream-200 text-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-cream-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Days</span>
              </button>
            </div>

            <div className="space-y-3">
              {shopInfo.openingHours.map((schedule, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={schedule.days}
                    onChange={(e) => handleUpdateSchedule(idx, 'days', e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border border-neutral-300 text-xs font-bold"
                    placeholder="e.g. Monday – Saturday"
                  />
                  <input
                    type="text"
                    value={schedule.hours}
                    onChange={(e) => handleUpdateSchedule(idx, 'hours', e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl border border-neutral-300 text-xs font-medium"
                    placeholder="e.g. 10:00 AM – 09:00 PM"
                  />
                  {shopInfo.openingHours.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSchedule(idx)}
                      className="p-2 text-neutral-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-4">
            <div className="border-b border-neutral-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-neutral-900">Social Media Links</h3>
              <p className="text-xs text-neutral-500">Only links configured here will display in the footer</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={shopInfo.socials?.instagram || ''}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    socials: { ...shopInfo.socials, instagram: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-neutral-300 text-xs"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={shopInfo.socials?.facebook || ''}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    socials: { ...shopInfo.socials, facebook: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-neutral-300 text-xs"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Google Business Listing URL
                </label>
                <input
                  type="url"
                  value={shopInfo.socials?.google || ''}
                  onChange={(e) => setShopInfo({
                    ...shopInfo,
                    socials: { ...shopInfo.socials, google: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-xl border border-neutral-300 text-xs"
                  placeholder="https://g.page/..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Store Details</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
};
