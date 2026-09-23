# SR OPTICALS — Premium Eyewear & Precision Optical Care Full-Stack Platform

A complete, luxury full-stack website and store management system built for **SR OPTICALS**.

This platform is crafted exclusively for **eyewear discovery, catalog filtering, wishlist persistence, and direct WhatsApp / Phone enquiries** — with **no online cart, checkout, or payment gateway**. All customer-facing content (products, hero banners, categories, customer reviews, store photos, opening hours, contact details) is dynamically managed via the protected Admin Portal.

---

## 🌟 Key Features

### 1. Customer Storefront
- **Responsive Luxury Design System**: Warm off-white/cream canvas (`#FBFBF9`), deep obsidian racing green accent (`#14342B`), champagne gold subtle highlights (`#C5A880`), rounded cards, and clean typography (`Playfair Display` + `Plus Jakarta Sans`).
- **Universal Spectacles Hero**: Features high-resolution eyewear product photography with zero female-model bias, spotlight product pill, and dual CTAs.
- **12 Rich Homepage Sections**:
  1. *Hero*: Universal eyewear showcase, badges, and quick feature points.
  2. *Shop by Category*: Cards for Men, Women, Children, and Lenses.
  3. *New Arrivals*: Automatically presents latest products marked as New Arrival.
  4. *Trending Collection*: Popular Eyeglasses & Popular Sunglasses visual banners.
  5. *Explore by Style*: Classic, Modern, Premium, and Everyday profiles.
  6. *Featured Product Showcase*: Large editorial frame showcase with specifications.
  7. *Why Choose Us*: 4 editable value pillars with luxury icons.
  8. *About SR OPTICALS*: Brand craftsmanship story and showroom teaser.
  9. *Store Experience*: Curated interior photography gallery.
  10. *Customer Reviews*: Moderate-able testimonials with 5-star ratings and verified labels.
  11. *Visit Our Store*: Address, phone, WhatsApp, opening hours schedule, and Google Maps embed.
  12. *Final Contact CTA*: Instant WhatsApp and Call actions.
- **YouTube-Style Prominent Search**: Real-time autocomplete search by frame name, category, style, material, and colour.
- **Catalog & Multi-Filter Engine**:
  - Filter by Category (Men, Women, Children, Lenses)
  - Filter by Style (Classic, Modern, Premium, Everyday)
  - Filter by Frame Type (Full Rim, Half Rim, Rimless)
  - Filter by Material (Acetate, Titanium, Metal, TR90)
  - Price Range Slider (₹1,500 – ₹6,000+)
  - In-Stock Only & New Releases Only toggles
  - Sort by Newest, Price (Low/High), Alphabetical
  - 4-column desktop, 3-column tablet, 2-column mobile grid.
- **Product Details Page**:
  - Multi-image gallery with thumbnail switcher.
  - Complete specifications (frame type, material, colour, dimensions, SKU).
  - Availability status pill ("In Stock", "Made to Order", "Out of Stock").
  - **WhatsApp Enquiry**: Automatically includes product name and SKU.
  - **Call Shop**: Standard `tel:` link to the configured shop phone.
  - Related frames recommendations.
- **Wishlist**:
  - Save frames with heart icon.
  - Live navbar count badge.
  - LocalStorage persistence with structure ready for cloud user sync.

### 2. Protected Store Owner Admin Panel (`/admin`)
- **Protected Route Guard**: Accessible only via authentication (Firebase Auth or Offline Demo mode).
- **Admin Dashboard**: Stat metrics (Total Products, In-Stock, Out-of-Stock, New Arrivals, Featured Frames, Categories).
- **Product CRUD**:
  - Add / Edit product with all specifications and multi-image manager.
  - Delete product with safety confirmation modal.
  - Quick 1-click toggle switches for `New Arrival`, `Featured`, and `Trending`.
- **Category Management**: Add, edit, upload cover, change display sequence, toggle public visibility.
- **Homepage Manager**: Live editor for Hero text/image, Featured frame picker, Trending frame pickers, 4 Why Choose Us pillars, and About snippet.
- **Store Info Management**: Edit shop name, phone number, WhatsApp number, email, address, Google Maps links, operating hours, and social links.
- **Store Photos Gallery**: Upload showroom photos, reorder, delete.
- **Reviews Moderation**: Add, edit, rate (1-5 stars), toggle live visibility, delete.
- **Diagnostics & Factory Reset**: Instant reset to realistic default optical demo seed data at any time.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router v7
- **Backend**: Node.js, Express.js (REST API architecture with controllers, routes, and middleware)
- **Firebase**:
  - Firebase Authentication (Admin login)
  - Cloud Firestore (Data collections)
  - Firebase Storage (Image uploads)
  - Firestore & Storage Security Rules included (`firestore.rules`, `storage.rules`)
- **Dual-Mode Data Adapter**:
  - Operates automatically in high-fidelity persistent offline mode with realistic optical seed data out-of-the-box.
  - Immediately connects to live Google Firebase once environment variables are set in `.env`.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
# In the client folder
cd client
npm install

# In the server folder
cd ../server
npm install
```

### 2. Run the Development Servers
In two separate terminals:

```bash
# Terminal 1: Client (Runs on http://localhost:5173)
cd client
npm run dev

# Terminal 2: REST API Server (Runs on http://localhost:5000)
cd server
npm run dev
```

### 3. Log In to Admin Panel
- Navigate to: `http://localhost:5173/admin/login`
- **Default Demo Credentials**:
  - **Email**: `admin@sropticals.com`
  - **Password**: `admin123`

---

## 🔐 Connecting Live Firebase (Optional)

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password provider).
3. Enable **Cloud Firestore** and deploy `firestore.rules`.
4. Enable **Firebase Storage** and deploy `storage.rules`.
5. Create a Web App in Firebase settings and copy credentials to `client/.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
6. Generate a service account private key for `server/.env`:
   ```env
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

---

## 📄 License
Proprietary — Created for **SR OPTICALS**. All rights reserved © 2026.
