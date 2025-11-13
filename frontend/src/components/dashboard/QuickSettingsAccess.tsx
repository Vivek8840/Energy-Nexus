import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, CreditCard, User, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickSettingsAccess: React.FC = () => {
  const settingsOptions = [
    {
      icon: <User className="w-5 h-5" />,
      title: 'Profile',
      description: 'Update personal information',
      path: '/app/settings',
      color: 'blue'
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: 'Notifications',
      description: 'Manage alert preferences',
      path: '/app/settings',
      color: 'green'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Security',
      description: 'Password & authentication',
      path: '/app/settings',
      color: 'purple'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Payments',
      description: 'Bank details & billing',
      path: '/app/settings',
      color: 'orange'
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: 'Appearance',
      description: 'Theme & display settings',
      path: '/app/settings',
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600 hover:bg-blue-200';
      case 'green':
        return 'bg-green-100 text-green-600 hover:bg-green-200';
      case 'purple':
        return 'bg-purple-100 text-purple-600 hover:bg-purple-200';
      case 'orange':
        return 'bg-orange-100 text-orange-600 hover:bg-orange-200';
      case 'pink':
        return 'bg-pink-100 text-pink-600 hover:bg-pink-200';
      default:
        return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    }
  };

  return (
    <motion.div
      className="card p-6 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Quick Access</p>
            <p className="text-lg font-semibold text-gray-900">Settings</p>
          </div>
        </div>
        <Link
          to="/app/settings"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {settingsOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={option.path}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors group"
            >
              <div className={`w-10 h-10 ${getColorClasses(option.color)} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                  {option.title}
                </h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-500">
                  {option.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Settings className="w-4 h-4 text-gray-500" />
          <span>Customize your EnergyNexus experience</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSettingsAccess;
