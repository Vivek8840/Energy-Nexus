import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Home, Zap, Leaf, TrendingUp, Award } from 'lucide-react';

interface CommunityStat {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  change: number;
  changeType: 'increase' | 'decrease';
}

const CommunityImpactStatistics: React.FC = () => {
  const [stats, setStats] = useState<CommunityStat[]>([
    {
      label: 'Active Members',
      value: 0,
      unit: '',
      icon: <Users className="w-5 h-5" />,
      color: 'blue',
      change: 12,
      changeType: 'increase'
    },
    {
      label: 'Solar Homes',
      value: 0,
      unit: '',
      icon: <Home className="w-5 h-5" />,
      color: 'green',
      change: 8,
      changeType: 'increase'
    },
    {
      label: 'Energy Traded',
      value: 0,
      unit: 'MWh',
      icon: <Zap className="w-5 h-5" />,
      color: 'yellow',
      change: 15,
      changeType: 'increase'
    },
    {
      label: 'CO₂ Saved',
      value: 0,
      unit: 'tons',
      icon: <Leaf className="w-5 h-5" />,
      color: 'purple',
      change: 22,
      changeType: 'increase'
    }
  ]);

  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const targetValues = [2847, 1247, 45.8, 892.5];

    const animateCounters = () => {
      const duration = 2500;
      const steps = 60;
      const increments = targetValues.map(target => target / steps);

      let currentValues = [0, 0, 0, 0];
      let step = 0;

      const timer = setInterval(() => {
        step++;
        currentValues = currentValues.map((current, index) => {
          const newValue = current + increments[index];
          return newValue >= targetValues[index] ? targetValues[index] : newValue;
        });

        setAnimatedValues([...currentValues]);

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return timer;
    };

    const timer = animateCounters();
    return () => clearInterval(timer);
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-600'
        };
      case 'green':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          textColor: 'text-green-600'
        };
      case 'yellow':
        return {
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
          border: 'border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-600'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
          border: 'border-purple-200',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          textColor: 'text-purple-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          border: 'border-gray-200',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-600'
        };
    }
  };

  return (
    <motion.div
      className="card p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Community Impact</p>
            <p className="text-lg font-semibold text-gray-900">Our Collective Achievement</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">This Month</p>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-sm font-medium text-green-600">+18% growth</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color);

          return (
            <motion.div
              key={stat.label}
              className={`p-4 rounded-lg ${colorClasses.bg} border ${colorClasses.border}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.changeType === 'increase' ? '+' : '-'}{stat.change}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">
                  {animatedValues[index].toLocaleString(undefined, {
                    maximumFractionDigits: stat.unit === 'MWh' || stat.unit === 'tons' ? 1 : 0
                  })}
                  {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
                </p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Average energy per home</span>
          <span className="font-medium text-indigo-600">367 kWh/month</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Community savings</span>
          <span className="font-medium text-green-600">₹2.4M annually</span>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2024 Goal: 3,500 members</span>
            <span>78% Complete</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4 text-indigo-500" />
          <span>Join 2,847+ members making a difference</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityImpactStatistics;
