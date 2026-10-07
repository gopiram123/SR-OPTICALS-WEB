import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  writeBatch
} from 'firebase/firestore';
import { auth, db } from './firebase';
import {
  Product,
  Category,
  ShopInfo,
  HomepageConfig,
  Review,
  StorePhoto,
  StoreSettings
} from '../types';

/**
 * Recursively strips undefined fields and normalizes NaN/infinite numbers to safe values
 * so Cloud Firestore never rejects payloads with 'Unsupported field value: undefined'.
 */
function cleanFirestoreData<T extends Record<string, any>>(obj: T): T {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (typeof value === 'number') {
        result[key] = Number.isFinite(value) ? value : 0;
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = cleanFirestoreData(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
import {
  initialProducts,
  initialCategories,
  initialShopInfo,
  initialHomepageConfig,
  initialReviews,
  initialStorePhotos
} from './mockData';

// Event for notifying components of live data updates
export const DATA_CHANGED_EVENT = 'sropticals_data_updated';

export const notifyDataChanged = (dataType: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_CHANGED_EVENT, { detail: { dataType } }));
  }
};

// =================== PRODUCTS (Collection: "products") ===================

export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, 'products'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    const items: Product[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const images: string[] = Array.isArray(data.images)
        ? data.images
        : data.primaryImage
        ? [data.primaryImage]
        : [];
      const primaryImage: string = data.primaryImage || images[0] || '';
      const isNewArrival: boolean = Boolean(data.isNewArrival ?? data.isNew ?? false);

      return {
        id: docSnap.id,
        name: data.name || '',
        price: Number(data.price) || 0,
        category: data.category || 'Men',
        gender: data.gender || 'Unisex',
        style: data.style || 'Classic',
        description: data.description || '',
        frameType: data.frameType || 'Full Rim',
        frameShape: data.frameShape || '',
        material: data.material || 'Acetate',
        colour: data.colour || '',
        dimensions: data.dimensions || '',
        sku: data.sku || '',
        availability: data.availability || 'In Stock',
        primaryImage,
        images,
        isNewArrival,
        isFeatured: Boolean(data.isFeatured ?? false),
        isTrending: Boolean(data.isTrending ?? false),
        newArrivalOrder: Number(data.newArrivalOrder ?? 0),
        trendingOrder: Number(data.trendingOrder ?? 0),
        featuredOrder: Number(data.featuredOrder ?? 0),
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        // Backward compatibility
        isNew: isNewArrival
      };
    });

    return items;
  } catch (err) {
    console.error('Firestore getProducts error:', err);
    throw err;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, 'products', id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return null;
    }

    const data = snap.data();
    const images: string[] = Array.isArray(data.images)
      ? data.images
      : data.primaryImage
      ? [data.primaryImage]
      : [];
    const primaryImage: string = data.primaryImage || images[0] || '';
    const isNewArrival: boolean = Boolean(data.isNewArrival ?? data.isNew ?? false);

    return {
      id: snap.id,
      name: data.name || '',
      price: Number(data.price) || 0,
      category: data.category || 'Men',
      gender: data.gender || 'Unisex',
      style: data.style || 'Classic',
      description: data.description || '',
      frameType: data.frameType || 'Full Rim',
      frameShape: data.frameShape || '',
      material: data.material || 'Acetate',
      colour: data.colour || '',
      dimensions: data.dimensions || '',
      sku: data.sku || '',
      availability: data.availability || 'In Stock',
      primaryImage,
      images,
      isNewArrival,
      isFeatured: Boolean(data.isFeatured ?? false),
      isTrending: Boolean(data.isTrending ?? false),
      newArrivalOrder: Number(data.newArrivalOrder ?? 0),
      trendingOrder: Number(data.trendingOrder ?? 0),
      featuredOrder: Number(data.featuredOrder ?? 0),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isNew: isNewArrival
    };
  } catch (err) {
    console.error('Firestore getProductById error:', err);
    throw err;
  }
};

