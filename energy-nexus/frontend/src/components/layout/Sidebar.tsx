import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  BarChart3,
  Wallet,
  Settings,
  LogOut,
  X,
  Zap,
  Brain,
  Shield
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { t } = useLanguage();
  const { logout, state: authState } = useAuth();

    const navigationItems = [
      {
        path: '/app/dashboard',
        label: t('nav.dashboard'),
        icon: Home,
      },
      {
        path: '/app/marketplace',
        label: t('nav.marketplace'),
        icon: ShoppingBag,
      },
      {
        path: '/app/analytics',
        label: t('nav.analytics'),
        icon: BarChart3,
      },
      {
        path: '/app/ai-price-oracle',
        label: 'AI Price Oracle',
        icon: Brain,
      },
      {
        path: '/app/blockchain-transparency-hub',
        label: 'Blockchain Transparency Hub',
        icon: Shield,
      },
      {
        path: '/app/energy-forecast',
        label: 'Energy Forecast',
        icon: Zap,
      },
      {
        path: '/app/energy-dashboard',
        label: 'Energy Dashboard',
        icon: Zap,
      },
      {
        path: '/app/wallet',
        label: t('nav.wallet'),
        icon: Wallet,
      },
      {
        path: '/app/settings',
        label: t('nav.settings'),
        icon: Settings,
      },
    ];

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="h-full bg-glass border-r border-white/20 flex flex-col backdrop-blur-md shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-700 dark:text-primary-300 gradient-text">{t('app.title')}</h1>
            <p className="text-xs text-primary-500 dark:text-primary-400">v1.0.0</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-primary-600" />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-white/10 flex items-center space-x-3">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shadow-soft">
          {authState.user?.profilePicture ? (
            <img
              src={authState.user.profilePicture}
              alt={authState.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-lg font-semibold text-primary-600 dark:text-primary-300">
              {authState.user?.name?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-primary-700 dark:text-primary-300 truncate">
            {authState.user?.name || 'User'}
          </p>
          <p className="text-xs text-primary-500 dark:text-primary-400">
            {authState.user?.isProsumer ? 'Prosumer' : 'Consumer'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActivePath(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`relative flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-glow'
                  : 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 hover:dark:bg-primary-900/10 hover:text-primary-700 hover:dark:text-primary-300'
              }`}
            >
              {isActive && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-primary-400 group-hover:text-primary-600'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-soft"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('common.logout')}</span>
        </button>

        <div className="mt-4 text-xs text-primary-500 dark:text-primary-400 text-center">
          <p>© 2024 EnergyNexus</p>
          <p>Powering sustainable future</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
