import React, { useState } from 'react';
import { Settings, Shield, Database, RotateCcw, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { resetToFactorySeed } from '../../services/api';

export const AdminSettingsPage: React.FC = () => {
  const { adminUser, isFirebaseActive } = useAdminAuth();
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data (products, categories, store info, reviews) back to initial default seed values?')) {
      resetToFactorySeed();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 4000);
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
            System connection state, database configuration, and administrative controls.
          </p>
        </div>

        {resetSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Catalog and store configuration reset to default factory seed data successfully.</span>
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
              <p className="text-xs text-neutral-500">Live storage provider status</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-cream-100 rounded-2xl border border-neutral-200">
            <div>
              <p className="text-xs font-bold text-neutral-900">
                {isFirebaseActive ? 'Connected to Google Firebase' : 'Running in Offline / Persistent Storage Mode'}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {isFirebaseActive
                  ? 'Cloud Firestore, Firebase Authentication, and Firebase Storage are actively processing data.'
                  : 'All admin changes are persisted in client storage and synchronized across pages in real-time. To switch to live cloud Firebase, configure VITE_FIREBASE_* variables in client/.env.'}
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isFirebaseActive
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {isFirebaseActive ? 'Active' : 'Standalone'}
            </span>
          </div>
        </div>

        {/* Admin Account */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-300 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">Authenticated Administrator</h3>
              <p className="text-xs text-neutral-500">Current session details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200">
              <span className="text-neutral-500 block">Admin User</span>
              <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{adminUser?.displayName}</span>
            </div>
            <div className="p-4 bg-cream-100 rounded-2xl border border-neutral-200">
              <span className="text-neutral-500 block">Email Address</span>
              <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{adminUser?.email}</span>
            </div>
          </div>
        </div>

        {/* Factory Reset Utility */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-card space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-rose-950">Reset to Factory Demo Seed</h3>
              <p className="text-xs text-rose-700">Restore default frames, categories, and initial copy</p>
            </div>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed">
            If you wish to restore the original realistic spectacles photography, categories (Men, Women, Children, Lenses), and sample reviews, click below.
          </p>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data to Default</span>
          </button>
        </div>

      </div>
    </AdminLayout>
  );
};