export const createProduct = async (
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> => {
  try {
    const images = productData.images || [];
    const primaryImage = images[0] || productData.primaryImage || '';
    const isNewArrival = Boolean(productData.isNewArrival ?? productData.isNew ?? false);
    const now = new Date().toISOString();

    const canonicalDoc = cleanFirestoreData({
      name: productData.name.trim(),
      price: Number(productData.price) || 0,
      category: productData.category,
      gender: productData.gender,
      style: productData.style,
      description: productData.description || '',
      frameType: productData.frameType || 'Full Rim',
      frameShape: productData.frameShape || '',
      material: productData.material || 'Acetate',
      colour: productData.colour || '',
      dimensions: productData.dimensions || '',
      sku: productData.sku || '',
      availability: productData.availability || 'In Stock',
      primaryImage,
      images,
      isNewArrival,
      isFeatured: Boolean(productData.isFeatured ?? false),
      isTrending: Boolean(productData.isTrending ?? false),
      newArrivalOrder: Number.isFinite(Number(productData.newArrivalOrder)) ? Number(productData.newArrivalOrder) : 0,
      trendingOrder: Number.isFinite(Number(productData.trendingOrder)) ? Number(productData.trendingOrder) : 0,
      featuredOrder: Number.isFinite(Number(productData.featuredOrder)) ? Number(productData.featuredOrder) : 0,
      createdAt: now,
      updatedAt: now
    });

    console.log('[Firestore createProduct] Saving product document:', {
      name: canonicalDoc.name,
      price: canonicalDoc.price,
      imagesCount: canonicalDoc.images.length,
      currentUser: auth.currentUser?.email || 'UNAUTHENTICATED'
    });

    const docRef = await addDoc(collection(db, 'products'), canonicalDoc);
    notifyDataChanged('products');

    return {
      id: docRef.id,
      ...canonicalDoc,
      isNew: isNewArrival
    };
  } catch (err: any) {
    console.error('Firestore createProduct error:', {
      code: err?.code,
      message: err?.message,
      currentUser: auth.currentUser?.email || 'UNAUTHENTICATED',
      error: err
    });
    let userMsg = err?.message || 'Failed to save product.';
    if (err?.code === 'permission-denied') {
      userMsg = `Permission Denied: Firebase rejected the write. (User: ${auth.currentUser?.email || 'Not logged in'}). Please ensure you are signed into the Admin Panel and that your Firestore Security Rules in Firebase Console allow authenticated writes (allow write: if request.auth != null;).`;
    }
    const enhanced = new Error(userMsg);
    (enhanced as any).code = err?.code;
    throw enhanced;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  try {
    const docRef = doc(db, 'products', id);
    const now = new Date().toISOString();

    const canonicalUpdates: Record<string, any> = {
      updatedAt: now
    };

    if (updates.name !== undefined) canonicalUpdates.name = updates.name.trim();
    if (updates.price !== undefined) canonicalUpdates.price = Number(updates.price);
    if (updates.category !== undefined) canonicalUpdates.category = updates.category;
    if (updates.gender !== undefined) canonicalUpdates.gender = updates.gender;
    if (updates.style !== undefined) canonicalUpdates.style = updates.style;
    if (updates.description !== undefined) canonicalUpdates.description = updates.description;
    if (updates.frameType !== undefined) canonicalUpdates.frameType = updates.frameType;
    if (updates.frameShape !== undefined) canonicalUpdates.frameShape = updates.frameShape;
    if (updates.material !== undefined) canonicalUpdates.material = updates.material;
    if (updates.colour !== undefined) canonicalUpdates.colour = updates.colour;
    if (updates.dimensions !== undefined) canonicalUpdates.dimensions = updates.dimensions;
    if (updates.sku !== undefined) canonicalUpdates.sku = updates.sku;
    if (updates.availability !== undefined) canonicalUpdates.availability = updates.availability;
    if (updates.images !== undefined) {
      canonicalUpdates.images = updates.images;
      canonicalUpdates.primaryImage = updates.images[0] || '';
    } else if (updates.primaryImage !== undefined) {
      canonicalUpdates.primaryImage = updates.primaryImage;
    }
    if (updates.isNewArrival !== undefined || updates.isNew !== undefined) {
      canonicalUpdates.isNewArrival = Boolean(updates.isNewArrival ?? updates.isNew);
    }
    if (updates.isFeatured !== undefined) canonicalUpdates.isFeatured = Boolean(updates.isFeatured);
    if (updates.isTrending !== undefined) canonicalUpdates.isTrending = Boolean(updates.isTrending);
    if (updates.newArrivalOrder !== undefined) {
      canonicalUpdates.newArrivalOrder = Number.isFinite(Number(updates.newArrivalOrder)) ? Number(updates.newArrivalOrder) : 0;
    }
    if (updates.trendingOrder !== undefined) {
      canonicalUpdates.trendingOrder = Number.isFinite(Number(updates.trendingOrder)) ? Number(updates.trendingOrder) : 0;
    }
    if (updates.featuredOrder !== undefined) {
      canonicalUpdates.featuredOrder = Number.isFinite(Number(updates.featuredOrder)) ? Number(updates.featuredOrder) : 0;
    }

    const cleanedUpdates = cleanFirestoreData(canonicalUpdates);
    await updateDoc(docRef, cleanedUpdates);
    notifyDataChanged('products');

    const updated = await getProductById(id);
    if (!updated) throw new Error('Product updated but could not be fetched');
    return updated;
  } catch (err: any) {
    console.error('Firestore updateProduct error:', {
      code: err?.code,
      message: err?.message,
      currentUser: auth.currentUser?.email || 'UNAUTHENTICATED',
      error: err
    });
    let userMsg = err?.message || 'Failed to update product.';
    if (err?.code === 'permission-denied') {
      userMsg = `Permission Denied: Firebase rejected the write. (User: ${auth.currentUser?.email || 'Not logged in'}). Please ensure you are signed into the Admin Panel and that your Firestore Security Rules in Firebase Console allow authenticated writes (allow write: if request.auth != null;).`;
    }
    const enhanced = new Error(userMsg);
    (enhanced as any).code = err?.code;
    throw enhanced;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
    notifyDataChanged('products');
  } catch (err) {
    console.error('Firestore deleteProduct error:', err);
    throw err;
  }
};

// =================== CATEGORIES (Collection: "categories") ===================

export const getCategories = async (): Promise<Category[]> => {
  try {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const image = data.image || data.imageUrl || '';
      const visible = Boolean(data.visible ?? data.isVisible ?? true);

      return {
        id: docSnap.id,
        name: data.name || '',
        slug: data.slug || data.name?.toLowerCase().replace(/\s+/g, '-'),
        description: data.description || '',
        image,
        visible,
        order: Number(data.order ?? 1),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        // Backward compatibility
        imageUrl: image,
        isVisible: visible
      };
    });
  } catch (err) {
    console.error('Firestore getCategories error:', err);
    throw err;
  }
};

