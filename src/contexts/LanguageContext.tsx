
import React, { createContext, useContext, useState, useEffect } from "react";

// Define available languages
type Language = "en" | "fr" | "es" | "ar";

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Our translations
const translations: Translations = {
  en: {
    home: "Home",
    orders: "Orders",
    checkout: "Checkout",
    searchPlaceholder: "Search...",
    addToCart: "Add to cart",
    removeFromCart: "Remove from cart",
    login: "Sign In",
    register: "Sign Up",
    logout: "Logout",
    myAccount: "My Account",
    myOrders: "My Orders",
    profile: "Profile Settings",
    welcomeBack: "Welcome back",
    productRecommendations: "You May Also Like",
    cart: "Cart",
    clearCart: "Clear Cart",
    total: "Total",
    saveForLater: "Save for Later",
    myWishlist: "My Wishlist",
    searchByVoice: "Search by voice",
    viewDetails: "View Details",
  },
  fr: {
    home: "Accueil",
    orders: "Commandes",
    checkout: "Paiement",
    searchPlaceholder: "Rechercher...",
    addToCart: "Ajouter au panier",
    removeFromCart: "Retirer du panier",
    login: "Se connecter",
    register: "S'inscrire",
    logout: "Déconnexion",
    myAccount: "Mon compte",
    myOrders: "Mes commandes",
    profile: "Paramètres du profil",
    welcomeBack: "Bienvenue",
    productRecommendations: "Vous aimerez aussi",
    cart: "Panier",
    clearCart: "Vider le panier",
    total: "Total",
    saveForLater: "Sauvegarder pour plus tard",
    myWishlist: "Ma liste de souhaits",
    searchByVoice: "Recherche vocale",
    viewDetails: "Voir les détails",
  },
  es: {
    home: "Inicio",
    orders: "Pedidos",
    checkout: "Pagar",
    searchPlaceholder: "Buscar...",
    addToCart: "Añadir al carrito",
    removeFromCart: "Eliminar del carrito",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    myAccount: "Mi cuenta",
    myOrders: "Mis pedidos",
    profile: "Configuración del perfil",
    welcomeBack: "Bienvenido de nuevo",
    productRecommendations: "También te puede gustar",
    cart: "Carrito",
    clearCart: "Vaciar carrito",
    total: "Total",
    saveForLater: "Guardar para más tarde",
    myWishlist: "Mi lista de deseos",
    searchByVoice: "Búsqueda por voz",
    viewDetails: "Ver detalles",
  },
  ar: {
    home: "الرئيسية",
    orders: "الطلبات",
    checkout: "الدفع",
    searchPlaceholder: "بحث...",
    addToCart: "أضف إلى السلة",
    removeFromCart: "إزالة من السلة",
    login: "تسجيل الدخول",
    register: "تسجيل",
    logout: "تسجيل الخروج",
    myAccount: "حسابي",
    myOrders: "طلباتي",
    profile: "إعدادات الملف الشخصي",
    welcomeBack: "مرحبا بعودتك",
    productRecommendations: "قد يعجبك أيضاً",
    cart: "السلة",
    clearCart: "إفراغ السلة",
    total: "المجموع",
    saveForLater: "حفظ لوقت لاحق",
    myWishlist: "قائمة الرغبات",
    searchByVoice: "البحث الصوتي",
    viewDetails: "عرض التفاصيل",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  rtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });
  
  const [rtl, setRtl] = useState<boolean>(false);
  
  // Update the HTML dir attribute when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
    const isRtl = language === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    setRtl(isRtl);
  }, [language]);
  
  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, rtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
};
