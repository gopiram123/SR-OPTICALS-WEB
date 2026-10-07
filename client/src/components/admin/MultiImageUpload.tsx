import React, { useRef, useState } from 'react';
import {
  Upload,
  X,
  Star,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { uploadFileToStorage, deleteFileFromStorage } from '../../services/storageService';

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: 'products';
  maxImages?: number;
}

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  images,
  onChange,
  folder = 'products',
  maxImages = 10
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const [replaceTargetIndex, setReplaceTargetIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Handle uploading multiple new files from device
  const handleMultipleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images per product.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    const uploadedUrls: string[] = [];
    const totalFiles = files.length;

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        const url = await uploadFileToStorage(file, folder, (singleProgress) => {
          const overall = Math.round(((i + singleProgress / 100) / totalFiles) * 100);
          setUploadProgress(overall);
        });
        uploadedUrls.push(url);
      }

      onChange([...images, ...uploadedUrls]);
    } catch (err: any) {
      console.error('Batch upload error:', err);
      setError(err?.message || 'One or more images failed to upload.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle replacing a specific image at replaceTargetIndex
  const handleReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || replaceTargetIndex === null) return;

    const targetIdx = replaceTargetIndex;
    const oldUrl = images[targetIdx];

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const newUrl = await uploadFileToStorage(file, folder, (progress) => {
        setUploadProgress(progress);
      });

      const updated = [...images];
      updated[targetIdx] = newUrl;
      onChange(updated);

      // Clean up old storage asset
      if (oldUrl && oldUrl !== newUrl) {
        deleteFileFromStorage(oldUrl).catch(() => {});
      }
    } catch (err: any) {
      console.error('Replace image error:', err);
      setError(err?.message || 'Failed to replace image.');
    } finally {
      setIsUploading(false);
      setReplaceTargetIndex(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const remaining = images.filter((_, i) => i !== index);
    onChange([selected, ...remaining]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  const handleRemove = (index: number) => {
    const targetUrl = images[index];
    const filtered = images.filter((_, i) => i !== index);
    onChange(filtered);

    if (targetUrl) {
      deleteFileFromStorage(targetUrl).catch(() => {});
    }
  };

  const triggerReplace = (index: number) => {
    setReplaceTargetIndex(index);
    replaceInputRef.current?.click();
  };

  return (
    <div className="space-y-4 bg-cream-100/90 p-5 rounded-2xl border border-neutral-200">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
            Product Photographs *
          </label>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            Upload high-resolution images directly from your device (JPG, PNG, WEBP $\le$ 5 MB).
          </p>
        </div>
        <span className="text-xs font-bold text-neutral-600 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-sm">
          {images.length} / {maxImages} Photos
        </span>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleMultipleFilesChange}
        className="hidden"
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleReplaceFileChange}
        className="hidden"
      />

      {/* Error alert */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {/* Upload button & upload progress banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        <button
          type="button"
          disabled={isUploading || images.length >= maxImages}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-gold-300 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Compressing & processing... {uploadProgress}%</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Choose Photographs from Device</span>
            </>
          )}
        </button>

        {isUploading && (
          <div className="flex-1 max-w-xs bg-neutral-200 h-2 rounded-full overflow-hidden self-center">
            <div
              className="bg-brand-900 h-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Thumbnails grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 pt-2">
          {images.map((img, i) => {
            const isPrimary = i === 0;

            return (
              <div
                key={img + i}
                className={`relative rounded-2xl overflow-hidden bg-white border transition-all flex flex-col ${
                  isPrimary
                    ? 'border-gold-500 shadow-md ring-2 ring-gold-500/25'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {/* Primary Tag */}
                {isPrimary && (
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-brand-900 text-gold-300 text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-gold-300" />
                    <span>Primary</span>
                  </div>
                )}

                {/* Preview Thumbnail */}
                <div className="w-full h-28 p-2.5 bg-cream-50 flex items-center justify-center">
                  <img
                    src={img}
                    alt={`Frame ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Controls Bar */}
                <div className="p-2 bg-neutral-50/90 border-t border-neutral-100 flex items-center justify-between gap-1 text-[10px]">
                  {/* Primary / Set Primary */}
                  {!isPrimary ? (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(i)}
                      className="px-2 py-1 rounded-md bg-white hover:bg-gold-50 border border-neutral-200 text-neutral-700 hover:text-brand-950 font-bold flex items-center gap-1 transition-colors"
                      title="Set as primary image"
                    >
                      <Star className="w-2.5 h-2.5" />
                      <span>Primary</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-neutral-400 font-semibold px-1">
                      Main Frame
                    </span>
                  )}

                  <div className="flex items-center gap-1 ml-auto">
                    {/* Reorder Left */}
                    <button
                      type="button"
                      disabled={i === 0}
                      onClick={() => handleMove(i, 'left')}
                      className="p-1 rounded bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move earlier in order"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>

                    {/* Reorder Right */}
                    <button
                      type="button"
                      disabled={i === images.length - 1}
                      onClick={() => handleMove(i, 'right')}
                      className="p-1 rounded bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move later in order"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {/* Replace */}
                    <button
                      type="button"
                      onClick={() => triggerReplace(i)}
                      className="p-1 rounded bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-950"
                      title="Replace this image"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="p-1 rounded bg-white hover:bg-rose-50 border border-neutral-200 text-rose-600 hover:text-rose-700"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="text-center py-8 border-2 border-dashed border-neutral-300 rounded-2xl bg-white/60 hover:bg-white hover:border-gold-500 cursor-pointer transition-colors"
        >
          <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-neutral-700">No product photographs uploaded yet</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Click here to select images from your phone or computer</p>
        </div>
      )}
    </div>
  );
};