export const createCategory = async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
  try {
    const now = new Date().toISOString();
    const image = categoryData.image || categoryData.imageUrl || '';
    const visible = Boolean(categoryData.visible ?? categoryData.isVisible ?? true);

    const canonicalDoc = cleanFirestoreData({
      name: categoryData.name.trim(),
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      description: categoryData.description || '',
      image,
      visible,
      order: Number.isFinite(Number(categoryData.order)) ? Number(categoryData.order) : 1,
      createdAt: now,
      updatedAt: now
    });

    console.log('[Firestore createCategory] Saving category document:', {
      name: canonicalDoc.name,
      slug: canonicalDoc.slug,
      order: canonicalDoc.order,
      imageSize: canonicalDoc.image.length,
      currentUser: auth.currentUser?.email || 'UNAUTHENTICATED'
    });

    const docRef = await addDoc(collection(db, 'categories'), canonicalDoc);
    notifyDataChanged('categories');

    return {
      id: docRef.id,
      ...canonicalDoc,
      imageUrl: image,
      isVisible: visible
    };
  } catch (err: any) {
    console.error('Firestore createCategory error:', {
      code: err?.code,
      message: err?.message,
      currentUser: auth.currentUser?.email || 'UNAUTHENTICATED',
      error: err
    });
    let userMsg = err?.message || 'Failed to save category.';
    if (err?.code === 'permission-denied') {
      userMsg = `Permission Denied: Firebase rejected the write. (User: ${auth.currentUser?.email || 'Not logged in'}). Please ensure you are signed into the Admin Panel and that your Firestore Security Rules in Firebase Console allow authenticated writes (allow write: if request.auth != null;).`;
    }
    const enhanced = new Error(userMsg);
    (enhanced as any).code = err?.code;
    throw enhanced;
  }
};

