import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, Language, LanguageContextType } from '@/types';

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
];

// Translation dictionary (simplified - in production, load from files)
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // App General
    'app.title': 'EnergyNexus',
    'app.tagline': 'Power the future with solar energy trading',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.marketplace': 'Marketplace',
    'nav.analytics': 'Analytics',
    'nav.wallet': 'Wallet',
    'nav.settings': 'Settings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account and app preferences',
    'settings.profile': 'Profile',
    'settings.profile.desc': 'Manage your personal information',
    'settings.system': 'My System',
    'settings.system.desc': 'Solar system details & settings',
    'settings.notifications': 'Notifications',
    'settings.notifications.desc': 'Control your alerts & updates',
    'settings.security': 'Security',
    'settings.security.desc': 'Password & authentication settings',
    'settings.language': 'Language',
    'settings.language.desc': 'Choose your preferred language',
    'settings.help': 'Help & Support',
    'settings.help.desc': 'FAQs, tutorials & contact support',
    'settings.legal': 'Legal',
    'settings.legal.desc': 'Terms, privacy policy & about us',
    
    // Profile
    'profile.name': 'Full Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone Number',
    'profile.edit': 'Edit Profile',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.contact_support': 'Contact support to change',
    
    // Notifications
    'notifications.saleConfirmations': 'Sale Confirmations',
    'notifications.saleConfirmations.desc': 'Get notified when your energy is sold',
    'notifications.priceAlerts': 'Price Alerts',
    'notifications.priceAlerts.desc': 'Alerts when energy prices spike',
    'notifications.walletUpdates': 'Wallet Updates',
    'notifications.walletUpdates.desc': 'Transaction and balance updates',
    'notifications.promotional': 'Promotional Messages',
    'notifications.promotional.desc': 'News and promotional content',
    'notifications.energyInsights': 'Energy Insights',
    'notifications.energyInsights.desc': 'Daily and weekly energy reports',
    'notifications.maintenance': 'Maintenance Updates',
    'notifications.maintenance.desc': 'System maintenance notifications',
    
    // Security
    'security.biometric': 'Biometric Login',
    'security.biometric.desc': 'Use fingerprint or face ID to login',
    'security.twoFactor': 'Two-Factor Authentication',
    'security.twoFactor.desc': 'Extra security for your account',
    'security.loginAlerts': 'Login Alerts',
    'security.loginAlerts.desc': 'Get notified of new login attempts',
    'security.changePassword': 'Change Password',
    'security.sessionTimeout': 'Session Timeout',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.logout': 'Logout',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    
    // Dashboard
    'dashboard.sellSurplusNow': 'Sell Surplus Now',
    'dashboard.todayEarnings': 'Today\'s Earnings',
    'dashboard.carbonOffset': 'Carbon Offset',
    'dashboard.generation': 'Generation',
    'dashboard.consumption': 'Consumption',
    'dashboard.surplus': 'Surplus',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.createAccount': 'Create Account',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': 'Don\'t have an account?',
  },
  
  hi: {
    // App General
    'app.title': 'एनर्जीनेक्सस',
    'app.tagline': 'सौर ऊर्जा व्यापार के साथ भविष्य को शक्ति दें',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.marketplace': 'मार्केटप्लेस',
    'nav.analytics': 'विश्लेषण',
    'nav.wallet': 'वॉलेट',
    'nav.settings': 'सेटिंग्स',
    
    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.subtitle': 'अपने खाते और ऐप प्राथमिकताओं को प्रबंधित करें',
    'settings.profile': 'प्रोफाइल',
    'settings.profile.desc': 'अपनी व्यक्तिगत जानकारी प्रबंधित करें',
    'settings.system': 'मेरा सिस्टम',
    'settings.system.desc': 'सौर सिस्टम विवरण और सेटिंग्स',
    'settings.notifications': 'सूचनाएं',
    'settings.notifications.desc': 'अपने अलर्ट और अपडेट नियंत्रित करें',
    'settings.security': 'सुरक्षा',
    'settings.security.desc': 'पासवर्ड और प्रमाणीकरण सेटिंग्स',
    'settings.language': 'भाषा',
    'settings.language.desc': 'अपनी पसंदीदा भाषा चुनें',
    'settings.help': 'सहायता और समर्थन',
    'settings.help.desc': 'FAQ, ट्यूटोरियल और संपर्क समर्थन',
    'settings.legal': 'कानूनी',
    'settings.legal.desc': 'नियम, गोपनीयता नीति और हमारे बारे में',
    
    // Profile
    'profile.name': 'पूरा नाम',
    'profile.email': 'ईमेल',
    'profile.phone': 'फोन नंबर',
    'profile.edit': 'प्रोफाइल संपादित करें',
    'profile.save': 'परिवर्तन सहेजें',
    'profile.cancel': 'रद्द करें',
    'profile.contact_support': 'बदलने के लिए सहायता से संपर्क करें',
    
    // Common
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.logout': 'लॉगआउट',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हुआ',
    'common.success': 'सफलता',
    
    // Dashboard
    'dashboard.sellSurplusNow': 'अब सरप्लस बेचें',
    'dashboard.todayEarnings': 'आज की कमाई',
    'dashboard.carbonOffset': 'कार्बन ऑफसेट',
    
    // Auth
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
  },
  
  // Add other languages with key translations
  ta: {
    'app.title': 'எனர்ஜிநெக்சஸ்',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.marketplace': 'சந்தை',
    'nav.analytics': 'பகுப்பாய்வு',
    'nav.wallet': 'பணப்பை',
    'nav.settings': 'அமைப்புகள்',
  },
  
  te: {
    'app.title': 'ఎనర్జీనెక్సస్',
    'nav.dashboard': 'డ్యాష్‌బోర్డ్',
    'nav.marketplace': 'మార్కెట్‌ప్లేస్',
    'nav.analytics': 'అనలిటిక్స్',
    'nav.wallet': 'వాలెట్',
    'nav.settings': 'సెట్టింగులు',
  },
  
  bn: {
    'app.title': 'এনার্জিনেক্সাস',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.marketplace': 'মার্কেটপ্লেস',
    'nav.analytics': 'বিশ্লেষণ',
    'nav.wallet': 'ওয়ালেট',
    'nav.settings': 'সেটিংস',
  },
  
  mr: {
    'app.title': 'एनर्जीनेक्सस',
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.marketplace': 'मार्केटप्लेस',
    'nav.analytics': 'विश्लेषण',
    'nav.wallet': 'वॉलेट',
    'nav.settings': 'सेटिंग्स',
  },
  
  gu: {
    'app.title': 'એનર્જીનેક્સસ',
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.marketplace': 'માર્કેટપ્લેસ',
    'nav.analytics': 'વિશ્લેષણ',
    'nav.wallet': 'વોલેટ',
    'nav.settings': 'સેટિંગ્સ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('energynexus-language');
    return (saved as LanguageCode) || 'en';
  });

  // Auto-detect language on first visit
  useEffect(() => {
    const saved = localStorage.getItem('energynexus-language');
    if (!saved) {
      const browserLanguage = navigator.language.split('-')[0] as LanguageCode;
      const supportedLanguage = languages.find(lang => lang.code === browserLanguage);
      if (supportedLanguage) {
        setCurrentLanguage(browserLanguage);
        localStorage.setItem('energynexus-language', browserLanguage);
      }
    }
  }, []);

  const changeLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('energynexus-language', lang);
    
    // Update document language attribute
    document.documentElement.lang = lang;
  };

  const t = (key: string, params?: Record<string, string>) => {
    const translation = translations[currentLanguage]?.[key] || translations.en[key] || key;
    
    if (params) {
      return Object.keys(params).reduce((acc, paramKey) => {
        return acc.replace(`{{${paramKey}}}`, params[paramKey]);
      }, translation);
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      availableLanguages: languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};