export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Children' | 'Lenses' | string;
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  style: 'Classic' | 'Modern' | 'Premium' | 'Everyday' | string;
  description: string;
  frameType: 'Full Rim' | 'Half Rim' | 'Rimless';
  frameShape?: string; // e.g. "Square", "Round", "Cat-Eye", "Aviator", "Geometric"
  material: 'Acetate' | 'Titanium' | 'Metal' | 'TR90' | 'Mixed';
  colour: string;
  dimensions?: string; // e.g. "53-18-145"
  sku?: string;
  availability: 'In Stock' | 'Made to Order' | 'Out of Stock';
  primaryImage?: string;
  images: string[];
  isNewArrival?: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  newArrivalOrder?: number;
  trendingOrder?: number;
  featuredOrder?: number;
  createdAt?: string;
  updatedAt?: string;

  // Backward compatibility alias
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  visible?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;

  // Backward compatibility aliases
  imageUrl?: string;
  isVisible?: boolean;
}

export interface ShopInfo {
  shopName: string;
  tagline?: string;
  logo?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  mapsUrl: string;
  mapsEmbedUrl?: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    google?: string;
  };

  // Backward compatibility aliases
  logoUrl?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    google?: string;
  };
}

export interface HomepageConfig {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    imageUrl: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  featuredProductId: string;
  trendingEyeglassesId?: string;
  trendingSunglassesId?: string;
  whyChooseUs: {
    icon: string;
    title: string;
    description: string;
  }[];
  aboutSnippet: {
    heading: string;
    description: string;
    imageUrl: string;
  };
  updatedAt?: string;
}

export interface Review {
  id: string;
  customerName: string;
  reviewText?: string;
  rating: number; // 1 to 5
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;

  // Backward compatibility aliases
  comment?: string;
  date?: string;
  verified?: boolean;
  isVisible?: boolean;
}

export interface StorePhoto {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  visible?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;

  // Backward compatibility aliases
  url?: string;
  caption?: string;
  isVisible?: boolean;
}

export interface StoreSettings {
  announcement?: string;
  announcementVisible?: boolean;
  currency?: string;
  maintenanceMode?: boolean;
  updatedAt?: string;
}

export interface AdminRecord {
  uid: string;
  email: string;
  role: 'admin';
  createdAt?: string;
}