export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category> => {
  try {
    const docRef = doc(db, 'categories', id);
    const canonicalUpdates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (updates.name !== undefined) canonicalUpdates.name = updates.name.trim();
    if (updates.slug !== undefined) canonicalUpdates.slug = updates.slug;
    if (updates.description !== undefined) canonicalUpdates.description = updates.description;
    if (updates.image !== undefined || updates.imageUrl !== undefined) {
      canonicalUpdates.image = updates.image || updates.imageUrl;
    }
    if (updates.visible !== undefined || updates.isVisible !== undefined) {
      canonicalUpdates.visible = Boolean(updates.visible ?? updates.isVisible);
    }
    if (updates.order !== undefined) {
      canonicalUpdates.order = Number.isFinite(Number(updates.order)) ? Number(updates.order) : 1;
    }

    const cleanedUpdates = cleanFirestoreData(canonicalUpdates);
    await updateDoc(docRef, cleanedUpdates);
    notifyDataChanged('categories');

    const snap = await getDoc(docRef);
    const data = snap.data() || {};
    const image = data.image || '';
    const visible = Boolean(data.visible ?? true);

    return {
      id: snap.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      image,
      visible,
      order: data.order,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      imageUrl: image,
      isVisible: visible
    };
  } catch (err: any) {
    console.error('Firestore updateCategory error:', {
      code: err?.code,
      message: err?.message,
      currentUser: auth.currentUser?.email || 'UNAUTHENTICATED',
      error: err
    });
    let userMsg = err?.message || 'Failed to update category.';
    if (err?.code === 'permission-denied') {
      userMsg = `Permission Denied: Firebase rejected the write. (User: ${auth.currentUser?.email || 'Not logged in'}). Please ensure you are signed into the Admin Panel and that your Firestore Security Rules in Firebase Console allow authenticated writes (allow write: if request.auth != null;).`;
    }
    const enhanced = new Error(userMsg);
    (enhanced as any).code = err?.code;
    throw enhanced;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'categories', id));
    notifyDataChanged('categories');
  } catch (err) {
    console.error('Firestore deleteCategory error:', err);
    throw err;
  }
};

// =================== SHOP INFORMATION (Collection: "shopInfo") ===================

export const getShopInfo = async (): Promise<ShopInfo> => {
  try {
    const docRef = doc(db, 'shopInfo', 'main');
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      // Fallback in memory if uninitialized (no automatic write)
      return initialShopInfo;
    }

    const data = snap.data();
    return {
      shopName: data.shopName || initialShopInfo.shopName,
      tagline: data.tagline || initialShopInfo.tagline,
      logo: data.logo || data.logoUrl || '',
      phone: data.phone || initialShopInfo.phone,
      whatsapp: data.whatsapp || initialShopInfo.whatsapp,
      email: data.email || initialShopInfo.email,
      address: data.address || initialShopInfo.address,
      mapsUrl: data.mapsUrl || initialShopInfo.mapsUrl,
      mapsEmbedUrl: data.mapsEmbedUrl || initialShopInfo.mapsEmbedUrl,
      openingHours: data.openingHours || initialShopInfo.openingHours,
      socialLinks: data.socialLinks || data.socials || initialShopInfo.socials,
      // Backward compatibility aliases
      logoUrl: data.logo || data.logoUrl || '',
      socials: data.socialLinks || data.socials || initialShopInfo.socials
    };
  } catch (err) {
    console.error('Firestore getShopInfo error:', err);
    return initialShopInfo;
  }
};

