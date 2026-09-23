"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataService = void 0;
const firebaseAdmin_js_1 = require("../config/firebaseAdmin.js");
// Initial realistic optical seed data
const initialShopInfo = {
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
const initialCategories = [
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
const initialProducts = [
    {
        id: "prod-1",
        name: "SR Royal Obsidian Acetate",
        price: 3499,
        description: "Handcrafted Italian acetate eyeglasses featuring custom barrel hinges, bevelled temples, and a commanding square profile.",
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
        description: "Japanese aero-grade beta titanium circular frame with fine hand-engraved filigree bridge. Featherweight 14g construction.",
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
        description: "Graceful feminine contouring with subtle wing angles and multi-layered tortoiseshell amber tones.",
        category: "Women",
        gender: "Women",
        style: "Modern",
        frameType: "Full Rim",
        material: "Acetate",
        colour: "Havana Amber Tortoise",
        availability: "In Stock",
        images: [
            "https://images.unsplash.com/photo-1509695503492-413833d296ae?auto=format&fit=crop&w=900&q=80"
        ],
        isNew: true,
        isFeatured: false,
        isTrending: true,
        sku: "SRO-MD-309",
        dimensions: "52-17-140",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
const initialHomepageConfig = {
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
        description: "At SR OPTICALS, we combine precision optometric science with refined optical craftsmanship.",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    }
};
const initialReviews = [
    {
        id: "rev-1",
        customerName: "Dr. Rajesh K.",
        rating: 5,
        comment: "The precision eye testing and attention to detail at SR OPTICALS is world-class.",
        date: "2 weeks ago",
        verified: true,
        isVisible: true
    }
];
const initialStorePhotos = [
    {
        id: "photo-1",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        caption: "Luxury Eyewear Display Gallery",
        order: 1
    }
];
// Memory Store State (for offline mode)
let memoryProducts = [...initialProducts];
let memoryCategories = [...initialCategories];
let memoryShopInfo = { ...initialShopInfo };
let memoryHomepage = { ...initialHomepageConfig };
let memoryReviews = [...initialReviews];
let memoryStorePhotos = [...initialStorePhotos];
exports.dataService = {
    // Products
    async getProducts() {
        if (firebaseAdmin_js_1.firestore) {
            const snap = await firebaseAdmin_js_1.firestore.collection('products').get();
            if (!snap.empty) {
                return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        }
        return memoryProducts;
    },
    async getProductById(id) {
        if (firebaseAdmin_js_1.firestore) {
            const doc = await firebaseAdmin_js_1.firestore.collection('products').doc(id).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
        }
        return memoryProducts.find(p => p.id === id) || null;
    },
    async createProduct(data) {
        const newProduct = {
            ...data,
            id: 'prod-' + Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('products').doc(newProduct.id).set(newProduct);
        }
        memoryProducts = [newProduct, ...memoryProducts];
        return newProduct;
    },
    async updateProduct(id, updates) {
        const current = await this.getProductById(id);
        if (!current)
            throw new Error('Product not found');
        const updated = {
            ...current,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('products').doc(id).update(updated);
        }
        const idx = memoryProducts.findIndex(p => p.id === id);
        if (idx !== -1)
            memoryProducts[idx] = updated;
        return updated;
    },
    async deleteProduct(id) {
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('products').doc(id).delete();
        }
        memoryProducts = memoryProducts.filter(p => p.id !== id);
    },
    // Categories
    async getCategories() {
        if (firebaseAdmin_js_1.firestore) {
            const snap = await firebaseAdmin_js_1.firestore.collection('categories').get();
            if (!snap.empty) {
                return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        }
        return memoryCategories;
    },
    async createCategory(data) {
        const newCat = {
            ...data,
            id: 'cat-' + Date.now()
        };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('categories').doc(newCat.id).set(newCat);
        }
        memoryCategories = [...memoryCategories, newCat];
        return newCat;
    },
    async updateCategory(id, updates) {
        const idx = memoryCategories.findIndex(c => c.id === id);
        if (idx === -1)
            throw new Error('Category not found');
        const updated = { ...memoryCategories[idx], ...updates };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('categories').doc(id).update(updated);
        }
        memoryCategories[idx] = updated;
        return updated;
    },
    async deleteCategory(id) {
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('categories').doc(id).delete();
        }
        memoryCategories = memoryCategories.filter(c => c.id !== id);
    },
    // Shop Info
    async getShopInfo() {
        if (firebaseAdmin_js_1.firestore) {
            const doc = await firebaseAdmin_js_1.firestore.collection('shopInfo').doc('default').get();
            if (doc.exists) {
                return doc.data();
            }
        }
        return memoryShopInfo;
    },
    async updateShopInfo(updates) {
        memoryShopInfo = { ...memoryShopInfo, ...updates };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('shopInfo').doc('default').set(memoryShopInfo, { merge: true });
        }
        return memoryShopInfo;
    },
    // Homepage Config
    async getHomepageConfig() {
        if (firebaseAdmin_js_1.firestore) {
            const doc = await firebaseAdmin_js_1.firestore.collection('homepage').doc('config').get();
            if (doc.exists) {
                return doc.data();
            }
        }
        return memoryHomepage;
    },
    async updateHomepageConfig(updates) {
        memoryHomepage = { ...memoryHomepage, ...updates };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('homepage').doc('config').set(memoryHomepage, { merge: true });
        }
        return memoryHomepage;
    },
    // Reviews
    async getReviews(onlyVisible = false) {
        let list = memoryReviews;
        if (firebaseAdmin_js_1.firestore) {
            const snap = await firebaseAdmin_js_1.firestore.collection('reviews').get();
            if (!snap.empty) {
                list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            }
        }
        return onlyVisible ? list.filter(r => r.isVisible) : list;
    },
    async createReview(data) {
        const rev = { ...data, id: 'rev-' + Date.now() };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('reviews').doc(rev.id).set(rev);
        }
        memoryReviews = [rev, ...memoryReviews];
        return rev;
    },
    async updateReview(id, updates) {
        const idx = memoryReviews.findIndex(r => r.id === id);
        if (idx === -1)
            throw new Error('Review not found');
        const updated = { ...memoryReviews[idx], ...updates };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('reviews').doc(id).update(updated);
        }
        memoryReviews[idx] = updated;
        return updated;
    },
    async deleteReview(id) {
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('reviews').doc(id).delete();
        }
        memoryReviews = memoryReviews.filter(r => r.id !== id);
    },
    // Store Photos
    async getStorePhotos() {
        if (firebaseAdmin_js_1.firestore) {
            const snap = await firebaseAdmin_js_1.firestore.collection('storePhotos').get();
            if (!snap.empty) {
                return snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.order - b.order);
            }
        }
        return memoryStorePhotos.sort((a, b) => a.order - b.order);
    },
    async addStorePhoto(data) {
        const photo = { ...data, id: 'photo-' + Date.now() };
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('storePhotos').doc(photo.id).set(photo);
        }
        memoryStorePhotos = [...memoryStorePhotos, photo];
        return photo;
    },
    async deleteStorePhoto(id) {
        if (firebaseAdmin_js_1.firestore) {
            await firebaseAdmin_js_1.firestore.collection('storePhotos').doc(id).delete();
        }
        memoryStorePhotos = memoryStorePhotos.filter(p => p.id !== id);
    }
};
