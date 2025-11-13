import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingUp, TreePine, Recycle } from 'lucide-react';

interface CarbonData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  treesEquivalent: number;
  carsEquivalent: number;
}

const CarbonOffsetTracker: React.FC = () => {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    today: 2.8,
    thisWeek: 18.5,
    thisMonth: 75.2,
    total: 1247.8,
    treesEquivalent: 45,
    carsEquivalent: 12
  });

  const [animatedValues, setAnimatedValues] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0
  });

  useEffect(() => {
    // Animate counters on mount
    const animateCounter = (target: number, key: keyof typeof animatedValues) => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedValues(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, duration / steps);

      return timer;
    };

    const timers = [
      animateCounter(carbonData.today, 'today'),
      animateCounter(carbonData.thisWeek, 'thisWeek'),
      animateCounter(carbonData.thisMonth, 'thisMonth'),
      animateCounter(carbonData.total, 'total')
    ];

    return () => timers.forEach(clearInterval);
  }, []);

  const stats = [
    {
      label: 'Today',
      value: animatedValues.today,
      unit: 'kg CO₂',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'This Week',
      value: animatedValues.thisWeek,
      unit: 'kg CO₂',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'This Month',
      value: animatedValues.thisMonth,
      unit: 'kg CO₂',
      icon: TreePine,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Total Saved',
      value: animatedValues.total,
      unit: 'kg CO₂',
      icon: Recycle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <motion.div
      className="card p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-green-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Carbon Footprint</p>
            <p className="text-lg font-semibold text-gray-900">Offset Tracker</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Environmental Impact</p>
          <p className="text-lg font-bold text-green-600">{carbonData.treesEquivalent} Trees</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="text-center p-3 bg-white/50 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold text-gray-900">{stat.value.toFixed(1)}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Equivalent to planting</span>
          <span className="font-medium text-green-600">{carbonData.treesEquivalent} trees</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Equivalent to removing</span>
          <span className="font-medium text-blue-600">{carbonData.carsEquivalent} cars from road</span>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Monthly Goal: 100kg</span>
            <span>75% Complete</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Leaf className="w-4 h-4 text-green-500" />
          <span>Every kWh of solar energy saves ~0.5kg CO₂</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CarbonOffsetTracker;
