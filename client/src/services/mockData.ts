import { Product, Category, ShopInfo, HomepageConfig, Review, StorePhoto } from '../types';

export const initialShopInfo: ShopInfo = {
  shopName: "SR OPTICALS",
  tagline: "Precision Optics & Handcrafted Luxury Frames",
  logoUrl: "",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "contact@sropticals.example.com",
  address: {
    line1: "Shop #14, Ground Floor, Elite Heritage Plaza",
    line2: "Opposite City Central Park, Main High Street",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
  },
  mapsUrl: "https://maps.google.com/?q=SR+OPTICALS+Bangalore",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9855364121516!2d77.59253457597148!3d12.972778987342627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167909090909%3A0x0!2sSR%20OPTICALS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  openingHours: [
    { days: "Monday – Saturday", hours: "10:00 AM – 09:00 PM" },
    { days: "Sunday", hours: "11:00 AM – 07:00 PM" }
  ],
  socials: {
    instagram: "https://instagram.com/sropticals",
    facebook: "https://facebook.com/sropticals",
    google: "https://g.page/sropticals"
  }
};

export const initialCategories: Category[] = [
  {
    id: "cat-men",
    name: "Men",
    slug: "men",
    description: "Sophisticated titanium, acetate, and bold architectural frames engineered for discerning men.",
    imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    order: 1,
    isVisible: true
  },
  {
    id: "cat-women",
    name: "Women",
    slug: "women",
    description: "Graceful silhouettes, cat-eye curves, and featherlight luxury frames designed to elevate any look.",
    imageUrl: "https://images.unsplash.com/photo-1509695503492-413833d296ae?auto=format&fit=crop&w=800&q=80",
    order: 2,
    isVisible: true
  },
  {
    id: "cat-children",
    name: "Children",
    slug: "children",
    description: "Ultra-flexible, shock-resistant TR90 frames with hypoallergenic nose pads designed for active young minds.",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    order: 3,
    isVisible: true
  },
  {
    id: "cat-lenses",
    name: "Lenses",
    slug: "lenses",
    description: "High-index digital blue-filter, progressive, anti-reflective, and photochromic optical precision lenses.",
    imageUrl: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
    order: 4,
    isVisible: true
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "SR Royal Obsidian Acetate",
    price: 3499,
    description: "Handcrafted Italian acetate eyeglasses featuring custom barrel hinges, bevelled temples, and a commanding square profile. Engineered for all-day comfort with balanced weight distribution.",
    category: "Men",
    gender: "Men",
    style: "Classic",
    frameType: "Full Rim",
    material: "Acetate",
    colour: "Deep Obsidian Black",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isTrending: true,
    sku: "SRO-CL-801",
    dimensions: "53-18-145",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-2",
    name: "SR Aureus Pure Titanium Round",
    price: 4899,
    description: "Japanese aero-grade beta titanium circular frame with fine hand-engraved filigree bridge. Featherweight construction weighing only 14 grams, fitted with hypoallergenic silicone nose pads.",
    category: "Men",
    gender: "Unisex",
    style: "Premium",
    frameType: "Full Rim",
    material: "Titanium",
    colour: "Brushed Champagne Gold",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isTrending: false,
    sku: "SRO-PR-402",
    dimensions: "49-21-142",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-3",
    name: "SR Luna Sculpted Cat-Eye",
    price: 3250,
    description: "Graceful feminine contouring with subtle wing angles and multi-layered tortoiseshell amber tones. Offers high visual impact and an effortless luxury statement.",
    category: "Women",
    gender: "Women",
    style: "Modern",
    frameType: "Full Rim",
    material: "Acetate",
    colour: "Havana Amber Tortoise",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1509695503492-413833d296ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: true,
    isFeatured: false,
    isTrending: true,
    sku: "SRO-MD-309",
    dimensions: "52-17-140",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-4",
    name: "SR Minimalist Aviator Precision",
    price: 2899,
    description: "Modernized dual-bridge aviator frame sculpted from memory alloy metal. Features slender temples with ergonomic temple tips for seamless daily wear.",
    category: "Men",
    gender: "Men",
    style: "Classic",
    frameType: "Full Rim",
    material: "Metal",
    colour: "Gunmetal Slate",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: false,
    isFeatured: false,
    isTrending: true,
    sku: "SRO-CL-218",
    dimensions: "55-16-145",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-5",
    name: "SR Horizon Rimless Executive",
    price: 4200,
    description: "Ultralight rimless spectacles engineered with high-tensile titanium mountings and diamond-cut lens bevels. Virtually weightless on the face with zero visual obstruction.",
    category: "Men",
    gender: "Unisex",
    style: "Premium",
    frameType: "Rimless",
    material: "Titanium",
    colour: "Silver Chrome",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isTrending: false,
    sku: "SRO-PR-905",
    dimensions: "51-19-140",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-6",
    name: "SR Junior Flex Active TR90",
    price: 1850,
    description: "Virtually unbreakable, bend-resistant TR90 frame for children. Equipped with wrap-around flex hinges and 360-degree soft comfort ear socks.",
    category: "Children",
    gender: "Kids",
    style: "Everyday",
    frameType: "Full Rim",
    material: "TR90",
    colour: "Midnight Blue & Aqua",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1509695503492-413833d296ae?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: false,
    isFeatured: false,
    isTrending: false,
    sku: "SRO-KD-104",
    dimensions: "45-15-125",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-7",
    name: "SR Clarity Blue-Shield HD Lenses",
    price: 2400,
    description: "Custom digital surfaced spectacle lenses filtering 99.8% of harmful high-energy blue-violet light. Includes multi-layer hydrophobic, anti-static, and oleophobic coatings.",
    category: "Lenses",
    gender: "Unisex",
    style: "Everyday",
    frameType: "Full Rim",
    material: "Mixed",
    colour: "Ultra Clear with Blue Sheen",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: true,
    isFeatured: false,
    isTrending: true,
    sku: "SRO-LN-501",
    dimensions: "Custom Cut to Frame",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prod-8",
    name: "SR Riviera Half-Rim Clubmaster",
    price: 3650,
    description: "Timeless vintage intellectual aesthetics with polished black acetate browline and gold plated lower wire frame. A masterwork of mid-century optical elegance.",
    category: "Men",
    gender: "Unisex",
    style: "Classic",
    frameType: "Half Rim",
    material: "Mixed",
    colour: "Onyx Black & Gold",
    availability: "In Stock",
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80"
    ],
    isNew: false,
    isFeatured: true,
    isTrending: true,
    sku: "SRO-CL-773",
    dimensions: "51-20-145",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialHomepageConfig: HomepageConfig = {
  hero: {
    badge: "Premium Eyewear Collection",
    heading: "See the Difference",
    subheading: "Find frames that fit your style.",
    description: "Discover our latest collection of eyeglasses and sunglasses. Find the perfect frame that fits your style and personality.",
    imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
    primaryButtonText: "Explore Collection",
    secondaryButtonText: "New Arrivals"
  },
  featuredProductId: "prod-1",
  trendingEyeglassesId: "prod-2",
  trendingSunglassesId: "prod-3",
  whyChooseUs: [
    {
      icon: "ShieldCheck",
      title: "Quality Frames",
      description: "Crafted from aero-grade titanium and handcrafted Italian acetate for unmatched durability and featherlight comfort."
    },
    {
      icon: "Glasses",
      title: "Wide Collection",
      description: "Over 500+ curated eyeglasses, designer sunglasses, and custom precision lenses suited for every face profile."
    },
    {
      icon: "UserCheck",
      title: "Personalised Assistance",
      description: "One-on-one frame styling guidance and certified optometrist consultation to find your ideal visual match."
    },
    {
      icon: "MessageCircle",
      title: "Easy Enquiry",
      description: "Direct one-click WhatsApp connection to check frame fit, prescription suitability, and instant stock reservations."
    }
  ],
  aboutSnippet: {
    heading: "Your Vision, Our Priority",
    description: "At SR OPTICALS, we combine precision optometric science with refined optical craftsmanship. Every frame in our boutique is individually inspected, balanced, and custom-glazed to deliver crisp clarity and distinguished aesthetic presence.",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
  }
};

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    customerName: "Dr. Rajesh K.",
    rating: 5,
    comment: "The precision eye testing and attention to detail at SR OPTICALS is world-class. My titanium progressive lenses are exceptionally comfortable for long hours of surgery and reading.",
    date: "2 weeks ago",
    verified: true,
    isVisible: true
  },
  {
    id: "rev-2",
    customerName: "Ananya Sharma",
    rating: 5,
    comment: "I fell in love with their acetate collection! The staff took time to recommend frames that suited my high cheekbones. The WhatsApp enquiry was fast and seamless.",
    date: "1 month ago",
    verified: true,
    isVisible: true
  },
  {
    id: "rev-3",
    customerName: "Vikramaditya Rao",
    rating: 5,
    comment: "Pure craftsmanship. No aggressive upselling—just honest advice, quality frames, and outstanding customer service. Highly recommend visiting their boutique.",
    date: "2 months ago",
    verified: true,
    isVisible: true
  }
];

export const initialStorePhotos: StorePhoto[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    caption: "Luxury Eyewear Display Gallery & Frame Selection Bar",
    order: 1
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
    caption: "Precision Diagnostic & Refraction Consultation Suite",
    order: 2
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    caption: "Client Consultation & Custom Frame Fitting Lounge",
    order: 3
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
    caption: "Computerised Lens Fitting & Edge Finishing Lab",
    order: 4
  }
];