export const updateShopInfo = async (info: Partial<ShopInfo>): Promise<ShopInfo> => {
  try {
    const docRef = doc(db, 'shopInfo', 'main');
    const canonicalDoc = {
      shopName: info.shopName,
      tagline: info.tagline || '',
      logo: info.logo || info.logoUrl || '',
      phone: info.phone,
      whatsapp: info.whatsapp,
      email: info.email,
      address: info.address,
      mapsUrl: info.mapsUrl,
      mapsEmbedUrl: info.mapsEmbedUrl || '',
      openingHours: info.openingHours,
      socialLinks: info.socialLinks || info.socials || {},
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, canonicalDoc, { merge: true });
    notifyDataChanged('shopInfo');
    return getShopInfo();
  } catch (err) {
    console.error('Firestore updateShopInfo error:', err);
    throw err;
  }
};

// =================== HOMEPAGE CONFIG (Collection: "homepage") ===================

export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  try {
    const docRef = doc(db, 'homepage', 'config');
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return initialHomepageConfig;
    }

    const data = snap.data();
    return {
      hero: data.hero || initialHomepageConfig.hero,
      featuredProductId: data.featuredProductId || initialHomepageConfig.featuredProductId,
      trendingEyeglassesId: data.trendingEyeglassesId || initialHomepageConfig.trendingEyeglassesId,
      trendingSunglassesId: data.trendingSunglassesId || initialHomepageConfig.trendingSunglassesId,
      whyChooseUs: data.whyChooseUs || initialHomepageConfig.whyChooseUs,
      aboutSnippet: data.aboutSnippet || initialHomepageConfig.aboutSnippet,
      updatedAt: data.updatedAt
    };
  } catch (err) {
    console.error('Firestore getHomepageConfig error:', err);
    return initialHomepageConfig;
  }
};

export const updateHomepageConfig = async (
  config: Partial<HomepageConfig>
): Promise<HomepageConfig> => {
  try {
    const docRef = doc(db, 'homepage', 'config');
    const payload = {
      ...config,
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, payload, { merge: true });
    notifyDataChanged('homepage');
    return getHomepageConfig();
  } catch (err) {
    console.error('Firestore updateHomepageConfig error:', err);
    throw err;
  }
};

// =================== REVIEWS (Collection: "reviews") ===================

export const getReviews = async (onlyVisible = false): Promise<Review[]> => {
  try {
    let q = query(collection(db, 'reviews'));
    if (onlyVisible) {
      q = query(collection(db, 'reviews'), where('visible', '==', true));
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) return [];

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const reviewText = data.reviewText || data.comment || '';
      const visible = Boolean(data.visible ?? data.isVisible ?? true);

      return {
        id: docSnap.id,
        customerName: data.customerName || 'Verified Guest',
        reviewText,
        rating: Number(data.rating) || 5,
        visible,
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || '',
        // Backward compatibility
        comment: reviewText,
        date: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Recent',
        isVisible: visible
      };
    });
  } catch (err) {
    console.error('Firestore getReviews error:', err);
    throw err;
  }
};

export const createReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  try {
    const now = new Date().toISOString();
    const reviewText = review.reviewText || review.comment || '';
    const visible = Boolean(review.visible ?? review.isVisible ?? true);

    const canonicalDoc = {
      customerName: review.customerName.trim(),
      reviewText,
      rating: Number(review.rating) || 5,
      visible,
      createdAt: now,
      updatedAt: now
    };

    const docRef = await addDoc(collection(db, 'reviews'), canonicalDoc);
    notifyDataChanged('reviews');

    return {
      id: docRef.id,
      ...canonicalDoc,
      comment: reviewText,
      isVisible: visible
    };
  } catch (err) {
    console.error('Firestore createReview error:', err);
    throw err;
  }
};

export const updateReview = async (id: string, updates: Partial<Review>): Promise<Review> => {
  try {
    const docRef = doc(db, 'reviews', id);
    const canonicalUpdates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (updates.customerName !== undefined) canonicalUpdates.customerName = updates.customerName.trim();
    if (updates.reviewText !== undefined || updates.comment !== undefined) {
      canonicalUpdates.reviewText = updates.reviewText || updates.comment;
    }
    if (updates.rating !== undefined) canonicalUpdates.rating = Number(updates.rating);
    if (updates.visible !== undefined || updates.isVisible !== undefined) {
      canonicalUpdates.visible = Boolean(updates.visible ?? updates.isVisible);
    }

    await updateDoc(docRef, canonicalUpdates);
    notifyDataChanged('reviews');

    const snap = await getDoc(docRef);
    const data = snap.data() || {};
    const reviewText = data.reviewText || '';
    const visible = Boolean(data.visible ?? true);

    return {
      id: snap.id,
      customerName: data.customerName,
      reviewText,
      rating: data.rating,
      visible,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      comment: reviewText,
      isVisible: visible
    };
  } catch (err) {
    console.error('Firestore updateReview error:', err);
    throw err;
  }
};

