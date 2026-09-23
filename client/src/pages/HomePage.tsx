import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { TrendingSection } from '../components/home/TrendingSection';
import { StylesSection } from '../components/home/StylesSection';
import { FeaturedProductSection } from '../components/home/FeaturedProductSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { HomeAboutSection } from '../components/home/HomeAboutSection';
import { StoreExperienceSection } from '../components/home/StoreExperienceSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { VisitStoreSection } from '../components/home/VisitStoreSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

import {
  getHomepageConfig,
  getProducts,
  getCategories,
  getReviews,
  getStorePhotos,
  DATA_CHANGED_EVENT
} from '../services/api';
import {
  HomepageConfig,
  Product,
  Category,
  Review,
  StorePhoto
} from '../types';
import {
  initialHomepageConfig,
  initialProducts,
  initialCategories,
  initialReviews,
  initialStorePhotos
} from '../services/mockData';
import { useShop } from '../context/ShopContext';

export const HomePage: React.FC = () => {
  const { shopInfo } = useShop();
  const [config, setConfig] = useState<HomepageConfig>(initialHomepageConfig);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [storePhotos, setStorePhotos] = useState<StorePhoto[]>(initialStorePhotos);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllData = async () => {
    try {
      const [cfg, prods, cats, revs, photos] = await Promise.all([
        getHomepageConfig(),
        getProducts(),
        getCategories(),
        getReviews(true),
        getStorePhotos()
      ]);
      setConfig(cfg);
      setProducts(prods);
      setCategories(cats);
      setReviews(revs);
      setStorePhotos(photos);
    } catch (e) {
      console.error("Error loading homepage data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    const handleDataUpdate = () => {
      loadAllData();
    };

    window.addEventListener(DATA_CHANGED_EVENT, handleDataUpdate);
    return () => window.removeEventListener(DATA_CHANGED_EVENT, handleDataUpdate);
  }, []);

  const featuredProduct = products.find(p => p.id === config.featuredProductId) || products[0];
  const trendingEyeglasses = products.find(p => p.id === config.trendingEyeglassesId) || products[1];
  const trendingSunglasses = products.find(p => p.id === config.trendingSunglassesId) || products[2];

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* SECTION 1 — HERO */}
      <HeroSection
        config={config.hero}
        featuredProduct={featuredProduct}
      />

      {/* SECTION 2 — SHOP BY CATEGORY */}
      <CategoriesSection categories={categories} />

      {/* SECTION 3 — NEW ARRIVALS */}
      <NewArrivalsSection products={products} />

      {/* SECTION 4 — TRENDING COLLECTION */}
      <TrendingSection
        eyeglassesProduct={trendingEyeglasses}
        sunglassesProduct={trendingSunglasses}
      />

      {/* SECTION 5 — EXPLORE BY STYLE */}
      <StylesSection />

      {/* SECTION 6 — FEATURED PRODUCT */}
      <FeaturedProductSection product={featuredProduct} />

      {/* SECTION 7 — WHY CHOOSE US */}
      <WhyChooseUsSection items={config.whyChooseUs} />

      {/* SECTION 8 — ABOUT SR OPTICALS */}
      <HomeAboutSection snippet={config.aboutSnippet} shopName={shopInfo.shopName} />

      {/* SECTION 9 — STORE EXPERIENCE */}
      <StoreExperienceSection photos={storePhotos} />

      {/* SECTION 10 — CUSTOMER REVIEWS */}
      <ReviewsSection reviews={reviews} />

      {/* SECTION 11 — VISIT OUR STORE */}
      <VisitStoreSection shopInfo={shopInfo} />

      {/* SECTION 12 — FINAL CONTACT CTA */}
      <FinalCtaSection />
    </div>
  );
};
