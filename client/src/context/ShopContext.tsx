import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShopInfo } from '../types';
import { getShopInfo, DATA_CHANGED_EVENT } from '../services/api';
import { initialShopInfo } from '../services/mockData';

interface ShopContextType {
  shopInfo: ShopInfo;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  getWhatsAppUrl: (productName?: string, sku?: string) => string;
  getCallUrl: () => string;
  refreshShopInfo: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shopInfo, setShopInfo] = useState<ShopInfo>(initialShopInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const loadInfo = async () => {
    try {
      const data = await getShopInfo();
      setShopInfo(data);
    } catch (e) {
      console.error("Failed to load shop info:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInfo();

    const handleDataUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ dataType: string }>;
      if (customEvent.detail?.dataType === 'shopInfo' || customEvent.detail?.dataType === 'all') {
        loadInfo();
      }
    };

    window.addEventListener(DATA_CHANGED_EVENT, handleDataUpdate);
    return () => window.removeEventListener(DATA_CHANGED_EVENT, handleDataUpdate);
  }, []);

  const getWhatsAppUrl = (productName?: string, sku?: string) => {
    const rawNumber = shopInfo.whatsapp.replace(/[^0-9]/g, '');
    let text = `Hello ${shopInfo.shopName}, I would like to enquire about eyewear availability at your store.`;
    
    if (productName) {
      text = `Hello ${shopInfo.shopName}, I'm interested in the "${productName}"${sku ? ` (SKU: ${sku})` : ''}. Please let me know its availability, lens options, and price details.`;
    }
    
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  const getCallUrl = () => {
    const rawPhone = shopInfo.phone.replace(/[^0-9+]/g, '');
    return `tel:${rawPhone}`;
  };

  return (
    <ShopContext.Provider
      value={{
        shopInfo,
        isLoading,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        getWhatsAppUrl,
        getCallUrl,
        refreshShopInfo: loadInfo
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