export const deleteReview = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'reviews', id));
    notifyDataChanged('reviews');
  } catch (err) {
    console.error('Firestore deleteReview error:', err);
    throw err;
  }
};

// =================== STORE PHOTOS (Collection: "storePhotos") ===================

export const getStorePhotos = async (): Promise<StorePhoto[]> => {
  try {
    const q = query(collection(db, 'storePhotos'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return [];

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const image = data.image || data.url || '';
      const visible = Boolean(data.visible ?? data.isVisible ?? true);

      return {
        id: docSnap.id,
        image,
        title: data.title || data.caption || 'Showroom Display',
        description: data.description || '',
        visible,
        order: Number(data.order ?? 1),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        // Backward compatibility
        url: image,
        caption: data.title || data.caption || 'Showroom Display',
        isVisible: visible
      };
    });
  } catch (err) {
    console.error('Firestore getStorePhotos error:', err);
    throw err;
  }
};

export const addStorePhoto = async (photo: Omit<StorePhoto, 'id'>): Promise<StorePhoto> => {
  try {
    const now = new Date().toISOString();
    const image = photo.image || photo.url || '';
    const visible = Boolean(photo.visible ?? photo.isVisible ?? true);

    const canonicalDoc = {
      image,
      title: photo.title || photo.caption || 'Showroom Display',
      description: photo.description || '',
      visible,
      order: Number(photo.order ?? 1),
      createdAt: now,
      updatedAt: now
    };

    const docRef = await addDoc(collection(db, 'storePhotos'), canonicalDoc);
    notifyDataChanged('storePhotos');

    return {
      id: docRef.id,
      ...canonicalDoc,
      url: image,
      caption: canonicalDoc.title,
      isVisible: visible
    };
  } catch (err) {
    console.error('Firestore addStorePhoto error:', err);
    throw err;
  }
};

export const updateStorePhoto = async (id: string, updates: Partial<StorePhoto>): Promise<StorePhoto> => {
  try {
    const docRef = doc(db, 'storePhotos', id);
    const canonicalUpdates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (updates.image !== undefined || updates.url !== undefined) {
      canonicalUpdates.image = updates.image || updates.url;
    }
    if (updates.title !== undefined || updates.caption !== undefined) {
      canonicalUpdates.title = updates.title || updates.caption;
    }
    if (updates.description !== undefined) canonicalUpdates.description = updates.description;
    if (updates.visible !== undefined || updates.isVisible !== undefined) {
      canonicalUpdates.visible = Boolean(updates.visible ?? updates.isVisible);
    }
    if (updates.order !== undefined) canonicalUpdates.order = Number(updates.order);

    await updateDoc(docRef, canonicalUpdates);
    notifyDataChanged('storePhotos');

    const snap = await getDoc(docRef);
    const data = snap.data() || {};
    const image = data.image || '';
    const visible = Boolean(data.visible ?? true);

    return {
      id: snap.id,
      image,
      title: data.title || '',
      description: data.description || '',
      visible,
      order: data.order || 1,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      url: image,
      caption: data.title || '',
      isVisible: visible
    };
  } catch (err) {
    console.error('Firestore updateStorePhoto error:', err);
    throw err;
  }
};

export const deleteStorePhoto = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'storePhotos', id));
    notifyDataChanged('storePhotos');
  } catch (err) {
    console.error('Firestore deleteStorePhoto error:', err);
    throw err;
  }
};

// =================== SETTINGS (Collection: "settings") ===================

