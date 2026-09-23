import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Sparkles, Sliders, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getHomepageConfig, updateHomepageConfig, getProducts } from '../../services/api';
import { HomepageConfig, Product } from '../../types';
import { initialHomepageConfig } from '../../services/mockData';

export const AdminHomepageManagerPage: React.FC = () => {
  const [config, setConfig] = useState<HomepageConfig>(initialHomepageConfig);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'featured' | 'why' | 'about'>('hero');

  useEffect(() => {
    getHomepageConfig().then(setConfig);
    getProducts().then(setProducts);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateHomepageConfig(config);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Failed to save homepage settings.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Content Studio</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Homepage Manager
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Customize headlines, hero photography, spotlighted frames, and store values in real time.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'Changes Saved!' : 'Save Homepage'}</span>
          </button>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Homepage configuration saved successfully! Public storefront is updated.</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto">
          {[
            { id: 'hero', label: 'Section 1: Hero Banner' },
            { id: 'featured', label: 'Section 4 & 6: Spotlight Eyewear' },
            { id: 'why', label: 'Section 7: Why Choose Us (4 Pillars)' },
            { id: 'about', label: 'Section 8: About Snippet' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-900 text-gold-300 shadow-sm'
                  : 'text-neutral-600 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-serif font-bold text-xl text-neutral-900">Hero Section Configuration</h3>
              <p className="text-xs text-neutral-500">Universal spectacles imagery & main headline text</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Hero Badge Text
                </label>
                <input
                  type="text"
                  value={config.hero.badge}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badge: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={config.hero.heading}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, heading: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Subheading (Italic)
                </label>
                <input
                  type="text"
                  value={config.hero.subheading}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subheading: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Hero Image URL (Universal Spectacles Photo)
                </label>
                <input
                  type="url"
                  value={config.hero.imageUrl}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, imageUrl: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Description Paragraph
              </label>
              <textarea
                rows={3}
                value={config.hero.description}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
              />
            </div>

            {/* Buttons Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={config.hero.primaryButtonText}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryButtonText: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={config.hero.secondaryButtonText}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, secondaryButtonText: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                />
              </div>
            </div>

            {/* Image Preview */}
            <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200">
              <span className="text-xs font-bold uppercase text-neutral-500 block mb-2">Image Preview</span>
              <img src={config.hero.imageUrl} alt="Hero" className="w-full max-h-48 object-cover rounded-xl" />
            </div>
          </div>
        )}

        {/* TAB 2: SPOTLIGHT & TRENDING */}
        {activeTab === 'featured' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-serif font-bold text-xl text-neutral-900">Featured & Trending Frame Pickers</h3>
              <p className="text-xs text-neutral-500">Select which catalog products are showcased in editorial sections</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Section 6: Featured Masterpiece Frame
                </label>
                <select
                  value={config.featuredProductId}
                  onChange={(e) => setConfig({ ...config, featuredProductId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Section 4: Trending Eyeglasses Feature
                </label>
                <select
                  value={config.trendingEyeglassesId || ''}
                  onChange={(e) => setConfig({ ...config, trendingEyeglassesId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                >
                  <option value="">Default Eyeglasses</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Section 4: Trending Sunglasses Feature
                </label>
                <select
                  value={config.trendingSunglassesId || ''}
                  onChange={(e) => setConfig({ ...config, trendingSunglassesId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                >
                  <option value="">Default Sunglasses</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WHY CHOOSE US */}
        {activeTab === 'why' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-serif font-bold text-xl text-neutral-900">Why Choose Us (4 Pillars)</h3>
              <p className="text-xs text-neutral-500">Edit titles and descriptions for the four value cards</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {config.whyChooseUs.map((item, index) => (
                <div key={index} className="p-4 bg-cream-100 rounded-2xl border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gold-700">Pillar #{index + 1}</span>
                    <span className="text-xs text-neutral-400 font-mono">Icon: {item.icon}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...config.whyChooseUs];
                        updated[index] = { ...updated[index], title: e.target.value };
                        setConfig({ ...config, whyChooseUs: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...config.whyChooseUs];
                        updated[index] = { ...updated[index], description: e.target.value };
                        setConfig({ ...config, whyChooseUs: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ABOUT SNIPPET */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-6">
            <div className="border-b border-neutral-100 pb-4">
              <h3 className="font-serif font-bold text-xl text-neutral-900">Homepage About Section</h3>
              <p className="text-xs text-neutral-500">Configure teaser story and boutique photograph</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={config.aboutSnippet.heading}
                onChange={(e) => setConfig({ ...config, aboutSnippet: { ...config.aboutSnippet, heading: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Description Text
              </label>
              <textarea
                rows={4}
                value={config.aboutSnippet.description}
                onChange={(e) => setConfig({ ...config, aboutSnippet: { ...config.aboutSnippet, description: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Showroom Image URL
              </label>
              <input
                type="url"
                value={config.aboutSnippet.imageUrl}
                onChange={(e) => setConfig({ ...config, aboutSnippet: { ...config.aboutSnippet, imageUrl: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
              />
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
