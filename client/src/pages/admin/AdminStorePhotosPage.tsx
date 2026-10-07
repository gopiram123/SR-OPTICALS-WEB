import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Camera, X } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getStorePhotos, addStorePhoto, deleteStorePhoto } from '../../services/api';
import { StorePhoto } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';

export const AdminStorePhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState<StorePhoto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageInput, setImageInput] = useState('');
  const [captionInput, setCaptionInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
    if (!imageInput.trim()) {
      alert('Please upload a store photograph from your device.');
      return;
    }

    setIsSaving(true);
    try {
      await addStorePhoto({
        image: imageInput.trim(),
        title: captionInput.trim() || 'Showroom Display Gallery',
        description: '',
        visible: true,
        order: photos.length + 1
      });
      setImageInput('');
      setCaptionInput('');
      setIsModalOpen(false);
      loadPhotos();
    } catch (e: any) {
      console.error(e);
      const code = e?.code ? `[${e.code}] ` : '';
      const msg = e?.message || String(e);
      alert(`Failed to add store photo:\n\n${code}${msg}`);
    } finally {
      setIsSaving(false);
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
              Upload photographs of your boutique interior, lens testing labs, and frame lounges directly to Firebase Storage.
            </p>
          </div>

          <button
            onClick={() => {
              setImageInput('');
              setCaptionInput('');
              setIsModalOpen(true);
            }}
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
                  src={item.image || item.url}
                  alt={item.title || item.caption || "Store Photo"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-brand-950/80 backdrop-blur-md text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Photo #{idx + 1}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs font-medium text-neutral-700">
                  {item.title || item.caption || 'No caption provided.'}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Order #{item.order}</span>
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

          {photos.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-neutral-200">
              <Camera className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-700">No Showroom Photos Uploaded Yet</p>
              <p className="text-xs text-neutral-400 mt-1">Click "Upload Store Photo" to add interior gallery images.</p>
            </div>
          )}
        </div>

        {/* Direct Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="font-serif font-bold text-xl text-neutral-900">Add Boutique Photograph</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <ImageUploadField
                  label="Showroom Image"
                  sublabel="Direct upload from device to Firebase Storage"
                  value={imageInput}
                  onChange={setImageInput}
                  folder="store"
                  aspectRatio="wide"
                  required
                />

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Caption / Title
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
                    disabled={isSaving || !imageInput}
                    className="px-5 py-2.5 rounded-full bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Photo'}
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
