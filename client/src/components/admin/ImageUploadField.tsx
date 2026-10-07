import React, { useRef, useState } from 'react';
import { Upload, X, RefreshCw, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { uploadFileToStorage, deleteFileFromStorage } from '../../services/storageService';

interface ImageUploadFieldProps {
  label: string;
  sublabel?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: 'categories' | 'homepage' | 'store' | 'brand';
  aspectRatio?: 'square' | 'wide' | 'tall';
  required?: boolean;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  sublabel,
  value,
  onChange,
  folder = 'homepage',
  aspectRatio = 'wide',
  required = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const oldUrl = value;
      const downloadUrl = await uploadFileToStorage(file, folder, (progress) => {
        setUploadProgress(progress);
      });

      onChange(downloadUrl);

      // Clean up old uploaded image if replaced
      if (oldUrl && oldUrl !== downloadUrl) {
        deleteFileFromStorage(oldUrl).catch(() => {});
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError(err?.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    const currentUrl = value;
    onChange('');
    if (currentUrl) {
      deleteFileFromStorage(currentUrl).catch(() => {});
    }
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'tall'
      ? 'aspect-[4/5]'
      : 'aspect-[16/9]';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {sublabel && <span className="text-[11px] text-neutral-400">{sublabel}</span>}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {value ? (
        <div className="relative rounded-2xl overflow-hidden bg-cream-100 border border-neutral-200 group">
          <div className={`w-full max-h-56 ${aspectClass} p-2 flex items-center justify-center bg-neutral-900/5`}>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          {/* Action overlay */}
          <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-white text-neutral-800 text-xs font-bold shadow-md hover:bg-neutral-100 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              disabled={isUploading}
              onClick={handleRemove}
              className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700 flex items-center gap-1.5 transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-neutral-950/70 flex flex-col items-center justify-center text-white p-4">
              <RefreshCw className="w-6 h-6 animate-spin text-gold-400 mb-2" />
              <p className="text-xs font-bold">Compressing & processing... {uploadProgress}%</p>
              <div className="w-48 bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gold-400 h-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-neutral-300 hover:border-gold-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-cream-50/50 hover:bg-white flex flex-col items-center justify-center ${
            isUploading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2 py-3">
              <RefreshCw className="w-7 h-7 animate-spin text-brand-900" />
              <p className="text-xs font-bold text-neutral-800">
                Compressing & processing... {uploadProgress}%
              </p>
              <div className="w-48 bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-900 h-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-cream-200 text-neutral-600 flex items-center justify-center mb-2">
                <Upload className="w-5 h-5 text-neutral-700" />
              </div>
              <p className="text-xs font-bold text-neutral-800">Click to upload from device</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">JPG, PNG, or WEBP (Max 5 MB)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
