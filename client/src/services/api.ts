import { Product, Category, ShopInfo, HomepageConfig, Review, StorePhoto } from '../types';
import {
  initialProducts,
  initialCategories,
  initialShopInfo,
  initialHomepageConfig,
  initialReviews,
  initialStorePhotos
} from './mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'sropticals_products_v1',
  CATEGORIES: 'sropticals_categories_v1',
  SHOP_INFO: 'sropticals_shop_info_v1',
  HOMEPAGE: 'sropticals_homepage_v1',
  REVIEWS: 'sropticals_reviews_v1',
  STORE_PHOTOS: 'sropticals_store_photos_v1',
};

// Event for notifying components of data changes
export const DATA_CHANGED_EVENT = 'sropticals_data_updated';

const notifyDataChanged = (dataType: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_CHANGED_EVENT, { detail: { dataType } }));
  }
};

const getLocal = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const setLocal = <T>(key: string, data: T, dataType: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    notifyDataChanged(dataType);
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// =================== PRODUCTS API ===================
export const getProducts = async (): Promise<Product[]> => {
  return getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, initialProducts);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const products = await getProducts();
  const newProduct: Product = {
    ...productData,
    id: 'prod-' + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const updated = [newProduct, ...products];
  setLocal(STORAGE_KEYS.PRODUCTS, updated, 'products');
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Product not found');

  const updatedProduct: Product = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  products[index] = updatedProduct;
  setLocal(STORAGE_KEYS.PRODUCTS, products, 'products');
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  setLocal(STORAGE_KEYS.PRODUCTS, filtered, 'products');
};

// =================== CATEGORIES API ===================
export const getCategories = async (): Promise<Category[]> => {
  const list = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  return list.sort((a, b) => a.order - b.order);
};

export const createCategory = async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
  const categories = await getCategories();
  const newCat: Category = {
    ...categoryData,
    id: 'cat-' + Date.now(),
  };
  const updated = [...categories, newCat];
  setLocal(STORAGE_KEYS.CATEGORIES, updated, 'categories');
  return newCat;
};

export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category> => {
  const categories = await getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Category not found');

  categories[index] = { ...categories[index], ...updates };
  setLocal(STORAGE_KEYS.CATEGORIES, categories, 'categories');
  return categories[index];
};

export const deleteCategory = async (id: string): Promise<void> => {
  const categories = await getCategories();
  const filtered = categories.filter(c => c.id !== id);
  setLocal(STORAGE_KEYS.CATEGORIES, filtered, 'categories');
};

// =================== SHOP INFO API ===================
export const getShopInfo = async (): Promise<ShopInfo> => {
  return getLocal<ShopInfo>(STORAGE_KEYS.SHOP_INFO, initialShopInfo);
};

export const updateShopInfo = async (info: Partial<ShopInfo>): Promise<ShopInfo> => {
  const current = await getShopInfo();
  const updated = { ...current, ...info };
  setLocal(STORAGE_KEYS.SHOP_INFO, updated, 'shopInfo');
  return updated;
};

// =================== HOMEPAGE CONFIG API ===================
export const getHomepageConfig = async (): Promise<HomepageConfig> => {
  return getLocal<HomepageConfig>(STORAGE_KEYS.HOMEPAGE, initialHomepageConfig);
};

export const updateHomepageConfig = async (config: Partial<HomepageConfig>): Promise<HomepageConfig> => {
  const current = await getHomepageConfig();
  const updated = { ...current, ...config };
  setLocal(STORAGE_KEYS.HOMEPAGE, updated, 'homepage');
  return updated;
};

// =================== REVIEWS API ===================
export const getReviews = async (onlyVisible = false): Promise<Review[]> => {
  const reviews = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
  return onlyVisible ? reviews.filter(r => r.isVisible) : reviews;
};

export const createReview = async (review: Omit<Review, 'id'>): Promise<Review> => {
  const reviews = await getReviews(false);
  const newReview: Review = {
    ...review,
    id: 'rev-' + Date.now()
  };
  const updated = [newReview, ...reviews];
  setLocal(STORAGE_KEYS.REVIEWS, updated, 'reviews');
  return newReview;
};

export const updateReview = async (id: string, updates: Partial<Review>): Promise<Review> => {
  const reviews = await getReviews(false);
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Review not found');

  reviews[index] = { ...reviews[index], ...updates };
  setLocal(STORAGE_KEYS.REVIEWS, reviews, 'reviews');
  return reviews[index];
};

export const deleteReview = async (id: string): Promise<void> => {
  const reviews = await getReviews(false);
  const filtered = reviews.filter(r => r.id !== id);
  setLocal(STORAGE_KEYS.REVIEWS, filtered, 'reviews');
};

// =================== STORE PHOTOS API ===================
export const getStorePhotos = async (): Promise<StorePhoto[]> => {
  const photos = getLocal<StorePhoto[]>(STORAGE_KEYS.STORE_PHOTOS, initialStorePhotos);
  return photos.sort((a, b) => a.order - b.order);
};

export const addStorePhoto = async (photo: Omit<StorePhoto, 'id'>): Promise<StorePhoto> => {
  const photos = await getStorePhotos();
  const newPhoto: StorePhoto = {
    ...photo,
    id: 'photo-' + Date.now()
  };
  const updated = [...photos, newPhoto];
  setLocal(STORAGE_KEYS.STORE_PHOTOS, updated, 'storePhotos');
  return newPhoto;
};

export const deleteStorePhoto = async (id: string): Promise<void> => {
  const photos = await getStorePhotos();
  const filtered = photos.filter(p => p.id !== id);
  setLocal(STORAGE_KEYS.STORE_PHOTOS, filtered, 'storePhotos');
};

// Reset to default factory seed data utility
export const resetToFactorySeed = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  localStorage.setItem(STORAGE_KEYS.SHOP_INFO, JSON.stringify(initialShopInfo));
  localStorage.setItem(STORAGE_KEYS.HOMEPAGE, JSON.stringify(initialHomepageConfig));
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialReviews));
  localStorage.setItem(STORAGE_KEYS.STORE_PHOTOS, JSON.stringify(initialStorePhotos));
  notifyDataChanged('all');
};
