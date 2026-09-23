import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../services/firebase';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

interface AdminUser {
  email: string;
  displayName?: string;
  isDemo?: boolean;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  isLoading: boolean;
  isFirebaseActive: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const DEMO_ADMIN_KEY = 'sropticals_demo_admin_session';

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if (user && user.email) {
          setAdminUser({
            email: user.email,
            displayName: user.displayName || 'Admin',
            isDemo: false
          });
        } else {
          setAdminUser(null);
        }
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Check local demo admin session
      try {
        const saved = sessionStorage.getItem(DEMO_ADMIN_KEY);
        if (saved) {
          setAdminUser(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Error reading admin session", e);
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    setIsLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        if (cred.user && cred.user.email) {
          setAdminUser({
            email: cred.user.email,
            displayName: cred.user.displayName || 'Store Owner',
            isDemo: false
          });
        }
      } else {
        // High fidelity demo admin authentication
        // Default demo credentials: admin@sropticals.com / admin123 or any valid format password
        if (email === 'admin@sropticals.com' && pass === 'admin123') {
          const demoUser = {
            email: 'admin@sropticals.com',
            displayName: 'SR OPTICALS Owner',
            isDemo: true
          };
          sessionStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(demoUser));
          setAdminUser(demoUser);
        } else {
          throw new Error('Invalid credentials. Use admin@sropticals.com / admin123');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    sessionStorage.removeItem(DEMO_ADMIN_KEY);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: Boolean(adminUser),
        adminUser,
        isLoading,
        isFirebaseActive: isFirebaseConfigured,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
