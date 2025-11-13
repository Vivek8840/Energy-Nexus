import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Wallet,
  Zap,
  Settings,
  LogOut
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
  isSidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
  const location = useLocation();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { state: authState } = useAuth();
  const { state: userState } = useUser();
  const { actualTheme } = useTheme();
  
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



  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="nav-sticky bg-gradient-to-r from-white/95 via-primary-50/30 to-secondary-50/30 dark:from-dark-900/95 dark:via-dark-800/50 dark:to-dark-900/80 backdrop-blur-xl border-b border-primary-200/40 dark:border-primary-700/30 shadow-lg shadow-primary-500/10 dark:shadow-dark-900/60"
    >
      {/* Eco-futuristic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 via-secondary-100/10 to-accent-100/20 dark:from-primary-900/30 dark:via-secondary-900/20 dark:to-accent-900/30 pointer-events-none" />
      {/* Energy flow animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/10 to-transparent dark:via-primary-700/20 animate-pulse opacity-50 pointer-events-none" />

      <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="p-3 rounded-2xl glass hover:backdrop-blur-lg transition-all duration-300 shadow-soft hover:shadow-glow-primary group relative overflow-hidden"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Menu className="relative w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" />
          </motion.button>

          <div className="hidden sm:block">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="flex flex-col"
            >
              <motion.h1
                className="text-xl lg:text-2xl font-bold text-primary-700 dark:text-primary-300 gradient-text"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {getPageTitle()}
              </motion.h1>
              <motion.p
                className="text-sm text-primary-600 dark:text-primary-400 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {new Date().toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </motion.p>
            </motion.div>
          </div>

          <div className="sm:hidden">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg font-bold text-primary-700 dark:text-primary-300 gradient-text"
              whileTap={{ scale: 0.95 }}
            >
              {getPageTitle()}
            </motion.h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <div className="flex items-center justify-center">
            <SunMoonToggle />
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-primary-200 dark:bg-primary-700/50"></div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 rounded-2xl glass hover:backdrop-blur-lg transition-all duration-300 shadow-soft hover:shadow-glow-primary group"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" />
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-dark-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xs text-white font-bold">3</span>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </motion.button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute right-0 top-full mt-3 w-96 max-h-96 overflow-hidden bg-white dark:bg-dark-800 border border-primary-100 dark:border-dark-700 rounded-2xl shadow-2xl z-50"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                          <Bell className="w-4 h-4 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-bold text-primary-700 dark:text-primary-300">Notifications</h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowNotifications(false)}
                        className="w-8 h-8 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 flex items-center justify-center text-primary-500 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        ✕
                      </motion.button>
                    </div>
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {/* Mock notifications - in a real app, this would be dynamic */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">✅</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-green-800 dark:text-green-200">Energy Trade Completed</p>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">30 minutes ago</p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-2 leading-relaxed">Your energy trade with SolarFarm Pro has been successfully completed.</p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">⚠️</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Low Battery Warning</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">2 hours ago</p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 leading-relaxed">Your home battery is at 20% capacity.</p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">ℹ️</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">New Marketplace Listing</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">4 hours ago</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2 leading-relaxed">A new energy listing is available in your area.</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-primary-100 dark:border-dark-700">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                      >
                        View All Notifications
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-primary-200 dark:bg-primary-700/50"></div>

          {/* User Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center justify-center p-2 rounded-2xl glass hover:backdrop-blur-lg transition-all duration-300 shadow-soft hover:shadow-glow-primary group"
              aria-label="User profile menu"
            >
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shadow-soft group-hover:shadow-lg transition-shadow">
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
            </motion.button>
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-dark-800 border border-primary-100 dark:border-dark-700 rounded-2xl shadow-2xl z-50"
                >
                  <div className="p-5 border-b border-primary-100 dark:border-dark-700">
                    <p className="font-semibold text-primary-700 dark:text-primary-300">{authState.user?.name}</p>
                    <p className="text-sm text-primary-500 dark:text-primary-400 mt-1">{authState.user?.email}</p>
                    <div className="flex items-center mt-3">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        authState.user?.isProsumer ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-xs text-primary-600 dark:text-primary-400">
                        {authState.user?.isProsumer ? 'Prosumer Account' : 'Consumer Account'}
                      </span>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg">
                      <Zap className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-primary-700 dark:text-primary-300">Energy Status</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg">
                      <Wallet className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-primary-700 dark:text-primary-300">Wallet</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg">
                      <Settings className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-primary-700 dark:text-primary-300">Settings</span>
                    </button>
                    <div className="border-t border-primary-100 dark:border-dark-700 mt-2 pt-2">
                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg text-red-600 dark:text-red-400">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </motion.header>
  );
};

export default Header;