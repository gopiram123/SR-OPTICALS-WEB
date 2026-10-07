/**
 * SR OPTICALS — In-Browser Image Compression & Base64 Converter Service
 * 
 * Replaces Firebase Cloud Storage (which requires Blaze billing plan)
 * with client-side browser compression and Base64 conversion stored directly in Firestore.
 * 
 * Features:
 * - Accepts JPG, JPEG, PNG, WEBP
 * - Smart aspect-ratio preserving downscaling (max dimension 800px-1000px)
 * - Clean white background fill for transparent frame cutouts (preventing dark borders in JPEG)
 * - Adaptive multi-pass compression keeping images under 75 KB (well below Firestore 1 MiB limit)
 * - Async progress reporting matching existing upload UI/progress bar
 * - Zero external dependencies; uses native HTML5 Canvas
 */

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// Maximum allowed initial file size from camera / device (10 MB)
const MAX_INITIAL_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// Target compressed size in bytes (approx 75 KB binary = ~100 KB Base64 string)
const TARGET_COMPRESSED_BYTES = 75 * 1024;

// Hard ceiling per compressed image to strictly protect Firestore 1 MiB document limit
const HARD_CEILING_COMPRESSED_BYTES = 120 * 1024;

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Validates an image file before processing.
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const fileType = file.type ? file.type.toLowerCase() : '';
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  const isTypeValid = ALLOWED_MIME_TYPES.includes(fileType) || ['jpg', 'jpeg', 'png', 'webp'].includes(extension);

  if (!isTypeValid) {
    return {
      valid: false,
      error: 'Invalid file format. Please choose a JPG, PNG, or WEBP image.'
    };
  }

  if (file.size > MAX_INITIAL_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'File size exceeds 10 MB. Please select an image under 10 MB.'
    };
  }

  return { valid: true };
};

/**
 * Loads a File into an HTMLImageElement using an object URL.
 */
const loadImageElement = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to read image file from your device.'));
    };

    img.src = objectUrl;
  });
};

/**
 * Draws image onto a new canvas scaled to targetMaxDim.
 * Fills white background for frame photos so transparent cutouts don't render black in JPEG.
 */
const renderToCanvas = (
  img: HTMLImageElement,
  targetMaxDim: number,
  preserveAlpha: boolean
): HTMLCanvasElement => {
  let width = img.naturalWidth || img.width || 1;
  let height = img.naturalHeight || img.height || 1;

  if (width > targetMaxDim || height > targetMaxDim) {
    if (width > height) {
      height = Math.round((height * targetMaxDim) / width);
      width = targetMaxDim;
    } else {
      width = Math.round((width * targetMaxDim) / height);
      height = targetMaxDim;
    }
  }

  width = Math.max(1, width);
  height = Math.max(1, height);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context not available.');
  }

  if (preserveAlpha) {
    ctx.clearRect(0, 0, width, height);
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
};

/**
 * Estimates binary byte size from a Base64 data URL.
 */
const estimateByteSize = (dataUrl: string): number => {
  const base64Index = dataUrl.indexOf(',');
  const base64Data = base64Index > -1 ? dataUrl.slice(base64Index + 1) : dataUrl;
  return Math.round((base64Data.length * 3) / 4);
};

/**
 * Compresses an image in the browser and returns a compact Base64 Data URL
 * suitable for direct persistence in Cloud Firestore.
 */
export const uploadFileToStorage = async (
  file: File,
  folder: 'products' | 'categories' | 'homepage' | 'store' | 'brand' = 'products',
  onProgress?: (progressPercent: number) => void
): Promise<string> => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  onProgress?.(15);

  const img = await loadImageElement(file);
  onProgress?.(40);

  // Set maximum dimensions per section
  let maxDimension = 800;
  if (folder === 'brand') {
    maxDimension = 400;
  } else if (folder === 'homepage') {
    maxDimension = 1000;
  } else if (folder === 'store') {
    maxDimension = 900;
  } else {
    // products and categories
    maxDimension = 800;
  }

  const isBrand = folder === 'brand';
  const isPngOrWebp = file.type === 'image/png' || file.type === 'image/webp';
  const shouldPreserveAlpha = isBrand && isPngOrWebp;

  let currentCanvas = renderToCanvas(img, maxDimension, shouldPreserveAlpha);
  onProgress?.(65);

  let quality = 0.78;
  let mimeType = shouldPreserveAlpha ? 'image/webp' : 'image/jpeg';
  let dataUrl = currentCanvas.toDataURL(mimeType, quality);

  // If browser doesn't support WebP export and output is large, fallback to JPEG with white background
  if (shouldPreserveAlpha && !dataUrl.startsWith('data:image/webp') && estimateByteSize(dataUrl) > TARGET_COMPRESSED_BYTES) {
    currentCanvas = renderToCanvas(img, maxDimension, false);
    mimeType = 'image/jpeg';
    dataUrl = currentCanvas.toDataURL(mimeType, quality);
  }

  const targetBytes = folder === 'products'
    ? 40 * 1024
    : folder === 'brand'
    ? 30 * 1024
    : folder === 'homepage'
    ? 75 * 1024
    : 55 * 1024; // categories and store photos

  const hardCeilingBytes = folder === 'products'
    ? 65 * 1024
    : folder === 'brand'
    ? 50 * 1024
    : folder === 'homepage'
    ? 110 * 1024
    : 85 * 1024; // categories and store photos

  // Pass 1: Adaptive quality reduction
  while (estimateByteSize(dataUrl) > targetBytes && quality > 0.45) {
    quality -= 0.08;
    dataUrl = currentCanvas.toDataURL(mimeType, quality);
  }

  // Pass 2: If still above target, scale down canvas dimensions
  if (estimateByteSize(dataUrl) > targetBytes) {
    const downscaledDim = Math.round(maxDimension * 0.75);
    currentCanvas = renderToCanvas(img, downscaledDim, shouldPreserveAlpha);
    quality = 0.70;
    dataUrl = currentCanvas.toDataURL(mimeType, quality);

    while (estimateByteSize(dataUrl) > targetBytes && quality > 0.40) {
      quality -= 0.08;
      dataUrl = currentCanvas.toDataURL(mimeType, quality);
    }
  }

  onProgress?.(90);

  // Hard safety check to prevent exceeding Firestore's 1 MiB limit
  const finalSize = estimateByteSize(dataUrl);
  if (finalSize > hardCeilingBytes) {
    throw new Error(
      `Image is too large (${Math.round(finalSize / 1024)} KB) even after compression. Please select a simpler image or lower resolution file.`
    );
  }

  onProgress?.(100);
  return dataUrl;
};

/**
 * Handles removal of image reference.
 * Since images are embedded directly as Base64 in Firestore documents,
 * no external cloud deletion call is required.
 */
export const deleteFileFromStorage = async (_fileUrl: string): Promise<void> => {
  // Direct Base64 images are removed automatically when the Firestore document is updated or deleted.
  return Promise.resolve();
};
