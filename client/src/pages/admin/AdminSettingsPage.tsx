import React, { useState, useEffect } from 'react';
import { Shield, Database, RotateCcw, CheckCircle2, AlertTriangle, Sparkles, Loader2, Save, Megaphone } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { seedStoreCatalog, getSettings, updateSettings } from '../../services/api';
import { StoreSettings } from '../../types';

export const AdminSettingsPage: React.FC = () => {
  const { adminUser, isFirebaseActive } = useAdminAuth();
  const [settings, setSettings] = useState<StoreSettings>({
    announcement: 'Welcome to SR OPTICALS — Handcrafted Luxury Eyewear & Precision Optical Care',
    announcementVisible: true,
    currency: '₹',
    maintenanceMode: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState<string | null>(null);
  const [seedError, setSeedError] = useState<string | null>(null);

  useEffect(() => {
    getSettings().then((data) => {
      if (data && Object.keys(data).length > 0) {
        setSettings(data);
      }
    });
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      const code = err?.code ? `[${err.code}] ` : '';
      const msg = err?.message || String(err);
      alert(`Failed to save settings:\n\n${code}${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExplicitSeed = async () => {
    const confirmed = window.confirm(
      'Initialize Cloud Firestore with default luxury eyewear catalog?\n\n' +
      'This will populate Firestore with:\n' +
      '• 8 Curated Luxury Frames (Men, Women, Children, Lenses)\n' +
      '• 4 Standard Categories\n' +
      '• Homepage Hero & "Why Choose Us" Configuration\n' +
      '• Store Information & Operating Schedule\n' +
      '• Boutique Showroom Photos\n' +
      '• Verified Customer Reviews\n\n' +
      'Do you want to proceed?'
    );

    if (!confirmed) return;

    setIsSeeding(true);
    setSeedSuccess(null);
    setSeedError(null);

    try {
      const res = await seedStoreCatalog();
      setSeedSuccess(res.message || 'Database seeded successfully!');
      setTimeout(() => setSeedSuccess(null), 6000);
    } catch (err: any) {
      console.error('Seeding error:', err);
      setSeedError(err.message || 'Seeding failed. Ensure you are signed in as an administrator.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">System & Diagnostics</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
            Portal Settings & Security
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Firebase connection state, store catalog initialization, announcements, and administrative controls.
          </p>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Store settings saved successfully.</span>
          </div>
        )}

        {seedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{seedSuccess}</span>
          </div>
        )}

        {seedError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{seedError}</span>
          </div>
        )}

        {/* Database & Firebase Status */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">Database & Cloud Adapter</h3>
              <p className="text-xs text-neutral-500">Live storage provider and project details</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-cream-100 rounded-2xl border border-neutral-200">
            <div>
              <p className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                <span>{isFirebaseActive ? 'Connected to Google Firebase' : 'Running in Offline / Persistent Storage Mode'}</span>
                <span className="font-mono text-[10px] text-neutral-500">
                  (Project: sr-opticals)
                </span>
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {isFirebaseActive
                  ? 'Cloud Firestore, Firebase Authentication, and Firebase Storage are actively processing data.'
                  : 'All admin changes are persisted in client storage and synchronized across pages in real-time.'}
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
              isFirebaseActive
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {isFirebaseActive ? 'Active Cloud' : 'Standalone'}
            </span>
          </div>
        </div>

        {/* Authenticated Admin Account */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">Authenticated Administrator</h3>
              <p className="text-xs text-neutral-500">Role-verified Firebase Auth session</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200">
              <span className="text-neutral-500 block">Admin User</span>
              <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{adminUser?.displayName || 'Administrator'}</span>
            </div>
            <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200">
              <span className="text-neutral-500 block">Email Address</span>
              <span className="font-bold text-neutral-900 text-sm mt-0.5 block truncate">{adminUser?.email}</span>
            </div>
            <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200">
              <span className="text-neutral-500 block">Role Verification</span>
              <span className="font-bold text-emerald-700 text-sm mt-0.5 block flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" /> Verified Admin
              </span>
            </div>
          </div>
        </div>

        {/* Global Announcement & Store Settings Form */}
        <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">Storefront Announcement & Display</h3>
              <p className="text-xs text-neutral-500">Top announcement strip and currency preferences</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Top Announcement Bar Message
              </label>
              <input
                type="text"
                value={settings.announcement || ''}
                onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                placeholder="e.g. Complimentary Vision Screening & Bespoke Frame Consultation"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={settings.currency || '₹'}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900 font-bold"
                  placeholder="₹"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcementVisible ?? true}
                    onChange={(e) => setSettings({ ...settings, announcementVisible: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-900"></div>
                  <span className="ml-3 text-xs font-bold text-neutral-700">Display Announcement Bar</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>

        {/* One-Time Explicit Database Seeding */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">One-Time Store Catalog Initialization</h3>
              <p className="text-xs text-neutral-500">Seed Cloud Firestore with luxury starter frames and store configuration</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 space-y-2">
            <p className="font-semibold flex items-center gap-1.5 text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Explicit Seeding Control</span>
            </p>
            <p className="text-[11px] leading-relaxed text-amber-800">
              In accordance with production security standards, database collections are never automatically populated on read.
              If this is a fresh Firebase setup, click below to initialize all 7 collections (<code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">products</code>, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">categories</code>, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">homepage</code>, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">shopInfo</code>, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">reviews</code>, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">storePhotos</code>, <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">settings</code>) with starter data.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleExplicitSeed}
              disabled={isSeeding}
              className="px-6 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                  <span>Seeding Firestore...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Initialize / Seed Store Catalog</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
