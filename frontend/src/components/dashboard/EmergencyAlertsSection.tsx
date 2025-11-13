import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, Battery, CloudRain, Thermometer, Shield } from 'lucide-react';

interface EmergencyAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  actionRequired: boolean;
  actionText?: string;
  icon: React.ReactNode;
}

const EmergencyAlertsSection: React.FC = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Mock emergency alerts - in real app, this would come from API
  const mockAlerts: EmergencyAlert[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Power Grid Instability',
      message: 'Grid voltage fluctuations detected in your area. System switching to battery backup mode.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      actionRequired: true,
      actionText: 'Check System Status',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '2',
      type: 'warning',
      title: 'Battery Low Alert',
      message: 'Home battery at 15% capacity. Estimated backup time: 2 hours. Consider reducing non-essential loads.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      actionRequired: true,
      actionText: 'View Battery Status',
      icon: <Battery className="w-5 h-5" />
    },
    {
      id: '3',
      type: 'info',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in next 2 hours. Solar panel efficiency may be reduced by 40%.',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      actionRequired: false,
      icon: <CloudRain className="w-5 h-5" />
    },
    {
      id: '4',
      type: 'warning',
      title: 'High Temperature Warning',
      message: 'Inverter temperature at 75°C. System performance may be affected. Ensure proper ventilation.',
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      actionRequired: true,
      actionText: 'Check Ventilation',
      icon: <Thermometer className="w-5 h-5" />
    }
  ];

  useEffect(() => {
    // Simulate real-time alerts
    setAlerts(mockAlerts.slice(0, 2)); // Show first 2 alerts initially

    const interval = setInterval(() => {
      // Occasionally add new alerts
      if (Math.random() > 0.95) {
        const newAlert: EmergencyAlert = {
          id: Date.now().toString(),
          type: Math.random() > 0.7 ? 'warning' : 'info',
          title: 'System Maintenance',
          message: 'Scheduled system check completed. All systems operating normally.',
          timestamp: new Date(),
          actionRequired: false,
          icon: <Shield className="w-5 h-5" />
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 3)]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getAlertColorClasses = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-red-100',
          border: 'border-red-300',
          text: 'text-red-800',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
          border: 'border-yellow-300',
          text: 'text-yellow-800',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
          border: 'border-blue-300',
          text: 'text-blue-800',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-gray-100',
          border: 'border-gray-300',
          text: 'text-gray-800',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600'
        };
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const displayedAlerts = showAll ? alerts : alerts.slice(0, 2);
  const hasMoreAlerts = alerts.length > 2;

  return (
    <motion.div
      className="card p-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Emergency</p>
            <p className="text-lg font-semibold text-gray-900">System Alerts</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${alerts.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="text-xs text-gray-500">
            {alerts.length > 0 ? `${alerts.length} active` : 'All clear'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {displayedAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">All Systems Normal</h4>
              <p className="text-sm text-gray-600">No emergency alerts at this time</p>
            </motion.div>
          ) : (
            displayedAlerts.map((alert, index) => {
              const colorClasses = getAlertColorClasses(alert.type);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg ${colorClasses.bg} border ${colorClasses.border}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${colorClasses.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        <span className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                      {alert.actionRequired && alert.actionText && (
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 underline">
                          {alert.actionText}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>

        {hasMoreAlerts && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showAll ? 'Show Less' : `View ${alerts.length - 2} More Alerts`}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-red-500" />
          <span>24/7 monitoring for system safety and reliability</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyAlertsSection;
