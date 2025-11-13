import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Zap, Home, Car, Droplets, Thermometer } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  description: string;
  savings: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const tips: Tip[] = [
  {
    id: '1',
    title: 'Smart AC Usage',
    description: 'Set your AC to 24°C instead of 21°C. This can reduce energy consumption by up to 18% while maintaining comfort.',
    savings: '₹300/month',
    category: 'Cooling',
    icon: <Thermometer className="w-5 h-5" />,
    color: 'blue',
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'LED Lighting Upgrade',
    description: 'Replace all incandescent bulbs with LED bulbs. LEDs use 75% less energy and last 25 times longer.',
    savings: '₹150/month',
    category: 'Lighting',
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'yellow',
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'Appliance Scheduling',
    description: 'Run heavy appliances like washing machines and geysers during solar peak hours (10 AM - 4 PM) to use free energy.',
    savings: '₹250/month',
    category: 'Appliances',
    icon: <Home className="w-5 h-5" />,
    color: 'green',
    difficulty: 'easy'
  },
  {
    id: '4',
    title: 'Phantom Load Elimination',
    description: 'Unplug electronics when not in use. Standby power consumption can account for 10% of your electricity bill.',
    savings: '₹120/month',
    category: 'Electronics',
    icon: <Zap className="w-5 h-5" />,
    color: 'purple',
    difficulty: 'easy'
  },
  {
    id: '5',
    title: 'Water Heater Timer',
    description: 'Install a timer on your geyser to heat water only when needed. This can save up to 30% on hot water costs.',
    savings: '₹180/month',
    category: 'Heating',
    icon: <Droplets className="w-5 h-5" />,
    color: 'cyan',
    difficulty: 'medium'
  },
  {
    id: '6',
    title: 'EV Charging Optimization',
    description: 'Charge your electric vehicle during off-peak hours or solar production times to minimize grid electricity usage.',
    savings: '₹400/month',
    category: 'Transportation',
    icon: <Car className="w-5 h-5" />,
    color: 'orange',
    difficulty: 'hard'
  }
];

const EnergyEfficiencyTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % tips.length);
    }, 8000); // Change tip every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTip = tips[currentTipIndex];

  const markAsCompleted = (tipId: string) => {
    setCompletedTips(prev => new Set([...prev, tipId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
      case 'yellow':
        return {
          bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
          border: 'border-yellow-200',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-600'
        };
      case 'green':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          textColor: 'text-green-600'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
          border: 'border-purple-200',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          textColor: 'text-purple-600'
        };
      case 'cyan':
        return {
          bg: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
          border: 'border-cyan-200',
          iconBg: 'bg-cyan-100',
          iconColor: 'text-cyan-600',
          textColor: 'text-cyan-600'
        };
      case 'orange':
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
          border: 'border-orange-200',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          textColor: 'text-orange-600'
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

  const colorClasses = getColorClasses(currentTip.color);

  return (
    <motion.div
      className="card p-6 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Energy Efficiency</p>
            <p className="text-lg font-semibold text-gray-900">Smart Tips</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-lg font-bold text-green-600">{completedTips.size}/{tips.length}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTipIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-lg ${colorClasses.bg} border ${colorClasses.border}`}
        >
          <div className="flex items-start space-x-3 mb-3">
            <div className={`w-10 h-10 ${colorClasses.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              {currentTip.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900">{currentTip.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(currentTip.difficulty)}`}>
                  {currentTip.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">{currentTip.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${colorClasses.textColor}`}>
                  Potential Savings: {currentTip.savings}
                </span>
                {!completedTips.has(currentTip.id) && (
                  <button
                    onClick={() => markAsCompleted(currentTip.id)}
                    className="text-xs px-3 py-1 bg-white/50 hover:bg-white/70 rounded-full transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-2 mt-4">
        {tips.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTipIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentTipIndex
                ? 'bg-green-500 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total potential savings</span>
          <span className="font-medium text-green-600">₹1,400/month</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EnergyEfficiencyTips;
