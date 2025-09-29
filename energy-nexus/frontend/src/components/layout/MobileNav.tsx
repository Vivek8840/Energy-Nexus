import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  BarChart3,
  Wallet,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navigationItems = [
    {
      path: '/app/dashboard',
      label: t('nav.dashboard'),
      icon: Home,
      shortLabel: 'Home'
    },
    {
      path: '/app/marketplace',
      label: t('nav.marketplace'),
      icon: ShoppingBag,
      shortLabel: 'Market'
    },
    {
      path: '/app/analytics',
      label: t('nav.analytics'),
      icon: BarChart3,
      shortLabel: 'Analytics'
    },
    {
      path: '/app/wallet',
      label: t('nav.wallet'),
      icon: Wallet,
      shortLabel: 'Wallet'
    },
    {
      path: '/app/settings',
      label: t('nav.settings'),
      icon: Settings,
      shortLabel: 'Settings'
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-glass border-t border-white/20 px-safe pb-safe z-40 backdrop-blur-md shadow-soft">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActivePath(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors duration-300 min-w-0 flex-1 ${
                isActive
                  ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-glow'
                  : 'text-primary-600 hover:bg-primary-50 hover:dark:bg-primary-900/10'
              }`}
            >
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 w-8 h-1 bg-primary-500 rounded-full"
                  style={{ x: '-50%' }}
                  layoutId="mobileActiveTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <div className={`p-2 rounded-xl transition-colors duration-300 ${
                isActive ? 'bg-primary-50 dark:bg-primary-900/20 shadow-glow' : 'hover:bg-primary-50 hover:dark:bg-primary-900/10'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  isActive ? 'text-primary-600' : 'text-primary-600'
                }`} />
              </div>

              <span className={`text-xs font-medium mt-1 truncate max-w-full ${
                isActive ? 'text-primary-600' : 'text-primary-600'
              }`}>
                {item.shortLabel}
              </span>

              {/* Badge for notifications (example for marketplace) */}
              {item.path === '/app/marketplace' && (
                <div className="absolute -top-1 right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-glow">
                  <span className="text-xs text-white font-medium">2</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
