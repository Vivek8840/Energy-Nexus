import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Wallet,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import SunMoonToggle from '@/components/ui/SunMoonToggle';
import { Notifications } from '@/components/dashboard/Notifications';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { state: authState } = useAuth();
  const { state: userState } = useUser();
  const { actualTheme } = useTheme();
  
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return t('nav.dashboard');
    if (path.includes('/marketplace')) return t('nav.marketplace');
    if (path.includes('/analytics')) return t('nav.analytics');
    if (path.includes('/wallet')) return t('nav.wallet');
    if (path.includes('/settings')) return t('nav.settings');
    return t('app.title');
  };

  const walletBalance = '₹2,456.78';

  return (
    <header className="nav-sticky">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-primary-600" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-primary-700 dark:text-primary-300 gradient-text">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              {new Date().toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-semibold text-primary-700 dark:text-primary-300 gradient-text">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center glass rounded-xl px-3 py-2 w-64 shadow-soft">
            <Search className="w-5 h-5 text-primary-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-transparent border-none outline-none text-sm text-primary-700 dark:text-primary-300 placeholder-primary-400 flex-1"
            />
          </div>

          {authState.user?.isProsumer && (
            <div className="hidden sm:flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-2 rounded-xl shadow-glow">
              <Wallet className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{walletBalance}</span>
            </div>
          )}

          {/* Theme Toggle */}
          <SunMoonToggle />

          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-1 p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300"
              aria-label="Select language"
            >
              <Globe className="w-5 h-5 text-primary-600" />
              <span className="hidden sm:block text-sm text-primary-700 dark:text-primary-300">
                {availableLanguages.find((lang: any) => lang.code === currentLanguage)?.nativeName || 'EN'}
              </span>
              <ChevronDown className="w-3 h-3 text-primary-400" />
            </button>
            <AnimatePresence>
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-glass border border-white/20 rounded-xl shadow-md z-50 backdrop-blur-md"
                >
                  <div className="py-2">
                    {availableLanguages.map((language: any) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          changeLanguage(language.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg ${
                          currentLanguage === language.code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'text-primary-700 dark:text-primary-300'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <p className="text-sm font-medium">{language.nativeName}</p>
                          <p className="text-xs text-primary-500 dark:text-primary-400">{language.name}</p>
                        </div>
                        {currentLanguage === language.code && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-primary-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-glow">
                <span className="text-xs text-white font-medium">3</span>
              </div>
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-y-auto bg-glass border border-white/20 rounded-xl shadow-md z-50 backdrop-blur-md"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-primary-500 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {/* Mock notifications - in a real app, this would be dynamic */}
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">✅</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">Energy Trade Completed</p>
                            <p className="text-xs text-green-600 dark:text-green-400">30m ago</p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">Your energy trade with SolarFarm Pro has been successfully completed.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">⚠️</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Low Battery Warning</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">2h ago</p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Your home battery is at 20% capacity.</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">ℹ️</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">New Marketplace Listing</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">4h ago</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">A new energy listing is available in your area.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <button className="text-sm text-primary-600 hover:text-primary-800 dark:hover:text-primary-400">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1 rounded-xl glass hover:backdrop-blur-md transition-all duration-300"
              aria-label="User profile menu"
            >
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shadow-soft">
                {authState.user?.profilePicture ? (
                  <img
                    src={authState.user.profilePicture}
                    alt={authState.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-primary-600 dark:text-primary-300">
                    {authState.user?.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-primary-400 hidden sm:block" />
            </button>
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-glass border border-white/20 rounded-xl shadow-md z-50 backdrop-blur-md"
                >
                  <div className="p-4 border-b border-white/10">
                    <p className="font-medium text-primary-700 dark:text-primary-300">{authState.user?.name}</p>
                    <p className="text-sm text-primary-500 dark:text-primary-400">{authState.user?.email}</p>
                    <div className="flex items-center mt-2">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        authState.user?.isProsumer ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-xs text-primary-600 dark:text-primary-400">
                        {authState.user?.isProsumer ? 'Prosumer Account' : 'Consumer Account'}
                      </span>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg">
                      <Zap className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-primary-700 dark:text-primary-300">Energy Status</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg">
                      <Wallet className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-primary-700 dark:text-primary-300">Wallet</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="mt-4 md:hidden">
        <div className="flex items-center glass rounded-xl px-3 py-2 shadow-soft">
          <Search className="w-5 h-5 text-primary-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-transparent border-none outline-none text-sm text-primary-700 dark:text-primary-300 placeholder-primary-400 flex-1"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;