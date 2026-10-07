import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminNewArrivalsPage } from './pages/admin/AdminNewArrivalsPage';
import { AdminHomepageManagerPage } from './pages/admin/AdminHomepageManagerPage';
import { AdminStoreInfoPage } from './pages/admin/AdminStoreInfoPage';
import { AdminStorePhotosPage } from './pages/admin/AdminStorePhotosPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Component to handle layout switching between Customer and Admin
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <WishlistProvider>
          <AdminAuthProvider>
            <LayoutWrapper>
              <Routes>
                {/* Customer Routes (Public) */}
                <Route path="/" element={<HomePage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Admin Authentication Route (Public) */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} />
                <Route path="/admin/categories" element={<ProtectedRoute><AdminCategoriesPage /></ProtectedRoute>} />
                <Route path="/admin/new-arrivals" element={<ProtectedRoute><AdminNewArrivalsPage /></ProtectedRoute>} />
                <Route path="/admin/homepage" element={<ProtectedRoute><AdminHomepageManagerPage /></ProtectedRoute>} />
                <Route path="/admin/store-info" element={<ProtectedRoute><AdminStoreInfoPage /></ProtectedRoute>} />
                <Route path="/admin/store-photos" element={<ProtectedRoute><AdminStorePhotosPage /></ProtectedRoute>} />
                <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviewsPage /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </LayoutWrapper>
          </AdminAuthProvider>
        </WishlistProvider>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
