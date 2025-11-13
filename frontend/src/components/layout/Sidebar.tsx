import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  Wallet,
  Settings,
  LogOut,
  X,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  ShoppingCart,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpen, isCollapsed, onToggleCollapse }) => {
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
        path: '/app/energy-dashboard',
        label: 'Energy Dashboard',
        icon: Zap,
      },
      {
        path: '/app/energy-forecast',
        label: 'Energy Forecast',
        icon: TrendingUp,
      },
      {
        path: '/app/buy-energy',
        label: 'Buy Energy',
        icon: ShoppingCart,
      },
      {
        path: '/app/sell-energy',
        label: 'Sell Energy',
        icon: DollarSign,
      },
      {
        path: '/app/marketplace',
        label: t('nav.marketplace'),
        icon: ShoppingBag,
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
    <div className={`h-full bg-gradient-to-b from-white/95 via-primary-50/30 to-secondary-50/20 dark:from-dark-900/95 dark:via-dark-800/50 dark:to-primary-900/20 border-r border-primary-200/40 dark:border-primary-700/30 flex flex-col backdrop-blur-xl shadow-lg shadow-primary-500/10 dark:shadow-dark-900/60 relative overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-32' : 'w-64'}`}>
      {/* Energy flow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-100/10 via-transparent to-secondary-100/10 dark:from-primary-900/20 dark:via-transparent dark:to-secondary-900/10 pointer-events-none" />
      {/* Subtle energy particles */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-4 w-1 h-1 bg-primary-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-6 w-0.5 h-0.5 bg-secondary-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-8 w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse delay-500" />
      </div>
      {/* Header */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-white/10 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center rounded-xl shadow-glow bg-gradient-to-br from-primary-500 to-secondary-500 ${isCollapsed ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <Zap className={`text-white ${isCollapsed ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-primary-700 dark:text-primary-300 gradient-text">{t('app.title')}</h1>
              <p className="text-xs text-primary-500 dark:text-primary-400">v1.0.0</p>
            </div>
          )}
        </div>
        {onClose && !isCollapsed && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-primary-600" />
          </button>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300 ml-auto"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
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
      )}

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'p-4' : 'p-6'} space-y-2`}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActivePath(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`relative flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? isCollapsed
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-glow border border-primary-200 dark:border-primary-700'
                    : 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-glow'
                  : 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 hover:dark:bg-primary-900/10 hover:text-primary-700 hover:dark:text-primary-300'
              }`}
            >
              {isActive && !isCollapsed && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-primary-400 group-hover:text-primary-600'}`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-t border-white/10`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-soft`}
          title={isCollapsed ? t('common.logout') : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">{t('common.logout')}</span>}
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
