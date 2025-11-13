import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

interface PriceData {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
}

const LivePriceTracker: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData>({
    current: 4.25,
    previous: 4.15,
    change: 0.10,
    changePercent: 2.41
  });

  const [isLive, setIsLive] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price fluctuations
      const change = (Math.random() - 0.5) * 0.20; // -0.1 to +0.1
      const newPrice = Math.max(3.50, Math.min(5.50, priceData.current + change));
      const newChange = newPrice - priceData.previous;
      const newChangePercent = (newChange / priceData.previous) * 100;

      setPriceData({
        current: newPrice,
        previous: priceData.current,
        change: newChange,
        changePercent: newChangePercent
      });
      setCountdown(3);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [priceData]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 3);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const isPositive = priceData.change >= 0;

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
            <IndianRupee className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Live Energy Price</p>
            <p className="text-lg font-semibold text-gray-900">Market Rate</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-xs text-gray-500">{isLive ? 'LIVE' : 'OFFLINE'}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-green-600">₹{priceData.current.toFixed(2)}</span>
          <span className="text-sm text-gray-500">per kWh</span>
        </div>

        <div className="flex items-center space-x-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}₹{priceData.change.toFixed(2)} ({isPositive ? '+' : ''}{priceData.changePercent.toFixed(2)}%)
          </span>
          <span className="text-xs text-gray-500">vs yesterday</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, ((priceData.current - 3.50) / 2) * 100))}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>₹3.50</span>
          <span>₹5.50</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next update in</span>
          <span className="font-mono text-green-600">00:0{countdown}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LivePriceTracker;
