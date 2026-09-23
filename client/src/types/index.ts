export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Men' | 'Women' | 'Children' | 'Lenses' | string;
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  style: 'Classic' | 'Modern' | 'Premium' | 'Everyday' | string;
  frameType: 'Full Rim' | 'Half Rim' | 'Rimless';
  material: 'Acetate' | 'Titanium' | 'Metal' | 'TR90' | 'Mixed';
  colour: string;
  availability: 'In Stock' | 'Made to Order' | 'Out of Stock';
  images: string[];
  isNew: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  sku?: string;
  dimensions?: string; // e.g. "53-18-145"
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl: string;
  order: number;
  isVisible: boolean;
}

export interface ShopInfo {
  shopName: string;
  tagline?: string;
  logoUrl?: string;
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
  mapsEmbedUrl: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
  socials: {
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
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verified?: boolean;
  isVisible: boolean;
}

export interface StorePhoto {
  id: string;
  url: string;
  caption?: string;
  order: number;
}