export const getSettings = async (): Promise<StoreSettings> => {
  try {
    const docRef = doc(db, 'settings', 'general');
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      return {
        announcement: 'Welcome to SR OPTICALS — Handcrafted Luxury Eyewear & Precision Optical Care',
        announcementVisible: true,
        currency: '₹',
        maintenanceMode: false
      };
    }
    return snap.data() as StoreSettings;
  } catch (err) {
    console.error('Firestore getSettings error:', err);
    return {};
  }
};

export const updateSettings = async (settings: Partial<StoreSettings>): Promise<StoreSettings> => {
  try {
    const docRef = doc(db, 'settings', 'general');
    const payload = {
      ...settings,
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
    notifyDataChanged('settings');
    return getSettings();
  } catch (err) {
    console.error('Firestore updateSettings error:', err);
    throw err;
  }
};

// =================== EXPLICIT ONE-TIME DATABASE SEEDING ===================
// NOTE: This is NEVER called automatically during production reads.
// It is triggered strictly as an explicit action by the authenticated administrator.

export const seedStoreCatalog = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const batch = writeBatch(db);
    const now = new Date().toISOString();

    // 1. Seed Shop Info
    const shopInfoRef = doc(db, 'shopInfo', 'main');
    batch.set(shopInfoRef, {
      ...initialShopInfo,
      createdAt: now,
      updatedAt: now
    });

    // 2. Seed Homepage Config
    const homepageRef = doc(db, 'homepage', 'config');
    batch.set(homepageRef, {
      ...initialHomepageConfig,
      createdAt: now,
      updatedAt: now
    });

    // 3. Seed Settings
    const settingsRef = doc(db, 'settings', 'general');
    batch.set(settingsRef, {
      announcement: 'Complimentary Precision Optical Consultations Available Daily',
      announcementVisible: true,
      currency: '₹',
      maintenanceMode: false,
      updatedAt: now
    });

    // 4. Seed Categories
    for (const cat of initialCategories) {
      const catRef = doc(db, 'categories', cat.id);
      batch.set(catRef, {
        name: cat.name,
        slug: cat.slug,
        description: cat.description || '',
        image: cat.imageUrl,
        visible: cat.isVisible,
        order: cat.order,
        createdAt: now,
        updatedAt: now
      });
    }

    // 5. Seed Starter Products
    for (const prod of initialProducts) {
      const prodRef = doc(db, 'products', prod.id);
      batch.set(prodRef, {
        name: prod.name,
        price: prod.price,
        category: prod.category,
        gender: prod.gender,
        style: prod.style,
        description: prod.description,
        frameType: prod.frameType,
        frameShape: 'Classic',
        material: prod.material,
        colour: prod.colour,
        dimensions: prod.dimensions || '52-18-140',
        sku: prod.sku || '',
        availability: prod.availability,
        primaryImage: prod.images[0] || '',
        images: prod.images,
        isNewArrival: prod.isNew,
        isFeatured: prod.isFeatured,
        isTrending: prod.isTrending,
        newArrivalOrder: 0,
        trendingOrder: 0,
        featuredOrder: 0,
        createdAt: now,
        updatedAt: now
      });
    }

    // 6. Seed Reviews
    for (const rev of initialReviews) {
      const revRef = doc(db, 'reviews', rev.id);
      batch.set(revRef, {
        customerName: rev.customerName,
        reviewText: rev.comment,
        rating: rev.rating,
        visible: rev.isVisible,
        createdAt: now,
        updatedAt: now
      });
    }

    // 7. Seed Store Photos
    for (const photo of initialStorePhotos) {
      const photoRef = doc(db, 'storePhotos', photo.id);
      batch.set(photoRef, {
        image: photo.url,
        title: photo.caption || 'Showroom Display',
        description: '',
        visible: true,
        order: photo.order,
        createdAt: now,
        updatedAt: now
      });
    }

    await batch.commit();
    notifyDataChanged('all');

    return {
      success: true,
      message: 'Firestore store catalog seeded successfully with starter frames and content.'
    };
  } catch (err: any) {
    console.error('Firestore seeding failed:', err);
    throw new Error(`Seeding failed: ${err?.message || err}`);
  }
};

export const resetToFactorySeed = seedStoreCatalog;
