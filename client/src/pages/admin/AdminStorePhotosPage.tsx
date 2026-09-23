import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Camera, X, ArrowUp, ArrowDown } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getStorePhotos, addStorePhoto, deleteStorePhoto } from '../../services/api';
import { StorePhoto } from '../../types';

export const AdminStorePhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState<StorePhoto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [captionInput, setCaptionInput] = useState('');

  const loadPhotos = async () => {
    try {
      const data = await getStorePhotos();
      setPhotos(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    try {
      await addStorePhoto({
        url: urlInput.trim(),
        caption: captionInput.trim() || 'Showroom Display Gallery',
        order: photos.length + 1
      });
      setUrlInput('');
      setCaptionInput('');
      setIsModalOpen(false);
      loadPhotos();
    } catch (e) {
      console.error(e);
      alert('Failed to add store photo.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this showroom photo?')) return;
    try {
      await deleteStorePhoto(id);
      loadPhotos();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Visual Gallery</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Store Photos & Showroom Gallery
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Upload and organize photographs of your boutique interior, lens testing labs, and frame lounges.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Store Photo</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-neutral-200/90 shadow-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] bg-cream-200">
                <img
                  src={item.url}
                  alt={item.caption || "Store Photo"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-brand-950/80 backdrop-blur-md text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Photo #{idx + 1}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs font-medium text-neutral-700">
                  {item.caption || 'No caption provided.'}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Order {item.order}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-5 shadow-2xl border border-neutral-200">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="font-serif font-bold text-xl text-neutral-900">Add Boutique Photo</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Caption / Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lens Glazing & Refraction Diagnostic Bar"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
